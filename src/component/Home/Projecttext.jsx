import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/all'
import React, { useRef } from 'react'
const Projecttext = (props) => {

  const containerref = useRef(null)
  const revelref = useRef(null)

  useGSAP(() => {
    gsap.registerPlugin(ScrollTrigger)
    gsap.fromTo(revelref.current, {
      rotateX: 90,
    },{
        rotateX: 0,
        stagger: 0.04,
        ease: "power3.out",
        scrollTrigger: {
          trigger: containerref.current,
          start: "top 50%",
          scrub: false,
        },
      }
    );
  })

  return (
    <div ref={containerref} className='lg:p-20 p-5 overflow-hidden'>
      <h3 ref={revelref} className='font-[League] tracking-tighter text-6xl md:text-[8rem] lg:text-[10rem] mb-10 lg:leading-[10vw] 2xl:leading-[8.5vw] uppercase'>
        {props.text1}<br />
        {props.text2}
      </h3>
    </div>
  )
}

export default Projecttext  