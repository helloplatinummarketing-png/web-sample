import { BadgeCheck, Clock, Mail, MapPin, Phone } from "lucide-react";
import Link from "next/link";
import { destinations } from "@/data/destinations";
import { site } from "@/data/site";
import { Container } from "../ui/primitives";
import { Logo } from "./Logo";

const quick = [
  { href: "/jobs", label: "Find jobs abroad" },
  { href: "/apply", label: "Apply online" },
  { href: "/track", label: "Track application" },
  { href: "/about", label: "About us" },
  { href: "/contact", label: "Contact" },
  { href: "/credits", label: "Credits & licences" },
];

export function Footer() {
  return (
    <footer className="relative z-10 border-t border-jade/25 bg-night-950 text-sand/80">
      <div aria-hidden="true" className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-coral/70 to-transparent" />
      <Container className="grid gap-12 py-16 md:grid-cols-2 lg:grid-cols-12">
        <div className="space-y-5 lg:col-span-4">
          <Logo />
          <p className="max-w-sm text-sm leading-relaxed text-sand/70">{site.description}</p>
          <p className="inline-flex items-center gap-2 rounded-full border border-jade/50 bg-jade/10 px-3.5 py-1.5 text-sm font-semibold text-jade-300">
            <BadgeCheck className="h-4 w-4" aria-hidden="true" /> {site.licence}
          </p>
        </div>
        <nav aria-label="Footer quick links" className="lg:col-span-2">
          <h2 className="font-mono text-xs font-semibold uppercase tracking-[0.18em] text-coral-300">Quick links</h2>
          <ul className="mt-4 space-y-2.5 text-sm">
            {quick.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="hover:text-coral">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <nav aria-label="Footer destinations" className="lg:col-span-2">
          <h2 className="font-mono text-xs font-semibold uppercase tracking-[0.18em] text-coral-300">Destinations</h2>
          <ul className="mt-4 grid grid-cols-2 gap-2.5 text-sm lg:grid-cols-1">
            {destinations.map((d) => (
              <li key={d.slug}>
                <Link href={`/jobs?country=${d.slug}`} className="hover:text-coral">
                  {d.country}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <div className="lg:col-span-4">
          <h2 className="font-mono text-xs font-semibold uppercase tracking-[0.18em] text-coral-300">Contact</h2>
          <ul className="mt-4 space-y-3 text-sm">
            <li>
              <a href={`tel:+${site.phoneDigits}`} className="flex gap-3 hover:text-coral">
                <Phone className="mt-0.5 h-4 w-4 shrink-0 text-jade-300" aria-hidden="true" /> {site.phoneDisplay} (call or WhatsApp)
              </a>
            </li>
            <li>
              <a href={`mailto:${site.email}`} className="flex gap-3 break-all hover:text-coral">
                <Mail className="mt-0.5 h-4 w-4 shrink-0 text-jade-300" aria-hidden="true" /> {site.email}
              </a>
            </li>
            <li className="flex gap-3">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-jade-300" aria-hidden="true" /> {site.address}
            </li>
            <li className="flex gap-3">
              <Clock className="mt-0.5 h-4 w-4 shrink-0 text-jade-300" aria-hidden="true" /> {site.hours}
            </li>
          </ul>
        </div>
      </Container>
      <div className="border-t border-white/10">
        <Container className="flex flex-col gap-3 pb-24 pt-6 text-xs text-sand/60 md:flex-row md:items-center md:justify-between md:pb-6 md:pr-28">
          <p>
            © {new Date().getFullYear()} {site.name} · {site.licence} · {site.companyRegNo}
          </p>
          <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
            <Link href="/privacy" className="hover:text-coral">
              Privacy
            </Link>
            <Link href="/terms" className="hover:text-coral">
              Terms
            </Link>
            <Link href="/credits" className="hover:text-coral">
              Credits
            </Link>
            {site.showDemoLabel && <span className="rounded-md border border-white/15 px-2 py-0.5 text-[11px]">Demo, sample content</span>}
          </div>
        </Container>
      </div>
    </footer>
  );
}
