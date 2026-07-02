import React from "react";
import { Calendar, CheckCircle } from "lucide-react";
import { motion } from "framer-motion";
import campaignsData from "../data/campaigns.json";
import { LuxuryCard } from "../components/LuxuryCard";

export const Campaigns: React.FC = () => {
  return (
    <div className="relative text-white min-h-screen pt-32 pb-24 px-6 overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-1/4 right-1/4 w-[35vw] h-[35vw] aurora-glow-purple opacity-20 pointer-events-none" />
      <div className="absolute bottom-1/4 left-1/4 w-[30vw] h-[30vw] aurora-glow-gold opacity-10 pointer-events-none" />

      {/* Hero Header */}
      <section className="max-w-7xl mx-auto text-left mb-24 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-[10px] uppercase tracking-[6px] text-gold font-bold mb-4"
        >
          INITIATIVE CAMPAIGNS
        </motion.div>
        
        <h1 className="font-serif text-4xl sm:text-6xl md:text-7xl font-light leading-tight mb-8">
          Empowerment Drives & <br />
          <span className="text-gold italic font-bold">Coding Challenges</span>.
        </h1>

        <p className="text-white/50 font-light text-base md:text-lg max-w-2xl leading-relaxed mt-6">
          Review our campaigns designed to bring cloud services, laptops, coding bootcamps, and career mentoring to students globally.
        </p>
      </section>

      {/* Campaigns Grid */}
      <section className="max-w-7xl mx-auto text-left grid grid-cols-1 lg:grid-cols-3 gap-8 relative z-10">
        {campaignsData.map((item, idx) => (
          <LuxuryCard key={item.id} accentColor={item.accentColor} index={idx}>
            <div className="flex flex-col h-full justify-between">
              
              <div className="aspect-video w-full rounded-2xl overflow-hidden border border-white/5 mb-6 relative">
                <img
                  src={item.coverImage}
                  alt={item.title}
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute top-3 left-3 bg-black/80 border border-white/10 px-3 py-1 rounded-full text-[9px] uppercase tracking-[1px] font-mono text-gold">
                  Reach: {item.reach}
                </div>
              </div>

              <div className="flex justify-between items-center mb-4">
                <span className="text-[9px] font-mono text-gold flex items-center gap-1.5 font-bold uppercase">
                  <Calendar className="w-3.5 h-3.5 text-gold" />
                  Sponsor: {item.sponsor}
                </span>
                <span className="px-2 py-0.5 rounded bg-white/5 text-[9px] font-mono text-white/50 uppercase">
                  {item.status}
                </span>
              </div>

              <h3 className="font-serif text-2xl text-white font-medium mb-4 group-hover:text-gold transition-colors duration-300">
                {item.title}
              </h3>
              <p className="text-white/50 text-xs md:text-sm font-light leading-relaxed mb-6">
                {item.description}
              </p>

              <ul className="flex flex-col gap-2 pt-4 border-t border-white/5 mt-auto">
                {item.highlights.map((high, hidx) => (
                  <li key={hidx} className="flex items-start gap-2 text-[10px] text-white/60">
                    <CheckCircle className="w-3.5 h-3.5 text-gold shrink-0 mt-0.5" />
                    <span>{high}</span>
                  </li>
                ))}
              </ul>
            </div>
          </LuxuryCard>
        ))}
      </section>
    </div>
  );
};
