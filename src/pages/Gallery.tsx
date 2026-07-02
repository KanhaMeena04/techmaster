import React from "react";
import { motion } from "framer-motion";
import galleryData from "../data/gallery.json";

export const Gallery: React.FC = () => {
  return (
    <div className="relative text-white min-h-screen pt-32 pb-24 px-6 overflow-hidden">
      {/* Background Orbs */}
      <div className="absolute top-1/3 left-1/2 w-[40vw] h-[40vw] aurora-glow-purple opacity-20 pointer-events-none -translate-x-1/2" />
      <div className="absolute bottom-1/4 right-1/4 w-[30vw] h-[30vw] aurora-glow-gold opacity-10 pointer-events-none" />

      {/* Hero Header */}
      <section className="max-w-7xl mx-auto text-left mb-20 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-[10px] uppercase tracking-[6px] text-gold font-bold mb-4"
        >
          CREATOR ARCHIVES
        </motion.div>
        
        <h1 className="font-serif text-4xl sm:text-6xl md:text-7xl font-light leading-tight">
          Visual Highlights & <br />
          <span className="text-gold italic font-bold">Behind The Scenes</span>.
        </h1>
      </section>

      {/* Gallery Grid - Masonry */}
      <section className="max-w-7xl mx-auto text-left relative z-10">
        <div className="columns-1 sm:columns-2 lg:columns-3 gap-8 space-y-8">
          {galleryData.map((item, index) => (
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.05 }}
              key={item.id}
              className="break-inside-avoid glass-panel p-4 rounded-3xl group cursor-pointer hover:border-gold/30 transition-all duration-500 overflow-hidden"
            >
              <div className="rounded-2xl overflow-hidden mb-4 relative">
                <img
                  src={item.imageUrl}
                  alt={item.title}
                  loading="lazy"
                  className="w-full object-cover transition-transform duration-700 group-hover:scale-103"
                  data-cursor="expand"
                />
                <div className="absolute top-3 left-3 bg-black/80 border border-white/10 px-3 py-1 rounded-full text-[9px] uppercase tracking-[1px] font-mono text-gold">
                  {item.type}
                </div>
              </div>

              <div className="px-2">
                <h3 className="font-serif text-xl text-white font-medium group-hover:text-gold transition-colors duration-300">
                  {item.title}
                </h3>
                <p className="text-white/40 text-xs mt-1.5 leading-relaxed font-light">
                  {item.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
};
