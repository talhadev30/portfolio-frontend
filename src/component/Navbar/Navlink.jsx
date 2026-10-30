import { useRef } from 'react'
import { Link } from 'react-router-dom';
import useRollingLink from '../../hooks/useRollingLink';
import { scrollToTop } from '../../utils/motion';

const Navlink = (props) => {
    const wrapperRef = useRef(null)
    const { handleHoverIn, handleHoverOut } = useRollingLink(wrapperRef);
  return (
      <div ref={wrapperRef} onMouseEnter={handleHoverIn}
              onMouseLeave={handleHoverOut} className='select-none inner-wrapper overflow-hidden flex flex-col relative'>
                <Link to={props.path} onClick={() => { scrollToTop(); props.onNavigate?.(); }} className='split text-[16vw] tracking-tighter uppercase leading-none'>{props.name}</Link>
              <Link to={props.path} onClick={() => { scrollToTop(); props.onNavigate?.(); }} aria-hidden="true" tabIndex={-1} className='split absolute left-0 top-full text-[16vw] tracking-tighter uppercase leading-none'>{props.name}</Link>
            </div>
  )
}

export default Navlink
