import React from "react";
import { motion } from "framer-motion";
import { Quote, Star } from "lucide-react";
import testimonialsData from "../data/testimonials.json";
import { LuxuryCard } from "../components/LuxuryCard";

export const Testimonials: React.FC = () => {
  return (
    <div className="relative text-white min-h-screen pt-32 pb-24 px-6 overflow-hidden">
      {/* Background radial glows */}
      <div className="absolute top-1/4 left-1/4 w-[45vw] h-[45vw] aurora-glow-purple opacity-20 pointer-events-none -translate-x-1/2" />
      <div className="absolute bottom-1/4 right-1/4 w-[35vw] h-[35vw] aurora-glow-gold opacity-10 pointer-events-none translate-x-1/2" />

      {/* Hero Header */}
      <div className="max-w-4xl mx-auto text-center mb-24 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-[10px] uppercase tracking-[6px] text-gold font-bold mb-4"
        >
          COMMUNITY ACCLAIM
        </motion.div>
        <motion.h1
          initial={{ opacity: 0, y: 35 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="font-serif text-4xl sm:text-6xl font-light leading-tight mb-6"
        >
          Student Placements & <br />
          <span className="text-gold italic font-bold">Academics Success</span>
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-white/60 text-sm sm:text-base font-light max-w-xl mx-auto leading-relaxed"
        >
          Discover reviews from Faisal's mentored students, university professors, and tech partners who have integrated our curricula.
        </motion.p>
      </div>

      {/* Testimonials Grids */}
      <div className="max-w-6xl mx-auto relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          {testimonialsData.map((test, idx) => (
            <LuxuryCard key={test.id} accentColor="#00ffd1" index={idx}>
              <div className="flex justify-between items-start mb-6">
                <Quote className="w-8 h-8 text-gold/20" />
                <div className="flex gap-0.5">
                  {[...Array(test.rating)].map((_, sIdx) => (
                    <Star key={sIdx} className="w-3.5 h-3.5 fill-gold stroke-gold" />
                  ))}
                </div>
              </div>

              <p className="text-white/70 text-xs sm:text-sm font-light italic leading-relaxed mb-8 flex-grow">
                "{test.quote}"
              </p>

              <div className="flex items-center gap-4 pt-4 border-t border-white/5 mt-auto">
                <img
                  src={test.avatar}
                  alt={test.name}
                  className="w-10 h-10 rounded-full border border-white/10 object-cover"
                />
                <div className="text-left">
                  <h4 className="text-white font-bold text-xs uppercase tracking-[0.5px]">
                    {test.name}
                  </h4>
                  <span className="text-white/40 text-[9px] uppercase tracking-[1px] font-mono block">
                    {test.role}
                  </span>
                  <span className="text-gold text-[8px] uppercase tracking-[1px] font-mono block mt-0.5">
                    {test.course}
                  </span>
                </div>
              </div>
            </LuxuryCard>
          ))}
        </div>

        {/* Global Statistics Callout */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.0 }}
          className="glass-panel p-8 md:p-12 rounded-3xl text-center max-w-4xl mx-auto border border-gold/10"
        >
          <span className="text-[10px] uppercase font-bold tracking-[3px] text-gold block mb-6">STUDENT PLACEMENT MATRIX</span>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { value: "94.2%", label: "Placement Rate" },
              { value: "$120K", label: "Average Salary" },
              { value: "15,000+", label: "Students Hired" },
              { value: "450+", label: "Tech Partners" }
            ].map((stat, idx) => (
              <div key={idx}>
                <span className="font-serif text-3xl sm:text-4xl font-black text-gold block mb-1">
                  {stat.value}
                </span>
                <span className="text-white/45 text-[9px] uppercase tracking-[1px] font-mono font-light">
                  {stat.label}
                </span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};
