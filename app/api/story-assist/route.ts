import { NextRequest, NextResponse } from 'next/server';
import { requireApiStorySubmitter } from '@/lib/auth/access';
import {
  assistStoryDraft,
  classifyStoryAssistError,
  consumeStoryAssistRateLimit,
  type StoryAssistAction,
} from '@/lib/ai/story-assist';

export const runtime = 'nodejs';
export const maxDuration = 60;

const ACTIONS: StoryAssistAction[] = ['grammar', 'titles', 'story-title', 'draft'];

function rateLimitMessage(locale: 'en' | 'de') {
  return locale === 'de'
    ? 'Du hast die KI-Hilfe in dieser Stunde oft benutzt. Warte ein wenig und versuche es dann erneut. Du kannst selbst weiterbearbeiten.'
    : 'You have used AI help many times this hour. Please wait a little, then try again. You can keep editing yourself.';
}

function routeFailureFact(error: unknown) {
  const record = error && typeof error === 'object' ? (error as { name?: unknown; status?: unknown }) : {};
  const name = typeof record.name === 'string' && /^[A-Za-z0-9_.:-]{1,80}$/.test(record.name) ? record.name : 'unknown';
  const status = typeof record.status === 'number' ? String(record.status) : 'none';
  return `name=${name} status=${status}`;
}

function unavailableMessage(locale: 'en' | 'de') {
  return locale === 'de'
    ? 'Die KI-Hilfe ist gerade nicht verfügbar. Du kannst selbst weiterbearbeiten.'
    : 'AI help is not available right now. You can keep editing yourself.';
}

export async function POST(request: NextRequest) {
  const auth = await requireApiStorySubmitter();
  if (auth.response) return auth.response;
  if (!auth.user) {
    return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });
  }

  let locale: 'en' | 'de' = 'en';
  try {
    const body = (await request.json()) as {
      locale?: unknown;
      action?: unknown;
      text?: unknown;
      currentLabel?: unknown;
    };

    locale = body.locale === 'de' ? 'de' : 'en';
    const action = ACTIONS.includes(body.action as StoryAssistAction)
      ? (body.action as StoryAssistAction)
      : null;
    const text = typeof body.text === 'string' ? body.text : '';
    const currentLabel = typeof body.currentLabel === 'string' ? body.currentLabel : '';

    if (!action) {
      return NextResponse.json({ success: false, message: 'Invalid assist action.' }, { status: 400 });
    }
    if (!text.trim()) {
      return NextResponse.json({ success: false, message: 'Add some text first.' }, { status: 400 });
    }

    const limit = consumeStoryAssistRateLimit(String(auth.user.id));
    if (limit.status === 429) {
      return NextResponse.json({ success: false, message: rateLimitMessage(locale) }, { status: 429 });
    }

    const result = await assistStoryDraft({ locale, action, text, currentLabel });
    return NextResponse.json({ success: true, ...result });
  } catch (error) {
    const classified = classifyStoryAssistError(error);
    const message = classified.code === 'unavailable' ? unavailableMessage(locale) : classified.message;
    if (classified.code === 'unavailable') {
      console.error(`Story assist failed: ${routeFailureFact(error)}`);
    }
    return NextResponse.json({ success: false, code: classified.code, message }, { status: classified.status });
  }
}
