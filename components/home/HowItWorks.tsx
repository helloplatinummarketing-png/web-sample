"use client";

import { m, useScroll, useTransform } from "framer-motion";
import { ClipboardCheck, FileSearch, FileText, PlaneTakeoff, Stamp } from "lucide-react";
import { useRef } from "react";
import { timeline } from "@/data/content";
import { Container, SectionHeading } from "../ui/primitives";

const icons = [ClipboardCheck, FileText, FileSearch, Stamp, PlaneTakeoff];

export function HowItWorks() {
  const ref = useRef<HTMLOListElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 75%", "end 55%"] });
  const scaleY = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <section className="overflow-x-clip py-20 sm:py-28" aria-labelledby="how-title">
      <Container>
        <SectionHeading
          id="how-title"
          eyebrow="How it works"
          title="A clear path from Nairobi to your first day abroad"
          intro="Five steps, with honest time estimates. You'll always know where you are and what happens next."
        />

        <ol ref={ref} className="relative mx-auto mt-16 max-w-3xl">
          {/* track + animated gold fill */}
          <span aria-hidden="true" className="absolute bottom-6 left-6 top-6 w-px bg-line sm:left-1/2" />
          <m.span
            aria-hidden="true"
            style={{ scaleY }}
            className="absolute bottom-6 left-6 top-6 w-0.5 origin-top -translate-x-[0.5px] bg-gradient-to-b from-gold via-gold to-royal sm:left-1/2"
          />

          {timeline.map((s, i) => {
            const Icon = icons[i] ?? FileText;
            const right = i % 2 === 1;
            return (
              <li key={s.title} className="relative grid pb-12 last:pb-0 sm:grid-cols-2 sm:gap-16">
                <span className="absolute left-6 top-0 z-10 grid h-12 w-12 -translate-x-1/2 place-items-center rounded-2xl border border-gold/50 bg-navy text-gold shadow-lg shadow-navy/20 sm:left-1/2">
                  <Icon className="h-5 w-5" aria-hidden="true" />
                </span>
                <m.div
                  initial={{ opacity: 0, x: right ? 30 : -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                  className={`ml-16 sm:ml-0 ${right ? "sm:col-start-2" : "sm:col-start-1 sm:text-right"}`}
                >
                  <p className="text-xs font-bold uppercase tracking-[0.18em] text-royal dark:text-gold">Step {i + 1}</p>
                  <h3 className="mt-1 text-xl font-bold text-fg">{s.title}</h3>
                  <p className="mt-2 leading-relaxed text-muted">{s.body}</p>
                  <span className="mt-3 inline-flex items-center gap-1.5 rounded-full bg-gold-50 px-3 py-1 text-xs font-semibold text-[#7a5200] ring-1 ring-gold/40 dark:bg-gold/10 dark:text-gold">
                    ≈ {s.duration}
                  </span>
                </m.div>
              </li>
            );
          })}
        </ol>
      </Container>
    </section>
  );
}
