import OpenAI from 'openai';

export type StoryAiSettings = {
  apiKey: string;
  baseURL: string;
  model: string;
};

export function readStoryAiSettings(): StoryAiSettings | null {
  const apiKey = process.env.AI_API_KEY?.trim();
  const baseURL = process.env.AI_BASE_URL?.trim();
  const model = process.env.AI_MODEL?.trim();
  if (!apiKey || !baseURL || !model) return null;
  return { apiKey, baseURL, model };
}

export function openStoryAiClient(timeoutMs: number): { client: OpenAI; model: string } | null {
  const settings = readStoryAiSettings();
  if (!settings) return null;
  return {
    model: settings.model,
    client: new OpenAI({
      apiKey: settings.apiKey,
      baseURL: settings.baseURL,
      timeout: timeoutMs,
      maxRetries: 0,
    }),
  };
}
