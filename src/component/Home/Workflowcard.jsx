import gsap from 'gsap'
import React, { useEffect, useRef, useState } from 'react'

const Workflowcard = (props) => {

    const Cardref = useRef(null)
    const Textref = useRef(null)
    const Overlayref = useRef(null)
    const rotate = useRef(null)
    const [ismobile, setIsmobile] = useState(false)
    const [isopen, setIsopen] = useState(false)

    useEffect(() => {
        // cheaking the device
        const cheak = () => { setIsmobile(window.innerWidth < 768) }
        cheak()

        window.addEventListener("resize", cheak);
        return () => {
            window.removeEventListener("resize", cheak)
        }
    }, [])


    const Mousenter = () => {

        const tl = gsap.timeline()

        tl.to(Cardref.current, {
            yPercent: -30
        }, "smae")
        tl.to(Textref.current, {
            opacity: 1,
            ease: "power4.in",
            y: -10
        }, "smae")
        tl.to(Overlayref.current, {
            height: "100%",
            ease: 'power3.inOut',
        }, "smae")
    }
    const Mouseleve = () => {

        const tl = gsap.timeline()

        tl.to(Cardref.current, {
            yPercent: 0
        }, "same")
        tl.to(Textref.current, {
            opacity: 0,
            y: 0
        }, "same")
        tl.to(Overlayref.current, {
            height: "0%",
            ease: 'power3.inOut',
        }, "same")
    }
    const clicked = () => {

        const tl=gsap.timeline()

        if (!isopen) {
            tl.to(rotate.current, {
                rotate: 90
            },"same")
            tl.to(Cardref.current, {
                yPercent: -36
            },"same")
            tl.to(Textref.current, {
                opacity: 1,
                ease: "power4.in",
                y: -10
            },"same")
            tl.to(Overlayref.current, {
            height: "100%",
            ease: 'power3.inOut',
        },"same")
            setIsopen(true)
        }
        else {
            tl.to(rotate.current, {
                rotate: 0
            },"same")
            tl.to(Cardref.current, {
                yPercent: 0
            },"same")
            tl.to(Textref.current, {
                opacity: 0,
                ease: "power4.in",
                y: 0
            },"same")
            tl.to(Overlayref.current, {
            height: "0%",
            ease: 'power3.inOut',
        },"same")
            setIsopen(false)
        }
    }


    return (
        <div ref={Cardref} onMouseEnter={!ismobile ? Mousenter : undefined} onMouseLeave={!ismobile ? Mouseleve : undefined}
            style={{ top: !ismobile ? props.top : props.mdtop, left: !ismobile ? props.left : "0px", zIndex: props.zIndex }}
            className='absolute h-96 w-2/2 lg:h-[70vh] md:w-3/5 lg:w-2/3 border bg-black border-white overflow-hidden'>
            <div ref={Overlayref} style={{ backgroundColor: props.color }} className='overlay absolute bottom-0 left-0 w-full'></div>
            <div className='relative'>
                <div className='flex flex-col items-start justify-start'>
                    <div className='flex items-start justify-between w-full font-[League]'>
                        <div className='m-7 lg:m-10'>
                            <h4 className='text-6xl'>0{props.numbers}</h4>
                            <h2 className='text-8xl uppercase text-white'>
                                {props.title}
                            </h2>
                        </div>
                        <div onClick={!ismobile ? undefined : clicked} className='lg:hidden md:hidden h-20 w-20 relative flex items-center justify-center'>
                            <div ref={rotate} className='w-1 h-7 absolute bg-white'></div>
                            <div className='w-1 h-7 absolute rotate-90 bg-white'></div>
                        </div>
                    </div>
                </div>
                <div ref={Textref} className='px-10 flex items-center justify-between w-full opacity-0'>
                    <div className='lg:w-xl'>
                        <p>{props.paragraf}</p>
                    </div>
                    <div className='w-40 font-[League] text-lg hidden lg:flex tracking-wider leading-tight'>
                        <p>{props.subparagraf}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Workflowcard