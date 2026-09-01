/**
 * Tarifs — parcours « Applications métier BTP avec l’IA » (7 h / niveau).
 * Distincts du catalogue 4 h — forfait intra-entreprise par session (ensemble du groupe).
 */

export type ApplicationMetierBtpTarifKey =
  | 'niveau-1'
  | 'niveau-2'
  | 'niveau-3'
  | 'parcours-complet';

/** Niveau 1 — 7 h — forfait intra session. */
export const TARIF_APPLICATION_METIER_BTP_NIV1_HT = 1800;

/** Niveau 2 — 7 h — forfait intra session. */
export const TARIF_APPLICATION_METIER_BTP_NIV2_HT = 2000;

/** Niveau 3 — 7 h — forfait intra session. */
export const TARIF_APPLICATION_METIER_BTP_NIV3_HT = 2200;

/** Parcours complet 21 h — forfait intra entreprise. */
export const TARIF_APPLICATION_METIER_BTP_PARCOURS_COMPLET_HT = 5500;

/** Cumul des trois niveaux réservés séparément (6 000 € HT). */
export const TARIF_APPLICATION_METIER_BTP_CUMUL_NIVEAUX_HT =
  TARIF_APPLICATION_METIER_BTP_NIV1_HT +
  TARIF_APPLICATION_METIER_BTP_NIV2_HT +
  TARIF_APPLICATION_METIER_BTP_NIV3_HT;

/** Économie parcours vs trois sessions séparées. */
export const ECONOMIE_PARCOURS_APPLICATION_METIER_HT =
  TARIF_APPLICATION_METIER_BTP_CUMUL_NIVEAUX_HT - TARIF_APPLICATION_METIER_BTP_PARCOURS_COMPLET_HT;

const TARIFS: Record<ApplicationMetierBtpTarifKey, number> = {
  'niveau-1': TARIF_APPLICATION_METIER_BTP_NIV1_HT,
  'niveau-2': TARIF_APPLICATION_METIER_BTP_NIV2_HT,
  'niveau-3': TARIF_APPLICATION_METIER_BTP_NIV3_HT,
  'parcours-complet': TARIF_APPLICATION_METIER_BTP_PARCOURS_COMPLET_HT,
};

export function getTarifApplicationMetierBtpHt(key: ApplicationMetierBtpTarifKey): number {
  return TARIFS[key];
}

function formatHt(amount: number): string {
  return `${new Intl.NumberFormat('fr-FR').format(amount)} € HT`;
}

/** Libellé tarif session — jamais « par participant » pour l’intra. */
export function libelleTarifApplicationMetierBtp(key: ApplicationMetierBtpTarifKey): string {
  return `${formatHt(getTarifApplicationMetierBtpHt(key))} / session intra-entreprise`;
}

export function libelleTarifApplicationMetierBtpCourt(key: ApplicationMetierBtpTarifKey): string {
  return formatHt(getTarifApplicationMetierBtpHt(key));
}

/** Financement — formulation imposée (sans calcul OPCO automatique). */
export const FINANCEMENT_APPLICATION_METIER_BTP =
  'Prise en charge possible selon éligibilité et barèmes Constructys en vigueur.';

export const FINANCEMENT_APPLICATION_METIER_BTP_DETAIL =
  `${FINANCEMENT_APPLICATION_METIER_BTP} Les conditions et montants de prise en charge dépendent notamment de la situation de l'entreprise et des barèmes applicables au moment de la demande. Les conditions doivent être vérifiées par l'entreprise avant le démarrage de la formation.`;

export const TARIF_FORFAIT_INTRA_MENTION =
  'Tarif forfaitaire intra-entreprise pour l’ensemble du groupe.';
