"use client";

import { Html } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import { type ReactNode, useEffect, useMemo, useRef, useState } from "react";
import { AdditiveBlending, Color, type Mesh, type MeshStandardMaterial, type Sprite, type SpriteMaterial, Vector3 } from "three";
import { toVec3 } from "@/lib/geo";
import type { JourneyNode } from "@/lib/journey-types";
import { useJourney } from "@/lib/journey-store";
import { glowTexture } from "./textures";

export type RenderCard = (node: JourneyNode, open: boolean) => ReactNode;

/** Shared per-frame scene facts (globe centre in world space). */
export const scene3d = { center: new Vector3() };

const C_CORAL = new Color("#ff6b4a");
const C_JADE = new Color("#0e9f6e");
const C_JADE_HI = new Color("#5fd3a8");
const C_IVORY = new Color("#fffdf8");
const tmp = new Vector3();
const tmp2 = new Vector3();
const tmpC = new Color();

export function NodesLayer({ cards, renderCard, mini }: { cards: boolean; renderCard?: RenderCard; mini: boolean }) {
  const nodes = useJourney((s) => s.nodes);
  const chapterId = useJourney((s) => s.chapterId);
  return (
    <group>
      {nodes.map((n) => (
        <JNode key={`${chapterId}:${n.id}`} node={n} cards={cards} renderCard={renderCard} mini={mini} />
      ))}
    </group>
  );
}

