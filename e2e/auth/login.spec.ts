import { test, expect } from '@playwright/test';

test.describe('Login Flow', () => {
  test('should load login page', async ({ page }) => {
    await page.goto('/sign-in');

    // Check page heading
    await expect(page.locator('h1, h2')).toContainText(/Building Bridges|Willkommen zurück/i);
  });

  test('should display login form', async ({ page }) => {
    await page.goto('/sign-in');

    // Check for form fields
    await expect(page.getByLabel(/E-Mail/i)).toBeVisible();
    await expect(page.getByLabel(/Passwort/i)).toBeVisible();
    await expect(page.getByRole('button', { name: /Anmelden/i })).toBeVisible();
  });

  test('should show error for missing credentials', async ({ page }) => {
    await page.goto('/sign-in');

    // Try to submit empty form
    await page.getByRole('button', { name: /Anmelden/i }).click();

    // Wait a bit for any validation
    await page.waitForTimeout(500);

    // Form should still be on sign-in page or show validation
    const url = page.url();
    expect(url).toContain('sign-in');
  });

  test('should show error for invalid credentials', async ({ page }) => {
    await page.goto('/sign-in');

    // Fill in invalid credentials
    await page.getByLabel(/E-Mail/i).fill('[email protected]');
    await page.getByLabel(/Passwort/i).fill('wrongpassword123');
    await page.getByRole('button', { name: /Anmelden/i }).click();

    // Wait for response
    await page.waitForTimeout(2000);

    // Should show error or redirect to error page
    const url = page.url();
    expect(url).toContain('sign-in');

    // Check for error message
    await expect(page.locator('text=/Ungültig|Invalid|Fehler/i')).toBeVisible({ timeout: 5000 });
  });

  test('should have link to sign up', async ({ page }) => {
    await page.goto('/sign-in');

    // Check for sign up link
    const signUpLink = page.getByRole('link', { name: /Registrieren|Konto/i });
    await expect(signUpLink).toBeVisible();
    await expect(signUpLink).toHaveAttribute('href', '/sign-up');
  });

  test('should have password reset link', async ({ page }) => {
    await page.goto('/sign-in');

    // Check for password reset link
    const resetLink = page.getByRole('link', { name: /Passwort vergessen/i });
    await expect(resetLink).toBeVisible();
    await expect(resetLink).toHaveAttribute('href', '/reset-password');
  });

  test('should navigate to password reset', async ({ page }) => {
    await page.goto('/sign-in');

    await page.getByRole('link', { name: /Passwort vergessen/i }).click();
    await expect(page).toHaveURL('/reset-password');
  });

  test('login form should be responsive', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('/sign-in');

    await expect(page.getByLabel(/E-Mail/i)).toBeVisible();
    await expect(page.getByLabel(/Passwort/i)).toBeVisible();
  });
});
