/**
 * Logos clients — banderole page d'accueil (fichiers dans /public/images/partenaires).
 *
 * Alts canoniques (SEO) — réutiliser partout où le même fichier apparaît.
 */
export const ALT_LOGO_FFB_OFFICIEL =
  'Logo FFB — Fédération Française du Bâtiment, partenaire formation IA BTP Île-de-France' as const;
export const ALT_LOGO_FFB_GRAND_PARIS_IDF =
  'Logo FFB Grand Paris Île-de-France — partenaire sessions formation IA artisans BTP' as const;
export const ALT_LOGO_CSFE =
  "Logo CSFE — Chambre Syndicale Française de l'Étanchéité, partenaire formation IA BTP" as const;
export const ALT_LOGO_CNAM_ENTREPRISES =
  'Logo CNAM Île-de-France entreprises — partenaire formation continue IA BTP' as const;

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
    src: '/images/partenaires/ffb-logo-officiel.png',
    width: 200,
    height: 80,
    caption: 'FFB · Île-de-France',
  },
  {
    id: 'ffb-artisan',
    name: 'FFB Artisan',
    alt: ALT_LOGO_FFB_OFFICIEL,
    src: '/images/partenaires/ffb-logo-officiel.png',
    width: 200,
    height: 80,
    caption: 'FFB Artisan',
  },
  {
    id: 'ffb-grand-paris-idf',
    name: 'FFB Grand Paris Île-de-France',
    alt: ALT_LOGO_FFB_GRAND_PARIS_IDF,
    src: '/images/partenaires/ffb-grand-paris-ile-de-france.png',
    width: 400,
    height: 120,
  },
  {
    id: 'csfe',
    name: 'CSFE',
    alt: ALT_LOGO_CSFE,
    src: '/images/partenaires/csfe-logo.png',
    width: 360,
    height: 120,
  },
  {
    id: 'cnam',
    name: 'le CNAM entreprises',
    alt: ALT_LOGO_CNAM_ENTREPRISES,
    src: '/images/partenaires/cnam-entreprises.png',
    width: 220,
    height: 72,
  },
  {
    id: 'arfab',
    name: 'ARFAB',
    alt: 'Logo ARFAB — partenaire formation IA bâtiment',
    src: '/images/partenaires/arfab.png',
    width: 160,
    height: 64,
  },
  {
    id: 'ifrb',
    name: 'IFRB 77',
    alt: 'Logo IFRB 77 — Institut de Formation Régional du Bâtiment, partenaire 77',
    src: '/images/partenaires/ifrb-78.jpg',
    width: 200,
    height: 80,
    caption: 'IFRB 77',
  },
];
