# End-to-End Tests with Playwright

This directory contains end-to-end tests for the Building Bridges website using Playwright.

## Test Structure

```
e2e/
├── public/               # Tests for public pages
│   ├── home.spec.ts     # Home page tests
│   ├── team.spec.ts     # Team listing and profile tests
│   ├── vision.spec.ts   # Vision page tests
│   └── contact.spec.ts  # Contact page tests
├── auth/                # Authentication flow tests
│   ├── login.spec.ts    # Login tests
│   ├── signup.spec.ts   # Sign-up tests
│   └── password-reset.spec.ts  # Password reset tests
├── dashboard/           # Protected dashboard tests
│   └── access.spec.ts   # Access control tests
├── workshops/           # Workshop-related tests
│   ├── workshops.spec.ts  # Workshops listing tests
│   └── mentors.spec.ts    # Mentors page tests
└── helpers/             # Test utilities
    └── auth.ts          # Authentication helpers
```

## Running Tests

### Prerequisites

Make sure you have the dependencies installed:

```bash
pnpm install
```

Install Playwright browsers (only needed once):

```bash
npx playwright install
```

### Run All Tests

```bash
pnpm test:e2e
```

### Run Tests with UI

Opens the Playwright UI for interactive testing:

```bash
pnpm test:e2e:ui
```

### Run Tests in Headed Mode

Shows the browser while tests run:

```bash
pnpm test:e2e:headed
```

### Debug Tests

Opens the Playwright inspector for debugging:

```bash
pnpm test:e2e:debug
```

### View Test Report

After running tests, view the HTML report:

```bash
pnpm test:e2e:report
```

## Test Categories

### Public Pages
- Home page functionality
- Team member listings and profiles
- Vision and mission content
- Contact form

### Authentication
- Login with valid/invalid credentials
- Sign-up with password validation
- Password reset flow
- Error handling

### Protected Routes
- Dashboard access control
- Redirect to login when not authenticated
- User-specific content

### Workshops
- Workshop listings
- Mentor information
- Enrollment flows (if applicable)

## Writing New Tests

### Example Test Structure

```typescript
import { test, expect } from '@playwright/test';

test.describe('Feature Name', () => {
  test('should do something', async ({ page }) => {
    await page.goto('/path');

    await expect(page.locator('selector')).toBeVisible();
  });
});
```

### Using Authentication Helpers

```typescript
import { login, generateTestEmail, generateTestPassword } from '../helpers/auth';

test('protected feature', async ({ page }) => {
  await login(page, '[email protected]', 'ValidPass123');

  // Now you're logged in
  await page.goto('/dashboard');
});
```

## Configuration

Tests are configured in `playwright.config.ts` at the project root.

### Key Configuration

- **Base URL**: `http://localhost:3000` (dev server)
- **Browsers**: Chromium, Firefox, WebKit, Mobile Chrome, Mobile Safari
- **Retries**: 2 on CI, 0 locally
- **Screenshots**: On failure only
- **Videos**: On first retry only

## CI/CD Integration

Tests run automatically on:
- Push to `main` or `develop` branches
- Pull requests to `main` or `develop`

See `.github/workflows/playwright.yml` for the CI configuration.

## Troubleshooting

### Tests Failing Locally

1. Make sure the dev server is running on port 3000
2. Check that `.env` file has correct values
3. Clear browser cache: `npx playwright cache clear`

### Flaky Tests

If tests are flaky (pass/fail inconsistently):
- Add explicit waits: `await page.waitForSelector('selector')`
- Use `waitForTimeout` sparingly
- Check for race conditions

### Debugging

Use the debug command to step through tests:

```bash
pnpm test:e2e:debug
```

Or add `await page.pause()` in your test to stop at that point.

## Best Practices

1. **Use semantic locators**: Prefer `getByRole`, `getByLabel`, `getByText`
2. **Keep tests isolated**: Each test should be independent
3. **Use test helpers**: Share common functionality via helpers
4. **Test user journeys**: Test complete flows, not just individual actions
5. **Be responsive-aware**: Test mobile viewports when relevant

## Resources

- [Playwright Documentation](https://playwright.dev)
- [Best Practices](https://playwright.dev/docs/best-practices)
- [Test Generator](https://playwright.dev/docs/codegen) - `npx playwright codegen`
