/**
 * Grille commerciale OFC : forfait unique par session, jusqu'à 12 participants.
 * TVA : exonération art. 261-4-4° du CGI (formation professionnelle).
 */

import { formatNumberFr } from '@/lib/format-number-fr';

export const SESSION_DUREE_LIBELLE = '4 h';

/** NIV-04 Maîtriser Claude AI — session matin uniquement */
export const SESSION_DUREE_MATIN_NIV04 = '4 h · matin (9h00 – 13h00)';

/**
 * Forfait HT unique pour toutes les formations catalogue / LMS (session complète).
 * Source unique — ne plus distinguer débutant / avancé sur le prix.
 */
export const TARIF_SESSION_FORFAIT_HT = 1200;

/** @deprecated Alias — même montant que `TARIF_SESSION_FORFAIT_HT`. */
export const TARIF_SESSION_DEBUTANT_HT = TARIF_SESSION_FORFAIT_HT;

/** @deprecated Alias — même montant que `TARIF_SESSION_FORFAIT_HT`. */
export const TARIF_SESSION_AVANCE_HT = TARIF_SESSION_FORFAIT_HT;

/** Montant HT affiché (espace milliers FR) — ex. 1 200 */
export function formatTarifHt(amount: number): string {
  return formatNumberFr(amount);
}

/**
 * @deprecated Utiliser `TARIF_SESSION_FORFAIT_HT`.
 */
export const TARIF_FORFAIT_DEBUTANT_HT = TARIF_SESSION_FORFAIT_HT;

/**
 * @deprecated Utiliser `TARIF_SESSION_FORFAIT_HT`.
 */
export const TARIF_FORFAIT_AVANCE_HT = TARIF_SESSION_FORFAIT_HT;

export type NiveauTarif = 'debutant' | 'avance';

/** Forfait unique quel que soit le niveau pédagogique. */
export function tarifHtPourNiveau(_niveau?: NiveauTarif): number {
  return TARIF_SESSION_FORFAIT_HT;
}

/** Montant HT facturé pour la session (offre catalogue / comparatif). */
export function tarifHtDepuisBadgeCatalogue(_level?: 'DÉBUTANT' | 'AVANCÉ'): number {
  return TARIF_SESSION_FORFAIT_HT;
}

/** Mention légale TVA — formations professionnelles. */
export const MENTIONS_TVA_EXONERATION =
  'TVA non applicable — exonération art. 261-4-4° du CGI (actions de formation professionnelle)';

/** Version courte pour badges / libellés. */
export const MENTIONS_TVA_EXONERATION_COURTE = 'TVA non applicable (art. 261-4-4° CGI)';

/** Effectif maximal par groupe (sessions catalogue, inter ou intra) */
export const EFFECTIF_GROUPE_MAX = 12;

/** Libellé carte / ligne tableau : forfait session */
export function libelleTarifParticipant(_level?: 'DÉBUTANT' | 'AVANCÉ'): string {
  const n = formatTarifHt(TARIF_SESSION_FORFAIT_HT);
  return `${n} € HT / session forfaitaire (max ${EFFECTIF_GROUPE_MAX} participants) — ${MENTIONS_TVA_EXONERATION_COURTE}`;
}

/** Libellé pour badges / cartes (icône « participants ») */
export const LIBELLE_EFFECTIF_GROUPE_COURT = `${EFFECTIF_GROUPE_MAX} participants max`;

/** Effectif formations niveau avancé NIV-02 (appels d'offres) — programme officiel */
export const LIBELLE_EFFECTIF_GROUPE_NIV02 = '8 à 12 participants';

/** Effectif formation NIV-03 conduite de travaux — création de skills */
export const LIBELLE_EFFECTIF_GROUPE_NIV03 = '8 participants max';

/** Phrase complète pour modalités et encarts */
export const LIBELLE_EFFECTIF_GROUPE = `Groupe de ${EFFECTIF_GROUPE_MAX} participants maximum`;

/** Positionnement modalité OFC — phrase canonique (badges, FAQ, meta). */
export const MODALITE_POSITIONNEMENT = 'présentiel uniquement · Île-de-France uniquement';

/** Badge court — header, footer, cartes */
export const PERIMETRE_FORMATIONS_COURT = MODALITE_POSITIONNEMENT;

/** Périmètre géographique et modalité — formulation standard avec exclusions explicites */
export const PERIMETRE_FORMATIONS_STANDARD =
  `Sessions inter en salle ou intra dans vos locaux (Paris et départements 77 à 95) — ${MODALITE_POSITIONNEMENT}.`;

/** Formulation standard — modalités (FAQ, pages, llms.txt) */
export const MODALITE_FORMATIONS_STANDARD = PERIMETRE_FORMATIONS_STANDARD;

/** Modalités d’intervention catalogue : présentiel uniquement, inter/intra */
export const MODALITE_FORMATIONS_PRESENTIEL =
  `Sessions inter ou intra — ${MODALITE_POSITIONNEMENT}.`;

/** Toutes les formations catalogue « niveau avancé » (ex. NIV-02 appels d'offres) */
export const EXIGENCE_CLAUDE_PRO_NIVEAU_AVANCE =
  'Abonnement Claude Pro (20 €/mois) et Cowork installé sur le poste requis pour le niveau avancé.';

/** Formations catalogue « niveau débutant » (BTP-01, BTP-04, etc.) — comptes gratuits suffisants */
export const COMPTES_IA_GRATUITS_NIVEAU_DEBUTANT =
  'Comptes gratuits IA possibles : Claude AI, ChatGPT, Gemini.';

export const ENCART_TARIFS_COMMERCIAUX =
  `Sessions en ${SESSION_DUREE_LIBELLE} uniquement — forfait unique ${formatTarifHt(TARIF_SESSION_FORFAIT_HT)} € HT par session (${LIBELLE_EFFECTIF_GROUPE_COURT}). ${MENTIONS_TVA_EXONERATION}. ${COMPTES_IA_GRATUITS_NIVEAU_DEBUTANT} ${MODALITE_FORMATIONS_PRESENTIEL}`;
