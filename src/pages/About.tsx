import React from "react";
import { Compass, Eye, ShieldCheck } from "lucide-react";
import { motion } from "framer-motion";
import aboutData from "../data/about.json";
import teamData from "../data/team.json";
import { LuxuryCard } from "../components/LuxuryCard";

export const About: React.FC = () => {
  return (
    <div className="relative text-white min-h-screen pt-32 pb-24 px-6 overflow-hidden">
      {/* Background Orbs */}
      <div className="absolute top-1/4 left-1/3 w-[30vw] h-[30vw] aurora-glow-purple opacity-20 pointer-events-none -translate-x-1/2" />
      <div className="absolute bottom-1/4 right-1/4 w-[35vw] h-[35vw] aurora-glow-gold opacity-10 pointer-events-none translate-x-1/2" />

      {/* Unique Page Hero */}
      <section className="max-w-7xl mx-auto text-left mb-24 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-[10px] uppercase tracking-[6px] text-gold font-bold mb-4"
        >
          FOUNDER IDENTITY
        </motion.div>
        
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.0, delay: 0.2 }}
          className="font-serif text-4xl sm:text-6xl md:text-7xl font-light leading-tight mb-8"
        >
          {aboutData.name} <br />
          <span className="text-gold italic font-bold">{aboutData.title}</span>
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.0, delay: 0.4 }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-12 mt-12 pt-12 border-t border-white/5"
        >
          <p className="text-white/80 font-light text-base md:text-lg leading-relaxed">
            {aboutData.bio}
          </p>
          <div className="glass-panel p-8 rounded-3xl border border-white/5 hover:border-gold/30 transition-all duration-300 flex flex-col gap-4">
            <span className="text-xs uppercase font-bold tracking-[2px] text-gold">{aboutData.philosophy.title}</span>
            <p className="text-white/70 font-light leading-relaxed text-sm">
              {aboutData.philosophy.paragraph}
            </p>
          </div>
        </motion.div>
      </section>

      {/* Dynamic statistics section */}
      <section className="max-w-7xl mx-auto grid grid-cols-2 lg:grid-cols-4 gap-8 mb-32 text-left relative z-10">
        {aboutData.credentials.map((cred, idx) => (
          <div key={idx} className="glass-panel p-6 rounded-2xl border-t border-white/5">
            <span className="font-serif text-3xl font-black text-gold block mb-1">{cred.count}</span>
            <span className="text-white/40 text-[10px] uppercase tracking-[1px] font-mono">{cred.metric}</span>
          </div>
        ))}
      </section>

      {/* Mission & Vision Section */}
      <section className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 mb-32 text-left relative z-10">
        {[
          {
            icon: <Compass className="w-6 h-6 text-gold" />,
            title: "Democratizing Tech",
            desc: "Faisal started with coding guidelines in 2015, seeking to make raw systems design and deployment concepts accessible to everyone."
          },
          {
            icon: <Eye className="w-6 h-6 text-gold" />,
            title: "Cinematic Syllabus",
            desc: "Pioneering the border of virtual reality and education. Faisal believes engineering courses should feel visual, beautiful, and interactive."
          },
          {
            icon: <ShieldCheck className="w-6 h-6 text-gold" />,
            title: "Quality Benchmarks",
            desc: "We commit to strict developer standards, real-world sandboxed container instances, and active recruiter links."
          }
        ].map((item, idx) => (
          <div key={idx} className="glass-panel p-8 rounded-3xl relative hover:border-gold/30 transition-all duration-300">
            <div className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center mb-6">
              {item.icon}
            </div>
            <h3 className="font-serif text-xl font-bold text-white mb-3">{item.title}</h3>
            <p className="text-white/50 text-xs leading-relaxed font-light">{item.desc}</p>
          </div>
        ))}
      </section>

      {/* Team Section */}
      <section className="max-w-7xl mx-auto text-left relative z-10">
        <div className="mb-16">
          <p className="text-[10px] uppercase tracking-[6px] text-gold font-bold mb-4">PRODUCTION TEAM</p>
          <h2 className="font-serif text-3xl sm:text-5xl font-light text-white">
            Core <span className="text-gold italic font-bold">Collaborators</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {teamData.map((member, idx) => (
            <LuxuryCard key={member.id} accentColor="#00ffd1" index={idx}>
              <div className="aspect-square w-full overflow-hidden relative border-b border-white/5 mb-6 rounded-2xl">
                <img
                  src={member.avatar}
                  alt={member.name}
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <div>
                <span className="text-[9px] uppercase tracking-[2px] text-gold font-mono block mb-1">{member.role}</span>
                <h4 className="font-serif text-lg font-bold text-white mb-3">{member.name}</h4>
                <p className="text-white/50 text-xs leading-relaxed font-light">{member.bio}</p>
              </div>
            </LuxuryCard>
          ))}
        </div>
      </section>
    </div>
  );
};
