import { test, expect } from '@playwright/test';

test.describe('Team Page', () => {
  test('should load team listing page', async ({ page }) => {
    await page.goto('/team');

    // Check page title
    await expect(page.locator('h1')).toContainText(/Team|Unser Team/i);
  });

  test('should display team members', async ({ page }) => {
    await page.goto('/team');

    // Check that team member cards are visible
    const teamCards = page.locator('a[href^="/team/"]');
    await expect(teamCards.first()).toBeVisible();

    // Check for team member names
    await expect(page.getByText(/Claudia Calvano/i)).toBeVisible();
    await expect(page.getByText(/Celiana Kiefer/i)).toBeVisible();
  });

  test('should navigate to individual team member page', async ({ page }) => {
    await page.goto('/team');

    // Click on a team member
    await page.click('a[href="/team/claudia-calvano"]');

    // Wait for navigation
    await expect(page).toHaveURL('/team/claudia-calvano');

    // Check that profile page loaded
    await expect(page.locator('h1')).toContainText(/Claudia Calvano/i);
  });

  test('should display team member details', async ({ page }) => {
    await page.goto('/team/claudia-calvano');

    // Check for profile sections
    await expect(page.getByText(/Kurzprofil/i)).toBeVisible();
    await expect(page.getByText(/Kontakt/i)).toBeVisible();

    // Check for contact information
    await expect(page.getByText(/E-Mail/i)).toBeVisible();
    await expect(page.getByText(/Adresse/i)).toBeVisible();
  });

  test('should display team member degree', async ({ page }) => {
    await page.goto('/team/celiana-kiefer');

    // Check that degree is displayed
    await expect(page.getByText(/M\.A\./i)).toBeVisible();
  });

  test('should display phone number for Nina', async ({ page }) => {
    await page.goto('/team/nina-sedlak-cinar');

    // Check that phone number is displayed
    await expect(page.getByText(/Telefon/i)).toBeVisible();
    await expect(page.getByText(/\+49/)).toBeVisible();
  });

  test('should display external links', async ({ page }) => {
    await page.goto('/team/claudia-calvano');

    // Check for external links section
    await expect(page.getByText(/Weiterführende Links/i)).toBeVisible();

    // Check that links are clickable
    const externalLink = page.locator('a[target="_blank"]').first();
    await expect(externalLink).toHaveAttribute('rel', /noreferrer/);
  });

  test('should have working email links', async ({ page }) => {
    await page.goto('/team/claudia-calvano');

    // Check for mailto link
    const emailLink = page.locator('a[href^="mailto:"]');
    await expect(emailLink).toBeVisible();
    await expect(emailLink).toHaveAttribute('href', /claudia\.calvano@fu-berlin\.de/);
  });

  test('team page should be responsive', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('/team');

    // Check that team cards stack on mobile
    const teamCards = page.locator('a[href^="/team/"]');
    await expect(teamCards.first()).toBeVisible();
  });
});
