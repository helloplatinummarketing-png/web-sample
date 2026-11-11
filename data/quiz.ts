/**
 * Eligibility quiz: 4 questions. SAMPLE rules: have the client confirm criteria before launch.
 * Unanswered questions don't filter, so matches light up live as answers are chosen.
 */
export type QuizAnswers = { field?: string; years?: number; education?: number; region?: string };

export const quiz = [
  {
    key: "field" as const,
    q: "What kind of work do you do?",
    options: [
      { value: "health", label: "Nursing & care" },
      { value: "trades", label: "Trades & engineering" },
      { value: "hospitality", label: "Hospitality & security" },
      { value: "logistics", label: "Driving & logistics" },
      { value: "it", label: "IT & digital" },
      { value: "general", label: "Farm, factory & general" },
    ],
  },
  {
    key: "years" as const,
    q: "How many years of experience?",
    options: [
      { value: 0, label: "Under 1 year" },
      { value: 1, label: "1 – 2 years" },
      { value: 3, label: "3 – 5 years" },
      { value: 5, label: "5+ years" },
    ],
  },
  {
    key: "education" as const,
    q: "Your highest qualification?",
    options: [
      { value: 1, label: "KCSE" },
      { value: 2, label: "Certificate" },
      { value: 3, label: "Diploma" },
      { value: 4, label: "Degree" },
    ],
  },
  {
    key: "region" as const,
    q: "Where would you like to work?",
    options: [
      { value: "europe", label: "Europe & UK" },
      { value: "middle-east", label: "The Gulf" },
      { value: "asia-pacific", label: "Asia & Australia" },
      { value: "north-america", label: "Canada" },
      { value: "any", label: "Anywhere" },
    ],
  },
];

type Rule = { fields: string[]; minYears: number; minEducation: number; route: string };

export const rules: Record<string, Rule> = {
  uk: { fields: ["health", "logistics", "trades"], minYears: 1, minEducation: 2, route: "Health & Care / Skilled Worker visa" },
  germany: { fields: ["health", "it", "trades"], minYears: 2, minEducation: 3, route: "Skilled Immigration Act / Opportunity Card" },
  canada: { fields: ["general", "logistics", "trades"], minYears: 1, minEducation: 1, route: "Temporary Foreign Worker Program" },
  poland: { fields: ["general", "trades", "logistics"], minYears: 0, minEducation: 1, route: "Type D work visa" },
  japan: { fields: ["health", "hospitality", "trades"], minYears: 0, minEducation: 1, route: "Specified Skilled Worker (SSW)" },
  uae: { fields: ["hospitality", "general", "logistics", "it"], minYears: 0, minEducation: 1, route: "Employment visa (employer sponsored)" },
  qatar: { fields: ["hospitality", "general", "trades"], minYears: 0, minEducation: 1, route: "Work residence permit" },
  australia: { fields: ["trades", "health", "it"], minYears: 3, minEducation: 2, route: "Skills in Demand (subclass 482)" },
};

export function matchDestinations(a: QuizAnswers, regionOf: (slug: string) => string): string[] {
  return Object.entries(rules)
    .filter(([slug, r]) => {
      if (a.field && !r.fields.includes(a.field)) return false;
      if (a.years !== undefined && a.years < r.minYears) return false;
      if (a.education !== undefined && a.education < r.minEducation) return false;
      if (a.region && a.region !== "any" && regionOf(slug) !== a.region) return false;
      return true;
    })
    .map(([slug]) => slug);
}
