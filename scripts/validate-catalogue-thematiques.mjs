/**
 * Vérifie que chaque formation catalogue publiée a une rubrique principale unique.
 */
import { FORMATIONS } from '../data/formations.ts';
import {
  FORMATION_THEMATIQUE_PRINCIPALE,
  CATALOGUE_THEMATIQUES,
} from '../lib/catalogue-thematiques-btp.ts';

const CATALOGUE_THEMATIQUE_IDS = CATALOGUE_THEMATIQUES.map((t) => t.id);
import {
  isFormationCataloguePublished,
  isFormationCatalogueRetired,
} from '../lib/formation-catalogue-visibility.ts';

let failed = false;

for (const f of FORMATIONS) {
  if (isFormationCatalogueRetired(f.code)) continue;
  if (!isFormationCataloguePublished(f.code)) continue;
  const th = FORMATION_THEMATIQUE_PRINCIPALE[f.code];
  if (!th || !CATALOGUE_THEMATIQUE_IDS.includes(th)) {
    console.error(`Rubrique manquante ou invalide pour ${f.code}`);
    failed = true;
  }
}

if (failed) process.exit(1);
console.log('OK — rubriques thématiques couvrent le catalogue publié.');
