/**
 * Contenus visuels page /parcours-metiers — hub 2027 (hero, avantages, cartes).
 */
import type { ParcoursId } from '@/data/catalogue-2027';
import {
  PARCOURS_COMPLET_DISPONIBILITE_LIBELLE,
  PARCOURS_DISPONIBILITE_LIBELLE,
  PARCOURS_MODALITE_GEO,
  PARCOURS_MODULARITE_DETAIL,
  PARCOURS_QUALIOPI_ORGANISME,
} from '@/lib/catalogue-2027/parcours-commercial-copy';
import type { LucideIcon } from 'lucide-react';
import {
  BarChart3,
  Calendar,
  Clock,
  Coins,
  FileText,
  GraduationCap,
  HardHat,
  Layers,
  MapPin,
  Shield,
  Timer,
  Users,
} from 'lucide-react';
import { PARCOURS_METIER_PEDAGOGIE_BACKGROUND } from '@/lib/catalogue-2027/parcours-metier-template-content';

export const PARCOURS_METIERS_HERO = {
  badge: 'PARCOURS MÉTIERS · 2027',
  h1: 'Parcours métiers IA pour le BTP',
  lead: 'Des parcours complets et modulables pour chaque métier du BTP.',
  intro:
    'Montez en compétences avec l’IA sur vos tâches réelles : devis, DCE, suivi de chantier, DOE, gestion et pilotage. Des formations adaptées aux équipes des PME du bâtiment et des travaux publics.',
  imageSrc: '/images/parcours-metiers/hero-parcours-metiers.webp',
  imageAlt:
    'Deux professionnels du BTP en EPI consultent une tablette sur un chantier avec structure en béton.',
} as const;

export const PARCOURS_METIERS_SECTION = {
  id: 'parcours',
  title: 'Nos parcours métiers',
  subtitle: 'Choisissez votre fonction pour découvrir les modules et compétences.',
} as const;

export const PARCOURS_METIERS_AVANTAGES_SECTION = {
  id: 'avantages-parcours-metiers',
  title: 'Pourquoi choisir un parcours métier ?',
  cards: [
    {
      id: 'performance',
      title: 'Plus de performance',
      text: 'Exploiter des outils IA adaptés aux responsabilités de chaque métier.',
      Icon: BarChart3,
    },
    {
      id: 'productivite',
      title: 'Plus de productivité',
      text: 'Accélérer la préparation de documents et les tâches administratives.',
      Icon: Timer,
    },
    {
      id: 'qualite',
      title: 'Plus de qualité',
      text: 'Structurer les livrables et systématiser les vérifications humaines.',
      Icon: Shield,
    },
    {
      id: 'equipes',
      title: 'Pour vos équipes',
      text: 'Former les collaborateurs sur leurs documents et situations professionnelles.',
      Icon: Users,
    },
  ],
} as const;

export type ParcoursMetiersHubIndicateur = {
  id: string;
  label: string;
  sub: string;
  Icon: LucideIcon;
};

/** Bandeau d’informations sous le hero — hub (pas les totaux d’un seul parcours). */
export const PARCOURS_METIERS_HUB_INDICATEURS: readonly ParcoursMetiersHubIndicateur[] = [
  {
    id: 'modularite',
    label: 'Modularité',
    sub: 'Parcours complets et modules à la carte.',
    Icon: GraduationCap,
  },
  {
    id: 'duree-modules',
    label: 'Durées',
    sub: 'Modules de 4 h ou 14 h selon le niveau.',
    Icon: Clock,
  },
  {
    id: 'tarifs',
    label: 'Tarifs',
    sub: 'Tarifs selon les modules sélectionnés.',
    Icon: Coins,
  },
  {
    id: 'lieu',
    label: 'Format',
    sub: PARCOURS_MODALITE_GEO,
    Icon: MapPin,
  },
  {
    id: 'calendrier',
    label: 'Calendrier',
    sub: `${PARCOURS_COMPLET_DISPONIBILITE_LIBELLE}. Modules unitaires : sur programmation dès maintenant.`,
    Icon: Calendar,
  },
] as const;

