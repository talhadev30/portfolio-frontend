import React, { useEffect, useState } from 'react'
import Navbar from './component/Navbar/Navbar'
import Home from './pages/Home'
import Loder from './component/Loder/Loder'
import { Route, Routes } from 'react-router-dom'
import Works from './pages/Works'
import Info from './pages/Info'
import Contect from './pages/Contect'
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

    // GSAP ticker use karo instead of requestAnimationFrame
    const update = (time) => {
      lenis.raf(time * 1000)
    }

    gsap.ticker.add(update)
    gsap.ticker.lagSmoothing(0)

    // Cleanup (VERY IMPORTANT)
    return () => {
      lenis.destroy()
      gsap.ticker.remove(update)
    }
  }, [])
  //  useEffect(() => {

  //   const handleResize = () => {
  //     window.location.reload();
  //   };

  //   window.addEventListener("resize", handleResize);

  //   return () => {
  //     window.removeEventListener("resize", handleResize);
  //   };

  // }, []);

  return (
    <div className='relative w-full bg-black text-white'>
      {/* <Loder /> */}
      <Navbar />
      <main className='relative z-20 bg-black mb-[100vh]'>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/work' element={<Works />} />
          <Route path='/info' element={<Info />} />
          <Route path='/contect' element={<Contect />} />
        </Routes>
      </main>
      <Footer />
    </div>
  )
}

export default App