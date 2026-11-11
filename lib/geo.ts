import type { LatLng } from "./journey-types";

/** Pure maths (no three.js import) so it can run in the light scroll controller too. */
export const DEG = Math.PI / 180;
export type V3 = [number, number, number];

/** lat/lng → point on a sphere, matching three.js SphereGeometry's equirectangular UVs. */
export function toVec3(lat: number, lng: number, r = 1): V3 {
  const phi = (lng + 180) * DEG;
  const theta = (90 - lat) * DEG;
  return [-r * Math.sin(theta) * Math.cos(phi), r * Math.cos(theta), r * Math.sin(theta) * Math.sin(phi)];
}

export function toLatLng([x, y, z]: V3): LatLng {
  const l = Math.hypot(x, y, z) || 1;
  const lat = Math.asin(Math.max(-1, Math.min(1, y / l))) / DEG;
  const lng = Math.atan2(z / l, -x / l) / DEG - 180;
  return { lat, lng: ((((lng + 180) % 360) + 360) % 360) - 180 };
}

const dot = (a: V3, b: V3) => a[0] * b[0] + a[1] * b[1] + a[2] * b[2];

function slerpV(a: V3, b: V3, t: number): V3 {
  const om = Math.acos(Math.max(-1, Math.min(1, dot(a, b))));
  if (om < 1e-5) return a;
  const s = Math.sin(om);
  const ka = Math.sin((1 - t) * om) / s;
  const kb = Math.sin(t * om) / s;
  return [a[0] * ka + b[0] * kb, a[1] * ka + b[1] * kb, a[2] * ka + b[2] * kb];
}

/** Spherical interpolation between two lat/lng points. */
export function slerpLatLng(a: LatLng, b: LatLng, t: number): LatLng {
  if (t <= 0) return a;
  if (t >= 1) return b;
  return toLatLng(slerpV(toVec3(a.lat, a.lng), toVec3(b.lat, b.lng), t));
}

/** A great-circle arc lifted above the surface; higher for longer hops. */
export function arcPoints(a: LatLng, b: LatLng, n = 64, r = 1.004): V3[] {
  const va = toVec3(a.lat, a.lng);
  const vb = toVec3(b.lat, b.lng);
  const om = Math.acos(Math.max(-1, Math.min(1, dot(va, vb))));
  const lift = 0.025 + 0.32 * (om / Math.PI);
  const pts: V3[] = [];
  for (let i = 0; i <= n; i++) {
    const t = i / n;
    const v = slerpV(va, vb, t);
    const k = (r * (1 + lift * Math.sin(Math.PI * t))) / (Math.hypot(v[0], v[1], v[2]) || 1);
    pts.push([v[0] * k, v[1] * k, v[2] * k]);
  }
  return pts;
}

/** Globe rotation (Euler XYZ) that brings lat/lng to face the camera, offset by offLat/offLng degrees. */
export function rotationFor(lat: number, lng: number, offLat = 0, offLng = 0) {
  return { x: (lat - offLat) * DEG, y: (-(lng + 90) + offLng) * DEG };
}

/** Shortest signed angle from a to b. */
export function angleDelta(a: number, b: number) {
  let d = (b - a) % (Math.PI * 2);
  if (d > Math.PI) d -= Math.PI * 2;
  if (d < -Math.PI) d += Math.PI * 2;
  return d;
}

export const clamp01 = (v: number) => (v < 0 ? 0 : v > 1 ? 1 : v);
export const smooth = (v: number) => {
  const t = clamp01(v);
  return t * t * (3 - 2 * t);
};
/** Frame-rate independent exponential damping. */
export const damp = (cur: number, target: number, lambda: number, dt: number) =>
  cur + (target - cur) * (1 - Math.exp(-lambda * dt));
