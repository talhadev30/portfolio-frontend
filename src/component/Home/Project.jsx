import React, { useRef } from "react";
import Projecttext from "./Projecttext";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import StickyCard from "./StickyCard";
import { Link } from "react-router-dom";

const Project = () => {
  const containerRef = useRef(null);
  // Card Animation
  useGSAP(
    () => {
      const Card = gsap.utils.toArray(".sticky");

      Card.forEach((Card) => {
        const img = Card.querySelector("img");

        gsap.fromTo(
          img,
          {
            scale: 1.3,
          },
          {
            scale: 1,
            scrollTrigger: {
              trigger: Card,
              scrub: true,
              scrollTrigger: {
                start: "top bottom",
                end: "bottom bottom",
              },
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
      <StickyCard img={"/product2.webp"} alt={"E-Commerce Website"} ProductName={"Restaurant Website"} />
      <StickyCard img={"/product3.webp"} alt={"School Management System"} ProductName={"School Management System"} />
    </div>

    <div className="flex items-center justify-center font-[League] ">
      <Link
        to="/work"
        role="button"
        className="btns inline-block z-20 relative uppercase text-center my-15 py-1 px-4 border text-[18px] rounded-3xl overflow-hidden hover:text-black hover:bg-white transition-colors"
        onClick={() => {
          window.scrollTo({ top: 0, behavior: "smooth" });
        }}
      >
        see all work
      </Link>
    </div>

  </div>
);
};

export default Project;
