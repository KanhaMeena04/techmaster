import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";

export const CustomCursor: React.FC = () => {
  const cursorRef = useRef<HTMLDivElement>(null);
  const [hoverText, setHoverText] = useState("");
  const [isHovered, setIsHovered] = useState(false);
  const [isNavbarHover, setIsNavbarHover] = useState(false);

  useEffect(() => {
    const cursor = cursorRef.current;
    if (!cursor) return;

    // Center the cursor initially
    gsap.set(cursor, { xPercent: -50, yPercent: -50, x: window.innerWidth / 2, y: window.innerHeight / 2 });

    const xTo = gsap.quickTo(cursor, "x", { duration: 0.2, ease: "power3" });
    const yTo = gsap.quickTo(cursor, "y", { duration: 0.2, ease: "power3" });

    const onMouseMove = (e: MouseEvent) => {
      xTo(e.clientX);
      yTo(e.clientY);
    };

    const onMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      
      // Check if target or any parent has data-cursor attribute
      const cursorAttrTarget = target.closest("[data-cursor]");
      const interactiveEl = target.closest("a, button, [role='button']");

      if (cursorAttrTarget) {
        const text = cursorAttrTarget.getAttribute("data-cursor") || "";
        setHoverText(text);
        setIsHovered(true);
        setIsNavbarHover(true);
        return;
      }

      if (interactiveEl) {
        const text = interactiveEl.textContent || "";
        const cleanText = text.trim().replace(/\s+/g, ' ');
        // Limit text length to prevent overflow in circle
        const displayWord = cleanText.length > 20 ? cleanText.substring(0, 17) + "..." : cleanText;
        
        setHoverText(displayWord);
        setIsHovered(true);
        setIsNavbarHover(true);
        return;
      }

      // Default hover on other interactive form elements
      const otherInteractive = target.closest("input, select, textarea");
      if (otherInteractive) {
        setHoverText("");
        setIsHovered(true);
        setIsNavbarHover(false);
      } else {
        setIsHovered(false);
        setIsNavbarHover(false);
      }
    };

    const onMouseOut = () => {
      setIsHovered(false);
      setIsNavbarHover(false);
    };

    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseover", onMouseOver);
    window.addEventListener("mouseout", onMouseOut);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseover", onMouseOver);
      window.removeEventListener("mouseout", onMouseOut);
    };
  }, []);

  // Don't render cursor on mobile/touch screens
  const [isTouchDevice, setIsTouchDevice] = useState(false);
  useEffect(() => {
    setIsTouchDevice(
      "ontouchstart" in window || navigator.maxTouchPoints > 0
    );
  }, []);

  if (isTouchDevice) return null;

  return (
    <div
      ref={cursorRef}
      className={`custom-cursor ${isHovered ? "hovered" : ""} ${isNavbarHover ? "navbar-hover" : ""}`}
      data-text={hoverText}
      style={{
        zIndex: 9999,
        background: isNavbarHover 
          ? undefined 
          : (isHovered && hoverText ? "#00ffd1" : isHovered ? "#00E5FF" : "white")
      }}
    />
  );
};
