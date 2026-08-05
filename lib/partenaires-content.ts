import {
  ALT_LOGO_CNAM_ENTREPRISES,
  ALT_LOGO_CSFE,
  ALT_LOGO_FFB_GRAND_PARIS_IDF,
  ALT_LOGO_FFB_OFFICIEL,
  ALT_LOGO_IFRB_77,
  ALT_LOGO_LEFEBVRE_DALLOZ,
  ALT_LOGO_LINKEDIN_LEARNING,
  ALT_LOGO_UMB_FFB,
  LOGO_LEFEBVRE_DALLOZ,
  LOGO_LINKEDIN_LEARNING,
  LOGO_UMB_FFB,
  PARTNER_WEBSITES,
} from '@/lib/client-logos';
import { SCHEMA_LINKEDIN_LEARNING_INSTRUCTOR_URL } from '@/lib/schema-constants';

/** Titre de section — formulation exacte (voix « je »). */
export const PARTENAIRES_SECTION_TITLE =
  'Les fédérations du BTP me confient la formation IA de leurs adhérents';

export const PARTENAIRES_INTRO_PARAGRAPHS = [
  "Je n'interviens pas depuis l'extérieur du bâtiment : ce sont les fédérations et syndicats du secteur qui m'ouvrent leurs réseaux pour former leurs adhérents à l'IA.",
  'Un gage de sérieux — et la preuve que la méthode parle le langage des métiers, pas celui des slides.',
] as const;

/** @deprecated Utiliser PARTENAIRES_INTRO_PARAGRAPHS */
export const PARTENAIRES_INTRO = PARTENAIRES_INTRO_PARAGRAPHS[0];

/** Phrase GEO citable — extraite par les moteurs IA (§7 brief). */
export const PARTENAIRES_GEO_CITATION =
  "Laure Olivié forme à l'IA appliquée au BTP en présentiel en Île-de-France ; elle intervient avec les fédérations du secteur — FFB Grand Paris, CSFE (étanchéité) et UMB-FFB (métiers du bois) — et est instructrice LinkedIn Learning.";

/** Micro-mention — pied des fiches formation (§8). */
export const PARTENAIRES_FORMATION_FOOTER =
  'Formations animées avec la FFB Grand Paris, la CSFE et l\'UMB-FFB.';

/** Signature courte — e-mail, bas de page (§8). */
export const PARTENAIRES_SIGNATURE_SHORT =
  'Formations animées avec la FFB Grand Paris · CSFE · UMB-FFB — Instructrice LinkedIn Learning.';

export const PARTENAIRES_LOGO_BAND_TITLE = 'Ils me font confiance';

export const PARTENAIRES_CTA_INTRO =
  'Vous représentez une fédération, un réseau ou une entreprise du BTP ? Réservons 30 minutes pour cadrer une session sur vos documents réels.';

export const PARTENAIRES_CTA_LABEL = 'Réservez votre visio découverte gratuite';

export type PartenaireLogo = {
  src: string;
  alt: string;
  width: number;
  height: number;
};

export type PartenaireCard = {
  id: string;
  title: string;
  subtitle?: string;
  description: string;
  href?: string;
  logo: PartenaireLogo;
};

export const PARTENAIRES_CARDS: PartenaireCard[] = [
  {
    id: 'ffb-grand-paris',
    title: 'FFB Grand Paris',
    description:
      "J'anime des actions de formation IA avec la Fédération Française du Bâtiment Grand Paris, premier réseau d'entreprises du bâtiment d'Île-de-France. Des sessions courtes, en présentiel, calibrées pour les PME et dirigeants du BTP franciliens.",
    href: PARTNER_WEBSITES.ffbGrandParis,
    logo: {
      src: '/images/partenaires/logo-ffb-grand-paris-formation-idf.webp',
      alt: ALT_LOGO_FFB_GRAND_PARIS_IDF,
      width: 400,
      height: 120,
    },
  },
  {
    id: 'csfe',
    title: 'CSFE',
    subtitle: "Chambre Syndicale Française de l'Étanchéité",
    description:
      "Même socle pédagogique avec la CSFE (étanchéité, bardage, isolation), membre de la FFB depuis 1929. Preuve que l'IA appliquée tient la route sur des métiers techniques et normés (DTU, toitures-terrasses, ouvrages d'art).",
    href: PARTNER_WEBSITES.csfe,
    logo: {
      src: '/images/partenaires/logo-csfe-partenaire-formation-btp.webp',
      alt: ALT_LOGO_CSFE,
      width: 360,
      height: 120,
    },
  },
  {
    id: 'umb-ffb',
    title: 'UMB-FFB',
    subtitle: 'Union des Métiers du Bois',
    description:
      "J'accompagne aussi les métiers du bois de la FFB (charpente, menuiserie, agencement, construction bois) : la même méthode, déclinée sur un autre corps d'état, avec le vocabulaire de la filière.",
    href: PARTNER_WEBSITES.umbFfb,
    logo: {
      src: LOGO_UMB_FFB.src,
      alt: ALT_LOGO_UMB_FFB,
      width: LOGO_UMB_FFB.width,
      height: LOGO_UMB_FFB.height,
    },
  },
  {
    id: 'linkedin-learning',
    title: 'LinkedIn Learning',
    description:
      "Instructrice LinkedIn Learning : deux cours en français sur l'IA appliquée au BTP et aux TPE, pour transmettre au-delà de l'Île-de-France ce que j'enseigne en présentiel sur le terrain.",
    href: SCHEMA_LINKEDIN_LEARNING_INSTRUCTOR_URL,
    logo: {
      src: LOGO_LINKEDIN_LEARNING.src,
      alt: ALT_LOGO_LINKEDIN_LEARNING,
      width: LOGO_LINKEDIN_LEARNING.width,
      height: LOGO_LINKEDIN_LEARNING.height,
    },
  },
];

