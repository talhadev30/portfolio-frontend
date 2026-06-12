import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { SplitText } from 'gsap/SplitText';
import React from 'react'
import { Link } from 'react-router-dom';

const Navlink = (props) => {


    // split all text 
  useGSAP(() => {
    let ctx = gsap.context(() => {
      document.querySelectorAll(".split").forEach((el) => {
        new SplitText(el, { type: "chars", charsClass: "chars" });
      });
    });

    return () => ctx.revert();
  });
  // hoverin animation
  const handleHoverIn = (e) => {
    const el = e.currentTarget;
    const chars = el.querySelectorAll(".chars");

    if (!el._tl) {
      el._tl = gsap.timeline({ paused: true });

      el._tl.to(chars, {
        yPercent: -100,
        stagger: 0.02,
        ease: "power4.inOut",
      });
    }

    el._tl.play();
  };
  // hoverout animation
  const handleHoverOut = (e) => {
    const el = e.currentTarget;

    if (el._tl) {
      el._tl.reverse();
    }
  };
  // link click go top of the page 
    const scrollhendlear = () =>{
    window.scrollTo({
      top:0,
      behavior:"smooth"
    })
  }


  return (
      <div onMouseEnter={handleHoverIn}
              onMouseLeave={handleHoverOut} className='select-none inner-wrapper overflow-hidden flex flex-col relative'>
                <Link to={props.path} onClick={scrollhendlear} className='split text-[16vw] tracking-tighter uppercase leading-none'>{props.name}</Link>
              <Link to={props.path} onClick={scrollhendlear} className='split absolute left-0 top-full text-[16vw] tracking-tighter uppercase leading-none'>{props.name}</Link>
            </div>
  )
}

export default Navlink
