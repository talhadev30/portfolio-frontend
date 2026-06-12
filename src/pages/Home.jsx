import React from "react";
import Hero from "../component/Home/Hero";
import Project from "../component/Home/Project";
import Devprocess from "../component/Home/Devprocess";

const Home = () => {
  return (
    <div className="min-h-screen w-full relative text-white">
      <Hero />
      <Project />
      <Devprocess />
    </div>
  );
};

export default Home;
