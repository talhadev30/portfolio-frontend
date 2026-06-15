import FooterCenter from "./FooterCenter"
import FooterTop from "./FooterTop"

const Footer = () => {
  return (
    <div className='lg:px-20 px-6 py-40 z-10 min-h-screen w-full bg-mist-300 text-black fixed bottom-0 left-0 '>
      <FooterTop/>
      <FooterCenter/>
      <p className="m-10 text-center text-sm">© 2026 Talha Dev. All rights reserved. Powered by React. Hosted on Vercel.</p>
    </div>
  )
}

export default Footer
