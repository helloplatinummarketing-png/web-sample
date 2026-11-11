import type { ReactNode } from "react";
import { Container } from "./ui/primitives";

/** Compact navy page header used on inner pages. */
export function PageHeader({ eyebrow, title, intro, children }: { eyebrow: string; title: ReactNode; intro?: ReactNode; children?: ReactNode }) {
  return (
    <section className="relative isolate overflow-hidden bg-navy text-white">
      <div aria-hidden="true" className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top_right,rgba(40,71,217,0.55),transparent_55%)]" />
      <div aria-hidden="true" className="absolute -left-20 bottom-0 -z-10 h-64 w-64 rounded-full bg-gold/15 blur-3xl" />
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-[linear-gradient(to_right,rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.04)_1px,transparent_1px)] bg-[size:56px_56px] [mask-image:linear-gradient(to_bottom,black,transparent)]"
      />
      <Container className="py-16 sm:py-20">
        <div className="flex items-center gap-3">
          <span className="gold-rule" aria-hidden="true" />
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-gold">{eyebrow}</p>
        </div>
        <h1 className="mt-4 max-w-3xl text-4xl font-bold leading-tight sm:text-5xl">{title}</h1>
        {intro && <p className="mt-4 max-w-2xl text-lg leading-relaxed text-white/75">{intro}</p>}
        {children}
      </Container>
    </section>
  );
}
