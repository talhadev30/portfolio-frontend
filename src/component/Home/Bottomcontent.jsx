import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { SplitText } from "gsap/all";
import { useRef } from "react";

const Bottomcontent = () => {

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
        <div className='h-full w-full p-2 lg:p-0 flex items-center lg:justify-center justify-end'>
            <div className='flex flex-col sm:flex-col md:flex-col lg:flex-row items-start lg:items-center justify-center gap-2'>
                <div className='paragraf order-2 lg:order-1 w-full md:w-[70vw] lg:w-[20vw] flex items-center justify-start px-2'>
                    <p className='text-lg ps-25 md:ps-40 lg:ps-0 lg:text-sm'>I’m in the process of learning web development, experimenting with projects inspired by top-tier brands.</p>
                </div>
                <div className='order-1 lg:order-2 w-full overflow-hidden'>
                    <h1 ref={HeroText} className='text-nowrap ps-12 lg:ps-0  text-7xl sm:text-7xl md:text-9xl 2xl:text-[16vw] lg:text-[14vw]  tracking-tighter font-[League] uppercase text-center'>web developer</h1>
                </div>
            </div>
        </div>

    )
}

export default Bottomcontent