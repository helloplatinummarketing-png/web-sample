"use client";

import { Check, Search } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { destinations, NAIROBI, type Destination } from "@/data/destinations";
import { site } from "@/data/site";
import { normaliseKenyanPhone } from "@/lib/format";
import { slerpLatLng } from "@/lib/geo";
import type { JourneyNode } from "@/lib/journey-types";
import { JourneyGlobe } from "../journey/JourneyGlobe";
import { a11y, Field, inputCls } from "../forms/Field";
import { btn, Flag } from "../ui/primitives";

const STAGES = [
  { title: "Received", text: "Your application and documents are in our system." },
  { title: "Under review", text: "An advisor is checking your documents and experience." },
  { title: "Matched", text: "You've been shortlisted for a verified employer." },
  { title: "Visa processing", text: "Your visa application has been filed with the embassy." },
  { title: "Ready to travel", text: "Visa approved. Pre-departure briefing booked." },
];
export const DEMO_REF = `${site.refPrefix}-2026-48213`;
const REF_RE = new RegExp(`^${site.refPrefix}-\\d{4}-\\d{5}$`);

/** Mock status: derived from the reference so the demo is repeatable. */
function lookup(ref: string): { stage: number; dest: Destination } {
  let saved: { ref?: string; country?: string } = {};
  try {
    saved = JSON.parse(localStorage.getItem("last-application") ?? "{}");
  } catch {}
  const digits = ref.replace(/\D/g, "");
  const sum = digits.split("").reduce((a, c) => a + Number(c), 0);
  if (ref === DEMO_REF) return { stage: 3, dest: destinations[0] };
  if (saved.ref === ref) return { stage: 0, dest: destinations.find((d) => d.slug === saved.country) ?? destinations[0] };
  return { stage: sum % 5, dest: destinations[sum % destinations.length] };
}

