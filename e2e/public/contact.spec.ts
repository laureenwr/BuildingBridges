import { test, expect } from '@playwright/test';

test.describe('Contact Page', () => {
  test('should load successfully', async ({ page }) => {
    await page.goto('/contact');

    // Check page title
    await expect(page.locator('h1')).toContainText(/Kontakt/i);
  });

  test('should display contact form', async ({ page }) => {
    await page.goto('/contact');

    // Check for form fields
    await expect(page.getByLabel(/Name/i)).toBeVisible();
    await expect(page.getByLabel(/E-Mail/i)).toBeVisible();
    await expect(page.getByLabel(/Nachricht|Message/i)).toBeVisible();
  });

  test('should validate required fields', async ({ page }) => {
    await page.goto('/contact');

    // Try to submit empty form
    const submitButton = page.getByRole('button', { name: /Senden|Abschicken/i });
    await submitButton.click();

    // Check that validation messages appear (HTML5 validation or custom)
    const nameField = page.getByLabel(/Name/i);
    const isRequired = await nameField.getAttribute('required');
    expect(isRequired).toBe('');
  });

  test('should be responsive', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('/contact');

    await expect(page.locator('h1')).toBeVisible();
    await expect(page.getByLabel(/Name/i)).toBeVisible();
  });
});
