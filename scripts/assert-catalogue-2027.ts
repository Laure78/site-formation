/**
 * Contrôles métier catalogue 2027.
 * Usage : npx tsx scripts/assert-catalogue-2027.ts
 */
import {
  assertCatalogueModulesIntegrity,
  assertCatalogueParcoursIntegrity,
} from '../data/catalogue-2027';
import { assertProgrammesParcoursIntegrity } from '../data/catalogue-2027/module-programmes/assert-programmes';

const m = assertCatalogueModulesIntegrity();
const p = assertCatalogueParcoursIntegrity();
const prog = assertProgrammesParcoursIntegrity();

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

console.log('Programmes parcours:', prog.modules);
if (!prog.ok) {
  console.error('Erreurs programmes:', prog.errors);
} else {
  console.log('Programmes: OK');
}

if (!m.ok || !p.ok || !prog.ok) {
  process.exit(1);
}
console.log('Tous les contrôles métier sont passés.');
