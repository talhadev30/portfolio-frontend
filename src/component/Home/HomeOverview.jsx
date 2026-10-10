import React from "react";
import { Link } from "react-router-dom";
import { Code2, Server, Gauge, ArrowRight } from "lucide-react";

const HomeOverview = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <section className="w-full bg-black text-white py-20 px-6 md:px-16 lg:px-20 border-t border-b border-white/10">
      <div className="max-w-7xl mx-auto">
        {/* Section Header with Semantic Subheadings */}
        <div className="mb-14">
          <span className="text-xs uppercase tracking-widest text-zinc-400 font-semibold">
            Services & Expertise
          </span>
          <h2 className="font-[League] text-5xl sm:text-6xl md:text-7xl lg:text-8xl uppercase tracking-tighter mt-2 mb-6">
            Full Stack Web Development & Digital Engineering
          </h2>
          <h3 className="text-xl md:text-2xl text-zinc-300 font-light max-w-3xl leading-relaxed">
            Crafting high-performance web applications, responsive user interfaces, and scalable backend architectures tailored for business growth.
          </h3>
        </div>

        {/* Detailed SEO-rich Content Paragraphs (Over 180 words) */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mb-16 text-zinc-300 text-sm md:text-base leading-relaxed">
          <p>
            Welcome to my portfolio! As a dedicated Full Stack Web Developer based in Karachi, Pakistan, I specialize in engineering modern, fast, and SEO-friendly digital web applications. Combining cutting-edge frontend technologies like React, JavaScript (ES6+), and Tailwind CSS with robust backend solutions powered by Node.js, Express.js, and databases such as MongoDB and MySQL, I transform complex ideas into intuitive, scalable software products.
          </p>
          <p>
            Whether you are looking to build a high-converting web platform from scratch, modernize an existing interface with fluid GSAP animations, or engineer reliable RESTful APIs, I provide end-to-end web development services tailored to client needs and search engine visibility. Every project is developed with clean modular code, fast loading speeds, mobile responsiveness, and accessibility at its core.
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
                Modern Frontend Architecture
              </h3>
              <p className="text-zinc-400 text-sm leading-relaxed mb-6">
                Building interactive, mobile-first single-page applications with React, Tailwind CSS, and smooth micro-interactions that engage users across every screen size.
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
                Scalable Backend & APIs
              </h3>
              <p className="text-zinc-400 text-sm leading-relaxed mb-6">
                Engineering secure REST APIs with Node.js, Express, and database models in MongoDB and MySQL, featuring JWT authentication and reliable data workflows.
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
                Speed, SEO & Indexing
              </h3>
              <p className="text-zinc-400 text-sm leading-relaxed mb-6">
                Optimizing Core Web Vitals, semantic markup, sitemaps, structured data, and server prerendering to help web applications rank prominently on Google search.
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

