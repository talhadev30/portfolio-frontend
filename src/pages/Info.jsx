import React from "react";
import WorksCards from "../component/Works/WorksCards";
import Topcontent from "../component/Home/Topcontent";
import InfoText from "../component/Info/InfoText";
import Firsetinfo from "../component/Info/Fristinfo";
import Secondinfo from "../component/Info/Secondinfo";
import ThirdInfo from "../component/Info/ThirdInfo";
import Foureinfo from "../component/Info/Foureinfo";

const Info = () => {

  return (
    <div className="relative overflow-x-hidden text-white min-h-screen w-full">
      <Firsetinfo/>
      <Secondinfo/>
      <ThirdInfo/>
      <Foureinfo/>
    </div>
  );
};

export default Info;
