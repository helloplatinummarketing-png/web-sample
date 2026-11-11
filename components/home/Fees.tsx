import { Ban, CheckCircle2, ReceiptText, ShieldCheck } from "lucide-react";
import { fees } from "@/data/content";
import { site } from "@/data/site";
import { Container, SectionHeading } from "../ui/primitives";
import { Reveal } from "../ui/Reveal";

export function Fees() {
  return (
    <section id="fees" className="scroll-mt-24 py-20 sm:py-28" aria-labelledby="fees-title">
      <Container>
        <SectionHeading
          id="fees-title"
          eyebrow="Transparent fees"
          title="One fee. Clearly explained. Always receipted."
          intro="We believe you should know exactly what you're paying for before you pay anything."
        />

        <Reveal className="mx-auto mt-14 max-w-5xl overflow-hidden rounded-[28px] border border-line bg-surface shadow-[0_30px_60px_-30px_rgba(11,27,63,0.35)]">
          <div className="grid lg:grid-cols-[0.9fr_1.1fr]">
            {/* price panel */}
            <div className="relative overflow-hidden bg-navy p-8 text-white sm:p-10">
              <div aria-hidden="true" className="absolute -right-20 -top-20 h-60 w-60 rounded-full bg-gold/20 blur-3xl" />
              <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-xs font-semibold text-gold ring-1 ring-gold/30">
                <ReceiptText className="h-3.5 w-3.5" aria-hidden="true" /> Registration fee
              </span>
              <p className="mt-6 font-display text-5xl font-bold tracking-tight">{site.registrationFee}</p>
              <p className="mt-2 text-sm text-white/70">One-time · non-transferable · paid only after your consultation</p>
              <div className="my-8 h-px bg-gradient-to-r from-gold/60 to-transparent" />
              <p className="text-sm font-semibold text-white">What it covers</p>
              <ul className="mt-4 space-y-3 text-sm text-white/85">
                {fees.covers.map((c) => (
                  <li key={c} className="flex gap-3">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-gold" aria-hidden="true" />
                    {c}
                  </li>
                ))}
              </ul>
            </div>

            {/* never charge */}
            <div className="p-8 sm:p-10">
              <div className="flex items-center gap-3">
                <span className="grid h-11 w-11 place-items-center rounded-xl bg-red-50 text-red-600 dark:bg-red-500/10 dark:text-red-400">
                  <Ban className="h-5 w-5" aria-hidden="true" />
                </span>
                <h3 className="text-xl font-bold text-fg">What we will NEVER charge for</h3>
              </div>
              <ul className="mt-6 space-y-3">
                {fees.never.map((n) => (
                  <li key={n} className="flex items-start gap-3 rounded-xl border border-line bg-surface-2/50 px-4 py-3 text-sm text-fg">
                    <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-red-100 text-xs font-bold text-red-600 dark:bg-red-500/15 dark:text-red-400" aria-hidden="true">
                      ✕
                    </span>
                    {n}
                  </li>
                ))}
              </ul>
              <div className="mt-6 flex gap-3 rounded-xl bg-royal-50 p-4 text-sm text-fg dark:bg-royal/15">
                <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-royal dark:text-royal-300" aria-hidden="true" />
                <p>
                  Pay only via our official M-Pesa Paybill <strong>{site.paybill}</strong> or our company bank account. {fees.note}
                </p>
              </div>
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
