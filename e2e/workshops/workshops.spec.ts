import { test, expect } from '@playwright/test';

test.describe('Workshops Page', () => {
  test('should load workshops page', async ({ page }) => {
    await page.goto('/workshops');

    // Check page heading
    await expect(page.locator('h1')).toContainText(/Workshop/i);
  });

  test('should display workshops list or coming soon message', async ({ page }) => {
    await page.goto('/workshops');

    // Either workshops are displayed or "coming soon" message
    const hasWorkshops = await page.locator('[data-testid="workshop-card"], .workshop-card, a[href^="/workshops/"]')
      .first()
      .isVisible()
      .catch(() => false);

    const hasComingSoon = await page.locator('text=/coming soon|demnächst|bald verfügbar/i')
      .isVisible()
      .catch(() => false);

    // At least one should be true
    expect(hasWorkshops || hasComingSoon).toBe(true);
  });

  test('workshops page should be responsive', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('/workshops');

    await expect(page.locator('h1')).toBeVisible();
  });
});
