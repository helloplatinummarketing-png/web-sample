"use client";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useRef, useState } from "react";
import { chapters } from "@/data/journey";
import type { Chapter, JourneyNode } from "@/lib/journey-types";
import { frameFor, stopsFor } from "@/lib/journey-frame";
import { live, screenTargets, useJourney } from "@/lib/journey-store";
import { useMode } from "@/lib/mode";
import { scrollToY } from "@/lib/scroll";
import { GlassCard } from "../journey/GlassCard";
import { JourneyGlobe } from "../journey/JourneyGlobe";
import { EligibilityQuiz, QuizGlobeSync } from "./EligibilityQuiz";
import { FinalCard } from "./FinalCard";

const allIds = (c: Chapter) => c.nodes.map((n) => n.id).filter((id) => id !== "nairobi");

function activate(c: Chapter) {
  useJourney.getState().set({
    chapterId: c.id,
    kind: c.kind,
    nodes: c.nodes,
    path: c.path,
    fixedFocus: c.fixedFocus ?? null,
    view: c.view,
    mobileView: c.mobileView,
    activeId: null,
    visitedIds: [],
    litIds: c.kind === "burst" ? allIds(c) : [],
    spokeIds: c.kind === "burst" ? allIds(c) : [],
  });
}

export function renderHomeCard(node: JourneyNode, compact = false) {
  if (node.card === "quiz") return <EligibilityQuiz idPrefix={compact ? "qm" : "q3d"} compact={compact} />;
  if (node.card === "final") return <FinalCard compact={compact} />;
  return <GlassCard node={node} decorative compact={compact} headingLevel="p" />;
}

/**
 * The home page journey: one fixed full-screen <JourneyGlobe /> whose state is scrubbed by
 * GSAP ScrollTrigger from the chapter sections below it.
 */
