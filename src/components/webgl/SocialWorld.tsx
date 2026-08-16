"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Float, OrbitControls, Sparkles, Torus } from "@react-three/drei";
import { EffectComposer, Bloom, Vignette } from "@react-three/postprocessing";
import { useRef } from "react";
import * as THREE from "three";

function Pulse({ index }: { index: number }) {
  const ref = useRef<THREE.Mesh>(null);
  useFrame(({ clock, mouse }) => {
    if (!ref.current) return;
    const t = clock.elapsedTime + index;
    ref.current.rotation.x = t * 0.12;
    ref.current.rotation.y = t * 0.18;
    const target = 1 + Math.sin(t * 1.4) * 0.08;
    ref.current.scale.lerp(new THREE.Vector3(target, target, target), 0.08);
    ref.current.position.x += (mouse.x * 0.35 - ref.current.position.x) * 0.004;
  });
  return (
    <Float speed={1 + index * 0.1} rotationIntensity={0.25} floatIntensity={0.5}>
      <mesh ref={ref} position={[Math.cos(index) * 2.4, Math.sin(index * 1.7) * 1.2, -index * 0.5]}>
        <icosahedronGeometry args={[0.42 + (index % 2) * 0.12, 2]} />
        <meshStandardMaterial color="#ffd43b" emissive="#8f6900" emissiveIntensity={2.5} metalness={0.65} roughness={0.22} />
      </mesh>
      <Torus args={[0.62 + index * 0.025, 0.012, 12, 64]} rotation={[Math.PI / 2, 0, index]} position={[Math.cos(index) * 2.4, Math.sin(index * 1.7) * 1.2, -index * 0.5]}>
        <meshBasicMaterial color="#ffd43b" transparent opacity={0.34} />
      </Torus>
    </Float>
  );
}

function Scene() {
  return (
    <>
      <color attach="background" args={["#050505"]} />
      <fog attach="fog" args={["#050505", 4, 13]} />
      <ambientLight intensity={0.28} />
      <pointLight position={[0, 1, 4]} intensity={18} distance={12} color="#ffd43b" />
      <pointLight position={[-4, -2, 2]} intensity={8} distance={10} color="#fff0a6" />
      <Sparkles count={900} scale={[12, 7, 9]} size={1.4} speed={0.22} color="#ffd43b" />
      {Array.from({ length: 9 }, (_, i) => <Pulse index={i} key={i} />)}
      <mesh position={[0, 0, -3.5]} scale={[4.6, 4.6, 0.2]}>
        <planeGeometry />
        <meshBasicMaterial color="#0b0b0b" transparent opacity={0.82} />
      </mesh>
      <EffectComposer multisampling={0}>
        <Bloom intensity={1.3} luminanceThreshold={0.55} mipmapBlur />
        <Vignette darkness={0.72} eskil={false} />
      </EffectComposer>
      <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={0.15} />
    </>
  );
}

export function SocialWorld() {
  return (
    <div className="world-canvas" aria-hidden="true">
      <Canvas dpr={[1, 1.5]} camera={{ position: [0, 0, 7], fov: 42 }} gl={{ antialias: true, powerPreference: "high-performance" }}>
        <Scene />
      </Canvas>
    </div>
  );
}
