import React, { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import { MeshTransmissionMaterial } from "@react-three/drei";
import * as THREE from "three";

interface GlacierMountainProps {
  scrollProgress: number;
  mouse: React.MutableRefObject<{ x: number; y: number }>;
}

export const GlacierMountain: React.FC<GlacierMountainProps> = ({ scrollProgress, mouse }) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const waterRef = useRef<THREE.Mesh>(null);

  // Generate a custom jagged mountain shape by displacing ConeGeometry vertices
  const mountainGeometry = useMemo(() => {
    const geom = new THREE.ConeGeometry(1.6, 2.6, 7, 6); // pointed cone
    const pos = geom.attributes.position;
    
    // Deform vertices to look like a jagged iceberg
    for (let i = 0; i < pos.count; i++) {
      const px = pos.getX(i);
      const py = pos.getY(i);
      const pz = pos.getZ(i);

      // Only deform vertices above the base
      if (py > -1.2) {
        const angle = Math.atan2(pz, px);
        const heightFactor = (py + 1.3) / 2.6; // 0 to 1
        const offset = Math.sin(angle * 3.0 + py * 5.0) * 0.22 * (1 - heightFactor * 0.5);
        
        pos.setX(i, px + Math.cos(angle) * offset);
        pos.setZ(i, pz + Math.sin(angle) * offset);
      }
    }
    geom.computeVertexNormals();
    return geom;
  }, []);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();

    if (meshRef.current) {
      // Slow orbital rotation
      meshRef.current.rotation.y = time * 0.08;
      
      // Parallax mouse sway
      const targetX = mouse.current.x * 0.5;
      const targetY = mouse.current.y * 0.3;
      meshRef.current.position.x = THREE.MathUtils.lerp(meshRef.current.position.x, targetX, 0.04);
      meshRef.current.position.y = THREE.MathUtils.lerp(meshRef.current.position.y, targetY - 0.2, 0.04);

      // Scroll scaling
      const isMobile = typeof window !== "undefined" && window.innerWidth < 768;
      const responsiveFactor = isMobile ? 0.75 : 1.0;
      meshRef.current.scale.setScalar((1 - Math.min(scrollProgress * 0.15, 0.3)) * responsiveFactor);
    }

    if (waterRef.current) {
      // Dynamic water ripples animation
      waterRef.current.rotation.z = -time * 0.05;
    }
  });

  return (
    <group>
      {/* 3D Jagged Glacier Ice Mountain */}
      <mesh ref={meshRef} geometry={mountainGeometry} position={[0, -0.2, 0]} castShadow>
        <MeshTransmissionMaterial
          backside
          samples={6}
          thickness={2.0}
          chromaticAberration={0.08}
          anisotropy={0.3}
          distortion={0.3}
          distortionScale={0.3}
          color="#abf0ff" // Bright glacial water cyan
          roughness={0.14}
          transmission={1.0}
          ior={1.31} // Ice refraction index
          flatShading={true} // Sharp faceted cliffs
        />
      </mesh>

      {/* Local water surface around the mountain */}
      <mesh 
        ref={waterRef} 
        rotation={[-Math.PI / 2, 0, 0]} 
        position={[0, -1.0, 0]}
        receiveShadow
      >
        <planeGeometry args={[6, 6]} />
        <meshStandardMaterial
          color="#011b30"
          roughness={0.08}
          metalness={0.9}
          transparent
          opacity={0.85}
        />
      </mesh>
    </group>
  );
};
