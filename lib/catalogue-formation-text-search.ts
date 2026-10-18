import { METIERS_CATALOGUE_2027 } from '@/data/catalogue-2027';
import { getFormationByCode } from '@/data/formations';
import {
  CATALOGUE_THEMATIQUES,
  FORMATION_METIERS,
  FORMATION_THEMATIQUE_PRINCIPALE,
  type CatalogueComplementaryEntry,
} from '@/lib/catalogue-thematiques-btp';
import type { FormationCatalogueCode } from '@/lib/formation-catalogue-visibility';

export function normalizeCatalogueSearchText(text: string): string {
  return text
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .trim();
}

function rubriqueHaystack(ref: string): string {
  const th =
    FORMATION_THEMATIQUE_PRINCIPALE[ref as FormationCatalogueCode] ?? undefined;
  const rubrique = th ? CATALOGUE_THEMATIQUES.find((r) => r.id === th) : undefined;
  return [rubrique?.title, rubrique?.description].filter(Boolean).join(' ');
}

export function formationRefMatchesSearchQuery(ref: string, query: string): boolean {
  const q = normalizeCatalogueSearchText(query);
  if (!q) return true;

  const f = getFormationByCode(ref);
  if (!f) return false;

  const metierLabels =
    FORMATION_METIERS[ref as FormationCatalogueCode]?.map(
      (id) => METIERS_CATALOGUE_2027.find((m) => m.id === id)?.label ?? id,
    ) ?? [];

  const haystack = normalizeCatalogueSearchText(
    [
      ref,
      f.titre,
      f.promesse,
      f.public,
      f.accroche,
      f.niveauLabel,
      f.gamme,
      f.theme,
      ...f.objectifs,
      ...f.casUsageCourts,
      ...metierLabels,
      rubriqueHaystack(ref),
    ].join(' '),
  );

  if (haystack.includes(q)) return true;

  return q.split(/\s+/).every((token) => token.length < 2 || haystack.includes(token));
}

export function complementaryEntryMatchesSearchQuery(
  item: CatalogueComplementaryEntry,
  query: string,
): boolean {
  const q = normalizeCatalogueSearchText(query);
  if (!q) return true;

  const rubrique = CATALOGUE_THEMATIQUES.find((r) => r.id === item.thematique);
  const metierLabels = item.metiers.map(
    (id) => METIERS_CATALOGUE_2027.find((m) => m.id === id)?.label ?? id,
  );
  const haystack = normalizeCatalogueSearchText(
    [item.title, item.promesse, rubrique?.title, rubrique?.description, ...metierLabels].join(
      ' ',
    ),
  );

  if (haystack.includes(q)) return true;

  return q.split(/\s+/).every((token) => token.length < 2 || haystack.includes(token));
}
