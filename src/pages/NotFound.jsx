import React from "react";
import { Link } from "react-router-dom";
import { Home as HomeIcon, Briefcase, User, Mail, ArrowLeft } from "lucide-react";
import SeoHead from "../seo/SeoHead";
import { NAV_LINKS } from "../data/portfolioData";

const NotFound = () => {
  const getIcon = (path) => {
    switch (path) {
      case "/":
        return <HomeIcon size={18} />;
      case "/work":
        return <Briefcase size={18} />;
      case "/info":
        return <User size={18} />;
      case "/contact":
        return <Mail size={18} />;
      default:
        return null;
    }
  };

  return (
    <>
      <SeoHead path="/404" />
      <section className="min-h-screen w-full bg-black text-white flex items-center justify-center px-6 py-24 relative overflow-hidden">
        {/* Subtle background glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-zinc-800/30 rounded-full blur-3xl pointer-events-none -z-10" />

        <div className="max-w-2xl w-full text-center flex flex-col items-center">
          <span className="font-[League] text-8xl sm:text-9xl tracking-tighter text-zinc-600 block select-none">
            404
          </span>

          <h1 className="font-[League] text-4xl sm:text-6xl uppercase tracking-tight mt-2 mb-4">
            Page Not Found
          </h1>

          <p className="text-zinc-300 text-base sm:text-lg max-w-lg mb-8 leading-relaxed">
            The address you entered may be incorrect, or the page may have been moved or updated.
          </p>

          <Link
            to="/"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-white text-black font-semibold text-sm hover:bg-zinc-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-white transition-all duration-200 mb-12 cursor-pointer"
          >
            <ArrowLeft size={16} /> Return to Homepage
          </Link>

          <div className="w-full pt-8 border-t border-white/10">
            <span className="text-xs uppercase tracking-widest text-zinc-400 font-semibold block mb-4">
              Explore Available Pages
            </span>
            <div className="flex flex-wrap items-center justify-center gap-3">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-sm text-zinc-200 hover:text-white hover:bg-white/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-white transition-all"
                >
                  {getIcon(link.path)}
                  <span>{link.name}</span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default NotFound;

