"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { site } from "@/data/site";
import { useI18n } from "@/lib/i18n";
import { whatsappLink } from "@/lib/format";
import { Container, btn } from "./ui/primitives";
import { Reveal } from "./ui/Reveal";
import { WhatsAppIcon } from "./ui/SocialIcons";

export function CtaBand() {
  const { t } = useI18n();
  return (
    <section className="pb-20 pt-6 sm:pb-28" aria-labelledby="cta-title">
      <Container>
        <Reveal className="relative isolate overflow-hidden rounded-[28px] bg-navy px-6 py-14 text-center shadow-2xl shadow-navy/30 sm:px-12 sm:py-20">
          <div aria-hidden="true" className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,rgba(40,71,217,0.55),transparent_60%)]" />
          <div aria-hidden="true" className="absolute -bottom-24 left-1/2 -z-10 h-64 w-[640px] -translate-x-1/2 rounded-full bg-gold/20 blur-3xl" />
          <div aria-hidden="true" className="mx-auto mb-6 h-px w-24 bg-gradient-to-r from-transparent via-gold to-transparent" />
          <h2 id="cta-title" className="mx-auto max-w-2xl text-3xl font-bold leading-tight text-white sm:text-[2.6rem]">
            {t("band.title")}
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-lg text-white/75">{t("band.body")}</p>
          <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row">
            <Link href="/apply" className={btn("gold", "px-7 py-3.5 text-base")}>
              {t("cta.start")} <ArrowRight className="h-5 w-5" aria-hidden="true" />
            </Link>
            <a
              href={whatsappLink(site.phoneDigits, site.whatsappMessage)}
              target="_blank"
              rel="noopener noreferrer"
              className={btn("ghost", "px-7 py-3.5 text-base text-white ring-1 ring-white/25 hover:bg-white/10")}
            >
              <WhatsAppIcon className="h-5 w-5" /> {t("cta.advisor")}
            </a>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
