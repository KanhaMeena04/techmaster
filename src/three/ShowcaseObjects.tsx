import React, { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { MeshTransmissionMaterial } from "@react-three/drei";
import * as THREE from "three";

interface ObjectProps {
  mouse: React.MutableRefObject<{ x: number; y: number }>;
}

// Shape 1: Deep Blue Morphing Orb with Wireframe Network
export const BlueMorphingOrb: React.FC<ObjectProps> = ({ mouse }) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const geomRef = useRef<THREE.IcosahedronGeometry>(null);
  const wireGeomRef = useRef<THREE.IcosahedronGeometry>(null);
  const originalPositions = useRef<Float32Array | null>(null);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    
    // Slow rotational drift
    if (meshRef.current) {
      meshRef.current.rotation.y = time * 0.15;
      
      // Interactive mouse sway
      const targetX = mouse.current.x * 0.5;
      const targetY = mouse.current.y * 0.3;
      meshRef.current.position.x = THREE.MathUtils.lerp(meshRef.current.position.x, targetX, 0.05);
      meshRef.current.position.y = THREE.MathUtils.lerp(meshRef.current.position.y, targetY - 0.15, 0.05);
    }

    // Dynamic wave vertex displacement
    if (geomRef.current) {
      const posAttr = geomRef.current.attributes.position;
      if (!originalPositions.current) {
        originalPositions.current = posAttr.array.slice() as Float32Array;
      }

      const orig = originalPositions.current;
      for (let i = 0; i < posAttr.count; i++) {
        const x = orig[i * 3];
        const y = orig[i * 3 + 1];
        const z = orig[i * 3 + 2];

        const length = Math.sqrt(x*x + y*y + z*z);
        const nx = x / length;
        const ny = y / length;
        const nz = z / length;

        // Wave deformation
        const wave = Math.sin(nx * 4.5 + time * 1.8) * Math.cos(ny * 4.5 + time * 1.8) * Math.sin(nz * 4.5 + time * 1.8);
        const offset = wave * 0.32;
        const newLength = length + offset;

        posAttr.setXYZ(i, nx * newLength, ny * newLength, nz * newLength);
      }
      posAttr.needsUpdate = true;
      geomRef.current.computeVertexNormals();

      // Mirror positions to wireframe geometry
      if (wireGeomRef.current) {
        const wirePosAttr = wireGeomRef.current.attributes.position;
        for (let i = 0; i < posAttr.count; i++) {
          wirePosAttr.setXYZ(
            i, 
            posAttr.getX(i) * 1.01, 
            posAttr.getY(i) * 1.01, 
            posAttr.getZ(i) * 1.01
          );
        }
        wirePosAttr.needsUpdate = true;
        wireGeomRef.current.computeVertexNormals();
      }
    }
  });

  return (
    <group ref={meshRef}>
      <mesh castShadow receiveShadow>
        <icosahedronGeometry ref={geomRef} args={[1.3, 3]} />
        {/* Glossy Refraction material */}
        <MeshTransmissionMaterial
          backside
          samples={6}
          thickness={1.5}
          chromaticAberration={0.06}
          anisotropy={0.3}
          distortion={0.3}
          distortionScale={0.3}
          temporalDistortion={0.1}
          color="#00a3ff" // Deep Blue
          roughness={0.15}
          transmission={1.0}
          ior={1.4}
        />
      </mesh>
      {/* High-tech Wireframe Overlay */}
      <mesh>
        <icosahedronGeometry ref={wireGeomRef} args={[1.3, 3]} />
        <meshBasicMaterial
          color="#00E5FF"
          wireframe
          transparent
          opacity={0.15}
          blending={THREE.AdditiveBlending}
        />
      </mesh>
    </group>
  );
};

// Shape 2: Green Faceted Low-poly Sphere with Wireframe Grid
export const GreenFacetedSphere: React.FC<ObjectProps> = ({ mouse }) => {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    if (meshRef.current) {
      meshRef.current.rotation.x = time * 0.12;
      meshRef.current.rotation.y = time * 0.18;
      
      const targetX = mouse.current.x * 0.5;
      const targetY = mouse.current.y * 0.3;
      meshRef.current.position.x = THREE.MathUtils.lerp(meshRef.current.position.x, targetX, 0.05);
      meshRef.current.position.y = THREE.MathUtils.lerp(meshRef.current.position.y, targetY - 0.15, 0.05);

      // Subtle breathing scale
      const scale = 1.0 + Math.sin(time * 1.2) * 0.05;
      meshRef.current.scale.set(scale, scale, scale);
    }
  });

  return (
    <group ref={meshRef}>
      <mesh>
        <icosahedronGeometry args={[1.2, 1]} />
        <meshStandardMaterial
          metalness={0.7}
          roughness={0.25}
          color="#00ffd1" // Emerald green / neon cyan
          flatShading
        />
      </mesh>
      {/* Glow wireframe */}
      <mesh>
        <icosahedronGeometry args={[1.205, 1]} />
        <meshBasicMaterial
          color="#00ffd1"
          wireframe
          transparent
          opacity={0.25}
          blending={THREE.AdditiveBlending}
        />
      </mesh>
    </group>
  );
};

