import { describe, expect, it } from 'vitest';
import {
  classifyInterviewReply,
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

describe('story interview replies', () => {
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
});
