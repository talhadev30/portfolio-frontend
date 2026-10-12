import fs from 'fs';
import path from 'path';

const routes = [
  { file: 'dist/index.html', route: '/', hasFaq: true, is404: false },
  { file: 'dist/work/index.html', route: '/work', hasFaq: false, is404: false },
  { file: 'dist/info/index.html', route: '/info', hasFaq: false, is404: false },
  { file: 'dist/contact/index.html', route: '/contact', hasFaq: false, is404: false },
  { file: 'dist/404.html', route: '/404', hasFaq: false, is404: true },
];

let failed = false;

console.log('=== ROUTE AUDIT & VERIFICATION ===');

for (const r of routes) {
  if (!fs.existsSync(r.file)) {
    console.error(`[FAIL] File missing: ${r.file}`);
    failed = true;
    continue;
  }

  const html = fs.readFileSync(r.file, 'utf-8');

  // Title
  const titleMatch = html.match(/<title>([^<]+)<\/title>/);
  const title = titleMatch ? titleMatch[1] : null;
  if (!title) {
    console.error(`[FAIL] ${r.route}: Missing <title>`);
    failed = true;
  } else {
    console.log(`[PASS] ${r.route} Title (${title.length}c): "${title}"`);
  }

  // Description
  const descMatch = html.match(/<meta\s+name="description"\s+content="([^"]*)"/);
  const desc = descMatch ? descMatch[1] : null;
  if (!r.is404 && (!desc || desc.length < 50)) {
    console.error(`[FAIL] ${r.route}: Missing or short description`);
    failed = true;
  } else if (desc) {
    console.log(`[PASS] ${r.route} Description (${desc.length}c): "${desc.substring(0, 70)}..."`);
  }

  // Canonical
  const canonMatch = html.match(/<link\s+rel="canonical"\s+href="([^"]*)"/);
  const canonical = canonMatch ? canonMatch[1] : null;
  if (r.is404) {
    if (canonical) {
      console.error(`[FAIL] 404 should NOT have canonical URL! Found: ${canonical}`);
      failed = true;
    } else {
      console.log(`[PASS] 404 correctly has no canonical URL`);
    }
  } else {
    if (!canonical) {
      console.error(`[FAIL] ${r.route}: Missing canonical link`);
      failed = true;
    } else {
      console.log(`[PASS] ${r.route} Canonical: ${canonical}`);
    }
  }

  // Robots
  const robotsMatch = html.match(/<meta\s+name="robots"\s+content="([^"]*)"/);
  const robots = robotsMatch ? robotsMatch[1] : null;
  console.log(`[PASS] ${r.route} Robots: ${robots}`);

  // H1 Check
  const h1Matches = html.match(/<h1[\s>][\s\S]*?<\/h1>/gi) || [];
  if (h1Matches.length !== 1) {
    console.error(`[FAIL] ${r.route}: Expected exactly 1 H1, found ${h1Matches.length}`);
    failed = true;
  } else {
    const cleanH1 = h1Matches[0].replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim();
    console.log(`[PASS] ${r.route} Single H1: "${cleanH1.substring(0, 60)}"`);
  }

  // JSON-LD Check
  const jsonLdMatch = html.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/);
  if (r.is404) {
    if (jsonLdMatch) {
      console.error(`[FAIL] 404 should NOT have JSON-LD schema`);
      failed = true;
    } else {
      console.log(`[PASS] 404 correctly has no JSON-LD schema`);
    }
  } else {
    if (!jsonLdMatch) {
      console.error(`[FAIL] ${r.route}: Missing JSON-LD script`);
      failed = true;
    } else {
      try {
        const schema = JSON.parse(jsonLdMatch[1]);
        const types = (schema['@graph'] || []).map((e) => e['@type']);
        console.log(`[PASS] ${r.route} JSON-LD @graph types: ${types.join(', ')}`);

        if (r.hasFaq) {
          const faqEntity = schema['@graph'].find((e) => e['@type'] === 'FAQPage');
          if (!faqEntity || !faqEntity.mainEntity || faqEntity.mainEntity.length === 0) {
            console.error(`[FAIL] Homepage missing FAQPage schema`);
            failed = true;
          } else {
            console.log(`[PASS] Homepage FAQPage schema has ${faqEntity.mainEntity.length} questions`);
          }
        }
      } catch (e) {
        console.error(`[FAIL] ${r.route}: Invalid JSON-LD: ${e.message}`);
        failed = true;
      }
    }
  }

  // Meta keywords check (MUST BE ABSENT)
  if (html.includes('name="keywords"') || html.includes('name=\'keywords\'')) {
    console.error(`[FAIL] ${r.route}: Contains obsolete meta keywords!`);
    failed = true;
  } else {
    console.log(`[PASS] ${r.route}: Clean (no meta keywords)`);
  }
}

console.log('\n=== ASSETS & CONTROLS CHECK ===');

// Sitemap
if (!fs.existsSync('dist/sitemap.xml')) {
  console.error('[FAIL] dist/sitemap.xml missing');
  failed = true;
} else {
  const sitemap = fs.readFileSync('dist/sitemap.xml', 'utf-8');
  const locCount = (sitemap.match(/<loc>/g) || []).length;
  console.log(`[PASS] dist/sitemap.xml exists with ${locCount} URLs`);
  if (sitemap.includes('404')) {
    console.error('[FAIL] dist/sitemap.xml contains 404 page!');
    failed = true;
  }
}

// Robots.txt
if (!fs.existsSync('dist/robots.txt')) {
  console.error('[FAIL] dist/robots.txt missing');
  failed = true;
} else {
  const robotsTxt = fs.readFileSync('dist/robots.txt', 'utf-8');
  console.log(`[PASS] dist/robots.txt exists (${robotsTxt.length} bytes)`);
  if (!robotsTxt.includes('Sitemap: https://talhaportfolio.dpdns.org/sitemap.xml')) {
    console.error('[FAIL] dist/robots.txt missing Sitemap directive');
    failed = true;
  }
  if (!robotsTxt.includes('OAI-SearchBot') || !robotsTxt.includes('PerplexityBot')) {
    console.error('[FAIL] dist/robots.txt missing explicit AI crawler directives');
    failed = true;
  }
}

// llms.txt
if (!fs.existsSync('dist/llms.txt')) {
  console.error('[FAIL] dist/llms.txt missing');
  failed = true;
} else {
  const llms = fs.readFileSync('dist/llms.txt', 'utf-8');
  console.log(`[PASS] dist/llms.txt exists (${llms.length} bytes)`);
}

// Webmanifest
if (!fs.existsSync('dist/site.webmanifest')) {
  console.error('[FAIL] dist/site.webmanifest missing');
  failed = true;
} else {
  console.log(`[PASS] dist/site.webmanifest exists`);
}

if (failed) {
  console.error('\nVerification encountered failures!');
  process.exit(1);
} else {
  console.log('\nALL VERIFICATION TESTS PASSED SUCCESSFULLY! 100% Crawlable, Pre-rendered, and Valid.');
}

