"use client";

import { useState, type FormEvent } from "react";
import { CheckCircle2, Send } from "lucide-react";
import { EMAIL_RE } from "@/lib/format";

export function Newsletter() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [done, setDone] = useState(false);

  const submit = (e: FormEvent) => {
    e.preventDefault();
    if (!EMAIL_RE.test(email.trim())) {
      setError("Please enter a valid email address.");
      return;
    }
    setError("");
    setDone(true);
  };

  return (
    <div>
      <h2 className="font-display text-sm font-semibold text-white">Job alerts</h2>
      <p className="mt-2 text-sm text-white/65">New vacancies and visa updates, twice a month. No spam.</p>
      {done ? (
        <p role="status" className="mt-4 flex items-center gap-2 rounded-xl bg-success/15 px-4 py-3 text-sm font-medium text-green-300">
          <CheckCircle2 className="h-4 w-4" aria-hidden="true" /> You&apos;re subscribed. Watch your inbox!
        </p>
      ) : (
        <form onSubmit={submit} noValidate className="mt-4">
          <div className="flex gap-2">
            <label htmlFor="newsletter-email" className="sr-only">
              Email address
            </label>
            <input
              id="newsletter-email"
              type="email"
              autoComplete="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              aria-invalid={error ? true : undefined}
              aria-describedby={error ? "newsletter-error" : undefined}
              className="min-w-0 flex-1 rounded-xl border border-white/15 bg-white/5 px-4 py-2.5 text-sm text-white placeholder:text-white/40 focus:border-gold focus:outline-none"
            />
            <button
              type="submit"
              className="inline-flex items-center gap-1.5 rounded-xl bg-gold px-4 text-sm font-semibold text-navy transition hover:bg-gold-300"
            >
              <Send className="h-4 w-4" aria-hidden="true" />
              <span className="hidden sm:inline">Subscribe</span>
              <span className="sr-only sm:hidden">Subscribe</span>
            </button>
          </div>
          {error && (
            <p id="newsletter-error" role="alert" className="mt-2 text-xs font-medium text-red-300">
              {error}
            </p>
          )}
        </form>
      )}
    </div>
  );
}
