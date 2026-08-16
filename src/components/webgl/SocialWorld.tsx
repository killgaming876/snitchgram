"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Float, Sparkles, Torus, MeshDistortMaterial } from "@react-three/drei";
import { EffectComposer, Bloom, Vignette } from "@react-three/postprocessing";
import { useEffect, useRef } from "react";
import * as THREE from "three";

function Pulse({ index }: { index: number }) {
  const ref = useRef<THREE.Group>(null);
  const ring = useRef<THREE.Mesh>(null);
  useFrame(({ clock, mouse }) => {
    if (!ref.current) return;
    const t = clock.elapsedTime * (0.55 + index * 0.02) + index;
    const radius = 1.8 + (index % 3) * 1.15;
    ref.current.position.x = Math.cos(t * 0.55) * radius + mouse.x * 0.35;
    ref.current.position.y = Math.sin(t * 0.72) * (1.1 + index * 0.03) + mouse.y * 0.22;
    ref.current.position.z = -1.2 - (index % 4) * 0.8 + Math.sin(t) * 0.5;
    ref.current.rotation.x = t * 0.18;
    ref.current.rotation.y = t * 0.3;
    if (ring.current) ring.current.rotation.z = t * 0.7;
  });
  return <group ref={ref}>
    <Float speed={1.5} rotationIntensity={0.35} floatIntensity={0.7}>
      <mesh scale={index % 3 === 0 ? 1.25 : 0.82}>
        <icosahedronGeometry args={[0.38 + (index % 2) * 0.13, 2]} />
        <MeshDistortMaterial color="#fffc00" emissive="#6d6800" emissiveIntensity={2.6} metalness={0.7} roughness={0.2} distort={0.18} speed={1.2} />
      </mesh>
      <Torus ref={ring} args={[0.58 + (index % 2) * 0.08, 0.018, 12, 64]}>
        <meshBasicMaterial color="#fffc00" transparent opacity={0.5} />
      </Torus>
      {index % 3 === 0 && <Torus args={[0.8, 0.009, 8, 64]} rotation={[Math.PI / 3, 0, 0]}><meshBasicMaterial color="#ffffff" transparent opacity={0.15}/></Torus>}
    </Float>
  </group>;
}

function CameraMotion() {
  const { camera } = useThree();
  const target = useRef({ x: 0, y: 0, z: 7 });
  useEffect(() => {
    const onScroll = () => { target.current.z = 7 - Math.min(window.scrollY / 900, 2.2); target.current.y = Math.min(window.scrollY / 1600, 0.8); };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  useFrame(({ mouse }) => {
    camera.position.x += (mouse.x * 0.55 - camera.position.x) * 0.025;
    camera.position.y += (target.current.y + mouse.y * 0.28 - camera.position.y) * 0.022;
    camera.position.z += (target.current.z - camera.position.z) * 0.018;
    camera.lookAt(0, 0, -1.2);
  });
  return null;
}

function Scene() {
  return <>
    <color attach="background" args={["#050505"]} />
    <fog attach="fog" args={["#050505", 4, 15]} />
    <ambientLight intensity={0.32} />
    <pointLight position={[0, 2, 4]} intensity={26} distance={14} color="#fffc00" />
    <pointLight position={[-5, -2, 2]} intensity={11} distance={12} color="#ffffff" />
    <Sparkles count={1400} scale={[15, 10, 12]} size={1.7} speed={0.42} color="#fffc00" />
    {Array.from({ length: 12 }, (_, i) => <Pulse index={i} key={i} />)}
    <mesh position={[0, 0, -5]} rotation={[0, 0, 0]} scale={[8, 6, 1]}>
      <planeGeometry />
      <meshBasicMaterial color="#0c0c09" transparent opacity={0.48} />
    </mesh>
    <CameraMotion />
    <EffectComposer multisampling={0}>
      <Bloom intensity={1.45} luminanceThreshold={0.5} mipmapBlur />
      <Vignette darkness={0.62} eskil={false} />
    </EffectComposer>
  </>;
}

export function SocialWorld() {
  return <div className="world-canvas" aria-hidden="true"><Canvas dpr={[1, 1.6]} camera={{ position: [0, 0, 7], fov: 45 }} gl={{ antialias: true, powerPreference: "high-performance" }}><Scene /></Canvas></div>;
}
