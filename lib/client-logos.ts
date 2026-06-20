/**
 * Logos clients — banderole page d'accueil (fichiers dans /public/images/partenaires).
 *
 * Alts canoniques (SEO) — réutiliser partout où le même fichier apparaît.
 */
export const ALT_LOGO_FFB_OFFICIEL =
  'Logo FFB — Fédération Française du Bâtiment, partenaire formations intelligence artificielle BTP en Île-de-France' as const;
export const ALT_LOGO_FFB_ARTISAN =
  'Logo FFB Artisan — réseau artisans du bâtiment, partenaire formations IA et ChatGPT pour les pros du BTP' as const;
export const ALT_LOGO_FFB_GRAND_PARIS_IDF =
  'Logo FFB Grand Paris Île-de-France — partenaire sessions formation IA appliquée au bâtiment et travaux publics' as const;
export const ALT_LOGO_CSFE =
  "Logo CSFE — Chambre Syndicale Française de l'Étanchéité, partenaire formation IA appliquée au bâtiment et étanchéité" as const;
export const ALT_LOGO_CNAM_ENTREPRISES =
  'Logo CNAM entreprises Île-de-France — partenaire formation continue intelligence artificielle pour le secteur BTP' as const;
export const ALT_LOGO_ARFAB =
  'Logo ARFAB — association régionale formation artisans du bâtiment, partenaire formations IA bâtiment Laure Olivié' as const;
export const ALT_LOGO_IFRB_77 =
  'Logo IFRB 77 — Institut Formation Régional du Bâtiment Yvelines, partenaire formations IA pour les pros du BTP' as const;

export type ClientLogoItem = {
  id: string;
  name: string;
  alt: string;
  src: string;
  width: number;
  height: number;
  /** Affiché sous le logo si besoin (ex. plusieurs entrées FFB avec le même visuel). */
  caption?: string;
};

export const CLIENT_LOGOS_MARQUEE: ClientLogoItem[] = [
  {
    id: 'ffb-idf',
    name: 'FFB Île-de-France',
    alt: ALT_LOGO_FFB_OFFICIEL,
    src: '/images/partenaires/logo-ffb-partenaire-formation-ia-btp.webp',
    width: 200,
    height: 80,
    caption: 'FFB · Île-de-France',
  },
  {
    id: 'ffb-artisan',
    name: 'FFB Artisan',
    alt: ALT_LOGO_FFB_ARTISAN,
    src: '/images/partenaires/logo-ffb-partenaire-formation-ia-btp.webp',
    width: 200,
    height: 80,
    caption: 'FFB Artisan',
  },
  {
    id: 'ffb-grand-paris-idf',
    name: 'FFB Grand Paris Île-de-France',
    alt: ALT_LOGO_FFB_GRAND_PARIS_IDF,
    src: '/images/partenaires/logo-ffb-grand-paris-formation-idf.webp',
    width: 400,
    height: 120,
  },
  {
    id: 'csfe',
    name: 'CSFE',
    alt: ALT_LOGO_CSFE,
    src: '/images/partenaires/logo-csfe-partenaire-formation-btp.webp',
    width: 360,
    height: 120,
  },
  {
    id: 'cnam',
    name: 'le CNAM entreprises',
    alt: ALT_LOGO_CNAM_ENTREPRISES,
    src: '/images/partenaires/logo-cnam-formation-continue-ia-btp.webp',
    width: 220,
    height: 72,
  },
  {
    id: 'arfab',
    name: 'ARFAB',
    alt: ALT_LOGO_ARFAB,
    src: '/images/partenaires/logo-arfab-partenaire-formation-btp.webp',
    width: 160,
    height: 64,
  },
  {
    id: 'ifrb',
    name: 'IFRB 77',
    alt: ALT_LOGO_IFRB_77,
    src: '/images/partenaires/logo-ifrb-77-formation-batiment.webp',
    width: 200,
    height: 80,
    caption: 'IFRB 77',
  },
];
