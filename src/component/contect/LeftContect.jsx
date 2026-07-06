import React from "react";

const leftContect = () => {
  return (
    <div className="flex flex-col justify-between h-full">
      <div>
        <h1 className="uppercase font-[League] text-[5rem] sm:text-[7rem] md:text-[9rem] leading-[0.9] tracking-tight ">
          Let's Create
          <br />
          Something Great
        </h1>
      </div>

      <div className="mt-16 uppercase text-sm leading-5">
        <p><span className="text-green-400">*</span> Available for new projects</p>
        <p>now</p>
      </div>
    </div>
  );
};

export default leftContect;
