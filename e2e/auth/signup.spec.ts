import { test, expect } from '@playwright/test';

test.describe('Sign Up Flow', () => {
  test('should load sign up page', async ({ page }) => {
    await page.goto('/sign-up');

    // Check page heading
    await expect(page.locator('h1, h2')).toContainText(/Konto erstellen|Create account|Registrier/i);
  });

  test('should display sign up form', async ({ page }) => {
    await page.goto('/sign-up');

    // Check for form fields
    await expect(page.getByLabel(/E-Mail|Email/i)).toBeVisible();
    await expect(page.getByLabel(/Passwort|Password/i)).toBeVisible();
    await expect(page.getByRole('button', { name: /Konto erstellen|Create account/i })).toBeVisible();
  });

  test('should show password requirements', async ({ page }) => {
    await page.goto('/sign-up');

    // Check for password hint
    await expect(
      page.getByText(/8 Zeichen|characters|Großbuchstaben|uppercase|Zahl|number/i)
    ).toBeVisible();
  });

  test('should validate password too short', async ({ page }) => {
    await page.goto('/sign-up');

    const uniqueEmail = `test-${Date.now()}@example.com`;

    // Fill in form with short password
    await page.getByLabel(/E-Mail|Email/i).fill(uniqueEmail);
    await page.getByLabel(/Passwort|Password/i).fill('Short1');
    await page.getByRole('button', { name: /Konto erstellen|Create account/i }).click();

    // Wait for response
    await page.waitForTimeout(2000);

    // Should stay on sign-up page or show error
    const url = page.url();
    expect(url).toContain('sign-up');

    // Check for error about password length
    await expect(page.locator('text=/8 Zeichen|characters|zu kurz|too short/i')).toBeVisible({
      timeout: 5000,
    });
  });

  test('should validate password missing uppercase', async ({ page }) => {
    await page.goto('/sign-up');

    const uniqueEmail = `test-${Date.now()}@example.com`;

    // Fill in form with no uppercase
    await page.getByLabel(/E-Mail|Email/i).fill(uniqueEmail);
    await page.getByLabel(/Passwort|Password/i).fill('password123');
    await page.getByRole('button', { name: /Konto erstellen|Create account/i }).click();

    // Wait for response
    await page.waitForTimeout(2000);

    // Should show error
    const url = page.url();
    expect(url).toContain('sign-up');
  });

  test('should validate password missing number', async ({ page }) => {
    await page.goto('/sign-up');

    const uniqueEmail = `test-${Date.now()}@example.com`;

    // Fill in form with no number
    await page.getByLabel(/E-Mail|Email/i).fill(uniqueEmail);
    await page.getByLabel(/Passwort|Password/i).fill('PasswordOnly');
    await page.getByRole('button', { name: /Konto erstellen|Create account/i }).click();

    // Wait for response
    await page.waitForTimeout(2000);

    // Should show error
    const url = page.url();
    expect(url).toContain('sign-up');
  });

  test('should reject duplicate email', async ({ page }) => {
    await page.goto('/sign-up');

    // Try to register with an email that might exist
    await page.getByLabel(/E-Mail|Email/i).fill('[email protected]');
    await page.getByLabel(/Passwort|Password/i).fill('ValidPass123');
    await page.getByRole('button', { name: /Konto erstellen|Create account/i }).click();

    // Wait for response
    await page.waitForTimeout(2000);

    // Should either show error or redirect to sign-in
    const url = page.url();
    const showsError = await page.locator('text=/existiert bereits|already exists/i').isVisible().catch(() => false);

    // At least one should be true: error shown or redirected
    expect(showsError || url.includes('sign-in') || url.includes('error=exists')).toBe(true);
  });

  test('should have link to sign in', async ({ page }) => {
    await page.goto('/sign-up');

    // Check for sign in link
    const signInLink = page.getByRole('link', {
      name: /Anmelden|Sign in|bereits ein Konto|Already have an account/i,
    });
    await expect(signInLink).toBeVisible();
  });

  test('should navigate to sign in', async ({ page }) => {
    await page.goto('/sign-up');

    await page
      .getByRole('link', {
        name: /Anmelden|Sign in|bereits ein Konto|Already have an account/i,
      })
      .click();
    await expect(page).toHaveURL('/sign-in');
  });

  test('sign up form should be responsive', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('/sign-up');

    await expect(page.getByLabel(/E-Mail|Email/i)).toBeVisible();
    await expect(page.getByLabel(/Passwort|Password/i)).toBeVisible();
  });
});
