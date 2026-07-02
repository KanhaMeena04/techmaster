import React from "react";
import { motion } from "framer-motion";
import { Compass, Eye, ShieldCheck, HeartHandshake } from "lucide-react";
import { LuxuryCard } from "../components/LuxuryCard";

export const Mission: React.FC = () => {
  const values = [
    {
      icon: <Compass className="w-6 h-6 text-gold" />,
      title: "Vision 2030: Democratizing Code",
      description: "Our core goal is to reach 10 million students globally, offering verified technical education pathways at zero subscription costs.",
      accent: "#00ffd1",
    },
    {
      icon: <Eye className="w-6 h-6 text-electric-blue" />,
      title: "Proof of Work Focus",
      description: "Moving tech candidates away from standard multiple-choice resumes and towards visible, deployed open-source contributions.",
      accent: "#00E5FF",
    },
    {
      icon: <ShieldCheck className="w-6 h-6 text-royal-purple" />,
      title: "Academic Collaboration",
      description: "Bridging the gap between theory and industry needs by integrating real-world project curricula inside university syllabus tracks.",
      accent: "#aa3bff",
    },
    {
      icon: <HeartHandshake className="w-6 h-6 text-pink-500" />,
      title: "Inclusive Coding Spaces",
      description: "Supporting underrepresented groups in software engineering through free hardware grants, cloud sponsorship, and active mentorship panels.",
      accent: "#FF007F",
    },
  ];

  return (
    <div className="relative text-white min-h-screen pt-32 pb-24 px-6 overflow-hidden">
      {/* Glow overlays */}
      <div className="absolute top-1/3 left-1/4 w-[45vw] h-[45vw] aurora-glow-purple opacity-20 pointer-events-none -translate-x-1/2" />
      <div className="absolute bottom-1/4 right-1/4 w-[35vw] h-[35vw] aurora-glow-blue opacity-15 pointer-events-none translate-x-1/2" />

      {/* Hero Header */}
      <div className="max-w-4xl mx-auto text-center mb-24 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-[10px] uppercase tracking-[6px] text-gold font-bold mb-4"
        >
          OUR NORTH STAR
        </motion.div>
        <motion.h1
          initial={{ opacity: 0, y: 35 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="font-serif text-4xl sm:text-6xl font-light leading-tight mb-6"
        >
          Democratizing <br />
          <span className="text-gold italic font-bold">Tech Literacy</span> Globally
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-white/60 text-sm sm:text-base font-light max-w-xl mx-auto leading-relaxed"
        >
          We believe high-quality engineering curricula shouldn't be locked behind expensive student debts. Faisal is building the tools to make code accessible to every curious mind on earth.
        </motion.p>
      </div>

      {/* Core Mission grids */}
      <div className="max-w-6xl mx-auto relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-24">
          
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="glass-panel p-8 md:p-12 rounded-3xl text-left flex flex-col justify-center border-l-4 border-l-gold"
          >
            <span className="text-xs uppercase font-bold tracking-[3px] text-gold mb-4">THE MISSION STATEMENT</span>
            <h2 className="font-serif text-2xl md:text-3xl font-light text-white mb-6 leading-snug">
              To inspire, educate, and place the next million full-stack developers.
            </h2>
            <p className="text-white/50 text-sm font-light leading-relaxed">
              Our target is to break down complex system design systems, database architectures, and compiler dynamics into engaging, cinematic formats. We enable students to transition seamlessly from beginners to self-sufficient contributors.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="glass-panel p-8 md:p-12 rounded-3xl text-left flex flex-col justify-center border-l-4 border-l-electric-blue"
          >
            <span className="text-xs uppercase font-bold tracking-[3px] text-electric-blue mb-4">THE FUTURE VISION</span>
            <h2 className="font-serif text-2xl md:text-3xl font-light text-white mb-6 leading-snug">
              Vision 2030: Bridging the global developer deficit.
            </h2>
            <p className="text-white/50 text-sm font-light leading-relaxed">
              Technology evolves at a rapid pace, yet university syllabi remain outdated. We are constructing an open, adaptive, cloud-native learning playground that responds directly to modern tech requirements.
            </p>
          </motion.div>
        </div>

        {/* Core Values grid using LuxuryCard */}
        <div className="mb-12 text-center">
          <p className="text-[10px] uppercase tracking-[6px] text-gold font-bold mb-4">OUR FUNDAMENTAL PRINCIPLES</p>
          <h2 className="font-serif text-3xl md:text-4xl text-white font-light mb-16">
            The Values that <span className="text-gold italic font-bold">Drive Us</span> Forward
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 text-left">
            {values.map((val, idx) => (
              <LuxuryCard key={idx} accentColor={val.accent} index={idx}>
                <div className="mb-6 w-12 h-12 rounded-full border border-white/5 flex items-center justify-center bg-white/5 group-hover:border-gold/30 transition-colors duration-300">
                  {val.icon}
                </div>
                <h3 className="font-serif text-lg text-white font-medium mb-3 group-hover:text-gold transition-colors duration-300">
                  {val.title}
                </h3>
                <p className="text-white/40 text-xs leading-relaxed font-light">
                  {val.description}
                </p>
              </LuxuryCard>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
