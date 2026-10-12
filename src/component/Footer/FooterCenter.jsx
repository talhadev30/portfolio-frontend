import { Heart } from 'lucide-react'
import React from 'react'
import { Link } from 'react-router-dom';
import { OWNER, NAV_LINKS } from '../../data/portfolioData';

const FooterCenter = () => {
    return (
        <div className='flex py-6 items-center justify-between h-96 md:h-60 lg:h-60 w-full border-b-2'>
            <div className='flex md:flex-row lg:flex-row flex-col w-full h-full items-start justify-between'>
                <div className='h-full md:gap-0 lg:gap-0 gap-30 flex flex-row md:flex-col lg:flex-col items-center justify-between'>
                    <div>
                        <span className='hover:text-black/60 font-[League] text-5xl uppercase block'>{OWNER.name.split(' ')[0]}</span>
                        <p className='text-sm'>Living in Pakistan <br /> <span className='flex items-center gap-1'>with <Heart size={14} /></span></p>
                    </div>
                    <div className='flex items-center justify-center font-[League] '>
                        <button 
                            type="button"
                            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} 
                            aria-label="Back to top of page"
                            className='whitespace-nowrap btn relative text-center my-15 hover:text-white py-1 px-3 border text-[18px] rounded-3xl overflow-hidden cursor-pointer'
                        >
                            <span className='z-10 relative uppercase'>back to top</span>
                        </button>
                    </div>
                </div>
                <div className='md:gap-15 lg:gap-15 gap-40 flex items-center justify-center'>
                    <div>
                        <span className='font-[League] text-3xl uppercase tracking-tight block'>sitemap</span>
                        <ul className='list-none uppercase py-3 flex flex-col gap-2'>
                            {NAV_LINKS.map((link) => (
                                <li key={link.path} className='hover:text-black/60'>
                                    <Link to={link.path} onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
                                        {link.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div>
                        <span className='font-[League] text-3xl uppercase tracking-tight block'>social</span>
                        <ul className='list-none uppercase py-3 flex flex-col gap-2'>
                            {OWNER.socials.map((social) => (
                                <li key={social.name} className='hover:text-black/60'>
                                    <a 
                                        href={social.url} 
                                        aria-label={social.label} 
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        {social.name.toLowerCase()}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default FooterCenter;
