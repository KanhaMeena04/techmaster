import React from "react";
import { Download, Film } from "lucide-react";
import { motion } from "framer-motion";
import mediaData from "../data/media.json";

export const Media: React.FC = () => {
  return (
    <div className="relative text-white min-h-screen pt-32 pb-24 px-6 overflow-hidden">
      {/* Background Orbs */}
      <div className="absolute top-1/4 right-1/3 w-[30vw] h-[30vw] aurora-glow-blue opacity-15 pointer-events-none -translate-y-1/2" />
      <div className="absolute bottom-1/4 left-1/4 w-[30vw] h-[30vw] aurora-glow-purple opacity-10 pointer-events-none" />

      {/* Hero Header */}
      <section className="max-w-7xl mx-auto text-left mb-20 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-[10px] uppercase tracking-[6px] text-gold font-bold mb-4"
        >
          NEWSROOM HUB
        </motion.div>
        
        <h1 className="font-serif text-4xl sm:text-6xl md:text-7xl font-light leading-tight mb-6">
          Press Kit & <br />
          <span className="text-gold italic font-bold">Media Appearances</span>.
        </h1>
      </section>

      {/* Video Showreel Card */}
      <section className="max-w-7xl mx-auto mb-20 text-left relative z-10">
        <div className="glass-panel p-6 md:p-8 rounded-3xl overflow-hidden border border-white/5 relative aspect-video flex flex-col justify-end">
          {/* Simulated showreel thumbnail */}
          <div 
            className="absolute inset-0 bg-cover bg-center opacity-40 hover:scale-103 transition-transform duration-700 pointer-events-none animate-pulse" 
            style={{ backgroundImage: `url('${mediaData.showreel.thumbnail}')` }} 
          />
          
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent pointer-events-none" />

          {/* Showreel tag */}
          <div className="z-10 absolute top-6 right-6 bg-gold/15 border border-gold/30 px-4 py-1.5 rounded-full text-gold text-[9px] uppercase tracking-[2px] font-bold flex items-center gap-2">
            <Film className="w-3.5 h-3.5" />
            Core Presentation Showreel
          </div>

          <div className="z-10 max-w-xl">
            <h2 className="font-serif text-2xl sm:text-4xl text-white font-medium mb-3 uppercase">
              {mediaData.showreel.title}
            </h2>
            <p className="text-white/70 text-xs md:text-sm font-light leading-relaxed mb-6">
              {mediaData.showreel.description}
            </p>
            <button className="px-6 py-3 bg-white text-black font-bold uppercase text-[10px] tracking-[2px] rounded-full hover:bg-gold transition-colors duration-300" data-cursor="play">
              Play Showreel
            </button>
          </div>
        </div>
      </section>

      {/* Download Kits & Press Releases */}
      <section className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 text-left relative z-10">
        {/* Assets Download */}
        <div>
          <h3 className="font-serif text-2xl text-white font-bold mb-6">Speaker & Press Assets</h3>
          <div className="flex flex-col gap-4">
            {mediaData.downloads.map((ast, idx) => (
              <div key={idx} className="glass-panel p-6 rounded-2xl flex items-center justify-between border border-white/5 hover:border-gold/20 transition-all duration-300">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-gold">
                    <Download className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-white">{ast.name}</h4>
                    <span className="text-[10px] opacity-40 font-mono">{ast.format} &bull; {ast.size}</span>
                  </div>
                </div>
                <button className="px-4 py-2 border border-white/10 rounded-full text-[10px] font-bold uppercase tracking-[1px] hover:border-gold hover:text-gold transition-colors duration-300">
                  Download
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* PressMentions */}
        <div>
          <h3 className="font-serif text-2xl text-white font-bold mb-6">Editorial Mentions</h3>
          <div className="flex flex-col gap-6">
            {mediaData.editorialMentions.map((clp, idx) => (
              <div key={idx} className="border-b border-white/5 pb-4 last:border-b-0">
                <span className="text-[9px] font-mono tracking-[2px] text-gold font-bold block mb-1">{clp.source}</span>
                <h4 className="text-sm font-bold text-white hover:text-gold transition-colors duration-300 cursor-pointer">{clp.title}</h4>
                <span className="text-[10px] opacity-40 block mt-1">{clp.date}</span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};
