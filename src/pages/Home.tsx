import React, { useEffect } from "react";
import { ArrowDown, ArrowUpRight, CheckCircle, Terminal } from "lucide-react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Magnetic } from "../components/Magnetic";
import { LuxuryCard } from "../components/LuxuryCard";
import homeData from "../data/home.json";
import servicesData from "../data/services.json";
import portfolioData from "../data/portfolio.json";

gsap.registerPlugin(ScrollTrigger);

interface HomeProps {
  onChangePage: (page: string) => void;
}

export const Home: React.FC<HomeProps> = ({ onChangePage }) => {
  useEffect(() => {
    // GSAP ScrollTrigger animations
    const sections = document.querySelectorAll(".scroll-section");
    sections.forEach((sec) => {
      gsap.fromTo(
        sec.querySelectorAll(".fade-up"),
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1.0,
          stagger: 0.15,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sec,
            start: "top 80%",
            toggleActions: "play none none none",
          },
        }
      );
    });

    // Horizontal brand logo scroll
    gsap.fromTo(
      ".brand-ticker-inner",
      { xPercent: 0 },
      {
        xPercent: -50,
        duration: 20,
        repeat: -1,
        ease: "none",
      }
    );

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  const handleNavClick = (pageId: string) => {
    onChangePage(pageId);
  };

  return (
    <div className="relative text-white min-h-screen">
      
      {/* 1. Hero Section */}
      <section className="min-h-screen flex flex-col justify-center items-center px-6 relative overflow-hidden pt-24 text-center">
        {/* Glow Spheres */}
        <div className="absolute top-1/3 left-1/4 w-[35vw] h-[35vw] aurora-glow-purple opacity-30 pointer-events-none -translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-1/4 right-1/4 w-[30vw] h-[30vw] aurora-glow-blue opacity-30 pointer-events-none translate-x-1/2 translate-y-1/2" />

        <div className="max-w-5xl mx-auto flex flex-col items-center relative z-10">
          {/* Animated luxury tag */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-[10px] uppercase tracking-[6px] text-gold font-bold mb-6 border border-gold/25 px-4 py-1.5 rounded-full bg-gold/5 backdrop-blur-md flex items-center gap-2"
          >
            <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
              <path d="M23.498 6.163a3.003 3.003 0 0 0-2.11-2.11C19.517 3.545 12 3.545 12 3.545s-7.517 0-9.388.508a3.003 3.003 0 0 0-2.11 2.11C0 8.033 0 12 0 12s0 3.967.502 5.837a3.003 3.003 0 0 0 2.11 2.11c1.871.508 9.388.508 9.388.508s7.517 0 9.388-.508a3.003 3.003 0 0 0 2.11-2.11C24 15.967 24 12 24 12s0-3.967-.502-5.837zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
            </svg>
            {homeData.hero.tag}
          </motion.div>

          {/* Headline with split reveal effect */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.0, delay: 0.4, ease: "easeOut" }}
            className="font-serif text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-light leading-[1.1] tracking-tight mb-8 text-reveal"
          >
            Orchestrating <br />
            <span className="font-bold italic text-gold font-serif">Immersive Tech</span> Education.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.0, delay: 0.6 }}
            className="text-white/60 text-sm md:text-lg font-light max-w-2xl leading-relaxed mb-12"
          >
            {homeData.hero.paragraph}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.0, delay: 0.8 }}
            className="flex flex-col sm:flex-row gap-6 items-center"
          >
            <Magnetic strength={0.3}>
              <button
                onClick={() => handleNavClick("services")}
                className="light-sweep px-8 py-4 bg-white text-black font-bold uppercase text-xs tracking-[2px] rounded-full hover:bg-gold hover:text-black transition-all duration-500 shadow-[0_0_30px_rgba(255,255,255,0.1)]"
              >
                {homeData.hero.ctaPrimary}
              </button>
            </Magnetic>

            <Magnetic strength={0.25}>
              <button
                onClick={() => handleNavClick("contact")}
                className="px-8 py-4 border border-white/20 text-white font-bold uppercase text-xs tracking-[2px] rounded-full hover:border-gold hover:text-gold bg-transparent transition-all duration-500 flex items-center gap-2"
              >
                {homeData.hero.ctaSecondary}
                <ArrowUpRight className="w-4 h-4" />
              </button>
            </Magnetic>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-50 cursor-pointer hover:opacity-100 transition-opacity duration-300">
          <span className="text-[9px] uppercase tracking-[3px]">Scroll down</span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
          >
            <ArrowDown className="w-4 h-4 text-gold" />
          </motion.div>
        </div>
      </section>

      {/* 2. Brand Partner Logos Ticker */}
      <section className="py-12 bg-black/40 border-y border-white/5 relative z-10 overflow-hidden">
        <div className="brand-ticker-inner flex whitespace-nowrap gap-16 w-[200%]">
          {[1, 2].map((groupIndex) => (
            <div key={groupIndex} className="flex justify-around items-center min-w-full gap-16">
              {["NVIDIA", "GITHUB", "GOOGLE CLOUD", "APPLE DEVELOPER", "VERCEL", "MICROSOFT"].map((brand) => (
                <span
                  key={brand}
                  className="font-serif text-xl sm:text-2xl font-black text-white/20 tracking-[6px] hover:text-gold/50 transition-colors duration-300 select-none cursor-default"
                >
                  {brand}
                </span>
              ))}
            </div>
          ))}
        </div>
      </section>

      {/* 3. Core Values Grid Section */}
      <section className="scroll-section py-24 px-6 max-w-7xl mx-auto relative z-10 text-left">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {homeData.values.map((val, idx) => (
            <div key={idx} className="glass-panel p-8 rounded-3xl border-l-4 border-l-gold/40 hover:border-l-gold transition-all duration-300 fade-up">
              <span className="text-gold font-mono text-xs block mb-4">Value 0{idx + 1}</span>
              <h3 className="font-serif text-xl font-medium text-white mb-2">{val.title}</h3>
              <p className="text-white/50 text-xs sm:text-sm font-light leading-relaxed">{val.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 4. Core Services Section */}
      <section className="scroll-section py-24 px-6 max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 mb-20 items-end">
          <div className="lg:col-span-2 text-left">
            <p className="text-[10px] uppercase tracking-[6px] text-gold font-bold mb-4">EDUCATIONAL PILLARS</p>
            <h2 className="font-serif text-4xl sm:text-6xl font-light text-white leading-tight fade-up">
              Bridging the gap between <br />
              <span className="text-gold italic font-bold">Code & Placement</span>.
            </h2>
          </div>
          <div className="text-left">
            <p className="text-white/50 font-light leading-relaxed mb-6 fade-up">
              We design structured curricula, virtual sandbox playgrounds, and live cohort workshops, transforming traditional programming paths into cinematic student success pipelines.
            </p>
            <button
              onClick={() => handleNavClick("services")}
              className="text-xs uppercase tracking-[2px] text-gold hover:text-white transition-colors duration-300 font-bold flex items-center gap-1.5 fade-up"
            >
              View Service Portals <ArrowUpRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Services Grid using LuxuryCard */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {servicesData.map((srv, idx) => (
            <LuxuryCard
              key={srv.id}
              accentColor={srv.accentColor}
              className="fade-up"
              index={idx}
            >
              <div className="flex justify-between items-start mb-8">
                <span className="font-mono text-xs opacity-30">0{idx + 1}</span>
                <span 
                  className="px-3 py-1 rounded-full border text-[9px] uppercase tracking-[1px] font-mono"
                  style={{ color: srv.accentColor, borderColor: srv.accentColor + "40" }}
                >
                  {srv.tagline}
                </span>
              </div>

              <h3 className="font-serif text-2xl md:text-3xl text-white font-medium mb-4 group-hover:text-gold transition-colors duration-300">
                {srv.title}
              </h3>
              <p className="text-white/50 text-sm font-light leading-relaxed mb-8">
                {srv.description}
              </p>

              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-6 border-t border-white/5">
                {srv.features.map((feat, fidx) => (
                  <li key={fidx} className="flex items-center gap-2 text-xs text-white/70">
                    <CheckCircle className="w-3.5 h-3.5 text-gold shrink-0" />
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>
            </LuxuryCard>
          ))}
        </div>
      </section>

      {/* 5. Statistics Callout */}
      <section className="scroll-section py-24 bg-[#050505] border-y border-white/5 px-6 relative z-10 text-center">
        <div className="max-w-7xl mx-auto">
          <p className="text-[10px] uppercase tracking-[6px] text-gold font-bold mb-12">INFLUENCE & REACH</p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {homeData.stats.map((stat, idx) => (
              <div key={idx} className="fade-up">
                <span className="font-serif text-4xl sm:text-6xl font-black text-gold block mb-2">{stat.value}</span>
                <span className="text-white/40 text-xs tracking-[1px] uppercase font-mono">{stat.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. Selected Case Studies / Portfolios */}
      <section className="scroll-section py-32 px-6 max-w-7xl mx-auto relative z-10 text-left">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-20 gap-8">
          <div>
            <p className="text-[10px] uppercase tracking-[6px] text-gold font-bold mb-4">STUDENT SHOWCASE</p>
            <h2 className="font-serif text-4xl sm:text-6xl font-light text-white leading-tight">
              Honored <span className="text-gold italic font-bold">Initiatives</span>
            </h2>
          </div>
          <button
            onClick={() => handleNavClick("portfolio")}
            className="text-xs uppercase tracking-[2px] text-gold hover:text-white transition-colors duration-300 font-bold flex items-center gap-1.5"
          >
            Review Full Portfolio <ArrowUpRight className="w-4 h-4" />
          </button>
        </div>

        {/* Portfolio Showcase Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {portfolioData.slice(0, 2).map((project) => (
            <div
              key={project.id}
              className="group cursor-pointer fade-up"
              onClick={() => handleNavClick("portfolio")}
            >
              {/* Animated image wrapper */}
              <div className="aspect-video w-full rounded-2xl overflow-hidden border border-white/5 mb-6 relative">
                <img
                  src={project.coverImage}
                  alt={project.title}
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  data-cursor="view"
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center pointer-events-none">
                  <span className="text-xs uppercase font-bold tracking-[3px] text-gold border border-gold/40 px-4 py-2 rounded-full bg-black/80">
                    VIEW STUDY
                  </span>
                </div>
              </div>

              <div className="flex justify-between items-center mb-2">
                <span className="text-xs text-white/50 uppercase tracking-[1px]">{project.category}</span>
                <span className="font-mono text-xs text-gold">{project.year}</span>
              </div>
              <h3 className="font-serif text-2xl text-white font-medium group-hover:text-gold transition-colors duration-300">
                {project.title}
              </h3>
            </div>
          ))}
        </div>
      </section>

      {/* 7. Quick Timeline Callout */}
      <section className="scroll-section py-24 bg-[#050505] border-y border-white/5 px-6 relative z-10 text-left">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
          <div>
            <p className="text-[10px] uppercase tracking-[6px] text-gold font-bold mb-2">OUR CHRONOLOGY</p>
            <h3 className="font-serif text-3xl sm:text-4xl font-light text-white leading-tight">
              Follow Faisal's journey from <br />
              <span className="text-gold italic font-bold">day one</span> to present.
            </h3>
          </div>
          <button
            onClick={() => handleNavClick("journey")}
            className="light-sweep px-6 py-3 bg-white text-black font-bold uppercase text-xs tracking-[1.5px] rounded-full hover:bg-gold hover:text-black transition-colors duration-300"
          >
            Explore Founder Journey
          </button>
        </div>
      </section>

      {/* 8. Quick YouTube Promo Callout */}
      <section className="scroll-section py-24 px-6 max-w-7xl mx-auto relative z-10 text-left">
        <div className="glass-panel p-8 md:p-12 rounded-3xl flex flex-col md:flex-row gap-8 items-center border border-white/5">
          <div className="md:w-2/3">
            <span className="text-[10px] uppercase font-bold tracking-[3px] text-gold block mb-2">YOUTUBE INITIATIVE</span>
            <h3 className="font-serif text-3xl font-light text-white mb-4">
              Building Web Apps Live for 2.5 Million Learners
            </h3>
            <p className="text-white/50 text-xs md:text-sm font-light leading-relaxed mb-6">
              Join Faisal as he takes raw coding problems and transforms them into interactive systems. Subscribing gains you access to Github action alerts, workspace repositories, and community-guided streams.
            </p>
            <a href="https://youtube.com/c/techmasterf" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-xs uppercase tracking-[2px] text-gold hover:text-white transition-colors duration-300 font-bold">
              Explore YouTube Channel <ArrowUpRight className="w-4 h-4" />
            </a>
          </div>
          <div className="md:w-1/3 w-full aspect-video rounded-2xl overflow-hidden relative border border-white/10 shadow-[0_10px_35px_rgba(0,0,0,0.5)]">
            <img src="https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?auto=format&fit=crop&w=600&q=80" alt="YouTube recording" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
              <Terminal className="w-10 h-10 text-gold animate-pulse" />
            </div>
          </div>
        </div>
      </section>

    </div>
  );
};
