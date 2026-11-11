"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { AnimatePresence, m } from "framer-motion";
import { ArrowRight, Menu, X } from "lucide-react";
import { navLinks } from "@/data/site";
import { useI18n } from "@/lib/i18n";
import { Container, btn } from "../ui/primitives";
import { Logo } from "./Logo";
import { LanguageToggle, ThemeToggle } from "./Toggles";

export function Navbar() {
  const pathname = usePathname();
  const { t } = useI18n();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [prevPath, setPrevPath] = useState(pathname);

  if (prevPath !== pathname) {
    setPrevPath(pathname);
    setOpen(false);
  }

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const isActive = (href: string) => (href === "/" ? pathname === "/" : !href.includes("#") && pathname.startsWith(href));

  return (
    <header
      className={`sticky top-0 z-50 border-b transition-all duration-300 ${
        scrolled || open
          ? "border-line bg-bg/75 shadow-[0_8px_30px_-12px_rgba(11,27,63,0.18)] backdrop-blur-xl backdrop-saturate-150"
          : "border-transparent bg-bg/40 backdrop-blur-md"
      }`}
    >
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-3 focus:z-50 focus:rounded-lg focus:bg-gold focus:px-4 focus:py-2 focus:font-semibold focus:text-navy"
      >
        Skip to main content
      </a>
      <Container className="flex h-16 items-center justify-between gap-3 lg:h-[72px]">
        <Logo />

        <nav aria-label="Main" className="hidden xl:block">
          <ul className="flex items-center gap-0.5">
            {navLinks.map((l) => {
              const active = isActive(l.href);
              return (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    aria-current={active ? "page" : undefined}
                    className={`relative block rounded-lg px-3.5 py-2 text-sm font-medium transition-colors ${
                      active ? "text-fg" : "text-muted hover:text-fg"
                    }`}
                  >
                    {t(l.key)}
                    {active && (
                      <m.span
                        layoutId="nav-underline"
                        className="absolute inset-x-3 -bottom-px h-0.5 rounded-full bg-gold"
                        transition={{ type: "spring", stiffness: 400, damping: 32 }}
                      />
                    )}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <div className="hidden items-center gap-2 sm:flex">
            <LanguageToggle />
            <ThemeToggle />
          </div>
          <Link href="/apply" className={btn("gold", "px-3.5 py-2.5 sm:px-4")}>
            {t("cta.apply")} <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
          <button
            type="button"
            className="grid h-10 w-10 place-items-center rounded-xl border border-line bg-surface/70 text-fg xl:hidden"
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? t("ui.menu.close") : t("ui.menu.open")}
            onClick={() => setOpen((o) => !o)}
          >
            {open ? <X className="h-5 w-5" aria-hidden="true" /> : <Menu className="h-5 w-5" aria-hidden="true" />}
          </button>
        </div>
      </Container>

      <AnimatePresence>
        {open && (
          <m.nav
            id="mobile-nav"
            aria-label="Mobile"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="overflow-hidden border-t border-line xl:hidden"
          >
            <Container className="pb-5 pt-3">
              <ul className="grid gap-1">
                {navLinks.map((l) => (
                  <li key={l.href}>
                    <Link
                      href={l.href}
                      aria-current={isActive(l.href) ? "page" : undefined}
                      className={`flex items-center justify-between rounded-xl px-4 py-3 text-base font-medium ${
                        isActive(l.href) ? "bg-surface-2 text-fg" : "text-muted hover:bg-surface-2 hover:text-fg"
                      }`}
                    >
                      {t(l.key)}
                      {isActive(l.href) && <span className="h-1.5 w-1.5 rounded-full bg-gold" aria-hidden="true" />}
                    </Link>
                  </li>
                ))}
              </ul>
              <div className="mt-4 flex items-center gap-2 sm:hidden">
                <LanguageToggle />
                <ThemeToggle />
              </div>
              <Link href="/apply" className={btn("gold", "mt-4 w-full sm:hidden")}>
                {t("cta.apply")} <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </Container>
          </m.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
