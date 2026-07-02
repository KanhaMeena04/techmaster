import React, { useRef, useState, useEffect } from "react";
import { ArrowUpRight, Mail, Phone, MapPin } from "lucide-react";
import { Magnetic } from "../components/Magnetic";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { Canvas, useFrame } from "@react-three/fiber";
import { MeshDistortMaterial } from "@react-three/drei";
import * as THREE from "three";

interface FooterProps {
  onChangePage: (page: string) => void;
}

// 3D Scene Component for the Footer
const MorphingTorus: React.FC = () => {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!meshRef.current) return;
    const time = state.clock.getElapsedTime();
    meshRef.current.rotation.y = time * 0.15;
    meshRef.current.rotation.x = Math.sin(time * 0.1) * 0.2;
    meshRef.current.position.y = Math.sin(time * 0.5) * 0.15;
  });

  return (
    <mesh ref={meshRef} scale={1.3} position={[0, 0, 0]}>
      <sphereGeometry args={[1, 64, 64]} />
      <MeshDistortMaterial
        color="#00ffd1"
        roughness={0.1}
        metalness={0.9}
        distort={0.4}
        speed={1.5}
      />
    </mesh>
  );
};

// Custom Particle Emitter Component inside the footer
const ParticleCanvas: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = canvas.offsetWidth);
    let height = (canvas.height = canvas.offsetHeight);

    const particles: Array<{
      x: number;
      y: number;
      size: number;
      speedY: number;
      opacity: number;
    }> = [];

    // Initialize particles
    for (let i = 0; i < 40; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        size: Math.random() * 2 + 0.5,
        speedY: -Math.random() * 0.5 - 0.1,
        opacity: Math.random() * 0.5 + 0.1,
      });
    }

    const handleResize = () => {
      width = canvas.width = canvas.offsetWidth;
      height = canvas.height = canvas.offsetHeight;
    };
    window.addEventListener("resize", handleResize);

    // Emitter Loop
    const draw = () => {
      ctx.clearRect(0, 0, width, height);
      ctx.fillStyle = "rgba(212, 175, 55, 0.4)";

      particles.forEach((p) => {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.globalAlpha = p.opacity;
        ctx.fill();

        // Update position
        p.y += p.speedY;

        // Reset particles at top boundary
        if (p.y < 0) {
          p.y = height;
          p.x = Math.random() * width;
        }
      });

      animationFrameId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none opacity-40 z-0" />;
};

// Animated 3D Contact Card Component
interface ContactCardProps {
  icon: React.ReactNode;
  label: string;
  value: string;
  href?: string;
  accent: string;
}

const ContactCard: React.FC<ContactCardProps> = ({ icon, label, value, href, accent }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [10, -10]), { damping: 20, stiffness: 200 });
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-10, 10]), { damping: 20, stiffness: 200 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const relX = (e.clientX - rect.left) / rect.width - 0.5;
    const relY = (e.clientY - rect.top) / rect.height - 0.5;
    x.set(relX);
    y.set(relY);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  const Content = (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ rotateX, rotateY, perspective: 800 }}
      className="glass-panel p-6 rounded-2xl flex items-center gap-4 hover:border-white/20 transition-all duration-300 select-none cursor-pointer"
      whileHover={{ scale: 1.02 }}
    >
      <div 
        className="w-10 h-10 rounded-xl bg-white/5 border flex items-center justify-center transition-colors duration-300"
        style={{ color: accent, borderColor: accent + "30" }}
      >
        {icon}
      </div>
      <div>
        <span className="text-[9px] uppercase tracking-[1px] opacity-40 block">{label}</span>
        <span className="text-xs md:text-sm font-bold text-white transition-colors duration-300 hover:text-gold block">
          {value}
        </span>
      </div>
    </motion.div>
  );

  return href ? (
    <a href={href} target="_blank" rel="noopener noreferrer">
      {Content}
    </a>
  ) : (
    Content
  );
};

