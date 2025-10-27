import { test, expect } from '@playwright/test';

test.describe('Mentors Page', () => {
  test('should load mentors page', async ({ page }) => {
    await page.goto('/mentors');

    // Check page heading
    await expect(page.locator('h1')).toContainText(/Mentor/i);
  });

  test('should display mentor information', async ({ page }) => {
    await page.goto('/mentors');

    // Check that content is visible
    const mainContent = page.locator('main');
    await expect(mainContent).toBeVisible();
  });

  test('mentors page should be responsive', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('/mentors');

    await expect(page.locator('h1')).toBeVisible();
  });
});
