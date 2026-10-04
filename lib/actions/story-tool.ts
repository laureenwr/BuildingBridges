'use server';

import { headers } from 'next/headers';
import { userCanSubmitStories } from '@/lib/auth/admin-emails';
import { getUser } from '@/lib/db/queries';

type StoryToolSubmissionPayload = {
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

type StoryToolSubmissionResult = {
  success: boolean;
  message: string;
};

function isNonEmptyString(value: unknown): value is string {
  return typeof value === 'string' && value.trim().length > 0;
}

function validatePayload(payload: StoryToolSubmissionPayload): string | null {
  if (!isNonEmptyString(payload.sessionId)) return 'Missing story session ID.';
  if (payload.consent !== true) return 'Consent is required before submitting a story.';
  if (!isNonEmptyString(payload.story.title)) return 'Missing story title.';
  if (!isNonEmptyString(payload.story.summary)) return 'Missing story summary.';
  if (!Array.isArray(payload.story.timeline) || payload.story.timeline.length === 0) {
    return 'Missing story timeline.';
  }
  if (!Array.isArray(payload.story.quotes)) return 'Missing story quotes.';
  if (!isNonEmptyString(payload.story.empowermentMessage)) return 'Missing empowerment message.';
  if (!Array.isArray(payload.conversation) || payload.conversation.length === 0) {
    return 'Missing transcript conversation data.';
  }
  return null;
}

function getRequestOrigin() {
  const headerList = headers();
  const host = headerList.get('host');
  if (!host) return null;
  const protocol = headerList.get('x-forwarded-proto') ?? (host.startsWith('localhost') ? 'http' : 'https');
  return `${protocol}://${host}`;
}

export async function submitStoryToolStory(payload: StoryToolSubmissionPayload): Promise<StoryToolSubmissionResult> {
  const user = await getUser();
  if (!userCanSubmitStories(user)) {
    return { success: false, message: 'Please sign in to submit a story.' };
  }

  const validationError = validatePayload(payload);
  if (validationError) {
    return { success: false, message: validationError };
  }

  const apiKey = process.env.STORIES_API_KEY;
  if (!apiKey) {
    return { success: false, message: 'Story submission is not configured yet.' };
  }

  const origin = getRequestOrigin();
  if (!origin) {
    return { success: false, message: 'Could not determine the submission endpoint.' };
  }

  try {
    const cookie = headers().get('cookie');
    const response = await fetch(`${origin}/api/stories/submit`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': apiKey,
        ...(cookie ? { cookie } : {}),
      },
      body: JSON.stringify(payload),
      cache: 'no-store',
    });

    const result = await response.json().catch(() => null);
    if (!response.ok || !result?.success) {
      return {
        success: false,
        message:
          typeof result?.message === 'string'
            ? result.message
            : 'Story submission failed. Please try again later.',
      };
    }

    return {
      success: true,
      message: 'Your story has been submitted and is awaiting human review.',
    };
  } catch (error) {
    console.error('Story tool submission failed:', error);
    return { success: false, message: 'Network error while submitting the story.' };
  }
}

