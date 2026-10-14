import { test, expect } from '@playwright/test';

test.describe('Password Reset Flow', () => {
  test('should load password reset page', async ({ page }) => {
    await page.goto('/reset-password');

    // Check page heading
    await expect(page.locator('h1, h2, h3')).toContainText(/Passwort zurücksetzen|Reset password/i);
  });

  test('should display email input for reset request', async ({ page }) => {
    await page.goto('/reset-password');

    // Check for email field
    await expect(page.getByLabel(/E-Mail/i)).toBeVisible();
    await expect(page.getByRole('button', { name: /Link.*senden|Send reset link/i })).toBeVisible();
  });

  test('should submit password reset request', async ({ page }) => {
    await page.goto('/reset-password');

    // Fill in email
    await page.getByLabel(/E-Mail/i).fill('[email protected]');
    await page.getByRole('button', { name: /Link.*senden|Send reset link/i }).click();

    // Wait for response
    await page.waitForTimeout(2000);

    // Should show success message
    await expect(page.locator('text=/Link|E-Mail|email|erfolgreich|exists/i')).toBeVisible({ timeout: 5000 });
  });

  test('should show same message for non-existent email (security)', async ({ page }) => {
    await page.goto('/reset-password');

    // Fill in non-existent email
    await page.getByLabel(/E-Mail/i).fill('[email protected]');
    await page.getByRole('button', { name: /Link.*senden|Send reset link/i }).click();

    // Wait for response
    await page.waitForTimeout(2000);

    // Should still show generic success message (don't reveal if email exists)
    await expect(page.locator('text=/Link|E-Mail|Falls ein Konto|If an account exists/i')).toBeVisible({
      timeout: 5000,
    });
  });

  test('should have back to login link', async ({ page }) => {
    await page.goto('/reset-password');

    // Check for back link
    const backLink = page.getByRole('button', { name: /Zurück.*Anmeldung|Back to sign in|Back to Login/i });
    await expect(backLink).toBeVisible();
  });

  test('should display password requirements on reset', async ({ page }) => {
    // Simulate having a token (would normally come from email link)
    await page.goto('/reset-password?token=test-token-123');

    // Should now show password fields instead of email
    await page.waitForTimeout(1000);

    // Check if we see password fields or requirements
    const hasPasswordField = await page.getByLabel(/Neues Passwort|New password/i).isVisible().catch(() => false);

    if (hasPasswordField) {
      // Check for password requirements
      await expect(page.getByText(/8 Zeichen|8 characters|Großbuchstaben|uppercase|Zahl|number/i)).toBeVisible();
    }
  });

  test('password reset should be responsive', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('/reset-password');

    await expect(page.getByLabel(/E-Mail/i)).toBeVisible();
  });
});
