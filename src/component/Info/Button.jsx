import React from "react";

const Button = ({ img, name }) => {
  return (
    <div className="group relative shrink-0">

      {/* glow */}
      <div className="absolute inset-0 rounded-2xl bg-white/10 blur-xl opacity-0 transition-all duration-500 group-hover:opacity-100" />

      <button
        className=" relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl px-8 py-5 transition-all duration-500 hover:border-white/30 hover:bg-white/10 hover:scale-105 active:scale-95
        "
      >

        {/* shine effect */}
        <span
          className=" absolute -left-full top-0 h-full w-[60%] rotate-12 bg-linear-to-r from-transparent via-white/20 to-transparent transition-all duration-1000 group-hover:left-[140%]
          "
        />

        {/* content */}
        <div className="relative z-10 flex items-center gap-4">

          <div
            className=" flex items-center justify-center rounded-xl bg-black/40 p-3 border border-white/10
            "
          >
            <img
              src={img}
              alt={name}
              className=" h-10 w-10 2xl:h-14 2xl:w-14 object-contain grayscale transition-all duration-500 group-hover:grayscale-0 group-hover:rotate-6 group-hover:scale-110"
            />
          </div>

          <h3
            className=" text-sm md:text-base font-semibold uppercase tracking-wider text-white/80 transition-all duration-300 group-hover:text-white
            "
          >
            {name}
          </h3>

        </div>

      </button>
    </div>
  );
};

export default Button;