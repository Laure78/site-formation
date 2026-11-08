/**
 * Contrôles programmes harmonisés — modules des 5 parcours métiers.
 * Usage : npx tsx scripts/assert-module-programmes-parcours.ts
 */
import { MODULES_CATALOGUE_2027 } from '../data/catalogue-2027/modules';
import {
  getModuleProgrammePedagogique,
  PARCOURS_METIERS_PROGRAMME_CODES,
  sumSequencesMinutes,
} from '../data/catalogue-2027/module-programmes';

const errors: string[] = [];

for (const code of PARCOURS_METIERS_PROGRAMME_CODES) {
  const prog = getModuleProgrammePedagogique(code);
  const mod = MODULES_CATALOGUE_2027.find((m) => m.code === code);
  if (!prog) {
    errors.push(`${code} : programme structuré manquant`);
    continue;
  }
  if (!mod) {
    errors.push(`${code} : module catalogue manquant`);
    continue;
  }
  const expectedMinutes = mod.niveau === 3 ? 840 : 240;
  const total = sumSequencesMinutes(prog.sequences);
  if (total !== expectedMinutes) {
    errors.push(`${code} : ${total} min (attendu ${expectedMinutes})`);
  }
  if (!mod.programmeSequences?.length) {
    errors.push(`${code} : programmeSequences non propagé sur le module`);
  }
  if (!mod.objectifsMesurables?.length) {
    errors.push(`${code} : objectifsMesurables manquants`);
  }
  if (prog.objectifsMesurables.length < 2) {
    errors.push(`${code} : moins de 2 objectifs mesurables`);
  }
  if (!prog.usageIa.description.trim()) {
    errors.push(`${code} : usage IA vide`);
  }
}

console.log('=== Programmes parcours métiers ===');
if (errors.length) {
  console.error(errors.join('\n'));
  process.exit(1);
}
console.log(`OK — ${PARCOURS_METIERS_PROGRAMME_CODES.length} modules harmonisés (240 ou 840 min).`);
