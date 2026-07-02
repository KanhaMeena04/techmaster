import React, { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { MeshTransmissionMaterial } from "@react-three/drei";
import * as THREE from "three";

interface GlassSphereProps {
  scrollProgress: number;
  mouse: React.MutableRefObject<{ x: number; y: number }>;
}

export const GlassSphere: React.FC<GlassSphereProps> = ({ scrollProgress, mouse }) => {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!meshRef.current) return;

    const time = state.clock.getElapsedTime();

    // Slow orbital rotation
    meshRef.current.rotation.y = time * 0.15;
    meshRef.current.rotation.x = Math.sin(time * 0.1) * 0.2;

    // React to mouse movement
    const targetX = mouse.current.x * 0.5;
    const targetY = mouse.current.y * 0.5;
    meshRef.current.position.x = THREE.MathUtils.lerp(meshRef.current.position.x, targetX, 0.05);
    meshRef.current.position.y = THREE.MathUtils.lerp(meshRef.current.position.y, targetY, 0.05);

    // Scroll-based parallax and scale adjustments
    const isMobile = typeof window !== "undefined" && window.innerWidth < 768;
    const isTablet = typeof window !== "undefined" && window.innerWidth < 1024;
    const responsiveFactor = isMobile ? 0.6 : (isTablet ? 0.8 : 1.0);
    const scrollScale = (1 - Math.min(scrollProgress * 0.3, 0.5)) * responsiveFactor;
    meshRef.current.scale.setScalar(scrollScale);

    // Minor displacement animation
    const bounce = Math.sin(time * 0.5) * 0.08;
    meshRef.current.position.y += bounce * 0.02;
  });

  return (
    <mesh ref={meshRef} position={[0, 0, 0]} castShadow receiveShadow>
      <sphereGeometry args={[1.5, 64, 64]} />
      <MeshTransmissionMaterial
        backside
        samples={8}
        thickness={1.5}
        chromaticAberration={0.06}
        anisotropy={0.3}
        distortion={0.4}
        distortionScale={0.4}
        temporalDistortion={0.1}
        color="#ffffff"
        roughness={0.08}
        transmission={1.0}
        ior={1.2}
      />
    </mesh>
  );
};
