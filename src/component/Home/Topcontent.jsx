import React from "react";
import useSplitReveal from "../../hooks/useSplitReveal";

const Topcontent = () => {
  const HeroText = useSplitReveal();


  return (
    <div className='h-full w-full p-2 lg:p-0 flex items-start lg:justify-center justify-start'>
      <div className='flex flex-col sm:flex-col md:flex-col lg:flex-row items-start lg:items-center justify-center gap-2 lg:gap-13'>
        <div className='w-full overflow-hidden'>
          <h1 ref={HeroText} className='text-nowrap text-7xl sm:text-7xl md:text-9xl 2xl:text-[16vw] lg:text-[14vw] tracking-tighter font-[League] uppercase lg:text-center'>hi i'm talha</h1>
        </div>
        <div className='w-full md:w-[70vw] lg:w-[23vw] flex items-center justify-start px-2'>
          <p className='text-lg md:ps-0 lg:ps-0 lg:text-sm'>Full Stack Web Developer building fast, responsive, and SEO-friendly web applications with React, Node.js, and MySQL.
</p>
        </div>

      </div>
    </div>
  )
}


export default Topcontent       