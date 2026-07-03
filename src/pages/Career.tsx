import React, { useState } from "react";
import { Briefcase, MapPin, DollarSign, Send, UploadCloud, CheckCircle, AlertCircle, Trash2, FileText, ChevronDown, ChevronUp } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import careerData from "../data/career.json";
import cultureData from "../data/culture.json";

export const Career: React.FC = () => {
  const [submitted, setSubmitted] = useState(false);
  
  // Job filters
  const [activeType, setActiveType] = useState("All");
  
  // Accordion for expanded requirements
  const [expandedRoleId, setExpandedRoleId] = useState<string | null>(null);

  // Form states
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [link, setLink] = useState("");
  const [whyJoin, setWhyJoin] = useState("");
  const [selectedRole, setSelectedRole] = useState("");
  
  // File upload states
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);

  const filters = ["All", "Full Time", "Internship", "Freelance"];

  const filteredRoles = activeType === "All"
    ? careerData
    : careerData.filter((role) => role.type === activeType);

  const handleApplySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      validateAndProcessFile(e.dataTransfer.files[0]);
    }
  };

  const validateAndProcessFile = (file: File) => {
    setUploadError(null);
    if (!file) return;

    // Validate size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      setUploadError("File size exceeds 5MB limit.");
      return;
    }

    // Validate extension
    const allowedExtensions = ["pdf", "doc", "docx"];
    const fileExtension = file.name.split(".").pop()?.toLowerCase();
    if (!fileExtension || !allowedExtensions.includes(fileExtension)) {
      setUploadError("Only PDF or Word Documents (.doc, .docx) are supported.");
      return;
    }

    setUploadedFile(file);
    setUploadProgress(0);

    // Simulate progress
    const interval = setInterval(() => {
      setUploadProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 20;
      });
    }, 80);
  };

  const removeUploadedFile = () => {
    setUploadedFile(null);
    setUploadProgress(0);
    setUploadError(null);
  };

  // Convert bytes to readable size
  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };

  const hiringSteps = [
    {
      step: "01",
      title: "Online Submission",
      desc: "Apply online with your portfolio links and custom PDF resume."
    },
    {
      step: "02",
      title: "Practical Sprint",
      desc: "Complete a small 48-hour challenge related to systems or cinematography."
    },
    {
      step: "03",
      title: "Collaborator Review",
      desc: "Interview online with our core technical and creative coordinators."
    },
    {
      step: "04",
      title: "Offer & Gear",
      desc: "Receive your contract along with a developer setup budget allowance."
    }
  ];

  return (
    <div className="relative text-white min-h-screen pt-32 pb-24 px-6 overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-1/4 left-1/3 w-[35vw] h-[35vw] aurora-glow-blue opacity-15 pointer-events-none" />
      <div className="absolute bottom-1/4 left-1/4 w-[30vw] h-[30vw] aurora-glow-purple opacity-10 pointer-events-none" />

      {/* Hero Header */}
      <section className="max-w-7xl mx-auto text-left mb-24 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-[10px] uppercase tracking-[6px] text-gold font-bold mb-4"
        >
          JOIN THE TEAM
        </motion.div>
        
        <h1 className="font-serif text-4xl sm:text-6xl md:text-7xl font-light leading-tight mb-8">
          Join Faisal's <br />
          <span className="text-gold italic font-bold">Creator & Education Lab</span>.
        </h1>

        <p className="text-white/50 font-light text-base md:text-lg max-w-2xl leading-relaxed mt-6">
          We look for cinematic editors, full-stack engineers, and syllabus architects who want to build high-quality, visual, and interactive tech guides.
        </p>
      </section>

      {/* Culture & Benefits Section */}
      <section className="max-w-7xl mx-auto mb-32 relative z-10 text-left">
        <div className="mb-12">
          <span className="text-[10px] uppercase tracking-[4px] text-gold font-mono block mb-2">OUR CULTURE</span>
          <h2 className="font-serif text-3xl md:text-5xl font-light">Benefits & Workspace</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {cultureData.map((item) => (
            <div 
              key={item.id} 
              className="glass-panel p-8 rounded-3xl border border-white/5 hover:border-gold/30 transition-all duration-300 flex flex-col justify-between"
            >
              <h3 className="font-serif text-lg font-bold text-white mb-4">{item.title}</h3>
              <p className="text-white/50 text-xs leading-relaxed font-light">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Hiring Process Steps */}
      <section className="max-w-7xl mx-auto mb-32 relative z-10 text-left">
        <div className="mb-12">
          <span className="text-[10px] uppercase tracking-[4px] text-gold font-mono block mb-2">STEPS</span>
          <h2 className="font-serif text-3xl md:text-5xl font-light">Hiring Process</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 relative">
          {hiringSteps.map((step, idx) => (
            <div key={idx} className="glass-panel p-8 rounded-3xl border border-white/5 relative">
              <span className="text-4xl font-serif font-black text-gold/20 absolute right-6 top-6">{step.step}</span>
              <h3 className="font-serif text-lg font-bold text-white mb-3 mt-4">{step.title}</h3>
              <p className="text-white/50 text-xs leading-relaxed font-light">{step.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Active Roles & Dynamic Form */}
      <section className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 text-left relative z-10">
        
        {/* Roles List (LGB 7) */}
        <div className="lg:col-span-7">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
            <h3 className="font-serif text-2xl text-white font-bold">Open Positions</h3>
            
            {/* Filtering Tabs */}
            <div className="flex flex-wrap gap-2">
              {filters.map((type) => (
                <button
                  key={type}
                  onClick={() => setActiveType(type)}
                  className={`px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-[1px] border transition-all duration-300 ${
                    activeType === type
                      ? "bg-gold border-gold text-black"
                      : "bg-[#0d0d0d] border-white/10 text-white/60 hover:border-white/30"
                  }`}
                >
                  {type}
                </button>
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-6">
            {filteredRoles.length === 0 ? (
              <div className="py-16 text-center glass-panel rounded-3xl border border-white/5">
                <p className="text-white/40 text-xs font-mono">No positions available under this filter.</p>
              </div>
            ) : (
              filteredRoles.map((role) => {
                const isExpanded = expandedRoleId === role.id;
                return (
                  <div 
                    key={role.id} 
                    className="glass-panel p-6 rounded-3xl border border-white/5 hover:border-gold/25 transition-all duration-300 cursor-pointer"
                    onClick={() => setExpandedRoleId(isExpanded ? null : role.id)}
                  >
                    <div className="flex justify-between items-start gap-4 mb-2">
                      <div>
                        <span className="text-gold font-mono text-[9px] uppercase tracking-[1.5px] block mb-1">
                          {role.team} &bull; {role.type}
                        </span>
                        <h4 className="font-serif text-lg md:text-xl font-bold text-white">{role.role}</h4>
                      </div>
                      <button className="text-white/40 hover:text-white p-1">
                        {isExpanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                      </button>
                    </div>

                    <p className="text-white/60 text-xs font-light leading-relaxed mt-2">
                      {role.description}
                    </p>

                    <AnimatePresence>
                      {isExpanded && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3 }}
                          className="overflow-hidden mt-4 pt-4 border-t border-white/5"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <h5 className="text-[10px] uppercase tracking-[1px] text-gold font-bold mb-2">Requirements:</h5>
                          <ul className="list-disc pl-4 flex flex-col gap-1.5 mb-6 text-xs text-white/70 font-light">
                            {role.requirements.map((req, idx) => (
                              <li key={idx}>{req}</li>
                            ))}
                          </ul>
                          
                          <button
                            onClick={() => {
                              setSelectedRole(role.role);
                              document.getElementById("application-form")?.scrollIntoView({ behavior: "smooth" });
                            }}
                            className="px-4 py-2 border border-gold text-gold rounded-xl text-[10px] uppercase tracking-[1px] hover:bg-gold hover:text-black font-bold transition-all duration-300"
                          >
                            Apply for this role
                          </button>
                        </motion.div>
                      )}
                    </AnimatePresence>

                    <div className="flex flex-wrap gap-4 text-[10px] text-white/40 font-light pt-4 border-t border-white/5 mt-4">
                      <span className="flex items-center gap-1.5">
                        <Briefcase className="w-3 h-3 text-gold" />
                        {role.type}
                      </span>
                      <span className="flex items-center gap-1.5">
                        <MapPin className="w-3 h-3 text-gold" />
                        {role.location}
                      </span>
                      <span className="flex items-center gap-1.5">
                        <DollarSign className="w-3 h-3 text-gold" />
                        {role.salary}
                      </span>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>

        {/* Culture Application Form (LGB 5) */}
        <div id="application-form" className="lg:col-span-5 glass-panel p-8 rounded-3xl border border-white/5 relative h-fit">
          <h3 className="font-serif text-2xl text-white font-bold mb-6">Direct Application</h3>
          
          {submitted ? (
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="py-12 text-center"
            >
              <CheckCircle className="w-12 h-12 text-gold mx-auto mb-4" />
              <h4 className="font-serif text-xl font-bold mb-2">Application Received</h4>
              <p className="text-white/50 text-xs font-light max-w-xs mx-auto leading-relaxed">
                Thank you for applying. Faisal's content and engineering coordinators will review your materials and contact you if it aligns.
              </p>
            </motion.div>
          ) : (
            <form onSubmit={handleApplySubmit} className="flex flex-col gap-5">
              <div>
                <label className="text-[9px] uppercase tracking-[2px] text-gold font-bold block mb-2">Full Name</label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Arya Patel"
                  className="w-full bg-black/60 border border-white/10 rounded-xl px-4 py-3 text-xs uppercase text-white placeholder-white/20 focus:outline-none focus:border-gold transition-colors duration-300"
                />
              </div>

              <div>
                <label className="text-[9px] uppercase tracking-[2px] text-gold font-bold block mb-2">Email Address</label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="arya@code.net"
                  className="w-full bg-black/60 border border-white/10 rounded-xl px-4 py-3 text-xs uppercase text-white placeholder-white/20 focus:outline-none focus:border-gold transition-colors duration-300"
                />
              </div>

              <div>
                <label className="text-[9px] uppercase tracking-[2px] text-gold font-bold block mb-2">Apply for Role</label>
                <select
                  required
                  value={selectedRole}
                  onChange={(e) => setSelectedRole(e.target.value)}
                  className="w-full bg-black/80 border border-white/10 rounded-xl px-4 py-3 text-xs text-white focus:outline-none focus:border-gold transition-colors duration-300"
                >
                  <option value="">Select a position...</option>
                  {careerData.map((role) => (
                    <option key={role.id} value={role.role}>{role.role} ({role.type})</option>
                  ))}
                  <option value="General Internship">General Internship</option>
                  <option value="General Freelance">General Freelance Partnership</option>
                </select>
              </div>

              <div>
                <label className="text-[9px] uppercase tracking-[2px] text-gold font-bold block mb-2">Portfolio / Work Links</label>
                <input
                  type="url"
                  required
                  value={link}
                  onChange={(e) => setLink(e.target.value)}
                  placeholder="https://github.com/arya"
                  className="w-full bg-black/60 border border-white/10 rounded-xl px-4 py-3 text-xs text-white placeholder-white/20 focus:outline-none focus:border-gold transition-colors duration-300"
                />
              </div>

              <div>
                <label className="text-[9px] uppercase tracking-[2px] text-gold font-bold block mb-2">Why Join Faisal's Lab?</label>
                <textarea
                  rows={3}
                  required
                  value={whyJoin}
                  onChange={(e) => setWhyJoin(e.target.value)}
                  placeholder="Briefly describe what sparks your interest in coding tutorials and media production."
                  className="w-full bg-black/60 border border-white/10 rounded-xl px-4 py-3 text-xs text-white placeholder-white/20 focus:outline-none focus:border-gold transition-colors duration-300"
                />
              </div>

              {/* Drag-and-Drop Resume Upload */}
              <div>
                <label className="text-[9px] uppercase tracking-[2px] text-gold font-bold block mb-2">Upload Resume (PDF, DOCX)</label>
                
                {!uploadedFile ? (
                  <div
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onDrop={handleDrop}
                    className={`border-2 border-dashed rounded-2xl p-6 text-center cursor-pointer transition-all duration-300 ${
                      isDragging 
                        ? "border-gold bg-gold/5" 
                        : "border-white/10 hover:border-gold/50 bg-black/40"
                    }`}
                    onClick={() => document.getElementById("file-input")?.click()}
                  >
                    <input
                      id="file-input"
                      type="file"
                      className="hidden"
                      accept=".pdf,.doc,.docx"
                      onChange={(e) => {
                        if (e.target.files && e.target.files.length > 0) {
                          validateAndProcessFile(e.target.files[0]);
                        }
                      }}
                    />
                    <UploadCloud className="w-8 h-8 text-white/40 mx-auto mb-2" />
                    <span className="text-[10px] uppercase font-bold tracking-[1.5px] block mb-1">
                      Drag & Drop Resume
                    </span>
                    <span className="text-[9px] text-white/30 font-light block">
                      or click to browse from files (max 5MB)
                    </span>
                  </div>
                ) : (
                  <div className="border border-white/10 bg-black/40 rounded-2xl p-4 flex flex-col gap-3">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-gold/15 flex items-center justify-center text-gold">
                          <FileText className="w-4 h-4" />
                        </div>
                        <div className="text-left">
                          <p className="text-[10px] uppercase tracking-[1px] font-bold text-white truncate max-w-[180px]">
                            {uploadedFile.name}
                          </p>
                          <p className="text-[9px] text-white/30">
                            {formatFileSize(uploadedFile.size)}
                          </p>
                        </div>
                      </div>
                      
                      <button
                        type="button"
                        onClick={removeUploadedFile}
                        className="text-white/40 hover:text-white p-1 rounded-lg hover:bg-white/5 transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>

                    {/* Progress Bar */}
                    <div className="w-full bg-white/5 h-1.5 rounded-full overflow-hidden">
                      <motion.div 
                        initial={{ width: 0 }}
                        animate={{ width: `${uploadProgress}%` }}
                        className="h-full bg-gold"
                      />
                    </div>
                    {uploadProgress < 100 ? (
                      <span className="text-[9px] font-mono text-white/30 text-right">Uploading... {uploadProgress}%</span>
                    ) : (
                      <span className="text-[9px] font-mono text-gold text-right font-bold flex items-center gap-1 justify-end">
                        Ready to Submit
                      </span>
                    )}
                  </div>
                )}

                {uploadError && (
                  <div className="flex items-center gap-1.5 mt-2 text-rose-500 text-[10px] font-light">
                    <AlertCircle className="w-3.5 h-3.5" />
                    <span>{uploadError}</span>
                  </div>
                )}
              </div>

              <button
                type="submit"
                disabled={uploadedFile && uploadProgress < 100}
                className="w-full py-4 bg-gold hover:bg-gold-light text-black font-bold uppercase text-xs tracking-[2px] rounded-xl flex items-center justify-center gap-2 transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed mt-2"
                data-cursor="submit"
              >
                Send Application
                <Send className="w-4 h-4" />
              </button>
            </form>
          )}
        </div>
      </section>
    </div>
  );
};
