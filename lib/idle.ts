/** Run `cb` once the page has loaded and the main thread is idle. */
export function afterLoadIdle(cb: () => void, timeout = 1500) {
  let cancelled = false;
  const run = () => !cancelled && cb();
  const go = () => {
    const w = window as Window & { requestIdleCallback?: (f: () => void, o?: { timeout: number }) => number };
    if (w.requestIdleCallback) w.requestIdleCallback(run, { timeout });
    else setTimeout(run, 200);
  };
  if (document.readyState === "complete") go();
  else window.addEventListener("load", go, { once: true });
  return () => {
    cancelled = true;
    window.removeEventListener("load", go);
  };
}

/**
 * Run `cb` on the first real interaction (touch, scroll, key, pointer move), or after `timeout` ms
 * of no interaction. Keeps heavy WebGL work off the critical path on phones.
 */
export function onFirstInteraction(cb: () => void, timeout = 6500) {
  let done = false;
  const evs = ["pointerdown", "touchstart", "wheel", "keydown", "scroll", "pointermove"] as const;
  const fire = () => {
    if (done) return;
    done = true;
    cleanup();
    cb();
  };
  const t = window.setTimeout(fire, timeout);
  evs.forEach((e) => window.addEventListener(e, fire, { passive: true, once: true }));
  const cleanup = () => {
    window.clearTimeout(t);
    evs.forEach((e) => window.removeEventListener(e, fire));
  };
  return () => {
    done = true;
    cleanup();
  };
}

/** Desktop-class device: fine pointer and a wide screen. */
export const isDesktopClass = () => window.matchMedia("(pointer: fine) and (min-width: 1024px)").matches;
