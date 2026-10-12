import React from 'react';
import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import App from './App.jsx';

/**
 * Server-side entry for build-time static pre-rendering (SSG).
 * Renders the full React component tree for a given route URL into static HTML string.
 */
export function render(url, helmetContext = {}) {
  const html = renderToString(
    <HelmetProvider context={helmetContext}>
      <StaticRouter location={url}>
        <App />
      </StaticRouter>
    </HelmetProvider>
  );

  return { html };
}

export default render;

