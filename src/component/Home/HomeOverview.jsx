import React from "react";
import { Link } from "react-router-dom";
import { Code2, Server, Gauge, ArrowRight } from "lucide-react";
import { scrollToTop } from "../../utils/motion";

const HomeOverview = () => {
  return (
    <section className="w-full bg-black text-white py-20 px-6 md:px-16 lg:px-20 border-t border-b border-white/10">
      <div className="max-w-7xl mx-auto">
        {/* Section Header with Semantic Subheadings */}
        <div className="mb-14">
          <span className="text-xs uppercase tracking-widest text-zinc-400 font-semibold">
            What I Build
          </span>
          <h2 className="font-[League] text-5xl sm:text-6xl md:text-7xl lg:text-8xl uppercase tracking-tighter mt-2 mb-6">
            Websites and Web Apps
          </h2>
          <p className="text-xl md:text-2xl text-zinc-300 font-light max-w-3xl leading-relaxed">
            I build fast, easy-to-use websites and web apps for phones, tablets, and computers.
          </p>
        </div>

        {/* Overview */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mb-16 text-zinc-300 text-sm md:text-base leading-relaxed">
          <p>
            I am a web developer in Karachi, Pakistan. I use React, JavaScript, and Tailwind CSS to build clear and responsive pages. I also work with Node.js, Express, MongoDB, and MySQL.
          </p>
          <p>
            I can build a new site, improve an existing one, or connect it to an API. I aim for quick load times, simple navigation, and a layout that works on every screen.
          </p>
        </div>

        {/* Core Pillars / Subsections */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {/* Card 1: Frontend */}
          <div className="p-8 rounded-2xl border border-white/10 bg-white/[0.02] hover:border-white/30 transition-all duration-300 flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center mb-6 text-emerald-400">
                <Code2 size={24} />
              </div>
              <h3 className="font-[League] text-3xl uppercase tracking-tight mb-3">
                Frontend Pages
              </h3>
              <p className="text-zinc-400 text-sm leading-relaxed mb-6">
                I build interactive pages with React and Tailwind CSS. They work across screen sizes and are easy to use.
              </p>
            </div>
            <Link
              to="/work"
              onClick={scrollToTop}
              className="inline-flex items-center gap-2 text-sm font-semibold text-white hover:text-emerald-400 transition-colors"
            >
              Explore Featured Works <ArrowRight size={16} />
            </Link>
          </div>

          {/* Card 2: Backend */}
          <div className="p-8 rounded-2xl border border-white/10 bg-white/[0.02] hover:border-white/30 transition-all duration-300 flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center mb-6 text-blue-400">
                <Server size={24} />
              </div>
              <h3 className="font-[League] text-3xl uppercase tracking-tight mb-3">
                Back End and APIs
              </h3>
              <p className="text-zinc-400 text-sm leading-relaxed mb-6">
                I build APIs with Node.js and Express, and store data in MongoDB or MySQL. I can add secure sign-in.
              </p>
            </div>
            <Link
              to="/info"
              onClick={scrollToTop}
              className="inline-flex items-center gap-2 text-sm font-semibold text-white hover:text-blue-400 transition-colors"
            >
              Discover Skills & Tech Stack <ArrowRight size={16} />
            </Link>
          </div>

          {/* Card 3: Performance & SEO */}
          <div className="p-8 rounded-2xl border border-white/10 bg-white/[0.02] hover:border-white/30 transition-all duration-300 flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center mb-6 text-purple-400">
                <Gauge size={24} />
              </div>
              <h3 className="font-[League] text-3xl uppercase tracking-tight mb-3">
                Site Speed and Search
              </h3>
              <p className="text-zinc-400 text-sm leading-relaxed mb-6">
                I work on page speed, clear HTML, sitemaps, and search previews to help people find each site.
              </p>
            </div>
            <Link
              to="/contact"
              onClick={scrollToTop}
              className="inline-flex items-center gap-2 text-sm font-semibold text-white hover:text-purple-400 transition-colors"
            >
              Hire Me for Your Project <ArrowRight size={16} />
            </Link>
          </div>
        </div>

        {/* Contextual Internal Links Bar */}
        <div className="flex flex-wrap items-center justify-between gap-4 pt-8 border-t border-white/10 text-xs sm:text-sm uppercase tracking-wider text-zinc-400">
          <span>Quick Navigation:</span>
          <div className="flex flex-wrap gap-6">
            <Link
              to="/work"
              onClick={scrollToTop}
              className="hover:text-white underline underline-offset-4"
            >
              View Web Development Projects
            </Link>
            <Link
              to="/info"
              onClick={scrollToTop}
              className="hover:text-white underline underline-offset-4"
            >
              About Talha Salman & Skills
            </Link>
            <Link
              to="/contact"
              onClick={scrollToTop}
              className="hover:text-white underline underline-offset-4"
            >
              Contact & Freelance Inquiries
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HomeOverview;

