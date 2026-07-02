import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";

export const CustomCursor: React.FC = () => {
  const cursorRef = useRef<HTMLDivElement>(null);
  const [hoverText, setHoverText] = useState("");
  const [isHovered, setIsHovered] = useState(false);

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
      if (cursorAttrTarget) {
        const text = cursorAttrTarget.getAttribute("data-cursor") || "";
        setHoverText(text);
        setIsHovered(true);
        return;
      }

      // Default hover on interactive elements
      const isInteractive = target.closest("a, button, input, select, textarea, [role='button']");
      if (isInteractive) {
        setHoverText("");
        setIsHovered(true);
      } else {
        setIsHovered(false);
      }
    };

    const onMouseOut = () => {
      setIsHovered(false);
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
      className={`custom-cursor ${isHovered ? "hovered" : ""}`}
      data-text={hoverText}
      style={{
        zIndex: 9999,
        background: isHovered && hoverText ? "#00ffd1" : isHovered ? "#00E5FF" : "white"
      }}
    />
  );
};
