import { dirname, join } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { chromium } from 'playwright';

const __dirname = dirname(fileURLToPath(import.meta.url));
const dir = join(__dirname, 'previous-designs');

const files = [
  ['era-2025-06-tech-leaders.html', 'era-2025-06-tech-leaders'],
  ['era-2025-07-simple-landing.html', 'era-2025-07-simple-landing'],
];

const browser = await chromium.launch({ channel: 'msedge' }).catch(() =>
  chromium.launch({ channel: 'chrome' }).catch(() => chromium.launch())
);
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });

for (const [name, slug] of files) {
  const url = pathToFileURL(join(dir, name)).href;
  await page.goto(url, { waitUntil: 'load', timeout: 60000 });
  await page.waitForTimeout(1500);
  await page.screenshot({ path: join(dir, `${slug}.png`), fullPage: true });
  console.log(`ok ${slug}`);
}

await browser.close();
