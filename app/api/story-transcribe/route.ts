import { NextRequest, NextResponse } from 'next/server';
import { transcribeStoryAnswer } from '@/lib/ai/story-transcribe';

export const runtime = 'nodejs';
export const maxDuration = 60;

export async function POST(request: NextRequest) {
  try {
    const form = await request.formData();
    const audio = form.get('audio');
    const locale = form.get('locale') === 'de' ? 'de' : 'en';

    if (!(audio instanceof File)) {
      return NextResponse.json({ success: false, message: 'No audio was recorded.' }, { status: 400 });
    }

    const text = await transcribeStoryAnswer(audio, locale);
    if (!text) {
      return NextResponse.json(
        { success: false, message: 'No speech was recognised. Please try again.' },
        { status: 422 }
      );
    }

    return NextResponse.json({ success: true, text });
  } catch (error) {
    const code = error instanceof Error ? error.message : '';
    if (code === 'missing-key') {
      return NextResponse.json({ success: false, code: 'missing-key', message: 'Voice transcription is not configured.' }, { status: 503 });
    }
    if (code === 'too-large') {
      return NextResponse.json({ success: false, message: 'That recording is too long. Please try a shorter answer.' }, { status: 413 });
    }
    if (code === 'empty') {
      return NextResponse.json({ success: false, message: 'No audio was recorded.' }, { status: 400 });
    }

    console.error('Story transcribe route failed:', error);
    return NextResponse.json(
      { success: false, message: 'Voice could not be turned into text right now.' },
      { status: 500 }
    );
  }
}
