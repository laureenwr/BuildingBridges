import { mkdirSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { chromium } from 'playwright';

const __dirname = dirname(fileURLToPath(import.meta.url));
const outDir = join(__dirname, 'previous-designs', 'before-html-ui');
const baseURL = process.env.SCREENSHOT_BASE_URL || 'http://localhost:3010';

const routes = [
  ['/', 'home'],
  ['/workshops', 'workshops'],
  ['/contact', 'contact'],
  ['/team', 'team'],
  ['/partners', 'partners'],
  ['/imprint', 'imprint'],
];

if (process.env.SCREENSHOT_ONLY) {
  const only = process.env.SCREENSHOT_ONLY;
  for (let i = routes.length - 1; i >= 0; i -= 1) {
    if (routes[i][1] !== only) routes.splice(i, 1);
  }
}

mkdirSync(outDir, { recursive: true });

const browser = await chromium.launch({ channel: 'msedge' }).catch(() =>
  chromium.launch({ channel: 'chrome' }).catch(() => chromium.launch())
);
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });

for (const [route, slug] of routes) {
  const url = `${baseURL}${route}`;
  const file = join(outDir, `era-cover-2026-02__${slug}.png`);
  try {
    await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 60000 });
    await page.waitForTimeout(2500);
    await page.evaluate(async () => {
      const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
      const height = document.body.scrollHeight;
      for (let y = 0; y < height; y += 500) {
        window.scrollTo(0, y);
        await delay(250);
      }
      window.scrollTo(0, 0);
      await delay(600);
    });
    await page.screenshot({ path: file, fullPage: true });
    console.log(`ok  ${slug}`);
  } catch (error) {
    console.error(`fail ${slug}`, error);
  }
}

await browser.close();
