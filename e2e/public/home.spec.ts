import { test, expect } from '@playwright/test';

test.describe('Home Page', () => {
  test('should load successfully', async ({ page }) => {
    await page.goto('/');

    // Check that the page loaded
    await expect(page).toHaveTitle(/Building Bridges/i);
  });

  test('should display hero section', async ({ page }) => {
    await page.goto('/');

    // Check for main heading
    const heading = page.locator('h1').first();
    await expect(heading).toBeVisible();
    await expect(heading).toContainText(/Building Bridges|Empowerment|FLINTA/i);
  });

  test('should have working navigation', async ({ page }) => {
    await page.goto('/');

    // Check for navigation links
    await expect(page.getByRole('link', { name: /Vision/i })).toBeVisible();
    await expect(page.getByRole('link', { name: /Team/i })).toBeVisible();
    await expect(page.getByRole('link', { name: /Workshops/i })).toBeVisible();
    await expect(page.getByRole('link', { name: /Kontakt/i })).toBeVisible();
  });

  test('should navigate to Vision page', async ({ page }) => {
    await page.goto('/');
    await page.getByRole('link', { name: /Vision/i }).first().click();
    await expect(page).toHaveURL('/vision');
  });

  test('should display funding logos', async ({ page }) => {
    await page.goto('/');

    // Check for funding section
    const fundingSection = page.locator('text=/gefördert|Förderung/i').first();
    await expect(fundingSection).toBeVisible();
  });

  test('should be responsive on mobile', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('/');

    // Check that content is visible on mobile
    const heading = page.locator('h1').first();
    await expect(heading).toBeVisible();
  });
});
