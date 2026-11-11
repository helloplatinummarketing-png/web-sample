import { unsplash as u } from "./site";

/** SAMPLE stats: replace with verified figures. */
export const stats = [
  { value: 2400, suffix: "+", label: "Kenyans placed abroad" },
  { value: 94, suffix: "%", label: "Visa approval rate" },
  { value: 150, suffix: "+", label: "Verified employer partners" },
  { value: 8, suffix: "", label: "Destination countries" },
];

/** SAMPLE testimonials: fictional people, stock photography. */
export const testimonials = [
  {
    name: "Achieng O.",
    role: "Senior Care Worker",
    location: "Manchester, UK",
    flag: "gb",
    image: u("1507152832244-10d45c7eda57"),
    duration: "1:24",
    quote:
      "They told me honestly what the UK process would cost and how long it would take. No surprises. Eight months later I'm leading my own shift.",
  },
  {
    name: "Kevin M.",
    role: "Warehouse Team Lead",
    location: "Wroclaw, Poland",
    flag: "pl",
    image: u("1531384441138-2736e62e0919"),
    duration: "0:58",
    quote:
      "I started as a picker and got promoted within a year. The team even checked in on me during my first winter, which meant a lot.",
  },
  {
    name: "Brian K.",
    role: "Hotel Supervisor",
    location: "Dubai, UAE",
    flag: "ae",
    image: u("1522529599102-193c0d76b5b6"),
    duration: "1:12",
    quote:
      "My visa, medicals and ticket were sorted in five weeks. The pre-departure briefing prepared me for everything, from contracts to the heat!",
  },
  {
    name: "Wairimu N.",
    role: "Registered Nurse",
    location: "Munich, Germany",
    flag: "de",
    image: u("1611432579699-484f7990b127"),
    duration: "1:40",
    quote:
      "The German classes and recognition support made a complicated process feel simple. I still message my advisor whenever I need guidance.",
  },
];

/** How it works: 5-step timeline with estimated durations. */
export const timeline = [
  {
    title: "Check your eligibility",
    duration: "2 minutes",
    body: "Answer four quick questions and see which visa routes and countries fit your profile.",
  },
  {
    title: "Apply online",
    duration: "10–15 minutes",
    body: "Complete our secure application and upload your CV, passport and certificates from your phone.",
  },
  {
    title: "Document review",
    duration: "3–5 working days",
    body: "A licensed advisor checks your documents, calls you, and builds a shortlist of matching employers.",
  },
  {
    title: "Interview & visa processing",
    duration: "4–16 weeks",
    body: "We prepare you for employer interviews, then manage contracts, medicals and your visa file end to end.",
  },
  {
    title: "Travel & settle in",
    duration: "1–2 weeks + aftercare",
    body: "Pre-departure orientation, flight booking support and check-ins after you land. We're still a WhatsApp away.",
  },
];

/** Transparent fees card. Amounts are placeholders. */
export const fees = {
  covers: [
    "Profile assessment and one-to-one career consultation",
    "Professional CV formatted to international standards",
    "Matching with verified employers in your chosen country",
    "Interview coaching and document checklist",
    "Ongoing updates via SMS, email and WhatsApp",
  ],
  never: [
    "A fee to \"guarantee\" a job or visa",
    "Cash payments without an official receipt",
    "Payments to personal M-Pesa numbers or bank accounts",
    "Holding your passport or original certificates as security",
    "Hidden charges added after you sign",
  ],
  note: "Employer-specific costs such as medicals, visa fees or language tests are explained in writing before you commit. Many employers cover them.",
};

/** Scam awareness tips */
export const scamTips = [
  {
    title: "Verify the licence",
    body: "Every legitimate agency is licensed by the National Employment Authority (NEA). Ask for the licence number and check it on the NEA's official list before paying anything.",
  },
  {
    title: "Follow the money",
    body: "Never pay into a personal M-Pesa number or individual's account. Real agencies use a company Paybill or bank account and always issue an official receipt.",
  },
  {
    title: "Beware of guarantees",
    body: "No one can guarantee a visa. Be wary of offers that sound too good, need payment \"today\", or ask you to travel on a tourist visa to work.",
  },
];

