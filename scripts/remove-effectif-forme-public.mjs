#!/usr/bin/env node
/**
 * Retire les mentions publiques d'effectif formé (audit Qualiopi).
 * Remplace les patterns courants par la note sourcée ou les supprime.
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { execSync } from 'child_process';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');

const TEXT_REPLACEMENTS = [
  [/Plus de \{formatProfessionalsTrainedCount\(\)\} professionnels formés\.?\s*/g, ''],
  [/Plus de \{formatProfessionalsTrainedCount\([^)]*\)\} professionnels formés\.?\s*/g, ''],
  [/\{formatProfessionalsTrainedCount\(\)\}\+ professionnels formés\.?\s*/g, ''],
  [/\{formatProfessionalsTrainedCount\(\)\} professionnels formés\.?\s*/g, ''],
  [/\{formatProfessionalsTrainedCount\(\)\} pros formés\.?\s*/g, ''],
  [/\{formatProfessionalsTrainedCount\(\)\} formés\.?\s*/g, ''],
  [/\{formatPersonnesFormeesCount\(\)\} professionnels formés\.?\s*/g, ''],
  [/\{formatPersonnesFormeesCount\(\)\} pros formés\.?\s*/g, ''],
  [/\{formatPersonnesFormeesCount\([^)]*\)\} professionnels formés\.?\s*/g, ''],
  [/Déjà \{formatProofFormes\(PROOF\.formes\)\} professionnels formés ·\s*/g, ''],
  [/Déjà \{formatProofFormes\(PROOF\.formes\)\} professionnels formés · /g, ''],
  [/Déjà \{formatProofFormes\(PROOF\.formes\)\} professionnels formés · \$\{/g, '${'],
  [/\{formatProofFormes\(PROOF\.formes\)\} professionnels formés\.?\s*/g, ''],
  [/<strong>\{formatProofFormes\(PROOF\.formes\)\} professionnels<\/strong> formés\.\s*/g, ''],
  [/Indicateurs sourcés \{OFC\} : \{formatProofFormes\(PROOF\.formes\)\} professionnels formés \(\{PROOF\.mentionSource\}\)/g, 'Indicateurs sourcés {OFC} : {PROOF.mentionSource}'],
  [/Plus de \{formatProfessionalsTrainedCount\(SOCIAL_PROOF\.PROFESSIONALS_TRAINED\)\} professionnels formés ·\s*/g, ''],
  [/Plus de \{formatProfessionalsTrainedCount\(SOCIAL_PROOF\.PROFESSIONALS_TRAINED\)\} professionnels formés · \{' '\}/g, ''],
  [/\{SOCIAL_PROOF\.PROFESSIONALS_TRAINED\}\+ professionnels formés/g, 'Organisme certifié Qualiopi'],
  [/✓ \{formatPersonnesFormeesCount\(\)\} pros formés ·\s*/g, '✓ '],
  [/✓ \{formatProfessionalsTrainedCount\(\)\} pros formés\s*/g, ''],
  [/\$\{formatProfessionalsTrainedCount\(\)\}\+ pros formés · note /g, '${formatNoteSatisfactionAffichageComplet()} — '],
  [/,\s*\{formatProfessionalsTrainedCount\(\)\} professionnels formés/g, ''],
  [/· \{formatProfessionalsTrainedCount\(\)\} professionnels formés/g, ''],
  [/· \+\$\{N\} professionnels formés \(/g, ' · ('],
  [/\+\$\{N\} professionnels formés \(/g, '('],
  [/\$\{formés\}\+ professionnels formés\/5\./g, '${formatNoteSatisfactionAffichageComplet()}.'],
  [/professionnels formés\/5\./g, ''],
  [/1&nbsp;500\+ professionnels formés \(OFC, Qualiopi\)\./g, 'Organisme certifié Qualiopi.'],
  [/\$\{OFC\} a formé plus de \$\{formatProfessionalsTrainedCount\(\)\} professionnels \(/g, '${OFC} — satisfaction mesurée ('],
  [/Plus de \$\{formatProfessionalsTrainedCount\(\)\} professionnels formés · \$\{/g, '${'],
  [/Plus de \$\{formatProfessionalsTrainedCount\(\)\} professionnels formés, /g, ''],
  [/Plus de \$\{formatProfessionalsTrainedCount\(\)\} professionnels formés\./g, 'Organisme certifié Qualiopi.'],
  [/Plus de \$\{formatProfessionalsTrainedCount\(\)\} professionnels formés/g, 'Organisme certifié Qualiopi'],
  [/,\s*note \./g, ', ${formatNoteSatisfactionAffichageComplet()}'],
  [/Note \./g, ''],
  [/note \./g, ''],
  [/,\s*\./g, '.'],
  [/\. \./g, '.'],
];

const IMPORTS_TO_STRIP = [
  'formatProfessionalsTrainedCount',
  'formatPersonnesFormeesCount',
  'formatPersonnesFormeesCountPlus',
  'PROS_FORMES_TEXTE',
  'PROS_FORMES_TEXTE_COMPLET',
];

const PROOF_IMPORTS_TO_STRIP = ['formatProofFormes'];

function listFiles() {
  const out = execSync(
    `rg -l "formatProfessionalsTrainedCount|formatPersonnesFormeesCount|formatProofFormes|COUNT_UP_PROS|PROFESSIONALS_TRAINED|professionnels formés|pros formés" app components lib --glob '*.{ts,tsx}'`,
    { cwd: ROOT, encoding: 'utf8' },
  );
  return out.trim().split('\n').filter(Boolean);
}

function stripNamedImport(content, names) {
  let c = content;
  for (const name of names) {
    c = c.replace(
      new RegExp(`import\\s*\\{([^}]*?)\\b${name}\\b,?\\s*([^}]*?)\\}\\s*from\\s*['"]@/lib/constants['"];?\\n`, 'g'),
      (_, before, after) => {
        const rest = `${before}${after}`.replace(/,\s*,/g, ',').replace(/^,\s*/, '').replace(/,\s*$/, '').trim();
        if (!rest) return '';
        return `import { ${rest} } from '@/lib/constants';\n`;
      },
    );
    c = c.replace(
      new RegExp(`import\\s*\\{([^}]*?)\\b${name}\\b,?\\s*([^}]*?)\\}\\s*from\\s*['"]@/lib/proof['"];?\\n`, 'g'),
      (_, before, after) => {
        const rest = `${before}${after}`.replace(/,\s*,/g, ',').replace(/^,\s*/, '').replace(/,\s*$/, '').trim();
        if (!rest) return '';
        return `import { ${rest} } from '@/lib/proof';\n`;
      },
    );
  }
  return c;
}

function addNoteImportIfNeeded(content) {
  if (
    content.includes('formatNoteSatisfactionAffichageComplet') &&
    !content.includes("from '@/lib/data/indicateurs-resultats'")
  ) {
    const idx = content.lastIndexOf('\nimport ');
    const insertAt = idx === -1 ? 0 : content.indexOf('\n', idx) + 1;
    return (
      content.slice(0, insertAt) +
      "import { formatNoteSatisfactionAffichageComplet } from '@/lib/data/indicateurs-resultats';\n" +
      content.slice(insertAt)
    );
  }
  return content;
}

function addNoteSur5ImportIfNeeded(content) {
  if (
    (content.includes('formatNoteSatisfactionSur5') || content.includes('COUNT_UP_RATING')) &&
    !content.includes("from '@/lib/data/indicateurs-resultats'") &&
    !content.includes("from '@/lib/readability-presets'")
  ) {
    const idx = content.lastIndexOf('\nimport ');
    const insertAt = idx === -1 ? 0 : content.indexOf('\n', idx) + 1;
    return (
      content.slice(0, insertAt) +
      "import { formatNoteSatisfactionSur5 } from '@/lib/data/indicateurs-resultats';\n" +
      content.slice(insertAt)
    );
  }
  return content;
}

for (const rel of listFiles()) {
  const fp = path.join(ROOT, rel);
  let c = fs.readFileSync(fp, 'utf8');
  const orig = c;

  c = c.replace(/COUNT_UP_PROS_PLUS/g, 'COUNT_UP_RATING');
  c = c.replace(/COUNT_UP_PROS_PLUS_SUFFIX/g, 'COUNT_UP_RATING');
  c = c.replace(/COUNT_UP_PROS\b/g, 'COUNT_UP_RATING');

  for (const [re, rep] of TEXT_REPLACEMENTS) {
    c = c.replace(re, rep);
  }

  c = stripNamedImport(c, IMPORTS_TO_STRIP);
  c = stripNamedImport(c, PROOF_IMPORTS_TO_STRIP);
  c = addNoteImportIfNeeded(c);
  c = addNoteSur5ImportIfNeeded(c);

  // StatCallout / hero labels
  c = c.replace(/label:\s*['"]pros formés['"]/g, "label: 'Satisfaction (Qualiopi)'");
  c = c.replace(/label:\s*['"]professionnels formés['"]/g, "label: 'Satisfaction (Qualiopi)'");
  c = c.replace(/label:\s*['"]Professionnels formés['"]/g, "label: 'Satisfaction (Qualiopi)'");
  c = c.replace(/label:\s*`pros formés · \$\{statsFreshness\}`/g, "label: `Satisfaction · ${statsFreshness}`");

  // FormationsHero stat value
  c = c.replace(
    /\{ icon: Users, value: formatProfessionalsTrainedCount\(\), label: 'pros formés' \}/g,
    "{ icon: Users, value: formatNoteSatisfactionSur5(), label: 'Satisfaction (Qualiopi)' }",
  );

  if (c !== orig) {
    fs.writeFileSync(fp, c);
    console.log('UPDATED', rel);
  }
}

console.log('Done.');
