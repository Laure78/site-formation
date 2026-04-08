/**
 * Logos clients — banderole page d'accueil (fichiers dans /public/images/partenaires).
 */
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
    alt: 'FFB — Fédération française du bâtiment, Île-de-France',
    src: '/images/partenaires/ffb-logo-officiel.png',
    width: 200,
    height: 80,
    caption: 'FFB · Île-de-France',
  },
  {
    id: 'ffb-artisan',
    name: 'FFB Artisan',
    alt: 'FFB Artisan',
    src: '/images/partenaires/ffb-logo-officiel.png',
    width: 200,
    height: 80,
    caption: 'FFB Artisan',
  },
  {
    id: 'ffb-gp-csfe',
    name: 'FFB Grand Paris CSFE',
    alt: 'FFB Grand Paris et CSFE',
    src: '/images/partenaires/ffb-logo-officiel.png',
    width: 200,
    height: 80,
    caption: 'FFB Grand Paris · CSFE',
  },
  {
    id: 'cnam',
    name: 'CNAM Entreprise',
    alt: 'CNAM Entreprise',
    src: '/images/partenaires/cnam-entreprise.svg',
    width: 180,
    height: 48,
  },
  {
    id: 'lefebvre-dalloz',
    name: 'Lefebvre Dalloz Compétences',
    alt: 'Lefebvre Dalloz Compétences',
    src: '/images/partenaires/lefebvre-dalloz.png',
    width: 200,
    height: 56,
    caption: 'Lefebvre Dalloz Compétences',
  },
  {
    id: 'arfab',
    name: 'ARFAB',
    alt: 'ARFAB',
    src: '/images/partenaires/arfab.png',
    width: 160,
    height: 64,
  },
  {
    id: 'ifrb',
    name: 'IFRB 77',
    alt: 'IFRB 77',
    src: '/images/partenaires/ifrb-78.jpg',
    width: 200,
    height: 80,
    caption: 'IFRB 77',
  },
];
