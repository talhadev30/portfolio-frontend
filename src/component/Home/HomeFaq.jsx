import React, { useState } from "react";
import { ChevronDown } from "lucide-react";

const FAQ_ITEMS = [
  {
    question: "What do you build?",
    answer:
      "I build web apps with React, JavaScript, and the MERN stack: MongoDB, Express, React, and Node.js. I also use Tailwind CSS and REST APIs.",
  },
  {
    question: "What tools do you use?",
    answer:
      "I use React, Tailwind CSS, HTML, and CSS for pages. I build APIs with Node.js, Express, and PHP, and store data in MongoDB or MySQL. My tools include Git, GitHub, VS Code, Postman, Vite, and Vercel.",
  },
  {
    question: "What projects have you built?",
    answer:
      "My portfolio includes a banking app, a restaurant ordering site, and a school portal. The banking app uses React, Node.js, and JWT sign-in.",
  },
  {
    question: "Are you open to remote work?",
    answer:
      "Yes. I am based in Karachi, Pakistan, and am open to remote work, freelance projects, and technical consulting.",
  },
  {
    question: "How can I contact you?",
    answer:
      "Use the contact form to tell me about your project. You can also reach me on GitHub or LinkedIn.",
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
            Got Questions?
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
