"use client";

import { useSearchParams } from "next/navigation";
import { AnimatePresence, m } from "framer-motion";
import { Search, SlidersHorizontal, X } from "lucide-react";
import { useMemo, useState } from "react";
import { destinations } from "@/data/destinations";
import { jobs } from "@/data/jobs";
import { sectors, visaTypes } from "@/data/options";
import { JobCard } from "./JobCard";

const selectCls =
  "w-full appearance-none rounded-xl border border-line bg-surface px-3.5 py-2.5 text-sm text-fg focus:border-royal focus:outline-none focus:ring-4 focus:ring-royal/15 dark:focus:border-gold dark:focus:ring-gold/15";

export function JobBoard() {
  const params = useSearchParams();
  const initialCountry = destinations.some((d) => d.slug === params.get("country")) ? params.get("country")! : "";

  const [q, setQ] = useState("");
  const [country, setCountry] = useState(initialCountry);
  const [sector, setSector] = useState("");
  const [skill, setSkill] = useState<"" | "Skilled" | "Unskilled">("");
  const [visa, setVisa] = useState("");
  const [showFilters, setShowFilters] = useState(false);

  const results = useMemo(() => {
    const term = q.trim().toLowerCase();
    return jobs.filter((j) => {
      const dest = destinations.find((d) => d.slug === j.country);
      if (term && ![j.title, j.city, j.sector, dest?.name ?? "", j.employer].some((s) => s.toLowerCase().includes(term))) return false;
      if (country && j.country !== country) return false;
      if (sector && j.sector !== sector) return false;
      if (skill && j.skill !== skill) return false;
      if (visa && j.visaType !== visa) return false;
      return true;
    });
  }, [q, country, sector, skill, visa]);

  const activeCount = [country, sector, skill, visa].filter(Boolean).length;
  const clear = () => {
    setQ("");
    setCountry("");
    setSector("");
    setSkill("");
    setVisa("");
  };

  const usedVisaTypes = visaTypes.filter((v) => jobs.some((j) => j.visaType === v));

  return (
    <div className="grid gap-8 lg:grid-cols-[280px_1fr]">
      {/* Filters */}
      <aside aria-label="Job filters" className="lg:sticky lg:top-24 lg:self-start">
        <div className="flex gap-2 lg:block">
          <div className="relative flex-1">
            <label htmlFor="job-search" className="sr-only">
              Search jobs
            </label>
            <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" aria-hidden="true" />
            <input
              id="job-search"
              type="search"
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Job title, city or sector"
              className="w-full rounded-xl border border-line bg-surface py-3 pl-10 pr-3.5 text-sm text-fg placeholder:text-muted focus:border-royal focus:outline-none focus:ring-4 focus:ring-royal/15 dark:focus:border-gold dark:focus:ring-gold/15"
            />
          </div>
          <button
            type="button"
            onClick={() => setShowFilters((s) => !s)}
            aria-expanded={showFilters}
            aria-controls="filter-panel"
            className="inline-flex items-center gap-2 rounded-xl border border-line bg-surface px-4 text-sm font-semibold text-fg lg:hidden"
          >
            <SlidersHorizontal className="h-4 w-4" aria-hidden="true" /> Filters{activeCount > 0 && ` (${activeCount})`}
          </button>
        </div>

        <div id="filter-panel" className={`${showFilters ? "block" : "hidden"} mt-4 space-y-5 rounded-2xl border border-line bg-surface p-5 lg:block`}>
          <div>
            <label htmlFor="f-country" className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-muted">
              Country
            </label>
            <select id="f-country" value={country} onChange={(e) => setCountry(e.target.value)} className={selectCls}>
              <option value="">All countries</option>
              {destinations.map((d) => (
                <option key={d.slug} value={d.slug}>
                  {d.name}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="f-sector" className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-muted">
              Sector
            </label>
            <select id="f-sector" value={sector} onChange={(e) => setSector(e.target.value)} className={selectCls}>
              <option value="">All sectors</option>
              {sectors.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
          </div>
          <fieldset>
            <legend className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-muted">Skill level</legend>
            <div className="grid grid-cols-3 gap-1 rounded-xl bg-surface-2 p-1">
              {(["", "Skilled", "Unskilled"] as const).map((s) => (
                <button
                  key={s || "all"}
                  type="button"
                  aria-pressed={skill === s}
                  onClick={() => setSkill(s)}
                  className={`rounded-lg px-2 py-2 text-xs font-semibold transition ${
                    skill === s ? "bg-surface text-fg shadow-sm" : "text-muted hover:text-fg"
                  }`}
                >
                  {s || "All"}
                </button>
              ))}
            </div>
          </fieldset>
          <div>
            <label htmlFor="f-visa" className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-muted">
              Visa type
            </label>
            <select id="f-visa" value={visa} onChange={(e) => setVisa(e.target.value)} className={selectCls}>
              <option value="">All visa types</option>
              {usedVisaTypes.map((v) => (
                <option key={v} value={v}>
                  {v}
                </option>
              ))}
            </select>
          </div>
          {(activeCount > 0 || q) && (
            <button type="button" onClick={clear} className="inline-flex items-center gap-1.5 text-sm font-semibold text-link hover:underline">
              <X className="h-4 w-4" aria-hidden="true" /> Clear all filters
            </button>
          )}
        </div>
      </aside>

      {/* Results */}
      <div>
        <p className="mb-5 text-sm text-muted" role="status" aria-live="polite">
          Showing <strong className="text-fg">{results.length}</strong> of {jobs.length} jobs
        </p>
        {results.length > 0 ? (
          <ul className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
            <AnimatePresence mode="popLayout">
              {results.map((j) => (
                <m.li
                  key={j.slug}
                  layout
                  initial={{ opacity: 0, scale: 0.97 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.97 }}
                  transition={{ duration: 0.25 }}
                >
                  <JobCard job={j} headingLevel="h2" />
                </m.li>
              ))}
            </AnimatePresence>
          </ul>
        ) : (
          <div className="rounded-2xl border border-dashed border-line bg-surface p-10 text-center">
            <p className="font-display text-lg font-semibold text-fg">No jobs match those filters</p>
            <p className="mt-1 text-sm text-muted">Try removing a filter, or register your profile and we&apos;ll alert you when a match opens.</p>
            <button type="button" onClick={clear} className="mt-5 rounded-xl bg-navy px-5 py-2.5 text-sm font-semibold text-white dark:bg-gold dark:text-navy">
              Clear filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
