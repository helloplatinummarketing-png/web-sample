"use client";

import { useSyncExternalStore } from "react";

export type Mode = "3d" | "lite";

/** Runs before first paint (inline in <head>): picks the 3D journey or the lite timeline. */
export const modeScript = `(function(){var d=document.documentElement;try{var q=location.search;var m;if(/[?&]lite=1/.test(q))m='lite';else if(/[?&]3d=1/.test(q))m='3d';else{var rm=matchMedia('(prefers-reduced-motion: reduce)').matches;var n=navigator,c=n.connection;var low=(n.deviceMemory&&n.deviceMemory<=2)||(n.hardwareConcurrency&&n.hardwareConcurrency<=2)||(c&&c.saveData);var gl=false;try{var cv=document.createElement('canvas');gl=!!(window.WebGL2RenderingContext&&cv.getContext('webgl2'))||!!cv.getContext('webgl');}catch(e){}m=(rm||low||!gl)?'lite':'3d';}d.dataset.mode=m;if(m==='3d'){try{if(!sessionStorage.getItem('intro')){d.dataset.intro='1';}}catch(e){}}}catch(e){d.dataset.mode='lite';}})();`;

const subscribe = () => () => {};
const read = (): Mode => (document.documentElement.dataset.mode === "3d" ? "3d" : "lite");

/** null during SSR / hydration, then the mode chosen by the head script. */
export function useMode(): Mode | null {
  return useSyncExternalStore(subscribe, read, () => null);
}

export function prefersReducedMotion() {
  return typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}
