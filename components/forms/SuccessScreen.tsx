"use client";

import Link from "next/link";
import { m } from "framer-motion";
import { Check, Copy, FileSearch, Mail, PhoneCall } from "lucide-react";
import { useState } from "react";
import { btn } from "../ui/primitives";

export function SuccessCheck() {
  return (
    <div className="relative mx-auto h-24 w-24">
      <m.span
        aria-hidden="true"
        className="absolute inset-0 rounded-full bg-success/30"
        initial={{ scale: 0.6, opacity: 0.8 }}
        animate={{ scale: 1.9, opacity: 0 }}
        transition={{ duration: 1.5, repeat: 2, ease: "easeOut" }}
      />
      <m.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 220, damping: 14 }}
        className="relative grid h-24 w-24 place-items-center rounded-full bg-success shadow-xl shadow-success/30"
      >
        <svg viewBox="0 0 24 24" className="h-12 w-12" fill="none" stroke="white" strokeWidth={2.8} aria-hidden="true">
          <m.path d="M5 12.5l4.5 4.5L19 7.5" strokeLinecap="round" strokeLinejoin="round" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.5, delay: 0.35 }} />
        </svg>
      </m.div>
    </div>
  );
}

export function SuccessScreen({ name, reference, phone, email }: { name: string; reference: string; phone: string; email: string }) {
  const [copied, setCopied] = useState(false);
  const steps = [
    { icon: Mail, title: "Confirmation on its way", body: `You'll receive an email at ${email} and an SMS on ${phone} with your reference.` },
    { icon: PhoneCall, title: "Advisor call within 2 working days", body: "A licensed advisor will call to discuss your goals and next steps." },
    { icon: FileSearch, title: "Document review", body: "We verify your documents and shortlist matching employers, typically in 3–5 days." },
  ];

  return (
    <m.div role="status" aria-live="polite" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="py-6 text-center">
      <SuccessCheck />
      <h2 className="mt-8 text-3xl font-bold text-fg">Asante, {name}! Application received.</h2>
      <p className="mx-auto mt-3 max-w-lg text-muted">Your journey has officially started. Keep your reference number safe. You&apos;ll need it to track your application.</p>

      <div className="mx-auto mt-8 inline-flex flex-col items-center rounded-2xl border border-dashed border-gold bg-gold-50 px-8 py-5 dark:bg-gold/10">
        <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#7a5200] dark:text-gold">Reference number</p>
        <div className="mt-1 flex items-center gap-2">
          <span className="font-mono text-3xl font-bold tracking-wider text-fg">{reference}</span>
          <button
            type="button"
            onClick={() => navigator.clipboard?.writeText(reference).then(() => setCopied(true), () => {})}
            className="grid h-9 w-9 place-items-center rounded-lg text-fg hover:bg-white/60 dark:hover:bg-white/10"
            aria-label={copied ? "Copied" : "Copy reference number"}
          >
            {copied ? <Check className="h-4 w-4 text-success" aria-hidden="true" /> : <Copy className="h-4 w-4" aria-hidden="true" />}
          </button>
        </div>
      </div>

      <ol className="mx-auto mt-10 grid max-w-3xl gap-4 text-left sm:grid-cols-3">
        {steps.map(({ icon: Icon, title, body }, i) => (
          <m.li
            key={title}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 + i * 0.12 }}
            className="rounded-2xl border border-line bg-surface p-5"
          >
            <span className="grid h-10 w-10 place-items-center rounded-xl bg-navy text-gold">
              <Icon className="h-5 w-5" aria-hidden="true" />
            </span>
            <p className="mt-3 text-xs font-bold uppercase tracking-wider text-muted">Next step {i + 1}</p>
            <h3 className="mt-1 font-semibold text-fg">{title}</h3>
            <p className="mt-1 text-sm leading-relaxed text-muted">{body}</p>
          </m.li>
        ))}
      </ol>

      <div className="mt-10 flex flex-col justify-center gap-3 sm:flex-row">
        <Link href={`/track?ref=${encodeURIComponent(reference)}`} className={btn("gold")}>
          Track my application
        </Link>
        <Link href="/jobs" className={btn("outline")}>
          Browse more jobs
        </Link>
      </div>
    </m.div>
  );
}
