import React from 'react'
import StickyCard from '../Home/StickyCard'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'
import { useEffect, useRef } from 'react'
import Projecttext from '../Home/Projecttext'
import { useGSAP } from '@gsap/react'
import { SplitText } from 'gsap/all'

const WorksCards = () => {

    const HeroText = useRef(null)
    const imageref = useRef(null)

    useGSAP(() => {
        gsap.registerPlugin(SplitText);
        gsap.registerPlugin(ScrollTrigger);

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

        gsap.from(imageref.current, {
            opacity: 0,
            ease: "power3.inOut",
            duration: 1,
        })

        return () => ctx.revert();
    }, []);

    return (
        <div className="bg-black min-h-screen relative">
            <div className='panel h-screen w-screen md:gap-y-26 gap-y-10 py-35 px-5 lg:px-20 font-[League] flex flex-col lg:flex-row justify-between lg:items-center items-start '>
                <div >
                    <div ref={HeroText} className='overflow-hidden text-9xl text-nowrap md:text-[11rem] lg:text-[14vw] 2xl:text-[16vw] 2xl:leading-[13vw] uppercase leading-26 lg:leading-[10.9vw] md:leading-[16.9vw] tracking-tighter'>
                        <div className='overflow-hidden'>my</div>
                        <div className='overflow-hidden'>recent</div>
                        <div className='overflow-hidden'>works</div>
                    </div>
                </div>
            </div>
            <div className='relative'><StickyCard img={"/product1.png"} ProductName={"headphone"} />
                <StickyCard img={"/product2.png"} ProductName={"hand cream"} />
                <StickyCard img={"/product3.png"} ProductName={"Mobile phone"} />
            </div>
        </div>
    )
}

export default WorksCards
