import React from "react";
import WorksCards from "../component/Works/WorksCards";
import Topcontent from "../component/Home/Topcontent";
import InfoText from "../component/Info/InfoText";
import Firsetinfo from "../component/Info/Fristinfo";
import Secondinfo from "../component/Info/Secondinfo";
import ThirdInfo from "../component/Info/ThirdInfo";
import Foureinfo from "../component/Info/Foureinfo";
import { Helmet } from "react-helmet-async";

const Info = () => {

  return (
    <>
      <Helmet>
        <title>About Talha dev | Skills, Experience & Education</title>
        <meta
          name="description"
          content="Learn about Talha dev, his education, technical skills, web development experience, and passion for building modern digital solutions."
        />
        <meta name="author" content="Talha Salman" />
        <meta name="robots" content="index, follow" />
        <meta property="og:type" content="website" />
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
