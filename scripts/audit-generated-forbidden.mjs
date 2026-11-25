/**
 * Audit bloquant (non fatal) — termes interdits dans `content/generated/*.json`.
 * Usage : `node scripts/audit-generated-forbidden.mjs`
 */
import { readFileSync, readdirSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const DIR = path.join(ROOT, 'content/generated');

const TERMS = [
  { label: '4,85/5', re: /4[,.]85/ },
  { label: '1 592 formés', re: /1[\s\u00a0]?592|1592\s+personnes/ },
  { label: 'Guyancourt siège', re: /siège.*Guyancourt|Guyancourt.*siège/i },
  { label: 'GERESO', re: /GERESO/i },
  { label: 'Lefebvre Dalloz', re: /Lefebvre\s+Dalloz/i },
  { label: 'Mon Compte Formation', re: /Mon Compte Formation/i },
  { label: 'conductrice de travaux', re: /conductrice\s+de\s+travaux/i },
  { label: '100 % finançable', re: /100\s*%\s*finanç|finançable\s+à\s+100/i },
  { label: 'formation à distance (promesse)', re: /(?:nous\s+)?proposons.*à\s+distance|formation\s+en\s+ligne\s+catalogue/i },
];

const files = readdirSync(DIR).filter((f) => f.endsWith('.json'));
const hits = [];

for (const file of files) {
  const text = readFileSync(path.join(DIR, file), 'utf8');
  for (const { label, re } of TERMS) {
    if (re.test(text)) hits.push({ file, term: label });
  }
  try {
    const { slug } = JSON.parse(text);
    if (typeof slug === 'string' && /artisan/i.test(slug)) {
      hits.push({ file, term: 'slug contenant « artisan »' });
    }
  } catch {
    /* ignore JSON invalide — autres audits */
  }
  if (/article-[^"]*artisan[^"]*\.json$/i.test(file)) {
    hits.push({ file, term: 'nom de fichier « artisan »' });
  }
}

if (!hits.length) {
  console.log(`audit-generated-forbidden : OK (${files.length} fichiers)`);
  process.exit(0);
}

console.log(`audit-generated-forbidden : ${hits.length} occurrence(s) sur ${files.length} fichiers\n`);
for (const h of hits) console.log(`  [${h.term}] ${h.file}`);
process.exit(1);