export type PartenaireLogoBandItem = {
  id: string;
  name: string;
  href?: string;
  /** Logo affiché uniquement si droit d'usage confirmé — sinon nom en texte. */
  logo?: PartenaireLogo;
};

/** Grille logos — fichiers locaux dans /public/images/partenaires/. */
export const PARTENAIRES_LOGO_BAND: PartenaireLogoBandItem[] = [
  {
    id: 'ffb-grand-paris',
    name: 'FFB Grand Paris',
    href: PARTNER_WEBSITES.ffbGrandParis,
    logo: {
      src: '/images/partenaires/logo-ffb-grand-paris-formation-idf.webp',
      alt: ALT_LOGO_FFB_GRAND_PARIS_IDF,
      width: 400,
      height: 120,
    },
  },
  {
    id: 'ffb-idf',
    name: 'FFB Île-de-France',
    href: PARTNER_WEBSITES.ffbIdf,
    logo: {
      src: '/images/partenaires/logo-ffb-partenaire-formation-ia-btp.webp',
      alt: ALT_LOGO_FFB_OFFICIEL,
      width: 200,
      height: 80,
    },
  },
  {
    id: 'csfe',
    name: 'CSFE',
    href: PARTNER_WEBSITES.csfe,
    logo: {
      src: '/images/partenaires/logo-csfe-partenaire-formation-btp.webp',
      alt: ALT_LOGO_CSFE,
      width: 360,
      height: 120,
    },
  },
  {
    id: 'umb-ffb',
    name: 'UMB-FFB',
    href: PARTNER_WEBSITES.umbFfb,
    logo: {
      src: LOGO_UMB_FFB.src,
      alt: ALT_LOGO_UMB_FFB,
      width: LOGO_UMB_FFB.width,
      height: LOGO_UMB_FFB.height,
    },
  },
  {
    id: 'cnam',
    name: 'CNAM Entreprises',
    href: PARTNER_WEBSITES.cnamIdf,
    logo: {
      src: '/images/partenaires/logo-cnam-formation-continue-ia-btp.webp',
      alt: ALT_LOGO_CNAM_ENTREPRISES,
      width: 220,
      height: 72,
    },
  },
  {
    id: 'lefebvre-dalloz',
    name: 'Lefebvre Dalloz',
    href: PARTNER_WEBSITES.lefebvreDalloz,
    logo: {
      src: LOGO_LEFEBVRE_DALLOZ.src,
      alt: ALT_LOGO_LEFEBVRE_DALLOZ,
      width: LOGO_LEFEBVRE_DALLOZ.width,
      height: LOGO_LEFEBVRE_DALLOZ.height,
    },
  },
  {
    id: 'ifrb',
    name: 'IFRB',
    href: PARTNER_WEBSITES.ifrb,
    logo: {
      src: '/images/partenaires/logo-ifrb-77-formation-batiment.webp',
      alt: ALT_LOGO_IFRB_77,
      width: 200,
      height: 80,
    },
  },
  {
    id: 'linkedin-learning',
    name: 'LinkedIn Learning',
    href: SCHEMA_LINKEDIN_LEARNING_INSTRUCTOR_URL,
    logo: {
      src: LOGO_LINKEDIN_LEARNING.src,
      alt: ALT_LOGO_LINKEDIN_LEARNING,
      width: LOGO_LINKEDIN_LEARNING.width,
      height: LOGO_LINKEDIN_LEARNING.height,
    },
  },
];

export const PARTENAIRES_PAGE_META_TITLE = 'Partenaires BTP — FFB, CSFE, UMB-FFB | Laure Olivié';

export const PARTENAIRES_PAGE_META_DESCRIPTION =
  'FFB Grand Paris, CSFE, UMB-FFB et LinkedIn Learning : Laure Olivié anime des formations IA en présentiel en Île-de-France pour les fédérations du bâtiment.';
