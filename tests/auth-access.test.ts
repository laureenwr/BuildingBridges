import { afterEach, describe, expect, it } from 'vitest';
import {
  isPlatformAdminEmail,
  resolveSignupRole,
  userCanSubmitStories,
  userHasAdminAccess,
} from '@/lib/auth/admin-emails';
import { getPortalNavItems, getPostLoginHref, safeAuthRedirect } from '@/lib/nav/dashboard-href';

describe('platform admin emails', () => {
  const previous = process.env.PLATFORM_ADMIN_EMAILS;

  afterEach(() => {
    if (previous === undefined) {
      delete process.env.PLATFORM_ADMIN_EMAILS;
    } else {
      process.env.PLATFORM_ADMIN_EMAILS = previous;
    }
  });

  it('recognises the hardcoded platform admins', () => {
    expect(isPlatformAdminEmail('sumerasajid99@gmail.com')).toBe(true);
    expect(isPlatformAdminEmail('Laureen.Warikoru@uni-due.de')).toBe(true);
    expect(isPlatformAdminEmail('mentor@example.com')).toBe(false);
  });

  it('reads extra admins from PLATFORM_ADMIN_EMAILS', () => {
    process.env.PLATFORM_ADMIN_EMAILS = 'colleague@uni-due.de, extra@example.com';
    expect(isPlatformAdminEmail('colleague@uni-due.de')).toBe(true);
    expect(isPlatformAdminEmail('extra@example.com')).toBe(true);
  });
});

describe('role helpers', () => {
  it('grants admin access from role or allowlisted email', () => {
    expect(userHasAdminAccess({ role: 'ADMIN', email: 'anyone@example.com' })).toBe(true);
    expect(userHasAdminAccess({ role: 'MENTOR', email: 'laureen.warikoru@uni-due.de' })).toBe(true);
    expect(userHasAdminAccess({ role: 'MENTOR', email: 'mentor@example.com' })).toBe(false);
    expect(userHasAdminAccess(null)).toBe(false);
  });

  it('allows any signed-in user to submit stories', () => {
    expect(userCanSubmitStories({ role: 'MENTOR', email: 'mentor@example.com' })).toBe(true);
    expect(userCanSubmitStories({ role: 'STUDENT', email: 'mentee@example.com' })).toBe(true);
    expect(userCanSubmitStories(null)).toBe(false);
  });

  it('refuses unauthorized Admin signup instead of creating an Admin account', () => {
    expect(resolveSignupRole('mentor@example.com', 'ADMIN')).toEqual({
      ok: false,
      code: 'admin-restricted',
    });
    expect(resolveSignupRole('sumerasajid99@gmail.com', 'ADMIN')).toEqual({
      ok: true,
      role: 'ADMIN',
    });
    expect(resolveSignupRole('mentor@example.com', 'MENTOR')).toEqual({
      ok: true,
      role: 'MENTOR',
    });
    expect(resolveSignupRole('mentee@example.com', 'STUDENT')).toEqual({
      ok: true,
      role: 'STUDENT',
    });
  });
});

describe('platform admin emails', () => {
  const previous = process.env.PLATFORM_ADMIN_EMAILS;

  afterEach(() => {
    if (previous === undefined) {
      delete process.env.PLATFORM_ADMIN_EMAILS;
    } else {
      process.env.PLATFORM_ADMIN_EMAILS = previous;
    }
  });

  it('recognises the hardcoded platform admins', () => {
    expect(isPlatformAdminEmail('sumerasajid99@gmail.com')).toBe(true);
    expect(isPlatformAdminEmail('Laureen.Warikoru@uni-due.de')).toBe(true);
    expect(isPlatformAdminEmail('mentor@example.com')).toBe(false);
  });

  it('reads extra admins from PLATFORM_ADMIN_EMAILS', () => {
    process.env.PLATFORM_ADMIN_EMAILS = 'colleague@uni-due.de, extra@example.com';
    expect(isPlatformAdminEmail('colleague@uni-due.de')).toBe(true);
    expect(isPlatformAdminEmail('extra@example.com')).toBe(true);
  });
});

describe('role helpers', () => {
  it('grants admin access from role or allowlisted email', () => {
    expect(userHasAdminAccess({ role: 'ADMIN', email: 'anyone@example.com' })).toBe(true);
    expect(userHasAdminAccess({ role: 'MENTOR', email: 'laureen.warikoru@uni-due.de' })).toBe(true);
    expect(userHasAdminAccess({ role: 'MENTOR', email: 'mentor@example.com' })).toBe(false);
    expect(userHasAdminAccess(null)).toBe(false);
  });

  it('allows any signed-in user to submit stories', () => {
    expect(userCanSubmitStories({ role: 'MENTOR', email: 'mentor@example.com' })).toBe(true);
    expect(userCanSubmitStories({ role: 'STUDENT', email: 'mentee@example.com' })).toBe(true);
    expect(userCanSubmitStories(null)).toBe(false);
  });
});

describe('portal navigation', () => {
  it('sends allowlisted admins to the admin portal even without an ADMIN role', () => {
    expect(getPostLoginHref({ role: 'MENTOR', email: 'sumerasajid99@gmail.com' })).toBe('/portal/admin');
    expect(getPostLoginHref({ role: 'MENTOR', email: 'mentor@example.com' })).toBe('/portal');
    expect(getPortalNavItems({ role: 'STUDENT', email: 'laureen.warikoru@uni-due.de' })[0]?.key).toBe('admin');
    expect(getPortalNavItems({ role: 'MENTOR', email: 'mentor@example.com' })[0]?.key).toBe('mentor');
  });

  it('does not honour an admin redirect for arbitrary URLs', () => {
    expect(safeAuthRedirect('https://evil.com')).toBe('/logged-in');
    expect(safeAuthRedirect('//evil.com')).toBe('/logged-in');
    expect(safeAuthRedirect('/portal/admin')).toBe('/portal/admin');
    expect(safeAuthRedirect('/story-tool')).toBe('/story-tool');
  });
});
