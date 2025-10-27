# Building Bridges - Development Workflow

## Overview

This document defines the complete development lifecycle for the Building Bridges project, from feature ideation to production deployment. It creates a closed-loop system with proper tracking, testing, and deployment verification.

## Workflow Stages

```
Idea → Branch → Implement → Test → Commit → Push → Preview → Review → Merge → Deploy → Verify
  ↑                                                                                        ↓
  └────────────────────────────── Feedback Loop ──────────────────────────────────────────┘
```

## 1. Feature Ideation & Planning

### Using the Build Agent

Start any new feature with the `/build-feature` slash command:

```
/build-feature
```

This activates the Building Bridges Development Agent which:
- Has full knowledge of the project context
- Follows predefined workflows
- Ensures alignment with project values
- Tracks progress with todo lists
- Integrates with CI/CD

### Manual Planning

If not using the agent:

1. **Define the feature**
   - What problem does it solve?
   - Who is it for (students, mentors, admins)?
   - How does it serve the mission?

2. **Check alignment**
   - Review `PROJECT_CONTEXT.md`
   - Ensure cultural sensitivity
   - Verify technical feasibility

3. **Create a plan**
   - List all required changes
   - Identify dependencies
   - Estimate complexity

## 2. Branch Creation

Always work in feature branches:

```bash
# Start from main
git checkout main
git pull origin main

# Create feature branch
git checkout -b feature/descriptive-name

# Examples:
# feature/mentor-video-calls
# feature/workshop-recommendations
# fix/onboarding-validation
# enhancement/digital-story-editing
```

### Branch Naming Convention

| Type | Prefix | Example |
|------|--------|---------|
| New feature | `feature/` | `feature/chat-support` |
| Bug fix | `fix/` | `fix/login-redirect` |
| Enhancement | `enhancement/` | `enhancement/faster-matching` |
| Hotfix | `hotfix/` | `hotfix/security-patch` |
| Experiment | `experiment/` | `experiment/new-ui` |

## 3. Implementation

### Development Cycle

```bash
# 1. Make changes
code .

# 2. Test locally
pnpm dev

# 3. Run type checking
pnpm build

# 4. Run tests
pnpm test:e2e

# 5. Fix issues and repeat
```

### Code Guidelines

#### TypeScript
- Strict mode enabled
- No `any` types
- Explicit return types for functions
- Use Zod for runtime validation

#### React
- Prefer Server Components
- Use Client Components only when needed (`'use client'`)
- Keep components focused and small
- Extract reusable logic to hooks

#### Server Actions
- Always in `'use server'` files
- Validate authentication first
- Use Zod schemas
- Return `{ success, error }` pattern
- Never throw errors to client

#### Database
- Use Drizzle ORM
- Follow naming conventions (snake_case)
- Always add timestamps
- Use proper foreign keys
- Index frequently queried columns

#### AI Integration
- Structured prompts with context
- Clear system messages
- Appropriate temperature settings
- Error handling for API failures
- Store results in database

### Todo List Management

Use TodoWrite throughout development:

```typescript
// Start of feature
TodoWrite([
  { content: "Update schema", status: "in_progress", activeForm: "Updating schema" },
  { content: "Create server actions", status: "pending", activeForm: "Creating server actions" },
  { content: "Build UI", status: "pending", activeForm: "Building UI" },
  { content: "Add tests", status: "pending", activeForm: "Adding tests" },
]);

// After completing schema
TodoWrite([
  { content: "Update schema", status: "completed", activeForm: "Updating schema" },
  { content: "Create server actions", status: "in_progress", activeForm: "Creating server actions" },
  // ...
]);
```

## 4. Testing

### Test Pyramid

```
     /\
    /E2E\        <- Playwright (Critical user flows)
   /------\
  / INTEGRATION  <- API routes, Server actions
 /-----------\
/   UNIT      \  <- Utility functions, helpers
```

### Running Tests

```bash
# E2E tests (Playwright)
pnpm test:e2e                 # Headless
pnpm test:e2e:headed          # With browser
pnpm test:e2e:ui              # Interactive UI
pnpm test:e2e:debug           # Debug mode

# Unit tests (Vitest)
pnpm test                     # Run once
pnpm test:watch               # Watch mode
pnpm test:coverage            # With coverage

# Type checking
pnpm build                    # Also checks types
```

