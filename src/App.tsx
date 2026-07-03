import { useState } from "react";
import { CustomCursor } from "./components/CustomCursor";
import { SmoothScroll } from "./components/SmoothScroll";
import { IntroLoader } from "./components/IntroLoader";
import { SceneContainer } from "./three/SceneContainer";
import { Header } from "./layouts/Header";
import { Footer } from "./layouts/Footer";
import { BackgroundVideo } from "./components/BackgroundVideo";
import gsap from "gsap";

// Pages
import { Home } from "./pages/Home";
import { About } from "./pages/About";
import { Journey } from "./pages/Journey";
import { Mission } from "./pages/Mission";
import { WhatWeDo } from "./pages/WhatWeDo";
import { Services } from "./pages/Services";
import { Collaborations } from "./pages/Collaborations";
import { Campaigns } from "./pages/Campaigns";
import { ProductLaunches } from "./pages/ProductLaunches";
import { Events } from "./pages/Events";
import { Portfolio } from "./pages/Portfolio";
import { Gallery } from "./pages/Gallery";
import { Media } from "./pages/Media";
import { Testimonials } from "./pages/Testimonials";
import { Career } from "./pages/Career";
import { Blog } from "./pages/Blog";
import { FAQ } from "./pages/FAQ";
import { Contact } from "./pages/Contact";

function App() {
  const [activePage, setActivePage] = useState("home");
  const [isLoading, setIsLoading] = useState(true);

  const navigatePage = (pageId: string) => {
    if (pageId === activePage) {
      window.scrollTo({ top: 0, behavior: "smooth" });
      if ((window as any).lenis) {
        (window as any).lenis.scrollTo(0);
      }
      return;
    }

    // Trigger overlay entrance
    gsap.to(".page-transition-overlay", {
      clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)",
      duration: 0.6,
      ease: "power3.inOut",
      onComplete: () => {
        setActivePage(pageId);
        window.scrollTo(0, 0);
        if ((window as any).lenis) {
          (window as any).lenis.scrollTo(0, { immediate: true });
        }

        // Trigger overlay exit
        gsap.to(".page-transition-overlay", {
          clipPath: "polygon(0 100%, 100% 100%, 100% 100%, 0 100%)",
          duration: 0.6,
          delay: 0.15,
          ease: "power3.inOut",
        });
      },
    });
  };

  const renderActivePage = () => {
    switch (activePage) {
      case "home":
        return <Home onChangePage={navigatePage} />;
      case "about":
        return <About />;
      case "journey":
        return <Journey />;
      case "mission":
        return <Mission />;
      case "what-we-do":
        return <WhatWeDo />;
      case "services":
        return <Services />;
      case "collaborations":
        return <Collaborations />;
      case "campaigns":
        return <Campaigns />;
      case "product-launches":
        return <ProductLaunches />;
      case "events":
        return <Events />;
      case "portfolio":
        return <Portfolio />;
      case "gallery":
        return <Gallery />;
      case "media":
        return <Media />;
      case "testimonials":
        return <Testimonials />;
      case "career":
        return <Career />;
      case "blog":
        return <Blog />;
      case "faq":
        return <FAQ />;
      case "contact":
        return <Contact />;
      default:
        return <Home onChangePage={navigatePage} />;
    }
  };

  return (
    <>
      {/* 1. Cinematic Intro Loading Screen */}
      {isLoading && <IntroLoader onComplete={() => setIsLoading(false)} />}

      {/* 2. Custom Magnetic Cursor */}
      <CustomCursor />

      {/* 3. Global Noise Grain overlay */}
      <div className="noise-overlay" />

      {/* 4. Background Loop Videos */}
      <BackgroundVideo activePage={activePage} />

      {/* 5. R3F Spatial 3D Canvas Background */}
      <SceneContainer activePage={activePage} />

      {/* 5. Global Page Transition Overlay */}
      <div
        className="page-transition-overlay fixed inset-0 bg-[#0d0d0d] z-[9999] pointer-events-none"
        style={{ clipPath: "polygon(0 100%, 100% 100%, 100% 100%, 0 100%)" }}
      />

      {/* 6. Smooth Scroll Chassis & Content Layout */}
      {!isLoading && (
        <SmoothScroll>
          <div 
            className="relative min-h-screen flex flex-col justify-between overflow-x-clip selection:bg-gold selection:text-black"
            style={{ zIndex: 10 }}
          >
            
            {/* Header Sticky Navigation */}
            <Header activePage={activePage} onChangePage={navigatePage} />

            {/* Dynamic Page Views */}
            <main className="flex-grow z-10">
              {renderActivePage()}
            </main>

            {/* Premium Multi-column Footer */}
            {activePage !== "contact" && (
              <Footer onChangePage={navigatePage} />
            )}
          </div>
        </SmoothScroll>
      )}
    </>
  );
}

export default App;
