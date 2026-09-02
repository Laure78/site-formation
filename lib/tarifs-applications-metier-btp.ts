/**
 * Tarifs — parcours « Applications métier BTP avec l’IA » (7 h / niveau).
 * Source de vérité unique — distincts du catalogue 4 h.
 */

export type ApplicationMetierBtpTarifKey =
  | 'niveau-1'
  | 'niveau-2'
  | 'niveau-3'
  | 'parcours-complet';

/** Niveau 1 — Concevoir — 7 h. */
export const TARIF_APPLICATION_METIER_BTP_NIV1_HT = 1800;

/** Niveau 2 — Connecter — 7 h. */
export const TARIF_APPLICATION_METIER_BTP_NIV2_HT = 2000;

/** Niveau 3 — Intégrer l’IA — 7 h. */
export const TARIF_APPLICATION_METIER_BTP_NIV3_HT = 2200;

/** Parcours complet 21 h (niveaux 1 + 2 + 3). */
export const TARIF_APPLICATION_METIER_BTP_PARCOURS_COMPLET_HT = 5500;

/** Cumul des trois niveaux réservés séparément : 6 000 € HT. */
export const TARIF_APPLICATION_METIER_BTP_CUMUL_NIVEAUX_HT =
  TARIF_APPLICATION_METIER_BTP_NIV1_HT +
  TARIF_APPLICATION_METIER_BTP_NIV2_HT +
  TARIF_APPLICATION_METIER_BTP_NIV3_HT;

/** Avantage parcours vs trois sessions séparées : 500 € HT. */
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

export function formatMontantHtApplicationMetier(amount: number): string {
  return `${new Intl.NumberFormat('fr-FR').format(amount)} € HT`;
}

/** Libellé standard — « X XXX € HT par session intra-entreprise ». */
export function libelleTarifApplicationMetierBtp(key: ApplicationMetierBtpTarifKey): string {
  return `${formatMontantHtApplicationMetier(getTarifApplicationMetierBtpHt(key))} par session intra-entreprise`;
}

/** Montant seul — « X XXX € HT » (tableaux, calculs). */
export function libelleTarifApplicationMetierBtpCourt(key: ApplicationMetierBtpTarifKey): string {
  return formatMontantHtApplicationMetier(getTarifApplicationMetierBtpHt(key));
}

/** Ligne durée + montant — ex. « 7 h — 1 800 € HT / session ». */
export function libelleTarifApplicationMetierBtpDureeSession(
  duree: string,
  key: ApplicationMetierBtpTarifKey,
): string {
  return `${duree} — ${formatMontantHtApplicationMetier(getTarifApplicationMetierBtpHt(key))} / session`;
}

/** Formulation parcours complet — avantage 500 € HT. */
export function libelleAvantageParcoursApplicationMetierBtp(): string {
  return `Soit ${formatMontantHtApplicationMetier(ECONOMIE_PARCOURS_APPLICATION_METIER_HT)} d’avantage en choisissant le parcours complet.`;
}

/** Rappel modalité — session réservée par l’entreprise pour son équipe. */
export const TARIF_SESSION_INTRA_MENTION =
  'Tarif par session intra-entreprise — l’entreprise réserve une session pour son équipe (ensemble du groupe).';

/** @deprecated Préférer {@link TARIF_SESSION_INTRA_MENTION}. */
export const TARIF_FORFAIT_INTRA_MENTION = TARIF_SESSION_INTRA_MENTION;

/** Financement — formulation prudente (sans garantie de prise en charge). */
export const FINANCEMENT_APPLICATION_METIER_BTP =
  'Prise en charge possible selon l’éligibilité de l’entreprise et les barèmes Constructys en vigueur.';

export const FINANCEMENT_APPLICATION_METIER_BTP_DETAIL =
  `${FINANCEMENT_APPLICATION_METIER_BTP} Les plafonds de prise en charge peuvent être inférieurs au tarif de la formation. Les conditions et montants dépendent de la situation de l’entreprise et des barèmes applicables au moment de la demande.`;
