import OpenAI from 'openai';

export type StoryAssistAction = 'grammar' | 'titles' | 'story-title' | 'draft';
export type StoryDraftCategory = 'mentor' | 'participant' | 'awareness';

export type StoryAssistResult = {
  text?: string;
  titles?: string[];
  title?: string;
  category?: StoryDraftCategory;
  draft?: string;
  source: 'openai';
};

const MAX_TEXT_CHARS = 4000;
const MAX_DRAFT_CHARS = 12000;
const STORY_CATEGORIES: StoryDraftCategory[] = ['mentor', 'participant', 'awareness'];

export function classifyStoryAssistError(error: unknown): {
  status: number;
  code: string;
  message: string;
} {
  if (error instanceof Error && error.message === 'missing-key') {
    return { status: 503, code: 'missing-key', message: 'AI writing help is not configured yet.' };
  }
  if (error instanceof Error && error.message === 'empty') {
    return { status: 400, code: 'empty', message: 'Add some text first.' };
  }

  const rec = error && typeof error === 'object' ? (error as { status?: number; code?: unknown; type?: unknown }) : {};
  const code = String(rec.code || '');
  const type = String(rec.type || '');
  if (code === 'credit_balance_exhausted' || type === 'insufficient_quota') {
    return {
      status: 503,
      code: 'no-credits',
      message: 'The OpenAI account has no remaining credits. Add credits, then try AI help again.',
    };
  }
  if (rec.status === 401 || code === 'invalid_api_key') {
    return {
      status: 503,
      code: 'invalid-key',
      message: 'The OpenAI key is not accepted. Check OPENAI_API_KEY, then try again.',
    };
  }

  return {
    status: 500,
    code: 'unavailable',
    message: 'AI help is not available right now. You can keep editing yourself.',
  };
}

function requireOpenAi() {
  if (!process.env.OPENAI_API_KEY) {
    throw new Error('missing-key');
  }
  return new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
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

export async function assistStoryDraft(input: {
  locale: 'en' | 'de';
  action: StoryAssistAction;
  text: string;
  currentLabel?: string;
}): Promise<StoryAssistResult> {
  const openai = requireOpenAi();
  const locale = input.locale === 'de' ? 'de' : 'en';
  const language = locale === 'de' ? 'German' : 'English';
  const text = clipText(input.text, input.action === 'draft' ? MAX_DRAFT_CHARS : MAX_TEXT_CHARS);
  if (!text) {
    throw new Error('empty');
  }

  const currentLabel = input.currentLabel?.trim().slice(0, 80) ?? '';

  const prompts = {
    draft: {
      system: `You turn a Building Bridges interview transcript into an editable first draft.
Rules:
- Read the COMPLETE transcript. Do not use only the first line or first sentences.
- Reply in ${language} only.
- title: 3 to 10 words, based on the whole account. Do not invent places, names, or events.
- category: exactly one of mentor, participant, awareness.
  mentor = a role-model / mentoring path; participant = a personal programme or school experience; awareness = a wider empowerment or structural issue.
- draft: a coherent first-person narrative in the speaker's voice, covering the main arc of the full transcript.
- Keep facts. Do not add drama, morals, or details that are not in the transcript.
- This is a DRAFT for the storyteller and a human reviewer. It must not be treated as published.
- Return JSON only: {"title":"...","category":"mentor|participant|awareness","draft":"..."}`,
      user: `Full interview transcript:\n\n${text}`,
    },
    grammar: {
      system: `You help Building Bridges storytellers with light grammar fixes.
Rules:
- Reply in ${language} only.
- Fix grammar, spelling, and punctuation only.
- Keep the speaker's voice, meaning, and facts. Do not invent or remove events.
- Do not make the text more formal, dramatic, or "literary".
- Return JSON only: {"text":"corrected chapter"}`,
      user: `Correct this chapter:\n\n${text}`,
    },
    titles: {
      system: `You suggest short chapter titles for Building Bridges stories.
Rules:
- Reply in ${language} only.
- Suggest 3 titles, 2 to 6 words each.
- Use only what is in the chapter. Do not invent places, names, or events.
- No quotation marks, no numbering.
- Return JSON only: {"titles":["...", "...", "..."]}`,
      user: `${currentLabel ? `Current title: ${currentLabel}\n\n` : ''}Chapter:\n\n${text}`,
    },
    'story-title': {
      system: `You suggest a story title for Building Bridges.
Rules:
- Reply in ${language} only.
- Suggest 3 titles, 3 to 8 words each.
- Use only what is in the text. Do not invent facts.
- No quotation marks, no numbering.
- Return JSON only: {"titles":["...", "...", "..."]}`,
      user: `Story draft:\n\n${text}`,
    },
  } as const;

  const prompt = prompts[input.action];
  const response = await openai.chat.completions.create({
    model: 'gpt-4o-mini',
    temperature: input.action === 'grammar' ? 0.2 : input.action === 'draft' ? 0.4 : 0.5,
    max_tokens: input.action === 'draft' ? 2200 : input.action === 'grammar' ? 900 : 220,
    response_format: { type: 'json_object' },
    messages: [
      { role: 'system', content: prompt.system },
      { role: 'user', content: prompt.user },
    ],
  });

  const content = response.choices[0]?.message?.content;
  if (!content) {
    throw new Error('empty-response');
  }

  const parsed = JSON.parse(content) as {
    text?: unknown;
    titles?: unknown;
    title?: unknown;
    category?: unknown;
    draft?: unknown;
  };

  if (input.action === 'draft') {
    const title = typeof parsed.title === 'string' ? parsed.title.trim() : '';
    const draft = typeof parsed.draft === 'string' ? parsed.draft.trim() : '';
    const category = parseCategory(parsed.category);
    if (!title || !draft || !category) throw new Error('empty-response');
    return { title, category, draft, source: 'openai' };
  }

  if (input.action === 'grammar') {
    const next = typeof parsed.text === 'string' ? parsed.text.trim() : '';
    if (!next) throw new Error('empty-response');
    return { text: next, source: 'openai' };
  }

  const titles = asStringArray(parsed.titles);
  if (titles.length === 0) throw new Error('empty-response');
  return { titles, source: 'openai' };
}
