import React from "react";
import Hero from "../component/Home/Hero";
import Project from "../component/Home/Project";
import HomeOverview from "../component/Home/HomeOverview";
import Devprocess from "../component/Home/Devprocess";
import { Helmet } from "react-helmet-async";

const Home = () => {
  return (
    <>
      <Helmet>
        <title>Talha Salman | Full Stack Web Developer & MERN Specialist</title>
        <meta
          name="description"
          content="Talha Salman is a professional Full Stack Web Developer in Karachi specializing in React, Node.js, Express, MongoDB, and high-performance digital web applications."
        />
        <meta
          name="keywords"
          content="Talha Salman, Full Stack Developer, Web Developer Karachi, React Developer Pakistan, MERN Stack Developer, Node.js Developer, Web Development Services, Portfolio"
        />
        <meta name="author" content="Talha Salman" />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://talhaportfolio.dpdns.org/" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Talha Salman | Full Stack Web Developer & MERN Specialist" />
        <meta
          property="og:description"
          content="Talha Salman is a professional Full Stack Web Developer in Karachi specializing in React, Node.js, Express, MongoDB, and high-performance digital web applications."
        />
        <meta property="og:url" content="https://talhaportfolio.dpdns.org/" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Talha Salman | Full Stack Web Developer & MERN Specialist" />
        <meta
          name="twitter:description"
          content="Talha Salman is a professional Full Stack Web Developer in Karachi specializing in React, Node.js, Express, MongoDB, and high-performance digital web applications."
        />
      </Helmet>
      <div className="min-h-screen w-full relative text-white">
        <Hero />
        <Project />
        <HomeOverview />
        <Devprocess />
      </div>
    </>
  );
};

export default Home;
