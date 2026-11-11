"use client";

import { useSearchParams } from "next/navigation";
import { m } from "framer-motion";
import { Check, Loader2, MessageCircle, Search } from "lucide-react";
import { useState, type FormEvent } from "react";
import { site } from "@/data/site";
import { normaliseKenyanPhone, whatsappLink } from "@/lib/format";
import { REF_RE, mockStatus, trackingSteps } from "@/lib/tracking";
import { Field, a11y, inputCls } from "../forms/Field";
import { btn, card } from "../ui/primitives";

export function Tracker() {
  const params = useSearchParams();
  const [ref, setRef] = useState((params.get("ref") ?? "").toUpperCase());
  const [phone, setPhone] = useState("+254 ");
  const [errors, setErrors] = useState<{ ref?: string; phone?: string }>({});
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<{ ref: string; current: number; dates: (string | null)[] } | null>(null);

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    const r = ref.trim().toUpperCase();
    const errs: typeof errors = {};
    if (!REF_RE.test(r)) errs.ref = `Enter your reference in the format ${site.refPrefix}-2026-48213.`;
    if (!normaliseKenyanPhone(phone)) errs.phone = "Enter the phone number you applied with, e.g. +254 712 345 678.";
    setErrors(errs);
    if (errs.ref || errs.phone) {
      document.getElementById(errs.ref ? "track-ref" : "track-phone")?.focus();
      return;
    }
    setLoading(true);
    await new Promise((res) => setTimeout(res, 900));
    setResult({ ref: r, ...mockStatus(r) });
    setLoading(false);
  };

  return (
    <div className="grid gap-8 lg:grid-cols-[380px_1fr]">
      <form onSubmit={submit} noValidate className={`${card} h-fit space-y-5 p-6 sm:p-8`}>
        <h2 className="text-xl font-bold text-fg">Find your application</h2>
        <Field id="track-ref" label="Reference number" required hint={`e.g. ${site.refPrefix}-2026-48213`} error={errors.ref}>
          <input
            {...a11y("track-ref", errors.ref, `e.g. ${site.refPrefix}-2026-48213`, true)}
            value={ref}
            onChange={(e) => setRef(e.target.value.toUpperCase())}
            placeholder={`${site.refPrefix}-2026-48213`}
            autoCapitalize="characters"
            spellCheck={false}
            className={`${inputCls(!!errors.ref)} font-mono tracking-wider`}
          />
        </Field>
        <Field id="track-phone" label="Phone number" required error={errors.phone}>
          <input
            {...a11y("track-phone", errors.phone, undefined, true)}
            type="tel"
            inputMode="tel"
            autoComplete="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className={inputCls(!!errors.phone)}
          />
        </Field>
        <button type="submit" disabled={loading} className={btn("gold", "w-full py-3.5")}>
          {loading ? <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" /> : <Search className="h-4 w-4" aria-hidden="true" />}
          {loading ? "Checking…" : "Track application"}
        </button>
        <p className="rounded-xl bg-surface-2/60 p-3 text-xs text-muted">
          Demo tip: try <button type="button" className="font-mono font-semibold text-link underline" onClick={() => setRef(`${site.refPrefix}-2026-48213`)}>{site.refPrefix}-2026-48213</button> with any Kenyan number.
        </p>
      </form>

      <div aria-live="polite">
        {result ? (
          <m.div key={result.ref} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className={`${card} p-6 sm:p-8`}>
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.18em] text-muted">Reference</p>
                <p className="font-mono text-xl font-bold text-fg">{result.ref}</p>
              </div>
              <span className="rounded-full bg-gold px-3 py-1 text-xs font-bold text-navy">Current: {trackingSteps[result.current].title}</span>
            </div>

            {/* horizontal progress (desktop) */}
            <div className="mt-8 hidden sm:block" aria-hidden="true">
              <div className="relative h-2 rounded-full bg-surface-2">
                <m.div
                  className="absolute inset-y-0 left-0 rounded-full bg-gradient-to-r from-success to-gold"
                  initial={{ width: 0 }}
                  animate={{ width: `${(result.current / (trackingSteps.length - 1)) * 100}%` }}
                  transition={{ duration: 0.9, ease: "easeOut" }}
                />
              </div>
            </div>

            <ol className="mt-8 space-y-0">
              {trackingSteps.map((s, i) => {
                const state = i < result.current ? "done" : i === result.current ? "current" : "todo";
                return (
                  <m.li
                    key={s.title}
                    initial={{ opacity: 0, x: -12 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.15 + i * 0.1 }}
                    className="relative flex gap-4 pb-7 last:pb-0"
                    aria-current={state === "current" ? "step" : undefined}
                  >
                    {i < trackingSteps.length - 1 && (
                      <span aria-hidden="true" className={`absolute left-[18px] top-10 h-[calc(100%-2.5rem)] w-0.5 ${i < result.current ? "bg-success" : "bg-line"}`} />
                    )}
                    <span
                      className={`relative grid h-9 w-9 shrink-0 place-items-center rounded-full text-sm font-bold ${
                        state === "done"
                          ? "bg-success text-white"
                          : state === "current"
                            ? "bg-navy text-gold ring-4 ring-gold/40 dark:bg-gold dark:text-navy"
                            : "border border-line bg-surface text-muted"
                      }`}
                    >
                      {state === "done" ? <Check className="h-4 w-4" aria-hidden="true" /> : i + 1}
                      {state === "current" && <span className="absolute inset-0 animate-ping rounded-full bg-gold/30 motion-reduce:hidden" aria-hidden="true" />}
                    </span>
                    <div className="pt-1">
                      <p className={`font-semibold ${state === "todo" ? "text-muted" : "text-fg"}`}>
                        {s.title}
                        <span className="sr-only"> ({state === "done" ? "completed" : state === "current" ? "in progress" : "not started"})</span>
                      </p>
                      <p className="text-sm text-muted">{s.body}</p>
                      {result.dates[i] && <p className="mt-1 text-xs font-medium text-muted">{state === "current" ? "Since" : "Completed"} {result.dates[i]}</p>}
                    </div>
                  </m.li>
                );
              })}
            </ol>

            <div className="mt-8 flex flex-col gap-3 rounded-xl bg-surface-2/60 p-4 text-sm sm:flex-row sm:items-center sm:justify-between">
              <p className="text-muted">Questions about your status? Your advisor is one message away.</p>
              <a href={whatsappLink(site.phoneDigits, `Hello, I'd like an update on application ${result.ref}.`)} target="_blank" rel="noopener noreferrer" className={btn("outline", "shrink-0")}>
                <MessageCircle className="h-4 w-4" aria-hidden="true" /> Message advisor
              </a>
            </div>
          </m.div>
        ) : (
          <div className="grid h-full min-h-72 place-items-center rounded-2xl border border-dashed border-line bg-surface/50 p-10 text-center">
            <div>
              <ol className="mx-auto flex max-w-sm items-center justify-between gap-2" aria-hidden="true">
                {trackingSteps.map((s, i) => (
                  <li key={s.title} className="flex items-center gap-2">
                    <span className="grid h-8 w-8 place-items-center rounded-full border border-line bg-surface text-xs font-bold text-muted">{i + 1}</span>
                    {i < trackingSteps.length - 1 && <span className="hidden h-px w-6 bg-line sm:block" />}
                  </li>
                ))}
              </ol>
              <p className="mt-6 font-display text-lg font-semibold text-fg">Your status will appear here</p>
              <p className="mt-1 text-sm text-muted">Received → Under review → Matched → Visa processing → Ready to travel</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
