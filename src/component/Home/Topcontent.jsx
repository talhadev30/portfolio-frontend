import { useGSAP } from "@gsap/react"
import gsap from "gsap"
import { SplitText } from "gsap/all"
import { useRef, useState } from "react"

const Topcontent = () => {
  const HeroText = useRef(null)

  useGSAP(() => {
    gsap.registerPlugin(SplitText);

    const ctx = gsap.context(() => {
      const split = new SplitText(HeroText.current, { type: "chars" });

      gsap.from(split.chars, {
        opacity: 0,
        yPercent: 100,
        ease: "sine.inOut",
        stagger: {
          each: 0.02,
          from: "start"
        },
      });
    });

    return () => ctx.revert();
  }, []);


  return (
    <div className='h-full w-full p-2 lg:p-0 flex items-start lg:justify-center justify-start'>
      <div className='flex flex-col sm:flex-col md:flex-col lg:flex-row items-start lg:items-center justify-center gap-2 lg:gap-13'>
        <div className='w-full overflow-hidden'>
          <h1 ref={HeroText} className='text-nowrap text-7xl sm:text-7xl md:text-9xl 2xl:text-[16vw] lg:text-[14vw] tracking-tighter font-[League] uppercase lg:text-center'>hi i'am talha</h1>
        </div>
        <div className='w-full md:w-[70vw] lg:w-[23vw] flex items-center justify-start px-2'>
          <p className='text-lg md:ps-0 lg:ps-0 lg:text-sm'>I build fast, responsive, and modern web applications using React, JavaScript, Tailwind CSS, and Node.js. Passionate about creating beautiful user experiences and solving real-world problems through code.</p>
        </div>

      </div>
    </div>
  )
}


export default Topcontent       