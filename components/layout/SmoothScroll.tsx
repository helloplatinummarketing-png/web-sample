"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import Lenis from "lenis";

type W = Window & { __lenis?: Lenis };
const OFFSET = -88;

/** Lenis smooth scrolling. Skipped entirely when the user prefers reduced motion. */
export function SmoothScroll() {
  const pathname = usePathname();

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const lenis = new Lenis({ duration: 1.05, anchors: { offset: OFFSET } });
    let raf = 0;
    const loop = (time: number) => {
      lenis.raf(time);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    (window as W).__lenis = lenis;
    return () => {
      cancelAnimationFrame(raf);
      lenis.destroy();
      (window as W).__lenis = undefined;
    };
  }, []);

  // After client-side navigation: go to the #hash target if present, otherwise the top.
  useEffect(() => {
    const lenis = (window as W).__lenis;
    const hash = window.location.hash;
    if (hash.length > 1) {
      const id = requestAnimationFrame(() => {
        const el = document.getElementById(decodeURIComponent(hash.slice(1)));
        if (!el) return;
        if (lenis) lenis.scrollTo(el, { offset: OFFSET });
        else el.scrollIntoView();
      });
      return () => cancelAnimationFrame(id);
    }
    if (lenis) lenis.scrollTo(0, { immediate: true });
  }, [pathname]);

  return null;
}
