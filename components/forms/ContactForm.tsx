"use client";

import { CheckCircle2, Send } from "lucide-react";
import { useState } from "react";
import { EMAIL_RE, normaliseKenyanPhone } from "@/lib/format";
import { btn } from "../ui/primitives";
import { a11y, Field, inputCls } from "./Field";

export function ContactForm() {
  const [v, setV] = useState({ name: "", phone: "", email: "", message: "" });
  const [e, setE] = useState<Record<string, string>>({});
  const [sent, setSent] = useState(false);
  const set = (k: keyof typeof v, val: string) => {
    setV((p) => ({ ...p, [k]: val }));
    setE((p) => ({ ...p, [k]: "" }));
  };

  if (sent)
    return (
      <div className="glass grid place-items-center rounded-3xl p-10 text-center" role="status">
        <CheckCircle2 className="h-12 w-12 text-jade-300" aria-hidden="true" />
        <p className="mt-4 font-display text-2xl font-bold text-ivory">Message sent</p>
        <p className="mt-2 text-sand/80">Thanks, {v.name.split(" ")[0]}. An advisor will reply within one working day. (Demo: nothing was sent.)</p>
      </div>
    );

  return (
    <form
      noValidate
      className="glass grid gap-5 rounded-3xl p-5 sm:grid-cols-2 sm:p-8"
      onSubmit={(ev) => {
        ev.preventDefault();
        const err: Record<string, string> = {};
        if (!v.name.trim()) err.name = "Please enter your name.";
        if (!normaliseKenyanPhone(v.phone)) err.phone = "Enter a Kenyan number, e.g. 0712 345 678.";
        if (v.email && !EMAIL_RE.test(v.email)) err.email = "Enter a valid email address.";
        if (v.message.trim().length < 10) err.message = "Tell us a little more (10+ characters).";
        setE(err);
        const first = Object.keys(err)[0];
        if (first) document.getElementById(first)?.focus();
        else setSent(true);
      }}
    >
      <Field id="name" label="Name" required error={e.name}>
        <input {...a11y("name", e.name, undefined, true)} autoComplete="name" value={v.name} onChange={(x) => set("name", x.target.value)} className={inputCls(!!e.name)} />
      </Field>
      <Field id="phone" label="Phone" required error={e.phone}>
        <input {...a11y("phone", e.phone, undefined, true)} type="tel" autoComplete="tel" value={v.phone} onChange={(x) => set("phone", x.target.value)} className={inputCls(!!e.phone)} />
      </Field>
      <Field id="email" label="Email" error={e.email} className="sm:col-span-2">
        <input {...a11y("email", e.email)} type="email" autoComplete="email" value={v.email} onChange={(x) => set("email", x.target.value)} className={inputCls(!!e.email)} />
      </Field>
      <Field id="message" label="Message" required error={e.message} className="sm:col-span-2">
        <textarea {...a11y("message", e.message, undefined, true)} rows={5} value={v.message} onChange={(x) => set("message", x.target.value)} className={inputCls(!!e.message)} />
      </Field>
      <button type="submit" className={btn("primary", "sm:col-span-2 sm:justify-self-start")}>
        Send message <Send className="h-4 w-4" aria-hidden="true" />
      </button>
    </form>
  );
}
