"use client";

import { ArrowLeft, ArrowRight, Check, Pencil } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { useEffect, useMemo, useRef, useState } from "react";
import { destinationBySlug, destinations, NAIROBI } from "@/data/destinations";
import { slerpLatLng } from "@/lib/geo";
import { destinationNodes, nairobiNode } from "@/data/journey";
import { jobBySlug } from "@/data/jobs";
import { availability, education, experience, fields, passportStatus, visaTypes } from "@/data/options";
import { site } from "@/data/site";
import { EMAIL_RE, makeReference, normaliseKenyanPhone } from "@/lib/format";
import { scrollToY } from "@/lib/scroll";
import { JourneyGlobe } from "../journey/JourneyGlobe";
import { btn, Flag } from "../ui/primitives";
import { a11y, Field, inputCls } from "./Field";
import { FileDrop } from "./FileDrop";
import { BoardingPass } from "./BoardingPass";

const STEPS = ["Personal", "Career", "Destination & visa", "Documents", "Review"] as const;
const quizToField: Record<string, string> = { health: "healthcare", trades: "trades", hospitality: "hospitality", logistics: "logistics", it: "it", general: "general" };

type Data = {
  name: string; phone: string; email: string; county: string;
  field: string; experience: string; education: string; jobTitle: string;
  country: string; visa: string; passport: string; availability: string; job: string;
  consent: boolean;
};
type Files = { cv: File[]; passport: File[]; certs: File[] };

const empty: Data = {
  name: "", phone: "", email: "", county: "", field: "", experience: "", education: "", jobTitle: "",
  country: "", visa: "", passport: "", availability: "", job: "", consent: false,
};

const sel = (invalid?: boolean) => `${inputCls(invalid)} appearance-none`;

