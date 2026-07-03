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

// Shape 3: Holographic DNA Double Helix — Premium orbital strand structure
export const DNAHelixObject: React.FC<ObjectProps> = ({ mouse }) => {
  const groupRef = useRef<THREE.Group>(null);

  const strandCount = 28;
  const radius = 0.75;
  const height = 3.2;
  const twist = Math.PI * 3;

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    if (groupRef.current) {
      groupRef.current.rotation.y = time * 0.3;
      groupRef.current.rotation.x = Math.sin(time * 0.2) * 0.1;

      const targetX = mouse.current.x * 0.5;
      const targetY = mouse.current.y * 0.3;
      groupRef.current.position.x = THREE.MathUtils.lerp(groupRef.current.position.x, targetX, 0.05);
      groupRef.current.position.y = THREE.MathUtils.lerp(groupRef.current.position.y, targetY, 0.05);
    }
  });

  const nodes = Array.from({ length: strandCount }, (_, i) => {
    const t = i / (strandCount - 1); // 0 to 1
    const angle1 = t * twist;
    const angle2 = angle1 + Math.PI;
    const y = (t - 0.5) * height;

    return {
      a: new THREE.Vector3(Math.cos(angle1) * radius, y, Math.sin(angle1) * radius),
      b: new THREE.Vector3(Math.cos(angle2) * radius, y, Math.sin(angle2) * radius),
    };
  });

  return (
    <group ref={groupRef}>
      {nodes.map(({ a, b }, i) => {
        const mid = new THREE.Vector3().addVectors(a, b).multiplyScalar(0.5);
        const dir = new THREE.Vector3().subVectors(b, a);
        const len = dir.length();
        const quat = new THREE.Quaternion().setFromUnitVectors(
          new THREE.Vector3(0, 1, 0),
          dir.clone().normalize()
        );

        return (
          <group key={i}>
            {/* Strand A node */}
            <mesh position={a.toArray()}>
              <sphereGeometry args={[0.07, 12, 12]} />
              <meshStandardMaterial color="#00E5FF" metalness={0.8} roughness={0.1} />
            </mesh>
            {/* Strand B node */}
            <mesh position={b.toArray()}>
              <sphereGeometry args={[0.07, 12, 12]} />
              <meshStandardMaterial color="#aa3bff" metalness={0.8} roughness={0.1} />
            </mesh>
            {/* Connecting rung */}
            <mesh position={mid.toArray()} quaternion={quat.toArray() as [number, number, number, number]}>
              <cylinderGeometry args={[0.012, 0.012, len, 6]} />
              <meshBasicMaterial
                color="#ffffff"
                transparent
                opacity={0.18}
                blending={THREE.AdditiveBlending}
              />
            </mesh>
          </group>
        );
      })}
    </group>
  );
};

// Shape 4: Multi-layer Geodesic Orbital Shield
export const GeodesicShield: React.FC<ObjectProps> = ({ mouse }) => {
  const outerRef = useRef<THREE.Mesh>(null);
  const midRef   = useRef<THREE.Mesh>(null);
  const innerRef = useRef<THREE.Mesh>(null);
  const coreRef  = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();

    if (outerRef.current) {
      outerRef.current.rotation.x = time * 0.12;
      outerRef.current.rotation.y = time * 0.18;
      const targetX = mouse.current.x * 0.5;
      const targetY = mouse.current.y * 0.3;
      outerRef.current.position.x = THREE.MathUtils.lerp(outerRef.current.position.x, targetX, 0.04);
      outerRef.current.position.y = THREE.MathUtils.lerp(outerRef.current.position.y, targetY, 0.04);
    }
    if (midRef.current) {
      midRef.current.rotation.x = -time * 0.22;
      midRef.current.rotation.z = time * 0.14;
    }
    if (innerRef.current) {
      innerRef.current.rotation.y = time * 0.35;
      innerRef.current.rotation.z = -time * 0.2;
    }
    if (coreRef.current) {
      // Pulsing glowing core
      const pulse = 1.0 + Math.sin(time * 2.5) * 0.12;
      coreRef.current.scale.setScalar(pulse);
    }
  });

  return (
    <group>
      {/* Outer geodesic wireframe shell */}
      <mesh ref={outerRef}>
        <icosahedronGeometry args={[1.55, 1]} />
        <meshBasicMaterial
          color="#00E5FF"
          wireframe
          transparent
          opacity={0.22}
          blending={THREE.AdditiveBlending}
        />
      </mesh>

      {/* Middle solid faceted layer */}
      <mesh ref={midRef}>
        <icosahedronGeometry args={[1.18, 1]} />
        <meshStandardMaterial
          metalness={0.7}
          roughness={0.2}
          color="#0a2a5e"
          flatShading
        />
      </mesh>

      {/* Inner wireframe ring */}
      <mesh ref={innerRef}>
        <icosahedronGeometry args={[0.85, 0]} />
        <meshBasicMaterial
          color="#aa3bff"
          wireframe
          transparent
          opacity={0.6}
          blending={THREE.AdditiveBlending}
        />
      </mesh>

      {/* Glowing energy core */}
      <mesh ref={coreRef}>
        <sphereGeometry args={[0.32, 32, 32]} />
        <meshStandardMaterial
          color="#00ffd1"
          emissive="#00ffd1"
          emissiveIntensity={2.5}
          roughness={0}
          metalness={0}
        />
      </mesh>
    </group>
  );
};
