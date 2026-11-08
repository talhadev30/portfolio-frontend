// prerender.mjs
// Build-time Static Site Generator (SSG) for talhaportfolio.dpdns.org
// Pre-renders every indexable route and custom 404 page into complete, crawlable HTML.
// Operates seamlessly locally and on Vercel without requiring headless Chrome.

import fs from "node:fs/promises";
import path from "node:path";
import { createServer } from "vite";

const DIST = path.resolve("dist");
const PUBLIC = path.resolve("public");

const countTags = (html, pattern) => html.match(pattern)?.length ?? 0;

const validateRouteHead = (route, head) => {
  const expected = {
    title: 1,
    description: 1,
    robots: 1,
    canonical: route.canonical ? 1 : 0,
  };
  const actual = {
    title: countTags(head, /<title\b/gi),
    description: countTags(
      head,
      /<meta\b(?=[^>]*\bname=["']description["'])/gi,
    ),
    robots: countTags(head, /<meta\b(?=[^>]*\bname=["']robots["'])/gi),
    canonical: countTags(head, /<link\b(?=[^>]*\brel=["']canonical["'])/gi),
  };

  for (const key of Object.keys(expected)) {
    if (actual[key] !== expected[key]) {
      throw new Error(
        `Invalid head metadata for ${route.path}: expected ${expected[key]} ${key} tag(s), found ${actual[key]}`,
      );
    }
  }
};

async function run() {
  console.log("[SSG] Starting build-time static HTML pre-rendering...");

  const templatePath = path.join(DIST, "index.html");
  let baseTemplate;
  try {
    baseTemplate = await fs.readFile(templatePath, "utf8");
  } catch (err) {
    console.error("[SSG Error] Failed to read dist/index.html:", err.message);
    process.exit(1);
  }

  // Create an on-the-fly Vite server instance in middleware mode to load server-rendered modules
  const vite = await createServer({
    server: { middlewareMode: true },
    appType: "custom",
  });

  try {
    const { render } = await vite.ssrLoadModule("/src/entry-server.jsx");
    const { ROUTES, NOT_FOUND_ROUTE, SITE_URL } =
      await vite.ssrLoadModule("/src/seo/routes.js");
    const { getJsonLdForRoute } =
      await vite.ssrLoadModule("/src/seo/schema.js");

    const allRoutesToRender = [...ROUTES, NOT_FOUND_ROUTE];

    for (const route of allRoutesToRender) {
      console.log(`[SSG] Rendering route: ${route.path} ...`);

      let appHtml = "";
      let routeHead = "";
      try {
        const result = render(route.path);
        appHtml = result.html || "";
        routeHead = result.head || "";
      } catch (renderErr) {
        console.warn(
          `[SSG Warning] SSR render issue on ${route.path}:`,
          renderErr.message,
        );
      }
      validateRouteHead(route, routeHead);

      let html = baseTemplate;

      // 1. Inject rendered HTML into #root
      if (html.includes('<div id="root"></div>')) {
        html = html.replace(
          '<div id="root"></div>',
          `<div id="root">${appHtml}</div>`,
        );
      } else {
        html = html.replace(
          /<div id="root">[\s\S]*?<\/div>/,
          `<div id="root">${appHtml}</div>`,
        );
      }

      // Remove any template metadata managed by React Helmet, then inject the
      // route-specific server-rendered tags exactly once inside <head>.
      html = html
        .replace(/<title\b[^>]*>[\s\S]*?<\/title>\s*/gi, "")
        .replace(
          /<meta\b(?=[^>]*\bname=["'](?:description|robots|twitter:[^"']+)["'])[^>]*>\s*/gi,
          "",
        )
        .replace(
          /<meta\b(?=[^>]*\bproperty=["']og:[^"']+["'])[^>]*>\s*/gi,
          "",
        )
        .replace(
          /<link\b(?=[^>]*\brel=["']canonical["'])[^>]*>\s*/gi,
          "",
        )
        .replace(
          /<script\b(?=[^>]*\btype=["']application\/ld\+json["'])[^>]*>[\s\S]*?<\/script>\s*/gi,
          "",
        );

      // Structured Data JSON-LD
      const schemaData = getJsonLdForRoute(route.path);
      let schemaTag = "";
      if (schemaData) {
        const schemaString = JSON.stringify(schemaData, null, 2);
        schemaTag = `  <script type="application/ld+json">\n${schemaString}\n  </script>`;
      }

      const headMarkup = [routeHead, schemaTag].filter(Boolean).join("\n");
      if (!html.includes("</head>")) {
        throw new Error(`HTML template is missing </head> for ${route.path}`);
      }
      html = html.replace("</head>", `${headMarkup}\n</head>`);

      // 10. Write file
      if (route.path === "/") {
        await fs.writeFile(path.join(DIST, "index.html"), html, "utf8");
        console.log(`[SSG] Written dist/index.html (${html.length} bytes)`);
      } else if (route.path === "/404") {
        await fs.writeFile(path.join(DIST, "404.html"), html, "utf8");
        console.log(`[SSG] Written dist/404.html (${html.length} bytes)`);
      } else {
        const routeSubdir = path.join(DIST, route.path.slice(1));
        await fs.mkdir(routeSubdir, { recursive: true });
        await fs.writeFile(path.join(routeSubdir, "index.html"), html, "utf8");
        // Also write flat html for servers that serve /work.html
        await fs.writeFile(
          path.join(DIST, `${route.path.slice(1)}.html`),
          html,
          "utf8",
        );
        console.log(
          `[SSG] Written dist/${route.path.slice(1)}/index.html & ${route.path.slice(1)}.html (${html.length} bytes)`,
        );
      }
    }

    // Generate sitemap.xml
    const sitemapContent = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${ROUTES.map(
  (r) => `  <url>
    <loc>${r.canonical}</loc>
    <changefreq>${r.changefreq || "monthly"}</changefreq>
    <priority>${r.priority || "0.8"}</priority>
  </url>`,
).join("\n")}
</urlset>
`;
    await fs.writeFile(
      path.join(DIST, "sitemap.xml"),
      sitemapContent.trim(),
      "utf8",
    );
    await fs.writeFile(
      path.join(PUBLIC, "sitemap.xml"),
      sitemapContent.trim(),
      "utf8",
    );
    console.log(
      `[SSG] Generated sitemap.xml with ${ROUTES.length} indexable URLs`,
    );

    // Generate robots.txt
    const robotsContent = `# robots.txt for https://talhaportfolio.dpdns.org/
User-agent: *
Allow: /

# Search Engine Crawlers
User-agent: Googlebot
Allow: /

User-agent: Bingbot
Allow: /

# AI Answer Engines & Search Bots
User-agent: OAI-SearchBot
Allow: /

User-agent: ChatGPT-User
Allow: /

User-agent: Claude-SearchBot
Allow: /

User-agent: Claude-User
Allow: /

User-agent: PerplexityBot
Allow: /

User-agent: Perplexity-User
Allow: /

# AI Model Training & Grounding
User-agent: GPTBot
Allow: /

User-agent: ClaudeBot
Allow: /

User-agent: Google-Extended
Allow: /

User-agent: Applebot-Extended
Allow: /

User-agent: CCBot
Allow: /

Sitemap: ${SITE_URL}/sitemap.xml
`;
    await fs.writeFile(
      path.join(DIST, "robots.txt"),
      robotsContent.trim(),
      "utf8",
    );
    await fs.writeFile(
      path.join(PUBLIC, "robots.txt"),
      robotsContent.trim(),
      "utf8",
    );
    console.log("[SSG] Generated robots.txt");

    // Generate llms.txt (Phase 11)
    const llmsContent = `# Talha Salman — Portfolio

> Full Stack Web Developer & MERN Specialist based in Karachi, Pakistan.
> Specializing in React, Node.js, Express, MongoDB, RESTful APIs, and modern web application development.

## Core Information
- Name: Talha Salman
- Role: Full Stack Web Developer / Software Engineer
- Location: Karachi, Pakistan (Available for Worldwide Remote Work)
- GitHub: https://github.com/talhadev30
- LinkedIn: https://www.linkedin.com/in/m-talha-salman-66832839b

## Key Pages
- Homepage: ${SITE_URL}/
- Featured Projects & Case Studies: ${SITE_URL}/work
- About & Technical Skills: ${SITE_URL}/info
- Contact & Freelance Inquiries: ${SITE_URL}/contact

## Featured Projects
- Online Banking System: Full-stack React and Node.js banking web application with secure transactions. Live: https://talha-banking-system.vercel.app/
- Restaurant & Food Ordering Platform: Responsive food ordering showcase with dynamic menu filtering.
- School Management System Portal: Role-based dashboard portal for students, teachers, and administration.
`;
    await fs.writeFile(path.join(DIST, "llms.txt"), llmsContent.trim(), "utf8");
    await fs.writeFile(
      path.join(PUBLIC, "llms.txt"),
      llmsContent.trim(),
      "utf8",
    );
    console.log("[SSG] Generated llms.txt");

    console.log("[SSG] Pre-rendering complete!");
  } finally {
    await vite.close();
  }
}

run().catch((err) => {
  console.error("[SSG Fatal Error]:", err);
  process.exit(1);
});
