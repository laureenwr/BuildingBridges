import { NextRequest, NextResponse } from 'next/server';
import { requireApiStorySubmitter } from '@/lib/auth/access';
import { parseStorySubmitBody, type StorySubmitBody } from '@/lib/stories/submit-helpers';
import { submitStoryRecord } from '@/lib/stories/submit-story';

export const runtime = 'nodejs';

export async function POST(request: NextRequest) {
  const auth = await requireApiStorySubmitter();
  if (auth.response || !auth.user) {
    return auth.response ?? NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });
  }

  const configuredApiKey = process.env.STORIES_API_KEY;
  const incomingApiKey = request.headers.get('x-api-key');
  if (!configuredApiKey || incomingApiKey !== configuredApiKey) {
    return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });
  }

  let body: StorySubmitBody;
  try {
    body = (await request.json()) as StorySubmitBody;
  } catch {
    return NextResponse.json({ success: false, message: 'Request body must be valid JSON.' }, { status: 400 });
  }

  const parsed = parseStorySubmitBody(body);
  if (!parsed.ok) {
    return NextResponse.json({ success: false, message: parsed.error }, { status: 400 });
  }

  if (!parsed.data.consent) {
    return NextResponse.json(
      { success: false, message: 'Consent is required before submitting a story.' },
      { status: 400 }
    );
  }

  try {
    const created = await submitStoryRecord(parsed.data, auth.user.id);
    return NextResponse.json({ success: true, id: created.id });
  } catch (error) {
    console.error('Error submitting story:', error);
    return NextResponse.json({ success: false, message: 'Failed to submit story.' }, { status: 500 });
  }
}
