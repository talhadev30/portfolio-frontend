import React, { useCallback, useEffect, useRef, useState } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { Link, useLocation } from 'react-router-dom'
import Navlink from './Navlink'
import Sociallink from './Sociallink'
import Cvbutton from './Cvbutton'
import { OWNER } from '../../data/portfolioData'
import { prefersReducedMotion, scrollToTop } from '../../utils/motion'

const Navbar = () => {
  const [openPath, setOpenPath] = useState(null)
  const location = useLocation()
  const open = openPath === location.pathname
  const rotater = useRef(null)
  const rotaters = useRef(null)
  const hamburger = useRef(null)
  const buttonRef = useRef(null)
  const menuButtonRef = useRef(null)
  const navRef = useRef(null)
  const wasOpen = useRef(false)
  const { contextSafe } = useGSAP({ scope: hamburger })

  const openMenu = useCallback(() => {
    contextSafe(() => {
      const reducedMotion = prefersReducedMotion()
      const duration = reducedMotion ? 0 : 0.8
      const menuLinks = hamburger.current?.querySelectorAll('.split')

      gsap.to(rotater.current, { y: 6, rotation: 40, duration })
      gsap.to(rotaters.current, { y: -6, rotation: -40, duration })
      gsap.to(hamburger.current, {
        y: '100%',
        duration: reducedMotion ? 0 : 0.5,
        ease: 'power3.in',
      })
      gsap.to(navRef.current, { color: '#000' })
      gsap.to(buttonRef.current, { color: '#000', borderColor: '#000' })
      gsap.to([rotater.current, rotaters.current], { background: 'black' })

      if (reducedMotion) {
        gsap.set(menuLinks, { rotateX: 0 })
      } else {
        gsap.fromTo(menuLinks, {
          perspective: 1000,
          rotateX: 90,
          transformStyle: 'preserve-3d',
          ease: 'power3.out',
        }, {
          rotateX: 0,
          stagger: 0.04,
          duration: 0.6,
          ease: 'power3.out',
          delay: 0.6,
          transformOrigin: '0% 100% -50px',
        })
      }
    })()
  }, [contextSafe])

  const closeMenu = useCallback(() => {
    contextSafe(() => {
      const duration = prefersReducedMotion() ? 0 : 0.8

      gsap.to(rotater.current, { y: 0, rotation: 0, duration })
      gsap.to(rotaters.current, { y: 0, rotation: 0, duration })
      gsap.to(hamburger.current, {
        y: '0%',
        duration: prefersReducedMotion() ? 0 : 0.5,
        ease: 'power4.out',
      })
      gsap.to(navRef.current, { color: '#fff' })
      gsap.to(buttonRef.current, { color: '#fff', borderColor: '#fff' })
      gsap.to([rotater.current, rotaters.current], { background: 'white' })
    })()
  }, [contextSafe])

  useEffect(() => {
    closeMenu()
  }, [location.pathname, closeMenu])

  useEffect(() => {
    if (open) {
      hamburger.current?.querySelector('a[href]:not([tabindex="-1"])')?.focus()
    } else if (wasOpen.current) {
      menuButtonRef.current?.focus()
    }
    wasOpen.current = open
  }, [open])

  useEffect(() => {
    if (!open) return undefined

    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    return () => {
      document.body.style.overflow = previousOverflow
    }
  }, [open])

  useEffect(() => {
    if (!open) return undefined

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        setOpenPath(null)
        closeMenu()
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [open, closeMenu])

  useEffect(() => {
    const closeOnHistoryNavigation = () => {
      setOpenPath(null)
      closeMenu()
    }

    window.addEventListener('popstate', closeOnHistoryNavigation)
    return () => window.removeEventListener('popstate', closeOnHistoryNavigation)
  }, [closeMenu])

  const handleMenuKeyDown = (event) => {
    if (event.key !== 'Tab') return

    const focusable = Array.from(
      hamburger.current?.querySelectorAll('a[href]:not([tabindex="-1"]), button:not([disabled])') ?? [],
    )
    if (focusable.length === 0) return

    const first = focusable[0]
    const last = focusable[focusable.length - 1]

    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault()
      last.focus()
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault()
      first.focus()
    }
  }

  const closeAfterNavigation = () => {
    setOpenPath(null)
    closeMenu()
  }

  const menuanimation = () => {
    if (open) {
      setOpenPath(null)
      closeMenu()
    } else {
      setOpenPath(location.pathname)
      openMenu()
    }
  }

  return (
    <>
      <nav ref={navRef} aria-label="Main Navigation" className='h-14 w-full px-5 lg:px-20 flex font-[League] items-center py-10 justify-between z-40 pointer-coarse: fixed top-0 left-0'>
        <Link to="/" onClick={scrollToTop} aria-label="Talha Salman Home" className='text-3xl font-medium hover:text-zz'>Talha</Link>
        <div className='flex items-center justify-center'>
          <div ref={buttonRef} className='flex items-center justify-center'>
            <Cvbutton />
          </div>
          <button
            ref={menuButtonRef}
            type="button"
            onClick={menuanimation}
            aria-label={open ? "Close navigation menu" : "Open navigation menu"}
            aria-expanded={open}
            aria-controls="mobile-navigation"
            className='gap-2 p-5 flex flex-col items-center justify-center cursor-pointer bg-transparent border-0 focus:outline-none focus-visible:ring-2 focus-visible:ring-white rounded'
          >
            <span ref={rotater} className='h-1 w-12 bg-white block'></span>
            <span ref={rotaters} className='h-1 w-12 bg-white block'></span>
          </button>
        </div>
      </nav>
      <div
        id="mobile-navigation"
        ref={hamburger}
        role={open ? "dialog" : undefined}
        aria-label={open ? "Site navigation" : undefined}
        aria-modal={open ? "true" : undefined}
        aria-hidden={!open}
        inert={!open}
        onKeyDown={handleMenuKeyDown}
        data-lenis-prevent
        className='pointer-events-auto lg:max-h-screen h-[110%] w-full z-35 bg-mist-300 fixed -top-[110%] lg:-top-full font-[League] text-black overflow-y-auto'
      >
        <div className="wraper relative w-full h-full px-5 py-25 lg:px-20 top-0 left-0">
          <div className='w-full mb-5 lg:mb-16 gap-5 md:flex-row lg:flex-row flex-col flex items-start lg:items-center justify-between lg:overflow-hidden md:overflow-hidden overflow-visible'>
            <Navlink name="Home" path="/" onNavigate={closeAfterNavigation} />
            <Navlink name="Works" path="/work" onNavigate={closeAfterNavigation} />
          </div>
          <div className='w-full mb-5 lg:mb-16 gap-5 md:flex-row lg:flex-row flex-col flex items-start lg:items-center justify-between md:overflow-hidden lg:overflow-hidden overflow-visible'>
            <Navlink name="Info" path="/info" onNavigate={closeAfterNavigation} />
            <Navlink name="Contact" path="/contact" onNavigate={closeAfterNavigation} />
          </div>
          <div className='border-t-4 flex lg:flex-row items-start justify-start lg:justify-between py-5 flex-wrap gap-y-10 gap-20'>
            {OWNER.socials.map((social) => (
              <Sociallink key={social.name} name={social.name.toLowerCase()} label={social.label} Link={social.url} />
            ))}
          </div>
        </div>
      </div>
    </>
  )
}

export default Navbar;
