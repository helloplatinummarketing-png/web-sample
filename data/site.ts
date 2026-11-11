/**
 * ─────────────────────────────────────────────────────────────
 *  BUSINESS DETAILS: replace every [PLACEHOLDER] before launch.
 * ─────────────────────────────────────────────────────────────
 */
export const site = {
  name: "[CLIENT BUSINESS NAME]",
  tagline: "Kenyan talent. Global careers.",
  description:
    "A licensed Kenyan recruitment and visa placement agency connecting skilled and hard-working Kenyans with verified employers in the UK, Europe, the Gulf, Canada, Japan and Australia.",
  email: "client@email.com",
  phoneDisplay: "+254 7XX XXX XXX",
  /** Digits only, international format, no "+". Used for tel: and wa.me links. */
  phoneDigits: "2547XXXXXXXX",
  whatsappMessage: "Hello! I'd like to speak to an advisor about working abroad.",
  licence: "NEA Licence No. [XXXX]",
  licenceValidUntil: "[DD Month YYYY]",
  companyRegNo: "[Company Reg. No. PVT-XXXXXXX]",
  address: "[Building, Street], Nairobi, Kenya",
  mapQuery: "Nairobi, Kenya", // what the Google Map embed searches for
  hours: [
    { days: "Monday – Friday", time: "8:00am – 5:30pm" },
    { days: "Saturday", time: "9:00am – 1:00pm" },
    { days: "Sunday & public holidays", time: "Closed" },
  ],
  url: "https://example.vercel.app", // live domain, used for SEO + sitemap
  /** Prefix for application reference numbers, e.g. GP-2026-48213 */
  refPrefix: "GP",
  registrationFee: "KES [X,XXX]",
  paybill: "[XXXXXX]",
  socials: {
    facebook: "#",
    instagram: "#",
    linkedin: "#",
    tiktok: "#",
    youtube: "#",
  },
  /** Shows the discreet "Demo, sample content" label in the footer */
  showDemoLabel: true,
};

const u = (id: string) => `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&q=75`;
export const unsplash = u;

export const images = {
  office: u("1542744173-8e7e53415bb0"), // team meeting in a bright office
  handshake: u("1521791136064-7986c2920216"), // professional handshake
  airport: u("1517400508447-f8dd518b86db"), // traveller at a departures board
  nurse: u("1584432810601-6c7f27d2362b"), // nurse in uniform
  healthcare: u("1576091160399-112ba8d25d1d"), // doctor holding phone
  construction: u("1504307651254-35680f356dfd"), // construction workers on site
  engineering: u("1581092160562-40aa08e78837"), // engineer working on drawings
  plane: u("1436491865332-7a61a109cc05"), // aircraft wing above clouds
};

export const navLinks = [
  { href: "/", key: "nav.home" },
  { href: "/jobs", key: "nav.jobs" },
  { href: "/#destinations", key: "nav.destinations" },
  { href: "/track", key: "nav.track" },
  { href: "/about", key: "nav.about" },
  { href: "/contact", key: "nav.contact" },
] as const;
