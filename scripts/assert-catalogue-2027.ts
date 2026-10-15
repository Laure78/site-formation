/**
 * Contrôles métier catalogue 2027.
 * Usage : npx tsx scripts/assert-catalogue-2027.ts
 */
import {
  assertCatalogueModulesIntegrity,
  assertCatalogueParcoursIntegrity,
} from '../data/catalogue-2027';

const m = assertCatalogueModulesIntegrity();
const p = assertCatalogueParcoursIntegrity();

console.log('=== Catalogue 2027 — contrôles métier ===');
console.log('Modules:', m.counts);
if (!m.ok) {
  console.error('Erreurs modules:', m.errors);
} else {
  console.log('Modules: OK');
}
if (!p.ok) {
  console.error('Erreurs parcours:', p.errors);
} else {
  console.log('Parcours: OK');
}

if (!m.ok || !p.ok) {
  process.exit(1);
}
console.log('Tous les contrôles métier sont passés.');
