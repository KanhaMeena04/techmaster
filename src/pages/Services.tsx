import React, { useState } from "react";
import { Cpu, Layers, Box, Sparkles, Check, ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import servicesData from "../data/services.json";

export const Services: React.FC = () => {
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case "Cpu":
        return <Cpu className="w-5 h-5" />;
      case "Layers":
        return <Layers className="w-5 h-5" />;
      case "Box":
        return <Box className="w-5 h-5" />;
      case "Sparkles":
        return <Sparkles className="w-5 h-5" />;
      default:
        return <Cpu className="w-5 h-5" />;
    }
  };

  return (
    <div className="relative text-white min-h-screen pt-32 pb-24 px-6 overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-1/3 right-1/4 w-[35vw] h-[35vw] aurora-glow-purple opacity-20 pointer-events-none" />
      <div className="absolute bottom-1/4 left-1/4 w-[30vw] h-[30vw] aurora-glow-gold opacity-10 pointer-events-none" />

      {/* Hero Header */}
      <section className="max-w-7xl mx-auto text-left mb-24 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-[10px] uppercase tracking-[6px] text-gold font-bold mb-4"
        >
          CORE PORTALS
        </motion.div>
        
        <h1 className="font-serif text-4xl sm:text-6xl md:text-7xl font-light leading-tight mb-8">
          Services, Courses & <br />
          <span className="text-gold italic font-bold">Keynote Bookings</span>.
        </h1>

        <p className="text-white/50 font-light text-base md:text-lg max-w-2xl leading-relaxed mt-6">
          Explore Faisal's developer training tracks, speaking keynote requests, collaborative student hackathons, and brand sponsorships.
        </p>
      </section>

      {/* Services List Section */}
      <section className="max-w-4xl mx-auto text-left flex flex-col gap-6 relative z-10">
        {servicesData.map((srv, idx) => {
          const isExpanded = expandedId === srv.id;

          return (
            <div
              key={srv.id}
              className="glass-panel rounded-3xl overflow-hidden border border-white/5 hover:border-gold/25 transition-all duration-500"
            >
              {/* Header trigger */}
              <button
                onClick={() => setExpandedId(isExpanded ? null : srv.id)}
                className="w-full p-8 flex items-center justify-between text-left focus:outline-none"
              >
                <div className="flex items-center gap-6">
                  <span className="font-mono text-sm opacity-30">0{idx + 1}</span>
                  <div
                    className="w-10 h-10 rounded-full flex items-center justify-center border"
                    style={{
                      color: srv.accentColor,
                      borderColor: srv.accentColor + "30",
                      backgroundColor: srv.accentColor + "10",
                    }}
                  >
                    {getIcon(srv.icon)}
                  </div>
                  <div>
                    <h3 className="font-serif text-xl sm:text-2xl font-bold text-white transition-colors duration-300">
                      {srv.title}
                    </h3>
                    <span className="text-[10px] uppercase tracking-[1.5px] opacity-40 block">
                      {srv.tagline}
                    </span>
                  </div>
                </div>

                <motion.div
                  animate={{ rotate: isExpanded ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <ChevronDown className="w-5 h-5 text-white/55 hover:text-white" />
                </motion.div>
              </button>

              {/* Collapsible details */}
              <AnimatePresence initial={false}>
                {isExpanded && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.4, ease: "easeInOut" }}
                  >
                    <div className="px-8 pb-8 pt-2 border-t border-white/5 bg-white/[0.01]">
                      <p className="text-white/60 font-light text-sm md:text-base leading-relaxed mb-6">
                        {srv.description}
                      </p>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {srv.features.map((feat, fidx) => (
                          <div key={fidx} className="flex items-center gap-3">
                            <div className="w-5 h-5 rounded-full bg-gold/15 flex items-center justify-center shrink-0">
                              <Check className="w-3 h-3 text-gold" />
                            </div>
                            <span className="text-xs text-white/80">{feat}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </section>
    </div>
  );
};
