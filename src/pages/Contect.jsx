import React from "react";
import RightContect from "../component/contect/RightContect";
import LeftContect from "../component/contect/LeftContect";
import { Helmet } from "react-helmet-async";


const Contect = () => {
  return (
    <>
      <Helmet>
        <title>Contact Talha dev | Hire a Web Developer</title>
        <meta
          name="description"
          content="Get in touch with Talha dev for web development projects, freelance opportunities, collaborations, and professional inquiries."
        />
        <meta name="author" content="Talha Salman" />
        <meta name="robots" content="index, follow" />
        <meta property="og:type" content="website" />
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
