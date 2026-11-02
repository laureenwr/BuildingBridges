import { describe, expect, it } from 'vitest';
import { joinDraft, liveVoiceDraft } from '@/components/landing/useVoiceDraft';

describe('voice draft edits', () => {
  it('appends live speech to the text captured when recording started', () => {
    expect(liveVoiceDraft(true, 'We sat together.', '', 'Then we talked.', '')).toBe(
      'We sat together. Then we talked.'
    );
  });

  it('ignores live speech after recording stops, so typed edits are kept', () => {
    const whileRecording = liveVoiceDraft(true, 'We sat together.', '', 'Then we talked.', '');
    expect(whileRecording).toBe('We sat together. Then we talked.');

    const afterStop = joinDraft('We sat together.', 'Then we talked.');
    const edited = `${afterStop} I changed this sentence.`;

    expect(liveVoiceDraft(false, 'We sat together.', 'Then we talked.', 'late speech', '')).toBeNull();
    expect(edited).toBe('We sat together. Then we talked. I changed this sentence.');
  });

  it('does not let a later speech result replace text edited after stop', () => {
    const finalized = joinDraft('Hello', 'this is my story');
    const editedAfterStop = 'Hello this is my story, and I fixed the wording.';
    const lateResult = liveVoiceDraft(false, 'Hello', 'this is my story', 'ignored extra', '');

    expect(lateResult).toBeNull();
    expect(editedAfterStop).not.toBe(finalized);
    expect(editedAfterStop).toContain('I fixed the wording');
  });
});
