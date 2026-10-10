import React from "react";
import Firsetinfo from "../component/Info/Fristinfo";
import Secondinfo from "../component/Info/Secondinfo";
import ThirdInfo from "../component/Info/ThirdInfo";
import Foureinfo from "../component/Info/Foureinfo";
import { Helmet } from "react-helmet-async";

const Info = () => {
  return (
    <>
      <Helmet>
        <title>About Talha Salman | Full Stack Web Developer & Software Engineer</title>
        <meta
          name="description"
          content="Learn about Talha Salman, a Full Stack Developer in Karachi, Pakistan. Explore technical skills in React, Node.js, Express, MongoDB, PHP, and modern web development."
        />
        <meta
          name="keywords"
          content="About Talha Salman, Full Stack Developer Karachi, Web Developer Skills, React Developer Pakistan, MERN Stack Skills, JavaScript Developer, Backend Developer Node.js"
        />
        <meta name="author" content="Talha Salman" />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://talhaportfolio.dpdns.org/info" />
        <meta property="og:type" content="profile" />
        <meta property="og:title" content="About Talha Salman | Full Stack Web Developer & Software Engineer" />
        <meta
          property="og:description"
          content="Learn about Talha Salman, a Full Stack Developer in Karachi, Pakistan. Explore technical skills in React, Node.js, Express, MongoDB, PHP, and modern web development."
        />
        <meta property="og:url" content="https://talhaportfolio.dpdns.org/info" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="About Talha Salman | Full Stack Web Developer & Software Engineer" />
        <meta
          name="twitter:description"
          content="Learn about Talha Salman, a Full Stack Developer in Karachi, Pakistan. Explore technical skills in React, Node.js, Express, MongoDB, PHP, and modern web development."
        />
      </Helmet>
      <div className="relative overflow-x-hidden text-white min-h-screen w-full">
        <Firsetinfo />
        <Secondinfo />
        <ThirdInfo />
        <Foureinfo />
      </div>
    </>
  );
};

export default Info;
