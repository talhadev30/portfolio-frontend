import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { SplitText } from 'gsap/SplitText';
import React, { useRef } from 'react'

const InfoText = (props) => {
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
  const Tag = props.as || "h2";
  return (
       <div className='w-max overflow-hidden text-center'>
          <Tag ref={HeroText} className='text-nowrap px-3 text-8xl sm:text-7xl md:text-9xl lg:text-[14rem] 2xl:text-[16rem] tracking-tighter font-[League] uppercase lg:text-center'>{props.text}</Tag>
        </div>
  )
}

export default InfoText
