/**
 * Page `/partenaires` — références et interventions (source unique, données vérifiées).
 * Ne pas dupliquer ces entrées dans les composants.
 */
import {
  ALT_LOGO_ARFAB,
  ALT_LOGO_CNAM_ENTREPRISES,
  ALT_LOGO_CSFE,
  ALT_LOGO_FFB_GRAND_PARIS_IDF,
  ALT_LOGO_FFB_OFFICIEL,
  ALT_LOGO_IFRB,
  ALT_LOGO_MONITEUR_FORMATIONS,
  ALT_LOGO_LINKEDIN_LEARNING,
  ALT_LOGO_UMB_FFB,
  LOGO_MONITEUR_FORMATIONS,
  LOGO_LINKEDIN_LEARNING,
  LOGO_UMB_FFB,
  PARTNER_WEBSITES,
} from '@/lib/client-logos';
import { CSFE_NOM_COMPLET } from '@/lib/csfe';
import { LINKS } from '@/lib/internal-links';
import { SCHEMA_LINKEDIN_LEARNING_INSTRUCTOR_URL } from '@/lib/schema-constants';
import { UMB_FFB_NOM_LIBRE } from '@/lib/umb-ffb';

export const PARTENAIRES_PAGE_H1 =
  'Des organismes reconnus me confient leurs formations IA' as const;

export const PARTENAIRES_PAGE_SUBTITLE =
  'J’anime des formations pratiques pour les adhérents, stagiaires et équipes de réseaux professionnels et d’organismes de formation.' as const;

export const PARTENAIRES_PAGE_CLARIFICATION =
  'Chaque référence correspond à une intervention réelle. La nature de la mission est précisée pour chaque organisme.' as const;

export const PARTENAIRES_PAGE_META_TITLE = 'Références formation IA BTP | Laure Olivié' as const;

export const PARTENAIRES_PAGE_META_DESCRIPTION =
  'Découvrez les réseaux, fédérations et organismes pour lesquels Laure Olivié anime des formations pratiques à l’IA appliquée au BTP.' as const;

export type PartenaireOrganizationCategory = 'btp' | 'autres';

export type PartenaireOrganizationType =
  | 'Fédération BTP'
  | 'Syndicat professionnel'
  | 'Union de métiers'
  | 'Institut de formation BTP'
  | 'Institut de formation'
  | 'Association de formation'
  | 'Plateforme de formation';

export type PartenaireRelationshipLabel =
  | 'Formation animée pour'
  | 'Intervention déléguée'
  | 'Formatrice invitée'
  | 'Collaboration pédagogique';

export type PartenaireReferenceLogo = {
  src: string;
  alt: string;
  width: number;
  height: number;
  /** Classes Tailwind (ex. scale) — logos avec beaucoup de padding interne. */
  imageClassName?: string;
};

export type PartenaireReference = {
  id: string;
  name: string;
  shortName?: string;
  category: PartenaireOrganizationCategory;
  organizationType: PartenaireOrganizationType;
  relationshipLabel: PartenaireRelationshipLabel;
  logo: PartenaireReferenceLogo;
  officialUrl: string;
  interventionSummary: string;
  audiences: readonly string[];
  topics: readonly string[];
  deliveryModes: readonly string[];
  locations: readonly string[];
  proofUrl?: string;
  proofLabel?: string;
  featured?: boolean;
  displayOrder: number;
};

export const PARTENAIRES_REASSURANCE_ITEMS = [
  'Organisme certifié Qualiopi (actions de formation)',
  'Interventions en présentiel',
  'Spécialisation IA appliquée au BTP',
  'Travail sur des situations métier concrètes',
] as const;

export const PARTENAIRES_INTERVENTION_STEPS = [
  {
    n: '1',
    title: 'Cadrage avec l’organisme',
    text: 'Date, lieu, effectif et profils attendus — alignés sur le réseau ou l’entreprise commanditaire.',
  },
  {
    n: '2',
    title: 'Adaptation aux usages visés',
    text: 'Thèmes et exercices calibrés sur les profils (dirigeants, conducteurs de travaux, fonctions support, stagiaires).',
  },
  {
    n: '3',
    title: 'Animation de la formation',
    text: 'Session en présentiel en Île-de-France, atelier pratique avec relecture humaine des productions.',
  },
  {
    n: '4',
    title: 'Supports et ressources',
    text: 'Remise des supports prévus dans le programme et des trames réutilisables par les participants.',
  },
] as const;

