/**
 * Source unique — événement en ligne « Répondre à un appel d’offres BTP ».
 * Tarif, dates, statut et URL d’inscription : tout passe par ce module.
 */

import { LINKS } from '@/lib/internal-links';
import { PHOTOS } from '@/lib/photos';

/** Fin de l’événement (heure de Paris) — bascule promo / page historique. */
export const EVENEMENT_AO_BTP_END = new Date('2026-11-05T13:00:00+01:00');

export const EVENEMENT_AO_BTP_START = new Date('2026-11-05T12:00:00+01:00');

/** Prix affiché sur la billetterie Eventbrite (EUR). */
export const EVENEMENT_AO_BTP_PRICE_EUR = 11.85;

/** Libellé tarif site — aligné sur la billetterie Eventbrite (11,85 €). */
export const EVENEMENT_AO_BTP_TARIF_LIBELLE = '11,85 €';

export const EVENEMENT_AO_BTP_TARIF_FAQ = '11,85 € par participant.';

/** URL publique d’inscription (jamais de lien privé de connexion). */
export const EVENEMENT_AO_BTP_EVENTBRITE_URL =
  'https://www.eventbrite.fr/e/repondre-a-un-appel-doffres-dans-le-btp-la-methode-en-5-etapes-tickets-2000253456935?aff=ebdssbdestsearch' as const;

export const EVENEMENT_AO_BTP = {
  slug: 'repondre-appel-offres-btp-5-etapes',
  path: LINKS.evenementRepondreAoBtp5Etapes,
  name: 'Répondre à un appel d’offres dans le BTP : la méthode en 5 étapes',
  shortTitle: 'Appels d’offres BTP : méthode en 5 étapes',
  badge: 'Événement en ligne • 5 novembre 2026',
  dateLabel: 'Jeudi 5 novembre 2026',
  timeLabel: 'De 12 h à 13 h, heure de Paris',
  formatLabel: 'En ligne',
  durationLabel: '1 heure',
  startDateIso: '2026-11-05T12:00:00+01:00',
  endDateIso: '2026-11-05T13:00:00+01:00',
  priceEur: EVENEMENT_AO_BTP_PRICE_EUR,
  priceCurrency: 'EUR' as const,
  tarifLibelle: EVENEMENT_AO_BTP_TARIF_LIBELLE,
  tarifFaq: EVENEMENT_AO_BTP_TARIF_FAQ,
  eventbriteUrl: EVENEMENT_AO_BTP_EVENTBRITE_URL,
  ctaPrimary: 'Je réserve ma place sur Eventbrite',
  ctaSecondary: 'Découvrir le programme',
  inscriptionMention: 'Inscription et paiement sur Eventbrite.',
  promoMention: 'En ligne • Inscription sur Eventbrite',
  host: 'Laure Olivié',
  hostRole: 'Formatrice IA pour le BTP',
  image: PHOTOS.formationNiv02IaAppelsOffreBtp2026,
  portrait: PHOTOS.portraitPro2026,
  geoSummary:
    'Laure Olivié organise un événement en ligne le 5 novembre 2026, de 12 h à 13 h, heure de Paris, consacré aux réponses aux appels d’offres BTP avec l’IA. La méthode couvre cinq étapes : analyse du DCE, décision Go/No-Go, chiffrage, mémoire technique et contrôles des productions IA. Il s’adresse aux artisans, dirigeants, conducteurs de travaux, chargés d’affaires et fonctions support. L’inscription s’effectue sur Eventbrite.',
  intro:
    'Du DCE au mémoire technique, découvrez une méthode pour structurer votre réponse avec l’IA. En une heure, identifiez les étapes clés, les points de contrôle et les outils à réutiliser sur vos dossiers.',
  pourQui:
    'Vous préparez les réponses aux appels d’offres de votre entreprise ? Cet événement s’adresse aux artisans, dirigeants, conducteurs de travaux, chargés d’affaires et fonctions support du BTP.',
  formatrice:
    'Laure Olivié est formatrice en intelligence artificielle appliquée au BTP. Ancienne dirigeante d’une entreprise de travaux publics, elle accompagne les professionnels dans leurs usages de l’IA : devis, appels d’offres et suivi de chantier. Elle a fondé OFC Création d’Entreprise, organisme de formation certifié Qualiopi.',
  etapes: [
    {
      title: 'Analyser le DCE',
      description: 'Extraire les exigences et repérer les points qui demandent votre attention.',
    },
    {
      title: 'Décider de répondre : Go/No-Go',
      description: 'Structurer votre décision avant de mobiliser du temps sur le dossier.',
    },
    {
      title: 'Préparer les contrôles du chiffrage',
      description: 'Identifier les vérifications à effectuer pour limiter les oublis.',
    },
    {
      title: 'Structurer le mémoire technique',
      description:
        'Organiser votre réponse et présenter les moyens de votre entreprise avec l’aide de l’IA.',
    },
    {
      title: 'Contrôler les productions de l’IA',
      description:
        'Vérifier les sources, les données et la cohérence avant d’intégrer les résultats à votre offre.',
    },
  ] as const,
  ressources: [
    '4 prompts IA prêts à copier.',
    '6 contrôles essentiels sur les sorties IA.',
    'Une check-list imprimable.',
    'Des repères réglementaires 2026 avec sources citées.',
    'La bibliothèque de prompts BTP par métier offerte aux inscrits.',
  ] as const,
  /** Liens utiles (pages du site) — une seule occurrence par URL sur la page événement. */
  related: {
    guide: LINKS.guideRepondreAoBtpOfc2026,
    bibliothequePrompts: LINKS.bibliothequePromptsBtpParMetier,
    formateur: LINKS.formateurIaBtp,
    aPropos: LINKS.aPropos,
    formationAo: LINKS.formationAO,
  },
} as const;

export type EvenementAoBtp = typeof EVENEMENT_AO_BTP;

/** `true` tant que l’événement n’est pas terminé (après 13 h heure de Paris le 5 nov. 2026). */
export function isEvenementAoBtpActif(now: Date = new Date()): boolean {
  return now.getTime() < EVENEMENT_AO_BTP_END.getTime();
}

export function getEvenementAoBtpPath(): typeof EVENEMENT_AO_BTP.path {
  return EVENEMENT_AO_BTP.path;
}
