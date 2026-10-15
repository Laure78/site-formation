import { LINKS } from '@/lib/internal-links';

/** Helpers badges / meta pour le shell Training*. */

export type TrainingParcoursKind = 'usages-ia-btp' | 'applications-metier' | 'creation-ia';

export function trainingCategoryBadge(kind: TrainingParcoursKind): string {
  switch (kind) {
    case 'applications-metier':
      return 'Applications métier';
    case 'creation-ia':
      return 'Niveau 3 — Création et déploiement';
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

/** Demande de programme / devis — préremplit formation, variante et nature. */
export function catalogueDemandeHref(opts: {
  formationOuParcours: string;
  nature?: 'devis' | 'choix-formation' | 'intra';
  variante?: string;
  metier?: string;
}): string {
  const params = new URLSearchParams();
  params.set('objet', opts.nature ?? 'devis');
  let hint = opts.formationOuParcours;
  if (opts.variante) hint = `${hint} — variante ${opts.variante}`;
  params.set('formation', hint);
  if (opts.metier) params.set('metier', opts.metier);
  return `${LINKS.contact}?${params.toString()}`;
}
