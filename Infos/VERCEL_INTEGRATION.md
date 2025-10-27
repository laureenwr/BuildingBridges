# Vercel Integration Guide

## Overview

This guide covers Vercel deployment integration for the Building Bridges project, including automatic preview deployments, production deployments, and monitoring.

## Vercel Setup

### Initial Configuration

1. **Connect Repository**
   - Go to [Vercel Dashboard](https://vercel.com)
   - Import the GitHub repository
   - Select the repository: `building-bridges`

2. **Configure Build Settings**
   ```
   Framework Preset: Next.js
   Build Command: pnpm build
   Output Directory: .next
   Install Command: pnpm install
   Development Command: pnpm dev
   ```

3. **Set Root Directory** (if applicable)
   ```
   Root Directory: ./
   ```

## Environment Variables

### Required Variables

Set these in Vercel Dashboard → Project → Settings → Environment Variables:

#### Database
```env
POSTGRES_URL=postgresql://[user]:[password]@[host]/[db]?sslmode=require
POSTGRES_URL_NON_POOLING=postgresql://[user]:[password]@[host]/[db]?sslmode=require
```

#### Authentication
```env
AUTH_SECRET=[random-32-char-string]
NEXTAUTH_URL=https://your-domain.vercel.app
NEXTAUTH_SECRET=[same-as-auth-secret]
```

#### OpenAI
```env
OPENAI_API_KEY=sk-...
```

#### Email (Optional)
```env
# Option 1: SMTP
SMTP_HOST=smtp.your-provider.com
SMTP_PORT=587
SMTP_USER=your-username
SMTP_PASS=your-password
EMAIL_FROM=Building Bridges <no-reply@your-domain.com>

# Option 2: Resend
RESEND_API_KEY=re_...
EMAIL_FROM=Building Bridges <no-reply@your-domain.com>
```

#### Site Configuration
```env
SITE_URL=https://your-domain.vercel.app
```

### Environment Scopes

Set variables for different environments:
- **Production**: Used for production deployments
- **Preview**: Used for branch preview deployments
- **Development**: Used for local development (via Vercel CLI)

## Deployment Workflows

### Automatic Preview Deployments

**Triggered by:**
- Push to any branch (except main)
- Opening a pull request
- Pushing to an existing PR branch

**Process:**
1. Vercel detects push via GitHub webhook
2. Runs build: `pnpm install && pnpm build`
3. Deploys to preview URL
4. Comments on PR with deployment URL
5. Updates commit status on GitHub

**Preview URL Format:**
```
https://building-bridges-[branch-name]-[hash].vercel.app
```

**What to Check:**
- [ ] Preview URL is accessible
- [ ] All pages load correctly
- [ ] Authentication works
- [ ] Database connections work
- [ ] No build errors in logs
- [ ] Environment variables loaded
- [ ] New feature works as expected

### Automatic Production Deployments

**Triggered by:**
- Merge to `main` branch
- Direct push to `main` (avoid this)

**Process:**
1. Vercel detects main branch update
2. Runs production build
3. Deploys to production domain
4. Promotes to production
5. Sends deployment notification

**Production URL:**
```
https://building-bridges.vercel.app (or custom domain)
```

**Post-Deployment Verification:**
- [ ] Production site is live
- [ ] New features are visible
- [ ] No errors in production logs
- [ ] Database migrations applied
- [ ] Critical flows work (login, signup, etc.)
- [ ] Performance is acceptable

## Vercel Dashboard

### Deployment Logs

Access logs at: `Dashboard → Project → Deployments → [Deployment] → Logs`

**Build Logs:**
```
Running build command...
✓ Compiled successfully
✓ Linting and checking types...
✓ Creating optimized production build
```

**Runtime Logs:**
```
[GET] /api/auth/session - 200 (23ms)
[POST] /api/onboarding - 200 (145ms)
```

### Monitoring

**Deployment Status:**
- 🟢 Ready: Deployment successful
- 🟡 Building: In progress
- 🔴 Failed: Build or deployment error

**Metrics to Monitor:**
- Build time
- Deployment frequency
- Error rate
- Response times

### Functions

Vercel converts API routes and Server Actions to serverless functions.

**View Functions:**
`Dashboard → Project → Functions`

**Key Functions:**
- `/api/auth/*` - Authentication
- `/api/stripe/*` - Payment webhooks
- Server Actions (inline in pages)

## GitHub Integration

### Pull Request Comments

Vercel automatically comments on PRs:

```markdown
✅ Preview deployment ready!

**Latest commit:** abc1234

**Preview URL:** https://building-bridges-feature-xyz123.vercel.app

**Build time:** 2m 34s
```

### Commit Status Checks

Vercel updates commit status on GitHub:
- ✅ Vercel - Deployment successful
- 🔴 Vercel - Deployment failed

**Required Status Check:**
Add "Vercel" as required status check in GitHub:
`Settings → Branches → Branch protection rules → main`

## Custom Domains

### Adding a Domain

1. **Go to Domains**
   `Dashboard → Project → Settings → Domains`

2. **Add Domain**
   - Enter domain name: `buildingbridges.org`
   - Follow DNS configuration steps

3. **Configure DNS**
   ```
   Type: A
   Name: @
   Value: 76.76.21.21

   Type: CNAME
   Name: www
   Value: cname.vercel-dns.com
   ```

4. **Wait for Verification**
   Usually takes 5-10 minutes

5. **Enable HTTPS**
   Vercel automatically provisions SSL certificates

## Build Configuration

### vercel.json (Optional)

Create `vercel.json` in project root for advanced configuration:

```json
{
  "buildCommand": "pnpm build",
  "devCommand": "pnpm dev",
  "installCommand": "pnpm install",
  "framework": "nextjs",
  "regions": ["fra1"],
  "functions": {
    "app/api/**/*.ts": {
      "memory": 1024,
      "maxDuration": 10
    }
  },
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        {
          "key": "X-Content-Type-Options",
          "value": "nosniff"
        },
        {
          "key": "X-Frame-Options",
          "value": "DENY"
        },
        {
          "key": "X-XSS-Protection",
          "value": "1; mode=block"
        }
      ]
    }
  ],
  "redirects": [
    {
      "source": "/old-path",
      "destination": "/new-path",
      "permanent": true
    }
  ]
}
```

## Database Migrations

### Automatic Migrations

Add build script to `package.json`:

```json
{
  "scripts": {
    "build": "pnpm db:migrate && next build",
    "db:migrate": "npx tsx lib/db/migrate.ts"
  }
}
```

This runs migrations before each deployment.

### Manual Migrations

If needed, run migrations manually:

```bash
# Using Vercel CLI
vercel env pull .env.production
pnpm db:migrate

# Or via Drizzle Studio
pnpm db:studio
```

## Error Handling

### Common Build Errors

**1. Missing Environment Variables**
```
Error: Environment variable POSTGRES_URL is not defined
```
**Fix:** Add variable in Vercel Dashboard

**2. TypeScript Errors**
```
Type error: Property 'foo' does not exist on type 'Bar'
```
**Fix:** Run `pnpm build` locally, fix errors, push again

**3. Dependency Issues**
```
Cannot find module '@/lib/utils'
```
**Fix:** Check imports, ensure paths are correct

**4. Database Connection Timeout**
```
Error: Connection timeout
```
**Fix:** Check `POSTGRES_URL`, verify database is accessible

### Runtime Errors

**View Logs:**
`Dashboard → Project → Logs`

**Common Issues:**

1. **Server Action Errors**
   - Check authentication
   - Verify database queries
   - Check validation schemas

2. **API Route Errors**
   - Verify request/response format
   - Check middleware
   - Validate environment variables

3. **Build Size Errors**
   ```
   Error: Function size exceeded 50MB
   ```
   **Fix:**
   - Remove unused dependencies
   - Use dynamic imports
   - Split large bundles

## Rollback Strategy

### Instant Rollback

1. **Go to Deployments**
   `Dashboard → Project → Deployments`

2. **Find Previous Deployment**
   Select the last known good deployment

3. **Promote to Production**
   Click "Promote to Production"

### Redeploy

Alternatively, revert the commit:

```bash
git revert HEAD
git push origin main
```

Vercel will automatically deploy the reverted version.

## Vercel CLI

### Installation

```bash
npm i -g vercel
```

### Authentication

```bash
vercel login
```

### Link Project

```bash
vercel link
```

### Deploy from CLI

```bash
# Preview deployment
vercel

# Production deployment
vercel --prod
```

### Pull Environment Variables

```bash
vercel env pull .env.local
```

### View Logs

```bash
vercel logs
vercel logs --follow  # Stream logs
```

## Performance Optimization

### Edge Functions

Move API routes to Edge Runtime for better performance:

```typescript
// app/api/route.ts
export const runtime = 'edge';

export async function GET(request: Request) {
  // Your code
}
```

### Image Optimization

Vercel automatically optimizes images:

```typescript
import Image from 'next/image';

<Image
  src="/image.jpg"
  alt="Description"
  width={800}
  height={600}
/>
```

### Caching

Configure caching headers:

```typescript
export async function GET() {
  return new Response(data, {
    headers: {
      'Cache-Control': 's-maxage=3600, stale-while-revalidate',
    },
  });
}
```

## Analytics

### Enable Web Analytics

1. **Go to Analytics**
   `Dashboard → Project → Analytics`

2. **Enable Analytics**
   Provides:
   - Page views
   - Top pages
   - Referrers
   - Devices

### Speed Insights

Shows Core Web Vitals:
- LCP (Largest Contentful Paint)
- FID (First Input Delay)
- CLS (Cumulative Layout Shift)

**Enable:**
`Dashboard → Project → Speed Insights`

## Security

### Environment Variable Security

- ✅ Never commit `.env` files
- ✅ Use Vercel Dashboard for secrets
- ✅ Rotate secrets regularly
- ✅ Use different secrets for preview/production

### Deployment Protection

**Enable Deployment Protection:**
`Dashboard → Project → Settings → Deployment Protection`

Options:
- Password protection for previews
- Vercel Authentication
- Custom authentication

### Security Headers

Add in `next.config.js`:

```javascript
module.exports = {
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'X-DNS-Prefetch-Control',
            value: 'on'
          },
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=63072000; includeSubDomains; preload'
          },
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN'
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff'
          },
        ],
      },
    ];
  },
};
```

## Troubleshooting

### Deployment Stuck

1. Check build logs
2. Cancel deployment
3. Push again

### Preview Not Updating

1. Hard refresh: `Cmd+Shift+R`
2. Check deployment status
3. Verify correct branch

### Environment Variables Not Loading

1. Check variable name spelling
2. Verify environment scope
3. Redeploy after adding variables

### Database Connection Issues

1. Verify `POSTGRES_URL`
2. Check database is accessible
3. Test connection locally
4. Check IP whitelist (if applicable)

## Best Practices

### ✅ Do

- Set all required environment variables
- Test preview deployments before merging
- Monitor production deployments
- Use preview comments for PR reviews
- Enable security headers
- Set up custom domain
- Use Web Analytics
- Keep dependencies updated

### ❌ Don't

- Skip testing previews
- Ignore build warnings
- Commit environment variables
- Deploy without verification
- Disable security features
- Ignore error logs
- Skip rollback planning

## Support

### Vercel Support

- **Documentation**: https://vercel.com/docs
- **Status**: https://vercel-status.com
- **Support**: support@vercel.com

### Project-Specific Issues

- Check `DEVELOPMENT_WORKFLOW.md`
- Review GitHub Actions logs
- Check Vercel deployment logs
- Contact development team

## Checklist for New Deployments

Before deploying a new feature:

- [ ] All environment variables set
- [ ] Database migrations ready
- [ ] Local testing complete
- [ ] Preview deployment tested
- [ ] GitHub Actions pass
- [ ] Code review approved
- [ ] Documentation updated
- [ ] Rollback plan in place

After deployment:

- [ ] Production site accessible
- [ ] New feature works
- [ ] No error logs
- [ ] Performance acceptable
- [ ] Monitor for issues
