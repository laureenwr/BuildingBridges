import { describe, expect, it } from 'vitest';
import { parseBerlinLocal, workshopHasEnded } from '@/components/workshops/workshop-data';

describe('workshopHasEnded', () => {
  it('keeps workshops without a date as upcoming', () => {
    expect(workshopHasEnded(undefined, new Date('2026-11-01T12:00:00Z'))).toBe(false);
    expect(workshopHasEnded(null, new Date('2026-11-01T12:00:00Z'))).toBe(false);
    expect(workshopHasEnded('', new Date('2026-11-01T12:00:00Z'))).toBe(false);
  });

  it('keeps an unreadable date as upcoming', () => {
    expect(workshopHasEnded('21.09.2026', new Date('2026-11-01T12:00:00Z'))).toBe(false);
  });

  it('treats a date-only value as ended only after that Berlin calendar day', () => {
    const end = parseBerlinLocal('2026-07-31');
    expect(end).not.toBeNull();
    expect(workshopHasEnded('2026-07-31', new Date(end!.getTime() - 1000))).toBe(false);
    expect(workshopHasEnded('2026-07-31', end)).toBe(true);
    expect(workshopHasEnded('2026-07-31', new Date('2026-11-01T12:00:00Z'))).toBe(true);
  });

  it('uses Berlin time for a timed end, including summer time', () => {
    // 21 Sep 2026 20:00 in Berlin is 18:00 UTC (CEST).
    expect(workshopHasEnded('2026-09-21T20:00:00', new Date('2026-09-21T17:59:00Z'))).toBe(false);
    expect(workshopHasEnded('2026-09-21T20:00:00', new Date('2026-09-21T18:00:00Z'))).toBe(true);
  });
});
