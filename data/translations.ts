/**
 * English / Kiswahili strings for the language toggle (navbar, hero and CTAs).
 * Have a native speaker review the Kiswahili before launch.
 */
const en = {
  "nav.home": "Home",
  "nav.jobs": "Jobs",
  "nav.apply": "Apply",
  "nav.track": "Track",
  "nav.about": "About",
  "nav.contact": "Contact",

  "cta.apply": "Apply Now",
  "cta.start": "Start My Journey",
  "cta.jobs": "Find Jobs Abroad",
  "cta.chat": "Chat with an advisor",

  "hero.eyebrow": "NEA-licensed overseas recruitment",
  "hero.title.a": "Your career journey starts in",
  "hero.title.b": "Nairobi.",
  "hero.subtitle":
    "We match skilled and hard-working Kenyans with verified employers in eight countries, then guide every document, interview and visa step until you land.",

  "ui.menu.open": "Open menu",
  "ui.menu.close": "Close menu",
  "ui.lang": "Switch language",
};

export type TKey = keyof typeof en;

const sw: Record<TKey, string> = {
  "nav.home": "Nyumbani",
  "nav.jobs": "Kazi",
  "nav.apply": "Tuma Ombi",
  "nav.track": "Fuatilia",
  "nav.about": "Kuhusu",
  "nav.contact": "Wasiliana",

  "cta.apply": "Tuma Ombi Sasa",
  "cta.start": "Anza Safari Yangu",
  "cta.jobs": "Tafuta Kazi Ng'ambo",
  "cta.chat": "Ongea na mshauri",

  "hero.eyebrow": "Wakala wa ajira ng'ambo aliyesajiliwa na NEA",
  "hero.title.a": "Safari yako ya kikazi inaanzia",
  "hero.title.b": "Nairobi.",
  "hero.subtitle":
    "Tunawaunganisha Wakenya wenye ujuzi na bidii na waajiri waliothibitishwa katika nchi nane, na kukuongoza katika kila hatua ya nyaraka, mahojiano na visa hadi utakapofika.",

  "ui.menu.open": "Fungua menyu",
  "ui.menu.close": "Funga menyu",
  "ui.lang": "Badilisha lugha",
};

export const translations = { en, sw };
export type Lang = keyof typeof translations;
