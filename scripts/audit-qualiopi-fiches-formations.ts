#!/usr/bin/env npx tsx
/**
 * Audit Qualiopi — fiches catalogue : bloc Indicateur 1 présent + données complètes.
 * Usage : npm run audit:qualiopi-fiches
 */

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { FORMATIONS_CATALOGUE } from '../lib/formations-catalogue-display';
import { getInfosPratiquesForCatalogue } from '../lib/infos-pratiques-catalogue';
import { QUALIOPI_INDICATEUR1_LABELS } from '../lib/qualiopi-indicateur1-labels';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');

const FICHES = [
  { ref: 'NIV-01', file: 'app/formations/ia-batiment-travaux-publics/page.tsx' },
  { ref: 'NIV-02', file: 'app/formations/ia-appels-offre-btp/page.tsx' },
  { ref: 'NIV-03', file: 'app/formations/ia-conduite-travaux-suivi-chantier/page.tsx' },
  { ref: 'NIV-04', file: 'app/formations/maitriser-claude-ai-btp/page.tsx' },
  { ref: 'NIV-05', file: 'app/formations/ia-maitrise-oeuvre/page.tsx' },
] as const;

function auditPageSource(ref: string, relPath: string): string[] {
  const abs = path.join(ROOT, relPath);
  if (!fs.existsSync(abs)) {
    return [`Fichier introuvable : ${relPath}`];
  }
  const src = fs.readFileSync(abs, 'utf8');
  const problems: string[] = [];
  if (!src.includes('CatalogueInfosPratiques')) {
    problems.push('Composant CatalogueInfosPratiques absent');
  }
  if (!src.includes(`programmeRef="${ref}"`)) {
    problems.push(`programmeRef="${ref}" absent`);
  }
  if (!src.includes('catalogueRef=')) {
    problems.push('Hero sans catalogueRef (lien vers informations réglementaires)');
  }
  return problems;
}

function main() {
  let failed = false;

  console.log('Audit Qualiopi — fiches formation catalogue (Indicateur 1)\n');

  for (const fiche of FICHES) {
    const pageProblems = auditPageSource(fiche.ref, fiche.file);
    const dataProblems: string[] = [];

    try {
      const data = getInfosPratiquesForCatalogue(fiche.ref);
      if (!data.contenu?.length) dataProblems.push('Contenu de la formation vide');
      if (!data.objectifs?.length) dataProblems.push('Objectifs vides');
      if (!data.methodes?.length) dataProblems.push('Méthodes pédagogiques vides');
      if (!data.modalitesEvaluation?.length) dataProblems.push("Modalités d'évaluation vides");
    } catch (err) {
      dataProblems.push(err instanceof Error ? err.message : String(err));
    }

    const ok = pageProblems.length === 0 && dataProblems.length === 0;
    if (!ok) failed = true;

    console.log(`${ok ? '✓' : '✗'} ${fiche.ref} — ${fiche.file}`);
    for (const p of [...pageProblems, ...dataProblems]) {
      console.log(`    · ${p}`);
    }
  }

  console.log('\nLibellés Indicateur 1 (grille audit) :');
  for (const label of Object.values(QUALIOPI_INDICATEUR1_LABELS)) {
    console.log(`  · ${label}`);
  }

  console.log(`\nCatalogue : ${FORMATIONS_CATALOGUE.length} parcours — ${FICHES.length} fiches auditées.`);

  if (failed) {
    console.error('\nÉchec audit Qualiopi fiches formation.');
    process.exit(1);
  }

  console.log('\nAudit Qualiopi fiches formation : OK.');
}

main();
