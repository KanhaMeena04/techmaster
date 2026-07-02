import React, { useEffect, useRef, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { Environment } from "@react-three/drei";
import { ParticleField } from "./ParticleField";
import { GlacierMountain } from "./GlacierMountain";

interface SceneContainerProps {
  activePage: string;
}

export const SceneContainer: React.FC<SceneContainerProps> = () => {
  const mouse = useRef({ x: 0, y: 0 });
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      // Normalize mouse positions to range [-1, 1]
      mouse.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouse.current.y = -(e.clientY / window.innerHeight) * 2 + 1;
    };

    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      if (totalScroll > 0) {
        setScrollProgress(window.scrollY / totalScroll);
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div 
      className="fixed inset-0 w-full h-screen pointer-events-none bg-transparent"
      style={{ zIndex: 2 }}
    >
      <Canvas
        camera={{ position: [0, 0, 5], fov: 45 }}
        gl={{ antialias: true, alpha: true }}
      >
        {/* Ambient lighting */}
        <ambientLight intensity={0.3} />
        
        {/* Main key light */}
        <directionalLight
          position={[5, 5, 5]}
          intensity={1.5}
          color="#ffffff"
          castShadow
        />

        {/* Soft fill light (electric cyan) */}
        <directionalLight
          position={[-5, -5, -2]}
          intensity={0.6}
          color="#00E5FF"
        />

        {/* Teal glowing accent light */}
        <pointLight
          position={[2, 3, 2]}
          intensity={2.5}
          distance={12}
          color="#00ffd1"
        />

        {/* Deep blue glowing light */}
        <pointLight
          position={[-2, -3, 2]}
          intensity={2.0}
          distance={12}
          color="#0055ff"
        />

        {/* Reflections environment */}
        <Environment preset="studio" />

        {/* Glacier Ice Mountain global background */}
        <GlacierMountain scrollProgress={scrollProgress} mouse={mouse} />

        {/* Simple floating dots */}
        <ParticleField scrollProgress={scrollProgress} />
      </Canvas>
    </div>
  );
};
