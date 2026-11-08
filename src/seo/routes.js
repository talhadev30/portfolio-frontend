/**
 * src/seo/routes.js
 * Single source of truth for all routes and SEO metadata.
 * Drives build-time head tags, pre-rendering, sitemap.xml, 404 links, and schema.
 * Note: H1 text lives exclusively within page components to prevent duplication.
 */

export const SITE_URL = "https://talhaportfolio.dpdns.org";
export const DEFAULT_OG_IMAGE = `${SITE_URL}/preview.webp`;
export const SITE_NAME = "Talha Salman Portfolio";
export const GOOGLE_VERIFICATION = "jpenjXttM1-wCHaXoCllG5oVsuszH_iX45n9h1jMCh0";

export const ROUTES = [
  {
    path: "/",
    name: "Home",
    title: "Talha Salman | Full-Stack Web Developer",
    description:
      "View web apps by Talha Salman, a Karachi-based developer who builds with React, Node.js, Express, and MongoDB.",
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
    title: "Web Development Projects | Talha Salman",
    description:
      "See web projects by Talha Salman, including banking, restaurant, and school apps built with React and Node.js.",
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
    title: "About Talha Salman | Web Developer in Karachi",
    description:
      "Meet Talha Salman, a web developer in Karachi. Explore his work with React, Node.js, PHP, and databases.",
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
    title: "Contact Talha Salman | Web Development",
    description:
      "Contact Talha Salman about websites, web apps, freelance projects, or software development roles.",
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
  description: "This page could not be found. Visit Talha Salman's projects, about page, or contact page.",
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

