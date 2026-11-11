import { describe, expect, it } from 'vitest';
import { mapApprovedStoryToCommunityStory } from '@/lib/content/communityStories';
import {
  chaptersFromModelReply,
  failedPartChapter,
  missingSpeakerShare,
  splitTranscriptParts,
  summaryFromChapter,
} from '@/lib/ai/story-structure';

const interview = [
  'Interviewer: Where did you grow up?',
  'I grew up near the river.',
  'Interviewer: What changed?',
  'I moved to Berlin for school.',
].join('\n');

describe('transcript structure', () => {
  it('splits a long transcript into ordered parts without dropping text', () => {
    const paragraph = 'I kept going one sentence at a time. ';
    const transcript = Array.from({ length: 4 }, () => paragraph.repeat(80)).join('\n\n');
    const parts = splitTranscriptParts(transcript);
    expect(parts.length).toBeGreaterThan(1);
    expect(parts.length).toBeLessThanOrEqual(5);
    expect(parts.join('')).toBe(transcript.trim());
    expect(parts[0].length).toBeLessThan(transcript.length);
  });

  it('drops a chapter that is not in the transcript and keeps that passage as Part N', () => {
    const raw = [
      '---CHAPTER---',
      'TITLE: The river',
      'TEXT:',
      'I grew up near the river.',
      '---CHAPTER---',
      'TITLE: The moon',
      'TEXT:',
      'I flew to the moon last winter.',
    ].join('\n');

    const chapters = chaptersFromModelReply(interview, raw, 2);
    const combined = chapters.map((chapter) => chapter.text).join('\n');
    expect(combined).toContain('I grew up near the river.');
    expect(combined).toContain('I moved to Berlin for school.');
    expect(combined).not.toContain('moon');
    expect(chapters.some((chapter) => chapter.title === 'Part 2' && chapter.fallback)).toBe(true);
  });

  it('leaves interviewer lines out of copied chapters', () => {
    const raw = [
      '---CHAPTER---',
      'TITLE: The river',
      'TEXT:',
      'I grew up near the river.',
      '---CHAPTER---',
      'TITLE: Berlin',
      'TEXT:',
      'I moved to Berlin for school.',
    ].join('\n');
    const chapters = chaptersFromModelReply(interview, raw, 1);
    const combined = chapters.map((chapter) => chapter.text).join('\n');
    expect(combined).not.toMatch(/Interviewer:/);
    expect(chapters.every((chapter) => !chapter.fallback)).toBe(true);
  });

  it('keeps a failed part in full as Part N', () => {
    const part = 'I grew up near the river.\n\nI moved to Berlin for school.';
    const chapter = failedPartChapter(3, part);
    expect(chapter.title).toBe('Part 3');
    expect(chapter.text).toBe(part);
    expect(chapter.text.length).toBe(part.length);
  });

  it('limits a summary to 240 characters on a word boundary', () => {
    const summary = summaryFromChapter(`word `.repeat(80));
    expect(summary.length).toBeLessThanOrEqual(240);
    expect(summary.endsWith('...')).toBe(true);
    expect(summary.endsWith(' ...')).toBe(false);
  });

  it('notices when more than 15 percent of the speaker words are missing', () => {
    const transcript = 'one two three four five six seven eight nine ten';
    expect(missingSpeakerShare(transcript, ['one two three four five six seven eight'])).toBeGreaterThan(0.15);
    expect(missingSpeakerShare(interview, ['I grew up near the river.', 'I moved to Berlin for school.'])).toBe(0);
  });

  it('does not count a duplicate empowerment text as an extra chapter', () => {
    const story = {
      id: 4,
      title: 'A river',
      summary: 'I grew up near the river.',
      empowermentMessage: 'I moved to Berlin for school.',
      timeline: [
        { label: 'River', text: 'I grew up near the river.', quote: '', icon: '📖' },
        { label: 'Berlin', text: 'I moved to Berlin for school.', quote: '', icon: '🌍' },
      ],
      quotes: [],
    };
    expect(mapApprovedStoryToCommunityStory(story).chapters).toHaveLength(2);
    expect(
      mapApprovedStoryToCommunityStory({
        ...story,
        empowermentMessage: 'I still write to my teacher.',
      }).chapters
    ).toHaveLength(3);
  });
});
