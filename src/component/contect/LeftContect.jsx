import React from "react";
import { Link } from "react-router-dom";
import { CheckCircle2, Clock, Globe, ArrowRight } from "lucide-react";

const leftContect = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="flex flex-col justify-between h-full">
      <div>
        <h1 className="uppercase font-[League] text-[5rem] sm:text-[7rem] md:text-[8rem] xl:text-[9rem] leading-[0.9] tracking-tight">
          Let's Create
          <br />
          Something Great
        </h1>

        {/* Semantic Subheadings */}
        <h2 className="font-[League] text-3xl sm:text-4xl uppercase tracking-tight text-zinc-200 mt-8 mb-2">
          Hire a Full Stack Web Developer & Software Engineer
        </h2>
        <h3 className="text-sm font-semibold uppercase tracking-wider text-emerald-400 mb-6">
          Available for Freelance Contracts, Remote Roles & Technical Consultations
        </h3>

        {/* Detailed SEO Content (Over 120 words) */}
        <div className="space-y-4 text-zinc-300 text-sm md:text-base leading-relaxed max-w-xl">
          <p>
            Whether you need to engineer a custom web application from scratch, rebuild a responsive frontend with React and Tailwind CSS, or develop secure RESTful APIs using Node.js and MongoDB, I am ready to collaborate on your vision.
          </p>
          <p>
            Based in Karachi, Pakistan, and working with clients globally, I provide end-to-end development focused on clean maintainable code, optimal search engine ranking, and smooth user experiences. Reach out via the form with your project details, and I will respond within 24 hours.
          </p>
        </div>

        {/* Highlights */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 my-8 text-xs sm:text-sm text-zinc-300">
          <div className="flex items-center gap-2">
            <CheckCircle2 size={16} className="text-emerald-400" />
            <span>Available for new projects</span>
          </div>
          <div className="flex items-center gap-2">
            <Clock size={16} className="text-blue-400" />
            <span>Response time: Under 24h</span>
          </div>
          <div className="flex items-center gap-2">
            <Globe size={16} className="text-purple-400" />
            <span>Karachi, PK & Worldwide Remote</span>
          </div>
        </div>

        {/* Contextual Internal Links */}
        <div className="pt-6 border-t border-white/10 text-xs uppercase tracking-wider text-zinc-400 flex flex-wrap gap-4">
          <Link
            to="/work"
            onClick={scrollToTop}
            className="hover:text-white underline underline-offset-4"
          >
            Review Featured Projects
          </Link>
          <Link
            to="/info"
            onClick={scrollToTop}
            className="hover:text-white underline underline-offset-4"
          >
            Learn About My Tech Stack
          </Link>
          <Link
            to="/"
            onClick={scrollToTop}
            className="hover:text-white underline underline-offset-4"
          >
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default leftContect;
