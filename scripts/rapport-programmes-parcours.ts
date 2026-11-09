/**
 * Rapport avant/après — structure des programmes parcours métiers.
 * Usage : npx tsx scripts/rapport-programmes-parcours.ts
 */
import {
  assertProgrammesParcoursIntegrity,
  libelleStructureProgramme,
  rapportProgrammeLigne,
} from '../data/catalogue-2027/module-programmes/assert-programmes';
import { PARCOURS_METIERS_PROGRAMME_CODES } from '../data/catalogue-2027/module-programmes/programmes-parcours';

const AVANT = [
  'A. Objectifs pédagogiques',
  'B. Prérequis',
  'C. Programme chronologique',
  'D. Exercice professionnel BTP (variante parcours)',
  'E. Utilisation de l’IA',
  'F. Livrables',
  'G. Évaluation des acquis',
  'H. Vérifications humaines et confidentialité',
];

const APRES = libelleStructureProgramme();

console.log('# Programmes parcours métiers — restructuration A→J\n');
console.log('## Structure commune\n');
console.log('| Avant (UI) | Après (référentiel) |');
console.log('| --- | --- |');
for (let i = 0; i < Math.max(AVANT.length, APRES.length); i++) {
  console.log(`| ${AVANT[i] ?? '—'} | ${APRES[i] ?? '—'} |`);
}

console.log('\n## Contrôle qualité (23 modules)\n');
const check = assertProgrammesParcoursIntegrity();
console.log(check.ok ? 'Tous les contrôles programmes : OK' : `Erreurs : ${check.errors.join(' ; ')}`);

console.log('\n## Modules des 5 parcours\n');
console.log('| Code | Niveau | Minutes | ~% pratique | IA | Objectifs |');
console.log('| --- | --- | --- | --- | --- | --- |');
for (const code of PARCOURS_METIERS_PROGRAMME_CODES) {
  const r = rapportProgrammeLigne(code);
  console.log(
    `| ${r.code} | ${r.niveau} | ${r.minutes} | ${r.pctPratique} % | ${r.ia} | ${r.objectifs} |`,
  );
}
