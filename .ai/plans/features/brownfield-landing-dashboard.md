---
title: Brownfield PRD — Landing Revamp & Role Dashboards
owner: Product/PM
status: draft
version: 0.1.0
lastUpdated: 2025-09-12
links:
  - architecture: mdc:docs/brownfield-architecture.md
  - tasksIndex: mdc:TASKS.md
---

## 1. Goal

Deliver a visually rich, accessible landing experience with animated storytelling and a themed, role-based dashboard UI for Admin, Mentor, and Student.

## 2. Scope

- Landing page overhaul: hero, mission, story, how-it-works, programs, testimonials, video, CTA, footer
- Theming and component restyle using shadcn/ui, Tailwind tokens
- Animation integration: GSAP (ScrollTrigger), Framer Motion
- Programs data backend (DB + API) and admin CRUD UIs for workshops/blog
- Accessibility and cross-browser testing

## 3. Constraints

- Next.js App Router, TypeScript, Tailwind, shadcn/ui
- Drizzle ORM with Neon Postgres (production) — see `lib/db/*`
- Maintain backwards compatibility with existing routes and middleware

## 4. Success Criteria

- Core sections implemented and animated; CLS/LCP within acceptable thresholds
- WCAG AA color contrast; keyboard navigation; semantic markup
- Role dashboards themed consistently; no regressions

## 5. Dependencies

See active tasks in [TASKS.md](mdc:TASKS.md) and `.ai/tasks/` (if present). This PRD aligns with tasks 1–29 currently pending.

## 6. Non-Goals

- Major auth changes
- Payment processing (future)

## 7. Acceptance Criteria (per section)

- Hero: animated headline on load; performant and SSR-friendly
- Mission: parallax with GSAP; no jank
- Story: scroll pinning sequence via ScrollTrigger
- How It Works: SVG-led visuals; responsive
- Programs: creative Swiper carousel; backend API for data
- Testimonials: non-standard Swiper effects
- Video: accessible player with captions placeholder
- CTA: strong visual identity; clear action
- Footer: aligned with theme; accurate links

## 8. Risks

- Build-time issues from animation libs in SSR — mitigate with dynamic import and `use client`
- Performance overhead from heavy animations — budget with `prefers-reduced-motion`

## 9. Milestones

1) Theme + Components (Tasks 1,4)  2) Anim libs (3)  3) Hero (5)  4) Sections (6–15)  5) Responsiveness/Accessibility (16,18)  6) Dashboards (20–24)  7) Backend (10,25–27)  8) Final polish (17,19,29)

