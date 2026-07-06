import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import React, { useEffect, useRef, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import Navlink from './Navlink'
import Sociallink from './Sociallink'
import Cvbutton from './Cvbutton'

const Navbar = (props) => {
  const [open, setOpen] = useState(false)
  const rotater = useRef(null)
  const rotaters = useRef(null)
  const hamburger = useRef(null)
  const Buttonref = useRef(null)
  const locaation = useLocation()

  
  useEffect(() => {
    closeMenu();
    setOpen(false);
  }, [locaation]);

  const openMenu = () => {
    gsap.to(rotater.current, {
      y: 6,
      rotation: 40,
      duration: 0.8,
    });

    gsap.to(rotaters.current, {
      y: -6,
      rotation: -40,
      duration: 0.8,
    });

    gsap.to(hamburger.current, {
      y: "100%",
      ease: "power3.in",
    });

    gsap.to("nav", { color: "#000" , });
    gsap.to(Buttonref.current, { color: "#000" , borderColor : "#000" });

    gsap.to([rotater.current, rotaters.current], {
      background: "black",
    });

    gsap.fromTo('.split', {
      perspective: 1000,
      rotateX: 90,
      transformStyle: "preserve-3d",
      ease: "power3.out",
    }, {
      rotateX: 0,
      stagger: 0.04,
      ease: "power3.out",
      delay: 0.6,
      transformOrigin: "0% 100% -50px",

    })
  };
  const closeMenu = () => {
    gsap.to(rotater.current, {
      y: 0,
      rotation: 0,
      duration: 0.8,
    });

    gsap.to(rotaters.current, {
      y: 0,
      rotation: 0,
      duration: 0.8,
    });

    gsap.to(hamburger.current, {
      y: "0%",
      ease: "power4.out",
    });

    gsap.to("nav", { color: "#fff" });
    gsap.to(Buttonref.current, { color: "#fff" , borderColor : "#fff" });


    gsap.to([rotater.current, rotaters.current], {
      background: "white",
    });
  };
  const menuanimation = () => {

    if (open) {
      closeMenu();
    } else {
      openMenu();
    }

    setOpen(!open);
  };

  return (
    <>
      <nav className='h-14 w-full px-5 lg:px-20 flex font-[League] items-center py-10 justify-between z-40 pointer-coarse: fixed top-0 left-0'>
        <h1 className='text-3xl font-medium hover:text-zz'>Talha</h1>
        <div className='flex items-center  justify-center'>
          <div ref={Buttonref} className='flex items-center justify-center'>
            <Cvbutton />
            </div>
        <div onClick={menuanimation} className='gap-2 p-5 flex flex-col items-center justify-center'>
          <div ref={rotater} className='h-1 w-12 bg-white'></div>
          <div ref={rotaters} className='h-1 w-12 bg-white'></div>
        </div>
        </div>
      </nav>
      <div ref={hamburger} className='pointer-events-auto lg:max-h-screen h-[110%] w-full z-35 bg-mist-300 fixed -top-[110%] lg:-top-full  font-[League] text-black overflow-y-hidden'>
        <div className="wraper relative w-full h-full px-5 py-25 lg:px-20 top-0 left-0">
          <div className='w-full mb-5 lg:mb-16 gap-5 md:flex-row lg:flex-row flex-col flex items-start lg:items-center justify-between lg:overflow-hidden md:overflow-hidden overflow-visible'>
            <Navlink name="Home" path="/" />
            <Navlink name="Works" path="/work" />
          </div>
          <div className='w-full mb-5 lg:mb-16 gap-5 md:flex-row lg:flex-row flex-col flex items-start lg:items-center justify-between md:overflow-hidden lg:overflow-hidden overflow-visible'>
            <Navlink name="Info" path="/info" />
            <Navlink name="Contact" path="/contact" />
          </div>
          <div className='border-t-4 flex lg:flex-row items-start justify-start lg:justify-between py-5 flex-wrap gap-y-10 gap-20'>
            <Sociallink name="facebook" label='facebook profile' Link="https://www.facebook.com/profile.php?id=61589720709211" />
            <Sociallink name="instagram" label='instagram profile' Link="https://www.instagram.com/talha.dev30/" />
            <Sociallink name="linkedin" label='linkdin profile' Link="https://www.linkedin.com/in/m-talha-salman-66832839b" />
            <Sociallink name="github" label='github profile' Link="https://www.github.com/talha2343" />
          </div>
        </div>
      </div>
    </>
  )
}

export default Navbar