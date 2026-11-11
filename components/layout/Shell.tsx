"use client";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";
import { MessageCircle } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { type ReactNode, useEffect } from "react";
import { site } from "@/data/site";
import { whatsappLink } from "@/lib/format";
import { LanguageProvider, useI18n } from "@/lib/i18n";
import { nav, scroller } from "@/lib/scroll";

/** Lenis smooth scroll wired into GSAP's ticker so ScrollTrigger scrubs stay in sync. */
function SmoothScroll() {
  const path = usePathname();
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    gsap.registerPlugin(ScrollTrigger);
    const lenis = new Lenis({ lerp: 0.1, wheelMultiplier: 0.9 });
    scroller.lenis = lenis;
    lenis.on("scroll", ScrollTrigger.update);
    const raf = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(raf);
    gsap.ticker.lagSmoothing(0);
    return () => {
      gsap.ticker.remove(raf);
      lenis.destroy();
      scroller.lenis = null;
    };
  }, []);
  useEffect(() => {
    scroller.lenis?.scrollTo(0, { immediate: true });
  }, [path]);
  return null;
}

/** Lets links inside detached React roots (drei <Html>) use client-side navigation. */
function NavBridge() {
  const router = useRouter();
  useEffect(() => {
    nav.push = (href) => router.push(href);
    return () => {
      nav.push = null;
    };
  }, [router]);
  return null;
}

function WhatsAppButton() {
  const { t } = useI18n();
  return (
    <a
      href={whatsappLink(site.phoneDigits, site.whatsappMessage)}
      target="_blank"
      rel="noopener noreferrer"
      className="group fixed bottom-4 right-4 z-40 inline-flex items-center gap-2 rounded-full bg-[#25D366] p-3.5 text-night-900 shadow-[0_12px_30px_-8px_rgba(37,211,102,0.7)] transition hover:-translate-y-0.5 md:bottom-6 md:right-6 md:px-5"
    >
      <MessageCircle className="h-6 w-6" aria-hidden="true" />
      <span className="sr-only text-sm font-bold md:not-sr-only">{t("cta.chat")}</span>
    </a>
  );
}

export function Shell({ children }: { children: ReactNode }) {
  return (
    <LanguageProvider>
      <SmoothScroll />
      <NavBridge />
      {children}
      <WhatsAppButton />
    </LanguageProvider>
  );
}
