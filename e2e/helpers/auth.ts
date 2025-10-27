import { Page } from '@playwright/test';

/**
 * Helper function to log in a user
 */
export async function login(page: Page, email: string, password: string) {
  await page.goto('/sign-in');
  await page.getByLabel(/E-Mail/i).fill(email);
  await page.getByLabel(/Passwort/i).fill(password);
  await page.getByRole('button', { name: /Anmelden/i }).click();

  // Wait for navigation or error
  await page.waitForTimeout(2000);
}

/**
 * Helper function to sign up a new user
 */
export async function signUp(page: Page, email: string, password: string) {
  await page.goto('/sign-up');
  await page.getByLabel(/E-Mail/i).fill(email);
  await page.getByLabel(/Passwort/i).fill(password);
  await page.getByRole('button', { name: /Konto erstellen/i }).click();

  // Wait for response
  await page.waitForTimeout(2000);
}

/**
 * Generate a unique email for testing
 */
export function generateTestEmail(): string {
  return `test-${Date.now()}-${Math.random().toString(36).substring(7)}@example.com`;
}

/**
 * Generate a valid test password
 */
export function generateTestPassword(): string {
  return `TestPass${Math.floor(Math.random() * 10000)}`;
}

/**
 * Check if user is authenticated (on dashboard or similar)
 */
export async function isAuthenticated(page: Page): Promise<boolean> {
  const url = page.url();
  return url.includes('/dashboard') || url.includes('/onboarding');
}
