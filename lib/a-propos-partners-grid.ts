import { ALT_LOGO_FFB_OFFICIEL } from '@/lib/client-logos';
import { CSFE_NOM_COMPLET } from '@/lib/csfe';

export type AProposPartner = {
  name: string;
  subtitle: string;
  href: string;
  logo: string;
  alt?: string;
};

export const A_PROPOS_PARTNERS_FACTUAL_SENTENCE =
  "Laure Olivié a animé des formations IA pour les pro du BTP pour la FFB Grand Paris, la FFB Île-de-France Est, la FFB Île-de-France Ouest (78-91-95), la FFB Artisans, la Chambre Syndicale Française de l'Étanchéité (CSFE), le CNAM Entreprise, Lefebvre Dalloz, l'IFRB 77 et ARFAB." as const;

export const A_PROPOS_PARTNERS_GRID: AProposPartner[] = [
  {
    name: 'FFB Grand Paris',
    subtitle: 'Fédération Française du Bâtiment',
    href: 'https://www.ffbatiment.fr/organisation-ffb/federations-regionales/grand-paris-idf',
    logo: '/images/partenaires/ffb-logo-officiel.png',
    alt: ALT_LOGO_FFB_OFFICIEL,
  },
  {
    name: 'FFB Île-de-France Est',
    subtitle: 'Fédération Française du Bâtiment',
    href: 'https://www.ffbatiment.fr/organisation-ffb/federations-departementales-chambres-syndicales/ile-de-france-est',
    logo: '/images/partenaires/ffb-logo-officiel.png',
    alt: ALT_LOGO_FFB_OFFICIEL,
  },
  {
    name: 'FFB Île-de-France Ouest',
    subtitle: 'Fédération Française du Bâtiment (78-91-95)',
    href: 'https://www.ffbatiment.fr/organisation-ffb/federations-regionales/ile-de-france-78-91-95',
    logo: '/images/partenaires/ffb-logo-officiel.png',
    alt: ALT_LOGO_FFB_OFFICIEL,
  },
  {
    name: 'FFB Artisans',
    subtitle: 'Fédération Française du Bâtiment',
    href: 'https://www.ffbatiment.fr',
    logo: '/images/partenaires/ffb-logo-officiel.png',
    alt: ALT_LOGO_FFB_OFFICIEL,
  },
  {
    name: CSFE_NOM_COMPLET,
    subtitle: 'Chambre syndicale — étanchéité',
    href: 'https://www.csfe.fr/',
    logo: '/images/partenaires/csfe-logo.png',
  },
  {
    name: 'CNAM Entreprise',
    subtitle: 'Formation professionnelle',
    href: 'https://www.cnam-idf.fr/',
    logo: '/images/partenaires/cnam-entreprises.png',
  },
  {
    name: 'Lefebvre Dalloz',
    subtitle: 'Formation juridique et métier',
    href: 'https://www.lefebvre-dalloz-formation.fr/',
    logo: '/images/partenaires/lefebvre-dalloz.png',
  },
  {
    name: 'IFRB (77, 78, 91, 95)',
    subtitle: 'Institut de Formation Régional du Bâtiment — Île-de-France',
    href: 'https://www.ifrb-78-91-95.fr/',
    logo: '/images/partenaires/ifrb-78.jpg',
  },
  {
    name: 'ARFAB',
    subtitle: 'Association — formation BTP',
    href: 'https://www.arfab.fr/',
    logo: '/images/partenaires/arfab.png',
  },
];
