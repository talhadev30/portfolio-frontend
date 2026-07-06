import React, { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { SplitText } from "gsap/SplitText";

gsap.registerPlugin(SplitText);

const Sociallink = ({ name, Link, label }) => {
  const wrapper = useRef(null);

  useGSAP(
    () => {
      const splits = [];

      wrapper.current.querySelectorAll(".split").forEach((el) => {
        splits.push(
          new SplitText(el, {
            type: "chars",
            charsClass: "chars",
          })
        );
      });

      return () => {
        splits.forEach((split) => split.revert());
      };
    },
    { scope: wrapper }
  );

  // Hover In
  const handleHoverIn = (e) => {
    const el = e.currentTarget;
    const chars = el.querySelectorAll(".chars");

    if (!el.timeline) {
      el.timeline = gsap.timeline({ paused: true });

      el.timeline.to(chars, {
        yPercent: -100,
        stagger: 0.025,
        duration: 0.45,
        ease: "power4.inOut",
      });
    }

    el.timeline.play();
  };

  // Hover Out
  const handleHoverOut = (e) => {
    const el = e.currentTarget;

    if (el.timeline) {
      el.timeline.reverse();
    }
  };

  return (
    <div
      ref={wrapper}
      className="overflow-hidden select-none"
      onMouseEnter={handleHoverIn}
      onMouseLeave={handleHoverOut}
    >
      <ul className="relative leading-none">
        {/* First Text */}
        <li className="text-3xl md:text-5xl lg:text-[3vw] uppercase tracking-tight">
          <a
            href={Link}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={label}
          >
            <span className="split inline-block">{name}</span>
          </a>
        </li>

        {/* Second Text */}
        <li
          aria-hidden="true"
          className="absolute left-0 top-full text-3xl md:text-5xl lg:text-[3vw] uppercase tracking-tight"
        >
          <a
            href={Link}
            target="_blank"
            rel="noopener noreferrer"
            tabIndex={-1}
          >
            <span className="split inline-block">{name}</span>
          </a>
        </li>
      </ul>
    </div>
  );
};

export default Sociallink;