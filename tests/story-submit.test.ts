import { describe, expect, it } from 'vitest';
import { asQueryRows } from '@/lib/db/query-rows';
import { isMissingUserIdColumn, parseStorySubmitBody } from '@/lib/stories/submit-helpers';
import { parseStoryToolDraft } from '@/lib/story-tool-draft';

const storyToolPayload = {
  sessionId: 'story-tool-test-session',
  consent: true,
  story: {
    title: 'A mentoring afternoon',
    summary: 'We sat together and talked through the first weeks.',
    timeline: [
      {
        order: 1,
        label: 'Beginning',
        icon: '📖',
        text: 'We sat together and talked through the first weeks.',
        quote: 'You are not alone in this.',
      },
    ],
    quotes: [{ label: 'Beginning', text: 'You are not alone in this.' }],
    empowermentMessage: 'Keep going, one conversation at a time.',
  },
  conversation: [
    {
      type: 'transcript',
      storyType: 'mentor',
      text: 'We sat together and talked through the first weeks.',
    },
  ],
};

describe('story submit payload', () => {
  it('accepts the story-tool chapter payload used by the mentor flow', () => {
    const parsed = parseStorySubmitBody(storyToolPayload);
    expect(parsed.ok).toBe(true);
    if (!parsed.ok) return;
    expect(parsed.data.story.timeline).toHaveLength(1);
    expect(parsed.data.conversation[0]).toMatchObject({ storyType: 'mentor' });
  });

  it('rejects an empty timeline so a blank story cannot be stored', () => {
    const parsed = parseStorySubmitBody({
      ...storyToolPayload,
      story: { ...storyToolPayload.story, timeline: [] },
    });
    expect(parsed.ok).toBe(false);
  });

  it('detects a missing user_id column from Postgres', () => {
    expect(
      isMissingUserIdColumn(new Error('column "user_id" of relation "stories" does not exist'))
    ).toBe(true);
    expect(isMissingUserIdColumn(new Error('duplicate key value'))).toBe(false);
  });
});

describe('query row shape', () => {
  it('reads drizzle arrays and neon { rows } results', () => {
    expect(asQueryRows<{ id: number }>([{ id: 12 }])).toEqual([{ id: 12 }]);
    expect(asQueryRows<{ id: number }>({ rows: [{ id: 19 }] })).toEqual([{ id: 19 }]);
    expect(asQueryRows({ fields: [] })).toEqual([]);
  });
});

describe('story tool draft persistence', () => {
  it('restores chapters so a failed submit does not lose the story', () => {
    const draft = parseStoryToolDraft(
      JSON.stringify({
        step: 4,
        collectMode: 'paste',
        transcript: 'We sat together.',
        answers: [],
        storyTitle: 'A mentoring afternoon',
        chapters: [
          {
            id: 'ch-1',
            label: 'Beginning',
            icon: '📖',
            text: 'We sat together and talked through the first weeks.',
            quote: 'You are not alone in this.',
          },
        ],
        storyType: 'mentor',
        consentGiven: true,
        sessionId: 'story-tool-test-session',
      })
    );

    expect(draft?.storyTitle).toBe('A mentoring afternoon');
    expect(draft?.chapters[0]?.text).toContain('first weeks');
    expect(draft?.step).toBe(4);
  });

  it('returns null for corrupt storage instead of throwing', () => {
    expect(parseStoryToolDraft('{not-json')).toBeNull();
    expect(parseStoryToolDraft(null)).toBeNull();
  });
});
