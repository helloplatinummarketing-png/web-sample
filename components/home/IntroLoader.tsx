"use client";

import { useEffect, useRef, useState } from "react";
import { isDesktopClass } from "@/lib/idle";

const R = 92;
const C = 2 * Math.PI * R;
const MIN_MS = 1500;
const MIN_MS_MOBILE = 900;
const MAX_MS = 6000;

/**
 * First-visit intro: the coral line draws a full circle around a wireframe globe while the
 * 3D scene and Earth textures load, with a live percentage. Then the hero begins.
 * Shown only in 3D mode, once per session (CSS keeps it hidden otherwise).
 */
export function IntroLoader() {
  const [gone, setGone] = useState(false);
  const [leaving, setLeaving] = useState(false);
  const arc = useRef<SVGCircleElement>(null);
  const num = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const root = document.documentElement;
    if (root.dataset.intro !== "1") {
      setGone(true);
      return;
    }
    let target = 8;
    let shown = 0;
    let raf = 0;
    const t0 = performance.now();
    const minMs = isDesktopClass() ? MIN_MS : MIN_MS_MOBILE;
    const bump = (n: number) => (target = Math.min(100, target + n));

    const tex = window.innerWidth >= 768 ? "2k" : "1k";
    // desktop preloads the 3D chunk during the intro; phones load it on first interaction
    if (isDesktopClass()) import("../journey/three/Scene").then(() => bump(40));
    else bump(40);
    [`/textures/earth-day-${tex}.webp`, `/textures/earth-night-${tex}.webp`].forEach((src) => {
      const img = new Image();
      img.onload = img.onerror = () => bump(26);
      img.src = src;
    });

    const finish = () => {
      setLeaving(true);
      try {
        sessionStorage.setItem("intro", "1");
      } catch {}
      window.setTimeout(() => {
        delete root.dataset.intro;
        window.dispatchEvent(new Event("intro:done"));
        setGone(true);
      }, 650);
    };

    const tick = (now: number) => {
      const elapsed = now - t0;
      // never run ahead of real progress; ease so it always feels alive
      const cap = Math.min(target, (elapsed / minMs) * 100);
      shown += (cap - shown) * 0.12;
      if (elapsed > MAX_MS) shown = 100;
      const p = shown > 99.5 ? 100 : shown;
      if (arc.current) arc.current.style.strokeDashoffset = String(C * (1 - p / 100));
      if (num.current) num.current.textContent = String(Math.round(p)).padStart(2, "0");
      if (p >= 100) {
        finish();
        return;
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  if (gone) return null;

  return (
    <div
      className={`intro-loader fixed inset-0 z-[80] place-items-center bg-night-950 transition-opacity duration-700 ${leaving ? "pointer-events-none opacity-0" : "opacity-100"}`}
      role="status"
      aria-label="Loading the journey"
    >
      <div className={`relative grid place-items-center transition-transform duration-700 ${leaving ? "scale-110" : ""}`}>
        <svg width="240" height="240" viewBox="-120 -120 240 240" aria-hidden="true">
          <g fill="none" stroke="#0e9f6e" strokeOpacity="0.45" strokeWidth="0.8">
            <circle r="70" />
            <ellipse rx="70" ry="24" />
            <ellipse rx="70" ry="50" />
            <ellipse rx="24" ry="70" />
            <ellipse rx="50" ry="70" />
            <line x1="-70" x2="70" />
            <line y1="-70" y2="70" />
          </g>
          <circle r={R} fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="2" />
          <circle
            ref={arc}
            r={R}
            fill="none"
            stroke="#ff6b4a"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeDasharray={C}
            strokeDashoffset={C}
            transform="rotate(-90)"
            style={{ filter: "drop-shadow(0 0 6px rgba(255,107,74,0.9))" }}
          />
          <circle cx="0" cy={-R} r="4" fill="#ff6b4a" />
        </svg>
        <div className="absolute text-center">
          <span ref={num} className="font-mono text-3xl font-semibold text-ivory">
            00
          </span>
          <span className="font-mono text-sm text-coral">%</span>
        </div>
      </div>
      <p className="absolute bottom-10 font-mono text-[11px] uppercase tracking-[0.3em] text-jade-300">Plotting your route from Nairobi</p>
    </div>
  );
}
