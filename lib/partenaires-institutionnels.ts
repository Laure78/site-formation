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
    logo: '/images/partenaires/ffb-logo-officiel.png',
  },
  {
    name: 'FFB Île-de-France Est',
    desc: 'Fédération Française du Bâtiment',
    href: 'https://www.ffbatiment.fr/organisation-ffb/federations-departementales-chambres-syndicales/ile-de-france-est',
    logo: '/images/partenaires/ffb-logo-officiel.png',
  },
  {
    name: 'FFB Île-de-France Ouest',
    desc: 'Fédération Française du Bâtiment (78-91-95)',
    href: 'https://www.ffbatiment.fr/organisation-ffb/federations-regionales/ile-de-france-78-91-95',
    logo: '/images/partenaires/ffb-logo-officiel.png',
  },
  {
    name: 'IFRB 78',
    desc: 'Institut de Formation Régional du Bâtiment',
    href: 'https://www.ifrb-78-91-95.fr/',
    logo: '/images/partenaires/ifrb-78.jpg',
  },
  {
    name: 'GERESO',
    desc: 'Organisme de formation professionnelle',
    href: 'https://www.gereso.com/',
    logo: '/images/partenaires/gereso.svg',
  },
  {
    name: 'Lefebvre Dalloz',
    desc: 'Formations juridiques et professionnelles',
    href: 'https://formation.lefebvre-dalloz.fr/',
    logo: '/images/partenaires/lefebvre-dalloz.png',
  },
  {
    name: 'CNAM Entreprise',
    desc: 'Conservatoire National des Arts et Métiers',
    href: 'https://formation-entreprise.cnam.fr/',
    logo: '/images/partenaires/cnam-entreprise.svg',
  },
  {
    name: 'ARFAB',
    desc: 'Association de formation pour les artisans du bâtiment',
    href: 'https://www.arfab-formation.fr/',
    logo: '/images/partenaires/arfab.png',
  },
];
