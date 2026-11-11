"use client";

import Image from "next/image";
import { AnimatePresence, m } from "framer-motion";
import { Play, Quote, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { testimonials } from "@/data/content";
import { Container, Flag, SectionHeading, card } from "../ui/primitives";
import { Reveal } from "../ui/Reveal";

type T = (typeof testimonials)[number];

export function Testimonials() {
  const [open, setOpen] = useState<T | null>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const lastTrigger = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    if (!open) return;
    closeRef.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(null);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
      lastTrigger.current?.focus();
    };
  }, [open]);

  return (
    <section className="py-20 sm:py-28" aria-labelledby="stories-title">
      <Container>
        <SectionHeading
          id="stories-title"
          eyebrow="Success stories"
          title="Real people. Real journeys."
          intro="Hear from Kenyans who started exactly where you are today."
        />
        <ul className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {testimonials.map((t, i) => (
            <Reveal as="li" key={t.name} delay={i * 0.07}>
              <figure className={`${card} group flex h-full flex-col overflow-hidden`}>
                <button
                  type="button"
                  onClick={(e) => {
                    lastTrigger.current = e.currentTarget;
                    setOpen(t);
                  }}
                  className="relative block aspect-[4/5] w-full overflow-hidden text-left"
                  aria-label={`Play video story from ${t.name}, ${t.role} in ${t.location}`}
                >
                  <Image
                    src={t.image}
                    alt=""
                    fill
                    sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                    className="object-cover transition duration-700 group-hover:scale-105"
                  />
                  <span className="absolute inset-0 bg-gradient-to-t from-navy/90 via-navy/20 to-transparent" />
                  <span className="absolute left-1/2 top-1/2 grid h-16 w-16 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-white/20 ring-1 ring-white/50 backdrop-blur-md transition group-hover:scale-110 group-hover:bg-gold">
                    <Play className="ml-1 h-6 w-6 fill-white text-white group-hover:fill-navy group-hover:text-navy" aria-hidden="true" />
                  </span>
                  <span className="absolute right-3 top-3 rounded-md bg-black/55 px-2 py-0.5 text-xs font-semibold text-white">{t.duration}</span>
                  <span className="absolute bottom-4 left-4 right-4 flex items-center gap-2">
                    <Flag code={t.flag} name={t.location} size={22} />
                    <span className="text-sm font-semibold text-white">{t.location}</span>
                  </span>
                </button>
                <blockquote className="flex-1 px-5 pt-5 text-sm leading-relaxed text-fg">&ldquo;{t.quote}&rdquo;</blockquote>
                <figcaption className="px-5 pb-5 pt-4">
                  <span className="block font-display font-semibold text-fg">{t.name}</span>
                  <span className="text-xs text-muted">{t.role}</span>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </ul>
      </Container>

      <AnimatePresence>
        {open && (
          <m.div
            className="fixed inset-0 z-[60] grid place-items-center bg-navy-950/80 p-4 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setOpen(null)}
          >
            <m.div
              role="dialog"
              aria-modal="true"
              aria-labelledby="story-title"
              initial={{ scale: 0.95, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-3xl overflow-hidden rounded-[24px] bg-surface shadow-2xl"
            >
              <button
                ref={closeRef}
                type="button"
                onClick={() => setOpen(null)}
                aria-label="Close video"
                className="absolute right-3 top-3 z-10 grid h-10 w-10 place-items-center rounded-full bg-black/50 text-white hover:bg-black/70"
              >
                <X className="h-5 w-5" aria-hidden="true" />
              </button>
              <div className="relative aspect-video bg-navy">
                <Image src={open.image} alt={`${open.name}, ${open.role}`} fill sizes="768px" className="object-cover opacity-60" />
                <div className="absolute inset-0 grid place-items-center text-center text-white">
                  <div>
                    <span className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-gold text-navy">
                      <Play className="ml-1 h-7 w-7 fill-current" aria-hidden="true" />
                    </span>
                    <p className="mt-4 text-sm font-semibold">Video testimonial placeholder</p>
                    <p className="text-xs text-white/75">Embed the client&apos;s real video (YouTube / Vimeo) here.</p>
                  </div>
                </div>
              </div>
              <div className="p-6 sm:p-8">
                <Quote className="h-8 w-8 text-gold" aria-hidden="true" />
                <p className="mt-3 text-lg leading-relaxed text-fg">{open.quote}</p>
                <p id="story-title" className="mt-4 flex items-center gap-2 font-display font-semibold text-fg">
                  <Flag code={open.flag} name={open.location} size={22} /> {open.name} · {open.role}, {open.location}
                </p>
              </div>
            </m.div>
          </m.div>
        )}
      </AnimatePresence>
    </section>
  );
}
