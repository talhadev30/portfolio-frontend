import React from "react";
import LeftContect from "../component/contect/LeftContect";
import RightContect from "../component/contect/RightContect";
import SeoHead from "../seo/SeoHead";

const Contect = () => {
  return (
    <>
      <SeoHead path="/contact" />
      <section className="relative min-h-screen w-full overflow-hidden text-white">
        <div className="mx-auto w-full max-w-7xl px-5 pb-24 pt-32 md:px-10 md:pt-36 lg:px-20 lg:pb-32">
          <div className="grid grid-cols-1 items-start gap-14 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-12 xl:gap-20">
            <LeftContect />
            <RightContect />
          </div>
        </div>
      </section>
    </>
  );
};

export default Contect;
