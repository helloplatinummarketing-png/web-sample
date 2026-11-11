"use client";

import { Menu, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { navLinks } from "@/data/site";
import { useI18n } from "@/lib/i18n";
import { btn } from "../ui/primitives";
import { Logo } from "./Logo";

export function Navbar() {
  const { t, lang, setLang } = useI18n();
  const path = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => setOpen(false), [path]);
  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 12);
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const LangToggle = (
    <button
      type="button"
      onClick={() => setLang(lang === "en" ? "sw" : "en")}
      aria-label={`${t("ui.lang")}: ${lang === "en" ? "Kiswahili" : "English"}`}
      className="inline-flex h-9 items-center rounded-full border border-jade/50 px-1 font-mono text-[11px] font-semibold"
    >
      <span className={`rounded-full px-2 py-1 transition ${lang === "en" ? "bg-coral text-night-900" : "text-sand/70"}`}>EN</span>
      <span className={`rounded-full px-2 py-1 transition ${lang === "sw" ? "bg-coral text-night-900" : "text-sand/70"}`}>SW</span>
    </button>
  );

  return (
    <header className={`fixed inset-x-0 top-0 z-50 transition duration-300 ${scrolled || open ? "bg-night-950/80 backdrop-blur-xl" : ""}`}>
      <a href="#main" className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-full focus:bg-coral focus:px-4 focus:py-2 focus:font-bold focus:text-night-900">
        Skip to content
      </a>
      <nav aria-label="Main" className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        <Logo />
        <ul className="hidden items-center gap-1 lg:flex">
          {navLinks.map((l) => {
            const active = l.href === "/" ? path === "/" : path.startsWith(l.href);
            return (
              <li key={l.href}>
                <Link
                  href={l.href}
                  aria-current={active ? "page" : undefined}
                  className={`rounded-full px-3.5 py-2 text-sm font-semibold transition ${active ? "text-coral" : "text-sand/85 hover:text-ivory"}`}
                >
                  {t(l.key)}
                </Link>
              </li>
            );
          })}
        </ul>
        <div className="flex items-center gap-2">
          {LangToggle}
          <Link href="/apply" className={btn("primary", "whitespace-nowrap px-5 py-2.5 max-sm:!hidden")}>
            {t("cta.apply")}
          </Link>
          <button
            type="button"
            className="grid h-10 w-10 place-items-center rounded-full border border-jade/50 lg:hidden"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? t("ui.menu.close") : t("ui.menu.open")}
            onClick={() => setOpen((o) => !o)}
          >
            {open ? <X className="h-5 w-5" aria-hidden="true" /> : <Menu className="h-5 w-5" aria-hidden="true" />}
          </button>
        </div>
      </nav>
      {open && (
        <div id="mobile-menu" className="border-t border-jade/20 bg-night-950/95 px-4 pb-6 pt-2 backdrop-blur-xl lg:hidden">
          <ul className="space-y-1">
            {navLinks.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="block rounded-xl px-3 py-3 text-base font-semibold text-sand hover:bg-white/5">
                  {t(l.key)}
                </Link>
              </li>
            ))}
          </ul>
          <Link href="/apply" className={btn("primary", "mt-4 w-full")}>
            {t("cta.apply")}
          </Link>
        </div>
      )}
    </header>
  );
}
