"use client";

import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, m, useInView } from "framer-motion";
import { ArrowRight, Briefcase, Clock, Languages } from "lucide-react";
import { useRef, useState, type KeyboardEvent } from "react";
import { destinations } from "@/data/destinations";
import { Badge, Container, Flag, SectionHeading, btn, card } from "../ui/primitives";

export function Destinations() {
  const [active, setActive] = useState(0);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const sectionRef = useRef<HTMLElement>(null);
  // Only request the large country photo when the section is approaching the viewport.
  const near = useInView(sectionRef, { once: true, margin: "400px 0px" });
  const d = destinations[active];

  const onKey = (e: KeyboardEvent) => {
    const n = destinations.length;
    let next = -1;
    if (e.key === "ArrowRight" || e.key === "ArrowDown") next = (active + 1) % n;
    if (e.key === "ArrowLeft" || e.key === "ArrowUp") next = (active - 1 + n) % n;
    if (e.key === "Home") next = 0;
    if (e.key === "End") next = n - 1;
    if (next >= 0) {
      e.preventDefault();
      setActive(next);
      tabRefs.current[next]?.focus();
    }
  };

  return (
    <section ref={sectionRef} id="destinations" className="scroll-mt-24 py-20 sm:py-28" aria-labelledby="dest-title">
      <Container>
        <SectionHeading
          id="dest-title"
          eyebrow="Destinations"
          title="Eight countries. Thousands of real openings."
          intro="Pick a country to see the sectors hiring, typical processing time and how many roles we're currently filling."
        />

        <div
          role="tablist"
          aria-label="Destination countries"
          onKeyDown={onKey}
          className="no-scrollbar -mx-4 mt-12 flex gap-2 overflow-x-auto px-4 pb-2 sm:mx-0 sm:flex-wrap sm:justify-center sm:px-0"
        >
          {destinations.map((x, i) => {
            const selected = i === active;
            return (
              <button
                key={x.slug}
                ref={(el) => {
                  tabRefs.current[i] = el;
                }}
                role="tab"
                id={`tab-${x.slug}`}
                aria-selected={selected}
                aria-controls={`panel-${x.slug}`}
                tabIndex={selected ? 0 : -1}
                onClick={() => setActive(i)}
                className={`relative flex shrink-0 items-center gap-2.5 rounded-xl border px-4 py-2.5 text-sm font-semibold transition ${
                  selected
                    ? "border-navy bg-navy text-white shadow-lg shadow-navy/20 dark:border-gold dark:bg-gold dark:text-navy"
                    : "border-line bg-surface text-fg hover:border-royal/50"
                }`}
              >
                <Flag code={x.flag} name={x.name} size={22} />
                {x.name}
              </button>
            );
          })}
        </div>

        <div className="mt-8">
          <AnimatePresence mode="wait">
            <m.div
              key={d.slug}
              role="tabpanel"
              id={`panel-${d.slug}`}
              aria-labelledby={`tab-${d.slug}`}
              tabIndex={0}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              className={`${card} grid overflow-hidden lg:grid-cols-[1.1fr_1fr]`}
            >
              <div className="relative min-h-64 bg-navy lg:min-h-[420px]">
                {near && <Image src={d.image} alt={d.imageAlt} fill sizes="(min-width: 1024px) 55vw, 100vw" className="object-cover" />}
                <div className="absolute inset-0 bg-gradient-to-t from-navy/80 via-navy/10 to-transparent" />
                <div className="absolute bottom-5 left-5 right-5 flex flex-wrap items-end justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <Flag code={d.flag} name={d.name} size={44} />
                    <div>
                      <p className="font-display text-2xl font-bold text-white">{d.name}</p>
                      <p className="text-sm text-white/75">Hub city: {d.city}</p>
                    </div>
                  </div>
                  <div className="rounded-xl bg-white/95 px-4 py-2 text-center shadow-lg">
                    <p className="font-display text-2xl font-bold leading-none text-navy">{d.openRoles}</p>
                    <p className="text-[11px] font-semibold uppercase tracking-wider text-navy/60">Open roles</p>
                  </div>
                </div>
              </div>

              <div className="flex flex-col p-6 sm:p-8">
                <div className="flex flex-wrap gap-2">
                  {d.tags.map((tag) => (
                    <Badge key={tag} tone={tag === "Skilled" ? "royal" : "gold"}>
                      {tag}
                    </Badge>
                  ))}
                </div>
                <p className="mt-4 text-lg leading-relaxed text-fg">{d.summary}</p>

                <dl className="mt-6 grid gap-4 sm:grid-cols-2">
                  <div className="rounded-xl bg-surface-2 p-4">
                    <dt className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-muted">
                      <Clock className="h-4 w-4" aria-hidden="true" /> Avg. processing
                    </dt>
                    <dd className="mt-1 font-display text-lg font-semibold text-fg">{d.processing}</dd>
                  </div>
                  <div className="rounded-xl bg-surface-2 p-4">
                    <dt className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-muted">
                      <Languages className="h-4 w-4" aria-hidden="true" /> Language
                    </dt>
                    <dd className="mt-1 font-display text-lg font-semibold text-fg">{d.language}</dd>
                  </div>
                </dl>

                <div className="mt-6">
                  <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-muted">
                    <Briefcase className="h-4 w-4" aria-hidden="true" /> Top sectors
                  </p>
                  <ul className="mt-3 flex flex-wrap gap-2">
                    {d.sectors.map((s) => (
                      <li key={s} className="rounded-lg border border-line px-3 py-1.5 text-sm font-medium text-fg">
                        {s}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-auto flex flex-col gap-3 pt-8 sm:flex-row">
                  <Link href={`/jobs?country=${d.slug}`} className={btn("primary")}>
                    View {d.name} jobs <ArrowRight className="h-4 w-4" aria-hidden="true" />
                  </Link>
                  <Link href={`/apply?country=${d.slug}`} className={btn("outline")}>
                    Apply for {d.name}
                  </Link>
                </div>
              </div>
            </m.div>
          </AnimatePresence>
        </div>
        <p className="mt-4 text-center text-xs text-muted">Processing times are typical averages and vary by employer and visa route.</p>
      </Container>
    </section>
  );
}
