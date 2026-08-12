/**
 * Partenaires — section « Ils me font confiance » (page À propos).
 * Logos : fichiers locaux dans /public/images/partenaires/ (droits des marques respectés).
 */

export type PartenaireInstitutionnel = {
  name: string;
  desc: string;
  href: string;
  logo: string;
};

export const PARTENAIRES_INSTITUTIONNELS: PartenaireInstitutionnel[] = [
  {
    name: 'FFB Grand Paris',
    desc: 'Fédération Française du Bâtiment',
    href: 'https://www.ffbatiment.fr/organisation-ffb/federations-regionales/grand-paris-idf',
    logo: '/images/partenaires/logo-ffb-partenaire-formation-ia-btp.webp',
  },
  {
    name: 'FFB Île-de-France Est',
    desc: 'Fédération Française du Bâtiment',
    href: 'https://www.ffbatiment.fr/organisation-ffb/federations-departementales-chambres-syndicales/ile-de-france-est',
    logo: '/images/partenaires/logo-ffb-partenaire-formation-ia-btp.webp',
  },
  {
    name: 'FFB Île-de-France Ouest',
    desc: 'Fédération Française du Bâtiment (78-91-95)',
    href: 'https://www.ffbatiment.fr/organisation-ffb/federations-regionales/ile-de-france-78-91-95',
    logo: '/images/partenaires/logo-ffb-partenaire-formation-ia-btp.webp',
  },
  {
    name: 'IFRB (77, 78, 91, 95)',
    desc: 'Institut de Formation Régional du Bâtiment — Île-de-France',
    href: 'https://www.ifrb-78-91-95.fr/',
    logo: '/images/partenaires/logo-ifrb-78-91-95-formation-batiment.webp',
  },
];
