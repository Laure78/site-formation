/**
 * Logos clients — banderole page d'accueil (fichiers dans /public/images/partenaires).
 *
 * Alts canoniques (SEO) — un alt unique par fichier logo, ≤ 125 car., 1 mot-clé contextuel max.
 * Format : « Logo [Organisation] — [contexte court] ».
 */
export const ALT_LOGO_FFB_OFFICIEL =
  'Logo FFB — Fédération Française du Bâtiment' as const;
/** Même fichier que `ALT_LOGO_FFB_OFFICIEL` → même alt (règle : 1 fichier = 1 alt). */
export const ALT_LOGO_FFB_ARTISAN = ALT_LOGO_FFB_OFFICIEL;
export const ALT_LOGO_FFB_GRAND_PARIS_IDF =
  'Logo FFB Grand Paris — fédération du bâtiment Île-de-France' as const;
export const ALT_LOGO_CSFE =
  "Logo CSFE — Chambre Syndicale Française de l'Étanchéité" as const;
export const ALT_LOGO_UMB_FFB =
  'Logo UMB-FFB — Union des Métiers du Bois' as const;

/** Logo officiel UMB-FFB (Union des Métiers du Bois). */
export const LOGO_UMB_FFB = {
  src: '/images/partenaires/logo-umb-ffb-metiers-du-bois.webp',
  alt: ALT_LOGO_UMB_FFB,
  width: 1024,
  height: 480,
} as const;

export const ALT_LOGO_LINKEDIN_LEARNING = 'Logo LinkedIn Learning' as const;

/** Logo officiel LinkedIn Learning (bandeaux partenaires, EEAT, hubs). */
export const LOGO_LINKEDIN_LEARNING = {
  src: '/images/partenaires/logo-linkedin-learning.webp',
  alt: ALT_LOGO_LINKEDIN_LEARNING,
  width: 600,
  height: 600,
} as const;
export const ALT_LOGO_CNAM_ENTREPRISES = 'Logo CNAM Entreprises' as const;
export const ALT_LOGO_LEFEBVRE_DALLOZ = 'Logo Lefebvre Dalloz Formation' as const;
export const ALT_LOGO_ARFAB = 'Logo ARFAB — formation artisans du bâtiment' as const;
export const ALT_LOGO_IFRB =
  "Logo IFRB — Institut de Formation Régional du Bâtiment Yvelines, Essonne, Val-d'Oise" as const;
/** @deprecated Alias — préférer `ALT_LOGO_IFRB`. */
export const ALT_LOGO_IFRB_77 = ALT_LOGO_IFRB;

/** Logo Lefebvre Dalloz Formation. */
export const LOGO_LEFEBVRE_DALLOZ = {
  src: '/images/partenaires/logo-lefebvre-dalloz-partenaire-formation-ia-btp.webp',
  alt: ALT_LOGO_LEFEBVRE_DALLOZ,
  width: 293,
  height: 60,
} as const;

export type ClientLogoItem = {
  id: string;
  name: string;
  alt: string;
  src: string;
  width: number;
  height: number;
  /** Site officiel du partenaire — lien externe sur le logo. */
  href: string;
  /** Infobulle au survol (accessibilité). */
  linkTitle?: string;
  /** Affiché sous le logo si besoin (ex. plusieurs entrées FFB avec le même visuel). */
  caption?: string;
};

/** URLs officielles des partenaires — source unique pour bandeaux et grilles logos. */
export const PARTNER_WEBSITES = {
  ffbGrandParis: 'https://www.ffbatiment.fr/organisation-ffb/federations-regionales/grand-paris-idf',
  ffbIdf: 'https://www.ffbatiment.fr/federations/ile-de-france',
  ffb: 'https://www.ffbatiment.fr',
  csfe: 'https://www.csfe.fr/',
  cnamIdf: 'https://www.cnam-idf.fr/',
  lefebvreDalloz: 'https://www.lefebvre-dalloz-formation.fr/',
  umbFfb: 'https://www.ffbatiment.fr/organisation-ffb/unions-syndicats-metier/umb-ffb',
  ifrb: 'https://www.ifrb-78-91-95.fr/',
  arfab: 'https://www.arfab.fr/',
  linkedinLearning: 'https://www.linkedin.com/learning/',
} as const;

