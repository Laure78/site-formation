/**
 * Grille commerciale OFC : une seule durée de session, forfait par participant selon le niveau.
 */

export const SESSION_DUREE_LIBELLE = '4 h';

/** Forfait HT par participant — formations niveau débutant */
export const TARIF_FORFAIT_DEBUTANT_HT = 100;

/** Forfait HT par participant — formations niveau avancé */
export const TARIF_FORFAIT_AVANCE_HT = 175;

export type NiveauTarif = 'debutant' | 'avance';

export function tarifHtPourNiveau(niveau: NiveauTarif): number {
  return niveau === 'debutant' ? TARIF_FORFAIT_DEBUTANT_HT : TARIF_FORFAIT_AVANCE_HT;
}

/** À partir du badge catalogue (DÉBUTANT / AVANCÉ) */
export function tarifHtDepuisBadgeCatalogue(level: 'DÉBUTANT' | 'AVANCÉ'): number {
  return level === 'DÉBUTANT' ? TARIF_FORFAIT_DEBUTANT_HT : TARIF_FORFAIT_AVANCE_HT;
}

export function libelleTarifParticipant(level: 'DÉBUTANT' | 'AVANCÉ'): string {
  const n = tarifHtDepuisBadgeCatalogue(level);
  return `${n} € HT / participant`;
}

/** Modalité d’intervention catalogue (pas de visioconférence pour les sessions formation) */
export const MODALITE_FORMATIONS_PRESENTIEL =
  'Formations en présentiel uniquement (sessions inter en Île-de-France, intra dans vos locaux).';

/** Outil recommandé pour les parcours catalogue « niveau avancé » */
export const RECOMMANDATION_CLAUDE_NIVEAU_AVANCE =
  'Compte Claude AI recommandé pour le niveau avancé.';

export const ENCART_TARIFS_COMMERCIAUX =
  `Sessions en ${SESSION_DUREE_LIBELLE} uniquement — forfait ${TARIF_FORFAIT_DEBUTANT_HT} € HT par participant (niveau débutant) ou ${TARIF_FORFAIT_AVANCE_HT} € HT par participant (niveau avancé). ${MODALITE_FORMATIONS_PRESENTIEL}`;
