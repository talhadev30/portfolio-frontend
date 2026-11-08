import React from 'react';
import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import App from './App.jsx';
import { getRouteMetadata, SITE_NAME } from './seo/routes.js';

function generateFallbackHead(url) {
  const meta = getRouteMetadata(url);
  const tags = [
    `<title>${meta.title}</title>`,
    `<meta name="description" content="${meta.description}"/>`,
    `<meta name="robots" content="${meta.robots}"/>`,
    meta.canonical ? `<link rel="canonical" href="${meta.canonical}"/>` : '',
    `<meta property="og:site_name" content="${SITE_NAME}"/>`,
    `<meta property="og:type" content="${meta.ogType || 'website'}"/>`,
    `<meta property="og:title" content="${meta.title}"/>`,
    `<meta property="og:description" content="${meta.description}"/>`,
    meta.canonical ? `<meta property="og:url" content="${meta.canonical}"/>` : '',
    meta.ogImage ? `<meta property="og:image" content="${meta.ogImage}"/>` : '',
    meta.ogImageAlt ? `<meta property="og:image:alt" content="${meta.ogImageAlt}"/>` : '',
    `<meta property="og:locale" content="en_US"/>`,
    `<meta name="twitter:card" content="summary_large_image"/>`,
    `<meta name="twitter:title" content="${meta.title}"/>`,
    `<meta name="twitter:description" content="${meta.description}"/>`,
    meta.ogImage ? `<meta name="twitter:image" content="${meta.ogImage}"/>` : '',
    meta.ogImageAlt ? `<meta name="twitter:image:alt" content="${meta.ogImageAlt}"/>` : '',
  ];
  return tags.filter(Boolean).join("\n");
}

/**
 * Server-side entry for build-time static pre-rendering (SSG).
 * Renders the full React component tree for a given route URL into static HTML string.
 */
function extractHoistedHeadTags(renderedHtml) {
  const headTags = [];
  let bodyHtml = renderedHtml;

  // React 19 hoists head tags (<title>, <meta>, <link>, <style>, <script>)
  // to the beginning of renderToString output.
  const tagPattern =
    /^\s*(<(?:title\b[^>]*>[\s\S]*?<\/title>|meta\b[^>]*\/?>|link\b[^>]*\/?>|style\b[^>]*>[\s\S]*?<\/style>|script\b[^>]*>[\s\S]*?<\/script>))/i;

  let match;
  while ((match = bodyHtml.match(tagPattern))) {
    headTags.push(match[1]);
    bodyHtml = bodyHtml.slice(match[0].length);
  }

  return {
    head: headTags.join("\n"),
    html: bodyHtml,
  };
}

/**
 * Server-side entry for build-time static pre-rendering (SSG).
 * Renders the full React component tree for a given route URL into static HTML string.
 */
export function render(url, helmetContext = {}) {
  let html = renderToString(
    <HelmetProvider context={helmetContext}>
      <StaticRouter location={url}>
        <App />
      </StaticRouter>
    </HelmetProvider>
  );

  const { helmet } = helmetContext;
  let head = helmet
    ? ["title", "meta", "link", "script"]
        .map((tagName) => helmet[tagName]?.toString() ?? "")
        .filter(Boolean)
        .join("\n")
    : "";

  // In React 19, react-helmet-async acts as a passthrough and React natively
  // hoists <title>, <meta>, and <link> to the beginning of renderToString output.
  // Extract them so head contains the metadata and html contains only the body.
  if (!head && html) {
    const extracted = extractHoistedHeadTags(html);
    if (extracted.head) {
      head = extracted.head;
      html = extracted.html;
    }
  }

  // Fallback to route metadata if head tags were not populated
  if (!head || !/<title\b/i.test(head)) {
    head = generateFallbackHead(url);
  }

  return { html, head };
}

export default render;

