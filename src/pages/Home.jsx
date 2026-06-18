import React from "react";
import Hero from "../component/Home/Hero";
import Project from "../component/Home/Project";
import Devprocess from "../component/Home/Devprocess";
import { Helmet } from "react-helmet-async";

const Home = () => {
  return (

    <>
      <Helmet>
        <title>Talha dev | web developer</title>
        <meta
          name="description"
          content="Talha dev is a Web Developer specializing in responsive websites, modern web applications, and user-friendly digital experiences."
        />
        <meta name="author" content="Talha Salman" />
        <meta name="robots" content="index, follow" />
        <meta property="og:type" content="website" />
      </Helmet>
      <div className="min-h-screen w-full relative text-white">
        <Hero />
        <Project />
        <Devprocess />
      </div>
    </>
  );
};

export default Home;
