# BSC (Bastian Schaefer Consultancy) — bsundc.com

Next.js site for BSC: European-designed bathroom and kitchen product
development for Southeast Asian markets. Flagship line is Tap-to-Shower™ —
a retrofit hot/cold shower system for single-line bathrooms.

## Stack

- **Framework:** Next.js 16 (App Router, Turbopack)
- **UI:** React 19, TypeScript, Tailwind CSS v4
- **Animation:** framer-motion
- **Icons:** lucide-react
- **Email:** Resend (contact form delivery)

## Setup

```bash
# 1. Install deps
npm install

# 2. Create a local env file from the template
cp .env.example .env.local
# then fill in values — RESEND_API_KEY at minimum

# 3. Run the dev server
npm run dev
```

Open http://localhost:3000.

## Environment variables

See `.env.example` for the canonical list. The contact form (`app/api/contact/route.ts`) gracefully degrades if `RESEND_API_KEY` is missing — submissions return a "service not configured" message rather than 500ing.

## Scripts

| Command          | What it does                                    |
| ---------------- | ----------------------------------------------- |
| `npm run dev`    | Start dev server with Turbopack on :3000        |
| `npm run build`  | Production build                                |
| `npm run start`  | Serve the production build                      |
| `npm run lint`   | ESLint                                          |

## Repo layout

```
app/
├── page.tsx                    # Homepage (video hero + triptych + audience paths)
├── about/                      # About BS&C
├── contact/                    # Contact form (submits to /api/contact)
├── api/contact/route.ts        # Resend backend
├── tap-to-shower/              # TTS landing page
│   ├── data.ts                 # Product catalog (kits, taps, heater, etc.)
│   └── [slug]/                 # Per-product detail pages
├── collections/                # Other product collections (S2, SUS, LINE, ...)
├── for-your-project/           # Buyer-type landing pages (retailers, developers,
│                                 architects, consumers)
├── where-to-buy/               # Distribution availability page
├── privacy/                    # Privacy policy
├── error.tsx                   # Global error boundary
├── not-found.tsx               # 404 page
├── layout.tsx                  # Root layout (metadata, fonts)
├── globals.css                 # Design tokens (colors, typography scale, motion)
└── components/                 # Shared components
    ├── Navbar.tsx
    ├── Footer.tsx
    ├── SectionWrapper.tsx      # Section rhythm primitive (hero/primary/secondary)
    ├── CollectionLayout.tsx    # Used by all collection sub-pages
    ├── BuyerPageLayout.tsx     # Used by the 4 for-your-project pages
    ├── Button.tsx · Overline.tsx · EditorialImage.tsx · ...
public/
├── images/                     # Production-ready imagery (webp, png)
└── videos/                     # Hero clips (tts-hero.mp4, showcase.mp4)
```

Heavy raw assets (uncompressed photos, source videos, design files) live in
`_source-assets/` at the repo root and are gitignored — they're for local
working only, never shipped.

## Design system in brief

The "north star" is **quiet / held / confident** — restraint over flourish.
Headings use a measured scale from `globals.css` (`--text-h1` through
`--text-small`), and section rhythm flows through three tokens on
`SectionWrapper`: `hero`, `primary`, `secondary`. The accent colour
(`--color-accent`, a deep teal) appears sparingly on inline `<em>` accents
and overlines; never on body copy.

## Deploy

Standard Next.js deployment. The site is statically rendered where possible
(see `next build` output for the static/dynamic split). The only dynamic
routes are `/api/contact` and `/tap-to-shower/[slug]` (reads URL params).

Before deploying:

1. Set `RESEND_API_KEY`, `RESEND_FROM`, `CONTACT_TO` on the host
2. Verify a sending domain in Resend so `RESEND_FROM` can use a real
   `@bsundc.com` address rather than the sandbox
