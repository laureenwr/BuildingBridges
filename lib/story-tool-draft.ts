export const STORY_TOOL_DRAFT_KEY = 'bb_story_tool_draft_v1';

export type StoryToolDraft = {
  step: 1 | 2 | 3 | 4;
  collectMode: 'paste' | 'interview';
  transcript: string;
  answers: { question: string; text: string }[];
  storyTitle: string;
  chapters: { id: string; label: string; icon: string; text: string; quote: string }[];
  storyType: 'mentor' | 'participant' | 'awareness';
  consentGiven: boolean;
  sessionId: string;
};

export function parseStoryToolDraft(raw: string | null): StoryToolDraft | null {
  if (!raw) return null;
  try {
    const parsed = JSON.parse(raw) as Partial<StoryToolDraft>;
    if (!parsed || typeof parsed !== 'object') return null;
    const answers = Array.isArray(parsed.answers)
      ? parsed.answers
          .filter((item): item is { question: string; text: string } => {
            return (
              typeof item === 'object' &&
              item !== null &&
              typeof (item as { question?: unknown }).question === 'string' &&
              typeof (item as { text?: unknown }).text === 'string'
            );
          })
          .map((item) => ({ question: item.question, text: item.text }))
      : [];
    const chapters = Array.isArray(parsed.chapters)
      ? parsed.chapters
          .filter((item): item is StoryToolDraft['chapters'][number] => {
            return (
              typeof item === 'object' &&
              item !== null &&
              typeof (item as { id?: unknown }).id === 'string' &&
              typeof (item as { label?: unknown }).label === 'string' &&
              typeof (item as { icon?: unknown }).icon === 'string' &&
              typeof (item as { text?: unknown }).text === 'string' &&
              typeof (item as { quote?: unknown }).quote === 'string'
            );
          })
          .map((item) => ({
            id: item.id,
            label: item.label,
            icon: item.icon,
            text: item.text,
            quote: item.quote,
          }))
      : [];
    return {
      step: parsed.step === 2 || parsed.step === 3 || parsed.step === 4 ? parsed.step : 1,
      collectMode: parsed.collectMode === 'interview' ? 'interview' : 'paste',
      transcript: typeof parsed.transcript === 'string' ? parsed.transcript : '',
      answers,
      storyTitle: typeof parsed.storyTitle === 'string' ? parsed.storyTitle : '',
      chapters,
      storyType:
        parsed.storyType === 'participant' || parsed.storyType === 'awareness'
          ? parsed.storyType
          : 'mentor',
      consentGiven: parsed.consentGiven === true,
      sessionId: typeof parsed.sessionId === 'string' ? parsed.sessionId : '',
    };
  } catch {
    return null;
  }
}

export function loadStoryToolDraft(): StoryToolDraft | null {
  if (typeof window === 'undefined') return null;
  return parseStoryToolDraft(window.localStorage.getItem(STORY_TOOL_DRAFT_KEY));
}

export function saveStoryToolDraft(draft: StoryToolDraft) {
  if (typeof window === 'undefined') return;
  try {
    window.localStorage.setItem(STORY_TOOL_DRAFT_KEY, JSON.stringify(draft));
  } catch {
    /* ignore quota */
  }
}

export function clearStoryToolDraft() {
  if (typeof window === 'undefined') return;
  try {
    window.localStorage.removeItem(STORY_TOOL_DRAFT_KEY);
  } catch {
    /* ignore */
  }
}
