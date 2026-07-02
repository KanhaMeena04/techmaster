import React from "react";
import { motion } from "framer-motion";
import brandsData from "../data/brands.json";
import { LuxuryCard } from "../components/LuxuryCard";

export const Collaborations: React.FC = () => {
  return (
    <div className="relative text-white min-h-screen pt-32 pb-24 px-6 overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-1/4 left-1/4 w-[35vw] h-[35vw] aurora-glow-purple opacity-20 pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[30vw] h-[30vw] aurora-glow-gold opacity-10 pointer-events-none" />

      {/* Hero Header */}
      <section className="max-w-7xl mx-auto text-left mb-24 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-[10px] uppercase tracking-[6px] text-gold font-bold mb-4"
        >
          BRAND COOPERATIONS
        </motion.div>
        
        <h1 className="font-serif text-4xl sm:text-6xl md:text-7xl font-light leading-tight mb-8">
          Alliances & <br />
          <span className="text-gold italic font-bold">Brand Collaborations</span>.
        </h1>

        <p className="text-white/50 font-light text-base md:text-lg max-w-2xl leading-relaxed mt-6">
          We join forces with leading technology companies and cloud giants to build open-source tools, launch hackathons, and deliver industry-relevant education.
        </p>
      </section>

      {/* Partners Grid */}
      <section className="max-w-7xl mx-auto text-left grid grid-cols-1 md:grid-cols-2 gap-8 mb-20 relative z-10">
        {brandsData.map((item, idx) => (
          <LuxuryCard key={item.id} accentColor={item.accentColor} index={idx}>
            <div className="flex justify-between items-start mb-6">
              <div 
                className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center font-serif text-xs font-bold"
                style={{ color: item.accentColor }}
              >
                {item.logo.substring(0, 2)}
              </div>
              <span className="text-[9px] font-mono tracking-[1.5px] text-gold uppercase">
                {item.type}
              </span>
            </div>

            <div className="mb-4">
              <h3 className="font-serif text-xl sm:text-2xl font-bold text-white group-hover:text-gold transition-colors duration-300">
                {item.name}
              </h3>
              <span className="text-white/40 text-[9px] uppercase tracking-[1px] font-mono block">
                Featured: {item.featuredWork}
              </span>
            </div>

            <p className="text-white/50 text-xs md:text-sm font-light leading-relaxed pt-4 border-t border-white/5 mt-4">
              {item.description}
            </p>
          </LuxuryCard>
        ))}
      </section>
    </div>
  );
};
