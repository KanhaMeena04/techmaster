import React, { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

interface MetallicRingsProps {
  scrollProgress: number;
  mouse: React.MutableRefObject<{ x: number; y: number }>;
}

export const MetallicRings: React.FC<MetallicRingsProps> = ({ scrollProgress, mouse }) => {
  const groupRef = useRef<THREE.Group>(null);
  const ring1Ref = useRef<THREE.Mesh>(null);
  const ring2Ref = useRef<THREE.Mesh>(null);
  const ring3Ref = useRef<THREE.Mesh>(null);

  const scale = typeof window !== "undefined" && window.innerWidth < 768 
    ? 0.55 
    : (typeof window !== "undefined" && window.innerWidth < 1024 ? 0.8 : 1.0);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();

    if (groupRef.current) {
      // Mouse sway
      const targetX = mouse.current.x * 0.8;
      const targetY = mouse.current.y * 0.8;
      groupRef.current.position.x = THREE.MathUtils.lerp(groupRef.current.position.x, targetX, 0.04);
      groupRef.current.position.y = THREE.MathUtils.lerp(groupRef.current.position.y, targetY, 0.04);
      
      // Scroll-based rotation shift
      groupRef.current.rotation.y = scrollProgress * Math.PI;
    }

    // Individual rings orbital rotation
    if (ring1Ref.current) {
      ring1Ref.current.rotation.x = time * 0.2 + scrollProgress;
      ring1Ref.current.rotation.y = time * 0.3;
    }
    if (ring2Ref.current) {
      ring2Ref.current.rotation.y = -time * 0.25 - scrollProgress * 1.5;
      ring2Ref.current.rotation.z = time * 0.1;
    }
    if (ring3Ref.current) {
      ring3Ref.current.rotation.x = -time * 0.15 + scrollProgress * 2;
      ring3Ref.current.rotation.z = time * 0.4;
    }
  });

  return (
    <group ref={groupRef} scale={scale}>
      {/* Outer Golden Ring */}
      <mesh ref={ring1Ref}>
        <torusGeometry args={[2.0, 0.04, 32, 100]} />
        <meshStandardMaterial
          metalness={1.0}
          roughness={0.1}
          color="#D4AF37"
          envMapIntensity={2.0}
        />
      </mesh>

      {/* Middle Purple/Indigo Metallic Ring */}
      <mesh ref={ring2Ref}>
        <torusGeometry args={[1.5, 0.03, 32, 100]} />
        <meshStandardMaterial
          metalness={0.9}
          roughness={0.15}
          color="#aa3bff"
          envMapIntensity={1.5}
        />
      </mesh>

      {/* Inner Electric Blue Ring */}
      <mesh ref={ring3Ref}>
        <torusGeometry args={[1.0, 0.02, 32, 100]} />
        <meshStandardMaterial
          metalness={0.8}
          roughness={0.2}
          color="#00E5FF"
          envMapIntensity={1.0}
        />
      </mesh>
    </group>
  );
};
