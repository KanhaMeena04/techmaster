import React, { useState, useEffect, useRef } from "react";
import { Check } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Canvas } from "@react-three/fiber";
import { Environment } from "@react-three/drei";
import servicesData from "../data/services.json";

// 3D Shape Components
import { 
  BlueMorphingOrb, 
  GreenFacetedSphere, 
  DNAHelixObject, 
  GeodesicShield 
} from "../three/ShowcaseObjects";

export const Services: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const mouse = useRef({ x: 0, y: 0 });

  // Track mouse coordinates for interactive 3D parallax
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouse.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouse.current.y = -(e.clientY / window.innerHeight) * 2 + 1;
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // Calculate active slide index based on overall scroll progress through the parent container height
  useEffect(() => {
    const handleScroll = () => {
      const container = containerRef.current;
      if (!container) return;

      const rect = container.getBoundingClientRect();
      const totalHeight = rect.height - window.innerHeight;
      const scrolled = -rect.top;

      if (totalHeight > 0) {
        const progress = Math.max(0, Math.min(scrolled / totalHeight, 1));
        // Distribute progress across the 4 services (0 to 3)
        const index = Math.min(Math.floor(progress * 4), 3);
        setActiveIndex(index);
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // run on initial mount
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div ref={containerRef} className="relative w-full h-[400vh] bg-transparent">
      
      {/* Sticky Fullscreen Viewport Wrapper */}
      <div className="sticky top-0 w-full h-screen flex flex-col justify-between overflow-hidden pt-20 md:pt-32 pb-6 md:pb-12 px-4 md:px-12 z-10">
        
        {/* Background glow orbs */}
        <div className="absolute top-1/3 right-1/4 w-[35vw] h-[35vw] aurora-glow-purple opacity-15 pointer-events-none -translate-y-1/2" />
        <div className="absolute bottom-1/4 left-1/4 w-[30vw] h-[30vw] aurora-glow-gold opacity-10 pointer-events-none translate-y-1/2" />

        {/* Hero Header */}
        <header className="max-w-7xl w-full mx-auto flex justify-between items-start mb-4 md:mb-6">
          <div>
            <span className="text-[10px] uppercase tracking-[6px] text-gold font-bold mb-1 md:mb-2 block">
              CORE PORTALS
            </span>
            <h1 className="font-serif text-2xl sm:text-4xl md:text-5xl font-light leading-tight">
              Services, Courses & <br />
              <span className="text-gold italic font-bold">Keynote Bookings</span>.
            </h1>
          </div>
          <p className="hidden md:block text-white/40 font-light text-xs max-w-xs text-right mt-2 font-mono">
            Scroll to cycle through developer tracks, speaking options, and partnerships.
          </p>
        </header>

        {/* Showcase Grid (Morphing 3D + Sliding Text) */}
        <div className="max-w-7xl w-full mx-auto flex-grow grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center h-[60vh] lg:h-[55vh]">
          
          {/* Left Column: 3D Canvas Box (LGB 5) */}
          <div className="lg:col-span-5 h-[28vh] lg:h-full flex items-center justify-center border border-white/5 rounded-3xl bg-[#030303]/30 backdrop-blur-md overflow-hidden relative shadow-[0_0_50px_rgba(0,0,0,0.4)]">
            
            {/* Vertical Index Indicators */}
            <div className="absolute left-6 top-1/2 -translate-y-1/2 flex flex-col gap-4 lg:gap-6 font-mono text-[10px] lg:text-xs z-20">
              {servicesData.map((_, idx) => (
                <div 
                  key={idx} 
                  className={`transition-all duration-500 flex items-center gap-2 cursor-pointer ${
                    activeIndex === idx 
                      ? "text-gold font-bold scale-125" 
                      : "text-white/20 hover:text-white/50"
                  }`}
                  onClick={() => {
                    const container = containerRef.current;
                    if (container) {
                      const containerTop = container.offsetTop;
                      const scrollHeight = container.scrollHeight - window.innerHeight;
                      const targetScroll = containerTop + (idx / 4) * scrollHeight + 10;
                      window.scrollTo({ top: targetScroll, behavior: "smooth" });
                    }
                  }}
                >
                  <span>0{idx + 1}</span>
                  {activeIndex === idx && (
                    <div className="w-1.5 h-1.5 rounded-full bg-gold shadow-[0_0_8px_#d4af37]" />
                  )}
                </div>
              ))}
            </div>

            {/* 3D Canvas Showcase */}
            <div className="w-full h-full relative">
              <Canvas
                camera={{ position: [0, 0, 4.5], fov: 45 }}
                gl={{ antialias: true, alpha: true }}
              >
                <ambientLight intensity={0.5} />
                <directionalLight position={[5, 5, 5]} intensity={1.5} color="#ffffff" />
                <directionalLight position={[-5, -5, -2]} intensity={0.6} color="#00E5FF" />
                <pointLight position={[2, 3, 2]} intensity={2.0} color="#00ffd1" />
                <pointLight position={[-2, -3, 2]} intensity={1.5} color="#0055ff" />
                <Environment preset="studio" />

                {/* Show shape matching the scroll activeIndex */}
                <group>
                  {activeIndex === 0 && <BlueMorphingOrb mouse={mouse} />}
                  {activeIndex === 1 && <GreenFacetedSphere mouse={mouse} />}
                  {activeIndex === 2 && <DNAHelixObject mouse={mouse} />}
                  {activeIndex === 3 && <GeodesicShield mouse={mouse} />}
                </group>
              </Canvas>
            </div>
          </div>

          {/* Right Column: Sliding/Fading Text Component (LGB 7) */}
          <div className="lg:col-span-7 h-[30vh] lg:h-full flex flex-col justify-center relative pl-0 lg:pl-10">
            <AnimatePresence mode="wait">
              {servicesData.map((srv, idx) => {
                if (idx !== activeIndex) return null;
                return (
                  <motion.div
                    key={srv.id}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -30 }}
                    transition={{ duration: 0.5, ease: "easeInOut" }}
                    className="glass-panel p-6 md:p-12 rounded-3xl border border-white/5 bg-[#030303]/30 backdrop-blur-md shadow-[0_0_50px_rgba(0,0,0,0.4)] relative overflow-hidden flex flex-col justify-center h-full text-left"
                  >
                    <div className="flex items-center gap-3 mb-2 lg:mb-3">
                      <span className="font-mono text-gold text-xs tracking-[2px]">0{idx + 1}</span>
                      <span className="h-[1px] w-6 bg-gold/30"></span>
                      <span 
                        className="text-[9px] uppercase tracking-[2px] font-bold" 
                        style={{ color: srv.accentColor }}
                      >
                        {srv.tagline}
                      </span>
                    </div>

                    <h2 className="font-serif text-2xl sm:text-4xl lg:text-5xl font-bold text-white mb-4 lg:mb-6">
                      {srv.title}
                    </h2>

                    <p className="text-white/60 font-light text-xs sm:text-sm lg:text-base leading-relaxed mb-6 lg:mb-8 max-w-xl">
                      {srv.description}
                    </p>

                    <h4 className="text-[10px] uppercase tracking-[2px] text-gold font-bold mb-3">Core Deliverables:</h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 lg:gap-3.5 max-w-lg">
                      {srv.features.map((feature, fIdx) => (
                        <div key={fIdx} className="flex items-center gap-2.5 text-xs text-white/70 font-light">
                          <div className="w-4 h-4 rounded-full bg-white/5 flex items-center justify-center text-gold border border-white/10 shrink-0">
                            <Check className="w-2.5 h-2.5" />
                          </div>
                          <span>{feature}</span>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>

        </div>

        {/* Showcase Footer */}
        <footer className="max-w-7xl w-full mx-auto flex justify-between items-center text-[8px] md:text-[9px] font-mono tracking-[2px] uppercase opacity-35 mt-4 border-t border-white/5 pt-4">
          <span>Tech Master F Lab</span>
          <span>Active Phase: 0{activeIndex + 1} &bull; {Math.round((activeIndex + 1) * 25)}%</span>
        </footer>

      </div>
    </div>
  );
};
