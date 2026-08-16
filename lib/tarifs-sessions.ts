/**
 * Grille commerciale OFC — dérivée de `data/formations.ts` (prix, durée, effectifs).
 * TVA : exonération art. 261-4-4° du CGI (formation professionnelle).
 */

import { formatNumberFr } from '@/lib/format-number-fr';
import {
  EFFECTIF_CATALOGUE_MAX,
  FORMATION_NIV01,
  FORMATION_NIV02,
  FORMATIONS_COUNT,
  getFormationByCode,
  libelleDureeFormation,
  libelleEffectifFormation,
  libelleEffectifMaxFormation,
  PRIX_NIVEAU_1_HT,
  PRIX_NIVEAU_2_HT,
} from '@/data/formations';
import { IDF_ZONE_INTERVENTION } from '@/lib/constants';

export const SESSION_DUREE_LIBELLE = FORMATION_NIV01.duree;

/** NIV-04 — session matin uniquement */
export const SESSION_DUREE_MATIN_NIV04 = libelleDureeFormation(
  getFormationByCode('NIV-04')!
);

/** Prix niveau 1 (NIV-01) — source FORMATIONS */
export const TARIF_SESSION_DEBUTANT_HT = PRIX_NIVEAU_1_HT;

/** Prix niveau 2 (NIV-02…06) — source FORMATIONS */
export const TARIF_SESSION_AVANCE_HT = PRIX_NIVEAU_2_HT;

/**
 * @deprecated Préférer le prix par formation (`formation.prixHT` / `entry.prixHT`).
 * Conservé pour les pages génériques : équivalent prix niveau 2.
 */
export const TARIF_SESSION_FORFAIT_HT = PRIX_NIVEAU_2_HT;

/** Montant HT affiché (espace milliers FR) — ex. 1 200 */
export function formatTarifHt(amount: number): string {
  return formatNumberFr(amount);
}

/** @deprecated Utiliser `TARIF_SESSION_DEBUTANT_HT`. */
export const TARIF_FORFAIT_DEBUTANT_HT = TARIF_SESSION_DEBUTANT_HT;

/** @deprecated Utiliser `TARIF_SESSION_AVANCE_HT`. */
export const TARIF_FORFAIT_AVANCE_HT = TARIF_SESSION_AVANCE_HT;

export type NiveauTarif = 'debutant' | 'avance';

export function tarifHtPourNiveau(niveau?: NiveauTarif): number {
  return niveau === 'avance' ? TARIF_SESSION_AVANCE_HT : TARIF_SESSION_DEBUTANT_HT;
}

/** Montant HT selon badge catalogue (débutant / avancé). */
export function tarifHtDepuisBadgeCatalogue(level?: 'DÉBUTANT' | 'AVANCÉ'): number {
  return level === 'AVANCÉ' ? TARIF_SESSION_AVANCE_HT : TARIF_SESSION_DEBUTANT_HT;
}

/** Mention légale TVA — formations professionnelles (source unique). */
export const MENTIONS_TVA_EXONERATION =
  'Prix nets — OFC Création d\'Entreprise est exonérée de TVA sur les actions de formation professionnelle continue (art. 261-4-4°a du CGI).';

/** @deprecated Préférer `MentionTVA` / `MENTIONS_TVA_EXONERATION` (formulation complète). */
export const MENTIONS_TVA_EXONERATION_COURTE = 'TVA non applicable (art. 261-4-4°a CGI)';

/** Ancre HTML de la mention unique (`MentionTVA`). */
export const MENTION_TVA_ANCHOR_ID = 'mention-tva' as const;

/** Effectif maximal catalogue (NIV-01) */
export const EFFECTIF_GROUPE_MAX = EFFECTIF_CATALOGUE_MAX;

