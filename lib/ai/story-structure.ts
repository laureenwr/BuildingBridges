export type StructureChapter = {
  title: string;
  text: string;
  fallback: boolean;
};

const PART_TARGET = 6000;
const MAX_PARTS = 5;
const SUMMARY_CHAR_LIMIT = 240;

const INTERVIEWER_LINE =
  /^(interviewer|interviewerin|moderator|moderatorin|frage|question|q|i)\s*:/i;
const SPEAKER_LABEL = /^(?:antwort|answer|a|teilnehmer(?:in)?|sprecher(?:in)?|speaker)\s*:\s*(.*)$/i;

export function normalizeForMatch(value: string) {
  return value.replace(/\s+/g, ' ').trim();
}

export function speakerText(transcript: string) {
  return transcript
    .split(/\n/)
    .map((line) => line.trim())
    .filter((line) => line && !INTERVIEWER_LINE.test(line))
    .map((line) => {
      const labeled = line.match(SPEAKER_LABEL);
      return labeled ? labeled[1] : line;
    })
    .filter(Boolean)
    .join('\n');
}

function boundaryCut(text: string, target: number) {
  const windowStart = Math.min(text.length, Math.floor(target * 0.6));
  const regionEnd = Math.min(text.length, target);
  const region = text.slice(windowStart, regionEnd);
  const paragraph = region.lastIndexOf('\n\n');
  if (paragraph >= 0) return windowStart + paragraph + 2;
  let sentenceEnd = -1;
  const sentence = /[.!?]["']?\s+/g;
  let match: RegExpExecArray | null;
  while ((match = sentence.exec(region))) {
    sentenceEnd = windowStart + match.index + match[0].length;
  }
  if (sentenceEnd > windowStart) return sentenceEnd;
  const space = text.lastIndexOf(' ', regionEnd);
  if (space > windowStart) return space + 1;
  return regionEnd;
}

/** Split without dropping characters. At most 5 parts, each about 6,000 characters unless the text is longer. */
export function splitTranscriptParts(transcript: string) {
  const trimmed = transcript.trim();
  if (!trimmed) return [];
  const target = Math.max(PART_TARGET, Math.ceil(trimmed.length / MAX_PARTS));
  const parts: string[] = [];
  let start = 0;
  while (start < trimmed.length && parts.length < MAX_PARTS - 1) {
    if (trimmed.length - start <= target) break;
    const cut = start + boundaryCut(trimmed.slice(start), target);
    const next = cut > start ? cut : Math.min(start + target, trimmed.length);
    parts.push(trimmed.slice(start, next));
    start = next;
  }
  if (start < trimmed.length) parts.push(trimmed.slice(start));
  return parts;
}

function cleanTitle(title: string) {
  return title.replace(/\s+/g, ' ').trim().split(' ').filter(Boolean).slice(0, 6).join(' ');
}

function collapseMap(input: string) {
  let text = '';
  const indexAt: number[] = [];
  let pendingSpace = false;
  let started = false;
  for (let index = 0; index < input.length; index += 1) {
    if (/\s/.test(input[index])) {
      if (started) pendingSpace = true;
      continue;
    }
    if (pendingSpace) {
      text += ' ';
      indexAt.push(index);
      pendingSpace = false;
    }
    text += input[index];
    indexAt.push(index);
    started = true;
  }
  return { text, indexAt };
}

export function parseStructureChapters(raw: string) {
  const unfenced = raw.replace(/```(?:json|text)?/gi, '').replace(/```/g, '').trim();
  const chunks = unfenced
    .split(/---CHAPTER---/i)
    .map((chunk) => chunk.trim())
    .filter(Boolean);
  const fromBlocks = chunks
    .map((chunk) => {
      const title = chunk.match(/^TITLE:\s*(.+)$/im)?.[1] ?? '';
      const text = chunk.match(/^TEXT:\s*([\s\S]*)$/im)?.[1]?.trim() ?? '';
      if (!text) return null;
      return { title: cleanTitle(title), text };
    })
    .filter((chapter): chapter is { title: string; text: string } => Boolean(chapter));
  if (fromBlocks.length > 0) return fromBlocks;

  try {
    const parsed = JSON.parse(unfenced) as unknown;
    const list = Array.isArray(parsed)
      ? parsed
      : parsed && typeof parsed === 'object' && Array.isArray((parsed as { chapters?: unknown }).chapters)
        ? (parsed as { chapters: unknown[] }).chapters
        : [];
    return list
      .map((item) => {
        if (!item || typeof item !== 'object') return null;
        const record = item as { title?: unknown; text?: unknown };
        const text = typeof record.text === 'string' ? record.text.trim() : '';
        if (!text) return null;
        return {
          title: cleanTitle(typeof record.title === 'string' ? record.title : ''),
          text,
        };
      })
      .filter((chapter): chapter is { title: string; text: string } => Boolean(chapter));
  } catch {
    return [];
  }
}

export function parseStructureSummary(raw: string) {
  const unfenced = raw.replace(/```(?:json|text)?/gi, '').replace(/```/g, '').trim();
  const labeled = unfenced.match(/^SUMMARY:\s*([\s\S]*)$/im)?.[1]?.trim();
  if (labeled) return labeled;
  try {
    const parsed = JSON.parse(unfenced) as { summary?: unknown };
    return typeof parsed.summary === 'string' ? parsed.summary.trim() : '';
  } catch {
    return unfenced;
  }
}

function partLabel(partNumber: number, gapIndex: number) {
  return gapIndex <= 1 ? `Part ${partNumber}` : `Part ${partNumber}.${gapIndex}`;
}

/**
 * Keep copied chapters only when they occur in the part.
 * A chapter that was changed or invented is dropped, and the unmatched original passage is kept as "Part N".
 */
export function chaptersFromModelReply(partText: string, raw: string, partNumber: number): StructureChapter[] {
  const source = partText.trim();
  if (!source) return [];
  const collapsed = collapseMap(source);
  let cursor = 0;
  const accepted: { title: string; start: number; end: number }[] = [];

  for (const chapter of parseStructureChapters(raw)) {
    const needle = normalizeForMatch(chapter.text);
    if (!needle) continue;
    const at = collapsed.text.indexOf(needle, cursor);
    if (at === -1 || at + needle.length > collapsed.indexAt.length) continue;
    const start = collapsed.indexAt[at];
    const end = collapsed.indexAt[at + needle.length - 1] + 1;
    accepted.push({ title: chapter.title, start, end });
    cursor = at + needle.length;
  }

  const chapters: StructureChapter[] = [];
  let previous = 0;
  let gapIndex = 0;
  const pushGap = (from: number, to: number) => {
    const slice = source.slice(from, to).trim();
    if (!slice || !speakerText(slice).trim()) return;
    gapIndex += 1;
    chapters.push({ title: partLabel(partNumber, gapIndex), text: slice, fallback: true });
  };

  for (const chapter of accepted) {
    if (chapter.start > previous) pushGap(previous, chapter.start);
    const text = source.slice(chapter.start, chapter.end).trim();
    if (text) {
      chapters.push({
        title: chapter.title || partLabel(partNumber, gapIndex + 1),
        text,
        fallback: false,
      });
    }
    previous = chapter.end;
  }
  if (previous < source.length) pushGap(previous, source.length);

  if (chapters.length === 0) {
    return [{ title: `Part ${partNumber}`, text: source, fallback: true }];
  }
  return chapters;
}

export function failedPartChapter(partNumber: number, partText: string): StructureChapter {
  return { title: `Part ${partNumber}`, text: partText.trim(), fallback: true };
}

export function summaryFromChapter(text: string) {
  const clean = text.replace(/\s+/g, ' ').trim();
  if (clean.length <= SUMMARY_CHAR_LIMIT) return clean;
  const room = SUMMARY_CHAR_LIMIT - 3;
  let cut = clean.slice(0, room);
  const word = cut.lastIndexOf(' ');
  if (word > Math.floor(room * 0.6)) cut = cut.slice(0, word);
  return `${cut.replace(/[.,;:\s]+$/, '')}...`;
}

export function clampSummary(text: string) {
  return summaryFromChapter(text);
}

/** Share of speaker words that do not appear in any chapter. */
export function missingSpeakerShare(transcript: string, chapterTexts: string[]) {
  const source = normalizeForMatch(speakerText(transcript)).split(' ').filter(Boolean);
  if (source.length === 0) return 0;
  const counts = new Map<string, number>();
  for (const word of normalizeForMatch(chapterTexts.map((text) => speakerText(text)).join(' ')).split(' ').filter(Boolean)) {
    counts.set(word, (counts.get(word) ?? 0) + 1);
  }
  let missing = 0;
  for (const word of source) {
    const left = counts.get(word) ?? 0;
    if (left > 0) counts.set(word, left - 1);
    else missing += 1;
  }
  return missing / source.length;
}

export function summaryPromptText(chapters: { title: string; text: string }[]) {
  const full = chapters.map((chapter) => `${chapter.title}\n${chapter.text}`).join('\n\n').trim();
  if (full.length <= 8000) return full;
  return chapters
    .map((chapter) => `${chapter.title}\n${chapter.text.replace(/\s+/g, ' ').trim().slice(0, 500)}`)
    .join('\n\n');
}

export const STRUCTURE_CHAPTER_PROMPT = `You split one part of a pasted interview into chapters for Building Bridges.
Rules:
- Use only the speaker's own words, copied from this part. Do not rewrite, translate, summarize, improve, reorder, or add anything. Only choose where to cut.
- Do not invent facts, names, or feelings.
- Leave interviewer lines out of the chapters. Lines labeled Interviewer:, Moderator:, Frage:, Question:, Q:, or I: are interviewer lines.
- If the part is long enough, make 4 to 6 chapters. If it is short, make fewer.
- Title: a short plain title of at most 6 words, in the language of the transcript. If a German title addresses the reader, use "du", never "Sie".
- Chapter text stays in the language of the transcript.
- Return only this format:
---CHAPTER---
TITLE: short title
TEXT:
exact copied words
---CHAPTER---`;

export const STRUCTURE_SUMMARY_PROMPT = `You write a story-card summary for Building Bridges.
Rules:
- At most 2 sentences and at most 240 characters.
- Use only what the chapters say. Do not invent facts, names, or feelings.
- Write in the language of the text. If the text is German and you address the reader, use "du", never "Sie".
- Return only:
SUMMARY: the short summary`;
