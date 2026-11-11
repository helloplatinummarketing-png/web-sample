# "Sunrise Horizon": Journey Globe recruitment demo

Next.js 16 (App Router) · TypeScript · Tailwind CSS 4 · three.js + React Three Fiber + drei + postprocessing · GSAP ScrollTrigger · Lenis · Zustand

## Run locally

```bash
npm install
npm run dev              # http://localhost:3000
npm run build && npm start   # production check
```

Force a mode for demos: `/?3d=1` (always 3D) or `/?lite=1` (static globe + timeline).

## Deploy to Vercel

```bash
npx vercel@latest              # preview URL
npx vercel@latest --prod       # production
```

Or push to GitHub and import the repo at https://vercel.com/new. No environment variables are needed.
After deploying, set `site.url` in `data/site.ts` to the live domain (used by the sitemap, canonical URLs and Open Graph).

## How the journey works

- `components/journey/JourneyGlobe.tsx`: the reusable component. It takes `nodes`, `path`, `activeId`, `litIds`, `line`, `focus` and `view`, lazy-loads the WebGL scene and shows a static globe until it's ready (and permanently in lite mode).
- `components/journey/three/*`: Earth shader (NASA day + night maps), graticule, atmosphere, crystal nodes, the coral progress line (real tube geometry, so it passes behind the Earth), spoke arcs and drei `<Html>` cards with connectors.
- `components/home/HomeJourney.tsx`: GSAP ScrollTrigger scrubs each chapter, drives the store (`lib/journey-store.ts`), and handles keyboard arrows, the top progress bar and the mobile docked card.
- `data/journey.ts`: the chapters (nodes, path, camera framing, scroll length).
- Lite mode (reduced motion, low-memory devices, no WebGL) is chosen before first paint by `lib/mode.ts`. Every card is also real HTML in the chapter sections, for screen readers and search engines.
- Phones load WebGL on first interaction, so the page stays fast; desktop loads it during the intro loader.

## Content files

| File | What's in it |
| --- | --- |
| `data/site.ts` | Business name, contacts, licence, address, hours, socials, domain, reference prefix |
| `data/destinations.ts` | 8 destinations: city node coordinates, sectors, salary, processing, open roles, photos |
| `data/content.ts` | How-it-works steps, success stories, trust cards, stats, team |
| `data/quiz.ts` | Eligibility quiz questions and matching rules |
| `data/jobs.ts`, `data/options.ts` | 12 sample jobs and form/filter option lists |
| `data/translations.ts` | English / Kiswahili strings (navbar, hero, CTAs) |

Set `site.showDemoLabel = false` to remove the "Demo, sample content" footer label.

## Notes

- Forms are client-side only (demo). Connect them to an API route, Formspree or Resend before launch. Uploaded files never leave the browser.
- Track demo reference: `JRN-2026-48213` with any Kenyan phone number.
- Textures: `public/textures/*.webp`, compressed from NASA Blue Marble (April 2004) and Black Marble 2016 (public domain). Full credits at `/credits`.
