import http from 'http';

async function fetchUrl(url) {
  return new Promise((resolve) => {
    http.get(url, (res) => {
      let data = '';
      res.on('data', (chunk) => (data += chunk));
      res.on('end', () => resolve({ status: res.statusCode, body: data, headers: res.headers }));
    }).on('error', (err) => resolve({ status: 500, error: err.message }));
  });
}

async function run() {
  const visited = new Set();
  const queue = ['http://localhost:5000/'];
  let broken = 0;

  while (queue.length > 0) {
    const current = queue.shift();
    if (visited.has(current)) continue;
    visited.add(current);

    const res = await fetchUrl(current);
    console.log(`[${res.status}] ${current}`);
    if (res.status >= 400) {
      broken++;
      continue;
    }

    if (res.headers['content-type'] && res.headers['content-type'].includes('text/html')) {
      const linkRegex = /href=["'](\/[^"'#\s]*)["']/g;
      let match;
      while ((match = linkRegex.exec(res.body)) !== null) {
        const link = `http://localhost:5000${match[1]}`;
        if (!visited.has(link) && !queue.includes(link)) {
          queue.push(link);
        }
      }
    }
  }

  console.log(`\nCrawled ${visited.size} local internal URLs. Broken internal links: ${broken}`);
  if (broken > 0) {
    process.exit(1);
  }
}

run();

