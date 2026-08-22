/**
 * Configuration site OFC — source unique pour Header et Footer.
 * Les composants chrome (`components/Header`, `components/Footer`) n'importent
 * pas CONTACT, SCHEMA_CONTACT, LINKS ni SITE_CONFIG directement.
 */
import { CONTACT } from '@/lib/constants';
import { FORMATIONS_COUNT } from '@/data/formations';
import { TEACHIZY_PATHS } from '@/lib/external-site-urls';
import { HEADER_NAV } from '@/lib/header-nav';
import { LINKS } from '@/lib/internal-links';
import {
  NAV_ENTREPRISE,
  NAV_IDF,
  NAV_LEGAL,
  NAV_METIERS,
  NAV_REGLEMENTAIRE,
  NAV_RESSOURCES,
  NAV_SERVICES,
} from '@/lib/nav';
import { PHOTOS, SITE_LOGO_ALT, SITE_LOGO_TITLE } from '@/lib/photos';
import { QUALIOPI_LEGAL } from '@/lib/qualiopi-info';
import {
  SCHEMA_CONTACT,
  SCHEMA_GEO,
  SCHEMA_GOOGLE_BUSINESS_PROFILE_URL,
  SCHEMA_PUBLIC_SITE_URL,
} from '@/lib/schema-constants';
import { SITE_CONFIG } from '@/lib/seo';
import { PERIMETRE_FORMATIONS_COURT } from '@/lib/tarifs-sessions';

export const SITE = {
  name: 'Laure Olivié',
  tagline: 'Formatrice IA · BTP',
  legalName: QUALIOPI_LEGAL.raisonSociale,
  url: SCHEMA_PUBLIC_SITE_URL.replace(/\/$/, ''),
  displayUrl: 'www.laureolivie.fr',
  email: CONTACT.email,
  phone: CONTACT.phone,
  phoneDisplay: CONTACT.phoneDisplay,
  siret: SCHEMA_CONTACT.siretFormatted,
  nda: SCHEMA_CONTACT.nda,
  ndaMention: QUALIOPI_LEGAL.ndaExactMention,
  address: {
    street: SCHEMA_GEO.streetAddress,
    postalCode: SCHEMA_GEO.postalCode,
    locality: SCHEMA_GEO.addressLocality,
    full: CONTACT.address,
  },
  logo: {
    src: PHOTOS.siteAvatar.src,
    alt: SITE_LOGO_ALT,
    title: SITE_LOGO_TITLE,
    footerSrc: '/logo-lo.svg',
  },
  cta: {
    href: LINKS.prendreRdv,
    label: 'Réservez votre visio découverte gratuite',
  },
  platform: {
    loginHref: TEACHIZY_PATHS.login,
    connexionLabel: 'Connexion',
    connexionNavMobileLabel: 'Connexion plateforme',
    title: "Connexion à la plateforme de formation IA BTP — OFC Création d'Entreprise",
  },
  catalogue: {
    count: FORMATIONS_COUNT,
    range: 'NIV-01 à NIV-05',
  },
  perimeter: PERIMETRE_FORMATIONS_COURT,
  nav: {
    header: HEADER_NAV,
    footer: {
      entreprise: NAV_ENTREPRISE,
      services: NAV_SERVICES,
      ressources: NAV_RESSOURCES,
      reglementaire: NAV_REGLEMENTAIRE,
      legal: NAV_LEGAL,
      metiers: NAV_METIERS,
      idf: NAV_IDF,
    },
  },
  links: {
    home: LINKS.home,
    formations: LINKS.formations,
    skillConducteurTravaux: LINKS.skillIaConducteurTravaux,
    accessibiliteHandicap: LINKS.accessibiliteHandicap,
  },
  social: {
    linkedin: SITE_CONFIG.linkedinProfileUrl,
    googleBusiness: SCHEMA_GOOGLE_BUSINESS_PROFILE_URL,
    googleMaps: SITE_CONFIG.googleMapsUrl,
  },
  footer: {
    bannerTitle: 'Formations IA pour les pros du BTP & ChatGPT entreprise',
    bannerGuideLabel: 'Guide Conducteur de travaux — PDF gratuit →',
    bannerCatalogueLabel: 'Catalogue',
    brandDescription: 'IA pour PME du bâtiment et équipes BTP, méthode terrain.',
    exploreMetiersTitle: 'Formations IA par métier',
    exploreIdfTitle: 'Formations en Île-de-France',
    accessibiliteLabel:
      'Accessibilité handicap — informations complètes et adaptations possibles',
  },
} as const;
