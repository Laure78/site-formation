/**
 * Intervenants confirmés — Laure Olivié (IA) + source hub /formateurs.
 */
import { LINKS } from '@/lib/internal-links';
import { PHOTOS } from '@/lib/photos';
import type { FormateurProfile } from '@/lib/formateurs/types';

const LAURE_PORTRAIT = PHOTOS.formateurLaureOlivieHub;

/** Codes catalogue IA reliés aux spécialités affichées sur /formateurs. */
const LAURE_HUB_FORMATION_CODES = [
  'NIV-01',
  'NIV-02',
  'NIV-03',
  'NIV-04',
  'NIV-10',
] as const;

/** Profil public confirmé — Laure Olivié (OFC). */
export const FORMATEUR_LAURE_OLIVIE: FormateurProfile = {
  id: 'laure-olivie',
  slug: 'laure-olivie',
  prenom: 'Laure',
  nom: 'Olivié',
  intitule: 'Formatrice en intelligence artificielle appliquée au BTP',
  parcours:
    'Fondatrice d’OFC Création d’Entreprise, Laure Olivié accompagne les PME du BTP dans l’utilisation opérationnelle de l’IA. Elle anime l’ensemble du catalogue IA, coordonne l’équipe de formateurs et intervient comme instructrice LinkedIn Learning.',
  specialites: [
    'Intelligence artificielle appliquée au bâtiment et aux travaux publics',
    'Analyse des DCE, CCTP et CCAP',
    'Rédaction de mémoires techniques et de comptes rendus',
    'Création d’assistants IA métiers',
    'Création d’outils de gestion avec l’IA, sans coder',
  ],
  domaineIds: ['numerique-ia'],
  formationCodes: [],
  formationCodesHub: LAURE_HUB_FORMATION_CODES,
  formationsHubLabel: 'Formations associées à ses spécialités',
  featuredOnHub: true,
  modalite: 'Formations en présentiel en Île-de-France.',
  animatesAllPublished: true,
  portrait: {
    kind: 'photo',
    src: LAURE_PORTRAIT.src,
    alt: 'Laure Olivié, formatrice en intelligence artificielle appliquée au BTP',
    width: LAURE_PORTRAIT.width,
    height: LAURE_PORTRAIT.height,
    objectPosition: LAURE_PORTRAIT.objectPosition,
  },
  status: 'confirmed',
  publie: true,
  /** TODO(Laure) : `a-confirmer` pour masquer en production si besoin. */
  affichageHub: 'actif',
};

/** Intervenante IA — fiches NIV et hub formateurs. */
export const CONFIRMED_FORMATEURS: readonly FormateurProfile[] = [FORMATEUR_LAURE_OLIVIE];
