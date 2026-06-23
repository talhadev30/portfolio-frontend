import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);


const Thirdinfo = () => {
  const skills = [
    {
      title: "Frontend",
      items: ["React", "JavaScript", "HTML5", "CSS3", "Tailwind CSS", "Gsap", "Framer Motion"],
    },
    {
      title: "Backend",
      items: ["Node.js", "Express.js", "REST APIs", "JWT Auth", "PHP"],
    },
    {
      title: "Database",
      items: ["MongoDB", "SQL"],
    },
    {
      title: "Tools",
      items: ["Git", "GitHub", "Vs Code" , "Postman"],
    },
  ];


  const cardsRef = useRef([]);
  const textref = useRef(null);
  const pararef = useRef(null);
  const containerref = useRef(null);

  useEffect(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
          trigger: containerref.current,
          start: "top 50%",
        },
    });
    
    tl.fromTo(textref.current,{
        opacity: 0,
        y: 80,
      },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: "power3.out",
      })
    tl.fromTo(pararef.current,{
        opacity: 0,
        y: 80,
      },
      {
        opacity: 1,
        y: 0,
        duration: 0.5,
        ease: "power3.out",
      })
    tl.fromTo(
      cardsRef.current,
      {
        opacity: 0,
        y: 80,
        scale: 0.95,
      },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 1,
        stagger: {
          each:0.4
        },
        ease: "power3.out",
      },"-=1.5");
  }, []);

  return (
    <section ref={containerref} className="w-full bg-black text-white py-24 px-6 md:px-19">
      <div className="mb-20 lg:w-1/2">
        <h2 ref={textref} className="uppercase mb-5 font-[League] text-6xl md:text-8xl lg:text-7xl tracking-tighter 2xl:text-8xl">
          TECHNOLOGIES <br />
          I WORK WITH
        </h2>
        <p ref={pararef} className="text-sm leading-relaxed text-zinc-300 py-5 md:text-2xl lg:text-sm 2xl:text-lg">  
          As a Full Stack Developer, I craft modern web applications that combine
          intuitive user experiences with scalable backend architecture. From
          responsive React interfaces to powerful APIs built with Node.js and PHP,
          I focus on creating fast, secure, and high-performance digital solutions.
          My goal is to transform ideas into impactful products that deliver real
          value to users and businesses.</p>

      </div>
  
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        {skills.map((skill, index) => (
          <div
            key={index}
            ref={(el) => (cardsRef.current[index] = el)}

            className="group relative overflow-hidden rounded-3xl border border-white/10 bg-white/3 backdrop-blur-md p-8 transition-all duration-500 hover:-translate-y-2 hover:border-gray-500"
          >
            {/* Glow */}
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
              <div className="absolute -top-20 -right-20 w-40 h-40 bg-gray-600 blur-3xl rounded-full" />
            </div>

            <span className="text-2xl text-shadow-gray-600 font-extrabold">
              {String(index + 1).padStart(2, "0")}
            </span>

            <h3 className="text-6xl font-[League] mt-4 mb-8">
              {skill.title}
            </h3>

            <div className="space-y-3">
              {skill.items.map((item, i) => (
                <div
                  key={i}
                  className="flex items-center gap-3 text-gray-100"
                >
                  <div className="w-2 h-2 rounded-full bg-gray-500 " />
                  {item}
                </div>
              ))}
            </div>

            <div className="mt-8 pt-6 border-t border-white/10">
              <span className="text-gray-500 text-sm">
                {skill.items.length} Technologies
              </span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Thirdinfo;