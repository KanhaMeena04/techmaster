import React, { useEffect, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface VideoTrio {
  hero: string;
  mid: string;
  feature: string;
}

// Cinematic background video loops for all 18 pages.
// Each page maps 3 distinct loops that smoothly cross-fade as the user scrolls.
const auroraVideo = "https://assets.mixkit.co/videos/preview/mixkit-aurora-borealis-lights-glowing-in-dark-sky-43187-large.mp4";
const refractionVideo = "https://assets.mixkit.co/videos/preview/mixkit-liquid-fluid-shifting-refractions-43242-large.mp4";
const oceanVideo = "https://assets.mixkit.co/videos/preview/mixkit-abstract-dark-waves-fluid-loop-43093-large.mp4";

const oceanTrio1 = {
  hero: auroraVideo,
  mid: refractionVideo,
  feature: oceanVideo,
};

const oceanTrio2 = {
  hero: refractionVideo,
  mid: oceanVideo,
  feature: auroraVideo,
};

const oceanTrio3 = {
  hero: oceanVideo,
  mid: auroraVideo,
  feature: refractionVideo,
};

const pageVideos: Record<string, VideoTrio> = {
  home: oceanTrio1,
  about: oceanTrio2,
  journey: oceanTrio3,
  mission: oceanTrio1,
  "what-we-do": oceanTrio2,
  services: oceanTrio3,
  collaborations: oceanTrio1,
  campaigns: oceanTrio2,
  "product-launches": oceanTrio3,
  events: oceanTrio1,
  portfolio: oceanTrio2,
  gallery: oceanTrio3,
  media: oceanTrio1,
  testimonials: oceanTrio2,
  career: oceanTrio3,
  blog: oceanTrio1,
  faq: oceanTrio2,
  contact: oceanTrio3,
};

interface BackgroundVideoProps {
  activePage: string;
}

export const BackgroundVideo: React.FC<BackgroundVideoProps> = ({ activePage }) => {
  const activePair = pageVideos[activePage] || pageVideos.home;
  
  const [videoSrcHero, setVideoSrcHero] = useState(activePair.hero);
  const [videoSrcMid, setVideoSrcMid] = useState(activePair.mid);
  const [videoSrcFeature, setVideoSrcFeature] = useState(activePair.feature);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [transitionOpacity, setTransitionOpacity] = useState(1);

  useEffect(() => {
    // Cross-fade the page video sources change smoothly on route transitions
    setTransitionOpacity(0);
    const timeout = setTimeout(() => {
      const currentPair = pageVideos[activePage] || pageVideos.home;
      setVideoSrcHero(currentPair.hero);
      setVideoSrcMid(currentPair.mid);
      setVideoSrcFeature(currentPair.feature);
      setTransitionOpacity(1);
    }, 400);

    return () => clearTimeout(timeout);
  }, [activePage]);

  useEffect(() => {
    // Dynamic scroll tracking percentage
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      if (totalScroll > 0) {
        setScrollProgress(window.scrollY / totalScroll);
      } else {
        setScrollProgress(0);
      }
    };
    
    window.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const videoHero = document.querySelector(".bg-video-hero");
    const videoMid = document.querySelector(".bg-video-mid");
    const videoFeature = document.querySelector(".bg-video-feature");
    if (!videoHero || !videoMid || !videoFeature) return;

    // Scroll-controlled parallax displacements
    const animHero = gsap.fromTo(
      videoHero,
      { y: 0, scale: 1.0 },
      {
        y: -100,
        scale: 1.1,
        ease: "none",
        scrollTrigger: {
          trigger: document.body,
          start: "top top",
          end: "bottom bottom",
          scrub: true,
        },
      }
    );

    const animMid = gsap.fromTo(
      videoMid,
      { y: 50, scale: 1.05 },
      {
        y: -50,
        scale: 1.1,
        ease: "none",
        scrollTrigger: {
          trigger: document.body,
          start: "top top",
          end: "bottom bottom",
          scrub: true,
        },
      }
    );

    const animFeature = gsap.fromTo(
      videoFeature,
      { y: 100, scale: 1.15 },
      {
        y: 0,
        scale: 1.05,
        ease: "none",
        scrollTrigger: {
          trigger: document.body,
          start: "top top",
          end: "bottom bottom",
          scrub: true,
        },
      }
    );

    return () => {
      animHero.scrollTrigger?.kill();
      animHero.kill();
      animMid.scrollTrigger?.kill();
      animMid.kill();
      animFeature.scrollTrigger?.kill();
      animFeature.kill();
    };
  }, [videoSrcHero, videoSrcMid, videoSrcFeature]);

  // Three-stage opacity math:
  // p < 0.2: Video 1 is 100% visible, others are 0%.
  // 0.2 <= p <= 0.4: Cross-fade from Video 1 to Video 2.
  // 0.4 < p < 0.6: Video 2 is 100% visible, others are 0%.
  // 0.6 <= p <= 0.8: Cross-fade from Video 2 to Video 3.
  // p > 0.8: Video 3 is 100% visible, others are 0%.
  let opacityHero = 0;
  let opacityMid = 0;
  let opacityFeature = 0;

  if (scrollProgress < 0.2) {
    opacityHero = 1;
  } else if (scrollProgress >= 0.2 && scrollProgress <= 0.4) {
    const factor = (scrollProgress - 0.2) / 0.2; // 0 to 1
    opacityHero = 1 - factor;
    opacityMid = factor;
  } else if (scrollProgress > 0.4 && scrollProgress < 0.6) {
    opacityMid = 1;
  } else if (scrollProgress >= 0.6 && scrollProgress <= 0.8) {
    const factor = (scrollProgress - 0.6) / 0.2; // 0 to 1
    opacityMid = 1 - factor;
    opacityFeature = factor;
  } else {
    opacityFeature = 1;
  }

  // Factor in maximum opacity layer bounds
  const maxOpacity = 0.25;
  const opacityHeroAdjusted = opacityHero * maxOpacity * transitionOpacity;
  const opacityMidAdjusted = opacityMid * maxOpacity * transitionOpacity;
  const opacityFeatureAdjusted = opacityFeature * maxOpacity * transitionOpacity;

  return (
    <div 
      className="fixed inset-0 w-full h-screen pointer-events-none bg-[#010610] overflow-hidden"
      style={{ zIndex: 1 }}
    >
      {/* 1. Hero Video: Visible at top screen, fades as we scroll down */}
      <video
        key={videoSrcHero}
        src={videoSrcHero}
        autoPlay
        loop
        muted
        playsInline
        className="bg-video-hero w-full h-full object-cover absolute inset-0 transition-opacity duration-300 ease-out"
        style={{ opacity: opacityHeroAdjusted }}
      />

      {/* 2. Mid Video: Cross-fades in mid scroll */}
      <video
        key={videoSrcMid}
        src={videoSrcMid}
        autoPlay
        loop
        muted
        playsInline
        className="bg-video-mid w-full h-full object-cover absolute inset-0 transition-opacity duration-300 ease-out"
        style={{ opacity: opacityMidAdjusted }}
      />

      {/* 3. Feature Video: Fades in bottom scroll */}
      <video
        key={videoSrcFeature}
        src={videoSrcFeature}
        autoPlay
        loop
        muted
        playsInline
        className="bg-video-feature w-full h-full object-cover absolute inset-0 transition-opacity duration-300 ease-out"
        style={{ opacity: opacityFeatureAdjusted }}
      />

      {/* Ambient gradient layer to blur/darken edges */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#030303] via-transparent to-[#030303]/80 pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-r from-[#030303]/20 via-transparent to-[#030303]/20 pointer-events-none" />
    </div>
  );
};
