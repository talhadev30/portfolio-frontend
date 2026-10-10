import React from "react";
import RightContect from "../component/contect/RightContect";
import LeftContect from "../component/contect/LeftContect";
import { Helmet } from "react-helmet-async";


const Contect = () => {
  return (
    <>
      <Helmet>
        <title>Contact Talha Salman | Hire Full Stack Web Developer</title>
        <meta
          name="description"
          content="Get in touch with Talha Salman for custom web development, React and Node.js applications, freelance contracts, and software engineering opportunities."
        />
        <meta
          name="keywords"
          content="Contact Talha Salman, Hire Web Developer Karachi, Hire Full Stack Developer, Freelance React Developer Pakistan, MERN Developer Hire, Web Developer Contact"
        />
        <meta name="author" content="Talha Salman" />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://talhaportfolio.dpdns.org/contact" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Contact Talha Salman | Hire Full Stack Web Developer" />
        <meta
          property="og:description"
          content="Get in touch with Talha Salman for custom web development, React and Node.js applications, freelance contracts, and software engineering opportunities."
        />
        <meta property="og:url" content="https://talhaportfolio.dpdns.org/contact" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Contact Talha Salman | Hire Full Stack Web Developer" />
        <meta
          name="twitter:description"
          content="Get in touch with Talha Salman for custom web development, React and Node.js applications, freelance contracts, and software engineering opportunities."
        />
      </Helmet>
      <section className="w-full min-h-screen text-white flex items-center justify-center px-6 md:px-16 py-20 overflow-hidden relative">
        <div className="w-full max-w-7xl grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          <LeftContect />
          <RightContect />
        </div>
      </section>
    </>
  );
};

export default Contect;
