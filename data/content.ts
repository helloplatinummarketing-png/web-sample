import { u } from "./site";

/** SAMPLE content: every step, story and stat below is demo copy. */

export const steps = [
  {
    id: "eligibility", title: "Check eligibility", duration: "2 minutes",
    text: "Answer four quick questions and see which countries and visa routes genuinely fit your skills.",
    checklist: ["Your field of work", "Years of experience", "Highest qualification"],
    lat: 3.4, lng: 31.2,
  },
  {
    id: "apply", title: "Apply online", duration: "About 10 minutes",
    text: "Fill in one application, upload your CV and passport, and a licensed advisor is assigned to you.",
    checklist: ["CV (PDF or Word)", "Passport bio page", "Phone number on WhatsApp"],
    lat: 8.2, lng: 33.9,
  },
  {
    id: "documents", title: "Documents review", duration: "3 – 7 working days",
    text: "We check every certificate, help you fix gaps and only put you forward for roles you qualify for.",
    checklist: ["Academic & trade certificates", "Certificate of good conduct", "Reference letters"],
    lat: 10.2, lng: 38.4,
  },
  {
    id: "visa", title: "Interview & visa processing", duration: "3 – 16 weeks",
    text: "We prepare you for employer interviews, then file your visa with the embassy and keep you updated.",
    checklist: ["Signed job offer", "Medical certificate", "Language test (if required)"],
    lat: 8.2, lng: 42.9,
  },
  {
    id: "fly", title: "Fly & settle in", duration: "First 90 days",
    text: "Pre-departure briefing, airport pick-up and a WhatsApp check-in from our team after you land.",
    checklist: ["Flight ticket & visa", "Pre-departure briefing", "Emergency contact sheet"],
    lat: 3.4, lng: 45.6,
  },
];

export const stories = [
  {
    id: "wanjiru", name: "Wanjiru K.", role: "Senior Care Worker", country: "United Kingdom", flag: "gb",
    city: "Manchester", lat: 53.48, lng: -2.24, image: u("1531384441138-2736e62e0919"),
    quote:
      "They told me the real costs on day one. Six months later I was on the ward in Manchester, and nothing they promised had changed.",
  },
  {
    id: "brian", name: "Brian O.", role: "Greenhouse Supervisor", country: "Canada", flag: "ca",
    city: "Leamington", lat: 42.05, lng: -82.6, image: u("1507152832244-10d45c7eda57"),
    quote:
      "My advisor answered every WhatsApp message, even at midnight before my embassy interview. I now lead a team of twelve.",
  },
  {
    id: "achieng", name: "Achieng M.", role: "Caregiver (Kaigo)", country: "Japan", flag: "jp",
    city: "Osaka", lat: 34.69, lng: 135.5, image: u("1522529599102-193c0d76b5b6"),
    quote: "The Japanese classes and the pre-departure briefing made Osaka feel familiar before I even landed.",
  },
];

export const trust = [
  {
    id: "licence", title: "NEA licensed agency", lat: 9, lng: 28,
    text: "We are registered with Kenya's National Employment Authority. Check our licence number on the NEA website before you pay anything.",
    list: ["Licence displayed in our office", "Verifiable with the NEA", "Renewed every year"],
  },
  {
    id: "fees", title: "Transparent fees", lat: 9, lng: 46,
    text: "One published registration fee, paid to our company Paybill. Never in cash, never to a personal number.",
    list: ["We NEVER charge for a job offer", "We NEVER pass employer fees to you", "We NEVER keep your passport"],
  },
  {
    id: "data", title: "Your data is protected", lat: -11, lng: 46,
    text: "We handle your documents under the Kenya Data Protection Act, 2019, and only share them with employers you approve.",
    list: ["Encrypted document storage", "Your consent before every share", "Delete your data on request"],
  },
  {
    id: "scams", title: "How to spot a fake agency", lat: -11, lng: 28,
    text: "Fake agents promise guaranteed visas, ask for M-Pesa payments to a personal line and pressure you to pay today.",
    list: ["No licence number? Walk away", "A “guaranteed visa” is a red flag", "Report suspected scams to the NEA"],
  },
];

export const stats = [
  { value: "1,200+", label: "Kenyans placed abroad" },
  { value: "8", label: "Destination countries" },
  { value: "96%", label: "Visa approval rate" },
  { value: "0", label: "Hidden fees" },
];

export const team = [
  { name: "[Founder Name]", role: "Founder & Managing Director" },
  { name: "[Advisor Name]", role: "Head of Placements" },
  { name: "[Advisor Name]", role: "Visa & Compliance Lead" },
  { name: "[Advisor Name]", role: "Candidate Care (WhatsApp)" },
];
