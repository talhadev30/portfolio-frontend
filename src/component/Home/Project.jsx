import React, { useRef } from "react";
import Projecttext from "./Projecttext";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import StickyCard from "./StickyCard";
import { Link } from "react-router-dom";
import { prefersReducedMotion, scrollToTop } from "../../utils/motion";

const Project = () => {
  const containerRef = useRef(null);
  // Card Animation
  useGSAP(
    () => {
      if (prefersReducedMotion()) return;

      const cards = gsap.utils.toArray(".sticky");

      cards.forEach((card) => {
        const img = card.querySelector("img");
        gsap.fromTo(
          img,
          {
            scale: 1.3,
          },
          {
            scale: 1,
            scrollTrigger: {
              trigger: card,
              scrub: true,
              start: "top bottom",
              end: "bottom bottom",
            },
          },
        );
      });
    },
    { scope: containerRef },
  );

 return (
  <div ref={containerRef} className="bg-black min-h-screen relative">
    
    <Projecttext text1={"Latest"} text2={"project"} />

    <div className='relative'>
      <StickyCard img={"/project1.webp"} link="https://talha-banking-system.vercel.app/" alt={"Banking System"} ProductName={"Banking System"} />
      <StickyCard img={"/product2.webp"} link="https://zoravelle.dpdns.org" alt={"E-commerce Glasses Store"} ProductName={"E-commerce Website"} />
      <StickyCard img={"/product3.webp"} alt={"School Management System"} ProductName={"School Management System"} />
    </div>

    <div className="flex items-center justify-center font-[League] ">
      <Link
        to="/work"
        role="button"
        className="btns inline-block z-20 relative uppercase text-center my-15 py-1 px-4 border text-[18px] rounded-3xl overflow-hidden hover:text-black hover:bg-white transition-colors"
        onClick={scrollToTop}
      >
        see all work
      </Link>
    </div>

  </div>
);
};

export default Project;
