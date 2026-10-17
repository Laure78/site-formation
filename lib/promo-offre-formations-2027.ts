/**
 * Offre promotionnelle formations 2027 — source unique de configuration du bandeau.
 *
 * Tant que les champs commerciaux ne sont pas renseignés et `enabled` à true,
 * le bandeau reste invisible en production. En développement, une prévisualisation
 * est possible (`allowDevPreview`) avec des libellés clairement marqués.
 *
 * Ne pas confondre :
 * - `bookingStartAt` / `bookingEndAt` = période de réservation du code
 * - `formationPeriodLabel` = période des formations concernées (ex. année 2027)
 */
import { LINKS } from '@/lib/internal-links';

export type PromoEligibleProgramme = {
  /** Libellé affiché dans les conditions. */
  label: string;
  /** URL réelle d’une fiche ou landing publiée. */
  href: string;
};

export type PromoOffreFormations2027Conditions = {
  /** Montant ou taux de réduction (texte). */
  reduction: string;
  /** Base tarifaire concernée. */
  tarifBase: string;
  /** Programmes et formats éligibles. */
  programmesFormats: string;
  /** Dates / fenêtre de réservation. */
  datesReservation: string;
  /** Période des formations concernées. */
  datesFormation: string;
  /** Modalités d’utilisation du code. */
  modalitesCode: string;
  /** Exclusions. */
  exclusions: string;
  /** Cumul éventuel avec d’autres offres. */
  cumul: string;
};

export type PromoOffreFormations2027Config = {
  /** Identifiant stable — utilisé pour la mémorisation de fermeture. */
  offerId: string;
  /** Activation manuelle (en plus de la complétude et des dates). */
  enabled: boolean;
  /**
   * En développement uniquement : affiche le bandeau même si l’offre est
   * incomplète / désactivée, avec des champs marqués « À renseigner ».
   */
  allowDevPreview: boolean;
  /** Libellé de réduction (ex. « −15 % ») — jamais inventé. */
  reductionLabel: string;
  /** Code promotionnel — jamais inventé. */
  promoCode: string;
  /**
   * Début de la période de réservation (ISO 8601 avec fuseau, ex. Europe/Paris).
   * Ex. `2026-11-01T00:00:00+01:00`
   */
  bookingStartAt: string | null;
  /**
   * Fin de la période de réservation (ISO 8601 avec fuseau).
   * Ex. `2026-12-31T23:59:59+01:00`
   */
  bookingEndAt: string | null;
  /** Période des formations concernées (libellé, distinct de la réservation). */
  formationPeriodLabel: string;
  /** Programmes réellement éligibles (URLs publiées uniquement). */
  eligibleProgrammes: readonly PromoEligibleProgramme[];
  /** Conditions affichées dans le panneau — aucune invention. */
  conditions: PromoOffreFormations2027Conditions;
  /**
   * Destination du bouton principal.
   * Doit pointer vers le catalogue ou une sélection réelle d’éligibles.
   */
  ctaHref: string;
};

const EMPTY_CONDITIONS: PromoOffreFormations2027Conditions = {
  reduction: '',
  tarifBase: '',
  programmesFormats: '',
  datesReservation: '',
  datesFormation: '',
  modalitesCode: '',
  exclusions: '',
  cumul: '',
};

/**
 * Paramètres commerciaux à compléter avant activation en production.
 * Laisser `enabled: false` tant que réduction, code, dates et conditions
 * ne sont pas validés.
 */
export const PROMO_OFFRE_FORMATIONS_2027: PromoOffreFormations2027Config = {
  offerId: 'formations-2027',
  enabled: false,
  allowDevPreview: true,
  reductionLabel: '',
  promoCode: '',
  bookingStartAt: null,
  bookingEndAt: null,
  formationPeriodLabel: '2027',
  eligibleProgrammes: [],
  conditions: { ...EMPTY_CONDITIONS },
  /** Catalogue — destination par défaut du bandeau informatif et du CTA promo. */
  ctaHref: LINKS.formations,
};

/** Bandeau informatif — affiché tant qu’aucune offre promo n’est active en production. */
export const PROMO_BANNER_INFORMATIONAL = {
  title: 'Formations 2027',
  messageLead: 'Développez les compétences de vos équipes avec nos ',
  messageHighlight: 'formations IA BTP',
  messageEnd: '.',
  ctaLabel: 'Je choisis ma formation',
  ctaHref: LINKS.formations,
} as const;

/** Fond bandeau — bleu foncé uni (référence capture promo header). */
export const PROMO_BANNER_BG = '#1a3561' as const;

export function promoDismissStorageKey(offerId: string): string {
  return `ofc-promo-banner-dismissed:${offerId}`;
}

function isNonEmpty(value: string | null | undefined): boolean {
  return typeof value === 'string' && value.trim().length > 0;
}

function conditionsAreComplete(conditions: PromoOffreFormations2027Conditions): boolean {
  return (
    isNonEmpty(conditions.reduction) &&
    isNonEmpty(conditions.tarifBase) &&
    isNonEmpty(conditions.programmesFormats) &&
    isNonEmpty(conditions.datesReservation) &&
    isNonEmpty(conditions.datesFormation) &&
    isNonEmpty(conditions.modalitesCode) &&
    isNonEmpty(conditions.exclusions) &&
    isNonEmpty(conditions.cumul)
  );
}

