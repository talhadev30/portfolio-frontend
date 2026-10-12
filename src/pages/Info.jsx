import React from "react";
import Firsetinfo from "../component/Info/Fristinfo";
import Secondinfo from "../component/Info/Secondinfo";
import ThirdInfo from "../component/Info/ThirdInfo";
import Foureinfo from "../component/Info/Foureinfo";
import SeoHead from "../seo/SeoHead";

const Info = () => {
  return (
    <>
      <SeoHead path="/info" />
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
