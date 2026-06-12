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
      <StickyCard img={"/product1.png"} ProductName={"headphone"} />
      <StickyCard img={"/product2.png"} ProductName={"hand cream"} />
      <StickyCard img={"/product3.png"} ProductName={"Mobile phone"} />
    </div>

    <div className="flex items-center justify-center font-[League] ">
      <button className="btns relative text-center my-15 py-1 px-3 border text-[18px] rounded-3xl overflow-hidden">
        <Link
          to="./work"
          className="z-20 relative uppercase"
          onClick={() => {
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
        >
          see all work
        </Link>
      </button>
    </div>

  </div>
);
};

export default Project;
