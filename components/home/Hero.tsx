"use client";

import Image from "next/image";
import Link from "next/link";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { ArrowRight, BadgeCheck, CalendarClock, Search, ShieldCheck, Star } from "lucide-react";
import { stats, testimonials } from "@/data/content";
import { destinations } from "@/data/destinations";
import { useI18n } from "@/lib/i18n";
import { Container, Flag, btn } from "../ui/primitives";

const GlobePlaceholder = () => (
  <div className="aspect-square w-full p-2" aria-hidden="true">
    <div className="h-full w-full rounded-full bg-[radial-gradient(circle_at_35%_30%,#1d3c94,#0a1a45)] shadow-[0_0_60px_rgba(40,71,217,0.35)] ring-1 ring-gold/30" />
  </div>
);

const Globe = dynamic(() => import("./Globe"), { ssr: false, loading: GlobePlaceholder });

/** Mount the globe only once the page has loaded and the browser is idle, keeping start-up fast. */
function useIdleMount() {
  const [ready, setReady] = useState(false);
  useEffect(() => {
    let cancelled = false;
    const w = window as Window & { requestIdleCallback?: (cb: () => void, o?: { timeout: number }) => number };
    const go = () => {
      const fire = () => !cancelled && setReady(true);
      if (w.requestIdleCallback) w.requestIdleCallback(fire, { timeout: 2500 });
      else setTimeout(fire, 1200);
    };
    if (document.readyState === "complete") go();
    else window.addEventListener("load", go, { once: true });
    return () => {
      cancelled = true;
      window.removeEventListener("load", go);
    };
  }, []);
  return ready;
}

