import React, { useState } from "react";
import { ChevronDown, HelpCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import faqData from "../data/faq.json";

export const FAQ: React.FC = () => {
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [activeCategory, setActiveCategory] = useState("All");

  const categories = [
    { id: "All", label: "All Questions" },
    { id: "Courses", label: "Courses & Bootcamps" },
    { id: "Speaking", label: "Speaking & Events" },
    { id: "Sponsorships", label: "Brand Partnerships" },
    { id: "Careers", label: "Careers & Culture" }
  ];

  const filteredFaqs = activeCategory === "All"
    ? faqData
    : faqData.filter((faq) => faq.category === activeCategory);

  return (
    <div className="relative text-white min-h-screen pt-32 pb-24 px-6 overflow-hidden">
      {/* Background Glow */}
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
          INFORMATION ARCHIVE
        </motion.div>
        
        <h1 className="font-serif text-4xl sm:text-6xl md:text-7xl font-light leading-tight mb-8">
          Answers & <br />
          <span className="text-gold italic font-bold">Frequently Asked Questions</span>.
        </h1>
      </section>

      {/* Category Tabs */}
      <section className="max-w-4xl mx-auto mb-12 flex flex-wrap gap-2 text-left relative z-10">
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => {
              setActiveCategory(cat.id);
              setExpandedId(null); // collapse accordions on category switch
            }}
            className={`px-5 py-2.5 rounded-full text-[10px] font-bold uppercase tracking-[1.5px] border transition-all duration-300 ${
              activeCategory === cat.id
                ? "bg-gold border-gold text-black shadow-[0_0_20px_rgba(212,175,55,0.25)]"
                : "bg-[#0d0d0d] border-white/10 text-white/60 hover:border-white/40 hover:text-white"
            }`}
          >
            {cat.label}
          </button>
        ))}
      </section>

      {/* FAQ Accordion List */}
      <section className="max-w-4xl mx-auto text-left relative z-10">
        <motion.div layout className="flex flex-col gap-5">
          <AnimatePresence mode="popLayout">
            {filteredFaqs.map((faq) => {
              const isExpanded = expandedId === faq.id;

              return (
                <motion.div
                  layout
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.3 }}
                  key={faq.id}
                  className="glass-panel rounded-3xl overflow-hidden border border-white/5 hover:border-gold/25 transition-all duration-300"
                >
                  <button
                    onClick={() => setExpandedId(isExpanded ? null : faq.id)}
                    className="w-full p-6 md:p-8 flex items-center justify-between text-left focus:outline-none"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-gold shrink-0">
                        <HelpCircle className="w-4 h-4" />
                      </div>
                      <h3 className="text-sm md:text-base font-bold text-white leading-relaxed">
                        {faq.question}
                      </h3>
                    </div>

                    <motion.div
                      animate={{ rotate: isExpanded ? 180 : 0 }}
                      transition={{ duration: 0.3 }}
                      className="shrink-0 ml-4"
                    >
                      <ChevronDown className="w-5 h-5 text-white/55" />
                    </motion.div>
                  </button>

                  <AnimatePresence initial={false}>
                    {isExpanded && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.35, ease: "easeInOut" }}
                      >
                        <div className="px-6 md:px-8 pb-8 pt-2 border-t border-white/5 text-xs md:text-sm text-white/60 font-light leading-relaxed">
                          {faq.answer}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>
      </section>
    </div>
  );
};
