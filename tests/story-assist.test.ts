import { beforeEach, describe, expect, it, vi } from 'vitest';

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
  assistStoryDraft,
  classifyStoryAssistError,
  consumeStoryAssistRateLimit,
  parseStoryAssistContent,
  resetStoryAssistRateLimitForTests,
} from '@/lib/ai/story-assist';

function useUniversityTestSettings() {
  process.env.AI_API_KEY = 'test-key';
  process.env.AI_BASE_URL = 'https://ai.example.test/v1';
  process.env.AI_MODEL = 'test-model';
  delete process.env.OPENAI_API_KEY;
}

describe('story assist', () => {
  beforeEach(() => {
    createMock.mockReset();
    ctorMock.mockReset();
    resetStoryAssistRateLimitForTests();
    delete process.env.AI_API_KEY;
    delete process.env.AI_BASE_URL;
    delete process.env.AI_MODEL;
    delete process.env.OPENAI_API_KEY;
  });

  it('parses fenced JSON and does not treat plain text as a draft', () => {
    expect(
      parseStoryAssistContent('```json\n{"title":"A quiet start","category":"participant","draft":"I began."}\n```')
    ).toEqual({
      title: 'A quiet start',
      category: 'participant',
      draft: 'I began.',
    });
    expect(parseStoryAssistContent('Just a sentence.')).toBeNull();
    expect(createMock).not.toHaveBeenCalled();
  });

  it('uses the shared university client for a first draft', async () => {
    useUniversityTestSettings();
    createMock.mockResolvedValue({
      choices: [
        {
          message: {
            content: '{"title":"A new classroom","category":"participant","draft":"I started school."}',
          },
        },
      ],
    });

    const result = await assistStoryDraft({
      locale: 'en',
      action: 'draft',
      text: 'I started at a new school and I was alone.',
    });

    expect(result).toEqual({
      title: 'A new classroom',
      category: 'participant',
      draft: 'I started school.',
      source: 'ai',
    });
    const options = ctorMock.mock.calls[0]?.[0] as { apiKey?: string; baseURL?: string; timeout?: number };
    expect(options.apiKey).toBe('test-key');
    expect(options.baseURL).toBe('https://ai.example.test/v1');
    expect(options.timeout).toBe(30000);
    const request = createMock.mock.calls[0]?.[0] as {
      model?: string;
      temperature?: number;
      response_format?: unknown;
      messages?: { content: string }[];
    };
    expect(request.model).toBe('test-model');
    expect(request.temperature).toBe(0.3);
    expect(request.response_format).toBeUndefined();
    expect(request.messages?.[0]?.content).toMatch(/never invent facts/i);
    expect(request.messages?.[0]?.content).toMatch(/first person/i);
    expect(request.messages?.[0]?.content).toMatch(/"du"/);
  });

  it('asks for three titles in the person\'s language', async () => {
    useUniversityTestSettings();
    createMock.mockResolvedValue({
      choices: [{ message: { content: '```json\n{"titles":["Ein neuer Anfang","Allein in der Stadt","Mein erstes Jahr"]}\n```' } }],
    });

    const result = await assistStoryDraft({
      locale: 'en',
      action: 'story-title',
      text: 'Ich war allein, als ich in die Stadt gezogen bin.',
    });

    expect(result.titles).toEqual(['Ein neuer Anfang', 'Allein in der Stadt', 'Mein erstes Jahr']);
    const request = createMock.mock.calls[0]?.[0] as { messages?: { content: string }[] };
    expect(request.messages?.[0]?.content).toMatch(/3 short, plain titles/i);
    expect(request.messages?.[0]?.content).toMatch(/language of the person's text/i);
  });

  it('does not create a client when only OPENAI_API_KEY is set', async () => {
    process.env.OPENAI_API_KEY = 'test-key';

    await expect(
      assistStoryDraft({
        locale: 'en',
        action: 'draft',
        text: 'I wrote this in my own words.',
      })
    ).rejects.toThrow('missing-key');

    expect(ctorMock).not.toHaveBeenCalled();
    expect(createMock).not.toHaveBeenCalled();
    expect(classifyStoryAssistError(new Error('missing-key')).message).toBe(
      'AI writing help is not set up yet. You can keep editing yourself.'
    );
  });

  it('returns a friendly editing message when the mocked call fails', async () => {
    useUniversityTestSettings();
    createMock.mockRejectedValue(new Error('credit_balance_exhausted for a private story'));

    await expect(
      assistStoryDraft({ locale: 'en', action: 'draft', text: 'I was alone at the new school.' })
    ).rejects.toThrow('credit_balance_exhausted');

    const classified = classifyStoryAssistError(new Error('credit_balance_exhausted'));
    expect(classified.message).toMatch(/keep editing yourself/i);
    expect(classified.message.toLowerCase()).not.toContain('openai');
    expect(classified.message.toLowerCase()).not.toContain('credit');
    expect(classified.code).toBe('unavailable');
  });

  it('returns 429 after 30 requests in an hour for one signed-in user', () => {
    const start = 1_700_000_000_000;
    for (let count = 0; count < 30; count += 1) {
      expect(consumeStoryAssistRateLimit('user-1', start).status).toBe(200);
    }
    expect(consumeStoryAssistRateLimit('user-1', start).status).toBe(429);
    expect(consumeStoryAssistRateLimit('user-2', start).status).toBe(200);
  });
});
