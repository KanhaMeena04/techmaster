import React, { useEffect } from "react";
import { motion } from "framer-motion";
import { Calendar, MapPin, Users, ArrowUpRight, Award } from "lucide-react";
import eventsData from "../data/events.json";
import { LuxuryCard } from "../components/LuxuryCard";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export const Events: React.FC = () => {
  useEffect(() => {
    // Reveal section
    gsap.fromTo(
      ".event-card-reveal",
      { y: 60, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        stagger: 0.15,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".events-grid-trigger",
          start: "top 80%",
        },
      }
    );
  }, []);

  return (
    <div className="relative text-white min-h-screen pt-32 pb-24 px-6 overflow-hidden">
      {/* Background aurora glows */}
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
          PUBLIC ENGAGEMENTS
        </motion.div>
        <motion.h1
          initial={{ opacity: 0, y: 35 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="font-serif text-4xl sm:text-6xl font-light leading-tight mb-6"
        >
          Keynote Speaking & <br />
          <span className="text-gold italic font-bold">Live Coding Seminars</span>
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-white/60 text-sm sm:text-base font-light max-w-xl mx-auto leading-relaxed"
        >
          Faisal shares developer insights, soft-skills blueprints, and live systems architecture demonstrations on global stages.
        </motion.p>
      </div>

      {/* Main events catalog */}
      <div className="max-w-6xl mx-auto relative z-10 events-grid-trigger">
        <p className="text-[10px] uppercase tracking-[6px] text-gold font-bold mb-10 text-center">FEATURED CONFERENCES & KEYNOTES</p>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-20">
          {eventsData.map((evt, idx) => (
            <LuxuryCard key={evt.id} accentColor={evt.accentColor} className="event-card-reveal" index={idx}>
              <div className="aspect-video w-full rounded-2xl overflow-hidden border border-white/5 mb-6 relative">
                <img
                  src={evt.media}
                  alt={evt.title}
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute top-3 left-3 bg-black/80 border border-white/10 px-3 py-1 rounded-full text-[9px] uppercase tracking-[1px] font-mono text-gold">
                  {evt.type}
                </div>
              </div>

              <div className="flex flex-col gap-2 mb-4">
                <div className="flex items-center gap-1.5 text-white/50 text-[10px] uppercase font-mono tracking-[1px]">
                  <Calendar className="w-3.5 h-3.5 text-gold" />
                  <span>{evt.date}</span>
                </div>
                <div className="flex items-center gap-1.5 text-white/50 text-[10px] uppercase font-mono tracking-[1px]">
                  <MapPin className="w-3.5 h-3.5 text-gold" />
                  <span>{evt.location}</span>
                </div>
              </div>

              <h3 className="font-serif text-xl text-white font-medium mb-3 group-hover:text-gold transition-colors duration-300">
                {evt.title}
              </h3>
              <p className="text-white/50 text-xs leading-relaxed font-light mb-6">
                {evt.description}
              </p>

              <div className="flex items-center gap-1.5 text-[10px] text-gold font-mono uppercase tracking-[1.5px] mt-auto pt-4 border-t border-white/5">
                <Users className="w-4 h-4 shrink-0" />
                <span>Attendance: {evt.attendance}</span>
              </div>
            </LuxuryCard>
          ))}
        </div>

        {/* Booking Form CTA card */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.0 }}
          className="glass-panel p-8 md:p-16 rounded-3xl text-left max-w-4xl mx-auto flex flex-col md:flex-row gap-12 items-center"
        >
          <div className="md:w-1/2">
            <span className="text-[10px] uppercase font-bold tracking-[3px] text-gold block mb-2">SPEAKER BOOKINGS</span>
            <h2 className="font-serif text-3xl font-light text-white mb-6 leading-tight">
              Bring Faisal to <br />
              <span className="text-gold italic font-bold">Your Event</span>
            </h2>
            <p className="text-white/50 text-xs md:text-sm leading-relaxed font-light mb-6">
              Faisal keynote schedules fill up rapidly. Bookings are open for university developer panels, virtual technical summits, DevFests, or corporate software consulting cycles.
            </p>
            <div className="flex items-center gap-4 text-xs font-mono tracking-[1px] text-white/40">
              <Award className="w-4 h-4 text-gold shrink-0" />
              <span>Full Press Kit and AV Rider available upon approval.</span>
            </div>
          </div>

          <div className="md:w-1/2 w-full flex flex-col gap-4">
            <div className="grid grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="YOUR NAME"
                className="bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-xs font-mono uppercase text-white focus:outline-none focus:border-gold transition-colors duration-300"
              />
              <input
                type="email"
                placeholder="EMAIL ADDRESS"
                className="bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-xs font-mono uppercase text-white focus:outline-none focus:border-gold transition-colors duration-300"
              />
            </div>
            <input
              type="text"
              placeholder="EVENT NAME / ORGANIZATION"
              className="bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-xs font-mono uppercase text-white focus:outline-none focus:border-gold transition-colors duration-300"
            />
            <textarea
              rows={4}
              placeholder="EVENT DETAILS & SPEECH TOPICS..."
              className="bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-xs font-mono uppercase text-white focus:outline-none focus:border-gold transition-colors duration-300 resize-none"
            />
            <button className="py-3.5 bg-white text-black font-bold uppercase text-[10px] tracking-[2.5px] rounded-xl hover:bg-gold transition-all duration-300 flex items-center justify-center gap-1.5 shadow-lg">
              Submit Speaker Booking <ArrowUpRight className="w-4 h-4" />
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};
