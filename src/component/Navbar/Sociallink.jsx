import { useRef } from "react";
import useRollingLink from "../../hooks/useRollingLink";

const Sociallink = ({ name, Link, label }) => {
  const wrapperRef = useRef(null);
  const { handleHoverIn, handleHoverOut } = useRollingLink(wrapperRef);

  return (
    <div
      ref={wrapperRef}
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
          <span className="split inline-block">{name}</span>
        </li>
      </ul>
    </div>
  );
};

export default Sociallink;
