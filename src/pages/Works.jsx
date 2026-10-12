import React from 'react'
import WorksCards from '../component/Works/WorksCards'
import WorksDetails from '../component/Works/WorksDetails'
import SeoHead from '../seo/SeoHead'

const Works = () => {
  return (
    <>
      <SeoHead path="/work" />
      <div className='relative text-white'>
        <WorksCards />
        <WorksDetails />
      </div>
    </>
  )
}

export default Works