import { AlertTriangle, BadgeCheck, Banknote, ShieldAlert } from "lucide-react";
import { scamTips } from "@/data/content";
import { site } from "@/data/site";
import { Container } from "../ui/primitives";
import { Reveal } from "../ui/Reveal";

const icons = [BadgeCheck, Banknote, ShieldAlert];

export function ScamAwareness() {
  return (
    <section aria-labelledby="scam-title" className="py-6">
      <Container>
        <Reveal className="relative overflow-hidden rounded-[28px] border border-gold/40 bg-gold-50 p-6 dark:border-gold/30 dark:bg-gold/[0.07] sm:p-10">
          <div className="grid gap-8 xl:grid-cols-[0.8fr_1.2fr] xl:items-center">
            <div>
              <span className="inline-flex items-center gap-2 rounded-full bg-navy px-3 py-1 text-xs font-bold uppercase tracking-wider text-gold">
                <AlertTriangle className="h-3.5 w-3.5" aria-hidden="true" /> Stay safe
              </span>
              <h2 id="scam-title" className="mt-4 text-2xl font-bold text-fg sm:text-3xl">
                How to spot a fake recruitment agency
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-muted">
                Protecting you matters more to us than any placement. Share these tips with friends and family. Our licence: <strong className="text-fg">{site.licence}</strong>.
              </p>
            </div>
            <ol className="grid gap-4 sm:grid-cols-3">
              {scamTips.map((tip, i) => {
                const Icon = icons[i] ?? ShieldAlert;
                return (
                  <li key={tip.title} className="rounded-2xl bg-surface p-5 shadow-sm ring-1 ring-line">
                    <div className="flex items-center gap-2">
                      <span className="grid h-9 w-9 place-items-center rounded-lg bg-navy text-gold">
                        <Icon className="h-4 w-4" aria-hidden="true" />
                      </span>
                      <span className="font-display text-sm font-bold text-muted">0{i + 1}</span>
                    </div>
                    <h3 className="mt-3 font-bold text-fg">{tip.title}</h3>
                    <p className="mt-1.5 text-sm leading-relaxed text-muted">{tip.body}</p>
                  </li>
                );
              })}
            </ol>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