export const PARTENAIRES_CADRE_TITLE = 'Nature des références présentées' as const;

export const PARTENAIRES_CADRE_TEXT =
  'Les organismes présentés ont confié à Laure Olivié des interventions ou formations. Sauf mention explicite, cette présentation ne constitue ni un agrément de l’ensemble du catalogue OFC, ni une exclusivité, ni une labellisation par ces organismes.' as const;

const DELIVERY = ['Présentiel'] as const;
const LOCATIONS = ['Île-de-France'] as const;

/** Références vérifiées — alignées sur `lib/partenaires-page-sections.tsx` et `lib/a-propos-partners-grid.ts`. */
export const PARTENAIRES_REFERENCES: readonly PartenaireReference[] = [
  {
    id: 'ffb-grand-paris',
    name: 'FFB Grand Paris',
    shortName: 'FFB Grand Paris',
    category: 'btp',
    organizationType: 'Fédération BTP',
    relationshipLabel: 'Formation animée pour',
    logo: {
      src: '/images/partenaires/logo-ffb-grand-paris-formation-idf.webp',
      alt: ALT_LOGO_FFB_GRAND_PARIS_IDF,
      width: 400,
      height: 120,
    },
    officialUrl: PARTNER_WEBSITES.ffbGrandParis,
    interventionSummary:
      'Formations IA déléguées pour des groupes d’adhérents : devis, DCE, mémoires techniques et comptes rendus, avec relecture humaine.',
    audiences: ['Dirigeants', 'Conducteurs de travaux', 'Fonctions support'],
    topics: ['Devis', 'DCE / mémoire technique', 'Comptes rendus'],
    deliveryModes: DELIVERY,
    locations: LOCATIONS,
    proofUrl: LINKS.etudesCasFfbCsfe,
    proofLabel: 'Voir l’étude de cas FFB & CSFE',
    featured: true,
    displayOrder: 1,
  },
  {
    id: 'ffb-idf-ouest',
    name: 'FFB Île-de-France Ouest',
    shortName: 'FFB IDF Ouest (78-91-95)',
    category: 'btp',
    organizationType: 'Fédération BTP',
    relationshipLabel: 'Intervention déléguée',
    logo: {
      src: '/images/partenaires/logo-ffb-partenaire-formation-ia-btp.webp',
      alt: ALT_LOGO_FFB_OFFICIEL,
      width: 200,
      height: 80,
    },
    officialUrl:
      'https://www.ffbatiment.fr/organisation-ffb/federations-regionales/ile-de-france-78-91-95',
    interventionSummary:
      'Sessions pour adhérents franciliens : usages IA de bureau (administratif, appels d’offres, suivi de chantier) sur leurs documents.',
    audiences: ['Adhérents TPE et PME du bâtiment'],
    topics: ['Administratif', 'Appels d’offres', 'Suivi de chantier'],
    deliveryModes: DELIVERY,
    locations: LOCATIONS,
    proofUrl: LINKS.etudesCasFfbCsfe,
    proofLabel: 'Voir l’étude de cas FFB & CSFE',
    displayOrder: 2,
  },
  {
    id: 'ffb-idf-est',
    name: 'FFB Île-de-France Est',
    category: 'btp',
    organizationType: 'Fédération BTP',
    relationshipLabel: 'Intervention déléguée',
    logo: {
      src: '/images/partenaires/logo-ffb-partenaire-formation-ia-btp.webp',
      alt: ALT_LOGO_FFB_OFFICIEL,
      width: 200,
      height: 80,
    },
    officialUrl:
      'https://www.ffbatiment.fr/organisation-ffb/federations-departementales-chambres-syndicales/ile-de-france-est',
    interventionSummary:
      'Formations IA pour adhérents de l’Est francilien : productivité de bureau et documents de marché, en atelier présentiel.',
    audiences: ['Adhérents du bâtiment'],
    topics: ['Devis', 'DCE', 'Rédaction professionnelle'],
    deliveryModes: DELIVERY,
    locations: LOCATIONS,
    proofUrl: LINKS.etudesCasFfbCsfe,
    proofLabel: 'Voir l’étude de cas FFB & CSFE',
    displayOrder: 3,
  },
  {
    id: 'ffb-artisans',
    name: 'FFB',
    category: 'btp',
    organizationType: 'Fédération BTP',
    relationshipLabel: 'Intervention déléguée',
    logo: {
      src: '/images/partenaires/logo-ffb-partenaire-formation-ia-btp.webp',
      alt: ALT_LOGO_FFB_OFFICIEL,
      width: 200,
      height: 80,
    },
    officialUrl: PARTNER_WEBSITES.ffb,
    interventionSummary:
      'Interventions IA pour des adhérents du bâtiment, dans le cadre de sessions convoquées par la fédération.',
    audiences: ['Dirigeants et équipes TPE'],
    topics: [],
    deliveryModes: DELIVERY,
    locations: LOCATIONS,
    displayOrder: 4,
  },
  {
    id: 'csfe',
    name: CSFE_NOM_COMPLET,
    shortName: 'CSFE',
    category: 'btp',
    organizationType: 'Syndicat professionnel',
    relationshipLabel: 'Formation animée pour',
    logo: {
      src: '/images/partenaires/logo-csfe-partenaire-formation-btp.webp',
      alt: ALT_LOGO_CSFE,
      width: 360,
      height: 120,
    },
    officialUrl: PARTNER_WEBSITES.csfe,
    interventionSummary:
      'Formations pour la filière étanchéité : lecture de CCTP, notes techniques, mémoires et comptes rendus — relecture humaine sur les référentiels.',
    audiences: ['Chefs d’entreprise étanchéité', 'Conducteurs de travaux', 'Chargés d’affaires'],
    topics: ['CCTP / DTU', 'Mémoire technique', 'Comptes rendus'],
    deliveryModes: DELIVERY,
    locations: LOCATIONS,
    proofUrl: LINKS.etudesCasFfbCsfe,
    proofLabel: 'Voir l’étude de cas FFB & CSFE',
    featured: true,
    displayOrder: 5,
  },
  {
    id: 'umb-ffb',
    name: UMB_FFB_NOM_LIBRE,
    shortName: 'UMB-FFB',
    category: 'btp',
    organizationType: 'Union de métiers',
    relationshipLabel: 'Formation animée pour',
    logo: {
      src: LOGO_UMB_FFB.src,
      alt: ALT_LOGO_UMB_FFB,
      width: LOGO_UMB_FFB.width,
      height: LOGO_UMB_FFB.height,
    },
    officialUrl: PARTNER_WEBSITES.umbFfb,
    interventionSummary:
      'Sessions pour la filière bois (charpente, menuiserie, agencement) : devis, documents de chantier et mails clients.',
    audiences: ['Dirigeants et équipes filière bois'],
    topics: ['Devis', 'Documents de chantier', 'Mails client'],
    deliveryModes: DELIVERY,
    locations: LOCATIONS,
    displayOrder: 6,
  },
  {
    id: 'ifrb-idf',
    name: 'IFRB — Institut de Formation Régional du Bâtiment',
    shortName: 'IFRB (78 · 91 · 95)',
    category: 'btp',
    organizationType: 'Institut de formation BTP',
    relationshipLabel: 'Intervention déléguée',
    logo: {
      src: '/images/partenaires/logo-ifrb-78-91-95-formation-batiment.webp',
      alt: ALT_LOGO_IFRB,
      width: 200,
      height: 80,
    },
    officialUrl: PARTNER_WEBSITES.ifrb,
    interventionSummary:
      'Formations IA pour stagiaires du bâtiment en Île-de-France : devis, administratif et documents de chantier, dans le cadre de l’institut.',
    audiences: ['Entreprises et salariés du bâtiment'],
    topics: ['Devis', 'Administratif', 'Documents de chantier'],
    deliveryModes: DELIVERY,
    locations: LOCATIONS,
    displayOrder: 7,
  },
  {
    id: 'arfab',
    name: 'ARFAB',
    category: 'btp',
    organizationType: 'Association de formation',
    relationshipLabel: 'Formation animée pour',
    logo: {
      src: '/images/partenaires/logo-arfab-partenaire-formation-btp.webp',
      alt: ALT_LOGO_ARFAB,
      width: 160,
      height: 64,
    },
    officialUrl: PARTNER_WEBSITES.arfab,
    interventionSummary:
      'Formations IA animées pour des professionnels du bâtiment via l’association ARFAB.',
    audiences: ['Professionnels du bâtiment'],
    topics: [],
    deliveryModes: DELIVERY,
    locations: LOCATIONS,
    displayOrder: 8,
  },
  {
    id: 'cnam-entreprise',
    name: 'CNAM Entreprise',
    category: 'autres',
    organizationType: 'Institut de formation',
    relationshipLabel: 'Formatrice invitée',
    logo: {
      src: '/images/partenaires/logo-cnam-formation-continue-ia-btp.webp',
      alt: ALT_LOGO_CNAM_ENTREPRISES,
      width: 220,
      height: 72,
    },
    officialUrl: PARTNER_WEBSITES.cnamIdf,
    interventionSummary:
      'Modules IA appliquée pour des stagiaires inscrits via le dispositif CNAM Entreprise en Île-de-France.',
    audiences: ['Stagiaires en formation continue', 'Fonctions support'],
    topics: ['Productivité de bureau', 'Rédaction', 'Cadres de prompts'],
    deliveryModes: DELIVERY,
    locations: LOCATIONS,
    displayOrder: 10,
  },
  {
    id: 'moniteur-formations',
    name: 'Le Moniteur Formations',
    shortName: 'Moniteur Formations',
    category: 'autres',
    organizationType: 'Institut de formation',
    relationshipLabel: 'Formatrice invitée',
    logo: {
      src: LOGO_MONITEUR_FORMATIONS.src,
      alt: ALT_LOGO_MONITEUR_FORMATIONS,
      width: LOGO_MONITEUR_FORMATIONS.width,
      height: LOGO_MONITEUR_FORMATIONS.height,
    },
    officialUrl: PARTNER_WEBSITES.moniteurFormations,
    interventionSummary:
      'Interventions IA orientées usages professionnels BTP : structuration de documents, prompts et relecture avant envoi.',
    audiences: ['Fonctions support', 'RH', 'Profils techniques et administratifs'],
    topics: ['Structuration document', 'Prompts', 'Relecture'],
    deliveryModes: DELIVERY,
    locations: LOCATIONS,
    displayOrder: 11,
  },
  {
    id: 'linkedin-learning',
    name: 'LinkedIn Learning',
    category: 'autres',
    organizationType: 'Plateforme de formation',
    relationshipLabel: 'Collaboration pédagogique',
    logo: {
      src: LOGO_LINKEDIN_LEARNING.src,
      alt: ALT_LOGO_LINKEDIN_LEARNING,
      width: LOGO_LINKEDIN_LEARNING.width,
      height: LOGO_LINKEDIN_LEARNING.height,
      imageClassName: 'max-h-[4.5rem] scale-[1.85]',
    },
    officialUrl: SCHEMA_LINKEDIN_LEARNING_INSTRUCTOR_URL,
    interventionSummary:
      'Instructrice LinkedIn Learning — deux cours en français sur l’IA appliquée au BTP et aux TPE (format en ligne, distinct du présentiel IDF).',
    audiences: ['Professionnels BTP', 'TPE'],
    topics: ['IA BTP', 'Productivité', 'Recrutement TPE'],
    deliveryModes: ['En ligne'],
    locations: ['France'],
    displayOrder: 12,
  },
] as const;

export function getPartenairesReferencesByCategory(
  category: PartenaireOrganizationCategory,
): PartenaireReference[] {
  return [...PARTENAIRES_REFERENCES]
    .filter((r) => r.category === category)
    .sort((a, b) => a.displayOrder - b.displayOrder);
}
