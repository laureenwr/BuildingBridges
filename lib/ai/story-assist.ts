import { randomUUID } from 'crypto';
import { openStoryAiClient } from '@/lib/ai/story-ai-client';
import {
  STRUCTURE_CHAPTER_PROMPT,
  STRUCTURE_SUMMARY_PROMPT,
  chaptersFromModelReply,
  clampSummary,
  parseStructureSummary,
  type StructureChapter,
} from '@/lib/ai/story-structure';

export type StoryAssistAction = 'grammar' | 'titles' | 'story-title' | 'draft' | 'structure';
export type StoryDraftCategory = 'mentor' | 'participant' | 'awareness';

export type StoryAssistResult = {
  text?: string;
  titles?: string[];
  title?: string;
  category?: StoryDraftCategory;
  draft?: string;
  summary?: string;
  chapters?: StructureChapter[];
  source: 'ai';
};

const MAX_TEXT_CHARS = 4000;
const MAX_DRAFT_CHARS = 12000;
const ASSIST_TIMEOUT_MS = 30_000;
const ASSIST_TEMPERATURE = 0.3;
const RATE_LIMIT_WINDOW_MS = 60 * 60 * 1000;
const RATE_LIMIT_MAX = 30;
const STRUCTURE_RUN_REQUESTS = 6;
const STRUCTURE_RUN_MS = 15 * 60 * 1000;
const STORY_CATEGORIES: StoryDraftCategory[] = ['mentor', 'participant', 'awareness'];

const rateBuckets = new Map<string, { count: number; windowStart: number }>();
const structureRuns = new Map<string, { userId: string; remaining: number; expires: number }>();

export const STORY_ASSIST_UNAVAILABLE =
  'AI help is not available right now. You can keep editing yourself.';

export function classifyStoryAssistError(error: unknown): {
  status: number;
  code: string;
  message: string;
} {
  if (error instanceof Error && error.message === 'missing-key') {
    return {
      status: 503,
      code: 'missing-key',
      message: 'AI writing help is not set up yet. You can keep editing yourself.',
    };
  }
  if (error instanceof Error && error.message === 'empty') {
    return { status: 400, code: 'empty', message: 'Add some text first.' };
  }

  return {
    status: 503,
    code: 'unavailable',
    message: STORY_ASSIST_UNAVAILABLE,
  };
}

export function resetStoryAssistRateLimitForTests() {
  rateBuckets.clear();
  structureRuns.clear();
}

/** The first call of a structure run counts as one hourly request. Later calls in that run do not. */
export function authorizeStructureRun(
  userId: string,
  runId: string | undefined,
  now = Date.now()
): { ok: true; runId: string } | { ok: false; reason: 'hourly' | 'run' } {
  const existingId = runId?.trim() ?? '';
  if (existingId) {
    const run = structureRuns.get(existingId);
    if (!run || run.userId !== String(userId) || now > run.expires || run.remaining <= 0) {
      return { ok: false, reason: 'run' };
    }
    run.remaining -= 1;
    return { ok: true, runId: existingId };
  }

  const limit = consumeStoryAssistRateLimit(userId, now);
  if (limit.status === 429) return { ok: false, reason: 'hourly' };
  const created = randomUUID();
  structureRuns.set(created, {
    userId: String(userId),
    remaining: STRUCTURE_RUN_REQUESTS - 1,
    expires: now + STRUCTURE_RUN_MS,
  });
  return { ok: true, runId: created };
}

export function consumeStoryAssistRateLimit(userId: string, now = Date.now()): { status: 200 | 429 } {
  const key = String(userId);
  const bucket = rateBuckets.get(key);
  if (!bucket || now - bucket.windowStart >= RATE_LIMIT_WINDOW_MS) {
    rateBuckets.set(key, { count: 1, windowStart: now });
    return { status: 200 };
  }
  if (bucket.count >= RATE_LIMIT_MAX) return { status: 429 };
  bucket.count += 1;
  return { status: 200 };
}

function clipText(value: string, max = MAX_TEXT_CHARS) {
  return value.trim().slice(0, max);
}

function parseCategory(value: unknown): StoryDraftCategory | null {
  return typeof value === 'string' && STORY_CATEGORIES.includes(value as StoryDraftCategory)
    ? (value as StoryDraftCategory)
    : null;
}

function asStringArray(value: unknown, max = 3) {
  if (!Array.isArray(value)) return [];
  return value
    .map((item) => (typeof item === 'string' ? item.trim() : ''))
    .filter(Boolean)
    .slice(0, max);
}

export function parseStoryAssistContent(raw: string): Record<string, unknown> | null {
  const trimmed = raw.trim();
  if (!trimmed) return null;
  const unfenced = trimmed
    .replace(/^```(?:json)?\s*/i, '')
    .replace(/\s*```$/i, '')
    .trim();
  const candidates = [unfenced];
  const objectMatch = unfenced.match(/\{[\s\S]*\}/);
  if (objectMatch?.[0] && objectMatch[0] !== unfenced) candidates.push(objectMatch[0]);
  const arrayMatch = unfenced.match(/\[[\s\S]*\]/);
  if (arrayMatch?.[0] && arrayMatch[0] !== unfenced) candidates.push(arrayMatch[0]);

  for (const candidate of candidates) {
    try {
      const parsed = JSON.parse(candidate) as unknown;
      if (Array.isArray(parsed)) return { titles: parsed };
      if (parsed && typeof parsed === 'object') return parsed as Record<string, unknown>;
    } catch {
      // Try the next candidate.
    }
  }
  return null;
}

