"use client";

import { useFrame, useThree } from "@react-three/fiber";
import { useEffect, useMemo, useRef } from "react";
import {
  AdditiveBlending,
  BufferGeometry,
  Float32BufferAttribute,
  type Group,
  type PerspectiveCamera,
  Vector3,
} from "three";
import { angleDelta, damp, rotationFor, toVec3 } from "@/lib/geo";
import { live, screenTargets, useJourney } from "@/lib/journey-store";
import { Earth, Graticule } from "./Earth";
import { NodesLayer, type RenderCard, scene3d } from "./NodesLayer";
import { PathLine, Spokes } from "./PathLine";
import { glowTexture } from "./textures";

const HALF_FOV = Math.tan((35 / 2) * (Math.PI / 180));
const tmp = new Vector3();

export function World({
  variant,
  cards,
  renderCard,
  reduced,
  onReady,
}: {
  variant: "full" | "mini";
  cards: boolean;
  renderCard?: RenderCard;
  reduced: boolean;
  onReady: () => void;
}) {
  const offset = useRef<Group>(null);
  const spin = useRef<Group>(null);
  const { camera, size } = useThree();
  const first = useRef(true);
  const lens = useRef({ x: 0, y: 0 });
  const mini = variant === "mini";
  const glow = useMemo(() => glowTexture("rgba(14,159,110,0.9)"), []);
  const hi = size.width >= 768 && !mini;

  useEffect(() => {
    // first frame after textures resolve
    const id = requestAnimationFrame(() => onReady());
    return () => cancelAnimationFrame(id);
  }, [onReady]);

  useFrame((state, rawDt) => {
    const dt = Math.min(rawDt, 0.1);
    const s = useJourney.getState();
    const W = state.size.width;
    const H = state.size.height;
    const mobile = W < 768;
    const v = mini ? s.view : mobile ? s.mobileView : s.view;
    const lam = first.current || reduced ? 1000 : 2.6;

    // ── camera distance from the desired on-screen globe radius ──
    const radiusPx = v.zoom * (mini ? 0.42 : 0.375) * Math.min(H, W * (mini ? 1 : 1.2));
    const z = H / 2 / (radiusPx * HALF_FOV);
    const cam = camera as PerspectiveCamera;
    cam.position.z = damp(cam.position.z, z, lam, dt);

    // ── globe placement as a fraction of the viewport: a lens shift, so perspective stays centred on the globe ──
    lens.current.x = damp(lens.current.x, (v.x * W) / 2, lam, dt);
    lens.current.y = damp(lens.current.y, (v.y * H) / 2, lam, dt);
    cam.setViewOffset(W, H, -lens.current.x, lens.current.y, W, H);
    cam.updateProjectionMatrix();

    // ── hero "earth rise" ──
    if (live.riseStart > 0) live.rise = Math.min(1, (performance.now() - live.riseStart) / 1700);
    const rise = mini || reduced ? 1 : live.rise;
    const riseE = 1 - Math.pow(1 - rise, 3);
    const halfH = cam.position.z * HALF_FOV;
    const g = offset.current!;
    g.position.y = -(1 - riseE) * halfH * 1.6;
    g.getWorldPosition(scene3d.center);

    // ── rotate so the focused point faces the viewer ──
    const f = s.fixedFocus ?? live.focus;
    const r = rotationFor(f.lat, f.lng, v.offLat ?? 0, v.offLng ?? 0);
    const t = state.clock.elapsedTime;
    const sway = reduced ? 0 : Math.sin(t * 0.18) * 0.035;
    const px = reduced ? 0 : live.pointer.y * 0.06;
    const py = reduced ? 0 : live.pointer.x * 0.1;
    const introSpin = (1 - riseE) * -1.2;
    const sp = spin.current!;
    const k = first.current || reduced ? 1 : 1 - Math.exp(-2.4 * dt);
    sp.rotation.x += (r.x + px - sp.rotation.x) * k;
    sp.rotation.y += angleDelta(sp.rotation.y, r.y + py + sway + introSpin) * k;
    first.current = false;

    // ── projected-point connectors (hero headline → Nairobi, mobile docked card → node) ──
    const heroLine = screenTargets.heroLine;
    if (heroLine && screenTargets.heroAnchor && s.chapterId === "hero" && !mini) {
      const n = s.nodes.find((x) => x.id === "nairobi");
      if (n) {
        tmp.set(...toVec3(n.lat, n.lng, 1.012)).applyMatrix4(sp.matrixWorld).project(camera);
        const sx = ((tmp.x + 1) / 2) * W;
        const sy = ((1 - tmp.y) / 2) * H;
        const a = screenTargets.heroAnchor.getBoundingClientRect();
        heroLine.setAttribute("x1", String(mobile ? a.left + a.width / 2 : a.right + 12));
        heroLine.setAttribute("y1", String(mobile ? a.top - 8 : a.top + a.height / 2));
        heroLine.setAttribute("x2", sx.toFixed(1));
        heroLine.setAttribute("y2", sy.toFixed(1));
        heroLine.style.opacity = String(riseE * 0.9);
      }
    }
    const dock = screenTargets.dockLine;
    if (dock && mobile && !mini) {
      const n = s.nodes.find((x) => x.id === s.activeId);
      if (n) {
        tmp.set(...toVec3(n.lat, n.lng, 1.012)).applyMatrix4(sp.matrixWorld).project(camera);
        dock.setAttribute("x2", (((tmp.x + 1) / 2) * W).toFixed(1));
        dock.setAttribute("y2", (((1 - tmp.y) / 2) * H).toFixed(1));
      }
    }
  });

  return (
    <>
      <ambientLight intensity={0.8} />
      <directionalLight position={[3, 2, 4]} intensity={1.6} />
      {!mini && <Stars />}
      <group ref={offset}>
        <group ref={spin}>
          <Earth hi={hi} />
          <Graticule />
          <PathLine mini={mini} />
          <Spokes />
          <NodesLayer cards={cards} renderCard={renderCard} mini={mini} />
        </group>
      </group>
    </>
  );
}

function Stars() {
  const geo = useMemo(() => {
    const pos: number[] = [];
    let seed = 7;
    const rnd = () => ((seed = (seed * 16807) % 2147483647) / 2147483647);
    for (let i = 0; i < 700; i++) {
      const u = rnd() * 2 - 1;
      const th = rnd() * Math.PI * 2;
      const r = 14 + rnd() * 10;
      const s = Math.sqrt(1 - u * u);
      pos.push(r * s * Math.cos(th), r * u, -Math.abs(r * s * Math.sin(th)) - 4);
    }
    const g = new BufferGeometry();
    g.setAttribute("position", new Float32BufferAttribute(pos, 3));
    return g;
  }, []);
  return (
    <points geometry={geo}>
      <pointsMaterial color="#f6ebdd" size={0.045} sizeAttenuation transparent opacity={0.55} depthWrite={false} />
    </points>
  );
}
