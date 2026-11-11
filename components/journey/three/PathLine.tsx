"use client";

import { useFrame } from "@react-three/fiber";
import { useEffect, useMemo, useRef } from "react";
import {
  AdditiveBlending,
  BufferGeometry,
  CatmullRomCurve3,
  Color,
  Float32BufferAttribute,
  Line,
  LineBasicMaterial,
  type Mesh,
  type Sprite,
  TubeGeometry,
  Vector3,
} from "three";
import { arcPoints, clamp01 } from "@/lib/geo";
import type { LatLng } from "@/lib/journey-types";
import { live, useJourney } from "@/lib/journey-store";
import { glowTexture } from "./textures";

const SEG = 64;
const RADIAL = 6;
const CORAL = new Color("#ff6b4a").multiplyScalar(2.4);
const CORAL_SOFT = new Color("#ff6b4a").multiplyScalar(1.6);

type Seg = { pts: Vector3[]; tube: TubeGeometry; ghost: BufferGeometry; line: Line };
const ghostMat = new LineBasicMaterial({ color: "#5fd3a8", transparent: true, opacity: 0.22, depthWrite: false });

function buildSeg(a: LatLng, b: LatLng, radius: number): Seg {
  const pts = arcPoints(a, b, SEG).map((p) => new Vector3(p[0], p[1], p[2]));
  const tube = new TubeGeometry(new CatmullRomCurve3(pts), SEG, radius, RADIAL, false);
  tube.setDrawRange(0, 0);
  const ghost = new BufferGeometry();
  ghost.setAttribute("position", new Float32BufferAttribute(pts.flatMap((p) => [p.x, p.y, p.z]), 3));
  return { pts, tube, ghost, line: new Line(ghost, ghostMat) };
}

/**
 * The glowing coral progress line. It is real geometry wrapped around the globe, so it
 * passes behind the Earth (depth-tested) and re-emerges on the other side.
 */
export function PathLine({ mini = false }: { mini?: boolean }) {
  const nodes = useJourney((s) => s.nodes);
  const path = useJourney((s) => s.path);
  const segs = useMemo(() => {
    const byId = new Map(nodes.map((n) => [n.id, n]));
    const list: Seg[] = [];
    for (let i = 0; i < path.length - 1; i++) {
      const a = byId.get(path[i]);
      const b = byId.get(path[i + 1]);
      if (a && b) list.push(buildSeg(a, b, mini ? 0.008 : 0.0048));
    }
    return list;
  }, [nodes, path, mini]);

  useEffect(
    () => () =>
      segs.forEach((s) => {
        s.tube.dispose();
        s.ghost.dispose();
      }),
    [segs]
  );

  const meshes = useRef<(Mesh | null)[]>([]);
  const head = useRef<Sprite>(null);
  const tex = useMemo(() => glowTexture("rgba(255,140,110,1)"), []);
  const shown = useRef(0);
  // a new route always draws itself from its origin
  useEffect(() => {
    shown.current = 0;
  }, [segs]);

  useFrame((_, dt) => {
    // ease the drawn length toward the scroll value so fast scrolls still draw smoothly
    shown.current += (live.line - shown.current) * (1 - Math.exp(-10 * dt));
    if (Math.abs(live.line - shown.current) < 0.001) shown.current = live.line;
    const p = shown.current;
    let tip: Vector3 | null = null;
    segs.forEach((s, i) => {
      const k = clamp01(p - i);
      const n = Math.floor(k * SEG);
      s.tube.setDrawRange(0, n * RADIAL * 6);
      const m = meshes.current[i];
      if (m) m.visible = n > 0;
      if (k > 0 && k < 1) tip = s.pts[Math.min(SEG, Math.round(k * SEG))];
    });
    if (head.current) {
      head.current.visible = !!tip;
      if (tip) head.current.position.copy(tip);
    }
  });

  return (
    <group>
      {segs.map((s, i) => (
        <group key={i}>
          <primitive object={s.line} />
          <mesh
            ref={(m) => {
              meshes.current[i] = m;
            }}
            geometry={s.tube}
            visible={false}
          >
            <meshBasicMaterial color={CORAL} toneMapped={false} />
          </mesh>
        </group>
      ))}
      <sprite ref={head} scale={mini ? 0.16 : 0.11} visible={false}>
        <spriteMaterial map={tex} color={CORAL_SOFT} blending={AdditiveBlending} transparent depthWrite={false} toneMapped={false} />
      </sprite>
    </group>
  );
}

/** Arcs drawn straight from the origin to every "spoke" node (quiz matches, final burst). */
export function Spokes() {
  const nodes = useJourney((s) => s.nodes);
  const spokeIds = useJourney((s) => s.spokeIds);
  const origin = nodes.find((n) => n.id === "nairobi") ?? nodes[0];
  const targets = nodes.filter((n) => spokeIds.includes(n.id) && n !== origin);
  if (!origin) return null;
  return (
    <group>
      {targets.map((t, i) => (
        <Spoke key={t.id} a={origin} b={t} delay={i * 0.06} />
      ))}
    </group>
  );
}

function Spoke({ a, b, delay }: { a: LatLng; b: LatLng; delay: number }) {
  const seg = useMemo(() => buildSeg(a, b, 0.0035), [a, b]);
  useEffect(() => () => {
    seg.tube.dispose();
    seg.ghost.dispose();
  }, [seg]);
  const t = useRef(-delay);
  useFrame((_, dt) => {
    t.current = Math.min(1, t.current + dt * 1.1);
    const k = clamp01(t.current);
    const e = 1 - Math.pow(1 - k, 3);
    seg.tube.setDrawRange(0, Math.floor(e * SEG) * RADIAL * 6);
  });
  return (
    <mesh geometry={seg.tube}>
      <meshBasicMaterial color={CORAL} toneMapped={false} transparent opacity={0.9} />
    </mesh>
  );
}
