/**
 * Non-régression — filtres catalogue « Formations IA disponibles ».
 * Usage : npx tsx scripts/assert-catalogue-formations-filter.ts
 */
import { getFormationByCode } from '../data/formations';
import { getCataloguePageCoreFormations } from '../lib/formations-catalogue-page-config';
import { getUpcomingCatalogueFormationEntries } from '../lib/catalogue-formation-schedule';
import {
  countVisibleFormationsIaCatalogue,
  filterAvailableFormationsIaEntries,
  filterComplementaryFormationsIaEntries,
  formationRefMatchesFormationsIaFilters,
} from '../lib/catalogue-formations-ia-filter';
import { normalizeCatalogueSearchText } from '../lib/catalogue-formation-text-search';
import { FORMATION_METIERS, FORMATION_THEMATIQUE_PRINCIPALE } from '../lib/catalogue-thematiques-btp';
import type { FormationCatalogueCode } from '../lib/formation-catalogue-visibility';

const available = getCataloguePageCoreFormations();
const upcoming = getUpcomingCatalogueFormationEntries();
const allRefs = [...available, ...upcoming].map((e) => e.ref);

let failed = 0;

function assert(condition: boolean, message: string) {
  if (!condition) {
    console.error('FAIL:', message);
    failed += 1;
  }
}

const totalSansFiltre = countVisibleFormationsIaCatalogue(available, upcoming, {});
assert(totalSansFiltre > 0, 'Le catalogue sans filtre doit contenir des formations');

for (const ref of allRefs) {
  const f = getFormationByCode(ref);
  if (!f) continue;
  assert(
    formationRefMatchesFormationsIaFilters(ref, { niveau: f.niveau }),
    `Niveau ${f.niveau} doit inclure ${ref}`,
  );
  assert(
    !formationRefMatchesFormationsIaFilters(ref, {
      niveau: f.niveau === 1 ? 2 : 1,
    }),
    `Mauvais niveau doit exclure ${ref}`,
  );
  const th = FORMATION_THEMATIQUE_PRINCIPALE[ref as FormationCatalogueCode];
  if (th) {
    assert(
      formationRefMatchesFormationsIaFilters(ref, { thematique: th }),
      `Thématique ${th} doit inclure ${ref}`,
    );
  }
  for (const metier of FORMATION_METIERS[ref as FormationCatalogueCode] ?? []) {
    assert(
      formationRefMatchesFormationsIaFilters(ref, { metier }),
      `Métier ${metier} doit inclure ${ref}`,
    );
  }
}

const niveau2 = filterAvailableFormationsIaEntries(available, { niveau: 2 });
for (const e of niveau2) {
  assert(getFormationByCode(e.ref)?.niveau === 2, `Niveau 2 : ${e.ref} incohérent`);
}

const combined = countVisibleFormationsIaCatalogue(available, upcoming, {
  niveau: 3,
  thematique: 'outils-gestion',
});
const niv3Outils = allRefs.filter((ref) =>
  formationRefMatchesFormationsIaFilters(ref, {
    niveau: 3,
    thematique: 'outils-gestion',
  }),
).length;
const compCombined = filterComplementaryFormationsIaEntries({
  niveau: 3,
  thematique: 'outils-gestion',
}).length;
assert(combined === niv3Outils + compCombined, 'Filtres combinés ET : compteur cohérent');

assert(
  formationRefMatchesFormationsIaFilters('NIV-01', { q: 'CHATGPT' }),
  'Recherche insensible à la casse',
);
assert(
  formationRefMatchesFormationsIaFilters('NIV-01', { q: '  ' }),
  'Recherche vide (espaces) ne filtre pas',
);
assert(
  normalizeCatalogueSearchText('  Éléctricité  ') === normalizeCatalogueSearchText('electricite'),
  'Normalisation accents / espaces',
);

if (failed > 0) {
  console.error(`\n${failed} assertion(s) en échec.`);
  process.exit(1);
}
console.log('Filtres catalogue formations : OK (%d formations visibles sans filtre).', totalSansFiltre);
