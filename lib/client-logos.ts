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
    id: 'ffb-grand-paris-idf',
    name: 'FFB Grand Paris Île-de-France',
    alt: 'FFB — Fédération française du bâtiment, Grand Paris Île-de-France',
    src: '/images/partenaires/ffb-grand-paris-ile-de-france.png',
    width: 400,
    height: 120,
  },
  {
    id: 'csfe',
    name: 'CSFE',
    alt: 'CSFE — Chambre syndicale française de l\'étanchéité, professionnels de l\'étanchéité',
    src: '/images/partenaires/csfe-logo.png',
    width: 360,
    height: 120,
  },
  {
    id: 'cnam',
    name: 'le CNAM entreprises',
    alt: 'le CNAM entreprises',
    src: '/images/partenaires/cnam-entreprises.png',
    width: 220,
    height: 72,
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
