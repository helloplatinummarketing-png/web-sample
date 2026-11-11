import type { Chapter, JourneyNode } from "@/lib/journey-types";
import { destinations, NAIROBI } from "./destinations";
import { steps, stories, trust } from "./content";

const pad = (n: number) => String(n).padStart(2, "0");

export const nairobiNode: JourneyNode = {
  id: "nairobi",
  ...NAIROBI,
  number: "00",
  pill: "START",
  title: "Nairobi, Kenya",
  label: "Nairobi",
  card: "none",
};

export const destinationNodes: JourneyNode[] = destinations.map((d, i) => ({
  id: d.slug,
  lat: d.lat,
  lng: d.lng,
  number: pad(i + 1),
  pill: "Destination",
  title: d.country,
  meta: `${d.city} · ${d.openRoles} open roles`,
  flag: d.flag,
  label: d.city,
  facts: [
    { label: "Top sectors", value: d.sectors.join(", ") },
    { label: "Salary range", value: d.salary },
    { label: "Processing", value: d.processing },
  ],
  tags: d.tags,
  image: { src: d.image, alt: d.imageAlt },
  cta: { label: `Apply for ${d.country === "United Kingdom" ? "the UK" : d.country === "United Arab Emirates" ? "the UAE" : d.country}`, href: `/apply?country=${d.slug}` },
}));

export const stepNodes: JourneyNode[] = steps.map((s, i) => ({
  id: `step-${s.id}`,
  lat: s.lat,
  lng: s.lng,
  number: pad(i + 1),
  pill: `Step ${pad(i + 1)}`,
  title: s.title,
  meta: `Typical duration: ${s.duration}`,
  text: s.text,
  list: s.checklist,
  label: s.title,
  cta: i === 0 ? { label: "Check my eligibility", href: "#eligibility" } : i === 1 ? { label: "Start my application", href: "/apply" } : undefined,
}));

export const storyNodes: JourneyNode[] = stories.map((s, i) => ({
  id: `story-${s.id}`,
  lat: s.lat,
  lng: s.lng,
  number: pad(i + 1),
  pill: "Success story",
  title: s.name,
  meta: `${s.role} · ${s.city}, ${s.country}`,
  text: s.quote,
  quote: true,
  flag: s.flag,
  label: s.city,
  image: { src: s.image, alt: `Portrait of ${s.name}`, portrait: true },
}));

export const trustNodes: JourneyNode[] = trust.map((t, i) => ({
  id: `trust-${t.id}`,
  lat: t.lat,
  lng: t.lng,
  number: pad(i + 1),
  pill: "Trust",
  title: t.title,
  text: t.text,
  list: t.list,
  label: t.title,
}));

const ids = (n: JourneyNode[]) => n.map((x) => x.id);

/** Timeline chapters open with an intro card anchored to Nairobi, before the line sets off. */
const withIntro = (c: Chapter): Chapter =>
  c.kind !== "timeline"
    ? c
    : {
        ...c,
        nodes: [
          { ...c.nodes[0], card: "glass", pill: `Chapter ${c.number}`, title: c.title, text: c.intro, meta: "Starting point · Nairobi, Kenya" },
          ...c.nodes.slice(1),
        ],
      };

export const chapters: Chapter[] = ([
  {
    id: "hero",
    kind: "hero",
    number: "00",
    eyebrow: "Licensed overseas recruitment · Nairobi",
    title: "Your career journey starts in Nairobi.",
    intro: "",
    nodes: [nairobiNode],
    path: [],
    fixedFocus: NAIROBI,
    view: { x: 0.45, y: -0.04, zoom: 1, offLng: -30, offLat: 4 },
    mobileView: { x: 0, y: -0.64, zoom: 0.8, offLng: 0, offLat: 18 },
    vh: 100,
  },
  {
    id: "destinations",
    kind: "timeline",
    number: "01",
    eyebrow: "Chapter 01 · Destinations",
    title: "Eight countries. One route from home.",
    intro: "Follow the line from Nairobi to the countries where our candidates are working today.",
    nodes: [nairobiNode, ...destinationNodes],
    path: ["nairobi", ...ids(destinationNodes)],
    view: { x: -0.4, y: 0, zoom: 1, offLng: 22, offLat: 4 },
    mobileView: { x: 0, y: 0.42, zoom: 0.84, offLng: 0, offLat: 0 },
    vh: 640,
  },
  {
    id: "how",
    kind: "timeline",
    number: "02",
    eyebrow: "Chapter 02 · How it works",
    title: "Five steps, from your phone to the departure gate.",
    intro: "Every application follows the same honest, documented process.",
    nodes: [{ ...nairobiNode }, ...stepNodes],
    path: ["nairobi", ...ids(stepNodes)],
    fixedFocus: { lat: 5.5, lng: 38.4 },
    view: { x: -0.36, y: -0.04, zoom: 2.05, offLng: -6, offLat: -2 },
    mobileView: { x: 0, y: 0.4, zoom: 1.6, offLng: 0, offLat: -2 },
    vh: 430,
  },
  {
    id: "eligibility",
    kind: "pause",
    number: "03",
    eyebrow: "Chapter 03 · Eligibility",
    title: "Where could you work? Find out in four taps.",
    intro: "Answer four questions. Matching destinations light up on the globe as you go.",
    nodes: [{ ...nairobiNode, card: "quiz" }, ...destinationNodes],
    path: ["nairobi"],
    fixedFocus: { lat: 22, lng: 34 },
    view: { x: -0.5, y: -0.04, zoom: 0.92, offLng: 0, offLat: 0 },
    mobileView: { x: 0, y: 0.55, zoom: 0.62, offLng: 0, offLat: 0 },
    vh: 220,
  },
  {
    id: "stories",
    kind: "timeline",
    number: "04",
    eyebrow: "Chapter 04 · Success stories",
    title: "Kenyans already on their journey.",
    intro: "Sample stories for this demo, shown with the city where each candidate works.",
    nodes: [nairobiNode, ...storyNodes],
    path: ["nairobi", ...ids(storyNodes)],
    view: { x: -0.4, y: 0, zoom: 1, offLng: 22, offLat: 4 },
    mobileView: { x: 0, y: 0.42, zoom: 0.84, offLng: 0, offLat: 0 },
    vh: 300,
  },
  {
    id: "trust",
    kind: "timeline",
    number: "05",
    eyebrow: "Chapter 05 · Trust",
    title: "Safe, licensed and transparent.",
    intro: "Four promises we make to every candidate, and how to protect yourself from fake agents.",
    nodes: [nairobiNode, ...trustNodes],
    path: ["nairobi", ...ids(trustNodes)],
    fixedFocus: { lat: -1, lng: 37 },
    view: { x: -0.4, y: 0, zoom: 1.3, offLng: -4, offLat: 0 },
    mobileView: { x: 0, y: 0.42, zoom: 1.05, offLng: 0, offLat: 0 },
    vh: 380,
  },
  {
    id: "final",
    kind: "burst",
    number: "06",
    eyebrow: "Your journey starts here",
    title: "Your journey starts here.",
    intro: "One application. A licensed advisor. A route to any of eight countries.",
    nodes: [{ ...nairobiNode, card: "final" }, ...destinationNodes, ...storyNodes],
    path: ["nairobi"],
    fixedFocus: { lat: 18, lng: 30 },
    view: { x: 0, y: -0.08, zoom: 0.86, offLng: 0, offLat: 0 },
    mobileView: { x: 0, y: 0.3, zoom: 0.72, offLng: 0, offLat: 0 },
    vh: 200,
  },
] as Chapter[]).map(withIntro);
