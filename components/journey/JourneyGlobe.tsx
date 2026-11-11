"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { afterLoadIdle, isDesktopClass, onFirstInteraction } from "@/lib/idle";
import type { JourneyNode, LatLng, ViewCfg } from "@/lib/journey-types";
import { live, useJourney } from "@/lib/journey-store";
import { prefersReducedMotion, useMode } from "@/lib/mode";
import type { RenderCard } from "./three/NodesLayer";

const Scene = dynamic(() => import("./three/Scene"), { ssr: false, loading: () => null });

export type JourneyGlobeProps = {
  /** "full" = fixed full-screen home canvas, "mini" = small embedded globe */
  variant?: "full" | "mini";
  /** Data-driven: when given, these are pushed into the shared journey store */
  nodes?: JourneyNode[];
  path?: string[];
  activeId?: string | null;
  litIds?: string[];
  spokeIds?: string[];
  visitedIds?: string[];
  /** Line progress in segment units */
  line?: number;
  focus?: LatLng;
  view?: ViewCfg;
  /** Render anchored cards (home) */
  cards?: boolean;
  renderCard?: RenderCard;
  /** Load as soon as possible instead of waiting for idle */
  eager?: boolean;
  className?: string;
  posterClassName?: string;
};

/**
 * <JourneyGlobe />: a 3D Earth with milestone nodes, a scroll-driven progress line and
 * anchored content cards. Lazy-loads the WebGL scene; shows a static globe until it's ready
 * (and permanently in lite mode: low-end devices, reduced motion, no WebGL).
 */
export function JourneyGlobe({
  variant = "full",
  nodes,
  path,
  activeId,
  litIds,
  spokeIds,
  visitedIds,
  line,
  focus,
  view,
  cards = false,
  renderCard,
  eager = false,
  className = "",
  posterClassName = "",
}: JourneyGlobeProps) {
  const mode = useMode();
  const ready = useJourney((s) => s.ready);
  const [load, setLoad] = useState(false);
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    if (mode !== "3d") return;
    setReduced(prefersReducedMotion());
    if (eager) {
      setLoad(true);
      return;
    }
    // desktop: as soon as the page is idle. Phones/tablets: on first interaction, so the main thread stays free during load
    return isDesktopClass() ? afterLoadIdle(() => setLoad(true), 1200) : onFirstInteraction(() => setLoad(true));
  }, [mode, eager]);

  useEffect(() => () => useJourney.getState().set({ ready: false }), []);

  // push props into the store (pages other than home drive the globe this way)
  const set = useJourney((s) => s.set);
  const key = JSON.stringify([nodes?.map((n) => n.id), path, activeId, litIds, spokeIds, visitedIds, view]);
  useEffect(() => {
    const patch: Parameters<typeof set>[0] = {};
    if (nodes) {
      patch.nodes = nodes;
      patch.chapterId = variant;
    }
    if (path) patch.path = path;
    if (activeId !== undefined) patch.activeId = activeId;
    if (litIds) patch.litIds = litIds;
    if (spokeIds) patch.spokeIds = spokeIds;
    if (visitedIds) patch.visitedIds = visitedIds;
    if (view) {
      patch.view = view;
      patch.mobileView = view;
    }
    if (Object.keys(patch).length) set(patch);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key]);
  useEffect(() => {
    if (line !== undefined) live.line = line;
  }, [line]);
  useEffect(() => {
    if (focus) {
      live.focus = focus;
      useJourney.getState().set({ fixedFocus: null });
    }
  }, [focus?.lat, focus?.lng]); // eslint-disable-line react-hooks/exhaustive-deps

  const show3d = mode === "3d" && load;

  return (
    <div className={className}>
      <div
        aria-hidden="true"
        className={`pointer-events-none absolute transition-opacity duration-1000 ${ready && show3d ? "opacity-0" : "opacity-100"} ${posterClassName}`}
      >
        <div className="poster-globe h-full w-full" />
      </div>
      {show3d && (
        <div className={`absolute inset-0 transition-opacity duration-1000 ${ready ? "opacity-100" : "opacity-0"}`}>
          <Scene variant={variant} cards={cards} renderCard={renderCard} reduced={reduced} />
        </div>
      )}
    </div>
  );
}
