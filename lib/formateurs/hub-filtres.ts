import type { DomaineId } from '@/data/catalogue-2027';

/** Clé URL `?domaine=` — alignée sur les pills du hub /formateurs. */
export type FormateursFiltreUrlKey =
  | 'ia-outils'
  | 'appels-offres'
  | 'chantier'
  | 'management'
  | 'administratif'
  | 'securite';

export type FormateursFiltreId = 'all' | DomaineId | 'management-group';

export type FormateursFiltreOption = {
  id: FormateursFiltreId;
  label: string;
  urlKey: FormateursFiltreUrlKey | null;
};

/** Pills domaine — filtrage côté client. */
export const FORMATEURS_FILTRES: readonly FormateursFiltreOption[] = [
  { id: 'all', label: 'Tous', urlKey: null },
  { id: 'numerique-ia', label: 'IA & outils', urlKey: 'ia-outils' },
  { id: 'commercial', label: 'Appels d’offres / chiffrage', urlKey: 'appels-offres' },
  { id: 'travaux', label: 'Chantier', urlKey: 'chantier' },
  { id: 'management-group', label: 'Management', urlKey: 'management' },
  { id: 'administration', label: 'Administratif & paie', urlKey: 'administratif' },
  {
    id: 'technique-qualite-prevention',
    label: 'Sécurité',
    urlKey: 'securite',
  },
] as const;

const URL_TO_FILTRE = new Map(
  FORMATEURS_FILTRES.filter((f) => f.urlKey).map((f) => [f.urlKey!, f.id]),
);

export function filtreIdFromUrlParam(domaine: string | null | undefined): FormateursFiltreId {
  if (!domaine) return 'all';
  return URL_TO_FILTRE.get(domaine as FormateursFiltreUrlKey) ?? 'all';
}

export function urlKeyFromFiltreId(id: FormateursFiltreId): string | null {
  const opt = FORMATEURS_FILTRES.find((f) => f.id === id);
  return opt?.urlKey ?? null;
}

/** Laure est présentée dans le héros — exclue de la grille filtrée. */
export const FORMATEUR_LAURE_ID = 'laure-olivie' as const;
