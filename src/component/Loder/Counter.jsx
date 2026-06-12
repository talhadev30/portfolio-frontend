import React, { useEffect, useState } from 'react'

const Counter = () => {
    const [count, setCount] = useState(0);

  useEffect(() => {
   const intevarl = setInterval(()=>{
    setCount((prev)=>{
        if(prev === 100){
            clearInterval(intevarl)
            return prev
        }
        return prev + 1
    })
   },50)
   return()=> clearInterval(intevarl)
  }, []);
  return (
    <div className='gap-4 flex items-center justify-between flex-col'>
        <h1 className='font-[League] text-4xl'>{count}</h1>
        <div className='h-5 w-50'>
            <div className='h-2 bg-white rounded-2xl' style={{ width: `${count}%` }}></div>
        </div>
    </div>
  )
}

export default Counter