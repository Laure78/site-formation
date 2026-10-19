/**
 * Profil LinkedIn public — source unique URL + abonnés (chiffre manuel).
 * Ne pas présenter comme un compteur temps réel.
 * Ne pas qualifier les abonnés (clients, stagiaires, pros BTP).
 */

import { SCHEMA_LINKEDIN_PROFILE_URL } from '@/lib/schema-constants';

/** URL publique du profil — jamais le lien privé de gestion des abonnés. */
export const LINKEDIN_PROFILE_URL = SCHEMA_LINKEDIN_PROFILE_URL;

/**
 * Nombre d’abonnés LinkedIn — saisi manuellement par Laure.
 * Mettre à jour ici uniquement ; le libellé FR se recalcule.
 */
export const LINKEDIN_FOLLOWERS_COUNT = 14_800;

/**
 * Libellé public figé — évite les écarts entre pages quand le compteur évolue.
 * Le chiffre exact reste dans `LINKEDIN_FOLLOWERS_COUNT` (mise à jour manuelle).
 */
export const LINKEDIN_FOLLOWERS_LABEL = 'plus de 14 800 abonnés' as const;

/** Texte compact hero / preuve sociale. */
export const LINKEDIN_FOLLOWERS_PROOF_TEXT =
  `${LINKEDIN_FOLLOWERS_LABEL} sur LinkedIn` as const;

/** Libellé footer. */
export const LINKEDIN_FOLLOWERS_FOOTER_LABEL =
  `LinkedIn · ${LINKEDIN_FOLLOWERS_LABEL}` as const;

/** Libellés accessibles (liens externes). */
export const LINKEDIN_PROFILE_ARIA = {
  proof: `Profil LinkedIn de Laure Olivié — ${LINKEDIN_FOLLOWERS_PROOF_TEXT}`,
  publications: `Découvrir les publications LinkedIn de Laure Olivié — ${LINKEDIN_FOLLOWERS_LABEL}`,
  footer: `Profil LinkedIn de Laure Olivié — ${LINKEDIN_FOLLOWERS_LABEL}`,
} as const;

/** Contenu carte présence LinkedIn (accueil). */
export const LINKEDIN_PRESENCE_CARD = {
  title: 'Retrouvez-moi aussi sur LinkedIn',
  followersHighlight: LINKEDIN_FOLLOWERS_LABEL,
  followersSuffix: '',
  body: 'J’y partage des conseils pratiques, des exemples de prompts et des ressources pour utiliser l’IA dans le BTP : devis, appels d’offres et suivi de chantier.',
  cta: 'Découvrir mes publications LinkedIn',
} as const;