export function ApplyWizard() {
  const params = useSearchParams();
  const [step, setStep] = useState(0);
  const [d, setD] = useState<Data>(empty);
  const [files, setFiles] = useState<Files>({ cv: [], passport: [], certs: [] });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [ref, setRef] = useState<string | null>(null);
  const top = useRef<HTMLDivElement>(null);

  // pre-fill from the eligibility quiz, a destination card or a job page
  useEffect(() => {
    const job = jobBySlug(params.get("job") ?? "");
    const f = params.get("field") ?? "";
    setD((p) => ({
      ...p,
      country: destinationBySlug(params.get("country") ?? "") ? params.get("country")! : p.country,
      field: fields.some((x) => x.value === f) ? f : quizToField[f] ?? p.field,
      job: job?.slug ?? "",
      visa: job?.visaType ?? p.visa,
      jobTitle: p.jobTitle,
    }));
  }, [params]);

  const set = <K extends keyof Data>(k: K, v: Data[K]) => {
    setD((p) => ({ ...p, [k]: v }));
    setErrors((e) => ({ ...e, [k]: "" }));
  };

  const validate = (s: number) => {
    const e: Record<string, string> = {};
    if (s === 0) {
      if (d.name.trim().split(/\s+/).length < 2) e.name = "Please enter your first and last name.";
      if (!normaliseKenyanPhone(d.phone)) e.phone = "Enter a Kenyan number, e.g. 0712 345 678.";
      if (!EMAIL_RE.test(d.email.trim())) e.email = "Enter a valid email address.";
    }
    if (s === 1) {
      if (!d.field) e.field = "Choose your field of work.";
      if (!d.experience) e.experience = "Choose your experience.";
      if (!d.education) e.education = "Choose your highest qualification.";
    }
    if (s === 2) {
      if (!d.country) e.country = "Choose a destination country.";
      if (!d.visa) e.visa = "Choose a visa type.";
      if (!d.passport) e.passport = "Tell us about your passport.";
      if (!d.availability) e.availability = "When can you travel?";
    }
    if (s === 3) {
      if (!files.cv.length) e.cv = "Please upload your CV.";
      if (!files.passport.length) e.passportFile = "Please upload your passport bio page.";
    }
    if (s === 4 && !d.consent) e.consent = "Please confirm so we can process your application.";
    setErrors(e);
    const first = Object.keys(e)[0];
    if (first) {
      const id = first === "passportFile" ? "passport-file" : first;
      requestAnimationFrame(() => document.getElementById(id)?.focus());
    }
    return !first;
  };

  const goTo = (s: number) => {
    setStep(s);
    const y = (top.current?.getBoundingClientRect().top ?? 0) + window.scrollY - 90;
    scrollToY(y);
  };
  const next = () => validate(step) && goTo(step + 1);
  const submit = () => {
    if (!validate(4)) return;
    const r = makeReference(site.refPrefix);
    try {
      localStorage.setItem("last-application", JSON.stringify({ ref: r, phone: normaliseKenyanPhone(d.phone), country: d.country }));
    } catch {}
    setRef(r);
    goTo(5);
  };

  const dest = destinationBySlug(d.country);
  const job = jobBySlug(d.job);
  // mini globe: the line from Nairobi to the chosen country grows as the form progresses
  const globe = useMemo(
    () => ({
      nodes: [nairobiNode, ...destinationNodes],
      path: dest ? ["nairobi", dest.slug] : [],
      line: dest ? Math.min(1, (ref ? 5 : step) / 4) : 0,
      focus: dest ? slerpLatLng(NAIROBI, dest, 0.5) : NAIROBI,
      active: ref && dest ? dest.slug : "nairobi",
    }),
    [dest, step, ref]
  );

  return (
    <div ref={top} className="grid gap-8 lg:grid-cols-[1fr_340px]">
      <div className="min-w-0">
        {ref && dest ? (
          <BoardingPass reference={ref} name={d.name} destination={dest} phone={normaliseKenyanPhone(d.phone) ?? d.phone} />
        ) : (
          <div className="glass rounded-3xl p-5 sm:p-8">
            <ol className="flex gap-1.5" aria-label="Application progress">
              {STEPS.map((s, i) => (
                <li key={s} className="flex-1" aria-current={i === step ? "step" : undefined}>
                  <span className={`block h-1 rounded-full transition-colors ${i < step ? "bg-coral" : i === step ? "bg-coral/60" : "bg-white/15"}`} />
                  <span className={`mt-2 hidden font-mono text-[10px] uppercase tracking-wider sm:block ${i === step ? "text-coral-300" : "text-sand/50"}`}>
                    0{i + 1} {s}
                  </span>
                </li>
              ))}
            </ol>
            <h2 className="mt-6 font-display text-2xl font-bold text-ivory" tabIndex={-1}>
              <span className="font-mono text-sm text-coral-300">Step 0{step + 1} / 05 · </span>
              {STEPS[step]}
            </h2>

            <form
              className="mt-6"
              noValidate
              onSubmit={(e) => {
                e.preventDefault();
                if (step < 4) next();
                else submit();
              }}
            >
              {step === 0 && (
                <div className="grid gap-5 sm:grid-cols-2">
                  <Field id="name" label="Full name" required error={errors.name} className="sm:col-span-2">
                    <input {...a11y("name", errors.name, undefined, true)} autoComplete="name" value={d.name} onChange={(e) => set("name", e.target.value)} className={inputCls(!!errors.name)} />
                  </Field>
                  <Field id="phone" label="Phone (WhatsApp)" required hint="We'll contact you on this number." error={errors.phone}>
                    <input {...a11y("phone", errors.phone, "hint", true)} type="tel" inputMode="tel" autoComplete="tel" placeholder="07XX XXX XXX" value={d.phone} onChange={(e) => set("phone", e.target.value)} className={inputCls(!!errors.phone)} />
                  </Field>
                  <Field id="email" label="Email" required error={errors.email}>
                    <input {...a11y("email", errors.email, undefined, true)} type="email" autoComplete="email" value={d.email} onChange={(e) => set("email", e.target.value)} className={inputCls(!!errors.email)} />
                  </Field>
                  <Field id="county" label="County of residence">
                    <input {...a11y("county")} value={d.county} onChange={(e) => set("county", e.target.value)} className={inputCls()} placeholder="e.g. Nakuru" />
                  </Field>
                </div>
              )}

              {step === 1 && (
                <div className="grid gap-5 sm:grid-cols-2">
                  <Field id="field" label="Field of work" required error={errors.field} className="sm:col-span-2">
                    <select {...a11y("field", errors.field, undefined, true)} value={d.field} onChange={(e) => set("field", e.target.value)} className={sel(!!errors.field)}>
                      <option value="">Choose…</option>
                      {fields.map((f) => (
                        <option key={f.value} value={f.value}>{f.label}</option>
                      ))}
                    </select>
                  </Field>
                  <Field id="experience" label="Experience" required error={errors.experience}>
                    <select {...a11y("experience", errors.experience, undefined, true)} value={d.experience} onChange={(e) => set("experience", e.target.value)} className={sel(!!errors.experience)}>
                      <option value="">Choose…</option>
                      {experience.map((x) => (
                        <option key={x.value} value={x.value}>{x.label}</option>
                      ))}
                    </select>
                  </Field>
                  <Field id="education" label="Highest qualification" required error={errors.education}>
                    <select {...a11y("education", errors.education, undefined, true)} value={d.education} onChange={(e) => set("education", e.target.value)} className={sel(!!errors.education)}>
                      <option value="">Choose…</option>
                      {education.map((x) => (
                        <option key={x.value} value={x.value}>{x.label}</option>
                      ))}
                    </select>
                  </Field>
                  <Field id="jobTitle" label="Current or last job title" className="sm:col-span-2">
                    <input {...a11y("jobTitle")} value={d.jobTitle} onChange={(e) => set("jobTitle", e.target.value)} className={inputCls()} placeholder="e.g. Caregiver" />
                  </Field>
                </div>
              )}

              {step === 2 && (
                <div className="grid gap-5 sm:grid-cols-2">
                  <fieldset className="sm:col-span-2" aria-describedby={errors.country ? "country-error" : undefined}>
                    <legend className="mb-2 text-sm font-semibold text-fg">
                      Destination country <span className="text-red-400" aria-hidden="true">*</span>
                    </legend>
                    <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
                      {destinations.map((x, i) => (
                        <label
                          key={x.slug}
                          className={`flex cursor-pointer items-center gap-2 rounded-xl border px-3 py-2.5 text-sm font-semibold transition has-[:focus-visible]:ring-4 has-[:focus-visible]:ring-coral/30 ${
                            d.country === x.slug ? "border-coral bg-coral/15 text-ivory" : "border-jade/40 bg-white/[0.04] text-sand hover:border-jade-300"
                          }`}
                        >
                          <input type="radio" name="country" id={i === 0 ? "country" : undefined} value={x.slug} checked={d.country === x.slug} onChange={() => set("country", x.slug)} className="sr-only" />
                          <Flag code={x.flag} name={x.country} size={20} />
                          {x.slug === "uk" ? "UK" : x.slug === "uae" ? "UAE" : x.country}
                        </label>
                      ))}
                    </div>
                    {errors.country && <p id="country-error" className="mt-1.5 text-sm font-medium text-red-400">{errors.country}</p>}
                  </fieldset>
                  {job && (
                    <p className="rounded-xl border border-jade/40 bg-jade/10 px-4 py-3 text-sm text-sand sm:col-span-2">
                      Applying for <strong className="text-ivory">{job.title}</strong>, {job.city}
                    </p>
                  )}
                  <Field id="visa" label="Visa type" required error={errors.visa}>
                    <select {...a11y("visa", errors.visa, undefined, true)} value={d.visa} onChange={(e) => set("visa", e.target.value)} className={sel(!!errors.visa)}>
                      <option value="">Choose…</option>
                      {visaTypes.map((v) => (
                        <option key={v}>{v}</option>
                      ))}
                    </select>
                  </Field>
                  <Field id="passport" label="Passport" required error={errors.passport}>
                    <select {...a11y("passport", errors.passport, undefined, true)} value={d.passport} onChange={(e) => set("passport", e.target.value)} className={sel(!!errors.passport)}>
                      <option value="">Choose…</option>
                      {passportStatus.map((v) => (
                        <option key={v}>{v}</option>
                      ))}
                    </select>
                  </Field>
                  <Field id="availability" label="Available to travel" required error={errors.availability} className="sm:col-span-2">
                    <select {...a11y("availability", errors.availability, undefined, true)} value={d.availability} onChange={(e) => set("availability", e.target.value)} className={sel(!!errors.availability)}>
                      <option value="">Choose…</option>
                      {availability.map((v) => (
                        <option key={v}>{v}</option>
                      ))}
                    </select>
                  </Field>
                </div>
              )}

              {step === 3 && (
                <div className="space-y-6">
                  <FileDrop id="cv" label="CV" required hint="PDF, DOCX or JPG · max 5MB" files={files.cv} error={errors.cv} onChange={(f, err) => { setFiles((p) => ({ ...p, cv: f })); setErrors((e) => ({ ...e, cv: err ?? "" })); }} />
                  <FileDrop id="passport-file" label="Passport bio page" required hint="Clear photo or scan · max 5MB" files={files.passport} error={errors.passportFile} onChange={(f, err) => { setFiles((p) => ({ ...p, passport: f })); setErrors((e) => ({ ...e, passportFile: err ?? "" })); }} />
                  <FileDrop id="certs" label="Certificates" multiple hint="Up to 6 files · max 5MB each" files={files.certs} error={errors.certs} onChange={(f, err) => { setFiles((p) => ({ ...p, certs: f })); setErrors((e) => ({ ...e, certs: err ?? "" })); }} />
                  <p className="text-xs text-sand/60">Demo: files stay in your browser and are never uploaded.</p>
                </div>
              )}

              {step === 4 && (
                <div className="space-y-4">
                  {[
                    { s: 0, title: "Personal", rows: [["Name", d.name], ["Phone", normaliseKenyanPhone(d.phone) ?? d.phone], ["Email", d.email], ["County", d.county || "—"]] },
                    { s: 1, title: "Career", rows: [["Field", fields.find((f) => f.value === d.field)?.label ?? ""], ["Experience", experience.find((x) => x.value === d.experience)?.label ?? ""], ["Qualification", education.find((x) => x.value === d.education)?.label ?? ""]] },
                    { s: 2, title: "Destination & visa", rows: [["Country", dest?.country ?? ""], ["Visa", d.visa], ["Passport", d.passport], ["Travel", d.availability]] },
                    { s: 3, title: "Documents", rows: [["CV", files.cv[0]?.name ?? ""], ["Passport", files.passport[0]?.name ?? ""], ["Certificates", files.certs.length ? `${files.certs.length} file(s)` : "—"]] },
                  ].map((g) => (
                    <section key={g.title} className="rounded-2xl border border-jade/30 bg-white/[0.03] p-4">
                      <div className="flex items-center justify-between">
                        <h3 className="font-mono text-xs uppercase tracking-wider text-jade-300">{g.title}</h3>
                        <button type="button" onClick={() => goTo(g.s)} className="inline-flex items-center gap-1 text-xs font-semibold text-coral-300 hover:text-coral">
                          <Pencil className="h-3.5 w-3.5" aria-hidden="true" /> Edit<span className="sr-only"> {g.title}</span>
                        </button>
                      </div>
                      <dl className="mt-3 grid gap-x-6 gap-y-2 text-sm sm:grid-cols-2">
                        {g.rows.map(([k, v]) => (
                          <div key={k} className="flex justify-between gap-3 sm:block">
                            <dt className="text-sand/60">{k}</dt>
                            <dd className="truncate font-semibold text-ivory">{v}</dd>
                          </div>
                        ))}
                      </dl>
                    </section>
                  ))}
                  <div>
                    <label className="flex cursor-pointer gap-3 text-sm leading-relaxed text-sand/85">
                      <input
                        id="consent"
                        type="checkbox"
                        checked={d.consent}
                        onChange={(e) => set("consent", e.target.checked)}
                        aria-invalid={errors.consent ? true : undefined}
                        aria-describedby={errors.consent ? "consent-error" : undefined}
                        className="mt-1 h-4 w-4 shrink-0 accent-coral"
                      />
                      I confirm these details are true and agree that {site.name} may process my data under the Kenya Data Protection Act, 2019 to find me a job.
                    </label>
                    {errors.consent && <p id="consent-error" className="mt-1.5 text-sm font-medium text-red-400">{errors.consent}</p>}
                  </div>
                </div>
              )}

              <div className="mt-8 flex items-center justify-between gap-3 border-t border-jade/20 pt-6">
                {step > 0 ? (
                  <button type="button" onClick={() => goTo(step - 1)} className={btn("ghost")}>
                    <ArrowLeft className="h-4 w-4" aria-hidden="true" /> Back
                  </button>
                ) : (
                  <span className="text-xs text-sand/60">About 10 minutes · saved in this tab only</span>
                )}
                <button type="submit" className={btn("primary")}>
                  {step < 4 ? (
                    <>Continue <ArrowRight className="h-4 w-4" aria-hidden="true" /></>
                  ) : (
                    <>Submit application <Check className="h-4 w-4" aria-hidden="true" /></>
                  )}
                </button>
              </div>
            </form>
          </div>
        )}
      </div>

      <aside className="order-first lg:order-none" aria-label="Your route">
        <div className="glass rounded-3xl p-4 lg:sticky lg:top-24">
          <div className="relative mx-auto aspect-square w-40 sm:w-52 lg:w-full">
            <JourneyGlobe
              variant="mini"
              nodes={globe.nodes}
              path={globe.path}
              line={globe.line}
              activeId={globe.active}
              visitedIds={["nairobi"]}
              focus={globe.focus}
              view={{ x: 0, y: 0, zoom: 0.92 }}
              className="absolute inset-0"
              posterClassName="inset-[10%]"
            />
          </div>
          <p className="mt-3 text-center font-mono text-[11px] uppercase tracking-[0.18em] text-jade-300">
            Nairobi → {dest ? dest.city : "choose a destination"}
          </p>
          <p className="mt-1 text-center text-xs text-sand/60">{ref ? "Route complete" : `${Math.round((dest ? Math.min(1, step / 4) : 0) * 100)}% of the route plotted`}</p>
        </div>
      </aside>
    </div>
  );
}