### Test Requirements

Every feature must have:
- [ ] E2E test for happy path
- [ ] E2E test for error cases
- [ ] Unit tests for complex logic
- [ ] Manual testing checklist completed

### Manual Testing Checklist

- [ ] Feature works as expected
- [ ] Error handling works
- [ ] Loading states display correctly
- [ ] Mobile responsive
- [ ] Accessible (keyboard navigation, screen readers)
- [ ] German text is correct
- [ ] No console errors
- [ ] Performance is acceptable

## 5. Documentation

Every feature needs documentation:

### Feature Documentation Template

Create `FEATURE_NAME.md`:

```markdown
# Feature Name

## Overview
Brief description of what the feature does.

## Purpose
How it serves Building Bridges' mission.

## User Flow
1. User does X
2. System does Y
3. Result is Z

## Technical Implementation
- Components: `components/feature/`
- Server Actions: `lib/actions/feature.ts`
- Database: `feature_table` in schema.ts

## API Reference

### `functionName(params)`
Description of function.

**Parameters:**
- `param1` (Type): Description

**Returns:**
- `Promise<Result>`: Description

**Example:**
\`\`\`typescript
const result = await functionName(params);
\`\`\`

## Testing
How to test the feature.

## Future Enhancements
- [ ] Enhancement idea 1
- [ ] Enhancement idea 2
```

### Code Comments

```typescript
/**
 * Generate mentor matches using AI
 *
 * This function analyzes the mentee's onboarding data and compares it
 * against available mentors to find the best matches based on:
 * - Shared goals and interests
 * - Complementary skills
 * - Language compatibility
 * - Cultural considerations
 *
 * @param menteeData - Complete mentee profile
 * @param mentors - Array of available mentors
 * @returns Top 3-5 matches with scores and explanations
 */
export async function generateMentorMatches(...) {
  // Implementation
}
```

## 6. Committing Changes

### Commit Message Format

```
type(scope): brief description

Detailed explanation of what changed and why. Focus on the "why"
rather than the "what" (the diff shows the what).

Changes:
- Specific change 1
- Specific change 2
- Specific change 3

The feature supports Building Bridges' mission by [explanation].

🤖 Generated with [Claude Code](https://claude.com/claude-code)

Co-Authored-By: Claude <noreply@anthropic.com>
```

### Commit Types

- `feat` - New feature
- `fix` - Bug fix
- `docs` - Documentation only
- `style` - Formatting, missing semicolons, etc.
- `refactor` - Code change that neither fixes a bug nor adds a feature
- `test` - Adding or updating tests
- `chore` - Maintenance tasks

### Examples

```bash
# Good commits
git commit -m "feat(onboarding): add digital storytelling generation

Adds AI-powered narrative generation that transforms user onboarding
data into compelling first-person stories in German. Stories help
mentors understand mentees better and provide users with empowering
self-narratives.

Changes:
- Add digitalStory and storyGeneratedAt fields to schema
- Implement generateDigitalStory() in openai-service.ts
- Add generateUserDigitalStory() server action
- Create DIGITAL_STORYTELLING.md documentation

The feature supports Building Bridges' mission by helping users
articulate their journeys with authenticity and power.

🤖 Generated with [Claude Code](https://claude.com/claude-code)

Co-Authored-By: Claude <noreply@anthropic.com>"

# Another example
git commit -m "fix(login): prevent redirect loop on expired session

Users were experiencing infinite redirect loops when their session
expired during navigation. Added session validation middleware to
handle expired tokens gracefully.

Changes:
- Add session expiry check in middleware
- Clear expired tokens from cookies
- Redirect to login with return URL

Fixes #123"
```

## 7. Pushing & Creating PR

### Push to Remote

```bash
# Push feature branch
git push origin feature/your-feature-name

# If branch doesn't exist yet
git push -u origin feature/your-feature-name
```

### Create Pull Request

1. **Go to GitHub**
   - Navigate to repository
   - GitHub will show "Compare & pull request" button

2. **Fill out PR template**

