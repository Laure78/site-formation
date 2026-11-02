/**
 * Contrôles bloquants — `/robots.txt` (via `lib/robots-txt.ts`).
 * Usage : `npx tsx scripts/assert-robots-txt.ts`
 */
import assert from 'node:assert/strict';
import {
  AI_BOTS_REQUIRED,
  buildRobotsMetadata,
  buildRobotsTxt,
  PRIVATE_DISALLOW,
  ROBOTS_SITEMAP,
} from '../lib/robots-txt';

const REQUIRED_DISALLOW = [
  '/api/',
  '/auth/',
  '/admin/',
  '/acces-admin',
  '/espace-apprenant/',
] as const;

for (const path of REQUIRED_DISALLOW) {
  assert.ok(
    (PRIVATE_DISALLOW as readonly string[]).includes(path),
    `PRIVATE_DISALLOW doit contenir ${path}`,
  );
}

const meta = buildRobotsMetadata();
assert.ok(meta.sitemap, 'Sitemap manquant dans buildRobotsMetadata()');
const sitemapUrls = Array.isArray(meta.sitemap) ? meta.sitemap : [meta.sitemap];
assert.equal(sitemapUrls[0], ROBOTS_SITEMAP);

const txt = buildRobotsTxt();
assert.match(txt, /^Sitemap: /m, 'robots.txt doit déclarer Sitemap:');

for (const bot of AI_BOTS_REQUIRED) {
  const block = new RegExp(
    `User-Agent: ${bot.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}[\\s\\S]*?Allow: /`,
    'm',
  );
  assert.match(txt, block, `${bot} doit avoir Allow: /`);
}

for (const path of REQUIRED_DISALLOW) {
  assert.match(txt, new RegExp(`Disallow: ${path.replace(/\//g, '\\/')}`, 'm'), `Disallow ${path} absent`);
}

console.log('assert-robots-txt : OK');
