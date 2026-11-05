/**
 * Contenus visuels page /parcours-metiers — maquette 2027 (accroches, images, documents).
 */
import type { ParcoursId } from '@/data/catalogue-2027';
import type { LucideIcon } from 'lucide-react';
import { ClipboardList, FileSpreadsheet, FileText, Layers } from 'lucide-react';

const IMG = '/images/parcours-metiers';

export const PARCOURS_METIERS_HERO = {
  badge: 'FORMATIONS MÉTIERS BTP – OUVERTURE 2027',
  h1Before: 'Les parcours métiers BTP avec ',
  h1Highlight: 'l’IA',
  h1: 'Les parcours métiers BTP avec l’IA',
  intro:
    'Développez les compétences de vos équipes avec des formations concrètes, adaptées à chaque métier.',
  imageSrc: `${IMG}/parcours-metiers-hero.webp`,
  imageAlt:
    'Professionnel du BTP avec casque et gilet haute visibilité, tablette en main sur un chantier avec grue.',
  lieuBadge: 'Présentiel · Île-de-France',
} as const;

export const PARCOURS_METIERS_SECTION = {
  id: 'parcours',
  title: 'Un parcours pour chaque métier',
  subtitle: 'Choisissez votre fonction pour découvrir les modules et compétences.',
} as const;

/** Accroches courtes cartes — maquette. */
export const PARCOURS_METIERS_ACCROCHE: Partial<Record<ParcoursId, string>> = {
  'dirigeant-pme-btp': 'Pilotage, marges, trésorerie',
  'charge-affaires-btp': 'Devis, DCE, mémoire technique',
  'conducteur-de-travaux': 'Planning, comptes rendus, réception',
  'assistant-de-gestion-btp': 'Administratif, relances, suivi',
  'referent-ia-btp': 'Claude, appels d’offres, applications',
};

export const PARCOURS_METIERS_CARD_IMAGE: Partial<Record<ParcoursId, { src: string; alt: string }>> =
  {
    'dirigeant-pme-btp': {
      src: `${IMG}/parcours-dirigeant-pme-btp.webp`,
      alt: 'Dirigeant de PME du BTP devant un ordinateur portable dans un bureau lumineux.',
    },
    'charge-affaires-btp': {
      src: `${IMG}/parcours-charge-affaires-btp.webp`,
      alt: 'Chargé d’affaires annotant des plans sur un bureau avec casque de chantier.',
    },
    'conducteur-de-travaux': {
      src: `${IMG}/parcours-conducteur-travaux.webp`,
      alt: 'Conducteur de travaux avec casque blanc devant une structure en béton sur chantier.',
    },
    'assistant-de-gestion-btp': {
      src: `${IMG}/parcours-assistant-gestion-btp.webp`,
      alt: 'Assistante de gestion BTP travaillant sur ordinateur dans un open space.',
    },
    'referent-ia-btp': {
      src: `${IMG}/parcours-referent-ia-btp.webp`,
      alt: 'Référent IA BTP avec casque et plans techniques sur table, écran d’ordinateur ouvert.',
    },
  };

export type ParcoursDocumentMetierTile = {
  id: string;
  title: string;
  src: string;
  alt: string;
  Icon: LucideIcon;
};

export const PARCOURS_DOCUMENTS_METIER: readonly ParcoursDocumentMetierTile[] = [
  {
    id: 'dce-cctp',
    title: 'DCE & CCTP',
    src: `${IMG}/cas-pratique-dce-cctp.webp`,
    alt: 'Documents DCE et CCTP posés sur un bureau.',
    Icon: Layers,
  },
  {
    id: 'devis',
    title: 'Devis & chiffrage',
    src: `${IMG}/cas-pratique-devis-chiffrage.webp`,
    alt: 'Document de devis et chiffrage posé sur un bureau en bois.',
    Icon: FileSpreadsheet,
  },
  {
    id: 'cr',
    title: 'Comptes rendus',
    src: `${IMG}/cas-pratique-compte-rendu-chantier.webp`,
    alt: 'Compte rendu de chantier rédigé à la main avec un stylo.',
    Icon: ClipboardList,
  },
  {
    id: 'doe',
    title: 'DOE & réception',
    src: `${IMG}/cas-pratique-doe-reception.webp`,
    alt: 'Document DOE avec case réception cochée, posé sur des plans.',
    Icon: FileText,
  },
] as const;

export const PARCOURS_METIERS_TRUST = [
  { id: 'idf', title: 'Présentiel – Île-de-France', detail: null },
  { id: 'qualiopi', title: 'Certifié Qualiopi', detail: null },
  { id: 'cas', title: 'Cas pratiques BTP', detail: null },
] as const;
