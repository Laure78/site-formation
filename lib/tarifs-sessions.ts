/**
 * Grille commerciale OFC : une durée de session unique, forfait par session selon le niveau,
 * jusqu'à 12 participants.
 */

export const SESSION_DUREE_LIBELLE = '4 h';

/** Forfait HT pour la session complète — formations niveau débutant (catalogue) */
export const TARIF_SESSION_DEBUTANT_HT = 1000;

/** Forfait HT pour la session complète — formations niveau avancé (catalogue) */
export const TARIF_SESSION_AVANCE_HT = 1200;

/**
 * @deprecated Utiliser `TARIF_SESSION_DEBUTANT_HT` — conservé pour imports existants.
 * Les montants sont désormais des forfaits par session, non par participant.
 */
export const TARIF_FORFAIT_DEBUTANT_HT = TARIF_SESSION_DEBUTANT_HT;

/**
 * @deprecated Utiliser `TARIF_SESSION_AVANCE_HT` — conservé pour imports existants.
 */
export const TARIF_FORFAIT_AVANCE_HT = TARIF_SESSION_AVANCE_HT;

export type NiveauTarif = 'debutant' | 'avance';

export function tarifHtPourNiveau(niveau: NiveauTarif): number {
  return niveau === 'debutant' ? TARIF_SESSION_DEBUTANT_HT : TARIF_SESSION_AVANCE_HT;
}

/** Montant HT facturé pour la session (offre catalogue / comparatif) */
export function tarifHtDepuisBadgeCatalogue(level: 'DÉBUTANT' | 'AVANCÉ'): number {
  return level === 'DÉBUTANT' ? TARIF_SESSION_DEBUTANT_HT : TARIF_SESSION_AVANCE_HT;
}

/** Effectif maximal par groupe (sessions catalogue, inter ou intra) */
export const EFFECTIF_GROUPE_MAX = 12;

/** Libellé carte / ligne tableau : forfait session */
export function libelleTarifParticipant(level: 'DÉBUTANT' | 'AVANCÉ'): string {
  const n = tarifHtDepuisBadgeCatalogue(level);
  return `${n} € HT / session (max ${EFFECTIF_GROUPE_MAX} participants)`;
}

/** Libellé pour badges / cartes (icône « participants ») */
export const LIBELLE_EFFECTIF_GROUPE_COURT = `${EFFECTIF_GROUPE_MAX} participants max`;

/** Phrase complète pour modalités et encarts */
export const LIBELLE_EFFECTIF_GROUPE = `Groupe de ${EFFECTIF_GROUPE_MAX} participants maximum`;

/** Formulation standard — modalités (FAQ, pages, llms.txt) */
export const MODALITE_FORMATIONS_STANDARD =
  'Intra-entreprise, en présentiel ou en distanciel selon les besoins du client.';

/** Modalités d’intervention catalogue : intra/inter, présentiel ou distanciel */
export const MODALITE_FORMATIONS_PRESENTIEL =
  `Sessions inter ou intra — ${MODALITE_FORMATIONS_STANDARD} (inter en Île-de-France, intra dans vos locaux ou à distance).`;

/** Toutes les formations catalogue « niveau avancé » (ex. NIV-02 appels d'offres) */
export const EXIGENCE_CLAUDE_PRO_NIVEAU_AVANCE =
  'Abonnement Claude Pro (20 €/mois) et Cowork installé sur le poste requis pour le niveau avancé.';

/** Formations catalogue « niveau débutant » (BTP-01, BTP-04, etc.) — comptes gratuits suffisants */
export const COMPTES_IA_GRATUITS_NIVEAU_DEBUTANT =
  'Comptes gratuits IA possibles : Claude AI, ChatGPT, Gemini.';

export const ENCART_TARIFS_COMMERCIAUX =
  `Sessions en ${SESSION_DUREE_LIBELLE} uniquement — forfait ${TARIF_SESSION_DEBUTANT_HT} € HT par session (niveau débutant) ou ${TARIF_SESSION_AVANCE_HT} € HT par session (niveau avancé), ${LIBELLE_EFFECTIF_GROUPE_COURT}. ${COMPTES_IA_GRATUITS_NIVEAU_DEBUTANT} ${MODALITE_FORMATIONS_PRESENTIEL}`;
