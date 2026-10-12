import React from "react";
import { Helmet } from "react-helmet-async";
import { getRouteMetadata, SITE_NAME } from "./routes";

/**
 * Single source of truth React Helmet head manager.
 * Takes the route path and dynamically emits title, description, canonical, robots, OG, and Twitter tags.
 * Explicitly removes all obsolete meta keywords tags.
 */
export const SeoHead = ({ path }) => {
  const meta = getRouteMetadata(path);

  return (
    <Helmet>
      <title>{meta.title}</title>
      <meta name="description" content={meta.description} />
      <meta name="robots" content={meta.robots} />
      {meta.canonical && <link rel="canonical" href={meta.canonical} />}

      {/* Open Graph */}
      <meta property="og:site_name" content={SITE_NAME} />
      <meta property="og:type" content={meta.ogType} />
      <meta property="og:title" content={meta.title} />
      <meta property="og:description" content={meta.description} />
      {meta.canonical && <meta property="og:url" content={meta.canonical} />}
      {meta.ogImage && <meta property="og:image" content={meta.ogImage} />}
      {meta.ogImageAlt && <meta property="og:image:alt" content={meta.ogImageAlt} />}
      <meta property="og:locale" content="en_US" />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={meta.title} />
      <meta name="twitter:description" content={meta.description} />
      {meta.ogImage && <meta name="twitter:image" content={meta.ogImage} />}
      {meta.ogImageAlt && <meta name="twitter:image:alt" content={meta.ogImageAlt} />}
    </Helmet>
  );
};

export default SeoHead;

