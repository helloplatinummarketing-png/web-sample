import { programmes, type Programme } from "@/data/eligibility";
import { educationRank, experience, type Region } from "@/data/options";

export type Answers = { field: string; experience: string; education: string; region: string };

export type Match = { programme: Programme; strength: "strong" | "possible"; gap?: string };

/**
 * Simple rules engine for the demo:
 *  - field must be eligible for the programme
 *  - region must match (or "any")
 *  - "strong" if experience + education meet the minimum,
 *    "possible" if they fall short by one small step (training/language can close the gap).
 */
export function matchProgrammes(a: Answers): Match[] {
  const years = experience.find((e) => e.value === a.experience)?.years ?? 0;
  const edu = educationRank(a.education);
  const out: Match[] = [];

  for (const p of programmes) {
    if (!p.fields.includes(a.field as Programme["fields"][number])) continue;
    if (a.region !== "any" && p.region !== (a.region as Region)) continue;

    const expGap = p.minYears - years;
    const eduGap = p.minEducation - edu;

    if (expGap <= 0 && eduGap <= 0) {
      out.push({ programme: p, strength: "strong" });
    } else if (expGap <= 2 && eduGap <= 1 && !(expGap > 0 && eduGap > 0)) {
      out.push({
        programme: p,
        strength: "possible",
        gap: expGap > 0 ? "A little more work experience would strengthen your case." : "An additional certificate or qualification may be required.",
      });
    }
  }

  return out.sort((x, y) => (x.strength === y.strength ? 0 : x.strength === "strong" ? -1 : 1));
}
