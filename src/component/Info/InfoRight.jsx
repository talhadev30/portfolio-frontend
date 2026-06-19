import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import React, { useRef } from "react";

const ImagsEffect = () => {
  const container1Ref = useRef();
  const container2Ref = useRef();

  //   animation
  useGSAP(() => {
    gsap.to(container1Ref.current, {
      yPercent: -50,
      ease: "none",
      duration: 10,
      repeat: -1,
    });
    gsap.to(container2Ref.current, {
      yPercent: 50,
      ease: "none",
      duration: 10,
      repeat: -1,
    });
  }, []);
 // Left images
const images1 = [
  {
    src: "./about1.jfif",
    alt: "Team member working on a project",
  },
  {
    src: "./about2.jfif",
    alt: "Creative workspace and design process",
  },
  {
    src: "./about3.jfif",
    alt: "Collaboration meeting with team members",
  },
  {
    src: "./about4.jfif",
    alt: "Professional development and learning",
  },
];

// Right images
const images2 = [
  {
    src: "./about5.jfif",
    alt: "Modern office environment",
  },
  {
    src: "./about6.jfif",
    alt: "Team brainstorming session",
  },
  {
    src: "./about7.webp",
    alt: "Digital innovation and technology",
  },
  {
    src: "./about8.jfif",
    alt: "Successful project completion",
  },
];

  return (
    <div className="relative lg:w-1/2 flex items-center justify-center gap-4">
      <div className="lg:h-120 2xl:h-150 h-80 md:h-140 overflow-hidden flex items-center justify-center gap-4">
        <div ref={container1Ref} className="flex flex-col">
          {[...images1, ...images1, ...images1].map((img, i) => (
            <img key={i} src={img.src} alt={img.alt} className="h-80 w-70 md:h-full md:w-96 2xl:h-2/2 object-cover mb-4" />
          ))}
        </div>
        <div ref={container2Ref} className="flex flex-col">
          {[...images2, ...images2, ...images2].map((img, i) => (
            <img key={i} src={img.src} alt={img.alt} className="h-80 w-70 md:w-96 2xl:h-2/2 object-cover mb-4" />
          ))}
        </div>
      </div>
      <div className="h-10 w-full bg-linear-to-b from-black to-transparent absolute top-0"></div>
      <div className="h-10 w-full bg-linear-to-b from-transparent to-black absolute bottom-0"></div>
    </div>
  );
};

export default ImagsEffect;
