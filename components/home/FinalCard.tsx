"use client";

import { ArrowUpRight, MessageCircle } from "lucide-react";
import { site } from "@/data/site";
import { whatsappLink } from "@/lib/format";
import { go } from "@/lib/scroll";

/** The closing card anchored to Nairobi while every route lights up. Decorative copy of the section's CTA. */
export function FinalCard({ compact = false, decorative = true }: { compact?: boolean; decorative?: boolean }) {
  const tab = decorative ? -1 : undefined;
  return (
    <div
      className={`glass glass-blur rounded-3xl p-6 text-ivory sm:p-8 ${compact ? "w-full" : "w-[min(460px,88vw)]"}`}
      aria-hidden={decorative || undefined}
    >
      <span data-s="0" className="pill">
        Final stop · Nairobi
      </span>
      <p data-s="1" className="mt-4 font-display text-3xl font-bold leading-[1.05] sm:text-4xl">
        Your journey <span className="text-coral">starts here.</span>
      </p>
      <p data-s="2" className="mt-3 text-sm leading-relaxed text-sand/85">
        One application, one licensed advisor and a documented route to any of eight countries. No hidden fees, ever.
      </p>
      <div data-s="4" className="mt-6 flex flex-col gap-3 sm:flex-row">
        <a
          href="/apply"
          tabIndex={tab}
          onClick={(e) => go("/apply", e)}
          className="inline-flex flex-1 items-center justify-center gap-2 rounded-full bg-coral px-7 py-4 text-base font-bold text-night-900 shadow-[0_18px_40px_-12px_rgba(255,107,74,0.9)] transition hover:-translate-y-0.5 hover:bg-coral-300"
        >
          Apply Now <ArrowUpRight className="h-5 w-5" aria-hidden="true" />
        </a>
        <a
          href={whatsappLink(site.phoneDigits, site.whatsappMessage)}
          tabIndex={tab}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center gap-2 rounded-full border border-jade/60 px-5 py-4 text-sm font-semibold text-ivory hover:bg-white/10"
        >
          <MessageCircle className="h-4 w-4" aria-hidden="true" /> WhatsApp
        </a>
      </div>
    </div>
  );
}