export function HomeJourney() {
  const mode = useMode();
  const progressRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (mode !== "3d") return;
    activate(chapters[0]);
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      let current = chapters[0];
      const progress: Record<string, number> = {};

      const update = (c: Chapter) => {
        if (current.id !== c.id) return;
        const f = frameFor(c, progress[c.id] ?? 0);
        live.line = f.line;
        live.spoke = f.spoke;
        if (!c.fixedFocus) live.focus = f.focus;
        const s = useJourney.getState();
        const visitedIds = c.path.slice(0, f.visited);
        if (s.activeId !== f.activeId || s.visitedIds.length !== visitedIds.length) {
          s.set({ activeId: f.activeId, visitedIds });
        }
      };

      chapters.forEach((c) => {
        const el = document.getElementById(c.id);
        if (!el) return;
        const proxy = { p: 0 };
        gsap.to(proxy, {
          p: 1,
          ease: "none",
          scrollTrigger: { trigger: el, start: "top top", end: "bottom bottom", scrub: 0.5 },
          onUpdate: () => {
            progress[c.id] = proxy.p;
            update(c);
          },
        });
        ScrollTrigger.create({
          trigger: el,
          start: "top center",
          end: "bottom center",
          onToggle: (self) => {
            if (!self.isActive || current.id === c.id) return;
            current = c;
            activate(c);
            update(c);
          },
        });
      });

      ScrollTrigger.create({
        trigger: "#journey",
        start: "top top",
        end: "bottom bottom",
        onUpdate: (self) => {
          live.page = self.progress;
          if (progressRef.current) progressRef.current.style.transform = `scaleX(${self.progress.toFixed(4)})`;
        },
      });
    });
    return () => ctx.revert();
  }, [mode]);

  // Keyboard: arrow keys jump between nodes
  useEffect(() => {
    if (mode !== "3d") return;
    const onKey = (e: KeyboardEvent) => {
      const el = e.target as HTMLElement;
      if (e.altKey || e.ctrlKey || e.metaKey || el.closest("input, textarea, select, [contenteditable]")) return;
      const dir = e.key === "ArrowDown" || e.key === "ArrowRight" ? 1 : e.key === "ArrowUp" || e.key === "ArrowLeft" ? -1 : 0;
      if (!dir) return;
      const stops: number[] = [];
      chapters.forEach((c) => {
        const sec = document.getElementById(c.id);
        if (!sec) return;
        const top = sec.getBoundingClientRect().top + window.scrollY;
        const len = Math.max(0, sec.offsetHeight - window.innerHeight);
        stopsFor(c).forEach((p) => stops.push(Math.round(top + p * len)));
      });
      const y = window.scrollY;
      const target = dir > 0 ? stops.find((s) => s > y + 8) : [...stops].reverse().find((s) => s < y - 8);
      if (target === undefined) return;
      e.preventDefault();
      scrollToY(target);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [mode]);

  // Hero "earth rise" starts when the scene is ready and the intro loader has finished
  const ready = useJourney((s) => s.ready);
  useEffect(() => {
    if (!ready || live.riseStart > 0) return;
    const start = () => {
      if (live.riseStart < 0) live.riseStart = performance.now();
    };
    if (document.documentElement.dataset.intro === "1") {
      window.addEventListener("intro:done", start, { once: true });
      return () => window.removeEventListener("intro:done", start);
    }
    start();
  }, [ready]);

  // Pointer parallax
  useEffect(() => {
    if (mode !== "3d") return;
    const onMove = (e: PointerEvent) => {
      live.pointer.x = (e.clientX / window.innerWidth) * 2 - 1;
      live.pointer.y = (e.clientY / window.innerHeight) * 2 - 1;
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, [mode]);

  if (mode !== "3d") return null;

  return (
    <>
      <QuizGlobeSync />
      <JourneyGlobe
        variant="full"
        cards
        renderCard={(node) => renderHomeCard(node)}
        className="fixed inset-0 z-0"
        posterClassName="left-1/2 top-[75%] h-[min(58vh,70vw)] w-[min(58vh,70vw)] -translate-x-1/2 -translate-y-1/2 md:left-[72.5%] md:top-[52%] md:h-[75vh] md:w-[75vh]"
      />
      {/* top progress bar mirrors the journey */}
      <div className="pointer-events-none fixed inset-x-0 top-0 z-[55] h-[3px] bg-white/5" aria-hidden="true">
        <div ref={progressRef} className="h-full origin-left bg-gradient-to-r from-jade via-coral to-coral-300" style={{ transform: "scaleX(0)" }} />
      </div>
      <ChapterTag />
      <HeroConnector />
      <DockedCard />
    </>
  );
}

/** Small mono chapter indicator under the progress bar. */
function ChapterTag() {
  const chapterId = useJourney((s) => s.chapterId);
  const activeId = useJourney((s) => s.activeId);
  const c = chapters.find((x) => x.id === chapterId);
  if (!c || c.kind === "hero") return null;
  const idx = c.path.indexOf(activeId ?? "");
  const total = c.path.length - 1;
  return (
    <div className="pointer-events-none fixed right-4 top-20 z-40 hidden font-mono text-[11px] uppercase tracking-[0.18em] text-jade-300 md:block" aria-hidden="true">
      <span className="text-coral-300">{c.number}</span> · {c.id === "how" ? "How it works" : c.id === "final" ? "Apply" : c.id}
      {c.kind === "timeline" && idx > 0 && (
        <span className="ml-3 text-sand/70">
          {String(idx).padStart(2, "0")} / {String(total).padStart(2, "0")}
        </span>
      )}
    </div>
  );
}

/** A thin line from the hero headline to the Nairobi node. */
function HeroConnector() {
  const chapterId = useJourney((s) => s.chapterId);
  const ready = useJourney((s) => s.ready);
  return (
    <svg
      className={`pointer-events-none fixed inset-0 z-[1] h-full w-full transition-opacity duration-500 ${chapterId === "hero" && ready ? "opacity-100" : "opacity-0"}`}
      aria-hidden="true"
    >
      <line
        ref={(el) => {
          screenTargets.heroLine = el;
        }}
        stroke="#5fd3a8"
        strokeWidth="1"
        strokeDasharray="3 4"
        style={{ opacity: 0 }}
      />
    </svg>
  );
}

/** Mobile: the active card docks to the bottom of the screen with a connector up to its node. */
function DockedCard() {
  const activeId = useJourney((s) => s.activeId);
  const nodes = useJourney((s) => s.nodes);
  const chapterId = useJourney((s) => s.chapterId);
  const [last, setLast] = useState<JourneyNode | null>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const node = nodes.find((n) => n.id === activeId && n.card !== "none") ?? null;
  useEffect(() => {
    if (node) setLast(node);
  }, [node]);
  const open = !!node && chapterId !== "hero";
  const shown = node ?? last;

  useEffect(() => {
    let raf = 0;
    const tick = () => {
      const line = screenTargets.dockLine;
      if (line && cardRef.current) {
        const r = cardRef.current.getBoundingClientRect();
        line.setAttribute("x1", String(r.left + 28));
        line.setAttribute("y1", String(r.top));
      }
      raf = requestAnimationFrame(tick);
    };
    if (window.innerWidth < 768) raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <div className="md:hidden" data-open={open}>
      <svg className="pointer-events-none fixed inset-0 z-[2] h-full w-full" aria-hidden="true">
        <line
          ref={(el) => {
            screenTargets.dockLine = el;
          }}
          stroke="#5fd3a8"
          strokeWidth="1"
          className="transition-opacity duration-300"
          style={{ opacity: open ? 0.9 : 0 }}
        />
      </svg>
      <div className="pointer-events-none fixed inset-x-3 bottom-[4.75rem] z-30 flex justify-center">
        <div
          ref={cardRef}
          className="jcard max-h-[50svh] w-full max-w-md overflow-y-auto rounded-3xl"
          style={{ transformOrigin: "28px 0%", pointerEvents: open ? "auto" : "none" }}
          data-open={open}
          data-lenis-prevent
        >
          {shown && renderHomeCard(shown, true)}
        </div>
      </div>
    </div>
  );
}
