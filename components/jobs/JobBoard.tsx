"use client";

import { ArrowUpRight, CalendarDays, MapPin, Search, Stamp, Wallet, X } from "lucide-react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useMemo, useState } from "react";
import { destinationBySlug, destinations, NAIROBI } from "@/data/destinations";
import { slerpLatLng } from "@/lib/geo";
import { destinationNodes, nairobiNode } from "@/data/journey";
import { jobs } from "@/data/jobs";
import { sectors, visaTypes } from "@/data/options";
import { formatDate } from "@/lib/format";
import { JourneyGlobe } from "../journey/JourneyGlobe";
import { Flag } from "../ui/primitives";

const selectCls =
  "w-full appearance-none rounded-xl border border-jade/40 bg-white/[0.06] px-3.5 py-2.5 text-sm text-ivory focus:border-coral focus:outline-none focus:ring-4 focus:ring-coral/15";
const globeNodes = [nairobiNode, ...destinationNodes];

export function JobBoard() {
  const params = useSearchParams();
  const [q, setQ] = useState("");
  const [country, setCountry] = useState(params.get("country") ?? "");
  const [sector, setSector] = useState("");
  const [skill, setSkill] = useState("");
  const [visa, setVisa] = useState("");
  const [hover, setHover] = useState<string | null>(null);

  const list = useMemo(() => {
    const term = q.trim().toLowerCase();
    return jobs.filter(
      (j) =>
        (!country || j.country === country) &&
        (!sector || j.sector === sector) &&
        (!skill || j.skill === skill) &&
        (!visa || j.visaType === visa) &&
        (!term || `${j.title} ${j.city} ${j.sector} ${destinationBySlug(j.country)?.country}`.toLowerCase().includes(term))
    );
  }, [q, country, sector, skill, visa]);

  const focusSlug = hover ?? country ?? null;
  const focusDest = focusSlug ? destinationBySlug(focusSlug) : null;
  const any = q || country || sector || skill || visa;

  return (
    <div className="grid gap-10 lg:grid-cols-[1fr_320px]">
      <div>
        <div className="glass grid gap-3 rounded-2xl p-4 sm:grid-cols-2 xl:grid-cols-5" role="search">
          <label className="relative sm:col-span-2 xl:col-span-1">
            <span className="sr-only">Search jobs</span>
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-jade-300" aria-hidden="true" />
            <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search role or city" className={`${selectCls} pl-9`} />
          </label>
          <label>
            <span className="sr-only">Country</span>
            <select value={country} onChange={(e) => setCountry(e.target.value)} className={selectCls}>
              <option value="">All countries</option>
              {destinations.map((d) => (
                <option key={d.slug} value={d.slug}>
                  {d.country}
                </option>
              ))}
            </select>
          </label>
          <label>
            <span className="sr-only">Sector</span>
            <select value={sector} onChange={(e) => setSector(e.target.value)} className={selectCls}>
              <option value="">All sectors</option>
              {sectors.map((s) => (
                <option key={s}>{s}</option>
              ))}
            </select>
          </label>
          <label>
            <span className="sr-only">Skill level</span>
            <select value={skill} onChange={(e) => setSkill(e.target.value)} className={selectCls}>
              <option value="">Skilled & unskilled</option>
              <option>Skilled</option>
              <option>Unskilled</option>
            </select>
          </label>
          <label>
            <span className="sr-only">Visa type</span>
            <select value={visa} onChange={(e) => setVisa(e.target.value)} className={selectCls}>
              <option value="">All visa types</option>
              {visaTypes.slice(0, 5).map((v) => (
                <option key={v}>{v}</option>
              ))}
            </select>
          </label>
        </div>

        <div className="mt-5 flex items-center justify-between text-sm text-muted" aria-live="polite">
          <p>
            <span className="font-bold text-ivory">{list.length}</span> sample {list.length === 1 ? "job" : "jobs"}
          </p>
          {any && (
            <button
              type="button"
              className="inline-flex items-center gap-1 font-semibold text-coral-300 hover:text-coral"
              onClick={() => {
                setQ("");
                setCountry("");
                setSector("");
                setSkill("");
                setVisa("");
              }}
            >
              <X className="h-4 w-4" aria-hidden="true" /> Clear filters
            </button>
          )}
        </div>

        <ul className="mt-4 grid gap-4 md:grid-cols-2">
          {list.map((j) => {
            const d = destinationBySlug(j.country)!;
            return (
              <li key={j.slug} onMouseEnter={() => setHover(j.country)} onMouseLeave={() => setHover(null)} onFocus={() => setHover(j.country)}>
                <article className="glass group relative flex h-full flex-col rounded-2xl p-5 transition duration-300 hover:-translate-y-1 hover:border-coral/60">
                  <div className="flex items-start justify-between gap-3">
                    <span className="flex items-center gap-2.5 text-xs text-sand/75">
                      <Flag code={d.flag} name={d.country} size={26} />
                      <span>
                        <span className="block font-semibold text-sand">{j.sector}</span>
                        <span className="flex items-center gap-1">
                          <MapPin className="h-3 w-3" aria-hidden="true" /> {j.city}, {d.country}
                        </span>
                      </span>
                    </span>
                    <span className={`rounded-full border px-2 py-0.5 text-[11px] font-semibold ${j.skill === "Skilled" ? "border-jade/60 text-jade-300" : "border-coral/50 text-coral-300"}`}>
                      {j.skill}
                    </span>
                  </div>
                  <h2 className="mt-4 font-display text-lg font-bold leading-snug text-ivory">
                    <Link href={`/jobs/${j.slug}`} className="after:absolute after:inset-0 after:rounded-2xl">
                      {j.title}
                    </Link>
                  </h2>
                  <dl className="mt-3 space-y-1.5 text-sm">
                    <div className="flex items-center gap-2 font-semibold text-ivory">
                      <dt className="sr-only">Salary</dt>
                      <Wallet className="h-4 w-4 text-coral" aria-hidden="true" />
                      <dd>{j.salary}</dd>
                    </div>
                    <div className="flex items-center gap-2 text-sand/75">
                      <dt className="sr-only">Visa type</dt>
                      <Stamp className="h-4 w-4" aria-hidden="true" />
                      <dd>{j.visaType}</dd>
                    </div>
                    <div className="flex items-center gap-2 text-sand/75">
                      <dt className="sr-only">Closing date</dt>
                      <CalendarDays className="h-4 w-4" aria-hidden="true" />
                      <dd>Closes {formatDate(j.closing)}</dd>
                    </div>
                  </dl>
                  <span className="mt-auto flex items-center justify-between border-t border-jade/20 pt-4 text-sm font-semibold text-coral-300" aria-hidden="true">
                    View details <ArrowUpRight className="h-4 w-4 transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                  </span>
                </article>
              </li>
            );
          })}
        </ul>
        {list.length === 0 && (
          <p className="glass mt-4 rounded-2xl p-8 text-center text-sand/80">No sample jobs match these filters. Try clearing one, or chat with an advisor.</p>
        )}
      </div>

      <aside className="order-first lg:order-none" aria-label="Destination globe">
        <div className="lg:sticky lg:top-24">
          <div className="glass relative mx-auto aspect-square w-44 overflow-hidden rounded-full sm:w-56 lg:w-full lg:rounded-3xl">
            <JourneyGlobe
              variant="mini"
              nodes={globeNodes}
              path={focusDest ? ["nairobi", focusDest.slug] : []}
              line={focusDest ? 1 : 0}
              activeId={focusDest?.slug ?? "nairobi"}
              focus={focusDest ? slerpLatLng(NAIROBI, focusDest, 0.6) : { lat: 10, lng: 30 }}
              view={{ x: 0, y: 0, zoom: 0.95 }}
              className="absolute inset-0"
              posterClassName="inset-[12%]"
            />
          </div>
          <p className="mt-3 hidden text-center font-mono text-[11px] uppercase tracking-[0.18em] text-jade-300 lg:block">
            {focusDest ? `Nairobi → ${focusDest.city}` : "Hover a job to see its route"}
          </p>
        </div>
      </aside>
    </div>
  );
}
