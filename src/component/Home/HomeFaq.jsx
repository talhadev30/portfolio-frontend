import React, { useState } from "react";
import { ChevronDown } from "lucide-react";

const FAQ_ITEMS = [
  {
    question: "What does Talha Salman specialize in?",
    answer:
      "Talha Salman is a Full Stack Web Developer specializing in the MERN stack (MongoDB, Express.js, React, and Node.js), JavaScript (ES6+), and Tailwind CSS. He engineers responsive single-page applications, custom user interfaces, and scalable RESTful API backends.",
  },
  {
    question: "Which web technologies and frameworks does Talha Salman use?",
    answer:
      "On the frontend, Talha builds with React.js, Tailwind CSS, HTML5, CSS3, and GSAP animations. On the backend, he develops with Node.js, Express.js, PHP, and REST APIs with MongoDB and MySQL databases. His workflow tools include Git, GitHub, VS Code, Postman, Vite, and Vercel.",
  },
  {
    question: "What featured web applications are in Talha Salman's portfolio?",
    answer:
      "Key portfolio projects include an Online Banking System built with React, Node.js, and JWT authentication; a Modern Restaurant & Food Ordering web application featuring interactive menus; and a School Management System administrative portal.",
  },
  {
    question: "Is Talha Salman available for remote web development work?",
    answer:
      "Yes. Talha Salman is based in Karachi, Pakistan, and is available for worldwide remote work, freelance contract development, and technical consultations.",
  },
  {
    question: "How can I contact Talha Salman for a project?",
    answer:
      "You can send project inquiries through the contact page form on this website, or connect directly through verified profiles on GitHub (github.com/talhadev30) and LinkedIn (linkedin.com/in/m-talha-salman-66832839b).",
  },
];

export const HomeFaq = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFaq = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section aria-labelledby="faq-heading" className="w-full bg-black text-white py-20 px-6 md:px-16 lg:px-20 border-t border-white/10">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-14">
          <span className="text-xs uppercase tracking-widest text-zinc-400 font-semibold block mb-2">
            Frequently Asked Questions
          </span>
          <h2 id="faq-heading" className="font-[League] text-5xl sm:text-6xl md:text-7xl uppercase tracking-tighter">
            Frequently Asked Questions
          </h2>
          <p className="text-zinc-400 text-sm md:text-base mt-3 max-w-xl mx-auto">
            Direct answers to common questions about technical background, development stack, featured projects, and remote availability.
          </p>
        </div>

        <div className="space-y-4">
          {FAQ_ITEMS.map((item, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={index}
                className="rounded-2xl border border-white/10 bg-white/[0.02] overflow-hidden transition-colors hover:border-white/20"
              >
                <button
                  type="button"
                  id={`faq-btn-${index}`}
                  onClick={() => toggleFaq(index)}
                  aria-expanded={isOpen}
                  aria-controls={`faq-panel-${index}`}
                  className="w-full px-6 py-5 text-left flex items-center justify-between gap-4 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
                >
                  <span className="font-medium text-base sm:text-lg text-zinc-100">
                    {item.question}
                  </span>
                  <ChevronDown
                    size={20}
                    className={`text-zinc-400 shrink-0 transition-transform duration-300 ${
                      isOpen ? "rotate-180 text-emerald-400" : ""
                    }`}
                  />
                </button>
                <div
                  id={`faq-panel-${index}`}
                  role="region"
                  aria-labelledby={`faq-btn-${index}`}
                  className={`px-6 transition-all duration-300 ease-in-out ${
                    isOpen ? "max-h-96 pb-6 opacity-100" : "max-h-0 pb-0 opacity-0 overflow-hidden"
                  }`}
                >
                  <p className="text-zinc-300 text-sm sm:text-base leading-relaxed border-t border-white/5 pt-4">
                    {item.answer}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default HomeFaq;
