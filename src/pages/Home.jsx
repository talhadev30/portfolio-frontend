import React from "react";
import Hero from "../component/Home/Hero";
import Project from "../component/Home/Project";
import HomeOverview from "../component/Home/HomeOverview";
import Devprocess from "../component/Home/Devprocess";
import HomeFaq from "../component/Home/HomeFaq";
import SeoHead from "../seo/SeoHead";

const Home = () => {
  return (
    <>
      <SeoHead path="/" />
      <div className="min-h-screen w-full relative text-white">
        <Hero />
        <Project />
        <HomeOverview />
        <Devprocess />
        <HomeFaq />
      </div>
    </>
  );
};

export default Home;
