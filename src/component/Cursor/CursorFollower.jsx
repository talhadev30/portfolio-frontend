import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { useLocation } from "react-router-dom";
import { prefersReducedMotion } from "../../utils/motion";

const CursorFollower = () => {
  const dotRef = useRef(null);
  const ringRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const location = useLocation();

  useEffect(() => {
    // Disable on touch devices or if user prefers reduced motion
    if (
      typeof window === "undefined" ||
      window.matchMedia("(pointer: coarse)").matches ||
      prefersReducedMotion()
    ) {
      return;
    }

    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    // Use gsap.quickTo for high-performance 60-120fps tracking
    const xDot = gsap.quickTo(dot, "x", { duration: 0.08, ease: "power3" });
    const yDot = gsap.quickTo(dot, "y", { duration: 0.08, ease: "power3" });
    const xRing = gsap.quickTo(ring, "x", { duration: 0.3, ease: "power3.out" });
    const yRing = gsap.quickTo(ring, "y", { duration: 0.3, ease: "power3.out" });

    let hasMoved = false;

    const handleMouseMove = (e) => {
      const { clientX, clientY } = e;

      if (!hasMoved) {
        gsap.set([dot, ring], { x: clientX, y: clientY });
        hasMoved = true;
        setIsVisible(true);
      } else {
        xDot(clientX);
        yDot(clientY);
        xRing(clientX);
        yRing(clientY);
      }

      // Check if hovering over clickable elements
      const target = e.target;
      const isInteractive = Boolean(
        target?.closest(
          'a, button, input, textarea, select, [role="button"], label, .cursor-pointer, [data-cursor="hover"]'
        )
      );
      setIsHovered(isInteractive);
    };

    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);

    const handleMouseLeave = () => {
      setIsVisible(false);
      setIsHovered(false);
    };

    const handleMouseEnter = () => {
      setIsVisible(true);
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);
    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("mouseenter", handleMouseEnter);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mouseenter", handleMouseEnter);
    };
  }, []);

  // Reset hover state on route change
  useEffect(() => {
    setIsHovered(false);
  }, [location.pathname]);

  // Animate hover and clicking states on the ring and dot
  useEffect(() => {
    if (!ringRef.current || !dotRef.current) return;

    let targetScale = 1;
    let ringBg = "transparent";
    let ringBorderColor = "rgba(255, 255, 255, 0.4)";
    let dotScale = 1;

    if (isClicking) {
      targetScale = isHovered ? 1.4 : 0.8;
      dotScale = 0.6;
    } else if (isHovered) {
      targetScale = 1.9;
      ringBg = "rgba(255, 255, 255, 0.12)";
      ringBorderColor = "rgba(255, 255, 255, 0.8)";
      dotScale = 0;
    }

    gsap.to(ringRef.current, {
      scale: targetScale,
      backgroundColor: ringBg,
      borderColor: ringBorderColor,
      duration: 0.25,
      ease: "power2.out",
    });

    gsap.to(dotRef.current, {
      scale: dotScale,
      opacity: isHovered ? 0 : 1,
      duration: 0.2,
      ease: "power2.out",
    });
  }, [isHovered, isClicking]);

  return (
    <div
      className={`pointer-events-none fixed inset-0 z-[9999] overflow-hidden transition-opacity duration-300 ${
        isVisible ? "opacity-100" : "opacity-0"
      }`}
      aria-hidden="true"
    >
      {/* Outer Follower Ring */}
      <div
        ref={ringRef}
        className="fixed top-0 left-0 -translate-x-1/2 -translate-y-1/2 w-9 h-9 rounded-full border border-white/40 pointer-events-none will-change-transform backdrop-blur-[1px]"
      />

      {/* Inner Precision Dot */}
      <div
        ref={dotRef}
        className="fixed top-0 left-0 -translate-x-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-white pointer-events-none will-change-transform"
      />
    </div>
  );
};

export default CursorFollower;
