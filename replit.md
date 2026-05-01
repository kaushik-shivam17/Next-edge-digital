# Workspace

## Overview

pnpm workspace monorepo using TypeScript. Each package manages its own dependencies.

## Stack

- **Monorepo tool**: pnpm workspaces
- **Node.js version**: 24
- **Package manager**: pnpm
- **TypeScript version**: 5.9
- **API framework**: Express 5
- **Database**: PostgreSQL + Drizzle ORM
- **Validation**: Zod (`zod/v4`), `drizzle-zod`
- **API codegen**: Orval (from OpenAPI spec)
- **Build**: esbuild (CJS bundle)

## Key Commands

- `pnpm run typecheck` — full typecheck across all packages
- `pnpm run build` — typecheck + build all packages
- `pnpm --filter @workspace/api-spec run codegen` — regenerate API hooks and Zod schemas from OpenAPI spec
- `pnpm --filter @workspace/db run push` — push DB schema changes (dev only)
- `pnpm --filter @workspace/api-server run dev` — run API server locally

See the `pnpm-workspace` skill for workspace structure, TypeScript setup, and package details.

## Agency Site (`artifacts/agency-site`)

A premium digital agency website for "Next Edge Digital". Runs on port 19242 (externally port 3000).

### Features
- Cinematic preloader with counter animation
- Custom magnetic cursor with hover states
- Smooth scroll via Lenis
- Active nav section detection (Intersection Observer)
- Hero: split-text reveal, scramble animation, parallax, canvas constellation
- TrustedBy: infinite marquee ticker
- Services: 3D tilt cards with glare effect
- Stats: glitch-resolve number animation
- Process: scroll-driven animated progress line + per-step parallax opacity
- Portfolio: category filter tabs (All/Web/Brand/Social/SEO) + horizontal drag scroll
- Testimonials: auto-rotating carousel with progress bar indicator + prev/next controls
- FAQ: left-sticky header + animated accordion with 7 questions
- BookCall: WhatsApp CTA section
- Contact: 3-step multi-step form (About You → Your Project → Final Details) with success state
- Footer: social links + navigation
- Back-to-top: floating button appears on scroll
- Floating WhatsApp button
- Scroll progress bar at top

### Dev command
`PORT=19242 pnpm --filter @workspace/agency-site run dev`
