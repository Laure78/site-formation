/**
 * Audit titles / meta descriptions — hors limites SEO.
 * Usage : npx tsx scripts/check-meta.ts
 */
import { createPageMetadata } from '../lib/seo';
import { A_PROPOS_PAGE_META_DESCRIPTION, A_PROPOS_PAGE_META_TITLE } from '../lib/a-propos-page-config';

type Row = { path: string; title: string; titleLen: number; desc: string; descLen: number };

const SAMPLES: { path: string; title: string; description: string }[] = [
  {
    path: '/a-propos',
    title: A_PROPOS_PAGE_META_TITLE,
    description: A_PROPOS_PAGE_META_DESCRIPTION,
  },
  {
    path: '/formations',
    title: 'Formations et parcours métiers BTP | Laure Olivié',
    description:
      'Catalogue des formations IA pour le BTP : devis, appels d’offres, chantier, Claude. Présentiel Île-de-France, Qualiopi, OPCO selon éligibilité.',
  },
  {
    path: '/prendre-rdv',
    title: 'Réservez votre visio découverte gratuite | Laure Olivié',
    description:
      'Réservez une visio découverte gratuite de 30 minutes pour cadrer votre formation IA pour le BTP en présentiel Île-de-France.',
  },
];

function check(row: { path: string; title: string; description: string }): Row & {
  titleOk: boolean;
  descOk: boolean;
} {
  const titleLen = row.title.length;
  const descLen = row.description.length;
  return {
    path: row.path,
    title: row.title,
    titleLen,
    desc: row.description,
    descLen,
    titleOk: titleLen <= 60,
    descOk: descLen >= 120 && descLen <= 160,
  };
}

const results = SAMPLES.map(check);
console.log('\n=== check-meta (échantillon pages clés) ===\n');
for (const r of results) {
  const tFlag = r.titleOk ? 'OK' : 'HORS';
  const dFlag = r.descOk ? 'OK' : 'HORS';
  console.log(`${r.path}`);
  console.log(`  title [${tFlag}] ${r.titleLen} car. — ${r.title}`);
  console.log(`  desc  [${dFlag}] ${r.descLen} car. — ${r.desc}`);
}

const bad = results.filter((r) => !r.titleOk || !r.descOk);
if (bad.length) {
  console.log(`\n${bad.length} page(s) hors limites.`);
  process.exitCode = 1;
} else {
  console.log('\nToutes les pages échantillonnées sont dans les limites.');
}

// Smoke : createPageMetadata ne casse pas
createPageMetadata({
  title: A_PROPOS_PAGE_META_TITLE,
  description: A_PROPOS_PAGE_META_DESCRIPTION,
  path: '/a-propos',
});
