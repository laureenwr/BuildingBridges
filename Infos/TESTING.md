# Testing Documentation

This document provides an overview of the testing setup for the Building Bridges project.

## Test Types

### 1. Unit Tests (Vitest)
Located in `tests/` directory
- Authentication logic tests
- Utility function tests
- Component logic tests

**Run unit tests:**
```bash
npm run test           # Run once
npm run test:watch     # Watch mode
npm run test:coverage  # With coverage
```

### 2. End-to-End Tests (Playwright)
Located in `e2e/` directory
- Full user journey tests
- UI interaction tests
- Cross-browser testing
- Mobile responsive tests

**Run E2E tests:**
```bash
npm run test:e2e           # Run all tests
npm run test:e2e:ui        # Interactive UI mode
npm run test:e2e:headed    # See browser
npm run test:e2e:debug     # Debug mode
npm run test:e2e:report    # View HTML report
```

## E2E Test Coverage

### Public Pages (/e2e/public/)
✅ **Home Page** (`home.spec.ts`)
- Page loads successfully
- Hero section displays
- Navigation works
- Funding logos visible
- Responsive design

✅ **Team Page** (`team.spec.ts`)
- Team listing displays
- Individual profiles load
- Contact information shown
- Email/phone links work
- External links properly formatted
- Responsive layout

✅ **Vision Page** (`vision.spec.ts`)
- Page loads
- Content displays
- Responsive design

✅ **Contact Page** (`contact.spec.ts`)
- Form displays
- Field validation
- Responsive design

### Authentication (/e2e/auth/)
✅ **Login** (`login.spec.ts`)
- Login page loads
- Form displays correctly
- Error handling for missing credentials
- Error handling for invalid credentials
- Links to sign-up and password reset
- Responsive design

✅ **Sign-Up** (`signup.spec.ts`)
- Sign-up page loads
- Form displays with password requirements
- Password validation (length, uppercase, number)
- Duplicate email detection
- Link to sign-in
- Responsive design

✅ **Password Reset** (`password-reset.spec.ts`)
- Reset request page loads
- Email submission
- Security (same message for non-existent emails)
- Token-based password reset
- Password requirements shown
- Responsive design

### Protected Routes (/e2e/dashboard/)
✅ **Access Control** (`access.spec.ts`)
- Redirects to login when not authenticated
- All protected routes require authentication

### Workshops (/e2e/workshops/)
✅ **Workshops** (`workshops.spec.ts`)
- Workshops page loads
- Content displays
- Responsive design

✅ **Mentors** (`mentors.spec.ts`)
- Mentors page loads
- Information displays
- Responsive design

## Test Browsers

Tests run on:
- ✅ Chromium (Chrome/Edge)
- ✅ Firefox
- ✅ WebKit (Safari)
- ✅ Mobile Chrome (Pixel 5)
- ✅ Mobile Safari (iPhone 12)

## CI/CD Integration

### GitHub Actions
Tests automatically run on:
- Push to `main` or `develop` branches
- Pull requests to `main` or `develop`

Configuration: `.github/workflows/playwright.yml`

### Test Reports
- HTML reports generated after each run
- Screenshots captured on failure
- Videos recorded on first retry
- Artifacts uploaded to GitHub (30-day retention)

## Test Utilities

### Authentication Helpers (`e2e/helpers/auth.ts`)
```typescript
// Login user
await login(page, email, password);

// Sign up new user
await signUp(page, email, password);

// Generate test credentials
const email = generateTestEmail();
const password = generateTestPassword();

// Check authentication status
const isAuth = await isAuthenticated(page);
```

## Running Specific Tests

### Run single file:
```bash
npx playwright test e2e/public/home.spec.ts
```

### Run specific test:
```bash
npx playwright test -g "should load successfully"
```

### Run specific browser:
```bash
npx playwright test --project=chromium
```

### Run specific folder:
```bash
npx playwright test e2e/auth/
```

## Test Configuration

Located in `playwright.config.ts`:

```typescript
{
  testDir: './e2e',
  timeout: 30000,
  retries: 2 (CI), 0 (local),
  workers: 1 (CI), undefined (local),
  baseURL: 'http://localhost:3000',
  projects: ['chromium', 'firefox', 'webkit', 'Mobile Chrome', 'Mobile Safari']
}
```

## Known Issues

### Strict Mode Violations
Some tests may fail due to multiple elements matching selectors. These are being refined to use more specific selectors like:
- `getByRole()` - Preferred
- `getByLabel()` - For form fields
- `getByText()` - For unique text
- `first()` - When multiple elements are expected

### Test Data
Tests use:
- Isolated test data where possible
- Unique email generation for sign-ups
- No database cleanup (tests should be idempotent)

## Best Practices

1. **Use semantic selectors**
   ```typescript
   // Good
   await page.getByRole('button', { name: 'Submit' });

   // Avoid
   await page.locator('.btn-submit');
   ```

2. **Wait for elements**
   ```typescript
   await expect(element).toBeVisible();
   await page.waitForLoadState('networkidle');
   ```

3. **Keep tests isolated**
   - Each test should work independently
   - Don't rely on test execution order

4. **Test user journeys**
   - Test complete flows, not just individual actions
   - Think like a user

5. **Handle timing issues**
   - Use `waitFor` assertions
   - Avoid hard-coded `waitForTimeout` when possible

## Debugging

### Visual Debugging
```bash
npm run test:e2e:ui  # Interactive mode
npm run test:e2e:headed  # See browser
```

### Step-by-step Debugging
```bash
npm run test:e2e:debug  # Inspector mode
```

### Add pause in test
```typescript
await page.pause();  # Pauses test execution
```

### Generate test code
```bash
npx playwright codegen http://localhost:3000
```

## Maintenance

### Update Snapshots
```bash
npx playwright test --update-snapshots
```

### Clear Cache
```bash
npx playwright cache clear
```

### Reinstall Browsers
```bash
npx playwright install
```

## Resources

- [Playwright Documentation](https://playwright.dev)
- [Vitest Documentation](https://vitest.dev)
- [Test README](./e2e/README.md)
- [GitHub Actions Workflow](./.github/workflows/playwright.yml)

## Statistics

- **Total E2E Tests**: 55+
- **Test Categories**: 8
- **Browsers Tested**: 5
- **Test Helpers**: Authentication utilities
- **CI Integration**: ✅ GitHub Actions
