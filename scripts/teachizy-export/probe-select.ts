#!/usr/bin/env npx tsx
/** Sonde : liste les <option> du sommaire et sélectionne une leçon. */
import fs from 'node:fs';
import path from 'node:path';
import { chromium } from 'playwright';

const state = path.join(process.cwd(), '.teachizy-auth/storage-state.json');
const formationUrl =
  'https://app.teachizy.fr/formations/5e83ffc8-9f92-43bc-9f94-9aad04afc503/';

async function main() {
  const browser = await chromium.launch({ headless: false });
  const context = await browser.newContext({ storageState: state });
  const page = await context.newPage();
  const hits: string[] = [];
  page.on('response', (res) => {
    const u = res.url();
    if (/\.pdf|scw\.cloud|\/api\/|items|lessons|contents/i.test(u)) {
      hits.push(`${res.status()} ${(res.headers()['content-type'] || '').slice(0, 40)} ${u.split('?')[0]}`);
    }
  });

  await page.goto(formationUrl, { waitUntil: 'networkidle', timeout: 60_000 });
  await page.waitForTimeout(2000);

  const options = await page.evaluate(`(() => {
    const out = [];
    for (const sel of Array.from(document.querySelectorAll('select'))) {
      for (const opt of Array.from(sel.options)) {
        out.push({
          selectName: sel.name || sel.id || '',
          value: opt.value,
          text: (opt.textContent || '').trim(),
          selected: opt.selected,
        });
      }
    }
    return out;
  })()`);

  console.log('Options:', options.length);
  for (const o of options as Array<{ value: string; text: string }>) {
    console.log(`  [${o.value}] ${o.text.slice(0, 90)}`);
  }

  const target = (options as Array<{ value: string; text: string }>).find((o) =>
    /fondamentaux de l'IA$/i.test(o.text) || /Module 1 : Les fondamentaux de l'IA$/i.test(o.text)
  ) || (options as Array<{ value: string; text: string }>).find((o) => /Module 1/i.test(o.text) && o.value);

  if (!target) {
    console.log('Cible introuvable');
    await browser.close();
    return;
  }

  console.log('\nSélection:', target);
  hits.length = 0;
  await page.selectOption('select', target.value).catch(async () => {
    // fallback: premier select qui contient la value
    const selects = page.locator('select');
    const n = await selects.count();
    for (let i = 0; i < n; i++) {
      const vals = await selects.nth(i).evaluate(`(el) => Array.from(el.options).map(o => o.value)`);
      if ((vals as string[]).includes(target.value)) {
        await selects.nth(i).selectOption(target.value);
        break;
      }
    }
  });
  await page.waitForTimeout(5000);
  console.log('URL après select:', page.url());
  console.log('Network:');
  for (const h of hits) console.log(' ', h);

  const dom = await page.evaluate(`(() => {
    const urls = [];
    for (const el of document.querySelectorAll('a[href], iframe[src], embed[src], object[data]')) {
      const u = el.href || el.src || el.data;
      if (u && /pdf|scw\\.cloud/i.test(u)) urls.push(u.split('?')[0]);
    }
    return { url: location.href, title: document.title, urls: [...new Set(urls)] };
  })()`);
  console.log('DOM:', JSON.stringify(dom, null, 2));

  await browser.close();
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
