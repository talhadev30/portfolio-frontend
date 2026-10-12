import puppeteer from 'puppeteer';
import fs from 'fs';
import path from 'path';

const outDir = path.resolve('reports/screenshots/after');
if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir, { recursive: true });
}

const routes = [
  { path: '/', name: 'home' },
  { path: '/work', name: 'work' },
  { path: '/info', name: 'info' },
  { path: '/contact', name: 'contact' },
  { path: '/404-check', name: '404' },
];

const viewports = [
  { width: 390, height: 844, suffix: '390' },
  { width: 1440, height: 900, suffix: '1440' },
];

async function capture() {
  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-gpu'],
  });

  for (const vp of viewports) {
    const page = await browser.newPage();
    await page.setViewport({ width: vp.width, height: vp.height });

    for (const r of routes) {
      const url = `http://localhost:5000${r.path}`;
      console.log(`Navigating to ${url} at ${vp.width}px...`);
      try {
        await page.goto(url, { waitUntil: 'networkidle2', timeout: 30000 });
        // Wait for loader curtain transition
        await new Promise((resolve) => setTimeout(resolve, 2500));

        const dest = path.join(outDir, `${r.name}-${vp.suffix}.png`);
        await page.screenshot({ path: dest, fullPage: false });
        console.log(`Saved screenshot: ${dest}`);
      } catch (err) {
        console.error(`Error capturing ${url}:`, err.message);
      }
    }
    await page.close();
  }

  await browser.close();
  console.log('All after screenshots successfully captured!');
}

capture().catch((err) => {
  console.error('Capture failed:', err);
  process.exit(1);
});

