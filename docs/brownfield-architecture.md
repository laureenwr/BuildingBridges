---
title: Brownfield Architecture — Landing Revamp & Role Dashboards
author: Architecture
status: draft
lastUpdated: 2025-09-12
links:
  - prd: mdc:.ai/plans/features/brownfield-landing-dashboard.md
---

## Overview

This document outlines integration strategies and compatibility considerations for introducing a new visual theme, animated landing experiences, and themed role dashboards within the existing Next.js + Drizzle + Neon stack.

## System Context

- App Router structure under `app/` with role dashboards in `app/(dashboard)/`
- Auth and session utilities in `lib/auth/*`
- Database via Drizzle (`lib/db/*`) with Neon. Production setup handled during Vercel builds
- UI primitives in `components/ui/*` and site layout components in `components/layout/*`

## Architecture Decisions

1. Theming
   - Extend Tailwind config and CSS tokens under `styles/tokens` to add warm palette and typography updates
   - Override shadcn/ui component styles in `components/ui/*` maintaining API compatibility

2. Animation Libraries
   - Use GSAP + ScrollTrigger for scroll narratives; Framer Motion for viewport entrance animations
   - Isolate to client components; dynamic import ScrollTrigger; guard with `prefers-reduced-motion`

3. Data & APIs
   - Add `programs` table and CRUD API endpoints under `app/api` using Drizzle queries in `lib/db/queries.ts`
   - Keep role-based calendar and workshop/blog endpoints consistent with existing patterns

4. Performance & Accessibility
   - SSR-safe checks for window/document; lazy-load heavy modules
   - Test contrast ratios; keyboard navigability; semantic landmarks

## Module Impact Map

- Tailwind/theme: `tailwind.config.{js,ts}`, `styles/tokens/*`, `app/globals.css`
- Components: `components/ui/*`, `components/layout/footer.tsx`, `components/layout/navbar.tsx`
- Landing sections: `app/page.tsx` and new section components under `app/`
- Anim infra: new utility hooks/components under `lib/design-system/*`
- Data models: `lib/db/schema.ts`, migrations under `lib/db/migrations/`
- APIs: `app/api/*`

## Migration Strategy

1) Introduce theme tokens and component overrides behind incremental PRs
2) Integrate animation libs; implement Hero as first animated section
3) Add `programs` schema and endpoints; wire Programs UI
4) Themed dashboards update in parallel once base theme stable

## Risks & Mitigations

- SSR build failures from GSAP: ensure client-only usage and guarded imports
- Animation performance: throttle, use will-change sparingly, respect reduced motion

## Verification

- Lint/build in CI; add basic unit tests for utility hooks
- Manual QA for accessibility and cross-browser

