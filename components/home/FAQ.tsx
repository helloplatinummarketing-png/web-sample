"use client";

import { AnimatePresence, m } from "framer-motion";
import { Plus } from "lucide-react";
import { useState } from "react";
import { faqs } from "@/data/content";
import { Container, SectionHeading } from "../ui/primitives";

export function FAQ() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section className="py-20 sm:py-28" aria-labelledby="faq-title">
      <Container className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr]">
        <SectionHeading
          align="left"
          id="faq-title"
          eyebrow="FAQ"
          title="Questions we hear every day"
          intro="Straight answers about visas, fees, timelines and documents. Can't find yours? Chat with an advisor on WhatsApp."
        />
        <ul className="divide-y divide-line rounded-2xl border border-line bg-surface">
          {faqs.map((f, i) => {
            const isOpen = open === i;
            return (
              <li key={f.q}>
                <h3>
                  <button
                    type="button"
                    id={`faq-btn-${i}`}
                    aria-expanded={isOpen}
                    aria-controls={`faq-panel-${i}`}
                    onClick={() => setOpen(isOpen ? null : i)}
                    className="flex w-full items-center justify-between gap-4 px-5 py-5 text-left font-display text-base font-semibold text-fg sm:px-6"
                  >
                    {f.q}
                    <span
                      className={`grid h-8 w-8 shrink-0 place-items-center rounded-full border transition ${
                        isOpen ? "rotate-45 border-gold bg-gold text-navy" : "border-line text-muted"
                      }`}
                      aria-hidden="true"
                    >
                      <Plus className="h-4 w-4" />
                    </span>
                  </button>
                </h3>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <m.div
                      id={`faq-panel-${i}`}
                      role="region"
                      aria-labelledby={`faq-btn-${i}`}
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25 }}
                      className="overflow-hidden"
                    >
                      <p className="px-5 pb-5 leading-relaxed text-muted sm:px-6">{f.a}</p>
                    </m.div>
                  )}
                </AnimatePresence>
              </li>
            );
          })}
        </ul>
      </Container>
    </section>
  );
}
