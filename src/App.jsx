import React, { useCallback, useEffect, useRef, useState } from 'react'
import Navbar from './component/Navbar/Navbar'
import Home from './pages/Home'
import Loder from './component/Loder/Loder'
import { Route, Routes, useLocation } from 'react-router-dom'
import Works from './pages/Works'
import Info from './pages/Info'
import Contect from './pages/Contect'
import NotFound from './pages/NotFound'
import Lenis from 'lenis'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/all'
import Footer from './component/Footer/Footer'
import { prefersReducedMotion } from './utils/motion'
import PageRevealContext from './context/PageRevealContext'
import CursorFollower from './component/Cursor/CursorFollower'

gsap.registerPlugin(ScrollTrigger)

const App = () => {
  const location = useLocation()
  const lenisRef = useRef(null)
  const previousPath = useRef(location.pathname)
  const [loaderComplete, setLoaderComplete] = useState(false)
  const markLoaderComplete = useCallback(() => setLoaderComplete(true), [])

  useEffect(() => {
    if (prefersReducedMotion()) return undefined

    const lenis = new Lenis({
      duration: 1.5,
      smoothWheel: true,
    })
    lenisRef.current = lenis

    // Sync Lenis with ScrollTrigger
    lenis.on("scroll", ScrollTrigger.update)

    // GSAP ticker
    const update = (time) => {
      lenis.raf(time * 1000)
    }

    gsap.ticker.add(update)
    return () => {
      lenis.destroy()
      gsap.ticker.remove(update)
      lenisRef.current = null
    }
  }, [])

  useEffect(() => {
    if (previousPath.current === location.pathname) return undefined

    previousPath.current = location.pathname
    const frame = requestAnimationFrame(() => {
      if (lenisRef.current) {
        lenisRef.current.scrollTo(0, { immediate: true })
      } else {
        window.scrollTo({ top: 0, behavior: "auto" })
      }
      ScrollTrigger.refresh()
    })

    return () => cancelAnimationFrame(frame)
  }, [location.pathname])

  return (
    <div className='relative w-full bg-black text-white'>
      <CursorFollower />
      <a 
        href="#main-content" 
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-white focus:text-black focus:font-semibold focus:rounded focus:outline-none focus:ring-2 focus:ring-black"
      >
        Skip to main content
      </a>
      <Loder onComplete={markLoaderComplete} />
      <Navbar />
      <PageRevealContext.Provider value={{ loaderComplete, routeKey: location.key }}>
        <main id="main-content" tabIndex={-1} className='relative z-20 bg-black mb-[100vh]'>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/work' element={<Works />} />
            <Route path='/info' element={<Info />} />
            <Route path='/contact' element={<Contect />} />
            <Route path='*' element={<NotFound />} />
          </Routes>
        </main>
      </PageRevealContext.Provider>
      <Footer />
    </div>
  )
}

export default App
