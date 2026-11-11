"use client";

import { useTexture } from "@react-three/drei";
import { useMemo } from "react";
import { AdditiveBlending, BackSide, BufferGeometry, Color, Float32BufferAttribute, SRGBColorSpace } from "three";
import { toVec3 } from "@/lib/geo";

const vert = /* glsl */ `
  varying vec2 vUv;
  varying vec3 vN;
  varying vec3 vV;
  void main() {
    vUv = uv;
    vec4 wp = modelMatrix * vec4(position, 1.0);
    vN = normalize(mat3(modelMatrix) * normal);
    vV = normalize(cameraPosition - wp.xyz);
    gl_Position = projectionMatrix * viewMatrix * wp;
  }
`;

const frag = /* glsl */ `
  uniform sampler2D dayMap;
  uniform sampler2D nightMap;
  varying vec2 vUv;
  varying vec3 vN;
  varying vec3 vV;
  void main() {
    vec3 day = texture2D(dayMap, vUv).rgb;
    vec3 night = texture2D(nightMap, vUv).rgb;
    float lum = dot(day, vec3(0.299, 0.587, 0.114));
    // emerald-tinted land & sea
    vec3 base = mix(vec3(0.0012, 0.012, 0.010), vec3(0.009, 0.1, 0.068), smoothstep(0.05, 0.5, lum));
    // warm city lights from the Black Marble map
    float nl = dot(night, vec3(0.33));
    vec3 lights = vec3(1.0, 0.72, 0.48) * pow(smoothstep(0.12, 0.9, nl), 1.6) * 2.4;
    float facing = max(dot(vN, vV), 0.0);
    float shade = 0.45 + 0.55 * smoothstep(0.0, 0.85, facing);
    float rim = pow(1.0 - facing, 4.5);
    vec3 col = base * shade + lights * (0.35 + 0.65 * shade) + vec3(0.004, 0.34, 0.15) * rim * 0.8;
    gl_FragColor = vec4(col, 1.0);
    #include <colorspace_fragment>
  }
`;

const atmoVert = /* glsl */ `
  varying vec3 vN;
  varying vec3 vV;
  void main() {
    vec4 wp = modelMatrix * vec4(position, 1.0);
    vN = normalize(mat3(modelMatrix) * normal);
    vV = normalize(cameraPosition - wp.xyz);
    gl_Position = projectionMatrix * viewMatrix * wp;
  }
`;
const atmoFrag = /* glsl */ `
  uniform vec3 glow;
  varying vec3 vN;
  varying vec3 vV;
  void main() {
    float i = pow(clamp(0.62 + dot(vN, vV), 0.0, 1.0), 4.0);
    gl_FragColor = vec4(glow * i * 0.9, i);
  }
`;

export function Earth({ hi }: { hi: boolean }) {
  const [day, night] = useTexture(
    hi ? ["/textures/earth-day-2k.webp", "/textures/earth-night-2k.webp"] : ["/textures/earth-day-1k.webp", "/textures/earth-night-1k.webp"],
    (t) => {
      const arr = Array.isArray(t) ? t : [t];
      arr.forEach((x) => {
        x.colorSpace = SRGBColorSpace;
        x.anisotropy = 4;
      });
    }
  );
  const uniforms = useMemo(() => ({ dayMap: { value: day }, nightMap: { value: night } }), [day, night]);
  const atmoUniforms = useMemo(() => ({ glow: { value: new Color("#0e9f6e") } }), []);
  return (
    <>
      <mesh>
        <sphereGeometry args={[1, hi ? 96 : 64, hi ? 64 : 48]} />
        <shaderMaterial vertexShader={vert} fragmentShader={frag} uniforms={uniforms} />
      </mesh>
      <mesh scale={1.16} renderOrder={-1}>
        <sphereGeometry args={[1, 48, 32]} />
        <shaderMaterial
          vertexShader={atmoVert}
          fragmentShader={atmoFrag}
          uniforms={atmoUniforms}
          side={BackSide}
          blending={AdditiveBlending}
          transparent
          depthWrite={false}
        />
      </mesh>
    </>
  );
}

/** Subtle jade latitude / longitude grid. */
export function Graticule() {
  const geo = useMemo(() => {
    const pos: number[] = [];
    const r = 1.003;
    const push = (a: number[], b: number[]) => pos.push(a[0], a[1], a[2], b[0], b[1], b[2]);
    for (let lat = -75; lat <= 75; lat += 15) {
      for (let lng = -180; lng < 180; lng += 3) push(toVec3(lat, lng, r), toVec3(lat, lng + 3, r));
    }
    for (let lng = -180; lng < 180; lng += 15) {
      for (let lat = -87; lat < 87; lat += 3) push(toVec3(lat, lng, r), toVec3(lat + 3, lng, r));
    }
    const g = new BufferGeometry();
    g.setAttribute("position", new Float32BufferAttribute(pos, 3));
    return g;
  }, []);
  return (
    <lineSegments geometry={geo}>
      <lineBasicMaterial color="#0e9f6e" transparent opacity={0.22} depthWrite={false} />
    </lineSegments>
  );
}
