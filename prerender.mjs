// prerender.mjs
// Runs AFTER `vite build`. Opens the built site in headless Chrome, waits for React
// to render, and saves the fully rendered HTML back into dist/ so crawlers get real
// content (H1, text, links, alt text) without having to run JavaScript.

import http from 'node:http';
import fs from 'node:fs/promises';
import path from 'node:path';
import puppeteer from 'puppeteer';

const DIST = path.resolve('dist');
const ROUTES = ['/']; // add more routes here if your portfolio has real pages, e.g. '/projects'

const MIME = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript',
  '.mjs': 'text/javascript',
  '.css': 'text/css',
  '.json': 'application/json',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.webp': 'image/webp',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
  '.pdf': 'application/pdf',
};

// Keep the original (unrendered) template so every route loads a clean SPA shell.
const template = await fs.readFile(path.join(DIST, 'index.html'));

const server = http.createServer(async (req, res) => {
  try {
    const urlPath = decodeURIComponent(new URL(req.url, 'http://localhost').pathname);
    const file = path.join(DIST, urlPath);
    if (!file.startsWith(DIST)) {
      res.writeHead(403);
      return res.end();
    }
    const stat = await fs.stat(file).catch(() => null);
    if (stat && stat.isFile() && path.basename(file) !== 'index.html') {
      res.writeHead(200, { 'Content-Type': MIME[path.extname(file)] || 'application/octet-stream' });
      return res.end(await fs.readFile(file));
    }
    // SPA fallback
    res.writeHead(200, { 'Content-Type': MIME['.html'] });
    res.end(template);
  } catch {
    res.writeHead(500);
    res.end();
  }
});

await new Promise((resolve) => server.listen(0, resolve));
const { port } = server.address();

const browser = await puppeteer.launch({
  headless: true,
  args: ['--no-sandbox', '--disable-setuid-sandbox'],
});

try {
  for (const route of ROUTES) {
    const page = await browser.newPage();
    await page.goto(`http://localhost:${port}${route}`, { waitUntil: 'networkidle0', timeout: 60000 });

    // Wait until React has replaced the static fallback with the real app.
    await page.waitForFunction(
      () => {
        const root = document.querySelector('#root');
        return root && root.children.length > 0 && !root.querySelector('[data-fallback]');
      },
      { timeout: 30000 }
    );

    const html = '<!DOCTYPE html>\n' + (await page.evaluate(() => document.documentElement.outerHTML));
    const outDir = route === '/' ? DIST : path.join(DIST, route);
    await fs.mkdir(outDir, { recursive: true });
    await fs.writeFile(path.join(outDir, 'index.html'), html);
    console.log(`prerendered ${route} (${html.length} bytes)`);
    await page.close();
  }
} finally {
  await browser.close();
  server.close();
}
