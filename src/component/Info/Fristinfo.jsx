import React, { useRef } from "react";
import InfoText from "./InfoText";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

const Firsetinfo = () => {
  const pra2 = useRef(null);
  const pra1 = useRef(null);
  const imgref = useRef(null);

  // text and img animation
  useGSAP(() => {
    gsap.from([pra1.current, pra2.current], {
      opacity: 0,
      yPercent: 150,
      duration: 0.5,
      ease: "sine.inOut",
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
        duration: 2,
        ease: "expo.inOut",
        transformOrigin: "bottom",
      },
    );
  });
// mouse move animation
 const ImgPositionHandlear = (e) => {
  const { clientX, clientY } = e;

  const centerX = window.innerWidth / 2;
  const centerY = window.innerHeight / 2;

  const deltaX = (clientX - centerX) / centerX;
  const deltaY = (clientY - centerY) / centerY;

  const moveX = deltaX * 180;
  const moveY = deltaY * 180;

  const rotateX = deltaY * 8;
  const rotateY = deltaX * 8;
  const rotateZ = deltaX * 3;

  gsap.to(imgref.current.parentElement, {
    x: moveX,
    y: moveY,
    rotationX: -rotateX,
    rotationY: rotateY,
    rotationZ: rotateZ,
    duration: 3, // smooth lag effect
    ease: "power3.out",
  });
};
// mouse move animation reset
const ImgResetHandlear = () => {
  gsap.to(imgref.current.parentElement, {
    x: 0,
    y: 0,
    rotationX: 0,
    rotationY: 0,
    rotationZ: 0,
    duration: 0.6,
    ease: "power4.in",
  });
};

  return (
    <div
      onMouseMove={ImgPositionHandlear}
      onMouseLeave={ImgResetHandlear}
      className="w-full flex items-center 2xl:pt-32 justify-center h-screen lg:h-screen md:h-auto lg:py-0 md:py-70"
      style={{ perspective: "1000px" }}
    >
      <div className="h-full opacity-80 lg:w-2/3 w-full gap-6 px-2">
        <div className="flex flex-col  items-center justify-center mb-20 lg:pt-22 pt-50">
          <InfoText text="i'm talha" />
          <InfoText text="web developer" />
        </div>
        <div className="flex flex-col gap-10 items-center justify-between lg:flex-row px-2">
          <p ref={pra1} className="w-full lg:w-50 lg:text-xs md:text-2xl text-xl">
            Pakistan raised, web curious. First-year student building in
            frontend, UI and creative coding.
          </p>
          <p ref={pra2} className="w-full lg:w-50 lg:text-xs md:text-2xl text-xl text-end">
            Pakistan raised, future-focused. Building and exploring modern web
            experiences
          </p>
        </div>
        <div className="lg:h-1/4 lg:w-1/4 h-66 w-66 absolute top-2/7 lg:top-2/8 md:top-2/6 -z-50 left-2/4 -translate-y-2/4 -translate-x-2/4">
          <img
            ref={imgref}
            src="./my.png"
            className="h-max w-full grayscale rounded-3xl transition-transform duration-200"
          />
        </div>
      </div>
    </div>
  );
};

export default Firsetinfo;
