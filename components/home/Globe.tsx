"use client";

import { useEffect, useRef } from "react";
import { geoDistance, geoGraticule10, geoInterpolate, geoOrthographic, geoPath } from "d3-geo";
import { feature } from "topojson-client";
import type { GeometryCollection, Topology } from "topojson-specification";
import landTopo from "world-atlas/land-110m.json";
import { NAIROBI, destinations } from "@/data/destinations";

type LonLat = [number, number];

/**
 * Canvas globe: rotating orthographic projection with glowing great-circle arcs
 * from Nairobi to each destination city. Drag to spin. Static when reduced motion is on.
 */
export default function Globe() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const topo = landTopo as unknown as Topology<{ land: GeometryCollection }>;
    const land = feature(topo, topo.objects.land);
    const graticule = geoGraticule10();
    const projection = geoOrthographic().clipAngle(90).precision(1.5);
    const path = geoPath(projection, ctx);
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // Pre-compute great-circle points once; per frame we only project them.
    const STEPS = 48;
    const arcs = destinations.map((d, i) => {
      const interp = geoInterpolate(NAIROBI, d.coords);
      return {
        d,
        points: Array.from({ length: STEPS + 1 }, (_, k) => interp(k / STEPS) as LonLat),
        dist: geoDistance(NAIROBI, d.coords),
        offset: i / destinations.length,
      };
    });
    const FRAME_MS = 1000 / 24; // cap at ~24fps: smooth for a slow spin, far less CPU
    let lastDraw = 0;
    // Static background (atmosphere + ocean) is rendered once per resize to an offscreen canvas.
    const bg = document.createElement("canvas");

    let size = 0;
    let dpr = 1;
    let lambda = -28; // centre roughly on East Africa / Europe
    const phi = -16;
    let raf = 0;
    let last = performance.now();
    let running = true;
    let animating = false; // rotation starts on first interaction or after a short delay
    let dragging = false;
    let lastX = 0;

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      size = rect.width;
      dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      canvas.width = Math.round(size * dpr);
      canvas.height = Math.round(size * dpr);
      projection.scale(size / 2 - 8).translate([size / 2, size / 2]);

      bg.width = canvas.width;
      bg.height = canvas.height;
      const b = bg.getContext("2d");
      if (!b) return;
      const c = size / 2;
      const r = size / 2 - 8;
      b.setTransform(dpr, 0, 0, dpr, 0, 0);
      const glow = b.createRadialGradient(c, c, r * 0.9, c, c, r * 1.12);
      glow.addColorStop(0, "rgba(40,71,217,0.35)");
      glow.addColorStop(1, "rgba(40,71,217,0)");
      b.fillStyle = glow;
      b.fillRect(0, 0, size, size);
      const ocean = b.createRadialGradient(c - r * 0.35, c - r * 0.4, r * 0.1, c, c, r);
      ocean.addColorStop(0, "#1d3c94");
      ocean.addColorStop(1, "#0a1a45");
      b.beginPath();
      b.arc(c, c, r, 0, Math.PI * 2);
      b.fillStyle = ocean;
      b.fill();
      b.strokeStyle = "rgba(245,184,65,0.35)";
      b.lineWidth = 1;
      b.stroke();
    };

    const visible = (p: LonLat, center: LonLat) => geoDistance(p, center) < Math.PI / 2 - 0.03;

    const drawArc = (
      a: (typeof arcs)[number],
      from: number,
      to: number,
      center: LonLat,
      c: number,
      style: string,
      width: number,
    ) => {
      const lift = 0.06 + 0.12 * (a.dist / Math.PI);
      ctx.beginPath();
      let pen = false;
      const i0 = Math.floor(from * STEPS);
      const i1 = Math.ceil(to * STEPS);
      for (let i = i0; i <= i1; i++) {
        const s = i / STEPS;
        const pt = a.points[i];
        if (!visible(pt, center)) {
          pen = false;
          continue;
        }
        const proj = projection(pt);
        if (!proj) continue;
        const h = 1 + Math.sin(Math.PI * s) * lift;
        const x = c + (proj[0] - c) * h;
        const y = c + (proj[1] - c) * h;
        if (pen) ctx.lineTo(x, y);
        else ctx.moveTo(x, y);
        pen = true;
      }
      ctx.strokeStyle = style;
      ctx.lineWidth = width;
      ctx.stroke();
    };

    type Label = { x: number; y: number; text: string; hub: boolean };
    const drawCity = (p: LonLat, center: LonLat, label: string, hub: boolean, t: number, labels: Label[]) => {
      if (!visible(p, center)) return;
      const proj = projection(p);
      if (!proj) return;
      labels.push({ x: proj[0], y: proj[1], text: label, hub });
      const [x, y] = proj;
      const pulse = reduce ? 0.5 : (t * 0.8 + (hub ? 0 : p[0] / 90)) % 1;
      ctx.beginPath();
      ctx.arc(x, y, (hub ? 6 : 4) + pulse * (hub ? 14 : 9), 0, Math.PI * 2);
      ctx.strokeStyle = `rgba(245,184,65,${0.55 * (1 - pulse)})`;
      ctx.lineWidth = 1.2;
      ctx.stroke();
      // soft halo (cheap alternative to shadowBlur)
      ctx.beginPath();
      ctx.arc(x, y, hub ? 9 : 6, 0, Math.PI * 2);
      ctx.fillStyle = "rgba(245,184,65,0.22)";
      ctx.fill();
      ctx.beginPath();
      ctx.arc(x, y, hub ? 4.5 : 3, 0, Math.PI * 2);
      ctx.fillStyle = hub ? "#F5B841" : "#FFE3A3";
      ctx.fill();
    };

    /** Place labels without overlaps: try a few positions around each dot, skip if none fit. Hub first. */
    const drawLabels = (labels: Label[]) => {
      const placed: { x: number; y: number; w: number; h: number }[] = [];
      const hit = (a: { x: number; y: number; w: number; h: number }) =>
        placed.some((b) => a.x < b.x + b.w && a.x + a.w > b.x && a.y < b.y + b.h && a.y + a.h > b.y);
      labels.sort((a, b) => Number(b.hub) - Number(a.hub));
      for (const l of labels) {
        ctx.font = `${l.hub ? 700 : 600} ${l.hub ? 12 : 11}px Inter, system-ui, sans-serif`;
        const w = ctx.measureText(l.text).width;
        const h = 12;
        const candidates = [
          { x: l.x + 8, y: l.y - 16 },
          { x: l.x - w - 8, y: l.y - 16 },
          { x: l.x + 8, y: l.y + 4 },
          { x: l.x - w - 8, y: l.y + 4 },
        ];
        const spot = candidates.map((c) => ({ ...c, w: w + 4, h: h + 2 })).find((c) => !hit(c) && c.x > 2 && c.x + c.w < size - 2);
        if (!spot) continue;
        placed.push(spot);
        ctx.fillStyle = l.hub ? "#F5B841" : "rgba(255,255,255,0.85)";
        ctx.fillText(l.text, spot.x, spot.y + h - 1);
      }
    };

    const draw = (now: number) => {
      if (!reduce && running && animating && now - lastDraw < FRAME_MS) {
        raf = requestAnimationFrame(draw);
        return;
      }
      lastDraw = now;
      const dt = Math.min(now - last, 64);
      last = now;
      if (!reduce && !dragging) lambda += dt * 0.0055;
      projection.rotate([lambda, phi]);
      const center: LonLat = [-lambda, -phi];
      const c = size / 2;
      const t = now / 1000;

      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(bg, 0, 0);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      ctx.beginPath();
      path(graticule);
      ctx.strokeStyle = "rgba(159,176,246,0.09)";
      ctx.lineWidth = 0.6;
      ctx.stroke();

      ctx.beginPath();
      path(land);
      ctx.fillStyle = "rgba(111,134,240,0.32)";
      ctx.fill();
      ctx.strokeStyle = "rgba(159,176,246,0.5)";
      ctx.lineWidth = 0.5;
      ctx.stroke();

      // arcs: faint full route + bright travelling comet
      for (const a of arcs) {
        drawArc(a, 0, 1, center, c, reduce ? "rgba(245,184,65,0.75)" : "rgba(245,184,65,0.22)", reduce ? 1.6 : 1.1);
        if (!reduce) {
          const p = (t / 3.6 + a.offset) % 1;
          const head = Math.min(1, p * 1.25);
          const tail = Math.max(0, head - 0.28);
          // layered strokes give the glow without expensive shadowBlur
          drawArc(a, tail, head, center, c, "rgba(245,184,65,0.25)", 6);
          drawArc(a, tail, head, center, c, "rgba(255,215,130,0.95)", 2);
        }
      }

      const labels: Label[] = [];
      for (const d of destinations) drawCity(d.coords, center, d.city, false, t, labels);
      drawCity(NAIROBI, center, "Nairobi", true, t, labels);
      drawLabels(labels);

      if (!reduce && running && animating) raf = requestAnimationFrame(draw);
    };

    const start = () => {
      cancelAnimationFrame(raf);
      last = performance.now();
      raf = requestAnimationFrame(draw);
    };

    const ro = new ResizeObserver(() => {
      resize();
      if (reduce) requestAnimationFrame(draw);
    });
    ro.observe(canvas);
    resize();
    requestAnimationFrame(draw); // first still frame

    // Begin rotating once the visitor interacts (or after 4s), keeping page start-up light.
    const kickEvents = ["pointerdown", "pointermove", "scroll", "keydown", "touchstart", "wheel"] as const;
    const startLoop = () => {
      if (animating || reduce) return;
      animating = true;
      kickEvents.forEach((ev) => window.removeEventListener(ev, startLoop));
      if (running) start();
    };
    kickEvents.forEach((ev) => window.addEventListener(ev, startLoop, { passive: true, once: true }));
    const kickTimer = window.setTimeout(startLoop, 4000);

    // Pause when off-screen or the tab is hidden (saves battery on phones).
    const io = new IntersectionObserver(([entry]) => {
      running = entry.isIntersecting && !document.hidden;
      if (running && animating && !reduce) start();
      else cancelAnimationFrame(raf);
    });
    io.observe(canvas);
    const onVis = () => {
      running = !document.hidden;
      if (running && animating && !reduce) start();
      else cancelAnimationFrame(raf);
    };
    document.addEventListener("visibilitychange", onVis);

    // Drag to rotate
    const onDown = (e: PointerEvent) => {
      dragging = true;
      lastX = e.clientX;
      canvas.setPointerCapture(e.pointerId);
    };
    const onMove = (e: PointerEvent) => {
      if (!dragging) return;
      lambda += (e.clientX - lastX) * 0.35;
      lastX = e.clientX;
      if (reduce || !animating) requestAnimationFrame(draw);
    };
    const onUp = () => {
      dragging = false;
    };
    canvas.addEventListener("pointerdown", onDown);
    canvas.addEventListener("pointermove", onMove);
    canvas.addEventListener("pointerup", onUp);
    canvas.addEventListener("pointercancel", onUp);

    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(kickTimer);
      kickEvents.forEach((ev) => window.removeEventListener(ev, startLoop));
      ro.disconnect();
      io.disconnect();
      document.removeEventListener("visibilitychange", onVis);
      canvas.removeEventListener("pointerdown", onDown);
      canvas.removeEventListener("pointermove", onMove);
      canvas.removeEventListener("pointerup", onUp);
      canvas.removeEventListener("pointercancel", onUp);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      role="img"
      aria-label={`Globe showing routes from Nairobi to ${destinations.map((d) => d.city).join(", ")}`}
      className="aspect-square w-full cursor-grab touch-pan-y active:cursor-grabbing"
    />
  );
}
