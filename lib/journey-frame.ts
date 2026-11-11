import { slerpLatLng, smooth } from "./geo";
import type { Chapter, LatLng } from "./journey-types";

/** Share of each slot spent travelling; the rest holds the node's card open. */
const TRAVEL = 0.42;
/** Lead-in (in slot units) where the chapter intro card sits on the origin node. */
const LEAD = 0.7;

export type Frame = { line: number; focus: LatLng; activeId: string | null; visited: number; spoke: number };

/** Map a chapter's scroll progress (0→1) to line progress, camera focus and the open card. */
export function frameFor(ch: Chapter, p: number): Frame {
  const byId = (id: string) => ch.nodes.find((n) => n.id === id)!;
  const origin = ch.nodes[0];

  if (ch.kind === "timeline") {
    const n = ch.path.length - 1;
    const s = p * (n + LEAD) - LEAD;
    if (s < 0) return { line: 0, focus: origin, activeId: origin.id, visited: 1, spoke: 0 };
    let k = Math.floor(s);
    let t = s - k;
    if (k >= n) {
      k = n - 1;
      t = 1;
    }
    const travel = smooth(t / TRAVEL);
    const arrived = t >= TRAVEL * 0.98;
    return {
      line: k + travel,
      focus: slerpLatLng(byId(ch.path[k]), byId(ch.path[k + 1]), travel),
      activeId: arrived ? ch.path[k + 1] : null,
      visited: k + 1 + (arrived ? 1 : 0),
      spoke: 0,
    };
  }
  if (ch.kind === "pause") return { line: 0, focus: origin, activeId: p > 0.04 ? origin.id : null, visited: 1, spoke: 0 };
  if (ch.kind === "burst") return { line: 0, focus: origin, activeId: p > 0.2 ? origin.id : null, visited: 1, spoke: smooth(p / 0.5) };
  return { line: 0, focus: origin, activeId: origin.id, visited: 1, spoke: 0 };
}

/** Scroll progress (0→1) inside a chapter at which each card is fully open: keyboard "stops". */
export function stopsFor(ch: Chapter): number[] {
  if (ch.kind === "timeline") {
    const n = ch.path.length - 1;
    const at = (s: number) => (s + LEAD) / (n + LEAD);
    return [at(-LEAD / 2), ...Array.from({ length: n }, (_, k) => at(k + (TRAVEL + 1) / 2))];
  }
  if (ch.kind === "hero") return [0];
  return [0.5];
}