// Shape 3: Copper Twisted Torus Knot
export const OrangeTorusKnot: React.FC<ObjectProps> = ({ mouse }) => {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    if (meshRef.current) {
      meshRef.current.rotation.x = time * 0.25;
      meshRef.current.rotation.y = time * 0.3;
      
      const targetX = mouse.current.x * 0.5;
      const targetY = mouse.current.y * 0.3;
      meshRef.current.position.x = THREE.MathUtils.lerp(meshRef.current.position.x, targetX, 0.05);
      meshRef.current.position.y = THREE.MathUtils.lerp(meshRef.current.position.y, targetY - 0.15, 0.05);

      const scale = 1.0 + Math.cos(time * 1.5) * 0.05;
      meshRef.current.scale.set(scale, scale, scale);
    }
  });

  return (
    <group ref={meshRef}>
      <mesh castShadow receiveShadow>
        <torusKnotGeometry args={[0.85, 0.28, 96, 12, 2, 3]} />
        <meshStandardMaterial
          metalness={0.95}
          roughness={0.14}
          color="#ff5500" // Neon orange / copper
          envMapIntensity={2.0}
        />
      </mesh>
      {/* Light wireframe highlights */}
      <mesh>
        <torusKnotGeometry args={[0.855, 0.282, 96, 12, 2, 3]} />
        <meshBasicMaterial
          color="#ffaa00"
          wireframe
          transparent
          opacity={0.15}
          blending={THREE.AdditiveBlending}
        />
      </mesh>
    </group>
  );
};

// Shape 4: Red Spiky Starburst Crystal
export const RedSpikyCrystal: React.FC<ObjectProps> = ({ mouse }) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const geomRef = useRef<THREE.IcosahedronGeometry>(null);
  const wireGeomRef = useRef<THREE.IcosahedronGeometry>(null);
  const originalPositions = useRef<Float32Array | null>(null);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    
    if (meshRef.current) {
      meshRef.current.rotation.y = time * 0.2;
      
      const targetX = mouse.current.x * 0.5;
      const targetY = mouse.current.y * 0.3;
      meshRef.current.position.x = THREE.MathUtils.lerp(meshRef.current.position.x, targetX, 0.05);
      meshRef.current.position.y = THREE.MathUtils.lerp(meshRef.current.position.y, targetY - 0.15, 0.05);
    }

    if (geomRef.current) {
      const posAttr = geomRef.current.attributes.position;
      if (!originalPositions.current) {
        originalPositions.current = posAttr.array.slice() as Float32Array;
      }

      const orig = originalPositions.current;
      for (let i = 0; i < posAttr.count; i++) {
        const x = orig[i * 3];
        const y = orig[i * 3 + 1];
        const z = orig[i * 3 + 2];

        const length = Math.sqrt(x*x + y*y + z*z);
        const nx = x / length;
        const ny = y / length;
        const nz = z / length;

        // High frequency starburst spikes
        const spike = Math.sin(nx * 14 + time * 3.5) * Math.cos(ny * 14 + time * 3.5) * Math.sin(nz * 14 + time * 3.5);
        const offset = spike > 0 ? spike * 0.55 : spike * 0.15;
        const newLength = length + offset;

        posAttr.setXYZ(i, nx * newLength, ny * newLength, nz * newLength);
      }
      posAttr.needsUpdate = true;
      geomRef.current.computeVertexNormals();

      // Mirror positions to wireframe
      if (wireGeomRef.current) {
        const wirePosAttr = wireGeomRef.current.attributes.position;
        for (let i = 0; i < posAttr.count; i++) {
          wirePosAttr.setXYZ(
            i, 
            posAttr.getX(i) * 1.005, 
            posAttr.getY(i) * 1.005, 
            posAttr.getZ(i) * 1.005
          );
        }
        wirePosAttr.needsUpdate = true;
        wireGeomRef.current.computeVertexNormals();
      }
    }
  });

  return (
    <group ref={meshRef}>
      <mesh castShadow receiveShadow>
        <icosahedronGeometry ref={geomRef} args={[1.1, 2]} />
        <meshStandardMaterial
          metalness={0.8}
          roughness={0.12}
          color="#ff0044" // Deep bright red / crimson
          flatShading
        />
      </mesh>
      {/* Wireframe crystal wrap */}
      <mesh>
        <icosahedronGeometry ref={wireGeomRef} args={[1.1, 2]} />
        <meshBasicMaterial
          color="#ff8888"
          wireframe
          transparent
          opacity={0.25}
          blending={THREE.AdditiveBlending}
        />
      </mesh>
    </group>
  );
};