export function Hero() {
  const { t } = useI18n();
  const placed = stats[0];
  const globeReady = useIdleMount();

  return (
    <section className="relative isolate overflow-hidden" aria-labelledby="hero-title">
      {/* soft background accents */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -top-40 left-1/2 h-[520px] w-[900px] -translate-x-1/2 rounded-full bg-royal/10 blur-3xl dark:bg-royal/20" />
        <div className="absolute right-0 top-24 h-72 w-72 rounded-full bg-gold/15 blur-3xl" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(11,27,63,0.04)_1px,transparent_1px),linear-gradient(to_bottom,rgba(11,27,63,0.04)_1px,transparent_1px)] bg-[size:56px_56px] [mask-image:radial-gradient(ellipse_at_top,black_20%,transparent_70%)] dark:bg-[linear-gradient(to_right,rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.04)_1px,transparent_1px)]" />
      </div>

      <Container className="grid items-center gap-12 pb-16 pt-10 sm:pt-14 lg:grid-cols-[1.05fr_1fr] lg:gap-10 lg:pb-24 lg:pt-16">
        <div className="motion-safe:animate-[fadeUp_.7s_ease-out_both]">
          <p className="inline-flex items-center gap-2 rounded-full border border-line bg-surface px-3.5 py-1.5 text-xs font-semibold text-fg shadow-sm">
            <BadgeCheck className="h-4 w-4 text-royal dark:text-gold" aria-hidden="true" />
            {t("hero.eyebrow")}
          </p>

          <h1 id="hero-title" className="mt-6 text-[2.6rem] font-bold leading-[1.05] text-fg sm:text-6xl lg:text-[4.1rem]">
            <span className="block">{t("hero.title.a")}</span>
            <span className="relative inline-block text-royal dark:text-gold">
              {t("hero.title.b")}
              <svg
                aria-hidden="true"
                viewBox="0 0 300 12"
                preserveAspectRatio="none"
                className="absolute -bottom-1.5 left-0 h-2.5 w-full text-gold"
              >
                <path d="M2 9C60 3 160 1 298 6" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
              </svg>
            </span>
            <span className="mt-1 block text-[0.62em] font-bold text-muted">{t("hero.title.c")}</span>
          </h1>

          <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted">{t("hero.subtitle")}</p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link href="/#eligibility" className={btn("gold", "px-6 py-3.5 text-base")}>
              {t("cta.eligibility")} <ArrowRight className="h-5 w-5" aria-hidden="true" />
            </Link>
            <Link href="/jobs" className={btn("outline", "px-6 py-3.5 text-base")}>
              <Search className="h-5 w-5" aria-hidden="true" /> {t("cta.browseJobs")}
            </Link>
          </div>

          <div className="mt-10 flex items-center gap-4">
            <div className="flex -space-x-3">
              {testimonials.map((p) =>
                // Photos load after the page is idle so they don't compete with the headline.
                globeReady ? (
                  <Image
                    key={p.name}
                    src={p.image}
                    alt=""
                    width={44}
                    height={44}
                    className="h-11 w-11 rounded-full bg-surface-2 object-cover ring-[3px] ring-bg"
                  />
                ) : (
                  <span key={p.name} aria-hidden="true" className="h-11 w-11 rounded-full bg-surface-2 ring-[3px] ring-bg" />
                ),
              )}
            </div>
            <div>
              <div className="flex text-gold" aria-hidden="true">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-current" />
                ))}
              </div>
              <p className="text-sm text-muted">
                <strong className="font-semibold text-fg">
                  {placed.value.toLocaleString("en-KE")}
                  {placed.suffix}
                </strong>{" "}
                {t("hero.trusted")}
              </p>
            </div>
          </div>
        </div>

        {/* Globe panel */}
        <div className="relative mx-auto w-full max-w-[560px]">
          <div className="relative overflow-hidden rounded-[28px] bg-navy p-4 shadow-2xl shadow-navy/30 ring-1 ring-white/10 sm:p-6">
            <div aria-hidden="true" className="absolute -right-16 -top-16 h-56 w-56 rounded-full bg-gold/20 blur-3xl" />
            <div aria-hidden="true" className="absolute -bottom-20 -left-10 h-64 w-64 rounded-full bg-royal/40 blur-3xl" />
            <div className="relative flex items-center justify-between text-xs font-semibold text-white/80">
              <span className="inline-flex items-center gap-2">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-gold opacity-75 motion-reduce:hidden" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-gold" />
                </span>
                {t("hero.globe")}
              </span>
              <span className="text-white/75">NBO · {destinations.length} routes</span>
            </div>
            <div className="relative mt-2">{globeReady ? <Globe /> : <GlobePlaceholder />}</div>
            <ul className="relative mt-2 flex flex-wrap justify-center gap-1.5" aria-label="Destination countries">
              {destinations.map((d) => (
                <li key={d.slug} className="flex items-center gap-1.5 rounded-full bg-white/5 px-2 py-1 text-[11px] font-medium text-white/75 ring-1 ring-white/10">
                  <Flag code={d.flag} name={d.name} size={16} />
                  {d.city}
                </li>
              ))}
            </ul>
          </div>

          {/* floating cards */}
          <div className="absolute -left-3 top-16 hidden animate-float rounded-2xl border border-line bg-surface/90 p-3 pr-4 shadow-xl backdrop-blur-md sm:flex sm:items-center sm:gap-3 lg:-left-10">
            <span className="grid h-10 w-10 place-items-center rounded-xl bg-success/10 text-success">
              <ShieldCheck className="h-5 w-5" aria-hidden="true" />
            </span>
            <span className="text-sm leading-tight">
              <span className="block font-semibold text-fg">Visa approved</span>
              <span className="text-xs text-muted">UK Health &amp; Care Worker</span>
            </span>
          </div>
          <div className="absolute -right-3 bottom-24 hidden animate-float rounded-2xl border border-line bg-surface/90 p-3 pr-4 shadow-xl backdrop-blur-md [animation-delay:-3s] sm:flex sm:items-center sm:gap-3 lg:-right-8">
            <span className="grid h-10 w-10 place-items-center rounded-xl bg-gold-50 text-[#8a5d00] dark:bg-gold/15 dark:text-gold">
              <CalendarClock className="h-5 w-5" aria-hidden="true" />
            </span>
            <span className="text-sm leading-tight">
              <span className="block font-semibold text-fg">Next intake</span>
              <span className="text-xs text-muted">Germany · Jan 2027</span>
            </span>
          </div>
        </div>
      </Container>
    </section>
  );
}
