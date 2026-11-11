/** A milestone on the globe. Every JourneyGlobe section is built from an array of these. */
export type JourneyNode = {
  id: string;
  lat: number;
  lng: number;
  number: string; // "01", "02"…
  pill: string; // "DESTINATION", "STEP 02"…
  title: string;
  meta?: string;
  text?: string;
  image?: { src: string; alt: string; portrait?: boolean };
  cta?: { label: string; href: string };
  flag?: string;
  facts?: { label: string; value: string }[];
  tags?: string[];
  list?: string[];
  quote?: boolean;
  /** Short label drawn beside the node number on the globe ("London") */
  label?: string;
  /** Special card renderers; default is the glass card */
  card?: "glass" | "quiz" | "final" | "none";
};

export type LatLng = { lat: number; lng: number };

/** Where the globe sits on screen and how the focused node is framed. */
export type ViewCfg = {
  x: number; // globe offset in world units (− = left)
  y: number;
  zoom: number;
  offLng?: number; // degrees the focused node sits right (+) / left (−) of the globe's centre
  offLat?: number; // degrees above (+) / below (−)
};

export type ChapterKind = "hero" | "timeline" | "pause" | "burst";

export type Chapter = {
  id: string;
  kind: ChapterKind;
  number: string;
  eyebrow: string;
  title: string;
  intro: string;
  nodes: JourneyNode[];
  /** Node ids the progress line travels through, in order */
  path: string[];
  /** Keep the camera on one spot instead of following the line */
  fixedFocus?: LatLng;
  view: ViewCfg;
  mobileView: ViewCfg;
  /** Scroll length of the chapter in viewport heights (3D mode) */
  vh: number;
};
