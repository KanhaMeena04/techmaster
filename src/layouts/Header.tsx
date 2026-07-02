import React, { useState, useEffect } from "react";
import { Menu, X, ArrowUpRight } from "lucide-react";
import { Magnetic } from "../components/Magnetic";
import gsap from "gsap";

interface HeaderProps {
  activePage: string;
  onChangePage: (page: string) => void;
}

export const Header: React.FC<HeaderProps> = ({ activePage, onChangePage }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Complete list of all 18 pages requested
  const coreBrandItems = [
    { name: "Home", id: "home" },
    { name: "About Founder", id: "about" },
    { name: "Journey of Founder", id: "journey" },
    { name: "Mission & Vision", id: "mission" },
    { name: "What We Do", id: "what-we-do" },
    { name: "Services", id: "services" },
  ];

  const engagementItems = [
    { name: "Brand Collabs", id: "collaborations" },
    { name: "Campaigns", id: "campaigns" },
    { name: "Product Launches", id: "product-launches" },
    { name: "Event Management", id: "events" },
    { name: "Portfolio", id: "portfolio" },
    { name: "Visual Gallery", id: "gallery" },
    { name: "Media Coverage", id: "media" },
    { name: "Testimonials", id: "testimonials" },
    { name: "Careers", id: "career" },
    { name: "Insights / Blog", id: "blog" },
    { name: "FAQ Portal", id: "faq" },
    { name: "Direct Contact", id: "contact" },
  ];


  const handleNavClick = (pageId: string) => {
    setIsMenuOpen(false);
    onChangePage(pageId);
  };

  useEffect(() => {
    if (isMenuOpen) {
      // Fullscreen menu open animation
      gsap.to(".menu-overlay", {
        clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)",
        duration: 0.8,
        ease: "power4.inOut"
      });
      gsap.fromTo(".menu-link", 
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.5, stagger: 0.03, ease: "power3.out", delay: 0.3 }
      );
    } else {
      // Close animation
      gsap.to(".menu-overlay", {
        clipPath: "polygon(0 0, 100% 0, 100% 0, 0 0)",
        duration: 0.6,
        ease: "power4.inOut"
      });
    }
  }, [isMenuOpen]);

  return (
    <>
      <header className="glass-nav fixed top-0 left-0 w-full z-[999] py-4 px-6 md:px-12 flex justify-between items-center transition-all duration-300">
        {/* Brand Logo */}
        <div 
          onClick={() => handleNavClick("home")} 
          className="flex items-center gap-3 cursor-pointer group"
          data-cursor="home"
        >
          <div className="w-10 h-10 rounded-full border border-gold/30 flex items-center justify-center relative overflow-hidden transition-all duration-300 group-hover:border-gold shadow-[0_0_15px_rgba(212,175,55,0.1)]">
            <span className="font-serif text-sm font-extrabold text-white tracking-[1px]">MF</span>
          </div>
          <span className="font-serif font-bold text-lg tracking-[2px] text-white transition-colors duration-300 group-hover:text-gold uppercase">
            MASTER F
          </span>
        </div>

        {/* Desktop Navigation Link Cluster */}
        <nav className="hidden lg:flex items-center gap-8">
          {[
            { name: "Home", id: "home" },
            { name: "About", id: "about" },
            { name: "Journey", id: "journey" },
            { name: "Services", id: "services" },
            { name: "Blog", id: "blog" },
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => handleNavClick(item.id)}
              className={`text-xs uppercase tracking-[2px] transition-all duration-300 relative py-1 hover:text-white ${
                activePage === item.id ? "text-gold font-bold" : "text-white/60"
              }`}
            >
              {item.name}
              {activePage === item.id && (
                <span className="absolute bottom-0 left-0 w-full h-[1px] bg-gold" />
              )}
            </button>
          ))}
        </nav>

        {/* Action Button & Hamburger Toggle */}
        <div className="flex items-center gap-6">
          <div className="hidden sm:block">
            <Magnetic strength={0.3}>
              <button
                onClick={() => handleNavClick("contact")}
                className="light-sweep px-5 py-2.5 rounded-full border border-gold/30 hover:border-gold hover:text-black hover:bg-gold transition-all duration-500 text-xs font-bold uppercase tracking-[2px] text-gold flex items-center gap-2"
              >
                Let's Talk
                <ArrowUpRight className="w-3.5 h-3.5" />
              </button>
            </Magnetic>
          </div>

          {/* Menu Button Toggle */}
          <Magnetic strength={0.25}>
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="w-10 h-10 rounded-full border border-white/10 hover:border-white/40 flex items-center justify-center text-white bg-white/5 transition-all duration-300"
              data-cursor={isMenuOpen ? "close" : "menu"}
            >
              {isMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            </button>
          </Magnetic>
        </div>
      </header>

      {/* Fullscreen Overlay Menu */}
      <div 
        className="menu-overlay fixed inset-0 bg-[#060606]/98 backdrop-blur-2xl z-[998] overflow-y-auto flex flex-col justify-start py-20 px-6 md:px-16"
        style={{ clipPath: "polygon(0 0, 100% 0, 100% 0, 0 0)" }}
      >
        {/* Background glow effects */}
        <div className="absolute top-1/4 left-1/4 w-[50vw] h-[50vw] aurora-glow-purple -translate-x-1/2 -translate-y-1/2 opacity-30 pointer-events-none" />
        <div className="absolute bottom-1/4 right-1/4 w-[40vw] h-[40vw] aurora-glow-blue translate-x-1/2 translate-y-1/2 opacity-30 pointer-events-none" />

        <div className="w-full max-w-6xl mx-auto my-auto grid grid-cols-1 lg:grid-cols-3 gap-12 z-10 py-12 lg:py-24">
          
          {/* Column 1: Founder & Core Identity */}
          <div className="flex flex-col gap-4 text-left">
            <p className="text-[10px] uppercase tracking-[6px] text-gold/80 mb-2 font-bold border-b border-white/5 pb-2">FOUNDER & BRAND</p>
            <div className="flex flex-col gap-2">
              {coreBrandItems.map((item) => (
                <div key={item.id} className="overflow-hidden">
                  <button
                    onClick={() => handleNavClick(item.id)}
                    className="menu-link block text-2xl md:text-3xl font-serif text-white hover:text-gold transition-colors duration-300 py-1 text-left relative group font-light"
                  >
                    <span className="inline-block transition-transform duration-300 group-hover:translate-x-3">
                      {item.name}
                    </span>
                    {activePage === item.id && (
                      <span className="absolute right-0 top-1/2 -translate-y-1/2 text-[9px] font-sans text-gold border border-gold/40 px-2 py-0.5 rounded-full tracking-[1px] uppercase bg-gold/5">
                        Active
                      </span>
                    )}
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Column 2: Engagement & Dynamic Showcases */}
          <div className="flex flex-col gap-4 text-left">
            <p className="text-[10px] uppercase tracking-[6px] text-gold/80 mb-2 font-bold border-b border-white/5 pb-2">MEDIA & COMMUNITY</p>
            <div className="flex flex-col gap-2">
              {engagementItems.map((item) => (
                <div key={item.id} className="overflow-hidden">
                  <button
                    onClick={() => handleNavClick(item.id)}
                    className="menu-link block text-2xl md:text-3xl font-serif text-white hover:text-gold transition-colors duration-300 py-1 text-left relative group font-light"
                  >
                    <span className="inline-block transition-transform duration-300 group-hover:translate-x-3">
                      {item.name}
                    </span>
                    {activePage === item.id && (
                      <span className="absolute right-0 top-1/2 -translate-y-1/2 text-[9px] font-sans text-gold border border-gold/40 px-2 py-0.5 rounded-full tracking-[1px] uppercase bg-gold/5">
                        Active
                      </span>
                    )}
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Column 3: Premium Contact details */}
          <div className="flex flex-col justify-between py-4 border-t lg:border-t-0 lg:border-l border-white/5 lg:pl-16 text-left">
            <div>
              <p className="text-[10px] uppercase tracking-[6px] text-gold/80 mb-4 font-bold border-b border-white/5 pb-2">HQ CREATOR LAB</p>
              <h3 className="font-serif text-2xl text-white font-medium mb-1">Metropolis Spaces</h3>
              <p className="text-white/50 text-sm font-light leading-relaxed">
                402 Creator District, Horizon Boulevard<br />
                Silicon Valley Heights, 94025
              </p>
            </div>

            <div className="my-8 lg:my-0">
              <p className="text-[10px] uppercase tracking-[6px] text-gold/80 mb-2 font-bold">MANAGEMENT INQUIRIES</p>
              <a href="mailto:bookings@techmasterf.com" className="text-lg text-white hover:text-gold transition-colors duration-300 font-light">
                bookings@techmasterf.com
              </a>
              <p className="text-white/40 text-xs mt-1">+1 (800) 555-CODE</p>
            </div>

            <div>
              <p className="text-[10px] uppercase tracking-[6px] text-gold/80 mb-2 font-bold">SOCIAL NETWORKS</p>
              <div className="flex flex-wrap gap-x-4 gap-y-2">
                {[
                  { name: "YouTube", url: "#" },
                  { name: "LinkedIn", url: "#" },
                  { name: "GitHub", url: "#" },
                  { name: "Twitter", url: "#" }
                ].map((net) => (
                  <a
                    key={net.name}
                    href={net.url}
                    className="text-xs uppercase tracking-[1.5px] text-white/50 hover:text-white transition-colors duration-300"
                  >
                    {net.name}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
