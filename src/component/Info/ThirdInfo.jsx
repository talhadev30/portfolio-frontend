import React, { useEffect, useRef } from "react";
import Button from "./Button";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Projecttext from "../Home/Projecttext";

gsap.registerPlugin(ScrollTrigger);

const ThirdInfo = () => {

  const containerRef = useRef(null);

  const skills = [
    { name: "React", img: "./react.svg" },
    { name: "JavaScript", img: "./js.svg" },
    { name: "Tailwind", img: "./tailwind.svg" },
    { name: "Node", img: "./Node.js.svg" },
    { name: "MongoDB", img: "./MongoDB.svg" },
    { name: "CSS", img: "./css.svg" },
    { name: "Git", img: "./git.svg" },
    { name: "GitHub", img: "./github.svg" },
    { name: "Vite", img: "./vite.svg" },
    { name: "Express", img: "./Express.svg" },
    { name: "HTML", img: "./html.svg" },
    { name: "Bootstrap", img: "./bootstrap.svg" },
    { name: "GSAP", img: "./gsap.svg" },
    { name: "PHP", img: "./php.svg" },
    { name: "MySQL", img: "./mysql.svg" },
    { name: "Lenis", img: "./lenis.png" },
    { name: "Framer Motion", img: "./motion.svg" },
    { name: "Office", img: "./office.svg" },
  ];

  useEffect(() => {

    const ctx = gsap.context(() => {

      gsap.from(".skill-item", {
        y: 80,
        opacity: 0,
        duration: 1,
        stagger: {
          each: 0.05,
          from: "random",
        },
        ease: "power4.out",

        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 80%",
        },
      });

    }, containerRef);

    return () => ctx.revert();

  }, []);

  return (
    <section className="relative overflow-hidden py-24">

      {/* blur glow */}

      <div className="relative z-10">
        {/* marquee */}
        <div className="space-y-8 overflow-hidden">

          {/* row 1 */}
          <div className="marquee-wrapper">
            <div
              ref={containerRef}
              className="marquee flex items-center gap-6"
            >
              {[...skills, ...skills].map((skill, index) => (
                <div
                  className="skill-item shrink-0"
                  key={index}
                >
                  <Button
                    img={skill.img}
                    name={skill.name}
                  />
                </div>
              ))}
            </div>
          </div>

          {/* row 2 */}
          <div className="marquee-wrapper">
            <div className="marquee-reverse flex items-center gap-6">
              {[...skills, ...skills].map((skill, index) => (
                <div
                  className="skill-item shrink-0"
                  key={index}
                >
                  <Button
                    img={skill.img}
                    name={skill.name}
                  />
                </div>
              ))}
            </div>
          </div>
          <div className="marquee-wrapper">
            <div
              ref={containerRef}
              className="marquee flex items-center gap-6"
            >
              {[...skills, ...skills].map((skill, index) => (
                <div
                  className="skill-item shrink-0"
                  key={index}
                >
                  <Button
                    img={skill.img}
                    name={skill.name}
                  />
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};

export default ThirdInfo;