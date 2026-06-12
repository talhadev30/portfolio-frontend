import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { SplitText } from 'gsap/SplitText';
import React from 'react'

const Sociallink = ({ name, Link }) => {

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


  return (
      <div className="row inner-wrapper select-none leading-[3vw] h-7 xl:h-14 lg:h-10 md:h-10 overflow-hidden flex flex-col translate-y-0" onMouseEnter={handleHoverIn}
              onMouseLeave={handleHoverOut}>
              <ul>
                <li className='split text-3xl lg:text-[3vw] md:text-5xl tracking-tighter uppercase '><a href={Link} >{name}</a></li>
                <li className=' split text-3xl  absolute left-0 top-full lg:text-[3vw] md:text-5xl leading-none tracking-tighter uppercase'><a href={Link} >{name}</a></li>
              </ul>
            </div>
  )
}

export default Sociallink
