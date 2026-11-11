# Recruitment Agency Demo: "Midnight & Gold"

Next.js 16 (App Router) · TypeScript · Tailwind CSS 4 · Framer Motion · Lenis · lucide-react · d3-geo (globe)

## Run locally

```bash
npm install
npm run dev            # http://localhost:3000

# production check
npm run build
npm start
```

## Deploy to Vercel

```bash
npm i -g vercel
vercel login
vercel                 # preview URL
vercel --prod          # production
```

Or push to GitHub and import the repo at https://vercel.com/new. No environment variables are needed.

## Where the content lives

| File | What's in it |
| --- | --- |
| `data/site.ts` | Business name, contacts, licence, address, hours, socials, fee, Paybill, domain, reference prefix, images |
| `data/destinations.ts` | 8 countries: sectors, processing times, open-role counts, photos |
| `data/jobs.ts` | 12 sample job listings (job board and detail pages) |
| `data/content.ts` | Stats, testimonials, timeline, fees, scam tips, FAQs, team, About story |
| `data/eligibility.ts` | Visa programmes and rules used by the Eligibility Checker |
| `data/options.ts` | Form/filter option lists (fields, education, visa types…) |
| `data/translations.ts` | English / Kiswahili strings (navbar, hero, CTAs) |

Set `site.showDemoLabel = false` in `data/site.ts` to remove the "Demo, sample content" label.

## Notes

- Forms are client-side only (no backend). To go live, post them to an API route or a service such as Formspree or Resend.
- File uploads stay in the browser in this demo; nothing is sent anywhere.
- The Track page returns a mock status derived from the reference number (try `GP-2026-48213`).
- Unsplash images are resized by Unsplash's CDN through `lib/image-loader.ts`.
- Flags are self-hosted SVGs from the `flag-icons` package (MIT).