export function Tracker() {
  const params = useSearchParams();
  const [ref, setRef] = useState("");
  const [phone, setPhone] = useState("");
  const [errors, setErrors] = useState<{ ref?: string; phone?: string }>({});
  const [result, setResult] = useState<{ ref: string; stage: number; dest: Destination } | null>(null);

  const run = (r: string, p: string) => {
    const e: typeof errors = {};
    const R = r.trim().toUpperCase();
    if (!REF_RE.test(R)) e.ref = `Use the format ${site.refPrefix}-2026-12345.`;
    if (!normaliseKenyanPhone(p)) e.phone = "Enter the Kenyan number you applied with.";
    setErrors(e);
    if (e.ref || e.phone) {
      document.getElementById(e.ref ? "ref" : "phone")?.focus();
      return;
    }
    setResult({ ref: R, ...lookup(R) });
  };

  useEffect(() => {
    const r = params.get("ref");
    const p = params.get("phone");
    if (r && p) {
      setRef(r);
      setPhone(p);
      run(r, p);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params]);

  // status nodes sit along the great-circle route from Nairobi to the destination
  const nodes: JourneyNode[] = useMemo(() => {
    const dest = result?.dest ?? destinations[0];
    return STAGES.map((s, i) => {
      const p = slerpLatLng(NAIROBI, dest, i / (STAGES.length - 1));
      return { id: `stage-${i}`, ...p, number: String(i + 1).padStart(2, "0"), pill: "Status", title: s.title, label: s.title };
    });
  }, [result]);

  return (
    <div className="grid gap-8 lg:grid-cols-[1fr_380px]">
      <div className="space-y-6">
        <form
          className="glass grid gap-4 rounded-3xl p-5 sm:grid-cols-[1fr_1fr_auto] sm:items-end sm:p-6"
          noValidate
          onSubmit={(e) => {
            e.preventDefault();
            run(ref, phone);
          }}
        >
          <Field id="ref" label="Reference number" required error={errors.ref}>
            <input {...a11y("ref", errors.ref, undefined, true)} value={ref} onChange={(e) => setRef(e.target.value)} placeholder={DEMO_REF} className={`${inputCls(!!errors.ref)} font-mono uppercase`} />
          </Field>
          <Field id="phone" label="Phone number" required error={errors.phone}>
            <input {...a11y("phone", errors.phone, undefined, true)} type="tel" inputMode="tel" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="07XX XXX XXX" className={inputCls(!!errors.phone)} />
          </Field>
          <button type="submit" className={btn("primary", "h-[50px]")}>
            <Search className="h-4 w-4" aria-hidden="true" /> Track
          </button>
          <p className="text-xs text-sand/60 sm:col-span-3">
            Demo: try <button type="button" className="font-mono text-coral-300 underline underline-offset-2" onClick={() => { setRef(DEMO_REF); setPhone("0712 345 678"); run(DEMO_REF, "0712345678"); }}>{DEMO_REF}</button> with any Kenyan number.
          </p>
        </form>

        {result && (
          <section className="glass fade-up rounded-3xl p-5 sm:p-6" aria-live="polite" aria-labelledby="status-title">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <p className="font-mono text-xs text-jade-300">{result.ref}</p>
                <h2 id="status-title" className="mt-1 font-display text-2xl font-bold text-ivory">
                  {STAGES[result.stage].title}
                </h2>
              </div>
              <p className="flex items-center gap-2 text-sm text-sand/80">
                <Flag code={result.dest.flag} name={result.dest.country} size={22} /> Nairobi → {result.dest.city}
              </p>
            </div>
            <ol className="mt-6 space-y-4">
              {STAGES.map((s, i) => {
                const done = i < result.stage;
                const now = i === result.stage;
                return (
                  <li key={s.title} className="flex gap-4" aria-current={now ? "step" : undefined}>
                    <span
                      className={`relative grid h-8 w-8 shrink-0 place-items-center rounded-full font-mono text-xs font-bold ${
                        done ? "bg-jade text-night-900" : now ? "bg-coral text-night-900" : "border border-jade/40 text-sand/60"
                      }`}
                    >
                      {now && <span className="pulse-ring absolute inset-0 rounded-full bg-coral/60" aria-hidden="true" />}
                      {done ? <Check className="h-4 w-4" aria-hidden="true" /> : `0${i + 1}`}
                    </span>
                    <div>
                      <p className={`font-semibold ${now ? "text-coral-300" : done ? "text-ivory" : "text-sand/60"}`}>
                        {s.title} <span className="sr-only">{done ? "(complete)" : now ? "(current)" : "(upcoming)"}</span>
                      </p>
                      <p className="text-sm text-sand/70">{s.text}</p>
                    </div>
                  </li>
                );
              })}
            </ol>
          </section>
        )}
      </div>

      <aside aria-label="Application route" className="order-first lg:order-none">
        <div className="glass rounded-3xl p-4 lg:sticky lg:top-24">
          <div className="relative mx-auto aspect-square w-44 sm:w-56 lg:w-full">
            <JourneyGlobe
              variant="mini"
              nodes={nodes}
              path={result ? nodes.map((n) => n.id) : []}
              line={result ? result.stage : 0}
              activeId={result ? `stage-${result.stage}` : null}
              visitedIds={result ? nodes.slice(0, result.stage).map((n) => n.id) : []}
              focus={result ? slerpLatLng(NAIROBI, result.dest, 0.5) : NAIROBI}
              view={{ x: 0, y: 0, zoom: 0.95 }}
              className="absolute inset-0"
              posterClassName="inset-[10%]"
            />
          </div>
          <p className="mt-3 text-center font-mono text-[11px] uppercase tracking-[0.18em] text-jade-300">
            {result ? `Stage ${result.stage + 1} of 5 · ${STAGES[result.stage].title}` : "Enter your reference to see your route"}
          </p>
        </div>
      </aside>
    </div>
  );
}
