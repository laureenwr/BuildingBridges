import { NextRequest, NextResponse } from 'next/server';
import { requireApiStorySubmitter } from '@/lib/auth/access';
import { assistStoryDraft, classifyStoryAssistError, type StoryAssistAction } from '@/lib/ai/story-assist';

export const runtime = 'nodejs';
export const maxDuration = 60;

const ACTIONS: StoryAssistAction[] = ['grammar', 'titles', 'story-title', 'draft'];

export async function POST(request: NextRequest) {
  const auth = await requireApiStorySubmitter();
  if (auth.response) return auth.response;

  try {
    const body = (await request.json()) as {
      locale?: unknown;
      action?: unknown;
      text?: unknown;
      currentLabel?: unknown;
    };

    const locale = body.locale === 'de' ? 'de' : 'en';
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

    const result = await assistStoryDraft({ locale, action, text, currentLabel });
    return NextResponse.json({ success: true, ...result });
  } catch (error) {
    const classified = classifyStoryAssistError(error);
    if (classified.code === 'unavailable') {
      const rec = error && typeof error === 'object' ? (error as { status?: number; code?: unknown; type?: unknown }) : {};
      console.error('Story assist route failed:', rec.status ?? '', rec.code ?? '', rec.type ?? '');
    }
    return NextResponse.json(
      { success: false, code: classified.code, message: classified.message },
      { status: classified.status }
    );
  }
}