/** Libellé carte / ligne tableau : forfait session selon niveau badge */
export function libelleTarifParticipant(level?: 'DÉBUTANT' | 'AVANCÉ'): string {
  const n = formatTarifHt(tarifHtDepuisBadgeCatalogue(level));
  const effectif =
    level === 'AVANCÉ'
      ? libelleEffectifMaxFormation(FORMATION_NIV02)
      : libelleEffectifMaxFormation(FORMATION_NIV01);
  return `${n} € HT / session forfaitaire (${effectif}) — ${MENTIONS_TVA_EXONERATION_COURTE}`;
}

/** Libellé pour badges / cartes (icône « participants ») — NIV-01 */
export const LIBELLE_EFFECTIF_GROUPE_COURT = libelleEffectifMaxFormation(FORMATION_NIV01);

/** Effectif NIV-02 (appels d'offres) */
export const LIBELLE_EFFECTIF_GROUPE_NIV02 = libelleEffectifFormation(FORMATION_NIV02);

/** Effectif NIV-03 / NIV-04 (max 8) */
export const LIBELLE_EFFECTIF_GROUPE_NIV03 = libelleEffectifMaxFormation(
  getFormationByCode('NIV-03')!
);

/** Phrase complète pour modalités et encarts */
export const LIBELLE_EFFECTIF_GROUPE = `Groupe de ${EFFECTIF_GROUPE_MAX} participants maximum`;

/** Positionnement modalité OFC — phrase canonique (badges, FAQ, meta). */
export const MODALITE_POSITIONNEMENT = 'présentiel uniquement · Île-de-France uniquement';

/** Badge court — header, footer, cartes */
export const PERIMETRE_FORMATIONS_COURT = MODALITE_POSITIONNEMENT;

/** Périmètre géographique et modalité — formulation standard avec exclusions explicites */
export const PERIMETRE_FORMATIONS_STANDARD =
  `Sessions inter en salle ou intra dans vos locaux (${IDF_ZONE_INTERVENTION}) — ${MODALITE_POSITIONNEMENT}.`;

/** Formulation standard — modalités (FAQ, pages, llms.txt) */
export const MODALITE_FORMATIONS_STANDARD = PERIMETRE_FORMATIONS_STANDARD;

/** Modalités d’intervention catalogue : présentiel uniquement, inter/intra */
export const MODALITE_FORMATIONS_PRESENTIEL =
  `Sessions inter ou intra — ${MODALITE_POSITIONNEMENT}.`;

/** Toutes les formations catalogue « niveau avancé » (ex. NIV-02 appels d'offres) */
export const EXIGENCE_CLAUDE_PRO_NIVEAU_AVANCE =
  'Un abonnement Claude AI Pro actif par participant (environ 18 € HT/mois, à souscrire par l\'entreprise avant la session) — non inclus dans le forfait.';

/**
 * Prérequis communs — formations catalogue niveau 2 (Qualiopi + fiches).
 * Ordre figé pour affichage cohérent.
 */
export const PREREQUIS_NIVEAU_2 = [
  'Ordinateur portable par participant + connexion internet',
  EXIGENCE_CLAUDE_PRO_NIVEAU_AVANCE,
  'Avoir suivi le niveau 1 ou pratiquer déjà l\'IA générative au quotidien',
] as const;

/**
 * Comptes IA — intro catalogue / encart tarifs.
 * Niveau 1 : gratuit OK · Niveaux 2 : Claude AI Pro requis (hors forfait).
 */
export const COMPTES_IA_GRATUITS_NIVEAU_DEBUTANT =
  'Niveau 1 : un compte gratuit Claude AI ou ChatGPT suffit. Niveaux 2 : un abonnement Claude AI Pro par participant est requis (non inclus dans le forfait).';

export const ENCART_TARIFS_COMMERCIAUX =
  `Sessions en ${SESSION_DUREE_LIBELLE} — forfait unique ${formatTarifHt(TARIF_SESSION_FORFAIT_HT)} € HT / session* pour les ${FORMATIONS_COUNT} formations catalogue (effectifs selon fiche). ${COMPTES_IA_GRATUITS_NIVEAU_DEBUTANT} ${MODALITE_FORMATIONS_PRESENTIEL}`;
