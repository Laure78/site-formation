/**
 * Configuration centralisée des liens internes — Maillage SEO
 * Anchors optimisés par mot-clé cible
 */

import { CALENDLY_BOOKING_URL } from '@/lib/calendly';

export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.laureolivie.fr';

/** Pages clés avec ancres SEO variées (éviter répétition) */
export const INTERNAL_LINKS = {
  formations: {
    path: '/formations',
    anchors: ['formation IA BTP', 'catalogue formations IA', 'formations IA bâtiment'],
  },
  /** Prise de RDV — lien direct Calendly (nouvel onglet côté UI) */
  prendreRdv: {
    path: CALENDLY_BOOKING_URL,
    anchors: ['prendre rendez-vous', 'réserver un RDV gratuit', 'devis personnalisé formation'],
  },
  chatgptArtisans: {
    path: '/chatgpt-artisans-btp',
    anchors: [
      'ChatGPT pour entreprises BTP',
      'IA et ChatGPT bâtiment et travaux publics',
      'formation ChatGPT TPE et PME BTP',
    ],
  },
  iaDevis: {
    path: '/ia-devis-batiment',
    anchors: ['IA devis bâtiment', 'automatiser devis BTP', 'IA pour devis'],
  },
  iaConducteur: {
    path: '/ia-conducteur-travaux',
    anchors: ['IA conducteur de travaux', 'IA CR chantier', 'formation IA conducteur'],
  },
  financementConstructys: {
    path: '/financement-constructys',
    anchors: ['financement Constructys', 'OPCO Constructys', 'financer formation IA BTP'],
  },
  financement100: {
    path: '/financement-constructys-100-ia-btp',
    anchors: ['financement 100% IA BTP', 'formation IA Constructys 100%', 'prise en charge totale'],
  },
  diagnostic: {
    path: '/diagnostic-ia-btp',
    anchors: ['diagnostic IA BTP gratuit', 'audit IA BTP', 'diagnostic gratuit'],
  },
  blog: {
    path: '/blog',
    anchors: ['ressources IA BTP', 'articles formation IA', 'blog formation IA BTP'],
  },
  aPropos: {
    path: '/a-propos',
    anchors: ['Laure Olivié formatrice', 'à propos', 'notre formatrice'],
  },
  contact: {
    path: '/contact',
    anchors: ['contact', 'nous contacter', 'devis formation'],
  },
  appelsOffres: {
    path: '/formations/ia-appels-offre-btp',
    anchors: ['formation appels d\'offres IA', 'IA appels d\'offres BTP', 'formation DCE'],
  },
  /** Suite logique après AO jour 1 — parcours LMS assistant DCE / mémoire */
  appelsOffresNiveau2: {
    path: '/formations/ia-niveau2-assistant-ao-dce-memoire',
    anchors: [
      'assistant IA mémoire technique BTP',
      'formation IA DCE marchés publics',
      'parcours LMS appels d\'offres niveau 2',
    ],
  },
  checklist: {
    path: '/checklist-ia-btp',
    anchors: ['checklist prompts ChatGPT', '10 prompts ChatGPT BTP', 'prompts gratuits'],
  },
  clientsPartenaires: {
    path: '/a-propos#clients-partenaires',
    anchors: ['clients et partenaires', 'FFB, GERESO, Lefebvre Dalloz', 'nos partenaires'],
  },
  communauteFormateurs: {
    path: '/communaute-formateurs',
    anchors: ['communauté formateurs', 'trouver clients formateur', 'groupe formateurs'],
  },
} as const;

/** Récupère une ancre (index 0 par défaut pour cohérence) */
export function getAnchor(
  key: keyof typeof INTERNAL_LINKS,
  index: number = 0
): string {
  const entry = INTERNAL_LINKS[key];
  const anchors = entry.anchors;
  return anchors[index % anchors.length];
}

/** Liens sortants — autorités (dofollow OK) */
export const EXTERNAL_AUTHORITY_LINKS = {
  constructys: {
    href: 'https://www.constructys.fr',
    label: 'Constructys',
    title: 'OPCO Constructys — Opérateur de compétences du BTP',
  },
  cnil: {
    href: 'https://www.cnil.fr',
    label: 'CNIL',
    title: 'Commission nationale de l\'informatique et des libertés',
  },
  cnilPlaintes: {
    href: 'https://www.cnil.fr/fr/plaintes',
    label: 'déposer une plainte',
    title: 'Formulaire de plainte CNIL',
  },
  dataGouvQualiopi: {
    href: 'https://annuaire-entreprises.data.gouv.fr/labels-certificats/905244281',
    label: 'Qualiopi sur data.gouv.fr',
    title: 'Vérifier la certification Qualiopi — Annuaire officiel',
  },
  agefiph: {
    href: 'https://www.agefiph.fr',
    label: 'Agefiph',
    title: 'Association de gestion du fonds pour l\'insertion des personnes handicapées',
  },
  linkedinProfile: {
    href: 'https://www.linkedin.com/in/laure-olivie',
    label: 'LinkedIn Laure Olivié',
    title: 'Profil LinkedIn de Laure Olivié',
  },
  linkedinLearningBtp: {
    href: 'https://www.linkedin.com/learning/l-ia-pour-le-btp-des-solutions-concretes-pour-vos-chantiers',
    label: 'L\'IA pour le BTP (LinkedIn Learning)',
    title: 'Formation LinkedIn Learning — L\'IA pour le BTP',
  },
  linkedinLearningRh: {
    href: 'https://www.linkedin.com/learning/l-ia-pour-les-artisans-et-tpe-recruter-sa-main-d-oeuvre-efficacement',
    label: 'L\'IA pour les artisans et TPE : Recruter sa main-d\'œuvre efficacement',
    title:
      "Formation LinkedIn Learning — L'IA pour les artisans et TPE : Recruter sa main-d'œuvre efficacement",
  },
} as const;
