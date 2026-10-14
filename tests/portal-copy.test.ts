import { describe, expect, it } from 'vitest';
import { portalRoleLabel, portalText } from '@/lib/portal/portal-copy';

describe('portal language copy', () => {
  it('returns German when DE is active', () => {
    expect(portalText(true, 'Welcome back', 'Willkommen zurück')).toBe('Willkommen zurück');
    expect(portalText(false, 'Welcome back', 'Willkommen zurück')).toBe('Welcome back');
  });

  it('localizes portal roles from stored English labels', () => {
    expect(portalRoleLabel(true, 'Mentor')).toBe('Mentor:in');
    expect(portalRoleLabel(true, 'MENTOR')).toBe('Mentor:in');
    expect(portalRoleLabel(true, 'Mentee')).toBe('Mentee');
    expect(portalRoleLabel(false, 'Participant')).toBe('Participant');
    expect(portalRoleLabel(true, 'STUDENT')).toBe('Teilnehmer:in');
  });
});
