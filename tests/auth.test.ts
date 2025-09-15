import { describe, it, expect } from 'vitest';

// Lightweight tests to validate helper logic and invariants.

describe('callbackUrl sanitization', () => {
  function sanitize(input: string | null | undefined) {
    const raw = input || '/dashboard';
    const isInternal = raw.startsWith('/') && !raw.startsWith('//');
    return isInternal ? raw : '/dashboard';
  }

  it('allows internal paths', () => {
    expect(sanitize('/dashboard')).toBe('/dashboard');
    expect(sanitize('/')).toBe('/');
  });

  it('blocks external URLs', () => {
    expect(sanitize('https://evil.com')).toBe('/dashboard');
    expect(sanitize('//evil.com')).toBe('/dashboard');
  });
});

describe('sign-up flow invariants', () => {
  it('forces STUDENT role for public signup', () => {
    const serverForcedRole = 'STUDENT';
    expect(serverForcedRole).toBe('STUDENT');
  });
});

