import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

const createMock = vi.hoisted(() => vi.fn());
const ctorMock = vi.hoisted(() => vi.fn());

vi.mock('openai', () => {
  return {
    default: class OpenAI {
      chat = { completions: { create: createMock } };
      constructor(options: unknown) {
        ctorMock(options);
      }
    },
  };
});

import {
  classifyInterviewReply,
  conductStoryInterview,
  consumeStoryInterviewRateLimit,
  parseInterviewModelContent,
  resetStoryInterviewRateLimitForTests,
  scriptedInterviewTurn,
  type InterviewMessage,
} from '@/lib/ai/story-interview';

const started: InterviewMessage[] = [
  {
    role: 'assistant',
    content:
      'Would you like to share an experience, a mentoring story, or something about mental health and empowerment? You can also say no.',
  },
];

function useUniversityTestSettings() {
  process.env.AI_API_KEY = 'test-key';
  process.env.AI_BASE_URL = 'https://ai.example.test/v1';
  process.env.AI_MODEL = 'test-model';
  delete process.env.OPENAI_API_KEY;
}

describe('story interview replies', () => {
  beforeEach(() => {
    createMock.mockReset();
    ctorMock.mockReset();
    resetStoryInterviewRateLimitForTests();
    delete process.env.AI_API_KEY;
    delete process.env.AI_BASE_URL;
    delete process.env.AI_MODEL;
    delete process.env.OPENAI_API_KEY;
    vi.spyOn(console, 'error').mockImplementation(() => {});
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('treats a short no as a decline, not as a story answer', () => {
    expect(classifyInterviewReply('no')).toBe('decline');
    expect(classifyInterviewReply('Nein')).toBe('decline');
    expect(classifyInterviewReply('I do not want to share')).toBe('decline');
    expect(classifyInterviewReply('yes')).toBe('yes');
    expect(classifyInterviewReply('a mentoring story')).toBe('topic');
  });

  it('does not jump to the next canned question after no', () => {
    const result = scriptedInterviewTurn('en', 'reply', [
      ...started,
      { role: 'user', content: 'no' },
    ]);

    expect(result.source).toBe('scripted');
    expect(result.done).toBe(false);
    expect(result.reply).toMatch(/do not have to share/i);
    expect(result.reply).not.toMatch(/where and when/i);
  });

  it('stops after the user declines twice', () => {
    const result = scriptedInterviewTurn('en', 'reply', [
      ...started,
      { role: 'user', content: 'no' },
      { role: 'assistant', content: 'Would you like to try a different topic, or stop here?' },
      { role: 'user', content: 'no' },
    ]);

    expect(result.done).toBe(true);
    expect(result.reply).toMatch(/stop here|come back anytime/i);
    expect(result.reply).not.toMatch(/where and when/i);
  });

  it('asks which kind of story after a simple yes', () => {
    const result = scriptedInterviewTurn('en', 'reply', [
      ...started,
      { role: 'user', content: 'yes' },
    ]);

    expect(result.done).toBe(false);
    expect(result.reply).toMatch(/experience|mentoring|mental health/i);
    expect(result.reply).not.toMatch(/where and when/i);
  });

  it('keeps scripted question order after follow-up and decline replies', () => {
    const afterYes = scriptedInterviewTurn('en', 'reply', [
      ...started,
      { role: 'user', content: 'yes' },
      { role: 'assistant', content: 'Would it be an experience or a mentoring story?' },
      { role: 'user', content: 'a mentoring story' },
    ]);
    expect(afterYes.reply).toMatch(/where and when/i);
    expect(afterYes.reply).not.toMatch(/what happened/i);

    const afterDecline = scriptedInterviewTurn('en', 'reply', [
      ...started,
      { role: 'user', content: 'no' },
      { role: 'assistant', content: 'That is completely okay. Would you like to try a different topic?' },
      { role: 'user', content: 'I remember my first workshop' },
    ]);
    expect(afterDecline.reply).toMatch(/where and when/i);
    expect(afterDecline.reply).not.toMatch(/what happened/i);

    const third = scriptedInterviewTurn('en', 'reply', [
      { role: 'assistant', content: 'First question' },
      { role: 'user', content: 'I remember my first workshop' },
      { role: 'assistant', content: 'This follow-up should not count as a question' },
      { role: 'user', content: 'It was last spring in my city' },
    ]);
    expect(third.reply).toMatch(/what happened/i);
  });

  it('does not call the AI for English or German stop phrases', async () => {
    useUniversityTestSettings();

    const english = await conductStoryInterview({
      locale: 'en',
      action: 'reply',
      messages: [...started, { role: 'user', content: "I'm done" }],
    });
    const german = await conductStoryInterview({
      locale: 'de',
      action: 'reply',
      messages: [...started, { role: 'user', content: 'Ich bin fertig' }],
    });

    expect(english.done).toBe(true);
    expect(german.done).toBe(true);
    expect(german.reply).toMatch(/hören hier auf|wiederkommen/i);
    expect(createMock).not.toHaveBeenCalled();
    expect(ctorMock).not.toHaveBeenCalled();
  });

  it('recognizes a German wish to stop, answers in German, and does not call the AI', async () => {
    useUniversityTestSettings();

    const phrase = 'Ich möchte nicht weitermachen.';
    expect(classifyInterviewReply(phrase)).toBe('stop');

    const result = await conductStoryInterview({
      locale: 'en',
      action: 'reply',
      messages: [...started, { role: 'user', content: phrase }],
    });

    expect(result.done).toBe(true);
    expect(result.reply).toMatch(/Du kannst jederzeit wiederkommen/);
    expect(result.reply).not.toMatch(/come back anytime/i);
    expect(createMock).not.toHaveBeenCalled();
    expect(ctorMock).not.toHaveBeenCalled();
  });

  it('does not call the AI for danger phrases and pauses with help numbers', async () => {
    useUniversityTestSettings();

    const english = await conductStoryInterview({
      locale: 'en',
      action: 'reply',
      messages: [...started, { role: 'user', content: 'I want to die' }],
    });
    const german = await conductStoryInterview({
      locale: 'de',
      action: 'reply',
      messages: [...started, { role: 'user', content: 'ich will sterben' }],
    });

    for (const result of [english, german]) {
      expect(result.paused).toBe(true);
      expect(result.done).toBe(false);
      expect(result.reply).toContain('0800 111 0 111');
      expect(result.reply).toContain('0800 111 0 222');
      expect(result.reply).toContain('116 111');
      expect(result.transcript).toContain(result === english ? 'I want to die' : 'ich will sterben');
    }
    expect(english.reply).toMatch(/draft is still saved/i);
    expect(german.reply).toMatch(/Entwurf bleibt gespeichert/);
    expect(createMock).not.toHaveBeenCalled();
    expect(ctorMock).not.toHaveBeenCalled();
  });

  it('uses the scripted questions when only OPENAI_API_KEY is set', async () => {
    process.env.OPENAI_API_KEY = 'test-key';

    const result = await conductStoryInterview({
      locale: 'en',
      action: 'start',
      messages: [],
    });

    expect(result.source).toBe('scripted');
    expect(result.reply).toMatch(/gentle questions/i);
    expect(ctorMock).not.toHaveBeenCalled();
    expect(createMock).not.toHaveBeenCalled();
  });

  it('uses the scripted fallback when no key is configured', async () => {
    const result = await conductStoryInterview({
      locale: 'en',
      action: 'start',
      messages: [],
    });

    expect(result.source).toBe('scripted');
    expect(result.reply).toMatch(/gentle questions/i);
    expect(createMock).not.toHaveBeenCalled();
    expect(ctorMock).not.toHaveBeenCalled();
    expect(console.error).toHaveBeenCalledWith('Story interview fallback used');
  });

  it('returns 429 after 30 messages in an hour for one signed-in user', () => {
    const start = 1_700_000_000_000;
    for (let count = 0; count < 30; count += 1) {
      expect(consumeStoryInterviewRateLimit('user-1', start + count).status).toBe(200);
    }
    expect(consumeStoryInterviewRateLimit('user-1', start + 30).status).toBe(429);
    expect(consumeStoryInterviewRateLimit('user-2', start + 30).status).toBe(200);
    expect(consumeStoryInterviewRateLimit('user-1', start + 60 * 60 * 1000).status).toBe(200);
  });

  it('parses fenced JSON and plain text without calling the AI', () => {
    expect(parseInterviewModelContent('```json\n{"reply":"Hi there","done":true}\n```')).toEqual({
      reply: 'Hi there',
      done: true,
    });
    expect(parseInterviewModelContent('Just a sentence about the next question.')).toEqual({
      reply: 'Just a sentence about the next question.',
      done: false,
    });
    expect(createMock).not.toHaveBeenCalled();
  });

  it('uses the mocked university client and never a live key', async () => {
    useUniversityTestSettings();
    createMock.mockResolvedValue({
      choices: [{ message: { content: '```json\n{"reply":"What happened next?","done":false}\n```' } }],
    });

    const result = await conductStoryInterview({
      locale: 'en',
      action: 'reply',
      messages: [...started, { role: 'user', content: 'I remember a workshop' }],
    });

    expect(result.source).toBe('ai');
    expect(result.reply).toBe('What happened next?');
    expect(ctorMock).toHaveBeenCalledTimes(1);
    const options = ctorMock.mock.calls[0]?.[0] as { apiKey?: string; baseURL?: string; timeout?: number };
    expect(options.apiKey).toBe('test-key');
    expect(options.baseURL).toBe('https://ai.example.test/v1');
    expect(options.timeout).toBe(20000);
    const request = createMock.mock.calls[0]?.[0] as { temperature?: number; max_tokens?: number; response_format?: unknown };
    expect(request.temperature).toBe(0.3);
    expect(request.max_tokens).toBe(280);
    expect(request.response_format).toBeUndefined();
  });

  it('falls back without logging the user text when the mocked call fails', async () => {
    useUniversityTestSettings();
    createMock.mockRejectedValue(new Error('private story about the river'));

    const result = await conductStoryInterview({
      locale: 'en',
      action: 'reply',
      messages: [...started, { role: 'user', content: 'It happened at my school in Berlin' }],
    });

    expect(result.source).toBe('scripted');
    expect(result.reply).toMatch(/where and when/i);
    const logged = vi.mocked(console.error).mock.calls.flat().join('\n');
    expect(logged).toContain('Story interview fallback used');
    expect(logged).not.toContain('Berlin');
    expect(logged).not.toContain('river');
  });
});
