import OpenAI from 'openai';

const MAX_AUDIO_BYTES = 8 * 1024 * 1024;

export async function transcribeStoryAnswer(file: File, locale: 'en' | 'de') {
  if (!process.env.OPENAI_API_KEY) {
    throw new Error('missing-key');
  }
  if (file.size <= 0) {
    throw new Error('empty');
  }
  if (file.size > MAX_AUDIO_BYTES) {
    throw new Error('too-large');
  }

  const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
  const named = new File([file], file.name || 'answer.webm', {
    type: file.type || 'audio/webm',
  });

  const result = await openai.audio.transcriptions.create({
    file: named,
    model: 'whisper-1',
    language: locale,
  });

  return result.text.trim();
}
