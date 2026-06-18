import React from 'react'
import WorksCards from '../component/Works/WorksCards'
import { Helmet } from 'react-helmet-async'

const Works = () => {
  return (
    <>
      <Helmet>
        <title>Projects & Portfolio | Talha dev</title>
        <meta
          name="description"
          content="Explore Talha dev's portfolio featuring React, JavaScript, and web development projects, showcasing technical skills and creative solutions."
        />
        <meta name="author" content="Talha Salman" />
        <meta name="robots" content="index, follow" />
        <meta property="og:type" content="website" />
      </Helmet>
      <div className='relative  text-white '>
        <WorksCards />
      </div>
    </>
  )
}

export default Works