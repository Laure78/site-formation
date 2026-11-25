/**
 * Liste les fichiers qui déclarent un nœud Organization / EducationalOrganization « complet »
 * (name + url…) en plus du layout `#organization`.
 * Références `@id` seules ou `worksFor` / `founder` → OK.
 *
 * Usage : node scripts/audit-schema-organization-duplicates.mjs
 */
import { execSync } from 'node:child_process';
import path from 'node:path';

const ROOT = process.cwd();

const rg =
  'rg -l "provider:\\s*\\{[^}]*name:|@type.*EducationalOrganization|getOrganizationSchema\\(|buildOrganizationOfcSchemaNode\\(" --glob "*.ts" --glob "*.tsx" lib app components';

let files = [];
try {
  files = execSync(rg, { cwd: ROOT, encoding: 'utf8' })
    .trim()
    .split('\n')
    .filter(Boolean);
} catch {
  files = [];
}

const allowlist = new Set([
  'lib/schema-organization-global.ts',
  'lib/schema-layout-root-graph.ts',
  'lib/site-config.ts',
  'lib/seo.ts',
  'lib/schema-a-propos-organization-jsonld.ts',
  'lib/schema-a-propos-unified-graph.ts',
  'scripts/validate-schema-jsonld.mjs',
]);

const suspects = files.filter((f) => !allowlist.has(f));

console.log('# Audit Organization JSON-LD — doublons potentiels\n');
console.log('Canonique (layout) : `components/schema/GlobalSiteJsonLd.tsx` → `#organization`\n');
if (suspects.length === 0) {
  console.log('Aucun fichier suspect hors allowlist builders.');
} else {
  console.log('Fichiers à vérifier (peuvent réémettre un nœud complet ou provider gonflé) :\n');
  for (const f of suspects.sort()) {
    console.log(`- ${f}`);
  }
}
console.log('\nPages avec Person enrichi (référence `@id` org — OK) : `/a-propos` uniquement.');
console.log('Landings legacy avec `provider` inline : voir `components/seo-cluster`, `lib/formation-*-landing.ts`.');