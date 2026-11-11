/**
 * English / Kiswahili strings for the language toggle (demo covers navbar, hero and CTAs).
 * Have a native speaker review the Kiswahili before launch.
 */
const en = {
  "nav.home": "Home",
  "nav.jobs": "Jobs",
  "nav.destinations": "Destinations",
  "nav.track": "Track Application",
  "nav.about": "About",
  "nav.contact": "Contact",

  "cta.apply": "Apply Now",
  "cta.eligibility": "Check My Eligibility",
  "cta.browseJobs": "Browse Jobs",
  "cta.start": "Start my application",
  "cta.advisor": "Talk to an advisor",
  "cta.chat": "Chat with an advisor",

  "hero.eyebrow": "Licensed overseas recruitment · Nairobi",
  "hero.title.a": "Kenyan talent.",
  "hero.title.b": "Global careers.",
  "hero.title.c": "One honest path.",
  "hero.subtitle":
    "We connect skilled professionals and hard-working Kenyans with verified employers in 8 countries, and walk with you through every document, interview and visa step. No shortcuts, no hidden fees.",
  "hero.trusted": "Kenyans placed abroad",
  "hero.globe": "Live routes from Nairobi",

  "band.title": "Your next chapter is one application away.",
  "band.body":
    "It takes about 10 minutes. A licensed advisor reviews every application personally and calls you within two working days.",

  "ui.language": "Language",
  "ui.menu.open": "Open menu",
  "ui.menu.close": "Close menu",
};

export type TKey = keyof typeof en;

const sw: Record<TKey, string> = {
  "nav.home": "Nyumbani",
  "nav.jobs": "Kazi",
  "nav.destinations": "Nchi",
  "nav.track": "Fuatilia Ombi",
  "nav.about": "Kuhusu Sisi",
  "nav.contact": "Wasiliana Nasi",

  "cta.apply": "Tuma Ombi",
  "cta.eligibility": "Angalia Ustahiki Wangu",
  "cta.browseJobs": "Tazama Kazi",
  "cta.start": "Anza ombi langu",
  "cta.advisor": "Ongea na mshauri",
  "cta.chat": "Ongea na mshauri",

  "hero.eyebrow": "Wakala wa ajira ng'ambo aliyesajiliwa · Nairobi",
  "hero.title.a": "Kipaji cha Kenya.",
  "hero.title.b": "Kazi za kimataifa.",
  "hero.title.c": "Njia moja ya uaminifu.",
  "hero.subtitle":
    "Tunawaunganisha wataalamu na Wakenya wenye bidii na waajiri waliothibitishwa katika nchi 8, na tunakuongoza katika kila hatua ya nyaraka, mahojiano na visa. Hakuna njia za mkato, hakuna ada zilizofichwa.",
  "hero.trusted": "Wakenya wamepata kazi ng'ambo",
  "hero.globe": "Safari kutoka Nairobi",

  "band.title": "Sura yako mpya iko umbali wa ombi moja tu.",
  "band.body":
    "Inachukua takriban dakika 10. Mshauri aliyesajiliwa hukagua kila ombi mwenyewe na kukupigia simu ndani ya siku mbili za kazi.",

  "ui.language": "Lugha",
  "ui.menu.open": "Fungua menyu",
  "ui.menu.close": "Funga menyu",
};

export const translations = { en, sw };
export type Lang = keyof typeof translations;
