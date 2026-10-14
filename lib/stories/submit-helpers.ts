export function isMissingUserIdColumn(error: unknown) {
  const text = error instanceof Error ? error.message : String(error);
  return /user_id/i.test(text) && /(does not exist|undefined column|42703)/i.test(text);
}

export type StorySubmitBody = {
  sessionId?: unknown;
  consent?: unknown;
  story?: {
    title?: unknown;
    summary?: unknown;
    timeline?: unknown;
    quotes?: unknown;
    empowermentMessage?: unknown;
  };
  conversation?: unknown;
};

export type ValidStorySubmitBody = {
  sessionId: string;
  consent: boolean;
  story: {
    title: string;
    summary: string;
    timeline: unknown[];
    quotes: unknown[];
    empowermentMessage: string;
  };
  conversation: unknown[];
};

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

function isNonEmptyString(value: unknown): value is string {
  return typeof value === 'string' && value.trim().length > 0;
}

export function parseStorySubmitBody(
  body: StorySubmitBody
): { ok: true; data: ValidStorySubmitBody } | { ok: false; error: string } {
  if (!isNonEmptyString(body.sessionId)) return { ok: false, error: 'sessionId is required.' };
  if (typeof body.consent !== 'boolean') return { ok: false, error: 'consent must be a boolean.' };
  if (!isRecord(body.story)) return { ok: false, error: 'story is required.' };
  if (!isNonEmptyString(body.story.title)) return { ok: false, error: 'story.title is required.' };
  if (!isNonEmptyString(body.story.summary)) return { ok: false, error: 'story.summary is required.' };
  if (!Array.isArray(body.story.timeline) || body.story.timeline.length === 0) {
    return { ok: false, error: 'story.timeline must be a non-empty array.' };
  }
  if (!Array.isArray(body.story.quotes)) return { ok: false, error: 'story.quotes must be an array.' };
  if (!isNonEmptyString(body.story.empowermentMessage)) {
    return { ok: false, error: 'story.empowermentMessage is required.' };
  }
  if (!Array.isArray(body.conversation)) return { ok: false, error: 'conversation must be an array.' };

  return {
    ok: true,
    data: {
      sessionId: body.sessionId.trim(),
      consent: body.consent,
      story: {
        title: body.story.title.trim(),
        summary: body.story.summary.trim(),
        timeline: body.story.timeline,
        quotes: body.story.quotes,
        empowermentMessage: body.story.empowermentMessage.trim(),
      },
      conversation: body.conversation,
    },
  };
}
