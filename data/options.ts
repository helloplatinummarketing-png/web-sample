/** Shared option lists used by the eligibility checker, job filters and application form. */

export const fields = [
  { value: "healthcare", label: "Nursing & healthcare" },
  { value: "caregiving", label: "Caregiving & support work" },
  { value: "engineering", label: "Engineering & technical" },
  { value: "it", label: "IT & digital" },
  { value: "trades", label: "Construction & skilled trades" },
  { value: "hospitality", label: "Hospitality & catering" },
  { value: "logistics", label: "Driving, warehousing & logistics" },
  { value: "manufacturing", label: "Factory & manufacturing" },
  { value: "agriculture", label: "Agriculture & food processing" },
  { value: "security", label: "Security services" },
  { value: "general", label: "General / unskilled work" },
] as const;

export type Field = (typeof fields)[number]["value"];
export const fieldLabel = (v: string) => fields.find((f) => f.value === v)?.label ?? v;

export const experience = [
  { value: "0", label: "Less than 1 year", years: 0 },
  { value: "1", label: "1–2 years", years: 1 },
  { value: "3", label: "3–5 years", years: 3 },
  { value: "5", label: "More than 5 years", years: 5 },
] as const;
export const experienceLabel = (v: string) => experience.find((e) => e.value === v)?.label ?? v;

export const education = [
  { value: "primary", label: "Primary / below KCSE", rank: 0 },
  { value: "kcse", label: "KCSE (secondary)", rank: 1 },
  { value: "certificate", label: "Certificate / artisan", rank: 2 },
  { value: "diploma", label: "Diploma", rank: 3 },
  { value: "degree", label: "Bachelor's degree", rank: 4 },
  { value: "masters", label: "Master's or higher", rank: 5 },
] as const;
export type Education = (typeof education)[number]["value"];
export const educationRank = (v: string) => education.find((e) => e.value === v)?.rank ?? 0;
export const educationLabel = (v: string) => education.find((e) => e.value === v)?.label ?? v;

export const regions = [
  { value: "europe", label: "Europe & UK" },
  { value: "middle-east", label: "Middle East" },
  { value: "asia-pacific", label: "Asia & Australia" },
  { value: "north-america", label: "North America" },
  { value: "any", label: "Open to anywhere" },
] as const;
export type Region = (typeof regions)[number]["value"];

export const visaTypes = [
  "Skilled Worker",
  "Health & Care Worker",
  "General / Unskilled Worker",
  "Seasonal / Agricultural",
  "Specified Skilled Worker (Japan)",
  "Study",
  "Other",
] as const;

export const sectors = [
  "Healthcare",
  "Caregiving",
  "Engineering",
  "IT",
  "Trades",
  "Hospitality",
  "Logistics",
  "Manufacturing",
  "Agriculture",
  "Security",
] as const;

export const passportStatus = ["I have a valid passport", "My passport is being processed", "I don't have a passport yet"];

export const availability = ["Immediately", "Within 1 month", "1–3 months", "3–6 months", "Just exploring for now"];