function JNode({ node, cards, renderCard, mini }: { node: JourneyNode; cards: boolean; renderCard?: RenderCard; mini: boolean }) {
  const pos = useMemo(() => new Vector3(...toVec3(node.lat, node.lng, 1.012)), [node.lat, node.lng]);
  const active = useJourney((s) => s.activeId === node.id);
  const lit = useJourney((s) => s.litIds.includes(node.id));
  const visited = useJourney((s) => s.visitedIds.includes(node.id));
  const mobile = useThree((s) => s.size.width < 768);
  const mesh = useRef<Mesh>(null);
  const mat = useRef<MeshStandardMaterial>(null);
  const halo = useRef<Sprite>(null);
  const label = useRef<HTMLDivElement>(null);
  const cardWrap = useRef<HTMLDivElement>(null);
  const tex = useMemo(() => glowTexture("rgba(255,255,255,1)"), []);
  const grow = useRef(0);
  const shift = useRef(0);
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    if (active) setMounted(true);
  }, [active]);

  const showCard = cards && !mobile && node.card !== "none";

  useFrame(({ camera, clock }, dt) => {
    if (!mesh.current || !mat.current || !halo.current) return;
    grow.current = Math.min(1, grow.current + dt * 2.2);
    const g = 1 - Math.pow(1 - grow.current, 3);
    const t = clock.elapsedTime;
    const pulse = active ? 1 + Math.sin(t * 4) * 0.18 : 1;
    // keep nodes a constant-ish size on screen as the camera zooms
    const zf = Math.min(1.6, Math.max(0.45, camera.position.z / 4.2));
    const base = (mini ? 1.5 : 1) * zf;
    const s = (active ? 1.7 * pulse : lit ? 1.35 : visited ? 1.1 : 0.85) * base * g;
    mesh.current.scale.setScalar(s);
    mesh.current.rotation.y += dt * 0.8;

    const target = active ? C_CORAL : lit ? C_CORAL : visited ? C_JADE_HI : C_JADE;
    const k = 1 - Math.exp(-8 * dt);
    tmpC.copy(target).multiplyScalar(active ? 3.2 : lit ? 2.2 : visited ? 1.4 : 0.55);
    mat.current.emissive.lerp(tmpC, k);
    mat.current.color.lerp(active || lit ? C_CORAL : C_IVORY, k);

    const hm = halo.current.material as SpriteMaterial;
    const hOpacity = active ? 0.95 : lit ? 0.7 : visited ? 0.35 : 0.18;
    hm.opacity += (hOpacity - hm.opacity) * k;
    hm.color.lerp(active || lit ? C_CORAL : C_JADE_HI, k);
    halo.current.scale.setScalar((active ? 0.2 * pulse : lit ? 0.15 : 0.1) * base * g);

    // manual occlusion: fade labels/cards as the node turns to the back of the globe
    mesh.current.getWorldPosition(tmp);
    tmp2.copy(tmp).sub(scene3d.center).normalize();
    const facing = tmp2.dot(tmp.clone().negate().add(camera.position).normalize());
    const vis = Math.max(0, Math.min(1, (facing - 0.05) / 0.25));
    if (label.current) {
      const o = (active ? 1 : lit || visited ? 0.85 : 0.6) * vis * g;
      label.current.style.opacity = o.toFixed(2);
    }
    if (cardWrap.current) {
      cardWrap.current.style.opacity = vis.toFixed(2);
      cardWrap.current.style.visibility = vis < 0.02 ? "hidden" : "visible";
      // keep the open card inside the viewport (below the navbar), sliding along its connector
      if (active) {
        const shiftEl = cardWrap.current.querySelector<HTMLElement>("[data-shift]");
        const card = shiftEl?.firstElementChild as HTMLElement | null;
        if (shiftEl && card) {
          const r = card.getBoundingClientRect();
          const top = r.top - shift.current;
          const bottom = r.bottom - shift.current;
          const H = window.innerHeight;
          let d = 0;
          if (top < 76) d = 76 - top;
          else if (bottom > H - 16) d = Math.max(76 - top, H - 16 - bottom);
          shift.current += (d - shift.current) * Math.min(1, dt * 12);
          shiftEl.style.transform = `translateY(${shift.current.toFixed(1)}px)`;
          const line = cardWrap.current.querySelector("line");
          const dot = cardWrap.current.querySelector("circle");
          const y = (-24 + shift.current).toFixed(1);
          line?.setAttribute("y2", y);
          dot?.setAttribute("cy", y);
        }
      }
    }
  });

  return (
    <group position={pos}>
      <mesh ref={mesh} scale={0}>
        <icosahedronGeometry args={[0.02, 0]} />
        <meshStandardMaterial ref={mat} flatShading roughness={0.15} metalness={0.2} color="#fffdf8" emissive="#0e9f6e" toneMapped={false} />
      </mesh>
      <sprite ref={halo} scale={0}>
        <spriteMaterial map={tex} blending={AdditiveBlending} transparent opacity={0} depthWrite={false} toneMapped={false} />
      </sprite>
      {!(mini && !active) && (
        <Html zIndexRange={[30, 10]} style={{ pointerEvents: "none" }}>
          <div
            ref={label}
            aria-hidden="true"
            className={`node-label pointer-events-none flex -translate-y-1/2 translate-x-3 items-center gap-1.5 whitespace-nowrap font-mono text-[10px] font-semibold tracking-wider ${
              active || lit ? "text-coral-300" : "text-jade-300"
            }`}
            style={{ opacity: 0 }}
          >
            <span className={`rounded px-1 py-px ${active ? "bg-coral text-night-900" : "bg-night-900/70"}`}>{node.number}</span>
            {node.label && (active || lit) && <span className="font-sans text-[11px] font-semibold tracking-normal text-sand/90">{node.label}</span>}
          </div>
        </Html>
      )}
      {showCard && mounted && renderCard && (
        <Html zIndexRange={[60, 40]} style={{ pointerEvents: "none" }}>
          <div ref={cardWrap}>
            <CardAnchor open={active}>{renderCard(node, active)}</CardAnchor>
          </div>
        </Html>
      )}
    </group>
  );
}

/** Thin connector from the node to its card; the card scales out of the connector's end. */
function CardAnchor({ open, children }: { open: boolean; children: ReactNode }) {
  return (
    <div className="relative h-0 w-0" data-open={open}>
      <svg className="pointer-events-none absolute left-0 top-0 overflow-visible" width="1" height="1" aria-hidden="true">
        <line x1="0" y1="0" x2="56" y2="-24" stroke="#5fd3a8" strokeWidth="1" className="jconnector" />
        <circle cx="56" cy="-24" r={open ? 2.5 : 0} fill="#ff6b4a" />
      </svg>
      <div className="absolute" style={{ left: 56, top: -24 }} data-shift>
        <div className="-translate-y-1/2">
          <div className="jcard" data-open={open} style={{ pointerEvents: open ? "auto" : "none" }}>
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
