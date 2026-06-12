import React from "react";
import RightContect from "../component/contect/RightContect";
import LeftContect from "../component/contect/LeftContect";


const Contect = () => {
  return (
    <section className="w-full min-h-screen text-white flex items-center justify-center px-6 md:px-16 py-20 overflow-hidden relative">
      <div className="w-full max-w-7xl grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
        <LeftContect />
        <RightContect />
      </div>
    </section>
  );
};

export default Contect;
