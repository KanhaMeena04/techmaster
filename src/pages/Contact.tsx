import React, { useState } from "react";
import { Mail, Phone, MapPin, Send } from "lucide-react";
import { motion } from "framer-motion";
import contactData from "../data/contact.json";

export const Contact: React.FC = () => {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="relative text-white min-h-screen pt-32 pb-24 px-6 overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-1/3 left-1/4 w-[35vw] h-[35vw] aurora-glow-purple opacity-20 pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[30vw] h-[30vw] aurora-glow-gold opacity-10 pointer-events-none" />

      {/* Hero Header */}
      <section className="max-w-7xl mx-auto text-left mb-20 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-[10px] uppercase tracking-[6px] text-gold font-bold mb-4"
        >
          DIRECT PORTAL
        </motion.div>
        
        <h1 className="font-serif text-4xl sm:text-6xl md:text-7xl font-light leading-tight mb-8">
          Connect & <br />
          <span className="text-gold italic font-bold">Book Keynotes</span>.
        </h1>
      </section>

      {/* Contact Layout */}
      <section className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 text-left relative z-10">
        {/* Info panel */}
        <div className="flex flex-col justify-between py-4">
          <div>
            <h3 className="font-serif text-2xl text-white font-bold mb-6">Direct Channels</h3>
            
            <div className="flex flex-col gap-6">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-gold">
                  <Mail className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-[10px] uppercase tracking-[1px] opacity-40 block">DIRECT MAIL</span>
                  <a href={`mailto:${contactData.email}`} className="text-sm font-bold text-white hover:text-gold transition-colors duration-300">
                    {contactData.email}
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-gold">
                  <Phone className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-[10px] uppercase tracking-[1px] opacity-40 block">COMMUNICATION TELEPHONE</span>
                  <a href={`tel:${contactData.phone}`} className="text-sm font-bold text-white hover:text-gold transition-colors duration-300">
                    {contactData.phone}
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-gold">
                  <MapPin className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-[10px] uppercase tracking-[1px] opacity-40 block">CREATOR HQ</span>
                  <span className="text-sm font-bold text-white">
                    {contactData.location}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-12 lg:mt-0 pt-8 border-t border-white/5">
            <p className="text-[10px] uppercase tracking-[4px] text-gold/80 font-bold mb-4">RESPONSE GUARANTEE</p>
            <p className="text-white/50 text-xs md:text-sm font-light leading-relaxed">
              We process inquiries on priority. All verified sponsorship, speaking, and cohort queries are addressed within 24 operational hours.
            </p>
          </div>
        </div>

        {/* Contact Form */}
        <div className="glass-panel p-8 md:p-12 rounded-3xl border border-white/5 relative">
          <h3 className="font-serif text-2xl text-white font-bold mb-8">Inquiry Form</h3>

          {submitted ? (
            <div className="py-20 text-center">
              <span className="text-gold text-5xl block mb-6">✓</span>
              <h4 className="font-serif text-2xl font-bold mb-3">Transmission Logged</h4>
              <p className="text-white/50 text-sm font-light">
                Your direct booking or collab inquiry has been logged successfully.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="text-[9px] uppercase tracking-[2px] text-gold font-bold block mb-2">YOUR NAME</label>
                  <input
                    type="text"
                    required
                    placeholder="ARIAN DEVI"
                    className="w-full bg-black/60 border border-white/10 rounded-xl px-4 py-3.5 text-xs uppercase text-white placeholder-white/20 focus:outline-none focus:border-gold transition-colors duration-300"
                  />
                </div>
                <div>
                  <label className="text-[9px] uppercase tracking-[2px] text-gold font-bold block mb-2">EMAIL ADDRESS</label>
                  <input
                    type="email"
                    required
                    placeholder="ARIAN@DEVI.COM"
                    className="w-full bg-black/60 border border-white/10 rounded-xl px-4 py-3.5 text-xs uppercase text-white placeholder-white/20 focus:outline-none focus:border-gold transition-colors duration-300"
                  />
                </div>
              </div>

              <div>
                <label className="text-[9px] uppercase tracking-[2px] text-gold font-bold block mb-2">INQUIRY CATEGORY</label>
                <select className="w-full bg-[#0d0d0d] border border-white/10 rounded-xl px-4 py-3.5 text-xs text-white/70 focus:outline-none focus:border-gold transition-colors duration-300">
                  {contactData.inquiryTypes.map((type) => (
                    <option key={type.value} value={type.value}>
                      {type.label}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="text-[9px] uppercase tracking-[2px] text-gold font-bold block mb-2">INQUIRY OUTLINE</label>
                <textarea
                  rows={4}
                  required
                  placeholder="Provide outline dates, audience sizes, sponsorship briefs, or general requests."
                  className="w-full bg-black/60 border border-white/10 rounded-xl px-4 py-3.5 text-xs text-white placeholder-white/20 focus:outline-none focus:border-gold transition-colors duration-300"
                />
              </div>

              <button
                type="submit"
                className="w-full py-4 bg-gold hover:bg-gold-light text-black font-bold uppercase text-xs tracking-[2px] rounded-xl flex items-center justify-center gap-2 transition-colors duration-300"
                data-cursor="submit"
              >
                Log Inquiry Details
                <Send className="w-4 h-4" />
              </button>
            </form>
          )}
        </div>
      </section>
    </div>
  );
};
