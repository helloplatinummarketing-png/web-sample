"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { AnimatePresence, m } from "framer-motion";
import { ArrowLeft, ArrowRight, Check, Loader2, Pencil, Sparkles } from "lucide-react";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { destinations, destinationBySlug } from "@/data/destinations";
import { jobBySlug } from "@/data/jobs";
import { availability, education, educationLabel, experience, experienceLabel, fieldLabel, fields, passportStatus, visaTypes } from "@/data/options";
import { site } from "@/data/site";
import { EMAIL_RE, makeReference, normaliseKenyanPhone } from "@/lib/format";
import { btn, card } from "../ui/primitives";
import { ErrorText, Field, a11y, inputCls } from "./Field";
import { FileDrop } from "./FileDrop";
import { SuccessScreen } from "./SuccessScreen";

type Values = {
  fullName: string;
  email: string;
  phone: string;
  county: string;
  passport: string;
  field: string;
  experience: string;
  education: string;
  jobTitle: string;
  languages: string;
  country: string;
  visaType: string;
  preferredJob: string;
  availability: string;
  consent: boolean;
};
type FileKey = "cv" | "passportCopy" | "certificates";
type Files = Record<FileKey, File[]>;
type ErrKey = keyof Values | FileKey;
type Errors = Partial<Record<ErrKey, string>>;

const STEPS = [
  { title: "Personal details", short: "Personal" },
  { title: "Career details", short: "Career" },
  { title: "Destination & visa", short: "Destination" },
  { title: "Upload documents", short: "Documents" },
  { title: "Review & submit", short: "Review" },
] as const;

function validateStep(step: number, v: Values, f: Files): Errors {
  const e: Errors = {};
  if (step === 0) {
    const name = v.fullName.trim();
    if (name.length < 3) e.fullName = "Please enter your full name.";
    else if (!name.includes(" ")) e.fullName = "Please include both your first and last name.";
    if (!EMAIL_RE.test(v.email.trim())) e.email = "Enter a valid email address, e.g. jane@example.com.";
    if (!normaliseKenyanPhone(v.phone)) e.phone = "Enter a Kenyan mobile number, e.g. +254 712 345 678.";
    if (!v.county.trim()) e.county = "Tell us which county you live in.";
    if (!v.passport) e.passport = "Select your passport status.";
  }
  if (step === 1) {
    if (!v.field) e.field = "Select your professional field.";
    if (!v.experience) e.experience = "Select your years of experience.";
    if (!v.education) e.education = "Select your highest education level.";
    if (!v.jobTitle.trim()) e.jobTitle = "Enter your current or most recent job title.";
  }
  if (step === 2) {
    if (!v.country) e.country = "Select a destination country.";
    if (!v.visaType) e.visaType = "Select a visa or programme type.";
    if (!v.availability) e.availability = "Let us know when you could start.";
  }
  if (step === 3) {
    if (f.cv.length === 0) e.cv = "Please upload your CV.";
    if (f.passportCopy.length === 0 && v.passport === passportStatus[0]) e.passportCopy = "Please upload a copy of your passport bio page.";
  }
  if (step === 4) {
    if (!v.consent) e.consent = "Please give consent so we can process your application.";
  }
  return e;
}

