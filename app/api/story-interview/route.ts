import { NextRequest, NextResponse } from 'next/server';
import { requireApiStorySubmitter } from '@/lib/auth/access';
import {
  conductStoryInterview,
  consumeStoryInterviewRateLimit,
  sanitizeInterviewMessages,
  type InterviewAction,
} from '@/lib/ai/story-interview';
import { matchesStoryDanger } from '@/lib/ai/story-interview-safety';

export const runtime = 'nodejs';

const ACTIONS: InterviewAction[] = ['start', 'reply', 'skip', 'finish'];

function rateLimitMessage(locale: 'en' | 'de') {
  return locale === 'de'
    ? 'Du hast in dieser Stunde viele Nachrichten geschickt. Warte ein wenig und versuche es dann erneut. Dein Entwurf bleibt gespeichert.'
    : 'You have sent many messages this hour. Please wait a little, then try again. Your draft is still saved.';
}

function routeFailureFact(error: unknown) {
  const record = error && typeof error === 'object' ? (error as { name?: unknown; status?: unknown }) : {};
  const name = typeof record.name === 'string' && /^[A-Za-z0-9_.:-]{1,80}$/.test(record.name) ? record.name : 'unknown';
  const status = typeof record.status === 'number' ? String(record.status) : 'none';
  return `name=${name} status=${status}`;
}

function lastUserText(messages: { role: string; content: string }[]) {
  for (let index = messages.length - 1; index >= 0; index -= 1) {
    if (messages[index]?.role === 'user') return messages[index]?.content ?? '';
  }
  return '';
}

export async function POST(request: NextRequest) {
  const auth = await requireApiStorySubmitter();
  if (auth.response) return auth.response;
  if (!auth.user) {
    return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });
  }

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

    const messages = sanitizeInterviewMessages(body.messages);
    if (!matchesStoryDanger(lastUserText(messages))) {
      const limit = consumeStoryInterviewRateLimit(String(auth.user.id));
      if (limit.status === 429) {
        return NextResponse.json({ success: false, message: rateLimitMessage(locale) }, { status: 429 });
      }
    }

    const result = await conductStoryInterview({ locale, action, messages });
    const payload: {
      success: true;
      reply: string;
      done: boolean;
      paused: boolean;
      transcript: string;
      source?: 'ai' | 'scripted';
    } = {
      success: true,
      reply: result.reply,
      done: result.done,
      paused: Boolean(result.paused),
      transcript: result.transcript,
    };
    if (process.env.NODE_ENV === 'development') {
      payload.source = result.source;
    }

    return NextResponse.json(payload);
  } catch (error) {
    console.error(`Story interview route failed: ${routeFailureFact(error)}`);
    return NextResponse.json(
      { success: false, message: 'The interview could not continue right now.' },
      { status: 500 }
    );
  }
}
