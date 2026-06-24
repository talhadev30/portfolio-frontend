import { Heart } from 'lucide-react'
import React from 'react'
import { Link } from 'react-router-dom';

const FooterCenter = () => {
    return (
        <div className='flex py-6 items-center justify-between h-96 md:h-60 lg:h-60 w-full border-b-2'>
            <div className='flex md:flex-row lg:flex-row flex-col w-full h-full items-start justify-between'>
                <div className='h-full md:gap-0 lg:gap-0 gap-30 flex flex-row md:flex-col lg:flex-col items-center justify-between'>
                    <div>
                        <h4 className='hover:text-black/60 font-[League] text-5xl uppercase'>talha</h4>
                        <p className='text-sm'>leving in pakistan <br /> <span className='flex items-center gap-1'>with <Heart size={14} /></span></p>
                    </div>
                    <div className='flex items-center justify-center font-[League] '>
                        <button onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} className='whitespace-nowrap btn relative text-center my-15 hover:text-white py-1 px-3 border text-[18px] rounded-3xl overflow-hidden'><a className='z-10 relative uppercase '>back to top</a></button>
                    </div>
                </div>
                <div className='md:gap-15 lg:gap-15 gap-40 flex items-center justify-center'>
                    <div>
                        <h6 className='font-[League] text-3xl uppercase tracking-tight'>sitemap</h6>
                        <ul className='list-none uppercase py-3 flex flex-col gap-2'>
                            <li className='hover:text-black/60'><Link to="/" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>Home</Link></li>
                            <li className='hover:text-black/60'><Link to="/work" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>Works</Link></li>
                            <li className='hover:text-black/60'><Link to="/info" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>Info</Link></li>
                            <li className='hover:text-black/60'><Link to="/contact" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>Contact</Link></li>
                        </ul>
                    </div>
                    <div>
                        <h6 className='font-[League] text-3xl uppercase tracking-tight'>social</h6>
                        <ul className='list-none uppercase py-3 flex flex-col gap-2'>
                            <li className='hover:text-black/60'><a href="https://www.linkedin.com/in/talha-salman-442136415/" aria-label="LinkedIn Profile" target="_blank"
                                rel="noopener noreferrer" >linkedin</a></li>
                            <li className='hover:text-black/60'><a href="https://www.instagram.com/talha.dev30/" aria-label="instagram Profile" target="_blank"
                                rel="noopener noreferrer">instagram</a></li>
                            <li className='hover:text-black/60'><a href="https://www.facebook.com/profile.php?id=61590847734134" aria-label="facebook Profile" target="_blank"
                                rel="noopener noreferrer">facebook</a></li>
                            <li className='hover:text-black/60'><a href="https://github.com/talha2343" aria-label="github Profile" target="_blank"
                                rel="noopener noreferrer">github</a></li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default FooterCenter
