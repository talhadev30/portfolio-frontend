import React from "react";

const Cvbutton = () => {
  return (
    <a
      href="/talhacv.png"
      download
      className="inline-flex items-center justify-center px-6 py-3 bg-black text-white border-2 border-white rounded-lg font-medium transition-all duration-300 hover:bg-white hover:text-black"
    >
      Download CV
    </a>
  );
};

export default Cvbutton;