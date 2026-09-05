/**
 * Contenu page `/prendre-rendez-vous` — UX conversion + SEO (source unique).
 * Ne pas inventer de chiffres : preuves via `lib/constants` / indicateurs.
 */
import { CONTACT, PREUVES } from '@/lib/constants';
import { CALENDLY_BOOKING_URL } from '@/lib/calendly';
import { LINKS } from '@/lib/internal-links';
import { formatVolumeProsFormesBtpLibelle } from '@/lib/data/indicateurs-resultats';

export type PrendreRdvFaqItem = { q: string; a: string };

export const PRENDRE_RDV_DUREE_MINUTES = 30;

export const PRENDRE_RDV_PAGE_TITLE = 'Prendre rendez-vous | Formation IA BTP';

export const PRENDRE_RDV_META_DESCRIPTION =
  'Réservez 30 min avec Laure Olivié : formation IA pour le BTP, devis, chantiers, appels d’offres. Visio gratuite, sans engagement.';

export const PRENDRE_RDV_H1 = 'Parlons de vos usages IA dans le BTP';

export const PRENDRE_RDV_SUBTITLE =
  '30 minutes pour identifier les tâches que l’IA peut réellement vous faire gagner du temps.';

export const PRENDRE_RDV_USE_CASES_LINE =
  'Devis · Chantiers · Appels d’offres · Administratif · Commercial';

export const PRENDRE_RDV_CTA_PRIMARY = 'Choisir mon créneau';
export const PRENDRE_RDV_CTA_SECONDARY = 'Voir les formations';

export const PRENDRE_RDV_REASSURANCE = `Visio découverte gratuite · ${PRENDRE_RDV_DUREE_MINUTES} minutes · Sans engagement`;

/** Preuves compactes — uniquement des faits sourcés sur le site. */
export const PRENDRE_RDV_PROOFS = [
  formatVolumeProsFormesBtpLibelle(),
  'Spécialiste IA appliquée au BTP',
  'Organisme de formation certifié Qualiopi',
] as const;

export const PRENDRE_RDV_AUDIENCE_TITLE = 'Ce rendez-vous est utile si vous souhaitez…';

export const PRENDRE_RDV_AUDIENCE_CARDS = [
  { title: 'Gagner du temps sur les devis', text: 'Rédaction, chiffrage, relecture.' },
  { title: 'Analyser plus vite un DCE', text: 'Go / No Go et pièces clés.' },
  { title: 'Préparer vos CR de chantier', text: 'Structurer et accélérer la rédaction.' },
  { title: 'Améliorer vos mémoires techniques', text: 'Cadre, arguments, clarté.' },
  { title: 'Former vos équipes à l’IA', text: 'Usages concrets, métier par métier.' },
  { title: 'Automatiser des tâches répétitives', text: 'Emails, admin, suivi.' },
] as const;

export const PRENDRE_RDV_PROCESS_TITLE = `En ${PRENDRE_RDV_DUREE_MINUTES} minutes, nous faisons le point sur votre besoin`;

export const PRENDRE_RDV_PROCESS_STEPS = [
  {
    n: '1',
    title: 'Vos tâches chronophages',
    text: 'Identifier les processus qui vous font perdre du temps.',
  },
  {
    n: '2',
    title: 'Les usages IA pertinents',
    text: 'Voir ce qui peut réellement être accéléré ou automatisé.',
  },
  {
    n: '3',
    title: 'La prochaine étape',
    text: 'Identifier la formation ou la solution la plus adaptée.',
  },
] as const;

export const PRENDRE_RDV_FORM_TITLE = 'Réserver en 1 à 2 minutes';
export const PRENDRE_RDV_FORM_SUBTITLE =
  'Quelques choix rapides, puis votre créneau. Pas de questionnaire interminable.';

/** Conservé pour FAQ / SEO bas de page — plus affiché avant le formulaire. */
export const PRENDRE_RDV_AGENDA_POINTS = PRENDRE_RDV_PROCESS_STEPS.map((s) => ({
  title: s.title,
  text: s.text,
}));

export const PRENDRE_RDV_CHECKLIST = [
  'Votre métier ou activité',
  'Les profils concernés',
  'Le problème principal à traiter',
  'La période souhaitée',
] as const;

export const PRENDRE_RDV_APRES = [
  'Confirmation et lien visio (ou appel) par email.',
  'Modification ou annulation via les liens de l’email.',
  'Rappel la veille à 15 h (heure de Paris), sauf réservation le jour même.',
] as const;

export const PRENDRE_RDV_DEVIS_FORMULATION =
  'Si le besoin est clair, un programme et un devis peuvent ensuite être préparés.';

export const PRENDRE_RDV_EMAIL = CONTACT.email;

export const PRENDRE_RDV_CALENDLY_URL = CALENDLY_BOOKING_URL;

export const PRENDRE_RDV_CONTACT_HREF = LINKS.contact;

export const PRENDRE_RDV_FORMATIONS_HREF = LINKS.formations;

export const PRENDRE_RDV_PRIVACY_HREF = LINKS.politiqueConfidentialite;

/** Ancre formulaire / créneau */
export const PRENDRE_RDV_FORM_ANCHOR = 'agenda';

/** GEO discret (bas de page) — Laure, BTP, Guyancourt / IDF. */
export const PRENDRE_RDV_GEO_NOTE =
  `Laure Olivié — formatrice IA appliquée au BTP (OFC Création d’Entreprise, Guyancourt, Yvelines). Échanges en visio partout en France ; présentiel en Île-de-France. Satisfaction ${PREUVES.satisfaction}.`;

/** FAQ visible — 3 questions max, sous le formulaire. */
export const FAQ_PRENDRE_RDV_PAGE: readonly PrendreRdvFaqItem[] = [
  {
    q: 'Le rendez-vous est-il gratuit ?',
    a: `Oui. L’échange de ${PRENDRE_RDV_DUREE_MINUTES} minutes est gratuit et sans engagement.`,
  },
  {
    q: 'Comment se déroule l’échange ?',
    a: 'Vous indiquez votre besoin en 1 à 2 minutes, choisissez un créneau, puis nous échangeons en visioconférence ou par téléphone. Aucun document confidentiel n’est nécessaire.',
  },
  {
    q: 'Que faire si aucun créneau ne me convient ?',
    a: `Utilisez la page <a href="${LINKS.contact}">Contact</a> ou écrivez à <a href="mailto:${CONTACT.email}">${CONTACT.email}</a>.`,
  },
];
