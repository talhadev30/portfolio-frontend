import React, { useRef } from "react";
import InfoText from "./InfoText";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

const Firstinfo = () => {
  const containerRef = useRef(null);
  const pra1 = useRef(null);
  const pra2 = useRef(null);
  const imgref = useRef(null);
  const wrapperRef = useRef(null);

  // Text and image entrance animations
  useGSAP(
    () => {
      gsap.from([pra1.current, pra2.current], {
        opacity: 0,
        y: 40,
        duration: 0.8,
        stagger: 0.15,
        ease: "power3.out",
      });

      gsap.fromTo(
        imgref.current,
        {
          scaleY: 0,
          filter: "grayscale(100%) brightness(80%)",
        },
        {
          scaleY: 1,
          filter: "grayscale(0%) brightness(80%)",
          duration: 1.5,
          ease: "expo.out",
          transformOrigin: "bottom",
        },
      );
    },
    { scope: containerRef, dependencies: [] },
  );

  // Smooth mouse movement

// Smooth mouse movement
const ImgPositionHandlear = (e) => {
  if (!wrapperRef.current || !containerRef.current) return;

  const rect = containerRef.current.getBoundingClientRect();

  const mouseX = (e.clientX - rect.left) / rect.width;
  const mouseY = (e.clientY - rect.top) / rect.height;

  const deltaX = (mouseX - 0.5) * 2;
  const deltaY = (mouseY - 0.5) * 2;

  gsap.to(wrapperRef.current, {
    x: deltaX * 100,
    y: deltaY * 80,
    rotationX: -deltaY * 8,
    rotationY: deltaX * 8,
    rotationZ: deltaX * 2,
    duration: 0.8,
    ease: "power3.out",
    overwrite: "auto",
  });
};

// Smooth reset
const ImgResetHandlear = () => {
  if (!wrapperRef.current) return;

  gsap.to(wrapperRef.current, {
    x: 0,
    y: 0,
    rotationX: 0,
    rotationY: 0,
    rotationZ: 0,
    duration: 1.2,
    ease: "elastic.out(1, 0.6)",
    overwrite: "auto",
  });
};

  return (
    <section
      ref={containerRef}
      onMouseMove={ImgPositionHandlear}
      onMouseLeave={ImgResetHandlear}
      className="relative isolate w-full min-h-screen flex items-center justify-center overflow-hidden"
      style={{ perspective: "1000px" }}
    >
      {/* Image positioning wrapper */}
      <div
        className="absolute left-1/2 top-1/2
  -translate-x-1/2 -translate-y-1/2
  w-[280px] h-[380px]
  sm:w-[340px] sm:h-[460px]
  md:w-[400px] md:h-[540px]
  lg:w-[420px] lg:h-[560px]
  xl:w-[480px] xl:h-[640px]
  pointer-events-none z-0"
      >
        {/* GSAP animation wrapper */}
        <div
          ref={wrapperRef}
          className="w-full h-full"
          style={{ transformStyle: "preserve-3d" }}
        >
          <div className="w-full h-full overflow-hidden rounded-3xl">
            <picture>
              <source srcSet="/my.webp" type="image/webp" />
              <img
                ref={imgref}
                src="/my.webp"
                alt="Talha Salman, web developer"
                width={684}
                height={918}
                loading="eager"
                decoding="async"
                className="block w-full h-full opacity-90 object-cover rounded-3xl"
              />
            </picture>
          </div>
        </div>
      </div>

      {/* Text stays above the image */}
      <div className="relative z-10 w-full lg:w-2/3 px-2">
        <div className="flex flex-col items-center justify-center mb-20 pt-20">
          <InfoText as="h1" text="i'm talha" />
          <InfoText as="h2" text="web developer" />
        </div>

        <div className="flex flex-col gap-10 items-center justify-between lg:flex-row px-2">
          <p
            ref={pra1}
            className="w-full lg:w-1/3 lg:text-xs md:text-2xl text-xl"
          >
            Pakistan-raised, first-year student exploring frontend development,
            UI/UX, and creative web technologies.
          </p>

          <p
            ref={pra2}
            className="w-full lg:w-1/3 lg:text-xs md:text-2xl text-xl text-end"
          >
            Pakistan-raised, future-focused. Building and exploring modern web
            experiences.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Firstinfo;
