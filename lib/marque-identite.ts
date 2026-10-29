/**
 * Marque commerciale vs entité exploitante — source unique UI / SEO / schémas.
 * Juridique détaillé : `lib/ofc-identite.ts` · `lib/qualiopi-info.ts`.
 */
import { OFC_IDENTITE } from '@/lib/ofc-identite';

/** Dénomination commerciale présentée aux visiteurs. */
export const MARQUE_COMMERCIALE = 'Laure Olivié' as const;

/** Mention discrète footer / pages institutionnelles. */
export const MENTION_MARQUE_EXPLOITANTE =
  `${MARQUE_COMMERCIALE} est une marque commerciale de ${OFC_IDENTITE.raisonSociale}.` as const;

/** Formulation courte — catalogue, FAQ, blocs « En bref ». */
export function formatOrganismeQualiopiCourt(): string {
  return `${MARQUE_COMMERCIALE}, organisme certifié Qualiopi (${OFC_IDENTITE.raisonSociale})`;
}

/** Ligne contact / pied de fiche — marque + références administratives. */
export function formatMarqueAvecReferencesAdmin(): string {
  return `${MARQUE_COMMERCIALE} · ${OFC_IDENTITE.raisonSociale}`;
}

/** FAQ financement — variante « situation » (pages métiers). */
export const FAQ_FINANCEMENT_QUALIOPI_SITUATION =
  `${MARQUE_COMMERCIALE}, organisme certifié Qualiopi (${OFC_IDENTITE.raisonSociale}, enregistré Constructys). Le financement dépend de votre situation et des règles du plan de développement des compétences — étude de dossier au cas par cas.` as const;

/** FAQ financement — variante « employeur ». */
export const FAQ_FINANCEMENT_QUALIOPI_EMPLOYEUR =
  `${MARQUE_COMMERCIALE}, organisme certifié Qualiopi (${OFC_IDENTITE.raisonSociale}, enregistré Constructys). Le financement dépend de l'employeur et des règles du plan de développement des compétences — étude de dossier au cas par cas.` as const;

/** FAQ financement — variante « branche / PME » (dirigeants). */
export const FAQ_FINANCEMENT_QUALIOPI_BRANCHE =
  `${MARQUE_COMMERCIALE}, organisme certifié Qualiopi (${OFC_IDENTITE.raisonSociale}, enregistré Constructys). Le financement dépend de votre branche, de la taille de l'entreprise et des dispositifs (plan de développement des compétences, etc.). Nous étudions votre dossier avec vous.` as const;

/** Pied de fiche formation — identité administrative compacte (SIRET/NDA ajoutés côté page). */
export function formatPiedFicheQualiopiIdentite(): string {
  return `${MARQUE_COMMERCIALE} · Organisme certifié Qualiopi · ${OFC_IDENTITE.raisonSociale}`;
}
