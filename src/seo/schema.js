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
    image: `${SITE_URL}/preview.webp`,
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
        name: "Talha Salman | Full-Stack Web Developer",
        description:
          "View web apps by Talha Salman, a Karachi-based developer who builds with React, Node.js, Express, and MongoDB.",
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
            name: "What do you build?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "I build web apps with React, JavaScript, and the MERN stack: MongoDB, Express, React, and Node.js. I also use Tailwind CSS and REST APIs.",
            },
          },
          {
            "@type": "Question",
            name: "What tools do you use?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "I use React, Tailwind CSS, HTML, and CSS for pages. I build APIs with Node.js, Express, and PHP, and store data in MongoDB or MySQL. My tools include Git, GitHub, VS Code, Postman, Vite, and Vercel.",
            },
          },
          {
            "@type": "Question",
            name: "What projects have you built?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "My portfolio includes a banking app, a restaurant ordering site, and a school portal. The banking app uses React, Node.js, and JWT sign-in.",
            },
          },
          {
            "@type": "Question",
            name: "Are you open to remote work?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Yes. I am based in Karachi, Pakistan, and am open to remote work, freelance projects, and technical consulting.",
            },
          },
          {
            "@type": "Question",
            name: "How can I contact you?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Use the contact form to tell me about your project. You can also reach me on GitHub or LinkedIn.",
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
        name: "Web Development Projects | Talha Salman",
        description:
          "See web projects by Talha Salman, including banking, restaurant, and school apps built with React and Node.js.",
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
      name: "About Talha Salman | Web Developer in Karachi",
      description:
        "Meet Talha Salman, a web developer in Karachi. Explore his work with React, Node.js, PHP, and databases.",
      isPartOf: { "@id": websiteId },
      mainEntity: { "@id": personId },
      inLanguage: "en",
    });
  } else if (normalized === "/contact") {
    graph.push({
      "@type": "ContactPage",
      "@id": `${SITE_URL}/contact#webpage`,
      url: `${SITE_URL}/contact`,
      name: "Contact Talha Salman | Web Development",
      description:
        "Contact Talha Salman about websites, web apps, freelance projects, or software development roles.",
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

