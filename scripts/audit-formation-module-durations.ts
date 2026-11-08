#!/usr/bin/env npx tsx
/**
 * Audit durées modules — somme des minutes vs cible par niveau (240 / 840).
 * Usage : npm run audit:formation-durations
 */
import { getFormationByCode } from '../data/formations';
import {
  getCatalogueFormationPageContent,
  hasCatalogueFormationPageTemplate,
} from '../lib/catalogue-formation-page-content';
import type { FormationCatalogueCode } from '../lib/formation-catalogue-visibility';
import {
  formationDureeCibleMinutes,
  formationNiveauOfficielLabel,
  formationTarifHtParNiveau,
} from '../lib/formation-niveaux-officiels';
import { DEV_WEB_IA_JOUR1_DUREE_MINUTES } from '../lib/dev-web-ia-programme-catalogue';
import { sumProgrammeModulesMinutes } from '../lib/formation-program-module-display';
import { libelleTarifParticipantCatalogue } from '../lib/tarifs-catalogue-participant';

const REFS: FormationCatalogueCode[] = [
  'NIV-01',
  'NIV-02',
  'NIV-03',
  'NIV-04',
  'NIV-05',
  'NIV-09',
  'NIV-10',
  'NIV-11',
  'NIV-12',
];

type Row = {
  ref: string;
  niveau: string;
  minutes: number;
  cible: number;
  ok: boolean;
  tarif: string;
  effectif: string;
};

const rows: Row[] = [];
let exitCode = 0;

for (const ref of REFS) {
  if (!hasCatalogueFormationPageTemplate(ref)) continue;
  const formation = getFormationByCode(ref);
  if (!formation) {
    console.error(`❌ ${ref} : entrée data/formations manquante`);
    exitCode = 1;
    continue;
  }
  const content = getCatalogueFormationPageContent(ref);
  const modules = content.programModules ?? [];
  let minutes = sumProgrammeModulesMinutes(modules);
  if (ref === 'NIV-10') {
    minutes = DEV_WEB_IA_JOUR1_DUREE_MINUTES * 2;
  }
  const cible = formationDureeCibleMinutes(formation.niveau);
  const ok = minutes === cible;
  if (!ok) exitCode = 1;
  rows.push({
    ref,
    niveau: formationNiveauOfficielLabel(formation.niveau),
    minutes,
    cible,
    ok,
    tarif: libelleTarifParticipantCatalogue(
      formation.tarifParticipantHt ?? formationTarifHtParNiveau(formation.niveau),
    ),
    effectif: `${formation.effectifMin}–${formation.effectifMax}`,
  });
}

console.log('\nAudit durées modules catalogue\n');
console.log('REF\tNiveau\tSomme (min)\tCible\tTarif\tEffectif\tOK');
for (const r of rows) {
  console.log(
    `${r.ref}\t${r.niveau}\t${r.minutes}\t${r.cible}\t${r.tarif}\t${r.effectif}\t${r.ok ? '✓' : '✗'}`,
  );
}

if (exitCode !== 0) {
  console.error('\nÉcart de durée détecté — ajuster les titres de modules (minutes dans le titre).');
}
process.exit(exitCode);
