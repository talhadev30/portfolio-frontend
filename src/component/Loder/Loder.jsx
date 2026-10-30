import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import React, { useRef } from "react";
import { prefersReducedMotion } from "../../utils/motion";

const Loder = () => {
  const container = useRef(null);
  const metaRef = useRef(null);
  const svgRef = useRef(null);
  const wordmarkRef = useRef(null);
  const revealRef = useRef(null);
  const counterContainer = useRef(null);
  const countRef = useRef(null);
  const barRef = useRef(null);

  useGSAP(
    () => {
      const loaderEl = container.current;
      if (!loaderEl) return;

      const body = document.body;

      if (prefersReducedMotion()) {
        gsap.set(loaderEl, { display: "none" });
        gsap.set(body, { overflow: "auto" });
        return;
      }

      const tl = gsap.timeline();
      const counterObj = { value: 0 };

      tl.set(body, { overflow: "hidden" });
      gsap.set([metaRef.current, svgRef.current, counterContainer.current], {
        autoAlpha: 0,
        y: 16,
      });

      tl.to(
        [metaRef.current, svgRef.current, counterContainer.current],
        {
          autoAlpha: 1,
          y: 0,
          duration: 0.55,
          stagger: 0.1,
          ease: "power3.out",
        },
        0
      );

      // 1. Reveal the wordmark from left to right
      tl.to(
        revealRef.current,
        {
          attr: { width: 480 },
          duration: 3.2,
          ease: "power2.inOut",
        },
        0
      );

      // 2. Animate counter percentage and progress bar in perfect lockstep
      tl.to(
        counterObj,
        {
          value: 100,
          duration: 3.2,
          ease: "power2.inOut",
          onUpdate: () => {
            const current = Math.round(counterObj.value);
            if (countRef.current) countRef.current.textContent = `${current}%`;
            if (barRef.current) barRef.current.style.width = `${current}%`;
          },
        },
        0
      );

      // 3. Fill the lettering as the reveal finishes
      tl.to(
        wordmarkRef.current,
        {
          fill: "#ffffff",
          duration: 0.35,
          ease: "power2.out",
        },
        "-=0.3"
      );

      // 4. Slide the loader details up together
      tl.to(
        [metaRef.current, svgRef.current, counterContainer.current],
        {
          y: -40,
          opacity: 0,
          duration: 0.35,
          ease: "power2.in",
        },
        "+=0.08"
      );

      // 5. Slide curtain up smoothly
      tl.to(loaderEl, {
        yPercent: -100,
        duration: 0.65,
        ease: "power4.inOut",
        onComplete: () => {
          gsap.set(loaderEl, { display: "none" });
          gsap.set(body, { overflow: "auto" });
        },
      });
    },
    { scope: container }
  );

  return (
    <div
      ref={container}
      role="status"
      aria-label="Loading portfolio"
      className="pointer-events-auto fixed inset-0 z-50 flex h-full w-full items-center justify-center overflow-hidden bg-black text-white"
      style={{ willChange: "transform" }}
    >
      <div className="w-[min(82vw,36rem)]">
        <div
          ref={metaRef}
          className="mb-4 flex items-center justify-between font-[League] text-xs uppercase tracking-[0.24em] text-white/55"
        >
          <span className="flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-white/80" aria-hidden="true" />
            Talha Salman
          </span>
          <span>Portfolio / 01</span>
        </div>

        <div ref={svgRef} className="w-full overflow-hidden">
          <svg
            className="block h-auto w-full"
            viewBox="0 0 480 100"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
          >
            <defs>
              <clipPath id="loader-wordmark-reveal">
                <rect ref={revealRef} x="0" y="0" width="0" height="100" />
              </clipPath>
            </defs>
            <text
              ref={wordmarkRef}
              x="240"
              y="68"
              textAnchor="middle"
              fontFamily="League, Arial Narrow, sans-serif"
              fontSize="62"
              letterSpacing="1.5"
              stroke="white"
              strokeWidth="1.2"
              strokeLinejoin="round"
              fill="none"
              clipPath="url(#loader-wordmark-reveal)"
            >
              HELLO, I'M TALHA
            </text>
          </svg>
        </div>

        <div ref={counterContainer} className="mt-7" aria-hidden="true">
          <div className="mb-2 flex items-center justify-between font-[League] text-xs uppercase tracking-[0.2em]">
            <span className="text-white/55">Preparing experience</span>
            <span ref={countRef} className="text-sm text-white">0%</span>
          </div>
          <div className="h-px w-full bg-white/20">
            <div ref={barRef} className="h-full bg-white" style={{ width: "0%" }} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Loder;
