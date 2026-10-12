/**
 * src/seo/schema.js
 * Single source of truth JSON-LD Structured Data generator.
 * Emits a single @graph per page with stable @id anchors and resolves all entity relationships.
 * Conforms 100% to visible page content and Google Search Central guidelines.
 */

import { SITE_URL, ROUTES } from "./routes";
import { OWNER, PROJECTS, SKILL_CATEGORIES } from "../data/portfolioData";

export const getJsonLdForRoute = (routePath) => {
  const normalized = routePath.replace(/\/$/, "") || "/";

  // Phase 5 & 12: 404 page must NOT contain structured data
  if (normalized === "/404" || normalized === "*") {
    return null;
  }

  const websiteId = `${SITE_URL}/#website`;
  const personId = `${SITE_URL}/#person`;

  // Base Person entity
  const allSkills = SKILL_CATEGORIES.flatMap((c) => c.items);
  const personEntity = {
    "@type": "Person",
    "@id": personId,
    name: OWNER.name,
    url: `${SITE_URL}/`,
    image: `${SITE_URL}/preview.png`,
    jobTitle: OWNER.shortRole,
    description: OWNER.bio,
    address: {
      "@type": "PostalAddress",
      addressLocality: OWNER.locality,
      addressCountry: OWNER.countryCode,
    },
    knowsAbout: allSkills,
    sameAs: OWNER.socials.map((s) => s.url),
  };

  // Base WebSite entity
  const websiteEntity = {
    "@type": "WebSite",
    "@id": websiteId,
    url: `${SITE_URL}/`,
    name: "Talha Salman Portfolio",
    inLanguage: "en",
    publisher: { "@id": personId },
  };

  const graph = [websiteEntity, personEntity];

  if (normalized === "/") {
    graph.push(
      {
        "@type": "WebPage",
        "@id": `${SITE_URL}/#webpage`,
        url: `${SITE_URL}/`,
        name: "Talha Salman | Full Stack Web Developer & MERN Specialist",
        description:
          "Portfolio of Talha Salman, Full Stack MERN Developer in Karachi specializing in React, Node.js, Express, MongoDB, and high-performance web applications.",
        isPartOf: { "@id": websiteId },
        about: { "@id": personId },
        inLanguage: "en",
      },
      {
        "@type": "FAQPage",
        "@id": `${SITE_URL}/#faq`,
        isPartOf: { "@id": `${SITE_URL}/#webpage` },
        mainEntity: [
          {
            "@type": "Question",
            name: "What does Talha Salman specialize in?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Talha Salman is a Full Stack Web Developer specializing in the MERN stack (MongoDB, Express.js, React, and Node.js), JavaScript (ES6+), and Tailwind CSS. He engineers responsive single-page applications, custom user interfaces, and scalable RESTful API backends.",
            },
          },
          {
            "@type": "Question",
            name: "Which web technologies and frameworks does Talha Salman use?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "On the frontend, Talha builds with React.js, Tailwind CSS, HTML5, CSS3, and GSAP animations. On the backend, he develops with Node.js, Express.js, PHP, and REST APIs with MongoDB and MySQL databases. His workflow tools include Git, GitHub, VS Code, Postman, Vite, and Vercel.",
            },
          },
          {
            "@type": "Question",
            name: "What featured web applications are in Talha Salman's portfolio?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Key portfolio projects include an Online Banking System built with React, Node.js, and JWT authentication; a Modern Restaurant & Food Ordering web application featuring interactive menus; and a School Management System administrative portal.",
            },
          },
          {
            "@type": "Question",
            name: "Is Talha Salman available for remote web development work?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Yes. Talha Salman is based in Karachi, Pakistan, and is available for worldwide remote work, freelance contract development, and technical consultations.",
            },
          },
          {
            "@type": "Question",
            name: "How can I contact Talha Salman for a project?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "You can send project inquiries through the contact page form on this website, or connect directly through verified profiles on GitHub (github.com/talhadev30) and LinkedIn (linkedin.com/in/m-talha-salman-66832839b).",
            },
          },
        ],
      }
    );
  } else if (normalized === "/work") {
    const itemListId = `${SITE_URL}/work#itemlist`;

    const projectEntities = PROJECTS.map((p, index) => {
      const creativeWork = {
        "@type": p.liveLink ? "WebApplication" : "CreativeWork",
        name: p.title,
        description: p.description,
        applicationCategory: p.category,
        author: { "@id": personId },
        image: `${SITE_URL}${p.image}`,
      };
      if (p.liveLink) {
        creativeWork.url = p.liveLink;
      }
      return {
        "@type": "ListItem",
        position: index + 1,
        item: creativeWork,
      };
    });

    graph.push(
      {
        "@type": "CollectionPage",
        "@id": `${SITE_URL}/work#webpage`,
        url: `${SITE_URL}/work`,
        name: "Featured Projects & Case Studies | Talha Salman",
        description:
          "Explore case studies and web apps by Talha Salman: Banking System, Food Ordering platform, and School portal built with React, Node.js, and modern tools.",
        isPartOf: { "@id": websiteId },
        inLanguage: "en",
        mainEntity: { "@id": itemListId },
      },
      {
        "@type": "ItemList",
        "@id": itemListId,
        name: "Featured Web Development Projects by Talha Salman",
        itemListElement: projectEntities,
      }
    );
  } else if (normalized === "/info") {
    graph.push({
      "@type": "ProfilePage",
      "@id": `${SITE_URL}/info#webpage`,
      url: `${SITE_URL}/info`,
      name: "About Talha Salman | Full Stack Web Developer",
      description:
        "Learn about Talha Salman, Full Stack Developer in Karachi, Pakistan. Explore engineering skills in React, Node.js, Express, MongoDB, PHP, and modern web.",
      isPartOf: { "@id": websiteId },
      mainEntity: { "@id": personId },
      inLanguage: "en",
    });
  } else if (normalized === "/contact") {
    graph.push({
      "@type": "ContactPage",
      "@id": `${SITE_URL}/contact#webpage`,
      url: `${SITE_URL}/contact`,
      name: "Contact Talha Salman | Hire Full Stack Developer",
      description:
        "Get in touch with Talha Salman for custom web development, React and Node.js applications, freelance contracts, and software engineering opportunities.",
      isPartOf: { "@id": websiteId },
      mainEntity: { "@id": personId },
      inLanguage: "en",
    });
  }

  return {
    "@context": "https://schema.org",
    "@graph": graph,
  };
};

export default getJsonLdForRoute;

