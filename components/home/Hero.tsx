"use client";

import { ArrowDown, ArrowUpRight, BadgeCheck } from "lucide-react";
import Link from "next/link";
import { site } from "@/data/site";
import { screenTargets } from "@/lib/journey-store";
import { useI18n } from "@/lib/i18n";
import { btn, Container } from "../ui/primitives";

export function Hero() {
  const { t } = useI18n();
  return (
    <section id="hero" aria-labelledby="hero-title" className="chapter relative" style={{ ["--h" as string]: "100vh" }}>
      <Container className="relative flex min-h-[100svh] flex-col justify-start pb-16 pt-28 md:justify-center md:pt-24">
        <div
          className="relative z-10 max-w-xl"
          ref={(el) => {
            screenTargets.heroAnchor = el;
          }}
        >
          <p className="fade-up inline-flex items-center gap-2 rounded-full border border-jade/50 bg-night-900/60 px-3 py-1 font-mono text-[11px] font-semibold uppercase tracking-[0.16em] text-jade-300 backdrop-blur">
            <span className="relative grid h-2 w-2 place-items-center">
              <span className="pulse-ring absolute h-2 w-2 rounded-full bg-coral" />
              <span className="h-1.5 w-1.5 rounded-full bg-coral" />
            </span>
            {t("hero.eyebrow")}
          </p>
          <h1 id="hero-title" className="mt-6 text-[2.6rem] font-bold leading-[1.02] text-ivory sm:text-6xl lg:text-7xl">
            {t("hero.title.a")} <span className="text-coral">{t("hero.title.b")}</span>
          </h1>
          <p className="fade-up mt-6 max-w-lg text-base leading-relaxed text-sand/85 sm:text-lg" style={{ animationDelay: "0.15s" }}>
            {t("hero.subtitle")}
          </p>
          <div className="fade-up mt-8 flex flex-col gap-3 sm:flex-row" style={{ animationDelay: "0.25s" }}>
            <Link href="/apply" className={btn("primary", "px-7 py-3.5 text-base")}>
              {t("cta.start")} <ArrowUpRight className="h-5 w-5" aria-hidden="true" />
            </Link>
            <Link href="/jobs" className={btn("ghost", "px-7 py-3.5 text-base")}>
              {t("cta.jobs")}
            </Link>
          </div>
          <ul className="fade-up mt-8 flex flex-wrap gap-x-5 gap-y-2 text-xs text-sand/75" style={{ animationDelay: "0.35s" }}>
            <li className="flex items-center gap-1.5">
              <BadgeCheck className="h-4 w-4 text-jade-300" aria-hidden="true" /> {site.licence}
            </li>
            <li>8 destination countries</li>
            <li>No hidden fees</li>
          </ul>
        </div>

        {/* Lite mode: a static globe image takes the place of the 3D scene */}
        <div className="only-lite pointer-events-none mt-12 md:absolute md:right-0 md:top-1/2 md:mt-0 md:w-[46%] md:-translate-y-1/2" aria-hidden="true">
          <div className="poster-globe mx-auto aspect-square w-[min(80vw,520px)]" style={{ backgroundPosition: "66% 50%" }} />
        </div>

        <div className="only-3d">
          <p className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 items-center gap-2 font-mono text-[11px] uppercase tracking-[0.2em] text-jade-300 md:flex">
            <ArrowDown className="h-3.5 w-3.5 animate-bounce" aria-hidden="true" /> Scroll to begin the journey
          </p>
        </div>
      </Container>
    </section>
  );
}
