import React from "react";
import { OWNER } from "../../data/portfolioData";
import useSplitReveal from "../../hooks/useSplitReveal";

const LeftContect = () => {
  const headingRef = useSplitReveal();

  return (
    <div className="w-full">
      {/* Eyebrow */}
      <div className="flex items-center gap-3 mb-8">
        <span className="h-1.5 w-1.5 rounded-full bg-white/60" aria-hidden="true" />
        <span className="font-[League] text-xs uppercase tracking-[0.25em] text-white/50">
          Get in touch
        </span>
      </div>

      {/* Giant heading */}
      <h1
        ref={headingRef}
        className="font-[League] uppercase leading-[0.88] tracking-tighter text-[clamp(3.5rem,8vw,8rem)]"
      >
        Let's work
        <br />
        together
      </h1>

      <p className="mt-6 max-w-md text-sm leading-relaxed text-white/60 md:text-base">
        Have a project in mind? Share a few details and I’ll get back to you within 24 hours.
      </p>

      {/* Minimal info row */}
      <div className="mt-10 flex flex-wrap gap-x-10 gap-y-6 border-t border-white/10 pt-7">
        <div>
          <span className="mb-1 block font-[League] text-xs uppercase tracking-[0.2em] text-white/55">
            Location
          </span>
          <span className="text-sm text-white/80">{OWNER.location}</span>
        </div>
        <div>
          <span className="mb-1 block font-[League] text-xs uppercase tracking-[0.2em] text-white/55">
            Availability
          </span>
          <span className="text-sm text-white/80">Open for projects</span>
        </div>
        <div>
          <span className="mb-1 block font-[League] text-xs uppercase tracking-[0.2em] text-white/55">
            Response
          </span>
          <span className="text-sm text-white/80">Within 24 hours</span>
        </div>
      </div>

      {/* Socials */}
      <div className="mt-8 flex flex-wrap gap-5">
        {OWNER.socials.filter(({ name }) => name === "GitHub" || name === "LinkedIn").map((social) => (
          <a
            key={social.name}
            href={social.url}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={social.label}
            className="pb-0.5 font-[League] text-xs uppercase tracking-[0.2em] text-white/55 transition-colors duration-300 hover:border-white/30 hover:text-white"
          >
            {social.name}
          </a>
        ))}
      </div>
    </div>
  );
};

export default LeftContect;
