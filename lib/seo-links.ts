/**
 * Configuration centralisée des liens internes — Maillage SEO
 * Anchors optimisés par mot-clé cible
 */

import { CALENDLY_BOOKING_URL } from '@/lib/calendly';
import { SITE_CONFIG } from '@/lib/seo';
import { LINKS } from '@/lib/internal-links';

export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.laureolivie.fr';

/** Pages clés avec ancres SEO variées (éviter répétition) — chemins alignés sur {@link LINKS} */
export const INTERNAL_LINKS = {
  formations: {
    path: LINKS.formations,
    anchors: ['formation IA BTP', 'catalogue formations IA', 'formations IA bâtiment'],
  },
  /** Prise de RDV — lien direct Calendly (nouvel onglet côté UI) */
  prendreRdv: {
    path: CALENDLY_BOOKING_URL,
    anchors: ['prendre rendez-vous', 'réserver un RDV gratuit', 'devis personnalisé formation'],
  },
  chatgptArtisans: {
    path: LINKS.chatgptArtisans,
    anchors: [
      'ChatGPT pour entreprises BTP',
      'IA et ChatGPT bâtiment et travaux publics',
      'formation ChatGPT TPE et PME BTP',
    ],
  },
  iaDevis: {
    path: LINKS.iaDevis,
    anchors: ['IA devis bâtiment', 'automatiser devis BTP', 'IA pour devis'],
  },
  iaConducteur: {
    path: LINKS.iaCDT,
    anchors: ['IA conducteur de travaux', 'IA CR chantier', 'formation IA conducteur'],
  },
  financementConstructys: {
    path: LINKS.financement,
    anchors: ['financement Constructys', 'OPCO Constructys', 'financer formation IA BTP'],
  },
  financement100: {
    path: LINKS.financement100,
    anchors: ['financement 100% IA BTP', 'formation IA Constructys 100%', 'prise en charge totale'],
  },
  diagnostic: {
    path: LINKS.diagnostic,
    anchors: ['diagnostic IA BTP gratuit', 'audit IA BTP', 'diagnostic gratuit'],
  },
  blog: {
    path: LINKS.blog,
    anchors: ['ressources IA BTP', 'articles formation IA', 'blog formation IA BTP'],
  },
  aPropos: {
    path: LINKS.aPropos,
    anchors: ['Laure Olivié formatrice', 'à propos', 'notre formatrice'],
  },
  contact: {
    path: LINKS.contact,
    anchors: ['contact', 'nous contacter', 'devis formation'],
  },
  appelsOffres: {
    path: LINKS.formationAO,
    anchors: [
      'formation appels d\'offres IA',
      'répondre aux appels d\'offre avec l\'IA',
      'IA appels d\'offres BTP',
      'formation DCE',
      'assistant IA mémoire technique BTP',
      'parcours LMS appels d\'offres',
    ],
  },
  checklist: {
    path: LINKS.checklist,
    anchors: ['checklist prompts ChatGPT', '10 prompts ChatGPT BTP', 'prompts gratuits'],
  },
  clientsPartenaires: {
    path: '/a-propos#clients-partenaires',
    anchors: ['clients et partenaires', 'FFB, CSFE, OPPBTP', 'nos partenaires'],
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
  googleBusinessProfile: {
    href: SITE_CONFIG.googleBusinessProfileUrl,
    label: 'Fiche Google — Laure Olivié',
    title: 'Fiche Google Business — avis et informations locales',
  },
  googleMaps: {
    href: SITE_CONFIG.googleMapsUrl,
    label: 'Google Maps — OFC Guyancourt',
    title: 'Ouvrir l’adresse dans Google Maps',
  },
  linkedinProfile: {
    href: SITE_CONFIG.linkedinProfileUrl,
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