export const Footer: React.FC<FooterProps> = ({ onChangePage }) => {
  const footerRef = useRef<HTMLElement>(null);
  const [mouseGlow, setMouseGlow] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!footerRef.current) return;
    const rect = footerRef.current.getBoundingClientRect();
    setMouseGlow({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  const handleNavClick = (pageId: string) => {
    onChangePage(pageId);
  };

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Inquiry successfully logged in sandbox environment.");
  };

  return (
    <footer 
      ref={footerRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="bg-transparent border-t border-white/5 pt-32 pb-12 px-6 md:px-12 relative overflow-hidden text-left"
    >
      {/* 1. Cinematic Background Video inside the footer (disabled to show global background) */}
      {/*
      <div className="absolute inset-0 w-full h-full opacity-15 pointer-events-none overflow-hidden z-0">
        <video
          src="https://assets.mixkit.co/videos/preview/mixkit-abstract-dark-waves-fluid-loop-43093-large.mp4"
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-[#030303]/80" />
      </div>
      */}

      {/* 2. Interactive Mouse Glow Spotlight */}
      <div
        className="absolute inset-0 pointer-events-none transition-opacity duration-700 z-0"
        style={{
          opacity: isHovered ? 1 : 0,
          background: `radial-gradient(400px circle at ${mouseGlow.x}px ${mouseGlow.y}px, rgba(212, 175, 55, 0.06), transparent 70%)`,
        }}
      />

      {/* 3. HTML5 Particle Canvas */}
      <ParticleCanvas />

      {/* 4. Animated rotating background glow rings */}
      <div className="absolute bottom-[-100px] right-[-100px] w-[500px] h-[500px] aurora-glow-purple opacity-20 pointer-events-none blur-[100px] animate-pulse" />

      <div className="max-w-7xl mx-auto relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-16 mb-20 items-stretch">
        
        {/* Left columns (LGB 5): Newsletter & Slogan */}
        <div className="lg:col-span-5 flex flex-col justify-between">
          <div>
            <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl font-light text-white leading-tight mb-6">
              Let's create the <br />
              <span className="text-gold italic font-bold">future of code</span>.
            </h2>
            <p className="text-white/50 text-sm md:text-base font-light max-w-md leading-relaxed mb-8">
              Subscribe to Faisal's newsletter. Receive exclusive design mockups, platform beta keys, systems tips, and speaking logs.
            </p>
          </div>

          <form onSubmit={handleSubscribe} className="relative w-full max-w-md mt-6">
            <input
              type="email"
              required
              placeholder="ENTER YOUR DIRECT EMAIL"
              className="w-full bg-[#0d0d0d]/80 border border-white/10 rounded-full px-6 py-4 text-xs font-mono tracking-[2px] uppercase text-white placeholder-white/30 focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold transition-all duration-300 pr-16 backdrop-blur-md"
            />
            <button
              type="submit"
              className="absolute right-2 top-2 bottom-2 bg-gold hover:bg-gold-light text-black font-bold uppercase text-[10px] tracking-[1.5px] px-5 rounded-full flex items-center gap-1.5 transition-all duration-300"
              data-cursor="submit"
            >
              Subscribe
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          </form>
        </div>

        {/* Middle columns (LGB 4): sitemap columns */}
        <div className="lg:col-span-4 grid grid-cols-2 gap-8">
          {/* Column 1: Identity */}
          <div>
            <p className="text-[10px] uppercase tracking-[3px] text-gold/80 font-bold mb-6">IDENTITY</p>
            <ul className="flex flex-col gap-3">
              {[
                { name: "About Founder", id: "about" },
                { name: "Founder's Journey", id: "journey" },
                { name: "Mission & Vision", id: "mission" },
                { name: "What We Do", id: "what-we-do" },
                { name: "Core Services", id: "services" },
                { name: "Brand Collabs", id: "collaborations" },
              ].map((link) => (
                <li key={link.id}>
                  <button
                    onClick={() => handleNavClick(link.id)}
                    className="text-xs uppercase tracking-[1.5px] text-white/55 hover:text-gold transition-colors duration-300 text-left font-light block"
                  >
                    {link.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 2: Portals */}
          <div>
            <p className="text-[10px] uppercase tracking-[3px] text-gold/80 font-bold mb-6">ENGAGEMENT</p>
            <ul className="flex flex-col gap-3">
              {[
                { name: "Campaigns", id: "campaigns" },
                { name: "Product Launches", id: "product-launches" },
                { name: "Events & Talks", id: "events" },
                { name: "Student Work", id: "portfolio" },
                { name: "Media Gallery", id: "gallery" },
                { name: "Testimonials", id: "testimonials" },
              ].map((link) => (
                <li key={link.id}>
                  <button
                    onClick={() => handleNavClick(link.id)}
                    className="text-xs uppercase tracking-[1.5px] text-white/55 hover:text-gold transition-colors duration-300 text-left font-light block"
                  >
                    {link.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Right columns (LGB 3): 3D Scene viewport container */}
        <div className="lg:col-span-3 h-48 md:h-full min-h-[180px] w-full border border-white/5 rounded-3xl overflow-hidden relative glass-panel flex items-center justify-center">
          <div className="absolute inset-0 z-0">
            <Canvas camera={{ position: [0, 0, 3], fov: 45 }} gl={{ antialias: true, alpha: true }}>
              <ambientLight intensity={0.5} />
              <directionalLight position={[2, 2, 2]} intensity={1.5} color="#ffffff" />
              <pointLight position={[-2, -2, 2]} intensity={2.0} color="#aa3bff" />
              <MorphingTorus />
            </Canvas>
          </div>
          <div className="absolute bottom-4 left-4 z-10 pointer-events-none">
            <span className="text-[8px] font-mono tracking-[2px] text-gold uppercase bg-black/80 px-2 py-0.5 rounded border border-white/10">
              3D Spatial Node
            </span>
          </div>
        </div>

      </div>

      {/* 5. Contact Cards Grid */}
      <div className="max-w-7xl mx-auto relative z-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16 border-t border-white/5 pt-12">
        <ContactCard
          icon={<Mail className="w-4 h-4" />}
          label="DIRECT MAIL"
          value="bookings@techmasterf.com"
          href="mailto:bookings@techmasterf.com"
          accent="#00ffd1"
        />
        <ContactCard
          icon={<Phone className="w-4 h-4" />}
          label="BOOKING OFFICE"
          value="+1 (800) 555-CODE"
          href="tel:+18005552633"
          accent="#00E5FF"
        />
        <div className="md:col-span-2 lg:col-span-1">
          <ContactCard
            icon={<MapPin className="w-4 h-4" />}
            label="CREATOR HQ"
            value="Silicon Valley Creator Labs, Suite 40"
            accent="#aa3bff"
          />
        </div>
      </div>

      {/* Footer Bottom copyright and social handles */}
      <div className="max-w-7xl mx-auto pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6 relative z-10">
        <div className="text-left">
          <p className="text-[10px] uppercase tracking-[2px] text-white/30 font-light">
            &copy; {new Date().getFullYear()} MASTER F MEDIA & CREATIVE LABS. ALL RIGHTS RESERVED.
          </p>
          <p className="text-[9px] uppercase tracking-[1px] text-white/20 mt-1">
            Premium Creator Blueprint &bull; Designed to Awwwards Site of the Day Standard
          </p>
        </div>

        {/* Floating Social Icons */}
        <div className="flex gap-4">
          {[
            { 
              icon: (
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M23.498 6.163a3.003 3.003 0 0 0-2.11-2.11C19.517 3.545 12 3.545 12 3.545s-7.517 0-9.388.508a3.003 3.003 0 0 0-2.11 2.11C0 8.033 0 12 0 12s0 3.967.502 5.837a3.003 3.003 0 0 0 2.11 2.11c1.871.508 9.388.508 9.388.508s7.517 0 9.388-.508a3.003 3.003 0 0 0 2.11-2.11C24 15.967 24 12 24 12s0-3.967-.502-5.837zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                </svg>
              ), 
              href: "#" 
            },
            { 
              icon: (
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.779-1.75-1.75s.784-1.75 1.75-1.75 1.75.779 1.75 1.75-.784 1.75-1.75 1.75zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                </svg>
              ), 
              href: "#" 
            },
            { 
              icon: (
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                </svg>
              ), 
              href: "#" 
            },
            { 
              icon: (
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              ), 
              href: "#" 
            },
          ].map((soc, idx) => (
            <Magnetic key={idx} strength={0.3}>
              <motion.a
                href={soc.href}
                className="w-8 h-8 rounded-full border border-white/10 hover:border-gold/50 flex items-center justify-center text-white/60 hover:text-gold bg-white/5 transition-all duration-300"
                animate={{ y: [0, -4, 0] }}
                transition={{
                  repeat: Infinity,
                  duration: 4,
                  delay: idx * 0.5,
                  ease: "easeInOut",
                }}
              >
                {soc.icon}
              </motion.a>
            </Magnetic>
          ))}
        </div>
      </div>
    </footer>
  );
};
