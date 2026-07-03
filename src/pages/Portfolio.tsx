import React, { useState } from "react";
import { ArrowUpRight, Search, Play, Eye, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import portfolioData from "../data/portfolio.json";
import { LuxuryCard } from "../components/LuxuryCard";

export const Portfolio: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [lightboxVideo, setLightboxVideo] = useState<string | null>(null);
  const [lightboxImage, setLightboxImage] = useState<string | null>(null);

  const filters = [
    "All",
    "Projects",
    "Videos",
    "Reels",
    "Campaigns",
    "Commercial Shoots",
    "Client Work",
    "Photography"
  ];

  const filteredProjects = portfolioData.filter((proj) => {
    const matchesCategory = activeFilter === "All" || proj.category === activeFilter;
    const matchesSearch =
      searchQuery.trim() === "" ||
      proj.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      proj.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      proj.client.toLowerCase().includes(searchQuery.toLowerCase()) ||
      proj.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="relative text-white min-h-screen pt-32 pb-24 px-6 overflow-hidden">
      {/* Background radial overlays */}
      <div className="absolute top-1/4 left-1/4 w-[35vw] h-[35vw] aurora-glow-purple opacity-20 pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[30vw] h-[30vw] aurora-glow-gold opacity-10 pointer-events-none" />

      {/* Hero Header */}
      <section className="max-w-7xl mx-auto text-left mb-16 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-[10px] uppercase tracking-[6px] text-gold font-bold mb-4"
        >
          CURATED SHOWCASES
        </motion.div>
        
        <h1 className="font-serif text-4xl sm:text-6xl md:text-7xl font-light leading-tight">
          Product Engineering & <br />
          <span className="text-gold italic font-bold">Creative Media Production</span>.
        </h1>
      </section>

      {/* Search & Filter Bar */}
      <section className="max-w-7xl mx-auto mb-16 relative z-10 flex flex-col md:flex-row gap-6 md:items-center justify-between">
        {/* Filter Tabs */}
        <div className="flex flex-wrap gap-2.5">
          {filters.map((filter) => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-[1.5px] border transition-all duration-300 ${
                activeFilter === filter
                  ? "bg-gold border-gold text-black shadow-[0_0_20px_rgba(212,175,55,0.25)]"
                  : "bg-[#0d0d0d] border-white/10 text-white/60 hover:border-white/40 hover:text-white"
              }`}
            >
              {filter === "All" ? "All Work" : filter}
            </button>
          ))}
        </div>

        {/* Search input field */}
        <div className="relative w-full md:max-w-xs">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search projects & tags..."
            className="w-full bg-[#0d0d0d]/80 border border-white/10 rounded-full pl-11 pr-5 py-3 text-xs font-mono tracking-[1px] text-white placeholder-white/30 focus:outline-none focus:border-gold transition-colors duration-300"
          />
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
        </div>
      </section>

      {/* Grid List */}
      <section className="max-w-7xl mx-auto text-left relative z-10">
        {filteredProjects.length === 0 ? (
          <div className="py-20 text-center glass-panel rounded-3xl border border-white/5">
            <p className="text-white/40 text-sm font-mono">No showcases match your current search.</p>
          </div>
        ) : (
          <motion.div 
            layout
            className="grid grid-cols-1 md:grid-cols-2 gap-12"
          >
            <AnimatePresence mode="popLayout">
              {filteredProjects.map((project, idx) => {
                const isVideo = !!project.videoUrl;
                return (
                  <motion.div
                    layout
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.5 }}
                    key={project.id}
                    className="h-full"
                  >
                    <LuxuryCard accentColor={project.accentColor} index={idx}>
                      <div className="flex flex-col h-full justify-between">
                        <div>
                          {/* Image Container with Lightbox Trigger */}
                          <div 
                            className="aspect-video w-full rounded-2xl overflow-hidden border border-white/5 mb-6 relative group/media cursor-pointer"
                            onClick={() => isVideo ? setLightboxVideo(project.videoUrl || null) : setLightboxImage(project.coverImage)}
                          >
                            <img
                              src={project.coverImage}
                              alt={project.title}
                              loading="lazy"
                              className="w-full h-full object-cover transition-transform duration-700 group-hover/media:scale-105"
                              data-cursor={isVideo ? "watch" : "zoom"}
                            />
                            
                            {/* Hover Media Overlay */}
                            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover/media:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                              <div className="w-14 h-14 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white scale-90 group-hover/media:scale-100 transition-transform duration-300">
                                {isVideo ? (
                                  <Play className="w-6 h-6 fill-current text-gold ml-0.5" />
                                ) : (
                                  <Eye className="w-6 h-6 text-gold" />
                                )}
                              </div>
                            </div>

                            {/* Category Badge */}
                            <div className="absolute top-4 left-4 bg-black/80 backdrop-blur-md border border-white/10 px-3 py-1 rounded-full text-[9px] uppercase tracking-[1px] font-mono text-gold/90">
                              {project.category}
                            </div>
                          </div>

                          <div className="flex justify-between items-center mb-2">
                            <span className="text-[10px] uppercase tracking-[2px] opacity-40 font-bold">{project.client}</span>
                            <span className="font-mono text-xs text-gold">{project.year}</span>
                          </div>

                          <h3 
                            onClick={() => isVideo ? setLightboxVideo(project.videoUrl || null) : setLightboxImage(project.coverImage)}
                            className="font-serif text-2xl md:text-3xl text-white font-medium mb-3 cursor-pointer hover:text-gold transition-colors duration-300"
                          >
                            {project.title}
                          </h3>
                          
                          <p className="text-white/50 text-xs md:text-sm font-light leading-relaxed mb-6">
                            {project.description}
                          </p>
                        </div>

                        <div className="flex flex-wrap gap-2 pt-6 border-t border-white/5 items-center justify-between mt-auto">
                          <div className="flex flex-wrap gap-1.5">
                            {project.tags.map((tag) => (
                              <span key={tag} className="px-2.5 py-0.5 rounded-md bg-white/5 text-[9px] font-mono text-white/60">
                                {tag}
                              </span>
                            ))}
                          </div>

                          <button 
                            onClick={() => isVideo ? setLightboxVideo(project.videoUrl || null) : setLightboxImage(project.coverImage)}
                            className="text-gold hover:text-white transition-colors duration-300 flex items-center gap-1 text-xs uppercase font-bold tracking-[1px]"
                          >
                            {isVideo ? "Watch Media" : "View Details"}
                            <ArrowUpRight className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    </LuxuryCard>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </motion.div>
        )}
      </section>

      {/* Lightbox Media Player Modals */}
      <AnimatePresence>
        {/* Video Lightbox */}
        {lightboxVideo && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/95 z-[99999] flex items-center justify-center p-4 backdrop-blur-md"
            onClick={() => setLightboxVideo(null)}
          >
            <button 
              onClick={() => setLightboxVideo(null)} 
              className="absolute top-6 right-6 w-12 h-12 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 transition-colors flex items-center justify-center text-white"
            >
              <X className="w-6 h-6" />
            </button>
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="w-full max-w-4xl aspect-video rounded-3xl overflow-hidden border border-white/10 bg-black shadow-[0_0_50px_rgba(0,229,255,0.15)]"
              onClick={(e) => e.stopPropagation()}
            >
              <video 
                src={lightboxVideo} 
                controls 
                autoPlay 
                className="w-full h-full object-contain"
              />
            </motion.div>
          </motion.div>
        )}

        {/* Image Lightbox */}
        {lightboxImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/95 z-[99999] flex items-center justify-center p-4 backdrop-blur-md"
            onClick={() => setLightboxImage(null)}
          >
            <button 
              onClick={() => setLightboxImage(null)} 
              className="absolute top-6 right-6 w-12 h-12 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 transition-colors flex items-center justify-center text-white"
            >
              <X className="w-6 h-6" />
            </button>
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="max-w-4xl max-h-[85vh] rounded-3xl overflow-hidden border border-white/10 bg-black shadow-[0_0_50px_rgba(212,175,55,0.15)] flex items-center justify-center"
              onClick={(e) => e.stopPropagation()}
            >
              <img 
                src={lightboxImage} 
                alt="Lightbox Showcase Preview" 
                className="max-w-full max-h-[80vh] object-contain rounded-2xl"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
