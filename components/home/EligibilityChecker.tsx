"use client";

import Link from "next/link";
import { AnimatePresence, m } from "framer-motion";
import { ArrowLeft, ArrowRight, Check, CircleHelp, RotateCcw, Sparkles } from "lucide-react";
import { useState } from "react";
import { destinationBySlug } from "@/data/destinations";
import { education, experience, fields, regions } from "@/data/options";
import { matchProgrammes, type Answers } from "@/lib/eligibility";
import { site } from "@/data/site";
import { whatsappLink } from "@/lib/format";
import { Container, Flag, SectionHeading, btn, card } from "../ui/primitives";

type Q = { key: keyof Answers; title: string; help: string; options: readonly { value: string; label: string }[] };

const questions: Q[] = [
  { key: "field", title: "What's your professional field?", help: "Choose the area where you have the most experience.", options: fields },
  { key: "experience", title: "How many years of experience do you have?", help: "Paid work in your chosen field.", options: experience },
  { key: "education", title: "What's your highest level of education?", help: "Include completed certificates and diplomas.", options: education },
  { key: "region", title: "Where would you like to work?", help: "Not sure? Choose \"Open to anywhere\".", options: regions },
];

const empty: Answers = { field: "", experience: "", education: "", region: "" };

export function EligibilityChecker() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Answers>(empty);
  const [dir, setDir] = useState(1);
  const done = step >= questions.length;
  const q = questions[step];

  const choose = (value: string) => {
    setAnswers((a) => ({ ...a, [q.key]: value }));
    setDir(1);
    setTimeout(() => setStep((s) => s + 1), 180);
  };

  const back = () => {
    setDir(-1);
    setStep((s) => Math.max(0, s - 1));
  };

  const reset = () => {
    setAnswers(empty);
    setDir(-1);
    setStep(0);
  };

  const matches = done ? matchProgrammes(answers) : [];
  const top = matches[0];
  const applyHref = (() => {
    const p = new URLSearchParams({
      field: answers.field,
      experience: answers.experience,
      education: answers.education,
      from: "eligibility",
    });
    if (top) {
      p.set("country", top.programme.country);
      p.set("visa", top.programme.visaType);
      p.set("programmes", matches.slice(0, 3).map((m) => m.programme.name).join("|"));
    }
    return `/apply?${p.toString()}`;
  })();

  const progress = Math.min(step, questions.length) / questions.length;

  return (
    <section id="eligibility" className="scroll-mt-24 bg-surface-2/60 py-20 sm:py-28" aria-labelledby="elig-title">
      <Container className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
        <div className="lg:sticky lg:top-28">
          <SectionHeading
            align="left"
            id="elig-title"
            eyebrow="Eligibility checker"
            title="Find out where you could work in under two minutes."
            intro="Four quick questions. No sign-up. You'll get a personalised list of visa routes you may qualify for, then apply in one click with your answers pre-filled."
          />
          <ul className="mt-8 space-y-3 text-sm text-muted">
            {["Based on real visa requirements for each country", "100% free and confidential", "An advisor confirms your result after you apply"].map((x) => (
              <li key={x} className="flex items-center gap-3">
                <span className="grid h-6 w-6 place-items-center rounded-full bg-gold/20 text-[#8a5d00] dark:text-gold">
                  <Check className="h-3.5 w-3.5" aria-hidden="true" />
                </span>
                {x}
              </li>
            ))}
          </ul>
        </div>

        <div className={`${card} relative overflow-hidden p-6 sm:p-8`}>
          {/* progress */}
          <div className="flex items-center justify-between text-xs font-semibold text-muted">
            <span>{done ? "Your results" : `Question ${step + 1} of ${questions.length}`}</span>
            {step > 0 && !done && (
              <button type="button" onClick={back} className="inline-flex items-center gap-1 rounded-lg px-2 py-1 hover:bg-surface-2 hover:text-fg">
                <ArrowLeft className="h-3.5 w-3.5" aria-hidden="true" /> Back
              </button>
            )}
          </div>
          <div
            className="mt-3 h-1.5 overflow-hidden rounded-full bg-surface-2"
            role="progressbar"
            aria-label="Eligibility checker progress"
            aria-valuemin={0}
            aria-valuemax={100}
            aria-valuenow={Math.round(progress * 100)}
          >
            <m.div className="h-full rounded-full bg-gradient-to-r from-royal to-gold" animate={{ width: `${progress * 100}%` }} transition={{ duration: 0.4 }} />
          </div>

          <div className="relative mt-6 min-h-[420px]" aria-live="polite">
            <AnimatePresence mode="wait" custom={dir}>
              {!done ? (
                <m.fieldset
                  key={q.key}
                  initial={{ opacity: 0, x: dir * 40 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: dir * -40 }}
                  transition={{ duration: 0.28 }}
                >
                  <legend className="font-display text-xl font-bold text-fg sm:text-2xl">{q.title}</legend>
                  <p className="mt-1 text-sm text-muted">{q.help}</p>
                  <div className="mt-6 grid gap-2.5 sm:grid-cols-2">
                    {q.options.map((o) => {
                      const selected = answers[q.key] === o.value;
                      return (
                        <button
                          key={o.value}
                          type="button"
                          onClick={() => choose(o.value)}
                          aria-pressed={selected}
                          className={`group flex items-center justify-between gap-3 rounded-xl border px-4 py-3.5 text-left text-sm font-medium transition ${
                            selected
                              ? "border-royal bg-royal-50 text-royal dark:border-gold dark:bg-gold/10 dark:text-gold"
                              : "border-line bg-surface text-fg hover:-translate-y-0.5 hover:border-royal/60 hover:shadow-md dark:hover:border-gold/60"
                          }`}
                        >
                          {o.label}
                          <span
                            className={`grid h-5 w-5 shrink-0 place-items-center rounded-full border transition ${
                              selected ? "border-royal bg-royal text-white dark:border-gold dark:bg-gold dark:text-navy" : "border-line group-hover:border-royal/60"
                            }`}
                            aria-hidden="true"
                          >
                            {selected && <Check className="h-3 w-3" />}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </m.fieldset>
              ) : (
                <m.div key="result" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
                  {matches.length > 0 ? (
                    <>
                      <div className="flex items-center gap-3">
                        <span className="grid h-11 w-11 place-items-center rounded-xl bg-gold text-navy">
                          <Sparkles className="h-5 w-5" aria-hidden="true" />
                        </span>
                        <div>
                          <p className="font-display text-xl font-bold text-fg">You may qualify for:</p>
                          <p className="text-sm text-muted">
                            {matches.length} route{matches.length > 1 ? "s" : ""} match your profile
                          </p>
                        </div>
                      </div>
                      <ul className="mt-6 space-y-3">
                        {matches.slice(0, 4).map((m) => {
                          const dest = destinationBySlug(m.programme.country);
                          return (
                            <li key={m.programme.id} className="rounded-xl border border-line bg-surface-2/50 p-4">
                              <div className="flex items-start gap-3">
                                {dest && <Flag code={dest.flag} name={dest.name} size={30} className="mt-0.5" />}
                                <div className="min-w-0 flex-1">
                                  <div className="flex flex-wrap items-center gap-2">
                                    <p className="font-semibold text-fg">{m.programme.name}</p>
                                    <span
                                      className={`rounded-full px-2 py-0.5 text-[11px] font-bold uppercase tracking-wide ${
                                        m.strength === "strong" ? "bg-success/10 text-success dark:text-green-400" : "bg-gold/20 text-[#7a5200] dark:text-gold"
                                      }`}
                                    >
                                      {m.strength === "strong" ? "Strong match" : "Possible match"}
                                    </span>
                                  </div>
                                  <p className="mt-1 text-sm text-muted">{m.gap ?? m.programme.note}</p>
                                </div>
                              </div>
                            </li>
                          );
                        })}
                      </ul>
                    </>
                  ) : (
                    <div className="rounded-xl border border-line bg-surface-2/50 p-6 text-center">
                      <CircleHelp className="mx-auto h-10 w-10 text-royal dark:text-gold" aria-hidden="true" />
                      <p className="mt-3 font-display text-lg font-bold text-fg">Let&apos;s find the right route together</p>
                      <p className="mt-2 text-sm text-muted">
                        We didn&apos;t find an automatic match for that region, but many candidates qualify through employer-specific routes. Try
                        &ldquo;Open to anywhere&rdquo; or speak to an advisor.
                      </p>
                    </div>
                  )}

                  <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                    <Link href={applyHref} className={btn("gold", "flex-1")}>
                      Apply with these results <ArrowRight className="h-4 w-4" aria-hidden="true" />
                    </Link>
                    {matches.length === 0 && (
                      <a href={whatsappLink(site.phoneDigits, site.whatsappMessage)} target="_blank" rel="noopener noreferrer" className={btn("outline")}>
                        Ask an advisor
                      </a>
                    )}
                    <button type="button" onClick={reset} className={btn("ghost")}>
                      <RotateCcw className="h-4 w-4" aria-hidden="true" /> Start over
                    </button>
                  </div>
                  <p className="mt-4 text-xs text-muted">Indicative result only. Final eligibility is confirmed by an advisor and the relevant embassy.</p>
                </m.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </Container>
    </section>
  );
}
