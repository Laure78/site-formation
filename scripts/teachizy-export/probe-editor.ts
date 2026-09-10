#!/usr/bin/env npx tsx
/** Sonde une page éditeur de leçon pour trouver les PDF S3. */
import path from 'node:path';
import { chromium } from 'playwright';

const state = path.join(process.cwd(), '.teachizy-auth/storage-state.json');
const url =
  process.argv[2] ||
  'https://app.teachizy.fr/formations/5e83ffc8-9f92-43bc-9f94-9aad04afc503/editor/1470305';

async function main() {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({ storageState: state });
  const page = await context.newPage();
  const hits: string[] = [];
  page.on('response', async (res) => {
    const u = res.url();
    const ct = (res.headers()['content-type'] || '').toLowerCase();
    if (ct.includes('pdf') || /\.pdf/i.test(u) || /scw\.cloud/i.test(u)) {
      hits.push(`${res.status()} ${ct.slice(0, 40)} ${u.split('?')[0]}`);
    }
    if (ct.includes('json') && /api\.teachizy|editor|item|content|block/i.test(u)) {
      try {
        const t = await res.text();
        if (/pdf|scw\.cloud|\.pdf/i.test(t)) {
          hits.push(`JSON ${u.split('?')[0]} :: ${t.slice(0, 400)}`);
        }
      } catch {
        /* ignore */
      }
    }
  });

  await page.goto(url, { waitUntil: 'networkidle', timeout: 90_000 });
  await page.waitForTimeout(3000);
  console.log('title', await page.title());
  console.log('hits', hits.length);
  for (const h of hits) console.log(h);
  await browser.close();
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
