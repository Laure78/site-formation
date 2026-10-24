/**
 * Marque commerciale vs entité exploitante — source unique UI / SEO / schémas.
 * Juridique détaillé : `lib/ofc-identite.ts` · `lib/qualiopi-info.ts`.
 */
import { OFC_IDENTITE } from '@/lib/ofc-identite';

/** Dénomination commerciale présentée aux visiteurs. */
export const MARQUE_COMMERCIALE = 'Laure Olivié' as const;

/** Mention discrète footer / pages institutionnelles. */
export const MENTION_MARQUE_EXPLOITANTE =
  `${MARQUE_COMMERCIALE} est une marque commerciale exploitée par ${OFC_IDENTITE.raisonSociale}.` as const;

/** Formulation courte — catalogue, FAQ, blocs « En bref ». */
export function formatOrganismeQualiopiCourt(): string {
  return `${MARQUE_COMMERCIALE}, organisme certifié Qualiopi (${OFC_IDENTITE.raisonSociale})`;
}

/** Ligne contact / pied de fiche — marque + références administratives. */
export function formatMarqueAvecReferencesAdmin(): string {
  return `${MARQUE_COMMERCIALE} · ${OFC_IDENTITE.raisonSociale}`;
}
