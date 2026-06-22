import React from 'react'

const StickyCard = (props) => {
  return (
    <div className="h-screen sticky top-0 w-full overflow-hidden">
      <img src={props.img} alt={props.alt} className="bg-cover w-full h-full object-cover" />
      <div className='absolute top-0 left-0 w-full h-full z-40 flex items-center justify-center'>
        <div className='h-2/5 w-fit gap-3 flex flex-col items-center justify-center'>
          <div className='flex w-full gap-2 text-[12px] text-white/80 items-start justify-start'>
            <button className='py-0.5 px-2 rounded-2xl border'>Development</button>
            <button className='py-0.5 px-2 rounded-2xl border'>Animations</button>
          </div>
          <div>
            <h4 className='effect relative whitespace-nowrap uppercase font-[League] text-6xl leading-10 md:text-[9rem] lg:text-[9rem] tracking-tighter md:leading-35 lg:leading-35'>{props.ProductName}</h4>
          </div>
        </div>
      </div>
    </div>
  )
}

export default StickyCard