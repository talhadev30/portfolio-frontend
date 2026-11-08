import React from "react";
import { Link } from "react-router-dom";
import { scrollToTop } from "../../utils/motion";

const InfoLeft = () => {
  return (
    <div className="lg:w-1/3">
      <h2 className="uppercase font-[League] text-6xl md:text-8xl lg:text-7xl tracking-tighter 2xl:text-8xl">
        A Little Bit About Me
      </h2>
      <h3 className="text-sm font-semibold uppercase tracking-wider text-emerald-400 mt-2 mb-4">
        My Skills and Approach
      </h3>

      <p className="text-sm leading-relaxed text-zinc-300 py-2 md:text-xl lg:text-sm 2xl:text-base">
        I am a web developer in Karachi, Pakistan. I build sites and apps with React, JavaScript, and Tailwind CSS. I also use Node.js, Express, PHP, MongoDB, and MySQL.
      </p>

      <p className="text-sm leading-relaxed text-zinc-300 py-2 md:text-xl lg:text-sm 2xl:text-base">
        I write code that is easy to change and work to make each page fast and clear. My goal is to turn ideas into useful web tools that work on different devices.
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
