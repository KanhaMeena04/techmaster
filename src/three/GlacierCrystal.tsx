import React, { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { MeshTransmissionMaterial } from "@react-three/drei";
import * as THREE from "three";

interface GlacierCrystalProps {
  scrollProgress: number;
  mouse: React.MutableRefObject<{ x: number; y: number }>;
}

export const GlacierCrystal: React.FC<GlacierCrystalProps> = ({ scrollProgress, mouse }) => {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!meshRef.current) return;

    const time = state.clock.getElapsedTime();

    // Constant slow orbital rotation
    meshRef.current.rotation.y = time * 0.12;
    meshRef.current.rotation.x = Math.sin(time * 0.08) * 0.25;

    // React to mouse movement for interactive parallax
    const targetX = mouse.current.x * 0.6;
    const targetY = mouse.current.y * 0.6;
    meshRef.current.position.x = THREE.MathUtils.lerp(meshRef.current.position.x, targetX, 0.05);
    meshRef.current.position.y = THREE.MathUtils.lerp(meshRef.current.position.y, targetY, 0.05);

    // Responsive scaling factoring in mobile devices and scroll progress
    const isMobile = typeof window !== "undefined" && window.innerWidth < 768;
    const isTablet = typeof window !== "undefined" && window.innerWidth < 1024;
    const responsiveFactor = isMobile ? 0.65 : (isTablet ? 0.85 : 1.0);
    const scrollScale = (1 - Math.min(scrollProgress * 0.2, 0.4)) * responsiveFactor;
    meshRef.current.scale.setScalar(scrollScale);

    // Subtle floating vertical motion
    const bounce = Math.sin(time * 0.4) * 0.05;
    meshRef.current.position.y += bounce * 0.03;
  });

  return (
    <mesh ref={meshRef} position={[0, 0, 0]} castShadow receiveShadow>
      {/* icosahedronGeometry with detail=1 creates the beautiful low-poly faceted structure */}
      <icosahedronGeometry args={[1.5, 1]} />
      <MeshTransmissionMaterial
        backside
        samples={6}
        thickness={1.8}
        chromaticAberration={0.08}
        anisotropy={0.4}
        distortion={0.3}
        distortionScale={0.3}
        temporalDistortion={0.15}
        color="#a8fffc" // Glacier teal/mint tint
        roughness={0.12}
        transmission={1.0}
        ior={1.35} // Glass/ice index of refraction
        flatShading={true} // Forces flat-shaded faceted surfaces
      />
    </mesh>
  );
};
