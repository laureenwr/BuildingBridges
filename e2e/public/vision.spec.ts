import { test, expect } from '@playwright/test';

test.describe('Vision Page', () => {
  test('should load successfully', async ({ page }) => {
    await page.goto('/vision');

    // Check page title
    await expect(page.locator('h1')).toContainText(/Vision|Unsere Vision/i);
  });

  test('should display vision content', async ({ page }) => {
    await page.goto('/vision');

    // Check that content is visible
    const content = page.locator('main');
    await expect(content).toBeVisible();
  });

  test('should be responsive', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('/vision');

    await expect(page.locator('h1')).toBeVisible();
  });
});
