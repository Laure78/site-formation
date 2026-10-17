#!/usr/bin/env node
/**
 * Captures navigation UX — accueil, parcours, mobile drawer, méga-menu.
 * Usage: BASE_URL=http://localhost:3099 node scripts/playwright-nav-check.mjs
 */
import { mkdirSync } from 'node:fs';
import { join } from 'node:path';
import { chromium } from 'playwright';

const BASE = (process.env.BASE_URL || 'http://localhost:3099').replace(/\/$/, '');
const OUT = join(process.cwd(), '.playwright-check-nav-maillage');

async function main() {
  mkdirSync(OUT, { recursive: true });
  const browser = await chromium.launch();
  const context = await browser.newContext({ locale: 'fr-FR' });

  // Desktop 1440
  {
    const page = await context.newPage();
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto(`${BASE}/`, { waitUntil: 'domcontentloaded' });
    await page.screenshot({ path: join(OUT, 'accueil-desktop-1440.png'), fullPage: false });

    const formationsToggle = page.locator('#header-nav-btn-formations');
    if (await formationsToggle.count()) {
      await formationsToggle.click();
      await page.waitForTimeout(400);
      await page.screenshot({ path: join(OUT, 'mega-menu-formations.png'), fullPage: false });
      await page.keyboard.press('Escape');
    }

    await page.goto(`${BASE}/parcours-metiers`, { waitUntil: 'domcontentloaded' });
    await page.screenshot({ path: join(OUT, 'parcours-metiers-desktop.png'), fullPage: false });

    await page.goto(`${BASE}/formations/parcours/charge-affaires-btp`, { waitUntil: 'domcontentloaded' });
    await page.screenshot({ path: join(OUT, 'parcours-detail-maillage.png'), fullPage: true });

    await page.goto(`${BASE}/ia-analyse-dce-btp`, { waitUntil: 'domcontentloaded' });
    await page.screenshot({ path: join(OUT, 'ia-analyse-dce-related.png'), fullPage: true });

    await page.close();
  }

  // Mobile 390
  {
    const page = await context.newPage();
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto(`${BASE}/`, { waitUntil: 'domcontentloaded' });
    const menuBtn = page.getByRole('button', { name: /Ouvrir le menu/i });
    await menuBtn.click();
    await page.waitForTimeout(350);
    await page.screenshot({ path: join(OUT, 'mobile-menu-open.png'), fullPage: false });
    const parcoursSection = page.getByRole('button', { name: /Parcours métiers/i }).first();
    if (await parcoursSection.count()) {
      await parcoursSection.click();
      await page.waitForTimeout(250);
      await page.screenshot({ path: join(OUT, 'mobile-parcours-accordion.png'), fullPage: false });
    }
    await page.close();
  }

  await browser.close();
  console.log(`Screenshots → ${OUT}`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
