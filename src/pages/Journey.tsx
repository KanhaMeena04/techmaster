import React, { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import journeyData from "../data/journey.json";
import { LuxuryCard } from "../components/LuxuryCard";
import { Calendar, ArrowDown } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

export const Journey: React.FC = () => {
  const timelineRef = useRef<HTMLDivElement>(null);
  const progressLineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // 1. Scroll-animated progress line that grows downward as user scrolls
    if (progressLineRef.current && timelineRef.current) {
      gsap.fromTo(
        progressLineRef.current,
        { scaleY: 0 },
        {
          scaleY: 1,
          ease: "none",
          transformOrigin: "top center",
          scrollTrigger: {
            trigger: timelineRef.current,
            start: "top 60%",
            end: "bottom 80%",
            scrub: 1.2, // Smoothly ties animation to scroll progress
          },
        }
      );
    }

    // 2. Reveal animation for timeline card content
    const items = document.querySelectorAll(".timeline-item");
    items.forEach((item) => {
      gsap.fromTo(
        item.querySelectorAll(".timeline-reveal"),
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.15,
          ease: "power3.out",
          scrollTrigger: {
            trigger: item,
            start: "top 80%",
            toggleActions: "play none none none",
          },
        }
      );

      // 3. Year highlight — glow when node enters viewport
      const yearEl = item.querySelector(".year-label");
      const dotEl = item.querySelector(".timeline-dot > div");
      if (yearEl && dotEl) {
        gsap.fromTo(
          yearEl,
          { color: "rgba(0,255,209,0.2)", textShadow: "none" },
          {
            color: "#00ffd1",
            textShadow: "0 0 30px rgba(0,255,209,0.6), 0 0 60px rgba(0,255,209,0.3)",
            duration: 0.6,
            ease: "power2.out",
            scrollTrigger: {
              trigger: item,
              start: "top 68%",
              toggleActions: "play none none reverse",
            },
          }
        );

        // Inner dot pulse + border glow on activate
        gsap.fromTo(
          dotEl,
          { scale: 1, boxShadow: "0 0 0px #00ffd1", borderColor: "rgba(0,255,209,0.3)" },
          {
            scale: 1.35,
            boxShadow: "0 0 20px rgba(0,255,209,0.9), 0 0 40px rgba(0,255,209,0.4)",
            borderColor: "#00ffd1",
            duration: 0.5,
            ease: "power2.out",
            scrollTrigger: {
              trigger: item,
              start: "top 68%",
              toggleActions: "play none none reverse",
            },
          }
        );
      }
    });

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <div className="relative text-white min-h-screen pt-32 pb-24 px-6 overflow-hidden">
      {/* Background radial glows */}
      <div className="absolute top-1/4 left-1/2 w-[60vw] h-[60vw] aurora-glow-purple opacity-20 pointer-events-none -translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-1/4 right-1/4 w-[40vw] h-[40vw] aurora-glow-gold opacity-10 pointer-events-none translate-x-1/2 translate-y-1/2" />

      {/* Hero Section */}
      <div className="max-w-4xl mx-auto text-center mb-24 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-[10px] uppercase tracking-[6px] text-gold font-bold mb-4"
        >
          FOUNDER CHRONICLES
        </motion.div>
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="font-serif text-4xl sm:text-6xl font-light leading-tight mb-6"
        >
          The Journey of <br />
          <span className="text-gold italic font-bold">Tech Master F</span>
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-white/60 text-sm sm:text-base font-light max-w-xl mx-auto leading-relaxed"
        >
          Tracing the evolution of Faisal's personal brand from writing basic pointers on a whiteboard in 2015 to building global tech learning ecosystems.
        </motion.p>

        {/* Scroll Indicator */}
        <div className="flex flex-col items-center gap-2 mt-12 opacity-55">
          <span className="text-[9px] uppercase tracking-[3px]">Explore timeline</span>
          <ArrowDown className="w-4 h-4 text-gold animate-bounce" />
        </div>
      </div>

      {/* Timeline Section */}
      <div ref={timelineRef} className="max-w-4xl mx-auto relative z-10">
        {/* Static background track line */}
        <div className="absolute left-4 sm:left-1/2 top-0 bottom-0 w-[1px] bg-white/8 -translate-x-1/2" />

        {/* Animated progress line — grows from top to bottom on scroll */}
        <div
          ref={progressLineRef}
          className="absolute left-4 sm:left-1/2 top-0 bottom-0 w-[1px] -translate-x-1/2 origin-top"
          style={{
            background: "linear-gradient(to bottom, #00ffd1, #00a3ff, #aa3bff)",
            boxShadow: "0 0 8px rgba(0,255,209,0.5)",
            scaleY: 0,
          }}
        />

        <div className="flex flex-col gap-16 relative">
          {journeyData.map((item, index) => {
            const isEven = index % 2 === 0;
            return (
              <div
                key={index}
                className="timeline-item flex flex-col sm:flex-row relative w-full items-start sm:justify-between"
              >
                {/* Timeline connector dot — precisely centered on the line */}
                <div
                  className="timeline-dot absolute left-4 sm:left-1/2 top-2 z-20"
                  style={{ transform: "translate(-50%, 0)" }}
                >
                  <div className="w-4 h-4 rounded-full border-2 border-gold/50 bg-[#010a15] flex items-center justify-center">
                    <div className="w-1.5 h-1.5 rounded-full bg-gold" />
                  </div>
                </div>

                {/* Left: year on even items */}
                <div className={`hidden sm:block w-[45%] ${isEven ? "order-1 text-right" : "order-2"}`}>
                  {isEven && (
                    <div className="timeline-reveal pr-8 pt-1">
                      <span
                        className="year-label font-serif text-5xl font-black block mb-1 transition-all duration-500"
                        style={{ color: "rgba(0,255,209,0.2)" }}
                      >
                        {item.year}
                      </span>
                      <span className="text-white/40 text-xs uppercase tracking-[2px] font-mono">
                        {item.subtitle}
                      </span>
                    </div>
                  )}
                </div>

                {/* Right: content card (and year on odd items) */}
                <div className={`w-[90%] sm:w-[45%] pl-10 sm:pl-0 ${isEven ? "order-2 sm:order-2" : "order-2 sm:order-1 text-left sm:text-right"}`}>
                  {!isEven && (
                    <div className="timeline-reveal hidden sm:block pl-8 pb-4 pt-1">
                      <span
                        className="year-label font-serif text-5xl font-black block mb-1 transition-all duration-500"
                        style={{ color: "rgba(0,255,209,0.2)" }}
                      >
                        {item.year}
                      </span>
                      <span className="text-white/40 text-xs uppercase tracking-[2px] font-mono">
                        {item.subtitle}
                      </span>
                    </div>
                  )}

                  {/* Mobile year display */}
                  <div className="sm:hidden timeline-reveal mb-2">
                    <span
                      className="year-label font-serif text-3xl font-black block transition-all duration-500"
                      style={{ color: "rgba(0,255,209,0.2)" }}
                    >
                      {item.year}
                    </span>
                    <span className="text-white/40 text-xs uppercase tracking-[1px] font-mono">
                      {item.subtitle}
                    </span>
                  </div>

                  <LuxuryCard
                    accentColor="#00ffd1"
                    className="timeline-reveal"
                    index={index}
                  >
                    <div className="flex items-center gap-2 mb-4 text-gold">
                      <Calendar className="w-4 h-4" />
                      <span className="font-mono text-xs uppercase tracking-[2px]">
                        Epoch {item.year}
                      </span>
                    </div>
                    <h3 className="font-serif text-xl md:text-2xl text-white font-medium mb-3">
                      {item.title}
                    </h3>
                    <p className="text-white/50 text-xs md:text-sm font-light leading-relaxed">
                      {item.description}
                    </p>
                  </LuxuryCard>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
