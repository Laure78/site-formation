#!/usr/bin/env node
/**
 * Passe 2 — remplace les affichages « formés » par la note Qualiopi sourcée.
 * Sans regex dangereuse sur les spreads.
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { execSync } from 'child_process';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');

const NOTE_IMPORT = "import { formatNoteSatisfactionAffichageComplet, formatNoteSatisfactionSur5 } from '@/lib/data/indicateurs-resultats';";
const NOTE_IMPORT_SHORT = "import { formatNoteSatisfactionSur5 } from '@/lib/data/indicateurs-resultats';";

function ensureImport(content, full = false) {
  const imp = full ? NOTE_IMPORT : NOTE_IMPORT_SHORT;
  if (content.includes("from '@/lib/data/indicateurs-resultats'")) return content;
  const idx = content.lastIndexOf('\nimport ');
  const at = idx === -1 ? 0 : content.indexOf('\n', idx) + 1;
  return content.slice(0, at) + imp + '\n' + content.slice(at);
}

const REPLACEMENTS = [
  // Meta / descriptions
  [/\$\{formatProofFormes\(\)\} pros\.?\s*/g, ''],
  [/\$\{formatProofFormes\(PROOF\.formes\)\} pros\.?\s*/g, ''],
  [/\$\{formatProofFormes\(\)\} professionnels formés · \$\{formatNoteSatisfactionAffichageComplet\(\)\}/g, '${formatNoteSatisfactionAffichageComplet()}'],
  [/\$\{formatProofFormes\(PROOF\.formes\)\} professionnels formés · \$\{formatNoteSatisfactionAffichageComplet\(\)\}/g, '${formatNoteSatisfactionAffichageComplet()}'],
  [/`Plus de \$\{formatProfessionalsTrainedCount\(\)\} professionnels BTP formés · Note  · Organisme certifié Qualiopi\.`/g, '`Organisme certifié Qualiopi.`'],
  [/`Plus de \$\{formatProfessionalsTrainedCount\(\)\} professionnels BTP formés ·\s*`/g, '`Organisme certifié Qualiopi. `'],
  // JSX values
  [/\{formatProfessionalsTrainedCount\(\)\}/g, '{formatNoteSatisfactionSur5()}'],
  [/\{formatPersonnesFormeesCount\(\)\}/g, '{formatNoteSatisfactionSur5()}'],
  [/\{formatProofFormes\(\)\}/g, '{formatNoteSatisfactionSur5()}'],
  [/\{formatProofFormes\(PROOF\.formes\)\}/g, '{formatNoteSatisfactionSur5()}'],
  [/<strong>\+\{formatProfessionalsTrainedCount\(\)\} professionnels<\/strong> formés\./g, '<strong>{formatNoteSatisfactionAffichageComplet()}</strong>'],
  [/<strong className="text-slate-800">\{formatProfessionalsTrainedCount\(\)\} professionnels<\/strong>\{' '\}\s*formés\./g, '<strong className="text-slate-800">{formatNoteSatisfactionAffichageComplet()}</strong>'],
  [/<strong className="text-slate-800">\{formatProofFormes\(PROOF\.formes\)\} professionnels<\/strong> formés\./g, '<strong className="text-slate-800">{formatNoteSatisfactionAffichageComplet()}</strong>'],
  [/\{formatPersonnesFormeesCount\(indicateursResultats\.personnesFormees\)\} professionnels formés ·\s*/g, ''],
  [/\{formatPersonnesFormeesCount\(\)\} participants formés en présentiel/g, 'Sessions en présentiel'],
  [/\{formatPersonnesFormeesCount\(\)\} formés/g, '{formatNoteSatisfactionSur5()}'],
  [/\{formatPersonnesFormeesCount\(\)\} participants formés/g, 'Participants accompagnés'],
  [/En \{new Date\(\)\.getFullYear\(\)\}, OFC a formé plus de \{formatPersonnesFormeesCount\(\)\} professionnels/g, 'OFC publie ses indicateurs Qualiopi'],
  [/Déjà \{formatProfessionalsTrainedCount\(SOCIAL_PROOF\.PROFESSIONALS_TRAINED\)\}\+ professionnels formés —/g, 'Organisme certifié Qualiopi —'],
  [/plus de \{formatProfessionalsTrainedCount\(\)\} professionnels · \./g, '{formatNoteSatisfactionAffichageComplet()}'],
  [/Plus de \{SOCIAL_PROOF\.PROFESSIONALS_TRAINED\} professionnels formés\./g, 'Organisme certifié Qualiopi.'],
  [/Plus de \{formatProfessionalsTrainedCount\(SOCIAL_PROOF\.PROFESSIONALS_TRAINED\)\} professionnels formés ·\s*\{' '\}/g, ''],
  [/const formés = formatProfessionalsTrainedCount\(\);/g, ''],
  [/\$\{formés\}\+/g, ''],
  [/\+ \{formatProfessionalsTrainedCount\(\)\}/g, ''],
  [/qui a accompagné plus de \{formatProfessionalsTrainedCount\(\)\} professionnels du secteur/g, 'organisme certifié Qualiopi'],
  [/\{formatProfessionalsTrainedCount\(\)\} professionnels formés/g, '{formatNoteSatisfactionAffichageComplet()}'],
  [/\{formatProfessionalsTrainedCount\(\)\} professionnels/g, '{formatNoteSatisfactionAffichageComplet()}'],
  [/\{formatProfessionalsTrainedCount\(\)\} professionnels accompagnés\./g, 'Organisme certifié Qualiopi.'],
  [/`\+$\{formatProfessionalsTrainedCount\(\)\} professionnels du BTP formés depuis 2023/g, '`Organisme certifié Qualiopi'],
  [/label: 'PROS FORMÉS'/g, "label: 'SATISFACTION'"],
  [/label="professionnels formés"/g, 'label="Satisfaction (Qualiopi)"'],
  [/const formesNombreAffiche = formatPersonnesFormeesCount\(\);[\s\S]*?text: `\$\{formesNombreAffiche\} professionnels formés/g, 'text: `Indicateurs Qualiopi publiés'],
  [/value: formatProfessionalsTrainedCount\(\)/g, 'value: formatNoteSatisfactionSur5()'],
  [/value=\{formatProfessionalsTrainedCount\(\)\}/g, 'value={formatNoteSatisfactionSur5()}'],
  [/const personnesFormeesAffiche = `\$\{formatProofFormes\(\)\}\+`;/g, ''],
  [/<strong>\{personnesFormeesAffiche\}<\/strong> professionnels du BTP formés/g, '<strong>{formatNoteSatisfactionAffichageComplet()}</strong>'],
  [/\{formatProofFormes\(\)\} · organisme certifié Qualiopi/g, 'Organisme certifié Qualiopi'],
  [/\{formatProfessionalsTrainedCount\(\)\} professionnels ont/g, 'organisme certifié Qualiopi — sessions'],
  [/\+ \{formatProfessionalsTrainedCount\(\)\}\{' '\}/g, ''],
  [/articles · \{formatProfessionalsTrainedCount\(\)\} professionnels/g, 'articles · indicateurs Qualiopi'],
  [/\+ \{formatProfessionalsTrainedCount\(\)\} personnes formées · Qualiopi/g, 'Qualiopi'],
  [/\{allCount\} articles · \{formatProfessionalsTrainedCount\(\)\} professionnels/g, '{allCount} articles · Qualiopi'],
  [/label: `pros formés · \$\{statsFreshness\}`/g, 'label: `Satisfaction · ${statsFreshness}`'],
  [/items=\[\s*\{ label: 'Professionnels formés', value: COUNT_UP_RATING/g, "items={[{ label: 'Satisfaction (Qualiopi)', value: COUNT_UP_RATING"],
];

function listTargetFiles() {
  try {
    return execSync(
      `rg -l "formatProfessionalsTrainedCount|formatPersonnesFormeesCount|formatProofFormes|PROFESSIONALS_TRAINED|personnesFormeesAffiche|formés = format" app components lib --glob '*.{ts,tsx}'`,
      { cwd: ROOT, encoding: 'utf8' },
    )
      .trim()
      .split('\n')
      .filter(Boolean);
  } catch {
    return [];
  }
}

for (const rel of listTargetFiles()) {
  const fp = path.join(ROOT, rel);
  let c = fs.readFileSync(fp, 'utf8');
  const orig = c;
  for (const [re, rep] of REPLACEMENTS) c = c.replace(re, rep);
  if (c.includes('formatNoteSatisfaction')) c = ensureImport(c, c.includes('formatNoteSatisfactionAffichageComplet'));
  if (c !== orig) {
    fs.writeFileSync(fp, c);
    console.log('UPDATED', rel);
  }
}

console.log('Done v2');
