import React from 'react';
import useSplitReveal from '../../hooks/useSplitReveal';

const InfoText = (props) => {
    const HeroText = useSplitReveal();
    const Tag = props.as || "h2";
  return (
       <div className='w-max overflow-hidden text-center'>
          <Tag ref={HeroText} className='text-nowrap px-3 text-8xl sm:text-7xl md:text-9xl lg:text-[14rem] 2xl:text-[16rem] tracking-tighter font-[League] uppercase lg:text-center'>{props.text}</Tag>
        </div>
  )
}

export default InfoText
