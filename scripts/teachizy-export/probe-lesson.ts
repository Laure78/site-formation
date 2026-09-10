#!/usr/bin/env npx tsx
/**
 * Sonde diagnostic : ouvre une leçon Teachizy et journalise les URL PDF / S3.
 * Usage: npx tsx scripts/teachizy-export/probe-lesson.ts "Module 1"
 */
import fs from 'node:fs';
import path from 'node:path';
import { chromium } from 'playwright';

const state = path.join(process.cwd(), '.teachizy-auth/storage-state.json');
const needle = process.argv[2] || 'Module 1';
const formationUrl =
  process.argv[3] ||
  'https://app.teachizy.fr/formations/5e83ffc8-9f92-43bc-9f94-9aad04afc503/';

async function main() {
  if (!fs.existsSync(state)) throw new Error('Session manquante — lancez teachizy:export --login');
  const browser = await chromium.launch({ headless: false });
  const context = await browser.newContext({ storageState: state });
  const page = await context.newPage();

  const hits: string[] = [];
  page.on('response', async (res) => {
    const u = res.url();
    if (/\.pdf|scw\.cloud|storage|cdn/i.test(u)) {
      hits.push(`${res.status()} ${res.headers()['content-type'] || ''} ${u.split('?')[0]}`);
    }
  });

  await page.goto(formationUrl, { waitUntil: 'networkidle', timeout: 60_000 });
  await page.waitForTimeout(1500);

  console.log('URL avant clic:', page.url());
  const loc = page.getByText(needle, { exact: false }).first();
  console.log('count matches:', await loc.count());
  await loc.click({ timeout: 15_000 });
  await page.waitForTimeout(4000);
  console.log('URL après clic:', page.url());

  // Essayer un double-clic / ouvrir éditeur
  const edit = page.getByText(/modifier|éditer|ouvrir/i).first();
  if ((await edit.count()) > 0) {
    console.log('Bouton éditer trouvé, clic…');
    await edit.click().catch(() => undefined);
    await page.waitForTimeout(3000);
    console.log('URL après éditer:', page.url());
  }

  // Chercher liens PDF dans le DOM
  const dom = await page.evaluate(`(() => {
    const urls = [];
    for (const el of document.querySelectorAll('a[href], iframe[src], embed[src], object[data], source[src]')) {
      const u = el.href || el.src || el.data;
      if (u && /pdf|scw\\.cloud|storage/i.test(u)) urls.push(u.split('?')[0]);
    }
    // canvas / react-pdf ?
    const texts = Array.from(document.querySelectorAll('*')).slice(0, 500).map(e => e.tagName + (e.className||'')).filter(t => /pdf|viewer|iframe/i.test(t));
    return { urls: [...new Set(urls)], hints: [...new Set(texts)].slice(0, 40) };
  })()`);

  console.log('DOM pdf-like:', JSON.stringify(dom, null, 2));
  console.log('Network hits:', hits.length);
  for (const h of hits.slice(0, 40)) console.log(' ', h);

  await page.waitForTimeout(2000);
  await context.storageState({ path: state });
  await browser.close();
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
