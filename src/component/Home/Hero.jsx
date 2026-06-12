import React from 'react'
import Bottomcontent from './Bottomcontent'
import Topcontent from './Topcontent'
import Scrollindicator from './Scrollindicator'
const Hero = () => {


  return (
    <div className='min-h-screen relative w-full lg:p-0 py-0 px-2 sm:px-4 lg:flex lg:items-center lg:justify-center  flex flex-col items-center justify-center gap-8 sm:gap-0 sm:pb-0 overflow-hidden'>
      <Topcontent />
      <Bottomcontent />
      <Scrollindicator/>
    </div>
  )
}

export default Hero
