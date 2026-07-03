import React, { useEffect, useState } from "react";
import gsap from "gsap";
import logoImg from "../assets/logo.png";

interface IntroLoaderProps {
  onComplete: () => void;
}

export const IntroLoader: React.FC<IntroLoaderProps> = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Increment progress counter cinematically
    let currentProgress = 0;
    const interval = setInterval(() => {
      const increment = Math.floor(Math.random() * 15) + 3;
      currentProgress = Math.min(currentProgress + increment, 100);
      setProgress(currentProgress);

      if (currentProgress >= 100) {
        clearInterval(interval);
        
        // Trigger loader exit animation
        const tl = gsap.timeline({
          onComplete: onComplete
        });

        tl.to(".loader-logo", {
          scale: 1.2,
          opacity: 0,
          filter: "blur(20px)",
          duration: 0.8,
          ease: "power4.inOut"
        })
        .to(".loader-counter", {
          opacity: 0,
          y: -20,
          duration: 0.5,
          ease: "power2.in"
        }, "-=0.6")
        .to(".loader-panel", {
          clipPath: "polygon(0 0, 100% 0, 100% 0, 0 0)", // Slide up clip-path
          duration: 1.2,
          ease: "power4.inOut"
        }, "-=0.4");
      }
    }, 150);

    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <div className="loader-panel fixed inset-0 bg-[#030303] z-[99999] flex flex-col justify-between p-12 overflow-hidden text-white"
         style={{ clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)" }}>
      
      {/* Background radial glow */}
      <div className="absolute inset-0 bg-radial-[circle_at_center,rgba(170,59,255,0.08)_0%,rgba(3,3,3,0)_70%] pointer-events-none" />

      {/* Header section of loader */}
      <div className="flex justify-between items-center z-10">
        <div className="font-serif text-sm tracking-[4px] text-gold/80 font-bold">TECH MASTER</div>
        <div className="text-xs uppercase tracking-[2px] opacity-40 font-mono">CREATIVE BRAND DIRECTORY</div>
      </div>

      {/* Center elements - Logo */}
      <div className="flex flex-col items-center justify-center flex-grow z-10">
        <div className="loader-logo relative flex flex-col items-center">
          <div className="w-24 h-24 rounded-full border border-gold/20 flex items-center justify-center relative overflow-hidden shadow-[0_0_50px_rgba(212,175,55,0.15)] bg-white">
            <img 
              src={logoImg} 
              alt="Tech Master Logo" 
              className="w-full h-full object-contain p-2" 
            />
          </div>
          <div className="mt-6 text-xs uppercase tracking-[8px] text-white/90">INNOVATION ARCHITECTURE</div>
        </div>
      </div>

      {/* Footer section of loader - Progress Counter */}
      <div className="flex justify-between items-end z-10">
        <div className="max-w-xs text-left">
          <p className="text-xs uppercase tracking-[2px] text-gold font-bold mb-1">Status</p>
          <p className="text-xs opacity-50 uppercase tracking-[1px] leading-relaxed">Scaffolding digital environment. Aligning spatial coordinate matrices...</p>
        </div>
        
        <div className="loader-counter text-right">
          <div className="font-serif text-8xl font-black text-transparent bg-clip-text bg-gradient-to-b from-white to-neutral-700 tracking-tighter leading-none select-none">
            {progress.toString().padStart(3, "0")}
          </div>
          <span className="text-[10px] uppercase tracking-[6px] text-gold/80 ml-2">SYSTEM LOADING %</span>
        </div>
      </div>

      {/* Light Sweep overlay */}
      <div className="absolute inset-0 bg-linear-to-r from-transparent via-white/5 to-transparent -translate-x-full animate-[shimmer_2s_infinite] pointer-events-none" />
    </div>
  );
};
