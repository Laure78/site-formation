/**
 * Contenus visuels page /parcours-metiers — maquette 2027 (accroches, images, documents).
 */
import type { ParcoursId } from '@/data/catalogue-2027';
import {
  PARCOURS_DISPONIBILITE_LIBELLE,
  PARCOURS_MODALITE_GEO,
  PARCOURS_MODULARITE_DETAIL,
  PARCOURS_QUALIOPI_ORGANISME,
} from '@/lib/catalogue-2027/parcours-commercial-copy';
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
  badge: 'PARCOURS MÉTIERS · OUVERTURE 2027',
  h1: 'Parcours métiers IA pour le BTP',
  intro:
    'Des parcours modulaires pour intégrer l’IA (ChatGPT, Claude) aux fonctions du bâtiment et des travaux publics : direction, chiffrage, chantier, gestion et déploiement des usages.',
  imageSrc: '/images/accueil-ia-chantier-laptop-plans-btp.webp',
  imageAlt:
    'Professionnel du BTP en EPI consulte plans et ordinateur portable sur un chantier actif.',
} as const;

export const PARCOURS_METIERS_SECTION = {
  id: 'parcours',
  title: 'Un parcours pour chaque métier',
  subtitle: 'Choisissez votre fonction pour découvrir les modules et compétences.',
} as const;

export const PARCOURS_METIERS_MODULARITE_SECTION = {
  id: 'modularite-parcours-metiers',
  title: 'Trois façons de composer votre formation',
  intro:
    'Un même catalogue de modules par métier — vous fixez l’ampleur du programme selon votre situation, sous réserve des prérequis.',
  options: [
    {
      id: 'parcours-complet',
      title: 'Parcours complet',
      description: 'Enchaîner tous les modules du métier pour une progression structurée.',
      Icon: BookOpen,
    },
    {
      id: 'module-a-la-carte',
      title: 'Module à la carte',
      description: 'Un module ciblé pour une compétence précise (devis, planning, administratif…).',
      Icon: LayoutGrid,
    },
    {
      id: 'parcours-personnalise',
      title: 'Parcours personnalisé',
      description: 'Plusieurs modules choisis, éventuellement issus de parcours différents.',
      Icon: Waypoints,
    },
  ],
} as const;

export const PARCOURS_METIERS_FAQ = [
  {
    q: 'Quand les parcours et modules sont-ils disponibles ?',
    a: PARCOURS_DISPONIBILITE_LIBELLE,
  },
  {
    q: 'Faut-il suivre l’intégralité d’un parcours métier ?',
    a: PARCOURS_MODULARITE_DETAIL,
  },
  {
    q: 'Peut-on combiner des modules de différents parcours ?',
    a: 'Oui. Un programme personnalisé peut être construit selon votre fonction, votre expérience et vos objectifs professionnels, sous réserve des prérequis et du positionnement.',
  },
  {
    q: 'Où se déroulent les formations ?',
    a: PARCOURS_MODALITE_GEO,
  },
  {
    q: 'Quel est le tarif d’un parcours métier ?',
    a: 'Chaque fiche parcours affiche le tarif inter du parcours complet (somme des modules obligatoires) et le prix HT / participant de chaque module. Grille : 120 € (niveau 1 · 4 h), 170 € (niveau 2 · 4 h), 620 € (niveau 3 · 14 h). Tarif inter-entreprises calculé à partir des modules du parcours, sans remise automatique. Intra-entreprise : sur devis.',
  },
  {
    q: 'Qui dispense les formations ?',
    a: `${PARCOURS_QUALIOPI_ORGANISME} Laure Olivié est la marque commerciale. Formations non certifiantes.`,
  },
] as const;

/** Descriptions synthétiques cartes hub — une phrase distincte par métier. */
export const PARCOURS_METIERS_CARD_DESCRIPTION: Record<ParcoursId, string> = {
  'dirigeant-pme-btp':
    'Piloter prix, marges et trésorerie, puis cadrer les usages IA utiles à l’entreprise.',
  'charge-affaires-btp':
    'Structurer le chiffrage, les réponses aux marchés et le suivi commercial avec l’IA.',
  'conducteur-de-travaux':
    'Préparer, suivre et coordonner le chantier jusqu’à la réception — planning, CR, documents.',
  'assistant-de-gestion-btp':
    'Fluidifier l’administratif, la facturation et le suivi documentaire au quotidien.',
  'referent-ia-btp':
    'Structurer les usages IA, prototyper un outil métier et préparer le déploiement en PME.',
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

export const PARCOURS_CAS_USAGE_SECTION = {
  id: 'cas-usage-ia-btp',
  title: 'Cas d’usage IA dans le BTP',
  subtitle:
    'Chaque parcours s’appuie sur des documents métier réels — devis, DCE, comptes rendus, DOE.',
} as const;
