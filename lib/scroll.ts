"use client";

import type Lenis from "lenis";

/** Singletons shared between the main React tree and the drei <Html> roots (which have no context). */
export const scroller: { lenis: Lenis | null } = { lenis: null };
export const nav: { push: ((href: string) => void) | null } = { push: null };

export function scrollToY(y: number, immediate = false) {
  if (scroller.lenis) scroller.lenis.scrollTo(y, { immediate, duration: 1.2 });
  else window.scrollTo({ top: y, behavior: immediate ? "auto" : "smooth" });
}

export function scrollToEl(id: string) {
  const el = document.getElementById(id);
  if (!el) return;
  const y = el.getBoundingClientRect().top + window.scrollY;
  scrollToY(y);
}

/** Link handler that works inside detached React roots: client-side navigation, or smooth scroll for #hash. */
export function go(href: string, e?: { preventDefault: () => void }) {
  if (href.startsWith("#")) {
    e?.preventDefault();
    scrollToEl(href.slice(1));
    return;
  }
  if (nav.push && href.startsWith("/")) {
    e?.preventDefault();
    nav.push(href);
  }
}
