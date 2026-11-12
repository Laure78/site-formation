/**
 * Contenu page `/prendre-rdv` — UX conversion + SEO (source unique).
 * Ne pas inventer de chiffres : preuves via `lib/constants` / indicateurs.
 */
import { CONTACT, PREUVES, PREUVES_FEDERATIONS_OPCO } from '@/lib/constants';
import { TARIF_PARTICIPANT_NIV01_HT } from '@/lib/tarifs-catalogue-participant';
import { CALENDLY_BOOKING_URL } from '@/lib/calendly';
import { LINKS } from '@/lib/internal-links';
import { siteAdresseLigne } from '@/lib/site-config';

export type PrendreRdvFaqItem = { q: string; a: string };

export const PRENDRE_RDV_DUREE_MINUTES = 30;

export const PRENDRE_RDV_PAGE_TITLE = 'Prendre rendez-vous | Formation IA BTP';

export const PRENDRE_RDV_META_DESCRIPTION =
  'Réservez 30 min avec Laure Olivié : formation IA pour le BTP, devis, chantiers et appels d’offres. Visio découverte gratuite, sans engagement. Qualiopi.';

export const PRENDRE_RDV_H1 =
  'Visio découverte gratuite : votre projet de formation IA BTP en Île-de-France';

export const PRENDRE_RDV_SUBTITLE =
  '30 minutes avec Laure Olivié pour repérer vos tâches chronophages et choisir la bonne formation. Gratuit, sans engagement.';

export const PRENDRE_RDV_HOST_NAME = 'Laure Olivié';

export const PRENDRE_RDV_HOST_BIO =
  "Fondatrice d'OFC Création d'Entreprise, organisme certifié Qualiopi. 7 ans dans le BTP (ex-dirigeante d'ALIA BTP), instructrice LinkedIn Learning.";

export const PRENDRE_RDV_REFERENCES_LINE = PREUVES_FEDERATIONS_OPCO;

export const PRENDRE_RDV_USE_CASES_LINE =
  'Devis · Chantiers · Appels d’offres · Administratif · Commercial';

/** CTA principal — ancre vers l’agenda Calendly intégré (#calendly). */
export const PRENDRE_RDV_CTA_PRIMARY = 'Choisir mon créneau' as const;
export const PRENDRE_RDV_CTA_SECONDARY = 'Voir les formations' as const;
export const PRENDRE_RDV_CTA_NATIVE = 'Réserver via le formulaire du site' as const;

export const PRENDRE_RDV_REASSURANCE = `Visio découverte gratuite · ${PRENDRE_RDV_DUREE_MINUTES} minutes · Sans engagement`;

/** Preuves compactes — uniquement des faits sourcés sur le site. */
export const PRENDRE_RDV_PROOFS = [
  `Satisfaction ${PREUVES.satisfaction}`,
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

export const PRENDRE_RDV_FORM_TITLE = 'Vous préférez décrire votre besoin par écrit ?';
export const PRENDRE_RDV_FORM_SUBTITLE =
  'Indiquez votre besoin ici, puis choisissez un créneau : même échange de 30 minutes, sans passer par Calendly.';

export const PRENDRE_RDV_CALENDLY_SECTION_TITLE = 'Réserver votre créneau';
export const PRENDRE_RDV_CALENDLY_SECTION_SUBTITLE =
  'Accès direct à mon agenda Calendly — choisissez le jour et l’heure qui vous conviennent.';

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

/** Ancre agenda Calendly (CTA principal). */
export const PRENDRE_RDV_FORM_ANCHOR = 'calendly';

/** Ancre formulaire natif (option secondaire). */
export const PRENDRE_RDV_NATIVE_FORM_ANCHOR = 'agenda-site';

/** GEO discret (bas de page) — Laure, BTP, siège Paris 12e / IDF. */
export const PRENDRE_RDV_GEO_NOTE =
  `Laure Olivié — formatrice IA appliquée au BTP (OFC Création d’Entreprise, ${siteAdresseLigne()}). Catalogue IA BTP exclusivement en présentiel en Île-de-France, en groupe (intra ou interentreprises). Vous pouvez vous inscrire à une session collective interentreprises ; aucun accompagnement individuel n’est proposé. Le catalogue IA BTP est en présentiel, en Île-de-France. L’échange découverte (30 minutes) peut se faire en visioconférence. Satisfaction ${PREUVES.satisfaction}.`;

/** FAQ visible — sous le formulaire. */
export const FAQ_PRENDRE_RDV_PAGE: readonly PrendreRdvFaqItem[] = [
  {
    q: 'Le rendez-vous est-il gratuit ?',
    a: `Oui. L’échange de ${PRENDRE_RDV_DUREE_MINUTES} minutes est gratuit et sans engagement.`,
  },
  {
    q: 'Comment se déroule l’échange ?',
    a: `Vous choisissez un créneau sur Calendly (ou via le formulaire du site), puis nous échangeons en visioconférence (${PRENDRE_RDV_DUREE_MINUTES} minutes) ou par téléphone. Le catalogue IA BTP est en présentiel, en Île-de-France. Aucun document confidentiel n’est nécessaire.`,
  },
  {
    q: 'Proposez-vous des formations hors Île-de-France ou à distance ?',
    a: `Non. Le catalogue IA BTP est en présentiel, en Île-de-France, en groupe, en intra ou en inter-entreprises. Vous pouvez vous inscrire à une session collective interentreprises ; aucun accompagnement individuel n’est proposé.`,
  },
  {
    q: 'Combien coûte une formation ?',
    a: `Le Niveau 1 (4 h) en interentreprises à Paris 12e coûte ${TARIF_PARTICIPANT_NIV01_HT} € HT par participant. En intra, dans vos locaux en Île-de-France, le tarif est établi sur devis.`,
  },
  {
    q: 'La formation est-elle finançable ?',
    a: `Prise en charge OPCO/Constructys selon éligibilité, sans subrogation : l'entreprise règle la formation puis se fait rembourser. Les formations ne sont pas éligibles au CPF. Voir <a href="${LINKS.financement}">le financement Constructys</a>.`,
  },
  {
    q: 'Que faire si aucun créneau ne me convient ?',
    a: `Utilisez la section « Aucun créneau ne vous convient ? » sur cette page : bouton de demande ou email ${CONTACT.email}.`,
  },
];
