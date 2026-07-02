import React, { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

interface SwarmProps {
  scrollProgress: number;
}

const SingleFish: React.FC<{ index: number; velocityRef: React.MutableRefObject<number> }> = ({ index, velocityRef }) => {
  const groupRef = useRef<THREE.Group>(null);
  
  // Random coordinates, speeds, and sizes to make each fish swim uniquely
  const initial = useMemo(() => {
    return {
      x: (Math.random() - 0.5) * 8,
      y: (Math.random() - 0.5) * 4.5,
      z: (Math.random() - 0.5) * 2 - 2.5, // Positions them slightly back in the 3D scene
      speed: 0.008 + Math.random() * 0.012,
      swimOffset: index * 0.5 + Math.random() * Math.PI * 2,
      wiggleFrequency: 7 + Math.random() * 4,
      depthFactor: 0.7 + Math.random() * 0.4
    };
  }, [index]);

  useFrame((state) => {
    if (!groupRef.current) return;
    const time = state.clock.getElapsedTime();
    
    // Horizontal swimming speed w/ scroll velocity boost
    const scrollEffect = velocityRef.current * 0.015; // responsive speed boost
    groupRef.current.position.x += initial.speed + scrollEffect;

    // Vertical floating motion
    groupRef.current.position.y = initial.y + Math.sin(time * 0.8 + initial.swimOffset) * 0.12;

    // Tail fin wiggling animation (speeds up dynamically as scroll velocity increases)
    const tailMesh = groupRef.current.children[1];
    if (tailMesh) {
      const wiggleSpeed = initial.wiggleFrequency + velocityRef.current * 0.08;
      tailMesh.rotation.y = Math.sin(time * wiggleSpeed) * 0.42;
    }

    // Wrap position once fish swim past the screen margins
    if (groupRef.current.position.x > 5.5) {
      groupRef.current.position.x = -5.5;
    }
  });

  return (
    <group ref={groupRef} position={[initial.x, initial.y, initial.z]} scale={initial.depthFactor * 0.65}>
      {/* 1. Cone body */}
      <mesh rotation={[0, 0, Math.PI / 2]}>
        <coneGeometry args={[0.05, 0.22, 4]} />
        <meshBasicMaterial 
          color="#00ffd1" 
          transparent 
          opacity={0.65} 
          blending={THREE.AdditiveBlending}
        />
      </mesh>
      
      {/* 2. Wiggling tail fin */}
      <mesh position={[-0.13, 0, 0]} rotation={[0, 0, -Math.PI / 2]}>
        <coneGeometry args={[0.035, 0.1, 3]} />
        <meshBasicMaterial 
          color="#00ffd1" 
          transparent 
          opacity={0.8}
          blending={THREE.AdditiveBlending}
        />
      </mesh>
    </group>
  );
};

export const SwimmingFish: React.FC<SwarmProps> = () => {
  const lastScrollY = useRef(0);
  const scrollVelocity = useRef(0);
  const fishCount = 10; // Number of swimming fish

  useFrame(() => {
    if (typeof window === "undefined") return;
    const currentScrollY = window.scrollY;
    const diff = Math.abs(currentScrollY - lastScrollY.current);
    
    // Lerp and decay velocity calculations
    scrollVelocity.current = THREE.MathUtils.lerp(scrollVelocity.current, diff, 0.07);
    lastScrollY.current = currentScrollY;

    if (diff < 1) {
      scrollVelocity.current = THREE.MathUtils.lerp(scrollVelocity.current, 0, 0.05);
    }
  });

  return (
    <group>
      {Array.from({ length: fishCount }).map((_, idx) => (
        <SingleFish key={idx} index={idx} velocityRef={scrollVelocity} />
      ))}
    </group>
  );
};
