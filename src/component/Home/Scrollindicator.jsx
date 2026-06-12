import { useGSAP } from '@gsap/react'
import React, { useRef } from 'react'
import { Mouse } from 'lucide-react'
import gsap from 'gsap'

const Scrollindicator = () => {
const Scrollref = useRef(null)
    useGSAP(()=>{
        gsap.from(Scrollref.current,{
            yPercent: 30,
            opacity:0,
            duration:1.
        })
    })

  return (
    <div ref={Scrollref} className='h-30 w-20 flex flex-col items-center justify-evenly  absolute top-[92%] left-1/2 -translate-x-1/2 -translate-y-1/2'>
        <Mouse size={40} opacity={0.6} />
        <div className='h-10 w-1 overflow-hidden'>
          <div className='h-full w-full bg-white/90 animated'>
          </div>
        </div>
      </div>
  )
}

export default Scrollindicator