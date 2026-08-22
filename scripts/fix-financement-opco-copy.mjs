#!/usr/bin/env node
/**
 * Remplace les formulations financement OPCO à risque par des libellés conformes.
 * Usage : node scripts/fix-financement-opco-copy.mjs [--dry-run]
 */
import fs from 'node:fs';
import path from 'node:path';

const ROOT = path.resolve(import.meta.dirname, '..');
const DRY_RUN = process.argv.includes('--dry-run');

const SKIP_DIRS = new Set([
  'node_modules',
  '.git',
  '.next',
  'dist',
  'public/ressources/skills',
]);

const EXT = new Set(['.ts', '.tsx', '.mdx', '.json']);

const REPLACEMENTS = [
  [
    /Finançable par Constructys selon éligibilité/g,
    "Prise en charge Constructys possible selon l'éligibilité, les critères applicables et les plafonds en vigueur",
  ],
  [
    /finançables via Constructys \/ OPCO selon éligibilité/gi,
    "éligibles à une prise en charge OPCO selon éligibilité et plafonds applicables",
  ],
  [
    /finançables Constructys selon éligibilité/gi,
    "éligibles à une prise en charge OPCO (Constructys) selon éligibilité et plafonds applicables",
  ],
  [
    /finançables par Constructys selon éligibilité/gi,
    "éligibles à une prise en charge OPCO (Constructys) selon éligibilité et plafonds applicables",
  ],
  [
    /finançable par Constructys selon éligibilité/gi,
    "éligible à une prise en charge OPCO (Constructys) selon éligibilité et plafonds applicables",
  ],
  [
    /finançable Constructys selon éligibilité/gi,
    "éligible à une prise en charge OPCO (Constructys) selon éligibilité et plafonds applicables",
  ],
  [
    /finançable OPCO Constructys selon éligibilité/gi,
    "éligible à une prise en charge OPCO (Constructys) selon éligibilité et plafonds applicables",
  ],
  [
    /finançables \*\*Constructys\*\* selon éligibilité/g,
    "**éligibles à une prise en charge OPCO (Constructys) selon éligibilité et plafonds applicables**",
  ],
  [
    /Sessions intra finançables selon éligibilité/g,
    "Sessions intra — prise en charge OPCO possible selon éligibilité",
  ],
  [
    /finançables \*\*Constructys\*\* selon éligibilité/g,
    "**éligibles à une prise en charge OPCO (Constructys) selon éligibilité et plafonds applicables**",
  ],
  [
    /finançables \{/g,
    "éligibles à une prise en charge OPCO selon éligibilité {",
  ],
  [
    /100 % prise en charge pour les entreprises de moins de 50 salariés \(selon éligibilité Constructys \/ PDC\)/g,
    "prise en charge possible selon éligibilité, critères Constructys et plafonds applicables — un reste à charge peut s'appliquer",
  ],
  [
    /100 % prise en charge pour les entreprises de moins de 50 salariés/g,
    "prise en charge possible selon éligibilité et plafonds applicables — un reste à charge peut s'appliquer",
  ],
  [
    /peut financer une partie ou la totalité des formations IA selon éligibilité/g,
    "peut participer au financement des formations IA, en partie ou en totalité, selon éligibilité et plafonds — un reste à charge peut s'appliquer",
  ],
  [
    /financée par OPCO Constructys dans le cadre du plan/g,
    "faire l'objet d'une prise en charge OPCO (Constructys) dans le cadre du plan, sous réserve d'éligibilité et des plafonds applicables",
  ],
  [
    /peuvent être financées par OPCO Constructys selon les règles applicables/g,
    "peuvent faire l'objet d'une prise en charge OPCO (Constructys), sous réserve d'éligibilité et dans la limite des plafonds applicables",
  ],
  [
    /peuvent être financées par OPCO Constructys selon les règles applicables à votre entreprise/g,
    "peuvent faire l'objet d'une prise en charge OPCO (Constructys), sous réserve d'éligibilité et dans la limite des plafonds applicables",
  ],
  [
    /peuvent être financées par OPCO Constructys selon les règles applicables à votre structure/g,
    "peuvent faire l'objet d'une prise en charge OPCO (Constructys), sous réserve d'éligibilité et dans la limite des plafonds applicables",
  ],
  [
    /peut être financée par l'OPCO Constructys dans le cadre habituel du plan de développement des compétences/g,
    "peut faire l'objet d'une prise en charge OPCO (Constructys) dans le cadre du plan de développement des compétences, sous réserve d'éligibilité et des plafonds applicables",
  ],
  [
    /peuvent être financées dans le cadre du plan de développement des compétences selon les règles Constructys/g,
    "peuvent faire l'objet d'une prise en charge dans le cadre du plan de développement des compétences, sous réserve d'éligibilité et des plafonds Constructys applicables",
  ],
  [
    /peuvent être financées dans le cadre du plan de/g,
    "peuvent faire l'objet d'une prise en charge dans le cadre du plan de",
  ],
  [
    /peuvent être financées selon les règles Constructys en vigueur/g,
    "peuvent faire l'objet d'une prise en charge selon les règles Constructys en vigueur, sous réserve d'éligibilité et des plafonds applicables",
  ],
  [
    /La formation IA pour le BTP est-elle finançable \? — Oui, éligible à une prise en charge par Constructys ou votre OPCO selon statut, branche et conditions en vigueur\. Consultez nos tarifs et prenez rendez-vous pour un devis personnalisé\./g,
    "La formation IA pour le BTP peut-elle faire l'objet d'une prise en charge OPCO ? — Prise en charge possible selon éligibilité et plafonds applicables. Un reste à charge peut s'appliquer. L'accord doit être obtenu auprès de l'organisme financeur avant le démarrage. Consultez nos tarifs et prenez rendez-vous pour étudier votre dossier.",
  ],
  [
    /Les formations sont-elles finançables \? — Oui, pour les entreprises du BTP, les parcours certifiés Qualiopi peuvent être pris en charge dans le cadre du plan de développement des compétences via l'OPCO Constructys, sous conditions\./g,
    "Les formations peuvent-elles faire l'objet d'une prise en charge OPCO ? — Pour les entreprises du BTP, les parcours certifiés Qualiopi peuvent faire l'objet d'une prise en charge via Constructys, sous réserve d'éligibilité et des plafonds applicables. Un reste à charge peut s'appliquer.",
  ],
  [
    /C'est finançable \? — Les formations certifiées Qualiopi peuvent être éligibles au financement OPCO selon votre situation\./g,
    "Une prise en charge OPCO est-elle possible ? — Les formations certifiées Qualiopi peuvent faire l'objet d'une prise en charge selon éligibilité et plafonds applicables. Un reste à charge peut s'appliquer.",
  ],
  [
    /Financement partiel possible selon éligibilité\./g,
    "Prise en charge OPCO possible selon éligibilité et plafonds applicables.",
  ],
  [
    /Financement possible selon éligibilité/g,
    "Financement OPCO possible*",
  ],
  [
    /Formation éligible à une prise en charge partielle par Constructys ou votre OPCO, selon votre statut, votre branche professionnelle et les conditions en vigueur\./g,
    "Cette formation peut faire l'objet d'une prise en charge par votre OPCO, sous réserve d'éligibilité et dans la limite des critères et plafonds de financement applicables. Un reste à charge peut s'appliquer.",
  ],
  [
    /finançable par Constructys selon éligibilité \(plafond indicatif/gi,
    "éligible à une prise en charge OPCO (Constructys) selon éligibilité et plafonds applicables (plafond indicatif",
  ],
  [
    /finançable Constructys \(selon éligibilité\)/gi,
    "prise en charge OPCO (Constructys) possible selon éligibilité et plafonds applicables",
  ],
  [
    /financée par Constructys \?/g,
    "faire l'objet d'une prise en charge Constructys ?",
  ],
  [
    /financée par Constructys/g,
    "faire l'objet d'une prise en charge Constructys",
  ],
  [
    /financement 100\s*% Constructys/gi,
    "financement OPCO possible selon éligibilité (Constructys)",
  ],
  [
    /100\s*%\s*financé/gi,
    "financement OPCO possible selon éligibilité",
  ],
  [
    /100\s*%\s*Constructys/gi,
    "Constructys — selon éligibilité et plafonds",
  ],
  [
    /finançable par Constructys selon éligibilité/gi,
    "éligible à une prise en charge OPCO (Constructys) selon éligibilité et plafonds applicables",
  ],
];

const FAQ_BLOG_OLD =
  "Oui, éligible à une prise en charge par Constructys ou votre OPCO selon statut, branche et conditions en vigueur. Consultez nos tarifs et prenez rendez-vous pour un devis personnalisé.";
const FAQ_BLOG_NEW =
  "Prise en charge OPCO possible selon éligibilité et plafonds applicables. Un reste à charge peut s'appliquer. L'accord doit être obtenu auprès de l'organisme financeur avant le démarrage.";

function walk(dir, files = []) {
  for (const name of fs.readdirSync(dir)) {
    if (SKIP_DIRS.has(name)) continue;
    const full = path.join(dir, name);
    const rel = path.relative(ROOT, full);
    if (SKIP_DIRS.has(rel)) continue;
    const stat = fs.statSync(full);
    if (stat.isDirectory()) {
      walk(full, files);
    } else if (EXT.has(path.extname(name))) {
      if (rel.startsWith('docs/') || rel.startsWith('GEO-') || rel.endsWith('.md') && !rel.endsWith('.mdx')) {
        if (!rel.startsWith('content/')) continue;
      }
      files.push(full);
    }
  }
  return files;
}

let changedFiles = 0;
let totalReplacements = 0;

for (const file of walk(ROOT)) {
  const rel = path.relative(ROOT, file);
  if (rel.startsWith('scripts/fix-financement-opco-copy.mjs')) continue;
  if (rel === 'lib/financement-copy.ts') continue;

  let content = fs.readFileSync(file, 'utf8');
  const original = content;

  for (const [pattern, replacement] of REPLACEMENTS) {
    content = content.replace(pattern, replacement);
  }
  content = content.split(FAQ_BLOG_OLD).join(FAQ_BLOG_NEW);

  if (content !== original) {
    changedFiles += 1;
    if (!DRY_RUN) fs.writeFileSync(file, content, 'utf8');
    totalReplacements += 1;
    console.log(DRY_RUN ? '[dry-run] ' : '', rel);
  }
}

console.log(`\n${changedFiles} fichier(s) ${DRY_RUN ? 'à modifier' : 'modifié(s)'}.`);
