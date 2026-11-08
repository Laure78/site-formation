/**
 * Contenus visuels page /parcours-metiers — maquette 2027 (accroches, images, documents).
 */
import type { ParcoursId } from '@/data/catalogue-2027';
import { SITE_FORMATION_MODALITE_ENCART } from '@/lib/site-config';
import type { LucideIcon } from 'lucide-react';
import {
  BookOpen,
  ClipboardList,
  FileSpreadsheet,
  FileText,
  Layers,
  LayoutGrid,
  Waypoints,
} from 'lucide-react';

/**
 * Visuels en définition suffisante (≥ ~1024 px) — les exports légers dans
 * `public/images/parcours-metiers/*.webp` (~600 px de large) pixelisaient en grand format.
 */
export const PARCOURS_METIERS_HERO = {
  badge: 'FORMATIONS MÉTIERS BTP – OUVERTURE 2027',
  h1Before: 'Les parcours métiers BTP avec ',
  h1Highlight: 'l’IA',
  h1: 'Les parcours métiers BTP avec l’IA',
  intro:
    'Développez vos compétences avec l’IA, à votre rythme. Suivez un parcours métier complet ou choisissez uniquement les modules adaptés à vos besoins professionnels.',
  modulariteLead: 'Parcours complet ou modules à la carte',
  imageSrc: '/images/accueil-ia-chantier-laptop-plans-btp.webp',
  imageAlt:
    'Professionnel du BTP en EPI consulte plans et ordinateur portable sur un chantier actif.',
  lieuBadge: SITE_FORMATION_MODALITE_ENCART,
} as const;

export const PARCOURS_METIERS_SECTION = {
  id: 'parcours',
  title: 'Un parcours pour chaque métier',
  subtitle: 'Choisissez votre fonction pour découvrir les modules et compétences.',
} as const;

export const PARCOURS_METIERS_MODULARITE_SECTION = {
  id: 'modularite-parcours-metiers',
  title: 'Votre formation, votre parcours, vos modules.',
  intro:
    'Chaque professionnel du BTP a des besoins différents. Nos parcours métiers sont modulaires : vous pouvez suivre l’ensemble du programme, sélectionner un seul module ou combiner plusieurs modules selon vos compétences et vos objectifs.',
  options: [
    {
      id: 'parcours-complet',
      title: 'Parcours complet',
      description:
        'Suivez tous les modules pour développer une maîtrise globale de l’IA appliquée à votre métier.',
      Icon: BookOpen,
    },
    {
      id: 'module-a-la-carte',
      title: 'Module à la carte',
      description:
        'Choisissez uniquement la formation qui répond à votre besoin : devis, chiffrage, appels d’offres, planning, suivi de chantier ou gestion administrative, selon les modules disponibles.',
      Icon: LayoutGrid,
    },
    {
      id: 'parcours-personnalise',
      title: 'Parcours personnalisé',
      description:
        'Combinez plusieurs modules de formation IA pour les professionnels du BTP pour construire une formation adaptée à vos missions et à votre niveau.',
      Icon: Waypoints,
    },
  ],
} as const;

export const PARCOURS_METIERS_FAQ = [
  {
    q: 'Faut-il suivre l’intégralité d’un parcours métier ?',
    a: 'Non. Chaque parcours est modulaire. Vous pouvez suivre le programme complet ou sélectionner uniquement les modules correspondant à vos besoins, sous réserve des prérequis.',
  },
  {
    q: 'Peut-on combiner des modules de différents parcours ?',
    a: 'Oui. Un programme personnalisé peut être construit selon votre fonction, votre expérience et vos objectifs professionnels.',
  },
  {
    q: 'Les formations sont-elles proposées en présentiel ?',
    a: 'Oui. Les formations sont proposées en présentiel en Île-de-France.',
  },
] as const;

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
      src: '/images/formation-ia-dirigeant-pme-btp.webp',
      alt: 'Laure Olivié échange avec un professionnel en gilet BTP autour d’un café.',
    },
    'charge-affaires-btp': {
      src: '/images/og/formation-ia-charge-affaires-btp.webp',
      alt: 'Professionnel du BTP analyse des plans et documents sur ordinateur avec casque.',
    },
    'conducteur-de-travaux': {
      src: '/images/formation-ia-conducteur-travaux-plans.webp',
      alt: 'Professionnel du BTP consulte des plans de chantier sur table.',
    },
    'assistant-de-gestion-btp': {
      src: '/images/formation-assistants-ia-personnalises-btp.webp',
      alt: 'Groupe BTP en formation — assistants IA, prompts et workflows devis et chantier.',
    },
    'referent-ia-btp': {
      src: '/images/formation-maitriser-claude-ai-btp.webp',
      alt: 'Formation Claude AI BTP : écran, plans et documents chantier sur une table.',
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
    src: '/images/formation-appels-offres-btp-dce-memoire.webp',
    alt: 'Formation appels d’offres BTP : analyse DCE et mémoire technique avec l’IA.',
    Icon: Layers,
  },
  {
    id: 'devis',
    title: 'Devis & chiffrage',
    src: '/images/formation-ia-devis-chiffrage-btp.webp',
    alt: 'Notes de terrain, photos et plans transformés en devis bâtiment structuré.',
    Icon: FileSpreadsheet,
  },
  {
    id: 'cr',
    title: 'Comptes rendus',
    src: '/images/formation-ia-compte-rendu-chantier.webp',
    alt: 'Note vocale sur téléphone transformée en compte rendu de chantier structuré.',
    Icon: ClipboardList,
  },
  {
    id: 'doe',
    title: 'DOE & réception',
    src: '/images/tuto-doe-hero.png',
    alt: 'Écran et documents pour préparer un DOE (dossier des ouvrages exécutés) BTP avec l’IA.',
    Icon: FileText,
  },
] as const;

export const PARCOURS_METIERS_TRUST = [
  { id: 'idf', title: 'Présentiel – Île-de-France', detail: null },
  { id: 'qualiopi', title: 'Certifié Qualiopi', detail: null },
  { id: 'cas', title: 'Cas pratiques BTP', detail: null },
] as const;
