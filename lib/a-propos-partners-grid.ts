import {
  ALT_LOGO_CNAM_ENTREPRISES,
  ALT_LOGO_CSFE,
  ALT_LOGO_FFB_OFFICIEL,
  ALT_LOGO_IFRB,
  ALT_LOGO_MONITEUR_FORMATIONS,
  ALT_LOGO_LINKEDIN_LEARNING,
  ALT_LOGO_ARFAB,
  ALT_LOGO_UMB_FFB,
  LOGO_MONITEUR_FORMATIONS,
  LOGO_LINKEDIN_LEARNING,
  LOGO_UMB_FFB,
  PARTNER_WEBSITES,
} from '@/lib/client-logos';
import { CSFE_NOM_COMPLET } from '@/lib/csfe';
import { SCHEMA_LINKEDIN_LEARNING_INSTRUCTOR_URL } from '@/lib/schema-constants';

export type AProposPartner = {
  name: string;
  subtitle: string;
  href: string;
  logo: string;
  alt?: string;
};

export const A_PROPOS_PARTNERS_FACTUAL_SENTENCE =
  "Laure Olivié a animé des formations IA pour les pros du BTP pour la FFB Grand Paris, la FFB Île-de-France Est, la FFB Île-de-France Ouest (78-91-95), la FFB, la Chambre Syndicale Française de l'Étanchéité (CSFE), le CNAM Entreprise, Le Moniteur Formations, l'IFRB 77 et ARFAB." as const;

export const A_PROPOS_PARTNERS_GRID: AProposPartner[] = [
  {
    name: 'FFB Grand Paris',
    subtitle: 'Fédération Française du Bâtiment',
    href: 'https://www.ffbatiment.fr/organisation-ffb/federations-regionales/grand-paris-idf',
    logo: '/images/partenaires/logo-ffb-partenaire-formation-ia-btp.webp',
    alt: ALT_LOGO_FFB_OFFICIEL,
  },
  {
    name: 'FFB Île-de-France Est',
    subtitle: 'Fédération Française du Bâtiment',
    href: 'https://www.ffbatiment.fr/organisation-ffb/federations-departementales-chambres-syndicales/ile-de-france-est',
    logo: '/images/partenaires/logo-ffb-partenaire-formation-ia-btp.webp',
    alt: ALT_LOGO_FFB_OFFICIEL,
  },
  {
    name: 'FFB Île-de-France Ouest',
    subtitle: 'Fédération Française du Bâtiment (78-91-95)',
    href: 'https://www.ffbatiment.fr/organisation-ffb/federations-regionales/ile-de-france-78-91-95',
    logo: '/images/partenaires/logo-ffb-partenaire-formation-ia-btp.webp',
    alt: ALT_LOGO_FFB_OFFICIEL,
  },
  {
    name: 'FFB',
    subtitle: 'Fédération Française du Bâtiment',
    href: 'https://www.ffbatiment.fr',
    logo: '/images/partenaires/logo-ffb-partenaire-formation-ia-btp.webp',
    alt: ALT_LOGO_FFB_OFFICIEL,
  },
  {
    name: CSFE_NOM_COMPLET,
    subtitle: 'Chambre syndicale — étanchéité',
    href: 'https://www.csfe.fr/',
    logo: '/images/partenaires/logo-csfe-partenaire-formation-btp.webp',
    alt: ALT_LOGO_CSFE,
  },
  {
    name: 'UMB-FFB',
    subtitle: 'Union des Métiers du Bois',
    href: PARTNER_WEBSITES.umbFfb,
    logo: LOGO_UMB_FFB.src,
    alt: ALT_LOGO_UMB_FFB,
  },
  {
    name: 'CNAM Entreprise',
    subtitle: 'Formation professionnelle',
    href: 'https://www.cnam-idf.fr/',
    logo: '/images/partenaires/logo-cnam-formation-continue-ia-btp.webp',
    alt: ALT_LOGO_CNAM_ENTREPRISES,
  },
  {
    name: 'Le Moniteur Formations',
    subtitle: 'Formations BTP et construction',
    href: PARTNER_WEBSITES.moniteurFormations,
    logo: LOGO_MONITEUR_FORMATIONS.src,
    alt: ALT_LOGO_MONITEUR_FORMATIONS,
  },
  {
    name: 'IFRB (77, 78, 91, 95)',
    subtitle: 'Institut de Formation Régional du Bâtiment — Île-de-France',
    href: 'https://www.ifrb-78-91-95.fr/',
    logo: '/images/partenaires/logo-ifrb-78-91-95-formation-batiment.webp',
    alt: ALT_LOGO_IFRB,
  },
  {
    name: 'ARFAB',
    subtitle: 'Association — formation BTP',
    href: 'https://www.arfab.fr/',
    logo: '/images/partenaires/logo-arfab-partenaire-formation-btp.webp',
    alt: ALT_LOGO_ARFAB,
  },
  {
    name: 'LinkedIn Learning',
    subtitle: 'Instructrice officielle — 2 cours IA BTP',
    href: SCHEMA_LINKEDIN_LEARNING_INSTRUCTOR_URL,
    logo: LOGO_LINKEDIN_LEARNING.src,
    alt: ALT_LOGO_LINKEDIN_LEARNING,
  },
];
