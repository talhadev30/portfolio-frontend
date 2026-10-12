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
    graph.push({
      "@type": "WebPage",
      "@id": `${SITE_URL}/#webpage`,
      url: `${SITE_URL}/`,
      name: "Talha Salman | Full Stack Web Developer & MERN Specialist",
      description:
        "Portfolio of Talha Salman, Full Stack MERN Developer in Karachi specializing in React, Node.js, Express, MongoDB, and high-performance web applications.",
      isPartOf: { "@id": websiteId },
      about: { "@id": personId },
      inLanguage: "en",
    });
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

