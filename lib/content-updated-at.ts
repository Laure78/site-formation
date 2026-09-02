/**
 * Dates de dernière mise à jour du contenu éditorial — source unique (YYYY-MM-DD).
 * Ne jamais utiliser `new Date()` pour définir la valeur affichée ou le JSON-LD.
 */

/** Date figée au format ISO calendaire. */
export type ContentUpdatedDate = `${number}-${string}-${string}`;

/** Pages piliers — clé = chemin absolu du site. */
export const PILLAR_PAGE_CONTENT_UPDATED_AT = {
  '/formations': '2026-04-18',
  '/formation-ia-btp-ile-de-france': '2026-04-18',
  '/claude-ai-btp': '2026-04-18',
  '/financement-constructys-formation-ia-btp': '2026-06-01',
} as const satisfies Record<string, ContentUpdatedDate>;

export type PillarPagePath = keyof typeof PILLAR_PAGE_CONTENT_UPDATED_AT;

export function getPillarPageContentUpdatedAt(path: PillarPagePath): ContentUpdatedDate {
  return PILLAR_PAGE_CONTENT_UPDATED_AT[path];
}

const MOIS_FR = [
  'janvier',
  'février',
  'mars',
  'avril',
  'mai',
  'juin',
  'juillet',
  'août',
  'septembre',
  'octobre',
  'novembre',
  'décembre',
] as const;

/** Libellé UI : « Mis à jour le 1er juin 2026 » — à partir d'une date figée en données. */
export function formatContentUpdatedLabel(isoDate: ContentUpdatedDate | string): string {
  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(isoDate);
  if (!match) return `Mis à jour le ${isoDate}`;

  const year = Number(match[1]);
  const monthIndex = Number(match[2]) - 1;
  const day = Number(match[3]);
  const month = MOIS_FR[monthIndex] ?? match[2];
  const dayLabel = day === 1 ? '1er' : String(day);

  return `Mis à jour le ${dayLabel} ${month} ${year}`;
}

/** Date affichée pour un article blog — `dateModified` prioritaire sur `datePublished`. */
export function getBlogArticleContentUpdatedAt(
  datePublished: string,
  dateModified?: string
): ContentUpdatedDate {
  return (dateModified ?? datePublished) as ContentUpdatedDate;
}