export const PARCOURS_METIERS_PEDAGOGIE = {
  id: 'pedagogie-parcours-metiers',
  title: 'Une pédagogie ancrée dans la réalité du BTP',
  backgroundSrc: PARCOURS_METIER_PEDAGOGIE_BACKGROUND,
  items: [
    { id: 'cas', title: 'Cas pratiques issus du terrain.', Icon: HardHat },
    { id: 'docs', title: 'Documents métier et exemples concrets.', Icon: FileText },
    { id: 'livrables', title: 'Livrables réutilisables dans votre entreprise.', Icon: Layers },
    { id: 'validation', title: 'Validation humaine des propositions IA.', Icon: Shield },
  ],
} as const;

export const PARCOURS_METIERS_CONTACT_BAND = {
  title: 'Construisons le parcours adapté à votre métier',
  lead:
    'Échangeons sur vos objectifs, vos enjeux et la combinaison de modules la plus adaptée à votre entreprise.',
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

/** Sous-titres cartes hub — une ligne métier par parcours. */
export const PARCOURS_METIERS_CARD_SUBTITLE: Record<ParcoursId, string> = {
  'dirigeant-pme-btp': 'Pilotage, marges et organisation.',
  'charge-affaires-btp': 'Devis, DCE et mémoire technique.',
  'conducteur-de-travaux': 'Planning, suivi de chantier et réception.',
  'assistant-de-gestion-btp': 'Administratif, relances et suivi.',
  'referent-ia-btp': 'Déploiement, automatisation et accompagnement.',
};

export const PARCOURS_METIERS_CARD_MENTION_COMPLET = PARCOURS_COMPLET_DISPONIBILITE_LIBELLE;

export const PARCOURS_METIERS_CARD_MENTION_MODULES =
  'Modules individuels accessibles dès maintenant, selon programmation et prérequis.' as const;

/** @deprecated Préférer PARCOURS_METIERS_CARD_SUBTITLE — conservé pour compatibilité explorateur. */
export const PARCOURS_METIERS_CARD_DESCRIPTION: Record<ParcoursId, string> = {
  'dirigeant-pme-btp': PARCOURS_METIERS_CARD_SUBTITLE['dirigeant-pme-btp'],
  'charge-affaires-btp': PARCOURS_METIERS_CARD_SUBTITLE['charge-affaires-btp'],
  'conducteur-de-travaux': PARCOURS_METIERS_CARD_SUBTITLE['conducteur-de-travaux'],
  'assistant-de-gestion-btp': PARCOURS_METIERS_CARD_SUBTITLE['assistant-de-gestion-btp'],
  'referent-ia-btp': PARCOURS_METIERS_CARD_SUBTITLE['referent-ia-btp'],
};

export const PARCOURS_METIERS_CARD_IMAGE: Record<ParcoursId, { src: string; alt: string }> = {
  'dirigeant-pme-btp': {
    src: '/images/parcours-metiers/parcours-dirigeant-pme-btp.webp',
    alt: 'Dirigeant de PME BTP au bureau avec plans techniques, pilotage entreprise.',
  },
  'charge-affaires-btp': {
    src: '/images/parcours-metiers/parcours-charge-affaires-btp.webp',
    alt: 'Chargée d’affaires BTP au bureau, devis et analyse documentaire.',
  },
  'conducteur-de-travaux': {
    src: '/images/parcours-metiers/parcours-conducteur-travaux.webp',
    alt: 'Conducteur de travaux sur chantier en EPI, consultation tablette.',
  },
  'assistant-de-gestion-btp': {
    src: '/images/parcours-metiers/parcours-assistant-gestion-btp.webp',
    alt: 'Assistante de gestion BTP au bureau, suivi administratif et documents.',
  },
  'referent-ia-btp': {
    src: '/images/parcours-metiers/parcours-referent-ia-btp.webp',
    alt: 'Référent IA BTP au poste de travail, déploiement outils intelligence artificielle.',
  },
};
