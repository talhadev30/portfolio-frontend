import React from 'react'
import { Link } from 'react-router-dom';
import useRollingLink from '../../hooks/useRollingLink';

const Navlink = (props) => {


    const { handleHoverIn, handleHoverOut } = useRollingLink();
  // link click go top of the page 
    const scrollhendlear = () =>{
    window.scrollTo({
      top:0,
      behavior:"smooth"
    })
  }


  return (
      <div onMouseEnter={handleHoverIn}
              onMouseLeave={handleHoverOut} className='select-none inner-wrapper overflow-hidden flex flex-col relative'>
                <Link to={props.path} onClick={scrollhendlear} className='split text-[16vw] tracking-tighter uppercase leading-none'>{props.name}</Link>
              <Link to={props.path} onClick={scrollhendlear} className='split absolute left-0 top-full text-[16vw] tracking-tighter uppercase leading-none'>{props.name}</Link>
            </div>
  )
}

export default Navlink
