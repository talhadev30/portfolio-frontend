import { useRef } from 'react';
import { Link } from 'react-router-dom';
import useRollingLink from '../../hooks/useRollingLink';
import { scrollToTop } from '../../utils/motion';

const FooterTop = () => {
    const wrapperRef = useRef(null);
    const { handleHoverIn, handleHoverOut } = useRollingLink(wrapperRef);

    return (
        <div className='flex md:flex-row lg:flex-row flex-col md:items-center lg:items-center items-start gap-6 md:gap-0 lg:gap-0 lg:justify-between md:justify-between h-60 w-full border-b-2'>
            <div className='flex flex-col items-start justify-center font-[League]'>
                <h4 className='text-4xl uppercase'>ready to work together ?</h4>
                <div ref={wrapperRef} onMouseEnter={handleHoverIn} onMouseLeave={handleHoverOut} className='flex flex-col items-start justify-start md:h-32 lg:h-40 h-20 overflow-hidden'>
                    <Link to="/contact" onClick={scrollToTop} aria-label="Contact Talha Salman" className='split text-7xl md:text-9xl lg:text-[11rem] md:leading-40 lg:leading-40 leading-20 uppercase tracking-tighter'>drop me a line</Link>
                    <Link to="/contact" onClick={scrollToTop} aria-label="Contact Talha Salman" className='split text-7xl md:text-9xl lg:text-[11rem] md:leading-40 lg:leading-40 leading-20 uppercase tracking-tighter'>drop me a line</Link>
                </div>
            </div>
            <div>
                <p className='text-sm text-end capitalize'>Currently i am <br />available for <br />new projects always</p>
            </div>
        </div>
    )
}

export default FooterTop
