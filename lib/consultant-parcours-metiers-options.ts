/**
 * Parcours métiers catalogue 2027 — options page /devenez-consultant et formulaire.
 */
import { libelleJoursFormation } from '@/data/catalogue-2027/parcours';
import { parcoursHref } from '@/lib/catalogue-2027/parcours-href';
import type { ParcoursId } from '@/data/catalogue-2027';
import { isParcoursMetiers2027Visible } from '@/lib/parcours-metiers-2027-visibility';
import { getParcoursMetiersPublicsComputed } from '@/lib/parcours-metiers-public';

export type ConsultantParcoursMetierOption = {
  id: ParcoursId;
  titre: string;
  benefice: string;
  href: string;
  dureeLabel: string;
  dureeHeures: number;
  moduleCount: number;
};

export function getConsultantParcoursMetiersOptions(): ConsultantParcoursMetierOption[] {
  if (!isParcoursMetiers2027Visible()) return [];
  return getParcoursMetiersPublicsComputed().map((p) => ({
    id: p.id,
    titre: p.titre,
    benefice: p.benefice,
    href: parcoursHref(p.id),
    dureeLabel: libelleJoursFormation(p.joursFormation),
    dureeHeures: p.dureeHeures,
    moduleCount: p.moduleCount,
  }));
}

const PARCOURS_BY_ID = new Map(
  getConsultantParcoursMetiersOptions().map((p) => [p.id, p.titre] as const),
);

/** Libellés lisibles pour emails / admin (IDs parcours séparés par virgule). */
export function formatConsultantParcoursSlugs(raw: string | null | undefined): string {
  if (!raw?.trim()) return '';
  return raw
    .split(',')
    .map((s) => s.trim())
    .filter(Boolean)
    .filter((id) => !id.startsWith('NIV-'))
    .map((id) => PARCOURS_BY_ID.get(id as ParcoursId) ?? id)
    .join(' · ');
}
