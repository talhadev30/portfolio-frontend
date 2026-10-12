import React from "react";
import { Link } from "react-router-dom";
import { ExternalLink, ArrowRight } from "lucide-react";
import { PROJECTS } from "../../data/portfolioData";

const WorksDetails = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const projectList = PROJECTS;

  return (
    <section className="w-full bg-black text-white py-24 px-6 md:px-16 lg:px-20 border-t border-white/10">
      <div className="max-w-7xl mx-auto">
        {/* Breadcrumb Navigation */}
        <nav aria-label="Breadcrumb" className="mb-6">
          <ol className="flex items-center gap-2 text-xs uppercase tracking-wider text-zinc-400">
            <li>
              <Link to="/" onClick={scrollToTop} className="hover:text-white transition-colors">Home</Link>
            </li>
            <li aria-hidden="true" className="text-zinc-600">/</li>
            <li aria-current="page" className="text-emerald-400 font-medium">Featured Works</li>
          </ol>
        </nav>

        {/* Section Header */}
        <div className="mb-14">
          <span className="text-xs uppercase tracking-widest text-zinc-400 font-semibold">
            Case Studies & Solutions
          </span>
          <h2 className="font-[League] text-5xl sm:text-6xl md:text-7xl lg:text-8xl uppercase tracking-tighter mt-2 mb-6">
            Full-Stack Case Studies & Web Applications
          </h2>
          <p className="text-xl md:text-2xl text-zinc-300 font-light max-w-3xl leading-relaxed">
            Production-ready digital products combining clean architecture, intuitive UI/UX design, and scalable backend workflows.
          </p>
        </div>

        {/* Detailed SEO Content Paragraphs */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mb-16 text-zinc-300 text-sm md:text-base leading-relaxed">
          <p>
            Welcome to my web development project portfolio. As a Full Stack Developer based in Karachi, Pakistan, I build applications that bridge creative design and reliable software engineering. Every application featured here demonstrates modern coding best practices, modular component structure, and rigorous testing for seamless user experiences.
          </p>
          <p>
            From complex financial platforms with authentication and transaction processing to high-converting interactive web platforms, I focus on delivering clean code, cross-browser compatibility, and lightning-fast loading speeds. Explore each case study below to learn about the technologies, architectures, and problem-solving strategies applied.
          </p>
        </div>

        {/* Project Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {projectList.map((project, idx) => (
            <article
              key={idx}
              className="p-8 rounded-2xl border border-white/10 bg-white/[0.02] hover:border-white/30 transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                <span className="text-xs font-semibold text-emerald-400 uppercase tracking-wider">
                  {project.category}
                </span>
                <h3 className="font-[League] text-3xl sm:text-4xl uppercase tracking-tight mt-2 mb-4">
                  {project.title}
                </h3>
                <p className="text-zinc-400 text-sm leading-relaxed mb-6">
                  {project.description}
                </p>

                <div className="flex flex-wrap gap-2 mb-6">
                  {project.tech.map((t, i) => (
                    <span
                      key={i}
                      className="text-xs px-2.5 py-1 rounded-full bg-white/5 border border-white/10 text-zinc-300"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                {project.liveLink ? (
                  <a
                    href={project.liveLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-sm font-semibold text-white hover:text-emerald-400 transition-colors"
                  >
                    View Live Project <ExternalLink size={16} />
                  </a>
                ) : (
                  <Link
                    to="/contact"
                    onClick={scrollToTop}
                    className="inline-flex items-center gap-2 text-sm font-semibold text-white hover:text-blue-400 transition-colors"
                  >
                    Request Demo Details <ArrowRight size={16} />
                  </Link>
                )}
              </div>
            </article>
          ))}
        </div>

        {/* Call to action & Internal Links */}
        <div className="p-8 md:p-12 rounded-2xl border border-white/10 bg-zinc-950 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 mb-12">
          <div>
            <h3 className="font-[League] text-3xl md:text-4xl uppercase tracking-tight mb-2">
              Have a Project in Mind?
            </h3>
            <p className="text-zinc-400 text-sm max-w-xl">
              I am available for freelance web development contracts, full-stack consulting, and engineering roles. Let's build your next digital product together.
            </p>
          </div>
          <div className="flex flex-wrap gap-4">
            <Link
              to="/contact"
              onClick={scrollToTop}
              className="px-6 py-3 rounded-full bg-white text-black font-semibold text-sm hover:bg-zinc-200 transition-colors"
            >
              Start a Conversation
            </Link>
            <Link
              to="/info"
              onClick={scrollToTop}
              className="px-6 py-3 rounded-full border border-white/20 text-white font-semibold text-sm hover:bg-white/10 transition-colors"
            >
              View My Skills & Background
            </Link>
          </div>
        </div>

        {/* Contextual Internal Links Footer */}
        <div className="flex flex-wrap items-center justify-between gap-4 pt-8 border-t border-white/10 text-xs sm:text-sm uppercase tracking-wider text-zinc-400">
          <span>Explore More:</span>
          <div className="flex flex-wrap gap-6">
            <Link
              to="/"
              onClick={scrollToTop}
              className="hover:text-white underline underline-offset-4"
            >
              Back to Home Overview
            </Link>
            <Link
              to="/info"
              onClick={scrollToTop}
              className="hover:text-white underline underline-offset-4"
            >
              Full Stack Technologies & Stack
            </Link>
            <Link
              to="/contact"
              onClick={scrollToTop}
              className="hover:text-white underline underline-offset-4"
            >
              Hire Talha Salman for Web Projects
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WorksDetails;

