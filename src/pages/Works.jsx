import React from 'react'
import WorksCards from '../component/Works/WorksCards'
import WorksDetails from '../component/Works/WorksDetails'
import { Helmet } from 'react-helmet-async'

const Works = () => {
  return (
    <>
      <Helmet>
        <title>Featured Web Development Projects & Case Studies | Talha Salman</title>
        <meta
          name="description"
          content="Explore web development projects by Talha Salman: Banking System, Restaurant Web Apps, and School Portals built with React, Node.js, Express, and Tailwind CSS."
        />
        <meta
          name="keywords"
          content="Talha Salman Projects, Web Development Portfolio, React Projects, Node.js Applications, Banking System Web App, MERN Stack Projects, Frontend Developer, Web Developer Karachi"
        />
        <meta name="author" content="Talha Salman" />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://talhaportfolio.dpdns.org/work" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Featured Web Development Projects & Case Studies | Talha Salman" />
        <meta
          property="og:description"
          content="Explore web development projects by Talha Salman: Banking System, Restaurant Web Apps, and School Portals built with React, Node.js, Express, and Tailwind CSS."
        />
        <meta property="og:url" content="https://talhaportfolio.dpdns.org/work" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Featured Web Development Projects & Case Studies | Talha Salman" />
        <meta
          name="twitter:description"
          content="Explore web development projects by Talha Salman: Banking System, Restaurant Web Apps, and School Portals built with React, Node.js, Express, and Tailwind CSS."
        />
      </Helmet>
      <div className='relative text-white'>
        <WorksCards />
        <WorksDetails />
      </div>
    </>
  )
}

export default Works