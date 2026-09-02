/**
 * Contrôles catalogue hub `/ressources`.
 * Usage : `npx tsx scripts/assert-ressources-catalog.ts`
 */
import assert from 'node:assert/strict';
import { existsSync } from 'node:fs';
import path from 'node:path';
import {
  getRessourcesCatalog,
  getRessourcesCounts,
  getFeaturedRessources,
} from '../lib/ressources-catalog';
import { TUTOS } from '../lib/tutos';
import { RESSOURCES_GUIDES } from '../lib/ressources-guides';

const catalog = getRessourcesCatalog();
const counts = getRessourcesCounts();
const featured = getFeaturedRessources();

assert.ok(catalog.length > 0, 'catalogue vide');
assert.equal(new Set(catalog.map((r) => r.id)).size, catalog.length, 'ids dupliqués');
assert.equal(counts.tutoriels, TUTOS.length, 'compteur tutoriels ≠ TUTOS');
assert.ok(featured.length <= 3, 'plus de 3 featured');
assert.ok(featured.length >= 1, 'aucun featured');

for (const entry of catalog) {
  assert.ok(entry.title.trim(), `titre manquant: ${entry.id}`);
  assert.ok(entry.viewUrl.trim(), `viewUrl manquant: ${entry.id}`);
  assert.ok(entry.resourceType, `type manquant: ${entry.id}`);
  assert.ok(entry.primaryAction.trim(), `primaryAction manquant: ${entry.id}`);
  assert.ok(entry.status === 'actif' || entry.status === 'a_verifier' || entry.status === 'archive');

  const blob = `${entry.title} ${entry.shortDescription}`;
  assert.equal(blob.includes('__'), false, `placeholder dans ${entry.id}`);
  assert.equal(/prêt à signer|juridiquement formels|conforme R\d+/i.test(blob), false, `promesse sensible hub: ${entry.id}`);

  if (entry.downloadUrl?.startsWith('/')) {
    const filePath = path.join(process.cwd(), 'public', entry.downloadUrl);
    assert.ok(existsSync(filePath), `fichier absent: ${entry.downloadUrl} (${entry.id})`);
  }
}

for (const guide of RESSOURCES_GUIDES) {
  if (guide.pdfHref.startsWith('/')) {
    const filePath = path.join(process.cwd(), 'public', guide.pdfHref);
    assert.ok(existsSync(filePath), `PDF guide absent: ${guide.pdfHref}`);
  }
}

for (const tuto of TUTOS) {
  const filePath = path.join(process.cwd(), 'public', 'ressources', 'pdf', tuto.pdfFile);
  assert.ok(existsSync(filePath), `PDF tuto absent: ${tuto.pdfFile}`);
}

console.log(
  `assert-ressources-catalog : OK (${catalog.length} ressources, ${counts.tutoriels} tutos, ${counts.skills} skills, ${featured.length} featured)`,
);
