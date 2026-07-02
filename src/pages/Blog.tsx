import React from "react";
import { ArrowUpRight } from "lucide-react";
import { motion } from "framer-motion";
import blogsData from "../data/blogs.json";
import { LuxuryCard } from "../components/LuxuryCard";

export const Blog: React.FC = () => {
  return (
    <div className="relative text-white min-h-screen pt-32 pb-24 px-6 overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-1/4 right-1/4 w-[35vw] h-[35vw] aurora-glow-purple opacity-20 pointer-events-none" />
      <div className="absolute bottom-1/4 left-1/4 w-[30vw] h-[30vw] aurora-glow-gold opacity-10 pointer-events-none" />

      {/* Hero Header */}
      <section className="max-w-7xl mx-auto text-left mb-20 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-[10px] uppercase tracking-[6px] text-gold font-bold mb-4"
        >
          CREATOR JOURNAL
        </motion.div>
        
        <h1 className="font-serif text-4xl sm:text-6xl md:text-7xl font-light leading-tight mb-8">
          Thoughts on Tech <br />
          <span className="text-gold italic font-bold">education & scalability</span>.
        </h1>
      </section>

      {/* Blog List Grid */}
      <section className="max-w-7xl mx-auto text-left grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 relative z-10">
        {blogsData.map((post, idx) => (
          <div key={post.id} className="h-full">
            <LuxuryCard accentColor="#00ffd1" index={idx}>
              <div className="flex flex-col h-full justify-between">
                <div>
                  <div className="aspect-video w-full overflow-hidden border-b border-white/5 relative rounded-2xl mb-6">
                    <img
                      src={post.coverImage}
                      alt={post.title}
                      loading="lazy"
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-103"
                      data-cursor="read"
                    />
                  </div>

                  <div className="flex justify-between items-center mb-4">
                    <span className="text-[9px] font-mono text-gold font-bold uppercase tracking-[1px]">{post.tags[0]}</span>
                    <span className="text-[9px] text-white/40 font-mono uppercase">{post.date}</span>
                  </div>

                  <h3 className="font-serif text-xl font-bold text-white group-hover:text-gold transition-colors duration-300 mb-3 leading-snug">
                    {post.title}
                  </h3>
                  <p className="text-white/50 text-xs md:text-sm font-light leading-relaxed mb-6">
                    {post.excerpt}
                  </p>
                </div>

                <div className="pt-4 flex justify-between items-center border-t border-white/5 mt-auto">
                  <span className="text-[10px] text-white/40 uppercase tracking-[1px]">{post.readTime}</span>
                  <button className="text-gold group-hover:text-white transition-colors duration-300 flex items-center gap-1 text-xs font-bold uppercase tracking-[1.5px]">
                    Read Article
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </LuxuryCard>
          </div>
        ))}
      </section>
    </div>
  );
};