```markdown
## Description
Brief description of what this PR does.

## Related Issue
Closes #123

## Type of Change
- [ ] New feature
- [ ] Bug fix
- [ ] Breaking change
- [ ] Documentation update

## Testing Checklist
- [ ] Local testing completed
- [ ] E2E tests pass
- [ ] Type checking passes
- [ ] Manual testing completed

## Screenshots (if applicable)
[Add screenshots]

## Deployment Notes
Any special considerations for deployment?

## Checklist
- [ ] Code follows project style guidelines
- [ ] German language for user-facing content
- [ ] Culturally sensitive and inclusive
- [ ] Documentation updated
- [ ] Tests added/updated
- [ ] No console errors or warnings
```

3. **Request Review**
   - Assign reviewers
   - Add labels
   - Link related issues

## 8. Preview Deployment (Vercel)

### Automatic Preview

When you push your branch, Vercel automatically:
1. Builds your branch
2. Runs tests
3. Deploys to preview URL
4. Comments on PR with URL

### Preview URL Format

```
https://building-bridges-[branch-name]-[hash].vercel.app
```

### Vercel Dashboard

Check:
- ✅ Build status
- ✅ Build logs
- ✅ Preview URL
- ✅ Environment variables loaded
- ✅ No build errors

### Testing Preview

Test the following on preview deployment:

- [ ] All pages load
- [ ] Authentication works
- [ ] Database connections work
- [ ] AI features function (if applicable)
- [ ] No 404 errors
- [ ] Mobile view works
- [ ] Performance is acceptable

## 9. GitHub Actions CI

### Workflow Triggers

GitHub Actions run on:
- Push to any branch
- Pull request creation
- Pull request updates

### CI Pipeline

```yaml
jobs:
  test:
    - Checkout code
    - Setup Node.js
    - Install dependencies
    - Run TypeScript checks
    - Run linting
    - Run unit tests
    - Run E2E tests
    - Upload test results
```

### Monitoring CI

Check the "Actions" tab on GitHub:
- ✅ All jobs pass
- ❌ If failed, review logs
- 🔧 Fix issues and push again

### CI Requirements for Merge

All of these must pass:
- [ ] TypeScript compilation
- [ ] ESLint checks
- [ ] Unit tests
- [ ] E2E tests
- [ ] Build succeeds

## 10. Code Review

### Review Checklist for Reviewer

**Functionality**
- [ ] Feature works as described
- [ ] Edge cases handled
- [ ] Error states handled
- [ ] Loading states present

**Code Quality**
- [ ] Follows project patterns
- [ ] TypeScript types are correct
- [ ] No unnecessary complexity
- [ ] DRY principle followed

**Cultural Sensitivity**
- [ ] Language is inclusive
- [ ] German text is correct
- [ ] No stereotypes or assumptions
- [ ] Empowering, not deficit-based

**Testing**
- [ ] Tests cover main functionality
- [ ] Tests are clear and maintainable
- [ ] Manual testing completed

**Documentation**
- [ ] Code is well-commented
- [ ] Feature documentation exists
- [ ] README updated if needed

### Addressing Feedback

```bash
# Make requested changes
git add .
git commit -m "refactor: address review feedback

- Extract validation to separate function
- Add error handling for edge case
- Update German translations"

git push
```

## 11. Merging to Main

### Requirements Before Merge

- [ ] All CI checks pass
- [ ] Code review approved
- [ ] Preview deployment tested
- [ ] No merge conflicts
- [ ] Documentation updated

### Merge Process

1. **Squash and Merge** (preferred)
   - Keeps main branch history clean
   - Combines all feature commits into one

2. **Update commit message**
   ```
   feat(scope): feature description (#PR-number)

   Detailed description from PR
   ```

3. **Delete branch** after merge
   - GitHub can do this automatically
   - Keeps repository clean

## 12. Production Deployment

### Automatic Deployment

When merged to `main`:
1. Vercel detects the merge
2. Builds production version
3. Runs production checks
4. Deploys to production URL
5. Sends notification

### Production URL

```
https://building-bridges.vercel.app (or custom domain)
```

### Post-Deployment Verification

Within 5 minutes of deployment:

- [ ] Visit production URL
- [ ] Test the new feature
- [ ] Check for errors in Vercel logs
- [ ] Verify database changes applied
- [ ] Test critical user flows
- [ ] Monitor error tracking (if set up)

