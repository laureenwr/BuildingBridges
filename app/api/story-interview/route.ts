import { NextRequest, NextResponse } from 'next/server';
import {
  conductStoryInterview,
  sanitizeInterviewMessages,
  type InterviewAction,
} from '@/lib/ai/story-interview';

export const runtime = 'nodejs';

const ACTIONS: InterviewAction[] = ['start', 'reply', 'skip', 'finish'];

export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as {
      locale?: unknown;
      action?: unknown;
      messages?: unknown;
    };

    const locale = body.locale === 'de' ? 'de' : 'en';
    const action = ACTIONS.includes(body.action as InterviewAction)
      ? (body.action as InterviewAction)
      : null;

    if (!action) {
      return NextResponse.json({ success: false, message: 'Invalid interview action.' }, { status: 400 });
    }

    const result = await conductStoryInterview({
      locale,
      action,
      messages: sanitizeInterviewMessages(body.messages),
    });

    return NextResponse.json({ success: true, ...result });
  } catch (error) {
    console.error('Story interview route failed:', error);
    return NextResponse.json(
      { success: false, message: 'The interview could not continue right now.' },
      { status: 500 }
    );
  }
}
