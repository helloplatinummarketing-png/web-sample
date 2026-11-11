"use client";

import { create } from "zustand";
import type { ChapterKind, JourneyNode, LatLng, ViewCfg } from "./journey-types";

/**
 * Reactive scene state: changes rarely (chapter switch, active node, quiz answers).
 * React components subscribe to this.
 */
type JourneyState = {
  chapterId: string;
  kind: ChapterKind;
  nodes: JourneyNode[];
  path: string[];
  activeId: string | null;
  /** Nodes lit without the line reaching them (quiz matches, final burst, hovered job) */
  litIds: string[];
  /** Nodes that get an arc straight from the origin (quiz matches, final burst) */
  spokeIds: string[];
  /** Nodes already passed by the line */
  visitedIds: string[];
  fixedFocus: LatLng | null;
  view: ViewCfg;
  mobileView: ViewCfg;
  /** WebGL scene has rendered its first frame */
  ready: boolean;
  set: (s: Partial<Omit<JourneyState, "set">>) => void;
};

export const useJourney = create<JourneyState>((set) => ({
  chapterId: "hero",
  kind: "hero",
  nodes: [],
  path: [],
  activeId: null,
  litIds: [],
  spokeIds: [],
  visitedIds: [],
  fixedFocus: null,
  view: { x: 0, y: 0, zoom: 1 },
  mobileView: { x: 0, y: 0.6, zoom: 0.8 },
  ready: false,
  set: (s) => set(s),
}));

/**
 * Per-frame values written by scroll and read inside useFrame.
 * Kept outside React so scrolling never triggers re-renders.
 */
export const live = {
  /** Line progress in segment units (1.5 = halfway between path[1] and path[2]) */
  line: 0,
  focus: { lat: -1.286, lng: 36.817 } as LatLng,
  /** 0→1 draw progress of spoke arcs */
  spoke: 0,
  /** 0→1 hero "earth rises" intro */
  rise: 0,
  riseStart: -1,
  /** Overall page progress for the top progress bar */
  page: 0,
  pointer: { x: 0, y: 0 },
};

/** Elements that follow projected node positions (mobile docked card connector, hero connector). */
export const screenTargets: {
  dockLine: SVGLineElement | null;
  heroLine: SVGLineElement | null;
  heroAnchor: HTMLElement | null;
} = { dockLine: null, heroLine: null, heroAnchor: null };
