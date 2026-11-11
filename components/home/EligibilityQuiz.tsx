"use client";

import { ArrowLeft, ArrowUpRight, RotateCcw } from "lucide-react";
import { useEffect } from "react";
import { create } from "zustand";
import { destinationBySlug } from "@/data/destinations";
import { matchDestinations, quiz, rules, type QuizAnswers } from "@/data/quiz";
import { useJourney } from "@/lib/journey-store";
import { go } from "@/lib/scroll";
import { Flag } from "../ui/primitives";

type QuizState = { step: number; answers: QuizAnswers; setAnswer: (k: keyof QuizAnswers, v: string | number) => void; back: () => void; reset: () => void };

/** Shared quiz state: the 3D-anchored card and the lite-mode card stay in sync. */
export const useQuiz = create<QuizState>((set) => ({
  step: 0,
  answers: {},
  setAnswer: (k, v) => set((s) => ({ answers: { ...s.answers, [k]: v }, step: Math.min(quiz.length, s.step + 1) })),
  back: () => set((s) => ({ step: Math.max(0, s.step - 1) })),
  reset: () => set({ step: 0, answers: {} }),
}));

const regionOf = (slug: string) => destinationBySlug(slug)?.region ?? "";

export const quizMatches = (a: QuizAnswers) => (Object.keys(a).length ? matchDestinations(a, regionOf) : []);

/** Lights matching destination nodes on the globe while the eligibility chapter is on screen. */
export function QuizGlobeSync() {
  const answers = useQuiz((s) => s.answers);
  const chapterId = useJourney((s) => s.chapterId);
  useEffect(() => {
    if (chapterId !== "eligibility") return;
    const m = quizMatches(answers);
    useJourney.getState().set({ litIds: m, spokeIds: m });
  }, [answers, chapterId]);
  return null;
}

export function EligibilityQuiz({ idPrefix, compact = false }: { idPrefix: string; compact?: boolean }) {
  const { step, answers, setAnswer, back, reset } = useQuiz();
  const done = step >= quiz.length;
  const matches = quizMatches(answers);
  const q = quiz[Math.min(step, quiz.length - 1)];

  const applyHref = () => {
    const p = new URLSearchParams();
    if (matches[0]) p.set("country", matches[0]);
    if (matches.length) p.set("matches", matches.join(","));
    if (answers.field) p.set("field", answers.field);
    return `/apply?${p.toString()}`;
  };

  return (
    <div className={`glass glass-blur rounded-3xl p-5 text-ivory sm:p-6 ${compact ? "w-full" : "w-[min(440px,88vw)]"}`}>
      <div data-s="0" className="flex items-center justify-between">
        <span className="pill">Eligibility check</span>
        <span className="font-mono text-xs text-jade-300">
          {done ? "Results" : `${String(step + 1).padStart(2, "0")} / 0${quiz.length}`}
        </span>
      </div>
      <div data-s="1" className="mt-3 flex gap-1.5" aria-hidden="true">
        {quiz.map((_, i) => (
          <span key={i} className={`h-1 flex-1 rounded-full transition-colors ${i < step ? "bg-coral" : i === step ? "bg-coral/50" : "bg-white/15"}`} />
        ))}
      </div>

      {!done ? (
        <fieldset data-s="2" className="mt-4" key={q.key}>
          <legend className="font-display text-xl font-bold leading-snug">{q.q}</legend>
          <div className="mt-4 grid grid-cols-2 gap-2">
            {q.options.map((o) => {
              const selected = answers[q.key] === o.value;
              return (
                <button
                  key={String(o.value)}
                  type="button"
                  id={`${idPrefix}-${q.key}-${o.value}`}
                  aria-pressed={selected}
                  onClick={() => setAnswer(q.key, o.value)}
                  className={`rounded-xl border px-3 py-2.5 text-left text-sm font-semibold transition ${
                    selected ? "border-coral bg-coral/15 text-ivory" : "border-jade/40 bg-white/[0.04] text-sand hover:border-jade-300 hover:bg-white/10"
                  }`}
                >
                  {o.label}
                </button>
              );
            })}
          </div>
        </fieldset>
      ) : (
        <div data-s="2" className="mt-4" aria-live="polite">
          <p className="font-display text-xl font-bold">
            {matches.length ? `${matches.length} destination${matches.length > 1 ? "s" : ""} match you` : "No direct match yet"}
          </p>
          <p className="mt-1 text-sm text-sand/80">
            {matches.length
              ? "Lit up on the globe. Sample rules: an advisor confirms the final route."
              : "Talk to an advisor: there may still be a route through training or a different visa type."}
          </p>
          {matches.length > 0 && (
            <ul className="mt-3 max-h-48 space-y-2 overflow-y-auto pr-1" data-lenis-prevent>
              {matches.map((slug) => {
                const d = destinationBySlug(slug)!;
                return (
                  <li key={slug} className="flex items-center gap-3 rounded-xl border border-jade/30 bg-white/[0.04] px-3 py-2">
                    <Flag code={d.flag} name={d.country} size={22} />
                    <div className="min-w-0">
                      <p className="text-sm font-bold">{d.country}</p>
                      <p className="truncate text-xs text-sand/70">{rules[slug].route}</p>
                    </div>
                  </li>
                );
              })}
            </ul>
          )}
        </div>
      )}

      <div data-s="4" className="mt-5 flex items-center justify-between gap-3">
        {step > 0 ? (
          <button type="button" onClick={done ? reset : back} className="inline-flex items-center gap-1.5 text-sm font-semibold text-jade-300 hover:text-ivory">
            {done ? <RotateCcw className="h-4 w-4" aria-hidden="true" /> : <ArrowLeft className="h-4 w-4" aria-hidden="true" />}
            {done ? "Start again" : "Back"}
          </button>
        ) : (
          <span className="text-xs text-sand/60">Takes under a minute</span>
        )}
        {done && (
          <a
            href={applyHref()}
            onClick={(e) => go(applyHref(), e)}
            className="inline-flex items-center gap-1.5 rounded-full bg-coral px-4 py-2.5 text-sm font-bold text-night-900 hover:bg-coral-300"
          >
            Apply with these results <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
          </a>
        )}
      </div>
    </div>
  );
}
