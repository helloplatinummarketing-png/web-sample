"use client";

import { useState, type FormEvent } from "react";
import { Loader2, Send } from "lucide-react";
import { EMAIL_RE, normaliseKenyanPhone } from "@/lib/format";
import { btn } from "../ui/primitives";
import { Field, a11y, inputCls } from "./Field";
import { SuccessCheck } from "./SuccessScreen";

type V = { name: string; email: string; phone: string; topic: string; message: string };
type E = Partial<Record<keyof V, string>>;

const topics = ["General enquiry", "Job vacancies", "Visa & documents", "Fees & payments", "Employer partnership", "Report a concern"];

function validate(v: V): E {
  const e: E = {};
  if (v.name.trim().length < 2) e.name = "Please enter your name.";
  if (!EMAIL_RE.test(v.email.trim())) e.email = "Enter a valid email address.";
  if (v.phone.trim() && v.phone.trim() !== "+254" && !normaliseKenyanPhone(v.phone)) e.phone = "Use the format +254 7XX XXX XXX.";
  if (!v.topic) e.topic = "Choose a topic.";
  if (v.message.trim().length < 10) e.message = "Please write at least 10 characters.";
  return e;
}

export function ContactForm() {
  const [v, setV] = useState<V>({ name: "", email: "", phone: "+254 ", topic: "", message: "" });
  const [errors, setErrors] = useState<E>({});
  const [tried, setTried] = useState(false);
  const [state, setState] = useState<"idle" | "sending" | "done">("idle");

  const set = (k: keyof V, val: string) => {
    const next = { ...v, [k]: val };
    setV(next);
    if (tried) setErrors(validate(next));
  };

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    setTried(true);
    const errs = validate(v);
    setErrors(errs);
    const first = Object.keys(errs)[0];
    if (first) {
      document.getElementById(`c-${first}`)?.focus();
      return;
    }
    setState("sending");
    await new Promise((r) => setTimeout(r, 900));
    setState("done");
  };

  if (state === "done") {
    return (
      <div role="status" className="py-10 text-center">
        <SuccessCheck />
        <h3 className="mt-6 text-2xl font-bold text-fg">Message sent. Asante!</h3>
        <p className="mx-auto mt-2 max-w-sm text-muted">We usually reply within one working day. For anything urgent, WhatsApp us.</p>
      </div>
    );
  }

  return (
    <form onSubmit={submit} noValidate className="grid gap-5 sm:grid-cols-2">
      <Field id="c-name" label="Full name" required error={errors.name}>
        <input {...a11y("c-name", errors.name, undefined, true)} autoComplete="name" value={v.name} onChange={(e) => set("name", e.target.value)} className={inputCls(!!errors.name)} />
      </Field>
      <Field id="c-email" label="Email" required error={errors.email}>
        <input {...a11y("c-email", errors.email, undefined, true)} type="email" autoComplete="email" value={v.email} onChange={(e) => set("email", e.target.value)} className={inputCls(!!errors.email)} />
      </Field>
      <Field id="c-phone" label="Phone" error={errors.phone}>
        <input {...a11y("c-phone", errors.phone)} type="tel" inputMode="tel" autoComplete="tel" value={v.phone} onChange={(e) => set("phone", e.target.value)} className={inputCls(!!errors.phone)} />
      </Field>
      <Field id="c-topic" label="Topic" required error={errors.topic}>
        <select {...a11y("c-topic", errors.topic, undefined, true)} value={v.topic} onChange={(e) => set("topic", e.target.value)} className={inputCls(!!errors.topic)}>
          <option value="">Select a topic…</option>
          {topics.map((t) => (
            <option key={t}>{t}</option>
          ))}
        </select>
      </Field>
      <Field id="c-message" label="Message" required error={errors.message} className="sm:col-span-2">
        <textarea {...a11y("c-message", errors.message, undefined, true)} rows={5} value={v.message} onChange={(e) => set("message", e.target.value)} className={inputCls(!!errors.message)} />
      </Field>
      <div className="sm:col-span-2">
        <button type="submit" disabled={state === "sending"} className={btn("gold", "w-full px-8 sm:w-auto")}>
          {state === "sending" ? <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" /> : <Send className="h-4 w-4" aria-hidden="true" />}
          {state === "sending" ? "Sending…" : "Send message"}
        </button>
      </div>
    </form>
  );
}
