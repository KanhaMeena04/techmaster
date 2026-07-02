import React from "react";
import { motion } from "framer-motion";
import { Video, Award, Code, Presentation, MessageSquareCode } from "lucide-react";
import { LuxuryCard } from "../components/LuxuryCard";

export const WhatWeDo: React.FC = () => {
  const operations = [
    {
      icon: <Video className="w-6 h-6 text-gold" />,
      title: "YouTube Production",
      subtitle: "Cinematic Coding Breakdowns",
      description: "We scripting, record, and edit deep-dive developer tutorials that run like cinematic stories. Reaching over 2.5 million subscribers with weekly guides.",
      accent: "#00ffd1",
    },
    {
      icon: <Code className="w-6 h-6 text-electric-blue" />,
      title: "Interactive Syllabus Design",
      subtitle: "Online MasterClasses",
      description: "Drafting production-level courses that focus on Docker pipelines, testing arrays, and backend scale, complete with live browser containers.",
      accent: "#00E5FF",
    },
    {
      icon: <Presentation className="w-6 h-6 text-royal-purple" />,
      title: "Motivational Keynotes",
      subtitle: "TEDx & Global Tech Talks",
      description: "Faisal travels worldwide delivering opening remarks on 'Democratizing Code' and soft skill strategies to help students bypass generic hiring cycles.",
      accent: "#aa3bff",
    },
    {
      icon: <MessageSquareCode className="w-6 h-6 text-pink-500" />,
      title: "Community Hackathons",
      subtitle: "Empowerment Cohorts",
      description: "Hosting virtual/physical coding tournaments sponsored by Vercel and Google Cloud to give students direct placement links.",
      accent: "#FF007F",
    },
  ];

  return (
    <div className="relative text-white min-h-screen pt-32 pb-24 px-6 overflow-hidden">
      {/* Background glow layers */}
      <div className="absolute top-1/4 left-1/3 w-[55vw] h-[55vw] aurora-glow-purple opacity-20 pointer-events-none -translate-x-1/2" />
      <div className="absolute bottom-1/4 right-1/4 w-[40vw] h-[40vw] aurora-glow-gold opacity-10 pointer-events-none translate-x-1/2" />

      {/* Hero Header */}
      <div className="max-w-4xl mx-auto text-center mb-24 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-[10px] uppercase tracking-[6px] text-gold font-bold mb-4"
        >
          CORE ACTIVITIES
        </motion.div>
        <motion.h1
          initial={{ opacity: 0, y: 35 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="font-serif text-4xl sm:text-6xl font-light leading-tight mb-6"
        >
          What We Do to <br />
          <span className="text-gold italic font-bold">Reshape Learning</span>
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-white/60 text-sm sm:text-base font-light max-w-xl mx-auto leading-relaxed"
        >
          We build content, platforms, keynotes, and campaigns to bridge the gap between classroom syntax and global engineering workspaces.
        </motion.p>
      </div>

      {/* Grid of operations */}
      <div className="max-w-6xl mx-auto relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {operations.map((op, idx) => (
            <LuxuryCard key={idx} accentColor={op.accent} index={idx}>
              <div className="flex justify-between items-start mb-6">
                <div className="w-12 h-12 rounded-2xl border border-white/5 bg-white/5 flex items-center justify-center group-hover:border-gold/30 transition-colors duration-300">
                  {op.icon}
                </div>
                <span className="text-[10px] uppercase font-mono tracking-[1.5px] text-white/30 group-hover:text-gold transition-colors duration-300">
                  Operation 0{idx + 1}
                </span>
              </div>
              <div className="mb-4">
                <h3 className="font-serif text-2xl text-white font-medium mb-1 group-hover:text-gold transition-colors duration-300">
                  {op.title}
                </h3>
                <span className="text-white/40 text-[10px] uppercase tracking-[2px] font-mono block">
                  {op.subtitle}
                </span>
              </div>
              <p className="text-white/50 text-xs md:text-sm leading-relaxed font-light mt-4 pt-4 border-t border-white/5">
                {op.description}
              </p>
            </LuxuryCard>
          ))}
        </div>

        {/* Dynamic quote banner */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.0 }}
          className="glass-panel p-8 md:p-16 rounded-3xl mt-20 text-center max-w-4xl mx-auto border border-gold/20 shadow-[0_0_30px_rgba(212,175,55,0.05)]"
        >
          <Award className="w-10 h-10 text-gold mx-auto mb-6" />
          <h2 className="font-serif text-2xl md:text-3xl font-light italic text-white leading-relaxed mb-6">
            "Education is not the learning of facts, but the training of the mind to think."
          </h2>
          <span className="text-gold uppercase tracking-[3px] text-xs font-bold font-mono">
            &mdash; Faisal (Tech Master F)
          </span>
        </motion.div>
      </div>
    </div>
  );
};
