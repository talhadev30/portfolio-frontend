// prerender.mjs
// Generates fully optimized, SEO-ready static HTML pages for all routes.
// Designed to work seamlessly both locally and on Vercel (where headless Chrome libraries are unavailable).

import fs from 'node:fs/promises';
import path from 'node:path';

const DIST = path.resolve('dist');

const ROUTES_METADATA = {
  '/': {
    title: 'Talha Salman | Full Stack Web Developer & MERN Specialist',
    description: 'Talha Salman is a professional Full Stack Web Developer in Karachi specializing in React, Node.js, Express, MongoDB, and high-performance digital web applications.',
    keywords: 'Talha Salman, Full Stack Developer, Web Developer Karachi, React Developer Pakistan, MERN Stack Developer, Node.js Developer, Portfolio, Tailwind CSS, Frontend Developer, Backend Developer, REST API Developer, JavaScript Developer, Freelance Web Developer',
    canonical: 'https://talhaportfolio.dpdns.org/',
    ogTitle: 'Talha Salman | Full Stack Web Developer & MERN Specialist',
    ogDescription: 'Talha Salman is a professional Full Stack Web Developer in Karachi specializing in React, Node.js, Express, MongoDB, and high-performance digital web applications.',
    ogType: 'website',
    fallbackHtml: `
    <main data-fallback>
      <h1>Talha Salman | Full Stack Web Developer & MERN Specialist</h1>
      <p>I build fast, responsive, and SEO-optimized web applications with React, JavaScript, Node.js, Express.js, MongoDB, and Tailwind CSS.</p>
      <h2>Full Stack Web Development & Digital Engineering</h2>
      <h3>Custom Web Applications & Modern UI/UX Architecture</h3>
      <p>Specializing in modern, fast, and SEO-friendly digital web applications with clean modular code, fast loading speeds, and accessibility at its core.</p>
      <h2>Featured Web Projects & Case Studies</h2>
      <ul>
        <li><a href="https://talha-banking-system.vercel.app/" target="_blank" rel="noopener noreferrer">Online Banking System</a> - Full stack React and Node.js banking web app with secure transactions.</li>
        <li><a href="https://talhaportfolio.dpdns.org/work">Modern Restaurant &amp; Food Ordering Web App</a> - Responsive food ordering and restaurant showcase platform.</li>
        <li><a href="https://talhaportfolio.dpdns.org/work">School Management System Portal</a> - Administrative and student management portal.</li>
      </ul>
      <h2>Development Workflow</h2>
      <ol>
        <li><strong>Planning</strong>: Understanding project goals, requirements, and architecture roadmap.</li>
        <li><strong>Frontend</strong>: Building responsive, accessible UIs with React and Tailwind CSS.</li>
        <li><strong>Backend</strong>: Developing secure REST APIs, JWT authentication, and databases.</li>
        <li><strong>Testing</strong>: Cross-device testing, responsive validation, and bug fixing.</li>
        <li><strong>Deploy</strong>: Production deployment, SEO optimization, and ongoing support.</li>
      </ol>
      <h2>Quick Navigation & Connect</h2>
      <p>
        <a href="https://talhaportfolio.dpdns.org/">Home</a> |
        <a href="https://talhaportfolio.dpdns.org/work">Featured Works</a> |
        <a href="https://talhaportfolio.dpdns.org/info">About & Skills</a> |
        <a href="https://talhaportfolio.dpdns.org/contact">Contact Talha Salman</a>
      </p>
    </main>`
  },
  '/work': {
    title: 'Featured Web Development Projects & Case Studies | Talha Salman',
    description: 'Explore web development projects by Talha Salman: Banking System, Restaurant Web Apps, and School Portals built with React, Node.js, Express, and Tailwind CSS.',
    keywords: 'Talha Salman Projects, Web Development Portfolio, React Projects, Node.js Applications, Banking System Web App, MERN Stack Projects, Frontend Portfolio, Web Developer Karachi',
    canonical: 'https://talhaportfolio.dpdns.org/work',
    ogTitle: 'Featured Web Development Projects & Case Studies | Talha Salman',
    ogDescription: 'Explore web development projects by Talha Salman: Banking System, Restaurant Web Apps, and School Portals built with React, Node.js, Express, and Tailwind CSS.',
    ogType: 'website',
    fallbackHtml: `
    <main data-fallback>
      <h1>Featured Web Development Projects &amp; Case Studies</h1>
      <p>A curated portfolio of modern web applications, full-stack systems, and responsive digital experiences built using React, Node.js, Express, MongoDB, and Tailwind CSS.</p>
      <h2>Full-Stack Case Studies & Web Applications</h2>
      <h3>Production-Ready Solutions Built with React, Node.js & Modern Tools</h3>
      <article>
        <h3>Online Banking System Web Application</h3>
        <p>Full stack banking application built with React, Node.js, Express, and secure authentication. Features real-time transactions, account transfers, and dashboard analytics.</p>
        <p><a href="https://talha-banking-system.vercel.app/" target="_blank" rel="noopener noreferrer">View Live Banking Project</a></p>
      </article>
      <article>
        <h3>Modern Restaurant &amp; Food Ordering Web App</h3>
        <p>Interactive restaurant showcase with dynamic menu filtering, ordering simulation, responsive mobile design, and modern animations.</p>
      </article>
      <article>
        <h3>School Management System Web Portal</h3>
        <p>Comprehensive educational institution management portal for managing student records, classes, and administrative workflows.</p>
      </article>
      <h2>Start a Project</h2>
      <p>
        <a href="https://talhaportfolio.dpdns.org/">Home</a> |
        <a href="https://talhaportfolio.dpdns.org/info">About & Skills</a> |
        <a href="https://talhaportfolio.dpdns.org/contact">Contact Talha Salman</a>
      </p>
    </main>`
  },
  '/info': {
    title: 'About Talha Salman | Full Stack Web Developer & Software Engineer',
    description: 'Learn about Talha Salman, a Full Stack Developer in Karachi, Pakistan. Explore technical skills in React, Node.js, Express, MongoDB, PHP, and modern web development.',
    keywords: 'About Talha Salman, Full Stack Developer Karachi, Web Developer Skills, React Developer Pakistan, MERN Stack Skills, JavaScript Developer, Backend Developer Node.js',
    canonical: 'https://talhaportfolio.dpdns.org/info',
    ogTitle: 'About Talha Salman | Full Stack Web Developer & Software Engineer',
    ogDescription: 'Learn about Talha Salman, a Full Stack Developer in Karachi, Pakistan. Explore technical skills in React, Node.js, Express, MongoDB, PHP, and modern web development.',
    ogType: 'profile',
    fallbackHtml: `
    <main data-fallback>
      <h1>About Talha Salman | Full Stack Web Developer & Software Engineer</h1>
      <p>I am a passionate Full Stack Web Developer based in Karachi, Pakistan, specializing in modern frontend and backend web technologies. I craft fast, responsive, and secure web applications with React, Node.js, Express, MongoDB, and Tailwind CSS.</p>
      <h2>A Little Bit About Me</h2>
      <h3>Full Stack Developer Journey & Philosophy</h3>
      <p>I prioritize writing maintainable code, adhering to clean architecture, optimizing web performance for search engine rankings, and ensuring seamless cross-device compatibility.</p>
      <h2>Technical Skills &amp; Stack</h2>
      <h3>Frontend Development</h3>
      <p>React.js, JavaScript (ES6+), HTML5, CSS3, Tailwind CSS, GSAP Animations, Responsive Web Design.</p>
      <h3>Backend Development</h3>
      <p>Node.js, Express.js, RESTful APIs, JWT Authentication, PHP, Server-side Logic.</p>
      <h3>Databases &amp; Cloud</h3>
      <p>MongoDB, MySQL, Database Design, Cloud Deployment.</p>
      <h3>Tools &amp; Workflow</h3>
      <p>Git, GitHub, VS Code, Postman, Vite, Vercel.</p>
      <h2>Contact &amp; Profiles</h2>
      <p>
        <a href="https://talhaportfolio.dpdns.org/">Home</a> |
        <a href="https://talhaportfolio.dpdns.org/work">Projects</a> |
        <a href="https://github.com/talhadev30" target="_blank" rel="noopener noreferrer">GitHub</a> |
        <a href="https://www.linkedin.com/in/m-talha-salman-66832839b" target="_blank" rel="noopener noreferrer">LinkedIn</a> |
        <a href="https://talhaportfolio.dpdns.org/contact">Hire Me</a>
      </p>
    </main>`
  },
  '/contact': {
    title: 'Contact Talha Salman | Hire Full Stack Web Developer',
    description: 'Get in touch with Talha Salman for custom web development, React and Node.js applications, freelance contracts, and software engineering opportunities.',
    keywords: 'Contact Talha Salman, Hire Web Developer Karachi, Hire Full Stack Developer, Freelance React Developer Pakistan, MERN Developer Hire, Web Developer Contact',
    canonical: 'https://talhaportfolio.dpdns.org/contact',
    ogTitle: 'Contact Talha Salman | Hire Full Stack Web Developer',
    ogDescription: 'Get in touch with Talha Salman for custom web development, React and Node.js applications, freelance contracts, and software engineering opportunities.',
    ogType: 'website',
    fallbackHtml: `
    <main data-fallback>
      <h1>Let's Create Something Great Together</h1>
      <h2>Hire a Full Stack Web Developer & Software Engineer</h2>
      <h3>Available for Freelance Contracts, Remote Roles & Technical Consultations</h3>
      <p>Available for freelance contracts, full-time web development roles, and custom web application projects.</p>
      <p>Location: Karachi, Pakistan (Available for Worldwide Remote Work)</p>
      <p>Expertise: Full Stack MERN Development, React Frontends, Node.js REST APIs.</p>
      <h2>Explore Portfolio &amp; Connect</h2>
      <p>
        <a href="https://talhaportfolio.dpdns.org/">Home</a> |
        <a href="https://talhaportfolio.dpdns.org/work">Featured Works</a> |
        <a href="https://talhaportfolio.dpdns.org/info">About Talha</a> |
        <a href="https://www.linkedin.com/in/m-talha-salman-66832839b" target="_blank" rel="noopener noreferrer">LinkedIn</a> |
        <a href="https://github.com/talhadev30" target="_blank" rel="noopener noreferrer">GitHub</a>
      </p>
    </main>`
  }
};

