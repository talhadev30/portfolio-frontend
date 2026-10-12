/**
 * src/seo/routes.js
 * Single source of truth for all routes and SEO metadata.
 * Drives build-time head tags, pre-rendering, sitemap.xml, 404 links, and schema.
 * Note: H1 text lives exclusively within page components to prevent duplication.
 */

export const SITE_URL = "https://talhaportfolio.dpdns.org";
export const DEFAULT_OG_IMAGE = `${SITE_URL}/preview.png`;
export const SITE_NAME = "Talha Salman Portfolio";
export const GOOGLE_VERIFICATION = "jpenjXttM1-wCHaXoCllG5oVsuszH_iX45n9h1jMCh0";

export const ROUTES = [
  {
    path: "/",
    name: "Home",
    title: "Talha Salman | Full Stack Web Developer & MERN Specialist",
    description:
      "Portfolio of Talha Salman, Full Stack MERN Developer in Karachi specializing in React, Node.js, Express, MongoDB, and high-performance web applications.",
    canonical: `${SITE_URL}/`,
    robots: "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1",
    ogType: "website",
    schemaType: "WebPage",
    ogImage: DEFAULT_OG_IMAGE,
    ogImageAlt: "Talha Salman Full Stack Developer Portfolio Preview",
    changefreq: "monthly",
    priority: "1.0",
  },
  {
    path: "/work",
    name: "Works",
    title: "Featured Projects & Case Studies | Talha Salman",
    description:
      "Explore case studies and web apps by Talha Salman: Banking System, Food Ordering platform, and School portal built with React, Node.js, and modern tools.",
    canonical: `${SITE_URL}/work`,
    robots: "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1",
    ogType: "website",
    schemaType: "CollectionPage",
    ogImage: DEFAULT_OG_IMAGE,
    ogImageAlt: "Talha Salman Featured Web Development Projects and Case Studies",
    changefreq: "monthly",
    priority: "0.9",
  },
  {
    path: "/info",
    name: "Info",
    title: "About Talha Salman | Full Stack Web Developer",
    description:
      "Learn about Talha Salman, Full Stack Developer in Karachi, Pakistan. Explore engineering skills in React, Node.js, Express, MongoDB, PHP, and modern web.",
    canonical: `${SITE_URL}/info`,
    robots: "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1",
    ogType: "profile",
    schemaType: "ProfilePage",
    ogImage: DEFAULT_OG_IMAGE,
    ogImageAlt: "About Talha Salman Full Stack Software Engineer",
    changefreq: "monthly",
    priority: "0.8",
  },
  {
    path: "/contact",
    name: "Contact",
    title: "Contact Talha Salman | Hire Full Stack Developer",
    description:
      "Get in touch with Talha Salman for custom web development, React and Node.js applications, freelance contracts, and software engineering opportunities.",
    canonical: `${SITE_URL}/contact`,
    robots: "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1",
    ogType: "website",
    schemaType: "ContactPage",
    ogImage: DEFAULT_OG_IMAGE,
    ogImageAlt: "Contact Talha Salman for Web Development Projects",
    changefreq: "monthly",
    priority: "0.8",
  },
];

export const NOT_FOUND_ROUTE = {
  path: "/404",
  name: "Page Not Found",
  title: "Page Not Found | Talha Salman",
  description: "The requested page could not be found. Explore Talha Salman's portfolio projects, skills, or contact info.",
  canonical: null,
  robots: "noindex, follow",
  ogType: "website",
  schemaType: null,
  ogImage: DEFAULT_OG_IMAGE,
};

export const getRouteMetadata = (path) => {
  const normalized = path.replace(/\/$/, "") || "/";
  return ROUTES.find((r) => r.path === normalized) || NOT_FOUND_ROUTE;
};

export default ROUTES;

