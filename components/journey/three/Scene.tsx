"use client";

import { PerformanceMonitor } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { Bloom, EffectComposer } from "@react-three/postprocessing";
import { Suspense, useCallback, useState } from "react";
import { useJourney } from "@/lib/journey-store";
import type { RenderCard } from "./NodesLayer";
import { World } from "./World";

export type SceneProps = {
  variant: "full" | "mini";
  cards?: boolean;
  renderCard?: RenderCard;
  reduced?: boolean;
};

export default function Scene({ variant, cards = false, renderCard, reduced = false }: SceneProps) {
  const mini = variant === "mini";
  const [dpr, setDpr] = useState(1.5);
  const [bloom, setBloom] = useState(!mini);
  const onReady = useCallback(() => useJourney.getState().set({ ready: true }), []);

  return (
    <Canvas
      dpr={[1, mini ? 1.25 : dpr]}
      gl={{ antialias: !mini, alpha: true, powerPreference: "high-performance", stencil: false }}
      camera={{ fov: 35, position: [0, 0, 4.2], near: 0.05, far: 60 }}
      style={{ pointerEvents: "none" }}
      onCreated={({ gl }) => {
        gl.domElement.setAttribute("aria-hidden", "true");
        gl.domElement.setAttribute("role", "presentation");
      }}
    >
      <PerformanceMonitor
        onDecline={() => {
          setDpr(1);
          setBloom(false);
        }}
        onIncline={() => setDpr(1.5)}
        flipflops={3}
        onFallback={() => {
          setDpr(1);
          setBloom(false);
        }}
      />
      <Suspense fallback={null}>
        <World variant={variant} cards={cards} renderCard={renderCard} reduced={reduced} onReady={onReady} />
      </Suspense>
      {bloom && (
        <EffectComposer multisampling={0}>
          <Bloom mipmapBlur intensity={0.9} luminanceThreshold={1} luminanceSmoothing={0.15} radius={0.7} />
        </EffectComposer>
      )}
    </Canvas>
  );
}