export const CLIENT_LOGOS_MARQUEE: ClientLogoItem[] = [
  {
    id: 'ffb-idf',
    name: 'FFB Île-de-France',
    alt: ALT_LOGO_FFB_OFFICIEL,
    src: '/images/partenaires/logo-ffb-partenaire-formation-ia-btp.webp',
    width: 200,
    height: 80,
    href: PARTNER_WEBSITES.ffbIdf,
    linkTitle: 'Site officiel FFB Île-de-France',
    caption: 'FFB · Île-de-France',
  },
  {
    id: 'ffb-artisan',
    name: 'FFB Artisan',
    alt: ALT_LOGO_FFB_OFFICIEL,
    src: '/images/partenaires/logo-ffb-partenaire-formation-ia-btp.webp',
    width: 200,
    height: 80,
    href: PARTNER_WEBSITES.ffb,
    linkTitle: 'Site officiel FFB — Fédération Française du Bâtiment',
    caption: 'FFB Artisan',
  },
  {
    id: 'ffb-grand-paris-idf',
    name: 'FFB Grand Paris Île-de-France',
    alt: ALT_LOGO_FFB_GRAND_PARIS_IDF,
    src: '/images/partenaires/logo-ffb-grand-paris-formation-idf.webp',
    width: 400,
    height: 120,
    href: PARTNER_WEBSITES.ffbGrandParis,
    linkTitle: 'Site officiel FFB Grand Paris Île-de-France',
  },
  {
    id: 'csfe',
    name: 'CSFE',
    alt: ALT_LOGO_CSFE,
    src: '/images/partenaires/logo-csfe-partenaire-formation-btp.webp',
    width: 360,
    height: 120,
    href: PARTNER_WEBSITES.csfe,
    linkTitle: 'Site officiel CSFE — Chambre Syndicale Française de l’Étanchéité',
  },
  {
    id: 'umb-ffb',
    name: 'UMB-FFB',
    alt: ALT_LOGO_UMB_FFB,
    src: LOGO_UMB_FFB.src,
    width: LOGO_UMB_FFB.width,
    height: LOGO_UMB_FFB.height,
    href: PARTNER_WEBSITES.umbFfb,
    linkTitle: 'Site officiel UMB-FFB — Union des Métiers du Bois',
  },
  {
    id: 'cnam',
    name: 'le CNAM entreprises',
    alt: ALT_LOGO_CNAM_ENTREPRISES,
    src: '/images/partenaires/logo-cnam-formation-continue-ia-btp.webp',
    width: 220,
    height: 72,
    href: PARTNER_WEBSITES.cnamIdf,
    linkTitle: 'Site officiel CNAM entreprises Île-de-France',
  },
  {
    id: 'arfab',
    name: 'ARFAB',
    alt: ALT_LOGO_ARFAB,
    src: '/images/partenaires/logo-arfab-partenaire-formation-btp.webp',
    width: 160,
    height: 64,
    href: PARTNER_WEBSITES.arfab,
    linkTitle: 'Site officiel ARFAB — formation artisans du bâtiment',
  },
  {
    id: 'ifrb',
    name: 'IFRB',
    alt: ALT_LOGO_IFRB,
    src: '/images/partenaires/logo-ifrb-78-91-95-formation-batiment.webp',
    width: 200,
    height: 80,
    href: PARTNER_WEBSITES.ifrb,
    linkTitle: 'Site officiel IFRB — Institut de Formation Régional du Bâtiment',
    caption: 'IFRB 78 · 91 · 95',
  },
  {
    id: 'linkedin-learning',
    name: 'LinkedIn Learning',
    alt: ALT_LOGO_LINKEDIN_LEARNING,
    src: LOGO_LINKEDIN_LEARNING.src,
    width: LOGO_LINKEDIN_LEARNING.width,
    height: LOGO_LINKEDIN_LEARNING.height,
    href: PARTNER_WEBSITES.linkedinLearning,
    linkTitle: 'LinkedIn Learning — cours IA de Laure Olivié',
  },
];
