"use client";

import { MessageCircle, Plane, Search } from "lucide-react";
import Link from "next/link";
import type { Destination } from "@/data/destinations";
import { site } from "@/data/site";
import { whatsappLink } from "@/lib/format";
import { btn, Flag } from "../ui/primitives";

/** Success screen: a boarding-pass style ticket carrying the application reference. */
export function BoardingPass({ reference, name, destination: d, phone }: { reference: string; name: string; destination: Destination; phone: string }) {
  const date = new Date().toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" }).toUpperCase();
  const code = (s: string) => s.slice(0, 3).toUpperCase();
  return (
    <div role="status" aria-live="polite" className="fade-up">
      <p className="font-mono text-xs uppercase tracking-[0.2em] text-coral-300">Application received</p>
      <h2 className="mt-2 font-display text-3xl font-bold text-ivory sm:text-4xl">You&apos;re on your way, {name.split(" ")[0]}.</h2>
      <p className="mt-2 max-w-xl text-sand/80">An advisor will call or WhatsApp you within two working days. Keep your reference number to track your application.</p>

      <div className="mt-8 overflow-hidden rounded-3xl bg-ivory text-night-900 shadow-[0_40px_80px_-30px_rgba(0,0,0,0.8)] sm:flex">
        <div className="flex-1 p-6 sm:p-8">
          <div className="flex items-center justify-between">
            <span className="font-mono text-[11px] font-semibold uppercase tracking-[0.2em] text-jade-700">Career boarding pass</span>
            <span className="rounded-full bg-coral px-2.5 py-0.5 font-mono text-[10px] font-bold text-night-900">SAMPLE</span>
          </div>
          <div className="mt-6 flex items-center justify-between gap-4">
            <div>
              <p className="font-display text-4xl font-extrabold sm:text-5xl">NBO</p>
              <p className="text-xs text-night-700/80">Nairobi, Kenya</p>
            </div>
            <div className="flex flex-1 items-center gap-2 text-coral-600" aria-hidden="true">
              <span className="h-px flex-1 border-t-2 border-dashed border-coral/60" />
              <Plane className="h-6 w-6" />
              <span className="h-px flex-1 border-t-2 border-dashed border-coral/60" />
            </div>
            <div className="text-right">
              <p className="font-display text-4xl font-extrabold sm:text-5xl">{code(d.city)}</p>
              <p className="flex items-center justify-end gap-1.5 text-xs text-night-700/80">
                <Flag code={d.flag} name={d.country} size={16} /> {d.city}, {d.country}
              </p>
            </div>
          </div>
          <dl className="mt-8 grid grid-cols-2 gap-4 text-sm sm:grid-cols-3">
            <div>
              <dt className="font-mono text-[10px] uppercase tracking-wider text-jade-700">Passenger</dt>
              <dd className="font-bold">{name}</dd>
            </div>
            <div>
              <dt className="font-mono text-[10px] uppercase tracking-wider text-jade-700">Issued</dt>
              <dd className="font-bold">{date}</dd>
            </div>
            <div>
              <dt className="font-mono text-[10px] uppercase tracking-wider text-jade-700">Gate</dt>
              <dd className="font-bold">Documents review</dd>
            </div>
          </dl>
        </div>
        <div className="relative border-t-2 border-dashed border-night-900/20 bg-sand p-6 sm:w-60 sm:border-l-2 sm:border-t-0 sm:p-8">
          <span aria-hidden="true" className="absolute -left-3 -top-3 hidden h-6 w-6 rounded-full bg-night-900 sm:block" />
          <span aria-hidden="true" className="absolute -bottom-3 -left-3 hidden h-6 w-6 rounded-full bg-night-900 sm:block" />
          <p className="font-mono text-[10px] uppercase tracking-wider text-jade-700">Reference</p>
          <p className="mt-1 font-mono text-2xl font-bold tracking-wide">{reference}</p>
          <div className="mt-5 flex h-12 items-end gap-[3px]" aria-hidden="true">
            {reference.split("").map((ch, i) => (
              <span key={i} className="w-[3px] bg-night-900" style={{ height: `${40 + ((ch.charCodeAt(0) * (i + 3)) % 60)}%` }} />
            ))}
          </div>
          <p className="mt-3 text-[11px] text-night-700/80">{site.licence}</p>
        </div>
      </div>

      <div className="mt-8 flex flex-col gap-3 sm:flex-row">
        <Link href={`/track?ref=${encodeURIComponent(reference)}&phone=${encodeURIComponent(phone)}`} className={btn("primary")}>
          <Search className="h-4 w-4" aria-hidden="true" /> Track this application
        </Link>
        <a href={whatsappLink(site.phoneDigits, `Hello, my application reference is ${reference}.`)} target="_blank" rel="noopener noreferrer" className={btn("ghost")}>
          <MessageCircle className="h-4 w-4" aria-hidden="true" /> Message an advisor
        </a>
      </div>
    </div>
  );
}
