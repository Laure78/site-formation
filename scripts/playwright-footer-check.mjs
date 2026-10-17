#!/usr/bin/env node
/**
 * Contrôle visuel footer — accueil, 4 largeurs, liens clés, débordement horizontal.
 * Usage: BASE_URL=http://localhost:3000 node scripts/playwright-footer-check.mjs
 */
import { mkdirSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { chromium } from 'playwright';

const BASE = (process.env.BASE_URL || 'http://localhost:3000').replace(/\/$/, '');
const OUT = join(process.cwd(), '.playwright-check-footer');

const VIEWPORTS = [
  { name: 'mobile-375', width: 375, height: 812 },
  { name: 'tablet-768', width: 768, height: 1024 },
  { name: 'desktop-1024', width: 1024, height: 768 },
  { name: 'desktop-1440', width: 1440, height: 900 },
];

const FOOTER_CHECKS = [
  { role: 'link', name: /Échanger sur mon besoin/i },
  { role: 'link', name: /Indicateurs de résultats/i },
  { role: 'button', name: /Gérer mes cookies/i },
  { role: 'link', name: /Toutes les formations/i },
  { role: 'link', name: /Tous les parcours/i },
  { role: 'link', name: /Avis Google/i },
];

async function main() {
  mkdirSync(OUT, { recursive: true });
  const browser = await chromium.launch();
  const context = await browser.newContext({ locale: 'fr-FR' });
  const report = [];

  for (const vp of VIEWPORTS) {
    const page = await context.newPage();
    await page.setViewportSize({ width: vp.width, height: vp.height });
    await page.goto(`${BASE}/`, { waitUntil: 'networkidle', timeout: 60_000 });

    const footer = page.locator('footer').last();
    await footer.scrollIntoViewIfNeeded();
    await page.waitForTimeout(400);

    const overflow = await page.evaluate(() => {
      const doc = document.documentElement;
      return doc.scrollWidth > doc.clientWidth + 1;
    });

    const missing = [];
    for (const check of FOOTER_CHECKS) {
      const loc = footer.getByRole(check.role, { name: check.name });
      if ((await loc.count()) === 0) missing.push(String(check.name));
    }

    await page.screenshot({
      path: join(OUT, `${vp.name}.png`),
      fullPage: false,
    });

    report.push({
      viewport: vp.name,
      overflow,
      missingLinks: missing,
    });
    await page.close();
  }

  // Destinations footer — requêtes HEAD/GET rapides
  const sampleHrefs = [
    '/formations',
    '/parcours-metiers',
    '/qualiopi',
    '/indicateurs-resultats',
    '/financement-constructys-formation-ia-btp',
    '/mentions-legales',
    '/cgv',
  ];
  const page = await context.newPage();
  const broken = [];
  for (const href of sampleHrefs) {
    const res = await page.goto(`${BASE}${href}`, { waitUntil: 'domcontentloaded', timeout: 45_000 });
    const status = res?.status() ?? 0;
    if (status >= 400) broken.push({ href, status });
  }
  await page.close();

  await browser.close();

  writeFileSync(join(OUT, 'report.json'), `${JSON.stringify({ base: BASE, viewports: report, broken }, null, 2)}\n`);
  console.log(`Screenshots + report → ${OUT}`);

  const failed =
    report.some((r) => r.overflow || r.missingLinks.length > 0) || broken.length > 0;
  if (failed) {
    console.error(JSON.stringify({ viewports: report, broken }, null, 2));
    process.exit(1);
  }
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