### Rollback Plan

If issues detected:

1. **Immediate**: Revert merge commit
```bash
git revert HEAD
git push origin main
```

2. **Fix forward**: Create hotfix branch
```bash
git checkout -b hotfix/issue-description
# Fix the issue
# Follow abbreviated workflow
```

## 13. Monitoring & Feedback

### Metrics to Track

- [ ] Feature usage (analytics)
- [ ] Error rates (logs)
- [ ] Performance (Core Web Vitals)
- [ ] User feedback (support tickets)

### Feedback Loop

```
User Feedback → Issue Creation → Feature Planning → Development → Deployment
      ↑                                                                 ↓
      └─────────────────────── Verify & Monitor ───────────────────────┘
```

### Creating Issues from Feedback

```markdown
## Issue Title
Brief description of the problem or request

## Description
Detailed explanation

## Steps to Reproduce (if bug)
1. Go to...
2. Click on...
3. See error

## Expected Behavior
What should happen

## Actual Behavior
What actually happens

## Suggested Solution (if any)
How to fix it

## Priority
- [ ] Critical (breaks functionality)
- [ ] High (important but has workaround)
- [ ] Medium (nice to have)
- [ ] Low (enhancement)
```

## Common Workflows

### Quick Fix

```bash
git checkout -b fix/small-issue
# Make changes
git commit -m "fix: issue description"
git push
# Create PR, get quick review, merge
```

### Database Migration

```bash
# 1. Update schema.ts
# 2. Generate migration
pnpm db:generate

# 3. Test locally
pnpm db:migrate:local

# 4. Commit migration files
git add lib/db/migrations/*
git commit -m "feat(db): add new table for feature"

# 5. After merge, migration runs automatically on Vercel
```

### Hotfix for Production

```bash
git checkout main
git pull
git checkout -b hotfix/critical-issue

# Make minimal fix
# Test thoroughly
git commit -m "hotfix: critical issue description"
git push

# Create PR with "HOTFIX" label
# Get immediate review
# Merge and verify deployment
```

## Tools & Commands Reference

### Useful Git Commands

```bash
# Check status
git status

# View recent commits
git log --oneline -10

# Create branch from main
git checkout -b feature/name main

# Stash changes
git stash
git stash pop

# Amend last commit
git commit --amend

# Interactive rebase (clean up commits)
git rebase -i HEAD~3

# Check what changed
git diff
git diff --staged
```

### Database Commands

```bash
# Setup database
pnpm db:setup

# Generate migration
pnpm db:generate

# Run migrations
pnpm db:migrate          # Production
pnpm db:migrate:local    # Local
pnpm db:migrate:neon     # Neon

# Seed database
pnpm db:seed
pnpm db:seed:local

# Open Drizzle Studio
pnpm db:studio
```

### Development Commands

```bash
# Start dev server
pnpm dev

# Build
pnpm build
pnpm build:clean

# Lint
pnpm lint

# Tests
pnpm test              # Unit tests
pnpm test:watch        # Watch mode
pnpm test:e2e          # E2E tests
pnpm test:e2e:ui       # E2E UI mode
```

## Best Practices Summary

### ✅ Do

- Read PROJECT_CONTEXT.md before starting
- Use the `/build-feature` command for new features
- Create feature branches
- Write tests
- Document everything
- Use German for user-facing text
- Check Vercel preview before merging
- Verify production after deployment
- Track work with todo lists
- Ask questions when unsure

### ❌ Don't

- Commit directly to main
- Skip testing
- Ignore TypeScript errors
- Use English for UI text
- Make assumptions about users
- Skip documentation
- Merge without review
- Deploy without verification
- Leave TODOs in code
- Push broken code

## Getting Help

If you're stuck:

1. **Check documentation**
   - PROJECT_CONTEXT.md
   - Feature-specific docs
   - Code comments

2. **Review similar code**
   - Find similar features
   - Follow established patterns

3. **Ask for help**
   - Create discussion in GitHub
   - Ask team members
   - Use `/build-feature` agent

## Continuous Improvement

This workflow evolves. Suggest improvements by:
1. Creating an issue
2. Proposing changes
3. Updating this document

**Remember**: The goal is quality, not speed. Take time to do it right.
