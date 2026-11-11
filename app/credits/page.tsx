import type { Metadata } from "next";
import { LegalPage } from "@/components/LegalPage";

export const metadata: Metadata = {
  title: "Credits & licences",
  description: "Imagery, data and open-source software used on this website.",
  alternates: { canonical: "/credits" },
};

const assets = [
  {
    name: "Blue Marble: Next Generation (April 2004, topography & bathymetry)",
    by: "NASA Earth Observatory / Reto Stöckli, NASA Goddard Space Flight Center",
    use: "Earth surface texture (tinted), compressed to WebP",
    licence: "Public domain (NASA imagery, no copyright)",
    href: "https://visibleearth.nasa.gov/images/73909",
  },
  {
    name: "Earth at Night: Black Marble 2016",
    by: "NASA Earth Observatory / Joshua Stevens, Miguel Román, NASA GSFC",
    use: "City-lights texture, compressed to WebP",
    licence: "Public domain (NASA imagery, no copyright)",
    href: "https://visibleearth.nasa.gov/images/144898",
  },
  { name: "Photography", by: "Unsplash contributors", use: "Destination and sample-story photos", licence: "Unsplash License (free to use)", href: "https://unsplash.com/license" },
  { name: "flag-icons", by: "Lipis & contributors", use: "Country flags (self-hosted SVG)", licence: "MIT", href: "https://github.com/lipis/flag-icons" },
  { name: "lucide-react", by: "Lucide contributors", use: "Interface icons", licence: "ISC", href: "https://lucide.dev" },
  { name: "Syne, Manrope, JetBrains Mono", by: "Bonjour Monde; Mikhail Sharanda; JetBrains", use: "Typefaces (via Google Fonts, self-hosted by Next.js)", licence: "SIL Open Font License 1.1", href: "https://fonts.google.com" },
  { name: "three.js, React Three Fiber, drei, postprocessing", by: "three.js authors, Poimandres", use: "3D globe rendering", licence: "MIT", href: "https://threejs.org" },
  { name: "GSAP & ScrollTrigger", by: "GreenSock (Webflow)", use: "Scroll-scrubbed timeline", licence: "GSAP Standard License (free)", href: "https://gsap.com/licensing/" },
  { name: "Lenis, Zustand, Framer Motion, Next.js, Tailwind CSS", by: "darkroom.engineering, Poimandres, Motion, Vercel, Tailwind Labs", use: "Smooth scroll, state, UI and framework", licence: "MIT", href: "https://github.com/darkroomengineering/lenis" },
];

export default function CreditsPage() {
  return (
    <LegalPage eyebrow="Credits" title="Credits & licences" intro="With thanks to NASA and the open-source community. Textures: NASA Visible Earth.">
      <ul className="!mt-0 !space-y-4">
        {assets.map((a) => (
          <li key={a.name} className="!ml-0 !list-none rounded-2xl border border-line bg-white p-5">
            <p className="font-display text-lg font-bold text-fg">{a.name}</p>
            <p className="mt-1 text-sm">{a.by}</p>
            <p className="mt-2 text-sm">
              <span className="font-semibold text-fg">Used for:</span> {a.use}
            </p>
            <p className="text-sm">
              <span className="font-semibold text-fg">Licence:</span> {a.licence} ·{" "}
              <a href={a.href} target="_blank" rel="noopener noreferrer">
                Source
              </a>
            </p>
          </li>
        ))}
      </ul>
    </LegalPage>
  );
}
