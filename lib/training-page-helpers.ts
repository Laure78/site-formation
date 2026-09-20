import { LINKS } from '@/lib/internal-links';

/** Helpers badges / meta pour le shell Training*. */

export type TrainingParcoursKind = 'usages-ia-btp' | 'applications-metier' | 'creation-ia';

export function trainingCategoryBadge(kind: TrainingParcoursKind): string {
  switch (kind) {
    case 'applications-metier':
      return 'Applications métier';
    case 'creation-ia':
      return 'Création avec l’IA';
    default:
      return 'Usages IA BTP';
  }
}

export function trainingMetaLine(parts: {
  duree: string;
  effectif: string;
  format?: string;
  lieu?: string;
}): string {
  return [
    parts.duree,
    parts.format ?? 'Présentiel',
    parts.lieu ?? 'Île-de-France',
    parts.effectif,
  ].join(' · ');
}

export function trainingDevisHref(formationTitle: string): string {
  return `${LINKS.contact}?objet=devis&formation=${encodeURIComponent(formationTitle)}`;
}
