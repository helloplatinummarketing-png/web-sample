import Link from "next/link";
import { BadgeCheck, Clock, Mail, MapPin, Phone } from "lucide-react";
import { destinations } from "@/data/destinations";
import { site } from "@/data/site";
import { Container } from "../ui/primitives";
import { SocialIcons } from "../ui/SocialIcons";
import { Logo } from "./Logo";
import { Newsletter } from "./Newsletter";

const quickLinks = [
  { href: "/jobs", label: "Browse jobs" },
  { href: "/#eligibility", label: "Eligibility checker" },
  { href: "/apply", label: "Apply now" },
  { href: "/track", label: "Track application" },
  { href: "/about", label: "About us" },
  { href: "/contact", label: "Contact" },
];

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="relative overflow-hidden bg-navy-950 text-white/75">
      <div aria-hidden="true" className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gold/70 to-transparent" />
      <Container className="grid gap-12 py-16 lg:grid-cols-12">
        <div className="space-y-6 lg:col-span-4">
          <Logo invert />
          <p className="max-w-sm text-sm leading-relaxed text-white/65">{site.description}</p>
          <div className="inline-flex items-center gap-2 rounded-xl border border-gold/30 bg-gold/10 px-3.5 py-2 text-sm font-semibold text-gold">
            <BadgeCheck className="h-4 w-4" aria-hidden="true" />
            {site.licence}
          </div>
          <SocialIcons />
        </div>

        <nav aria-label="Footer quick links" className="lg:col-span-2">
          <h2 className="font-display text-sm font-semibold text-white">Quick links</h2>
          <ul className="mt-4 space-y-2.5 text-sm">
            {quickLinks.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="transition hover:text-gold">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <nav aria-label="Footer destinations" className="lg:col-span-2">
          <h2 className="font-display text-sm font-semibold text-white">Destinations</h2>
          <ul className="mt-4 grid grid-cols-2 gap-x-4 gap-y-2.5 text-sm lg:grid-cols-1">
            {destinations.map((d) => (
              <li key={d.slug}>
                <Link href={`/jobs?country=${d.slug}`} className="transition hover:text-gold">
                  {d.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="space-y-8 lg:col-span-4">
          <div>
            <h2 className="font-display text-sm font-semibold text-white">Contact</h2>
            <ul className="mt-4 space-y-3 text-sm">
              <li>
                <a href={`tel:+${site.phoneDigits}`} className="flex gap-3 transition hover:text-gold">
                  <Phone className="mt-0.5 h-4 w-4 shrink-0 text-gold" aria-hidden="true" /> {site.phoneDisplay}
                </a>
              </li>
              <li>
                <a href={`mailto:${site.email}`} className="flex gap-3 break-all transition hover:text-gold">
                  <Mail className="mt-0.5 h-4 w-4 shrink-0 text-gold" aria-hidden="true" /> {site.email}
                </a>
              </li>
              <li className="flex gap-3">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-gold" aria-hidden="true" /> {site.address}
              </li>
              <li className="flex gap-3">
                <Clock className="mt-0.5 h-4 w-4 shrink-0 text-gold" aria-hidden="true" />
                {site.hours[0].days}, {site.hours[0].time}
              </li>
            </ul>
          </div>
          <Newsletter />
        </div>
      </Container>

      <div className="border-t border-white/10">
        <Container className="flex flex-col gap-3 pb-24 pt-6 text-xs text-white/55 sm:pr-24 md:flex-row md:items-center md:justify-between md:pb-6">
          <p>
            © {year} {site.name} · {site.licence} · {site.companyRegNo}
          </p>
          <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
            <Link href="/privacy" className="hover:text-gold">
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:text-gold">
              Terms of Service
            </Link>
            {site.showDemoLabel && (
              <span className="rounded-md border border-white/15 px-2 py-0.5 text-[11px] text-white/55">Demo, sample content</span>
            )}
          </div>
        </Container>
      </div>
    </footer>
  );
}
