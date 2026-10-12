import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';

const images = ['product1', 'product2', 'product3', 'project1', 'my', 'talhacv'];

console.log('Generating WebP versions...');
for (const name of images) {
  const src = `public/${name}.png`;
  const dest = `public/${name}.webp`;
  console.log(`Converting ${src} -> ${dest}`);
  execSync(`npx sharp-cli -i ${src} -o ${dest} -q 82`, { stdio: 'inherit' });
}

console.log('Converting preview.png -> preview.webp (1200x630)...');
execSync(`npx sharp-cli -i public/preview.png -o public/preview.webp resize 1200 630 -q 85`, { stdio: 'inherit' });

console.log('Optimizing fallback PNGs with palette compression...');
for (const name of images) {
  const src = `public/${name}.png`;
  const tmp = `public/${name}_opt.png`;
  console.log(`Optimizing ${src}`);
  execSync(`npx sharp-cli -i ${src} -o ${tmp} --palette`, { stdio: 'inherit' });
  if (fs.existsSync(tmp)) {
    fs.copyFileSync(tmp, src);
    fs.unlinkSync(tmp);
  }
}

console.log('Optimizing preview.png (1200x630)...');
const prevTmp = `public/preview_opt.png`;
execSync(`npx sharp-cli -i public/preview.png -o ${prevTmp} resize 1200 630 --palette`, { stdio: 'inherit' });
if (fs.existsSync(prevTmp)) {
  fs.copyFileSync(prevTmp, 'public/preview.png');
  fs.unlinkSync(prevTmp);
}

console.log('Done!');