export async function assistStoryDraft(input: {
  locale: 'en' | 'de';
  action: Exclude<StoryAssistAction, 'structure'>;
  text: string;
  currentLabel?: string;
}): Promise<StoryAssistResult> {
  const ai = openStoryAiClient(ASSIST_TIMEOUT_MS);
  if (!ai) throw new Error('missing-key');

  const text = clipText(input.text, input.action === 'draft' ? MAX_DRAFT_CHARS : MAX_TEXT_CHARS);
  if (!text) throw new Error('empty');

  const currentLabel = input.currentLabel?.trim().slice(0, 80) ?? '';
  const prompts = {
    draft: {
      system: `You turn a Building Bridges story into an editable first draft.
Rules:
- Use only what the person wrote. Never invent facts, names, or feelings.
- Keep their own words and meaning.
- Write in the language of their text. If the text is German, use "du", never "Sie".
- Write in the first person.
- Read the COMPLETE text. Do not use only the first line.
- title: 3 to 10 words, from the whole account.
- category: exactly one of mentor, participant, awareness.
  mentor = a role-model / mentoring path; participant = a personal programme or school experience; awareness = a wider empowerment or structural issue.
- draft: a coherent first-person narrative in the speaker's voice.
- This is a DRAFT for the storyteller and a human reviewer. It must not be treated as published.
- summary: at most 2 sentences and at most 240 characters, in the language of the text. If it is German and addresses the reader, use "du", never "Sie".
- Return only this JSON object: {"title":"...","category":"mentor|participant|awareness","draft":"...","summary":"..."}`,
      user: `The person's text:\n\n${text}`,
      maxTokens: 2200,
    },
    grammar: {
      system: `You help Building Bridges storytellers with light grammar fixes.
Rules:
- Write in the language of their text. If the text is German, use "du", never "Sie".
- Fix grammar, spelling, and punctuation only.
- Keep the speaker's voice, meaning, and facts. Do not invent or remove events.
- Do not make the text more formal, dramatic, or "literary".
- Return only this JSON object: {"text":"corrected chapter"}`,
      user: `Correct this chapter:\n\n${text}`,
      maxTokens: 900,
    },
    titles: {
      system: `You suggest short chapter titles for Building Bridges stories.
Rules:
- Give exactly 3 short, plain titles in the language of the person's text.
- Use only what they wrote. Do not invent facts, names, or feelings.
- 2 to 6 words each. No quotation marks and no numbering.
- Return only this JSON object: {"titles":["...", "...", "..."]}`,
      user: `${currentLabel ? `Current title: ${currentLabel}\n\n` : ''}Chapter:\n\n${text}`,
      maxTokens: 220,
    },
    'story-title': {
      system: `You suggest a story title for Building Bridges.
Rules:
- Give exactly 3 short, plain titles in the language of the person's text.
- Use only what they wrote. Do not invent facts, names, or feelings.
- 3 to 8 words each. No quotation marks and no numbering.
- Return only this JSON object: {"titles":["...", "...", "..."]}`,
      user: `The person's text:\n\n${text}`,
      maxTokens: 220,
    },
  } as const;

  const prompt = prompts[input.action];
  const response = await ai.client.chat.completions.create({
    model: ai.model,
    temperature: ASSIST_TEMPERATURE,
    max_tokens: prompt.maxTokens,
    messages: [
      { role: 'system', content: prompt.system },
      { role: 'user', content: prompt.user },
    ],
  });

  const content = response.choices[0]?.message?.content;
  const parsed = content ? parseStoryAssistContent(content) : null;
  if (!parsed) throw new Error('unreadable');

  if (input.action === 'draft') {
    const title = typeof parsed.title === 'string' ? parsed.title.trim() : '';
    const draft = typeof parsed.draft === 'string' ? parsed.draft.trim() : '';
    const category = parseCategory(parsed.category);
    if (!title || !draft || !category) throw new Error('unreadable');
    const summary = typeof parsed.summary === 'string' ? clampSummary(parsed.summary) : '';
    return { title, category, draft, ...(summary ? { summary } : {}), source: 'ai' };
  }

  if (input.action === 'grammar') {
    const next = typeof parsed.text === 'string' ? parsed.text.trim() : '';
    if (!next) throw new Error('unreadable');
    return { text: next, source: 'ai' };
  }

  const titles = asStringArray(parsed.titles);
  if (titles.length === 0) throw new Error('unreadable');
  return { titles, source: 'ai' };
}

export async function structureTranscriptPiece(input: {
  mode: 'chapters' | 'summary';
  text: string;
  partNumber: number;
}): Promise<{ chapters: StructureChapter[]; summary: string }> {
  const ai = openStoryAiClient(ASSIST_TIMEOUT_MS);
  if (!ai) throw new Error('missing-key');
  const text = input.text.trim();
  if (!text) throw new Error('empty');

  const response = await ai.client.chat.completions.create({
    model: ai.model,
    temperature: 0.2,
    max_tokens: input.mode === 'summary' ? 180 : 3500,
    messages: [
      {
        role: 'system',
        content: input.mode === 'summary' ? STRUCTURE_SUMMARY_PROMPT : STRUCTURE_CHAPTER_PROMPT,
      },
      { role: 'user', content: text },
    ],
  });

  const content = response.choices[0]?.message?.content ?? '';
  if (input.mode === 'summary') {
    return { chapters: [], summary: clampSummary(parseStructureSummary(content)) };
  }
  return {
    chapters: chaptersFromModelReply(text, content, input.partNumber),
    summary: '',
  };
}
