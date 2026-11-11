"use client";

import { m } from "framer-motion";
import { site } from "@/data/site";
import { useI18n } from "@/lib/i18n";
import { whatsappLink } from "@/lib/format";
import { WhatsAppIcon } from "../ui/SocialIcons";

export function WhatsAppButton() {
  const { t } = useI18n();
  return (
    <div className="group fixed bottom-5 right-5 z-50 flex items-center gap-3 sm:bottom-6 sm:right-6">
      <span
        role="tooltip"
        id="wa-tip"
        className="pointer-events-none hidden translate-x-2 rounded-xl bg-navy px-3.5 py-2 text-sm font-medium text-white opacity-0 shadow-xl ring-1 ring-gold/30 transition duration-200 group-focus-within:translate-x-0 group-focus-within:opacity-100 group-hover:translate-x-0 group-hover:opacity-100 sm:block"
      >
        {t("cta.chat")}
        <span className="ml-1.5 inline-block h-2 w-2 rounded-full bg-success align-middle" aria-hidden="true" />
      </span>
      <m.a
        href={whatsappLink(site.phoneDigits, site.whatsappMessage)}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`${t("cta.chat")} on WhatsApp (opens in a new tab)`}
        aria-describedby="wa-tip"
        initial={{ scale: 0.6, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.8, type: "spring", stiffness: 260, damping: 18 }}
        whileHover={{ scale: 1.06 }}
        whileTap={{ scale: 0.95 }}
        className="relative grid h-14 w-14 place-items-center rounded-full bg-[#25D366] text-white shadow-xl shadow-black/25"
      >
        <span aria-hidden="true" className="absolute inset-0 -z-10 animate-ping rounded-full bg-[#25D366] opacity-25 motion-reduce:hidden" />
        <WhatsAppIcon className="h-7 w-7" />
      </m.a>
    </div>
  );
}
