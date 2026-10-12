import React from 'react'
import StickyCard from '../Home/StickyCard'
import useSplitReveal from '../../hooks/useSplitReveal';

const WorksCards = () => {
    const HeroText = useSplitReveal();

    return (
        <div className="bg-black min-h-screen relative">
            <div className='panel h-screen w-screen md:gap-y-26 gap-y-10 py-35 px-5 lg:px-20 font-[League] flex flex-col lg:flex-row justify-between lg:items-center items-start '>
                <div >
                    <h1 ref={HeroText} className='overflow-hidden text-9xl text-nowrap md:text-[11rem] lg:text-[14vw] 2xl:text-[16vw] 2xl:leading-[13vw] uppercase leading-26 lg:leading-[10.9vw] md:leading-[16.9vw] tracking-tighter'>
                        <div className='overflow-hidden'>my</div>
                        <div className='overflow-hidden'>Featured</div>
                        <div className='overflow-hidden'>Projects</div>
                    </h1>
                </div>
            </div>
            <div className='relative'><StickyCard img={"/project1.webp"} alt={"Banking System"} ProductName={"Banking System"} link="https://talha-banking-system.vercel.app/" />
                <StickyCard img={"/product2.webp"} alt={"Restaurant Website"} ProductName={"Restaurant Website"} />
                <StickyCard img={"/product3.webp"} alt={"School Management System"} ProductName={"School Management System"} />
            </div>
        </div>
    )
}

export default WorksCards
