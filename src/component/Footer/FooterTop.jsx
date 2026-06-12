import { useGSAP } from '@gsap/react';
import gsap from 'gsap'
import { SplitText } from 'gsap/SplitText'
import React from 'react'
import { Link } from 'react-router-dom';

const FooterTop = () => {

    // gsap animation
    useGSAP(() => {
        let ctx = gsap.context(() => {
            document.querySelectorAll(".split").forEach((el) => {
                new SplitText(el, { type: "chars", charsClass: "chars" });
            });
        });
        return () => ctx.revert();
    });
    // hover animation
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
    // hover out animation
    const handleHoverOut = (e) => {
        const el = e.currentTarget;

        if (el._tl) {
            el._tl.reverse();
        }
    };

    return (
        <div className='flex md:flex-row lg:flex-row flex-col md:items-center lg:items-center items-start gap-6 md:gap-0 lg:gap-0 lg:justify-between md:justify-between h-60 w-full border-b-2'>
            <div className='flex flex-col items-start justify-center font-[League]'>
                <h4 className='text-4xl uppercase'>ready to work together ?</h4>
                <div onMouseEnter={handleHoverIn} onMouseLeave={handleHoverOut} className='flex flex-col items-start justify-start md:h-32 lg:h-40 h-20 overflow-hidden'>
                    <Link to="/contect" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} className='split text-7xl md:text-9xl lg:text-[11rem] md:leading-40 lg:leading-40 leading-20 uppercase tracking-tighter'>drop me a line</Link>
                    <Link to="/contect" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} className='split text-7xl md:text-9xl lg:text-[11rem] md:leading-40 lg:leading-40 leading-20 uppercase tracking-tighter'>drop me a line</Link>
                </div>
            </div>
            <div>
                <p className='text-sm text-end capitalize'>Currently i am <br />available for <br />new projects always</p>
            </div>
        </div>
    )
}

export default FooterTop