export function ApplyWizard() {
  const params = useSearchParams();
  const job = jobBySlug(params.get("job") ?? "");
  const fromEligibility = params.get("from") === "eligibility";
  const suggested = (params.get("programmes") ?? "").split("|").filter(Boolean);
  const pick = <T extends string>(val: string | null, allowed: readonly T[]) => (val && (allowed as readonly string[]).includes(val) ? val : "");

  const [values, setValues] = useState<Values>(() => ({
    fullName: "",
    email: "",
    phone: "+254 ",
    county: "",
    passport: "",
    field: pick(params.get("field"), fields.map((x) => x.value)),
    experience: pick(params.get("experience"), experience.map((x) => x.value)),
    education: pick(params.get("education"), education.map((x) => x.value)),
    jobTitle: "",
    languages: "English, Kiswahili",
    country: pick(params.get("country"), destinations.map((d) => d.slug)),
    visaType: pick(params.get("visa"), visaTypes),
    preferredJob: job ? `${job.title} (${job.city})` : "",
    availability: "",
    consent: false,
  }));
  const [files, setFiles] = useState<Files>({ cv: [], passportCopy: [], certificates: [] });
  const [errors, setErrors] = useState<Errors>({});
  const [step, setStep] = useState(0);
  const [dir, setDir] = useState(1);
  const [status, setStatus] = useState<"idle" | "submitting" | "done">("idle");
  const [reference, setReference] = useState("");
  const headingRef = useRef<HTMLHeadingElement>(null);
  const topRef = useRef<HTMLDivElement>(null);
  const firstRender = useRef(true);

  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }
    headingRef.current?.focus({ preventScroll: true });
    topRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, [step]);

  const set = <K extends keyof Values>(k: K, val: Values[K]) => {
    setValues((v) => ({ ...v, [k]: val }));
    if (errors[k]) setErrors((e) => ({ ...e, [k]: undefined }));
  };

  const blur = (k: keyof Values) => {
    const err = validateStep(step, values, files)[k];
    setErrors((e) => ({ ...e, [k]: err }));
  };

  const goto = (n: number) => {
    setDir(n > step ? 1 : -1);
    setStep(n);
  };

  const next = () => {
    const errs = validateStep(step, values, files);
    setErrors(errs);
    const first = Object.keys(errs)[0];
    if (first) {
      document.getElementById(first)?.focus();
      return;
    }
    goto(step + 1);
  };

  const submit = async () => {
    const errs = validateStep(4, values, files);
    setErrors(errs);
    if (Object.keys(errs).length) {
      document.getElementById("consent")?.focus();
      return;
    }
    setStatus("submitting");
    await new Promise((r) => setTimeout(r, 1500)); // demo only: no backend
    setReference(makeReference(site.refPrefix));
    setStatus("done");
    topRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  if (status === "done") {
    return (
      <div ref={topRef} className="scroll-mt-24">
        <SuccessScreen name={values.fullName.trim().split(" ")[0]} reference={reference} phone={normaliseKenyanPhone(values.phone) ?? ""} email={values.email} />
      </div>
    );
  }

  const textInput = (k: keyof Values, label: string, opts: { type?: string; placeholder?: string; hint?: string; required?: boolean; auto?: string; inputMode?: "email" | "tel" | "text" } = {}) => {
    const required = opts.required ?? true;
    return (
      <Field id={k} label={label} required={required} hint={opts.hint} error={errors[k]}>
        <input
          {...a11y(k, errors[k], opts.hint, required)}
          type={opts.type ?? "text"}
          inputMode={opts.inputMode}
          autoComplete={opts.auto}
          placeholder={opts.placeholder}
          value={values[k] as string}
          onChange={(e) => set(k, e.target.value as never)}
          onBlur={() => blur(k)}
          className={inputCls(!!errors[k])}
        />
      </Field>
    );
  };

  const select = (k: keyof Values, label: string, options: readonly (string | { value: string; label: string })[], placeholder: string, required = true) => (
    <Field id={k} label={label} required={required} error={errors[k]}>
      <select
        {...a11y(k, errors[k], undefined, required)}
        value={values[k] as string}
        onChange={(e) => set(k, e.target.value as never)}
        onBlur={() => blur(k)}
        className={inputCls(!!errors[k])}
      >
        <option value="">{placeholder}</option>
        {options.map((o) => {
          const v = typeof o === "string" ? o : o.value;
          const l = typeof o === "string" ? o : o.label;
          return (
            <option key={v} value={v}>
              {l}
            </option>
          );
        })}
      </select>
    </Field>
  );

  const setFileKey = (k: FileKey) => (list: File[], err?: string) => {
    setFiles((f) => ({ ...f, [k]: list }));
    setErrors((e) => ({ ...e, [k]: err }));
  };

  const progress = (step + 1) / STEPS.length;
  const dest = destinationBySlug(values.country);

  return (
    <div ref={topRef} className="scroll-mt-24">
      {/* Progress */}
      <div className="mb-8">
        <div className="flex items-center justify-between text-sm">
          <p className="font-semibold text-fg">
            Step {step + 1} of {STEPS.length}
          </p>
          <p className="text-muted">{Math.round(progress * 100)}% complete</p>
        </div>
        <div
          className="mt-3 h-2 overflow-hidden rounded-full bg-surface-2"
          role="progressbar"
          aria-label="Application progress"
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={Math.round(progress * 100)}
        >
          <m.div className="h-full rounded-full bg-gradient-to-r from-royal via-royal to-gold" animate={{ width: `${progress * 100}%` }} transition={{ duration: 0.45 }} />
        </div>
        <ol className="mt-4 hidden grid-cols-5 gap-2 sm:grid">
          {STEPS.map((s, i) => {
            const state = i < step ? "done" : i === step ? "current" : "todo";
            return (
              <li key={s.title} aria-current={state === "current" ? "step" : undefined}>
                <button
                  type="button"
                  disabled={i > step}
                  onClick={() => i < step && goto(i)}
                  className="flex w-full items-center gap-2 text-left text-xs font-semibold disabled:cursor-default"
                >
                  <span
                    className={`grid h-6 w-6 shrink-0 place-items-center rounded-full text-[11px] ${
                      state === "done"
                        ? "bg-success text-white"
                        : state === "current"
                          ? "bg-navy text-gold ring-2 ring-gold dark:bg-gold dark:text-navy"
                          : "bg-surface-2 text-muted"
                    }`}
                  >
                    {state === "done" ? <Check className="h-3.5 w-3.5" aria-hidden="true" /> : i + 1}
                  </span>
                  <span className={state === "todo" ? "text-muted" : "text-fg"}>{s.short}</span>
                </button>
              </li>
            );
          })}
        </ol>
      </div>

      {fromEligibility && step === 0 && (
        <div className="mb-6 flex gap-3 rounded-xl border border-gold/40 bg-gold-50 p-4 text-sm text-fg dark:bg-gold/10">
          <Sparkles className="mt-0.5 h-5 w-5 shrink-0 text-[#8a5d00] dark:text-gold" aria-hidden="true" />
          <div>
            <p className="font-semibold">We&apos;ve pre-filled your answers from the eligibility checker.</p>
            {suggested.length > 0 && <p className="mt-1 text-muted">Suggested routes: {suggested.join(" · ")}</p>}
          </div>
        </div>
      )}
      {job && step === 0 && (
        <div className="mb-6 rounded-xl border border-royal/30 bg-royal-50 p-4 text-sm text-fg dark:bg-royal/15">
          Applying for <strong>{job.title}</strong> in {job.city}. We&apos;ve pre-filled the destination for you.
        </div>
      )}

      <div className="relative overflow-hidden">
        <AnimatePresence mode="wait" custom={dir} initial={false}>
          <m.section
            key={step}
            initial={{ opacity: 0, x: dir * 40 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: dir * -40 }}
            transition={{ duration: 0.28 }}
            aria-labelledby="step-title"
          >
            <h2 id="step-title" ref={headingRef} tabIndex={-1} className="text-2xl font-bold text-fg focus:outline-none">
              {STEPS[step].title}
            </h2>

            <div className="mt-6 grid gap-5 sm:grid-cols-2">
              {step === 0 && (
                <>
                  <div className="sm:col-span-2">{textInput("fullName", "Full name (as on passport)", { placeholder: "e.g. Jane Wanjiku Mwangi", auto: "name" })}</div>
                  {textInput("email", "Email address", { type: "email", inputMode: "email", placeholder: "you@example.com", auto: "email" })}
                  {textInput("phone", "Phone / WhatsApp", { type: "tel", inputMode: "tel", placeholder: "+254 712 345 678", hint: "Kenyan mobile, format +254 7XX XXX XXX", auto: "tel" })}
                  {textInput("county", "County of residence", { placeholder: "e.g. Nairobi, Kiambu, Mombasa", auto: "address-level1" })}
                  {select("passport", "Passport status", passportStatus, "Select status…")}
                </>
              )}

              {step === 1 && (
                <>
                  <div className="sm:col-span-2">{select("field", "Professional field", fields, "Select your field…")}</div>
                  {select("experience", "Years of experience", experience, "Select…")}
                  {select("education", "Highest education level", education, "Select…")}
                  {textInput("jobTitle", "Current or most recent job title", { placeholder: "e.g. Caregiver, Electrician, Chef", auto: "organization-title" })}
                  {textInput("languages", "Languages spoken", { placeholder: "e.g. English, Kiswahili, German (A2)", required: false })}
                </>
              )}

              {step === 2 && (
                <>
                  {select("country", "Preferred destination", destinations.map((d) => ({ value: d.slug, label: d.name })), "Select a country…")}
                  {select("visaType", "Visa / programme type", visaTypes, "Select a programme…")}
                  <div className="sm:col-span-2">
                    {textInput("preferredJob", "Specific job you're interested in", { placeholder: "e.g. Senior Care Worker", required: false })}
                  </div>
                  {select("availability", "When could you start?", availability, "Select…")}
                  {dest && (
                    <div className="flex items-center rounded-xl bg-surface-2/60 p-4 text-sm text-muted">
                      Typical processing for {dest.name}: <strong className="ml-1 text-fg">{dest.processing}</strong>
                    </div>
                  )}
                </>
              )}

              {step === 3 && (
                <div className="space-y-6 sm:col-span-2">
                  <FileDrop id="cv" label="CV / résumé" hint="PDF or DOCX, max 5MB" required files={files.cv} onChange={setFileKey("cv")} error={errors.cv} />
                  <FileDrop
                    id="passportCopy"
                    label="Passport bio page"
                    hint="PDF or JPG, max 5MB"
                    required={values.passport === passportStatus[0]}
                    files={files.passportCopy}
                    onChange={setFileKey("passportCopy")}
                    error={errors.passportCopy}
                  />
                  <FileDrop
                    id="certificates"
                    label="Certificates (academic / professional)"
                    hint="Up to 6 files · PDF, DOCX or JPG · max 5MB each"
                    multiple
                    files={files.certificates}
                    onChange={setFileKey("certificates")}
                    error={errors.certificates}
                  />
                  <p className="text-xs text-muted">Files stay on your device in this demo. Nothing is uploaded.</p>
                </div>
              )}

              {step === 4 && (
                <div className="space-y-4 sm:col-span-2">
                  <Review title="Personal details" onEdit={() => goto(0)}>
                    <Row k="Name" v={values.fullName} />
                    <Row k="Email" v={values.email} />
                    <Row k="Phone" v={normaliseKenyanPhone(values.phone) ?? values.phone} />
                    <Row k="County" v={values.county} />
                    <Row k="Passport" v={values.passport} />
                  </Review>
                  <Review title="Career details" onEdit={() => goto(1)}>
                    <Row k="Field" v={fieldLabel(values.field)} />
                    <Row k="Experience" v={experienceLabel(values.experience)} />
                    <Row k="Education" v={educationLabel(values.education)} />
                    <Row k="Job title" v={values.jobTitle} />
                    <Row k="Languages" v={values.languages || "-"} />
                  </Review>
                  <Review title="Destination & visa" onEdit={() => goto(2)}>
                    <Row k="Country" v={dest?.name ?? "-"} />
                    <Row k="Visa type" v={values.visaType} />
                    <Row k="Job interest" v={values.preferredJob || "-"} />
                    <Row k="Availability" v={values.availability} />
                  </Review>
                  <Review title="Documents" onEdit={() => goto(3)}>
                    <Row k="CV" v={files.cv.map((f) => f.name).join(", ") || "-"} />
                    <Row k="Passport" v={files.passportCopy.map((f) => f.name).join(", ") || "Not provided"} />
                    <Row k="Certificates" v={files.certificates.length ? `${files.certificates.length} file(s)` : "None"} />
                  </Review>

                  <div>
                    <label
                      htmlFor="consent"
                      className={`flex cursor-pointer gap-3 rounded-xl border p-4 transition ${errors.consent ? "border-red-500 bg-red-50/40 dark:bg-red-500/5" : "border-line hover:border-royal/50"}`}
                    >
                      <input
                        id="consent"
                        type="checkbox"
                        checked={values.consent}
                        onChange={(e) => set("consent", e.target.checked)}
                        aria-invalid={errors.consent ? true : undefined}
                        aria-describedby={errors.consent ? "consent-error" : undefined}
                        className="mt-0.5 h-5 w-5 shrink-0 accent-[#2847D9]"
                      />
                      <span className="text-sm leading-relaxed text-fg">
                        I consent to {site.name} collecting and processing my personal data and documents for recruitment purposes, and sharing them with
                        prospective employers and immigration authorities, in accordance with the <strong>Kenya Data Protection Act, 2019</strong> and the{" "}
                        <Link href="/privacy" className="font-semibold text-link underline underline-offset-2">
                          Privacy Policy
                        </Link>
                        . I confirm the information provided is true.
                      </span>
                    </label>
                    <ErrorText id="consent-error">{errors.consent}</ErrorText>
                  </div>
                </div>
              )}
            </div>
          </m.section>
        </AnimatePresence>
      </div>

      {/* Navigation */}
      <div className="mt-8 flex flex-col-reverse gap-3 border-t border-line pt-6 sm:flex-row sm:items-center sm:justify-between">
        {step > 0 ? (
          <button type="button" onClick={() => goto(step - 1)} className={btn("ghost")}>
            <ArrowLeft className="h-4 w-4" aria-hidden="true" /> Back
          </button>
        ) : (
          <span className="hidden sm:block" />
        )}
        {step < STEPS.length - 1 ? (
          <button type="button" onClick={next} className={btn("primary", "px-7")}>
            Continue to {STEPS[step + 1].short.toLowerCase()} <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </button>
        ) : (
          <button type="button" onClick={submit} disabled={status === "submitting"} className={btn("gold", "px-8 py-3.5 text-base")}>
            {status === "submitting" ? (
              <>
                <Loader2 className="h-5 w-5 animate-spin" aria-hidden="true" /> Submitting…
              </>
            ) : (
              <>
                Submit application <Check className="h-5 w-5" aria-hidden="true" />
              </>
            )}
          </button>
        )}
      </div>
    </div>
  );
}

function Review({ title, onEdit, children }: { title: string; onEdit: () => void; children: ReactNode }) {
  return (
    <div className={`${card} p-5`}>
      <div className="flex items-center justify-between">
        <h3 className="font-display font-semibold text-fg">{title}</h3>
        <button type="button" onClick={onEdit} className="inline-flex items-center gap-1.5 rounded-lg px-2 py-1 text-sm font-semibold text-link hover:bg-surface-2">
          <Pencil className="h-3.5 w-3.5" aria-hidden="true" /> Edit <span className="sr-only">{title}</span>
        </button>
      </div>
      <dl className="mt-3 grid gap-x-6 gap-y-2 text-sm sm:grid-cols-2">{children}</dl>
    </div>
  );
}

function Row({ k, v }: { k: string; v: string }) {
  return (
    <div className="flex gap-2">
      <dt className="w-24 shrink-0 text-muted">{k}</dt>
      <dd className="min-w-0 break-words font-medium text-fg">{v}</dd>
    </div>
  );
}
