'use server';

import { userCanSubmitStories } from '@/lib/auth/admin-emails';
import { getUser } from '@/lib/db/queries';
import { parseStorySubmitBody } from '@/lib/stories/submit-helpers';
import { submitStoryRecord } from '@/lib/stories/submit-story';

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

export async function submitStoryToolStory(
  payload: StoryToolSubmissionPayload
): Promise<StoryToolSubmissionResult> {
  const user = await getUser();
  if (!userCanSubmitStories(user)) {
    return { success: false, message: 'Please sign in to submit a story.' };
  }

  const parsed = parseStorySubmitBody(payload);
  if (!parsed.ok) {
    return { success: false, message: parsed.error };
  }
  if (!parsed.data.consent) {
    return { success: false, message: 'Consent is required before submitting a story.' };
  }

  try {
    await submitStoryRecord(parsed.data, user.id);
    return {
      success: true,
      message: 'Your story has been submitted and is awaiting human review.',
    };
  } catch (error) {
    console.error('Story tool submission failed:', error);
    return { success: false, message: 'Failed to submit story.' };
  }
}
