"use client";

import { animate, useInView, useReducedMotion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { stats } from "@/data/content";
import { Container } from "../ui/primitives";

function CountUp({ value, suffix }: { value: number; suffix: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const reduce = useReducedMotion();
  const [n, setN] = useState(0);

  useEffect(() => {
    if (!inView) return;
    if (reduce) {
      const id = requestAnimationFrame(() => setN(value));
      return () => cancelAnimationFrame(id);
    }
    const c = animate(0, value, { duration: 2, ease: [0.16, 1, 0.3, 1], onUpdate: (v) => setN(Math.round(v)) });
    return () => c.stop();
  }, [inView, reduce, value]);

  return (
    <span ref={ref} className="tabular-nums">
      {n.toLocaleString("en-KE")}
      {suffix}
    </span>
  );
}

export function Stats() {
  return (
    <section aria-label="Our impact in numbers" className="relative overflow-hidden bg-navy py-16 text-white sm:py-20">
      <div aria-hidden="true" className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gold/60 to-transparent" />
      <div aria-hidden="true" className="absolute -left-24 top-0 h-72 w-72 rounded-full bg-royal/40 blur-3xl" />
      <div aria-hidden="true" className="absolute -right-24 bottom-0 h-72 w-72 rounded-full bg-gold/15 blur-3xl" />
      <Container>
        <dl className="relative grid grid-cols-2 gap-y-10 lg:grid-cols-4 lg:divide-x lg:divide-white/10">
          {stats.map((s) => (
            <div key={s.label} className="flex flex-col-reverse items-center px-4 text-center">
              <dt className="mt-2 text-sm text-white/75 sm:text-base">{s.label}</dt>
              <dd className="font-display text-4xl font-bold text-gold sm:text-5xl">
                <CountUp value={s.value} suffix={s.suffix} />
              </dd>
            </div>
          ))}
        </dl>
      </Container>
    </section>
  );
}
