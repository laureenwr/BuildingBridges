import { mkdirSync } from 'node:fs';
import { dirname, join, basename } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { chromium } from 'playwright';

const __dirname = dirname(fileURLToPath(import.meta.url));
const repoRoot = join(__dirname, '..');
const outDir = join(__dirname, 'previous-designs');

const files = [
  ['versions of web/index7.html', 'versions-of-web__index7'],
  ['versions of web/index8.html', 'versions-of-web__index8'],
  ['versions of web/index (2).html', 'versions-of-web__index-2'],
  ['versions of web/seventhirteen.html', 'versions-of-web__seventhirteen'],
  ['versions of web/uy.html', 'versions-of-web__uy'],
  ['versions of web/building-bridges-updated.html', 'versions-of-web__building-bridges-updated'],
  ['versions of web/building-bridges-updated (1).html', 'versions-of-web__building-bridges-updated-1'],
  ['versions of web/building-bridges-updated (2).html', 'versions-of-web__building-bridges-updated-2'],
  ['versions of web/building-bridges-updated (3).html', 'versions-of-web__building-bridges-updated-3'],
  ['Building bridges/Website prototype/BB2.html', 'prototype__BB2'],
  ['Building bridges/Website prototype/BB3.html', 'prototype__BB3'],
  ['Building bridges/Website prototype/building-bridges brown theme.html', 'prototype__brown-theme'],
];

mkdirSync(outDir, { recursive: true });

const browser = await chromium.launch({ channel: 'msedge' }).catch(() =>
  chromium.launch({ channel: 'chrome' }).catch(() => chromium.launch())
);
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });

const results = [];

for (const [relativePath, slug] of files) {
  const abs = join(repoRoot, relativePath);
  const url = pathToFileURL(abs).href;
  const file = join(outDir, `${slug}.png`);
  try {
    await page.goto(url, { waitUntil: 'load', timeout: 60000 });
    await page.waitForTimeout(1200);
    await page.screenshot({ path: file, fullPage: true });
    results.push({ source: relativePath, file: basename(file), ok: true });
    console.log(`ok  ${slug}`);
  } catch (error) {
    results.push({ source: relativePath, file: basename(file), ok: false, error: String(error) });
    console.error(`fail ${slug}`, error);
  }
}

await browser.close();
console.log(JSON.stringify({ outDir, results }, null, 2));
