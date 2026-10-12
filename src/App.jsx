import React, { useEffect, useState } from 'react'
import Navbar from './component/Navbar/Navbar'
import Home from './pages/Home'
import Loder from './component/Loder/Loder'
import { Route, Routes } from 'react-router-dom'
import Works from './pages/Works'
import Info from './pages/Info'
import Contect from './pages/Contect'
import NotFound from './pages/NotFound'
import Lenis from 'lenis'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/all'
import Footer from './component/Footer/Footer'

const App = () => {

  gsap.registerPlugin(ScrollTrigger)

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.5,
      smooth: true
    })

    // Sync Lenis with ScrollTrigger
    lenis.on("scroll", ScrollTrigger.update)

    // GSAP ticker
    const update = (time) => {
      lenis.raf(time * 1000)
    }

    gsap.ticker.add(update)
    gsap.ticker.lagSmoothing(0)

    // Cleanup
    return () => {
      lenis.destroy()
      gsap.ticker.remove(update)
    }
  }, [])

  return (
    <div className='relative w-full bg-black text-white'>
      <a 
        href="#main-content" 
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-white focus:text-black focus:font-semibold focus:rounded focus:outline-none focus:ring-2 focus:ring-black"
      >
        Skip to main content
      </a>
      <Loder />
      <Navbar />
      <main id="main-content" className='relative z-20 bg-black mb-[100vh]'>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/work' element={<Works />} />
          <Route path='/info' element={<Info />} />
          <Route path='/contact' element={<Contect />} />
          <Route path='*' element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
    </div>
  )
}

export default App