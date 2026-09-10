#!/usr/bin/env npx tsx
/** Sonde structure DOM de la page Contenu Teachizy. */
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

  const apiBodies: Array<{ url: string; preview: string }> = [];
  page.on('response', async (res) => {
    const u = res.url();
    const ct = res.headers()['content-type'] || '';
    if (!ct.includes('json')) return;
    if (!/teachizy|api/i.test(u)) return;
    try {
      const text = await res.text();
      if (/pdf|scw\.cloud|training.?item|lesson|content/i.test(text) || /items/i.test(u)) {
        apiBodies.push({ url: u.split('?')[0], preview: text.slice(0, 500) });
      }
    } catch {
      /* ignore */
    }
  });

  await page.goto(formationUrl, { waitUntil: 'networkidle', timeout: 60_000 });
  await page.waitForTimeout(2500);

  // Cliquer onglet Contenu si présent
  const contenu = page.getByRole('link', { name: /^Contenu$/i }).first();
  if ((await contenu.count()) > 0) {
    await contenu.click().catch(() => undefined);
    await page.waitForTimeout(2000);
  }

  const structure = await page.evaluate(`(() => {
    const pick = (el) => ({
      tag: el.tagName,
      id: el.id || null,
      className: String(el.className || '').slice(0, 120),
      href: el.href || null,
      text: (el.innerText || el.textContent || '').trim().slice(0, 80),
      dataAttrs: Object.fromEntries([...el.attributes].filter(a => a.name.startsWith('data-')).map(a => [a.name, a.value])),
    });

    // liens contenant un id numérique dans le path
    const links = Array.from(document.querySelectorAll('a[href]'))
      .map(pick)
      .filter(x => /\\/formations\\/|item|lesson|chapitre|contenu/i.test(x.href || '') || /module|introduction|prompt|programme/i.test(x.text));

    // éléments avec data-id
    const dataId = Array.from(document.querySelectorAll('[data-id], [data-item-id], [data-uuid], [data-training-item-id]'))
      .slice(0, 50)
      .map(pick);

    // texte visible contenant Module
    const moduleNodes = Array.from(document.querySelectorAll('div, span, li, a, button, h1, h2, h3, h4'))
      .filter(el => /^Module\\s*\\d/i.test((el.innerText || '').trim().split('\\n')[0] || ''))
      .slice(0, 30)
      .map(el => {
        const t = (el.innerText || '').trim().split('\\n')[0];
        const a = el.closest('a') || el.querySelector('a');
        return { text: t, href: a ? a.href : null, tag: el.tagName, className: String(el.className||'').slice(0,80) };
      });

    return {
      url: location.href,
      links: links.slice(0, 40),
      dataId,
      moduleNodes,
    };
  })()`);

  console.log(JSON.stringify(structure, null, 2));
  console.log('\nAPI interesting:', apiBodies.length);
  for (const b of apiBodies.slice(0, 15)) {
    console.log('URL', b.url);
    console.log(b.preview.slice(0, 300));
    console.log('---');
  }

  // Sauvegarder HTML dump (sans cookies)
  const html = await page.content();
  fs.writeFileSync(path.join(process.cwd(), 'teachizy-export', 'probe-dom.html'), html);
  console.log('HTML dump → teachizy-export/probe-dom.html');

  await browser.close();
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
