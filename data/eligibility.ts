import type { Field, Region } from "./options";

/**
 * Programmes the Eligibility Checker can recommend.
 * SAMPLE rules for the demo: have the client confirm criteria before launch.
 */
export type Programme = {
  id: string;
  name: string;
  country: string; // destination slug
  region: Exclude<Region, "any">;
  visaType: string; // maps to the application form's visa type list
  fields: Field[];
  minYears: number;
  minEducation: number; // rank from options.education
  note: string;
};

export const programmes: Programme[] = [
  {
    id: "uk-health-care",
    name: "UK Health & Care Worker visa",
    country: "uk",
    region: "europe",
    visaType: "Health & Care Worker",
    fields: ["healthcare", "caregiving"],
    minYears: 1,
    minEducation: 2,
    note: "English test (IELTS/OET) required. Care certificate or nursing registration helps.",
  },
  {
    id: "uk-skilled",
    name: "UK Skilled Worker visa",
    country: "uk",
    region: "europe",
    visaType: "Skilled Worker",
    fields: ["engineering", "it", "logistics", "hospitality"],
    minYears: 3,
    minEducation: 3,
    note: "Requires a sponsoring employer and a role that meets the salary threshold.",
  },
  {
    id: "de-skilled",
    name: "Germany Skilled Worker visa",
    country: "germany",
    region: "europe",
    visaType: "Skilled Worker",
    fields: ["healthcare", "engineering", "it", "trades"],
    minYears: 1,
    minEducation: 3,
    note: "Qualification recognition plus German A2–B1. We can arrange language classes.",
  },
  {
    id: "de-opportunity",
    name: "Germany Opportunity Card",
    country: "germany",
    region: "europe",
    visaType: "Skilled Worker",
    fields: ["healthcare", "engineering", "it", "trades", "hospitality", "logistics"],
    minYears: 3,
    minEducation: 3,
    note: "Points-based job-seeker permit. Lets you search for work in Germany for up to a year.",
  },
  {
    id: "pl-work",
    name: "Poland Work Permit (Type A)",
    country: "poland",
    region: "europe",
    visaType: "General / Unskilled Worker",
    fields: ["logistics", "manufacturing", "general", "trades", "agriculture", "hospitality"],
    minYears: 0,
    minEducation: 0,
    note: "Employer-sponsored. Basic English and good physical fitness are usually enough.",
  },
  {
    id: "ca-lmia",
    name: "Canada Employer-Specific Work Permit (LMIA)",
    country: "canada",
    region: "north-america",
    visaType: "Seasonal / Agricultural",
    fields: ["agriculture", "logistics", "manufacturing", "trades", "caregiving"],
    minYears: 1,
    minEducation: 1,
    note: "Tied to a specific employer with an approved LMIA. Some roles need an English test.",
  },
  {
    id: "jp-ssw",
    name: "Japan Specified Skilled Worker (SSW)",
    country: "japan",
    region: "asia-pacific",
    visaType: "Specified Skilled Worker (Japan)",
    fields: ["caregiving", "manufacturing", "agriculture", "hospitality", "trades"],
    minYears: 0,
    minEducation: 1,
    note: "Requires a sector skills test and Japanese at JLPT N4. Pre-departure training is available.",
  },
  {
    id: "au-sid",
    name: "Australia Skills in Demand visa (482)",
    country: "australia",
    region: "asia-pacific",
    visaType: "Skilled Worker",
    fields: ["healthcare", "engineering", "it", "trades"],
    minYears: 1,
    minEducation: 3,
    note: "Employer-sponsored. A skills assessment and English test (IELTS/PTE) are usually needed.",
  },
  {
    id: "ae-employment",
    name: "UAE Employment Visa",
    country: "uae",
    region: "middle-east",
    visaType: "General / Unskilled Worker",
    fields: ["hospitality", "security", "general", "logistics", "trades", "caregiving", "manufacturing"],
    minYears: 0,
    minEducation: 0,
    note: "Fast processing. Medical and good-conduct certificate required.",
  },
  {
    id: "qa-work",
    name: "Qatar Work Residence Permit",
    country: "qatar",
    region: "middle-east",
    visaType: "General / Unskilled Worker",
    fields: ["hospitality", "security", "trades", "logistics", "general", "healthcare"],
    minYears: 0,
    minEducation: 0,
    note: "Employer provides accommodation in most roles. Medical tests done in Kenya.",
  },
];
