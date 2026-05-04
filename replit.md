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
- **AI**: Replit AI Integrations (OpenAI) — no API key required, billed to Replit credits

## Key Commands

- `pnpm run typecheck` — full typecheck across all packages
- `pnpm run build` — typecheck + build all packages
- `pnpm --filter @workspace/api-spec run codegen` — regenerate API hooks and Zod schemas from OpenAPI spec
- `pnpm --filter @workspace/db run push` — push DB schema changes (dev only)
- `pnpm --filter @workspace/api-server run dev` — run API server locally

See the `pnpm-workspace` skill for workspace structure, TypeScript setup, and package details.

## Workflows

- **Start application**: `VITE_PORT=5000 pnpm --filter @workspace/agency-site run dev` (port 5000, webview)
- **API Server**: `PORT=8080 pnpm --filter @workspace/api-server run dev` (port 8080, console)

## Agency Site (`artifacts/agency-site`)

A premium digital agency website for "Next Edge Digital". Runs on port 5000.

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
- AI chat assistant ("Ask Edge AI") powered by OpenAI gpt-5-mini via Replit AI Integrations

## API Server (`artifacts/api-server`)

Express 5 backend running on port 8080.

### Routes
- `GET /api/healthz` — health check
- `POST /api/chat` — streaming AI chat (SSE), rate limited to 30 req/15min
- `POST /api/contact` — contact form submission via Nodemailer (requires SMTP_PASSWORD secret)

### Environment Variables Required
- `PORT` — set to 8080 (configured in workflow)
- `AI_INTEGRATIONS_OPENAI_API_KEY` — auto-set by Replit AI Integrations
- `AI_INTEGRATIONS_OPENAI_BASE_URL` — auto-set by Replit AI Integrations
- `DATABASE_URL` — auto-set by Replit PostgreSQL
- `SMTP_PASSWORD` — must be set by user for contact form email delivery

## Database (`lib/db`)

Drizzle ORM with PostgreSQL. Schema includes:
- `conversations` — chat conversation records
- `messages` — individual chat messages per conversation

Run `pnpm --filter @workspace/db push` to apply schema changes.
