import { test, expect } from '@playwright/test';

test.describe('Dashboard Access', () => {
  test('should redirect to login when not authenticated', async ({ page }) => {
    await page.goto('/dashboard');

    // Wait for redirect
    await page.waitForTimeout(2000);

    // Should be redirected to sign-in
    const url = page.url();
    expect(url).toContain('sign-in');
  });

  test('protected routes should require authentication', async ({ page }) => {
    const protectedRoutes = [
      '/dashboard',
      '/dashboard/personal',
      '/dashboard/security',
      '/dashboard/workshops',
      '/onboarding',
    ];

    for (const route of protectedRoutes) {
      await page.goto(route);
      await page.waitForTimeout(1000);

      const url = page.url();
      // Should redirect to sign-in or show authentication requirement
      expect(url).toContain('sign-in');
    }
  });
});