/** FAQ accordion */
export const faqs = [
  {
    q: "How much does it cost to register?",
    a: "There is a single registration fee, shown clearly on our Fees section, which covers your assessment, CV, employer matching and interview preparation. We never charge to guarantee a job or visa, and every payment comes with an official receipt.",
  },
  {
    q: "How long does the whole process take?",
    a: "It depends on the country and visa route. The Gulf can take 3–8 weeks, Poland and the UK around 2–3 months, while Germany, Canada, Japan and Australia can take 3–6 months because of language or skills assessments.",
  },
  {
    q: "Can I apply if I don't have a degree?",
    a: "Yes. Many of our roles, such as warehouse, hospitality, agriculture and security, need only KCSE or basic English. Use the Eligibility Checker to see which routes fit your education and experience.",
  },
  {
    q: "Which documents do I need?",
    a: "Usually a valid passport, your CV, academic and professional certificates, a certificate of good conduct, and a medical report. Some routes also need an English or language test. We give you a personalised checklist.",
  },
  {
    q: "Do I need a passport before I apply?",
    a: "You can start your application without one, but you'll need a valid passport before any employer interview or visa step. We can advise you on applying through eCitizen.",
  },
  {
    q: "Is my visa guaranteed?",
    a: "No genuine agency can guarantee a visa. Decisions are made by embassies and immigration authorities. What we guarantee is honest advice, a complete and accurate application, and support at every step.",
  },
  {
    q: "Can my family join me later?",
    a: "On many skilled routes (UK, Germany, Canada, Australia) spouses and children may be able to join you. Rules differ by visa type and salary level, so your advisor will explain the options for your route.",
  },
  {
    q: "How do I know you are a legitimate agency?",
    a: "We are licensed by the National Employment Authority. Our licence number is displayed on every page. You're welcome to verify it, visit our Nairobi office, and speak to candidates we've placed.",
  },
];

/** SAMPLE team members: replace names, roles and photos. */
export const team = [
  { name: "[Team Member Name]", initials: "GN", role: "Founder & Managing Director", bio: "15 years in international HR and labour mobility." },
  { name: "[Team Member Name]", initials: "DK", role: "Head of Employer Partnerships", bio: "Vets every employer and contract before it reaches you." },
  { name: "[Team Member Name]", initials: "AH", role: "Visa & Documentation Lead", bio: "Has guided 1,000+ visa files through embassies." },
  { name: "[Team Member Name]", initials: "PO", role: "Candidate Care Manager", bio: "Your first call, and still there after you land." },
];

export const aboutStory = {
  heading: "Built by people who've made the journey",
  paragraphs: [
    "We started with a simple frustration: too many talented Kenyans were losing savings, time and hope to dishonest recruiters. Our founders had worked abroad themselves and knew how life-changing the right opportunity could be, and how damaging the wrong one is.",
    "So we built an agency around transparency. One clear fee. Employers we have personally vetted. Contracts we read line by line before you sign. And an advisor who picks up the phone, before and after you travel.",
    "Today we place nurses, carers, drivers, technicians and hospitality professionals in eight countries, and we measure success by one thing: candidates who thrive and recommend us to their friends.",
  ],
  mission:
    "To give every Kenyan with skill and ambition a safe, legal and dignified route to work abroad, with the information and support they need to succeed.",
  values: [
    { title: "Honesty first", body: "Clear answers, even when the answer is \"not yet\"." },
    { title: "Verified, always", body: "Every employer, contract and job checked before you see it." },
    { title: "Care beyond travel", body: "Support continues after you land, for as long as you need it." },
  ],
};
