import React from "react";
import { Link } from "react-router-dom";

const InfoLeft = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="lg:w-1/3">
      <h2 className="uppercase font-[League] text-6xl md:text-8xl lg:text-7xl tracking-tighter 2xl:text-8xl">
        A Little Bit About Me
      </h2>
      <h3 className="text-sm font-semibold uppercase tracking-wider text-emerald-400 mt-2 mb-4">
        Full Stack Developer Journey & Philosophy
      </h3>

      <p className="text-sm leading-relaxed text-zinc-300 py-2 md:text-xl lg:text-sm 2xl:text-base">
        I am a passionate Full Stack Web Developer based in Karachi, Pakistan, specializing in building responsive, scalable, and user-centered web applications. My development stack spans modern frontend tools like React.js, Tailwind CSS, and JavaScript (ES6+), along with backend architectures utilizing Node.js, Express.js, PHP, and databases such as MySQL and MongoDB.
      </p>

      <p className="text-sm leading-relaxed text-zinc-300 py-2 md:text-xl lg:text-sm 2xl:text-base">
        I prioritize writing maintainable code, adhering to clean architecture, optimizing web performance for search engine rankings, and ensuring seamless cross-device compatibility. My aim is to transform business ideas into impactful, accessible web solutions.
      </p>

      <div className="pt-4 flex flex-wrap gap-4 text-xs uppercase tracking-wider text-zinc-400">
        <Link to="/work" onClick={scrollToTop} className="hover:text-white underline underline-offset-4">
          View Projects
        </Link>
        <Link to="/contact" onClick={scrollToTop} className="hover:text-white underline underline-offset-4">
          Get in Touch
        </Link>
      </div>
    </div>
  );
};

export default InfoLeft;
