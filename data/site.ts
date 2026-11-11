/**
 * ─────────────────────────────────────────────────────────────
 *  BUSINESS DETAILS: replace every [PLACEHOLDER] before launch.
 * ─────────────────────────────────────────────────────────────
 */
export const site = {
  name: "[CLIENT BUSINESS NAME]",
  shortName: "[CLIENT]",
  tagline: "Your career journey starts in Nairobi.",
  description:
    "A licensed Kenyan overseas recruitment and visa agency guiding skilled and hard-working Kenyans to verified jobs in the UK, Germany, Canada, Poland, Japan, the UAE, Qatar and Australia.",
  email: "client@email.com",
  phoneDisplay: "+254 7XX XXX XXX",
  /** Digits only, international format, no "+". Used for tel: and wa.me links. */
  phoneDigits: "2547XXXXXXXX",
  whatsappMessage: "Hello! I'd like to talk to an advisor about working abroad.",
  licence: "NEA Licence No. [XXXX]",
  companyRegNo: "[Company Reg. No. PVT-XXXXXXX]",
  address: "[Building, Street], Nairobi, Kenya",
  hours: "Mon – Fri, 8:00am – 5:30pm · Sat, 9:00am – 1:00pm",
  /** Live domain: used for canonical URLs, sitemap and Open Graph. */
  url: "https://sunrise-horizon.vercel.app",
  /** Prefix for application reference numbers, e.g. JRN-2026-48213 */
  refPrefix: "JRN",
  socials: { facebook: "#", instagram: "#", linkedin: "#", tiktok: "#" },
  /** Shows the discreet "Demo, sample content" label in the footer */
  showDemoLabel: true,
};

export const navLinks = [
  { href: "/", key: "nav.home" },
  { href: "/jobs", key: "nav.jobs" },
  { href: "/apply", key: "nav.apply" },
  { href: "/track", key: "nav.track" },
  { href: "/about", key: "nav.about" },
  { href: "/contact", key: "nav.contact" },
] as const;

export const u = (id: string) => `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&q=75`;
