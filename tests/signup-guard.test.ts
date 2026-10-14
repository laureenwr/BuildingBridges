import { describe, expect, it } from 'vitest';
import {
  evaluateSignupGuard,
  isDisposableEmail,
  isLikelyAutomatedAccount,
  isSuspiciousDisplayName,
} from '@/lib/auth/signup-guard';

describe('signup bot checks', () => {
  it('blocks common disposable email domains', () => {
    expect(isDisposableEmail('bot@mailinator.com')).toBe(true);
    expect(isDisposableEmail('person@uni-due.de')).toBe(false);
    expect(isDisposableEmail('friend@gmail.com')).toBe(false);
  });

  it('flags names that look like spam, not ordinary names', () => {
    expect(isSuspiciousDisplayName('https://spam.example')).toBe(true);
    expect(isSuspiciousDisplayName('User93827164')).toBe(true);
    expect(isSuspiciousDisplayName('Abdullah Amjad Abbasi')).toBe(false);
    expect(isSuspiciousDisplayName('Sumera Sajid')).toBe(false);
  });

  it('marks long random local-parts as likely automated', () => {
    expect(isLikelyAutomatedAccount({ name: 'asdk', email: 'qwertyuiopasdfghjk12@mailinator.com' })).toBe(true);
    expect(isLikelyAutomatedAccount({ name: 'Laureen Warikoru', email: 'laureen.warikoru@uni-due.de' })).toBe(false);
  });

  it('rejects honeypot and instant submissions without creating a path for bots', () => {
    const now = 1_000_000;
    expect(
      evaluateSignupGuard({
        honeypot: 'http://spam',
        startedAt: String(now - 5_000),
        email: 'person@uni-due.de',
        name: 'Ada',
        ip: '1.1.1.1',
        now,
      }).ok
    ).toBe(false);

    expect(
      evaluateSignupGuard({
        honeypot: '',
        startedAt: String(now - 200),
        email: 'person@uni-due.de',
        name: 'Ada',
        ip: '2.2.2.2',
        now,
      })
    ).toEqual({ ok: false, code: 'too-fast' });

    expect(
      evaluateSignupGuard({
        honeypot: '',
        startedAt: String(now - 5_000),
        email: 'ada@uni-due.de',
        name: 'Ada Lovelace',
        ip: '3.3.3.3',
        now,
      })
    ).toEqual({ ok: true });
  });
});
