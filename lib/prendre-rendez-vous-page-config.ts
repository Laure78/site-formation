/**
 * Contenu page `/prendre-rendez-vous` — source UX (pas de catalogues ni tarifs).
 */
import { CONTACT } from '@/lib/constants';
import { CALENDLY_BOOKING_URL } from '@/lib/calendly';
import { LINKS } from '@/lib/internal-links';

export type PrendreRdvFaqItem = { q: string; a: string };

export const PRENDRE_RDV_PAGE_TITLE = 'Prendre rendez-vous | Formation IA BTP';

export const PRENDRE_RDV_META_DESCRIPTION =
  'Réservez un échange de 30 minutes avec Laure Olivié pour présenter votre projet de formation IA appliquée au BTP.';

export const PRENDRE_RDV_H1 =
  'Réserver un échange sur votre projet de formation IA BTP';

export const PRENDRE_RDV_SUBTITLE =
  '30 minutes en visio ou par téléphone pour préciser votre besoin et identifier la suite adaptée.';

export const PRENDRE_RDV_REASSURANCE = 'Gratuit · Sans engagement · 30 minutes';

export const PRENDRE_RDV_AGENDA_POINTS = [
  {
    title: 'Profils et effectif',
    text: 'Qui former, combien de personnes, et quel niveau d’usage de l’IA aujourd’hui.',
  },
  {
    title: 'Usages prioritaires',
    text: 'Tâches, documents et situations métier sur lesquelles vous voulez gagner du temps.',
  },
  {
    title: 'Contraintes du projet',
    text: 'Format souhaité, calendrier, lieu et contraintes opérationnelles.',
  },
] as const;

export const PRENDRE_RDV_CHECKLIST = [
  'Votre métier ou activité',
  'Les profils concernés',
  'Le problème principal à traiter',
  'La période souhaitée',
  'Un éventuel besoin d’aménagement',
] as const;

export const PRENDRE_RDV_APRES = [
  'Une confirmation est envoyée par Calendly à l’adresse indiquée.',
  'Le lien de visioconférence ou la modalité téléphonique figure dans l’invitation.',
  'Vous pouvez reprogrammer ou annuler depuis l’invitation Calendly.',
  'La suite est définie après l’échange selon le besoin.',
] as const;

export const PRENDRE_RDV_DEVIS_FORMULATION =
  'Si le besoin est suffisamment défini, un programme et un devis pourront ensuite être préparés.';

export const PRENDRE_RDV_EMAIL = CONTACT.email;

export const PRENDRE_RDV_CALENDLY_URL = CALENDLY_BOOKING_URL;

export const PRENDRE_RDV_CONTACT_HREF = LINKS.contact;

export const PRENDRE_RDV_PRIVACY_HREF = LINKS.politiqueConfidentialite;

/** FAQ visible — 3 questions max. */
export const FAQ_PRENDRE_RDV_PAGE: readonly PrendreRdvFaqItem[] = [
  {
    q: 'Le rendez-vous est-il gratuit ?',
    a: 'Oui. L’échange de 30 minutes est gratuit et sans engagement d’achat.',
  },
  {
    q: 'Comment se déroule l’échange ?',
    a: 'Vous choisissez un créneau, puis nous échangeons en visioconférence ou par téléphone. Nous précisons votre besoin et la suite possible. Aucun document confidentiel n’est nécessaire pour ce premier échange.',
  },
  {
    q: 'Que faire si aucun créneau ne me convient ?',
    a: `Utilisez la page <a href="${LINKS.contact}">Contact</a> pour envoyer votre demande, ou écrivez à <a href="mailto:${CONTACT.email}">${CONTACT.email}</a>.`,
  },
];