/** Offre prête à être activée (tous les champs commerciaux renseignés). */
export function isPromoOffreComplete(
  config: PromoOffreFormations2027Config = PROMO_OFFRE_FORMATIONS_2027,
): boolean {
  return (
    isNonEmpty(config.offerId) &&
    isNonEmpty(config.reductionLabel) &&
    isNonEmpty(config.promoCode) &&
    isNonEmpty(config.bookingStartAt) &&
    isNonEmpty(config.bookingEndAt) &&
    isNonEmpty(config.formationPeriodLabel) &&
    isNonEmpty(config.ctaHref) &&
    config.eligibleProgrammes.length > 0 &&
    config.eligibleProgrammes.every((p) => isNonEmpty(p.label) && isNonEmpty(p.href)) &&
    conditionsAreComplete(config.conditions)
  );
}

/**
 * Fenêtre de réservation active selon l’horloge locale, en s’appuyant sur des
 * instants ISO avec fuseau (Europe/Paris recommandé dans la config).
 */
export function isPromoBookingWindowOpen(
  config: PromoOffreFormations2027Config = PROMO_OFFRE_FORMATIONS_2027,
  nowMs: number = Date.now(),
): boolean {
  if (!config.bookingStartAt || !config.bookingEndAt) return false;
  const start = Date.parse(config.bookingStartAt);
  const end = Date.parse(config.bookingEndAt);
  if (Number.isNaN(start) || Number.isNaN(end) || end < start) return false;
  return nowMs >= start && nowMs <= end;
}

/** Visible en production : activée + complète + dans la fenêtre de réservation. */
export function isPromoOffreLive(
  config: PromoOffreFormations2027Config = PROMO_OFFRE_FORMATIONS_2027,
  nowMs: number = Date.now(),
): boolean {
  return config.enabled && isPromoOffreComplete(config) && isPromoBookingWindowOpen(config, nowMs);
}

export type PromoBannerVisibility =
  | { mode: 'hidden'; reason: 'dismissed' }
  | { mode: 'promo-live' }
  | { mode: 'informational' };

export function resolvePromoBannerVisibility(options: {
  config?: PromoOffreFormations2027Config;
  dismissed: boolean;
  nowMs?: number;
}): PromoBannerVisibility {
  const config = options.config ?? PROMO_OFFRE_FORMATIONS_2027;
  if (options.dismissed) {
    return { mode: 'hidden', reason: 'dismissed' };
  }
  if (isPromoOffreLive(config, options.nowMs)) {
    return { mode: 'promo-live' };
  }
  return { mode: 'informational' };
}

/** Libellés d’affichage — en prévisualisation, marque les champs manquants. */
export function promoDisplayFields(
  config: PromoOffreFormations2027Config,
  preview: boolean,
): {
  reductionLabel: string;
  promoCode: string;
  formationPeriodLabel: string;
  message: string;
  conditions: PromoOffreFormations2027Conditions;
} {
  const mark = (value: string, label: string) =>
    preview && !isNonEmpty(value) ? `[À renseigner : ${label}]` : value.trim();

  const reductionLabel = mark(config.reductionLabel, 'réduction');
  const promoCode = mark(config.promoCode, 'code');
  const formationPeriodLabel = mark(config.formationPeriodLabel, 'période formations');

  const message = preview
    ? `Profitez de ${reductionLabel} sur une sélection de formations IA BTP en ${formationPeriodLabel} avec le code ${promoCode}.`
    : `Profitez de ${config.reductionLabel.trim()} sur une sélection de formations IA BTP en ${config.formationPeriodLabel.trim()} avec le code ${config.promoCode.trim()}.`;

  const conditions: PromoOffreFormations2027Conditions = {
    reduction: mark(config.conditions.reduction, 'montant ou taux'),
    tarifBase: mark(config.conditions.tarifBase, 'base tarifaire'),
    programmesFormats: mark(config.conditions.programmesFormats, 'programmes et formats'),
    datesReservation: mark(config.conditions.datesReservation, 'dates de réservation'),
    datesFormation: mark(config.conditions.datesFormation, 'dates de formation'),
    modalitesCode: mark(config.conditions.modalitesCode, 'modalités du code'),
    exclusions: mark(config.conditions.exclusions, 'exclusions'),
    cumul: mark(config.conditions.cumul, 'cumul'),
  };

  return { reductionLabel, promoCode, formationPeriodLabel, message, conditions };
}

/** Destination CTA : un seul programme éligible → sa fiche ; sinon config.ctaHref. */
export function resolvePromoCtaHref(
  config: PromoOffreFormations2027Config = PROMO_OFFRE_FORMATIONS_2027,
): string {
  if (config.eligibleProgrammes.length === 1) {
    return config.eligibleProgrammes[0]!.href;
  }
  return config.ctaHref || LINKS.formations;
}
