import React, { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

interface ParticleFieldProps {
  scrollProgress: number;
}

export const ParticleField: React.FC<ParticleFieldProps> = ({ scrollProgress }) => {
  const pointsRef = useRef<THREE.Points>(null);
  const count = 5; // Exactly 5 clean floating dots

  // Generate particle coordinates at specific scattered positions
  const [positions, colors] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const cols = new Float32Array(count * 3);

    const cyanColor = new THREE.Color("#00ffd1");
    const iceBlueColor = new THREE.Color("#00E5FF");
    const deepBlueColor = new THREE.Color("#0055ff");

    // Pre-calculated scattered coordinates
    const coordinates = [
      [-2.2, 1.5, 0.5],
      [2.5, 0.2, -1.0],
      [-3.0, -1.2, -1.5],
      [1.2, 2.2, -0.5],
      [-1.0, -2.2, 0.8]
    ];

    // Colors assigned to the 5 points
    const pointColors = [cyanColor, iceBlueColor, deepBlueColor, cyanColor, iceBlueColor];

    for (let i = 0; i < count; i++) {
      pos[i * 3] = coordinates[i][0];
      pos[i * 3 + 1] = coordinates[i][1];
      pos[i * 3 + 2] = coordinates[i][2];

      cols[i * 3] = pointColors[i].r;
      cols[i * 3 + 1] = pointColors[i].g;
      cols[i * 3 + 2] = pointColors[i].b;
    }

    return [pos, cols];
  }, []);

  useFrame((state) => {
    if (!pointsRef.current) return;
    const time = state.clock.getElapsedTime();

    // Gentle floating sway
    pointsRef.current.rotation.y = time * 0.015;
    pointsRef.current.rotation.x = Math.sin(time * 0.05) * 0.05;

    // Movement reactively tied to scrolling (floating upwards/downwards)
    pointsRef.current.position.y = -scrollProgress * 3.5;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
        <bufferAttribute
          attach="attributes-color"
          args={[colors, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.16} // Larger, glowing star orbs
        sizeAttenuation={true}
        vertexColors={true}
        transparent={true}
        opacity={0.8}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
};