function injectMetadata(html, route) {
  const meta = ROUTES_METADATA[route] || ROUTES_METADATA['/'];

  // Replace Title
  html = html.replace(/<title[^>]*>.*?<\/title>/gi, `<title>${meta.title}</title>`);

  // Replace Description
  if (/<meta[^>]*name=["']description["'][^>]*>/i.test(html)) {
    html = html.replace(/<meta[^>]*name=["']description["'][^>]*>/gi, `<meta name="description" content="${meta.description}">`);
  } else {
    html = html.replace('</head>', `  <meta name="description" content="${meta.description}">\n</head>`);
  }

  // Replace Keywords
  if (/<meta[^>]*name=["']keywords["'][^>]*>/i.test(html)) {
    html = html.replace(/<meta[^>]*name=["']keywords["'][^>]*>/gi, `<meta name="keywords" content="${meta.keywords}">`);
  } else {
    html = html.replace('</head>', `  <meta name="keywords" content="${meta.keywords}">\n</head>`);
  }

  // Replace Canonical
  if (/<link[^>]*rel=["']canonical["'][^>]*>/i.test(html)) {
    html = html.replace(/<link[^>]*rel=["']canonical["'][^>]*>/gi, `<link rel="canonical" href="${meta.canonical}">`);
  } else {
    html = html.replace('</head>', `  <link rel="canonical" href="${meta.canonical}">\n</head>`);
  }

  // Replace Open Graph
  html = html.replace(/<meta[^>]*property=["']og:title["'][^>]*>/gi, `<meta property="og:title" content="${meta.ogTitle}">`);
  html = html.replace(/<meta[^>]*property=["']og:description["'][^>]*>/gi, `<meta property="og:description" content="${meta.ogDescription}">`);
  html = html.replace(/<meta[^>]*property=["']og:url["'][^>]*>/gi, `<meta property="og:url" content="${meta.canonical}">`);
  html = html.replace(/<meta[^>]*property=["']og:type["'][^>]*>/gi, `<meta property="og:type" content="${meta.ogType}">`);

  // Replace Twitter
  html = html.replace(/<meta[^>]*name=["']twitter:title["'][^>]*>/gi, `<meta name="twitter:title" content="${meta.ogTitle}">`);
  html = html.replace(/<meta[^>]*name=["']twitter:description["'][^>]*>/gi, `<meta name="twitter:description" content="${meta.ogDescription}">`);

  // Replace fallback main
  if (/<main\s+data-fallback>[\s\S]*?<\/main>/i.test(html)) {
    html = html.replace(/<main\s+data-fallback>[\s\S]*?<\/main>/i, meta.fallbackHtml.trim());
  }

  return html;
}

async function generateStaticHtmlFiles(template) {
  for (const [route] of Object.entries(ROUTES_METADATA)) {
    const customizedHtml = injectMetadata(template, route);
    const outDir = route === '/' ? DIST : path.join(DIST, route.slice(1));
    await fs.mkdir(outDir, { recursive: true });
    await fs.writeFile(path.join(outDir, 'index.html'), customizedHtml, 'utf8');
    console.log(`[SEO Prerender] Generated static HTML for ${route} (${customizedHtml.length} bytes)`);
  }
}

async function run() {
  const templatePath = path.join(DIST, 'index.html');
  const template = await fs.readFile(templatePath, 'utf8');

  // Step 1: Always generate the static SEO files first.
  // This guarantees that all routes have full SEO titles, meta tags, and semantic crawlable content.
  await generateStaticHtmlFiles(template);

  // Step 2: If on Vercel or CI where Chromium system libs (libnspr4.so, etc.) are missing, finish successfully here.
  const isVercel = Boolean(process.env.VERCEL || process.env.NOW_BUILDER);
  if (isVercel) {
    console.log('[SEO Prerender] Vercel environment detected. Prerendering complete with static SEO generator.');
    return;
  }

  // Step 3: In local development, attempt Puppeteer for full client DOM capture if available.
  try {
    const puppeteer = await import('puppeteer').then((m) => m.default || m).catch(() => null);
    if (!puppeteer) {
      console.log('[SEO Prerender] Puppeteer not installed, using static SEO files.');
      return;
    }

    const http = await import('node:http');
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
        res.writeHead(200, { 'Content-Type': MIME['.html'] });
        res.end(template);
      } catch {
        res.writeHead(500);
        res.end();
      }
    });

    await new Promise((resolve) => server.listen(0, resolve));
    const { port } = server.address();

    let browser;
    try {
      browser = await puppeteer.launch({
        headless: true,
        args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage'],
      });
    } catch (launchErr) {
      console.warn(`[SEO Prerender] Headless Chrome could not be launched (${launchErr.message}). Kept pre-generated static SEO files.`);
      server.close();
      return;
    }

    for (const [route] of Object.entries(ROUTES_METADATA)) {
      try {
        const page = await browser.newPage();
        await page.goto(`http://localhost:${port}${route}`, { waitUntil: 'networkidle0', timeout: 30000 });

        await page.waitForFunction(
          () => {
            const root = document.querySelector('#root');
            return root && root.children.length > 0 && !root.querySelector('[data-fallback]');
          },
          { timeout: 15000 }
        ).catch(() => null);

        const html = '<!DOCTYPE html>\n' + (await page.evaluate(() => {
          const titles = Array.from(document.querySelectorAll('head title'));
          if (titles.length > 1) {
            titles.slice(1).forEach((t) => t.remove());
          }
          if (titles[0] && document.title) {
            titles[0].textContent = document.title;
            titles[0].removeAttribute('data-rh');
          }

          const canonicals = Array.from(document.querySelectorAll('head link[rel="canonical"]'));
          if (canonicals.length > 1) {
            const active = canonicals[canonicals.length - 1];
            canonicals.forEach((c) => { if (c !== active) c.remove(); });
          }

          const descriptions = Array.from(document.querySelectorAll('head meta[name="description"]'));
          if (descriptions.length > 1) {
            const active = descriptions[descriptions.length - 1];
            descriptions.forEach((d) => { if (d !== active) d.remove(); });
          }

          return document.documentElement.outerHTML;
        }));

        const outDir = route === '/' ? DIST : path.join(DIST, route.slice(1));
        await fs.mkdir(outDir, { recursive: true });
        await fs.writeFile(path.join(outDir, 'index.html'), html);
        console.log(`[SEO Prerender] Headless DOM rendered ${route} (${html.length} bytes)`);
        await page.close();
      } catch (pageErr) {
        console.warn(`[SEO Prerender] Note on ${route}: ${pageErr.message}`);
      }
    }

    await browser.close();
    server.close();
  } catch (err) {
    console.warn(`[SEO Prerender] Note: ${err.message}. Static SEO files were preserved.`);
  }
}

run();
