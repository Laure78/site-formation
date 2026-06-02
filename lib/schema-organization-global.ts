import { formatProfessionalsTrainedCount } from '@/lib/constants';
import { PHOTOS } from '@/lib/photos';
import {
  SCHEMA_CONTACT,
  SCHEMA_GEO,
  SCHEMA_LINKEDIN_PROFILE_URL,
  SCHEMA_PUBLIC_SITE_URL,
} from '@/lib/schema-constants';

/**
 * JSON-LD `EducationalOrganization` — injecté une fois dans le layout racine (toutes les pages).
 * Aligné sur les NAP / preuves (`schema-constants`, `constants`).
 */
export function buildGlobalOrganizationEducationalJsonLd(): Record<string, unknown> {
  const base = SCHEMA_PUBLIC_SITE_URL.replace(/\/$/, '');

  return {
    '@context': 'https://schema.org',
    '@type': 'EducationalOrganization',
    '@id': `${base}/#organization`,
    name: "OFC Création d'Entreprise",
    alternateName: 'OFC',
    url: base,
    logo: `${base}/logo-lo.svg`,
    image: `${base}${PHOTOS.portraitPro2026.src}`,
    description:
      "Organisme de formation certifié Qualiopi spécialisé en intelligence artificielle pour le BTP. ChatGPT, Claude AI et IA générative pour les entreprises du bâtiment et des travaux publics.",
    address: {
      '@type': 'PostalAddress',
      streetAddress: SCHEMA_GEO.streetAddress,
      addressLocality: SCHEMA_GEO.addressLocality,
      addressRegion: SCHEMA_GEO.departement,
      postalCode: SCHEMA_GEO.postalCode,
      addressCountry: SCHEMA_GEO.addressCountry,
    },
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'Customer Support',
      telephone: SCHEMA_CONTACT.phone,
      email: SCHEMA_CONTACT.email,
    },
    telephone: SCHEMA_CONTACT.phone,
    email: SCHEMA_CONTACT.email,
    founder: {
      '@type': 'Person',
      name: 'Laure Olivié',
      jobTitle: 'Formatrice IA & ChatGPT Spécialisée BTP',
      url: `${base}/a-propos`,
      sameAs: [SCHEMA_LINKEDIN_PROFILE_URL],
    },
    areaServed: [
      { '@type': 'AdministrativeArea', name: 'Île-de-France' },
      { '@type': 'Country', name: 'France' },
    ],
    knowsAbout: [
      'Intelligence Artificielle',
      'ChatGPT',
      'Formation Professionnelle',
      'Formation IA',
      'ChatGPT BTP',
      'Claude AI',
      'Intelligence artificielle générative',
      'Construction',
      'Bâtiment',
      'Travaux publics',
      'Devis BTP',
      "Appels d'offres BTP",
      'Mémoire technique',
      'DCE',
      'CCTP',
      'Constructys',
    ],
    hasCredential: {
      '@type': 'EducationalOccupationalCredential',
      credentialCategory: 'Certification Qualiopi',
      url: 'https://annuaire-entreprises.data.gouv.fr/labels-certificats/905244281',
    },
    certifications: ['Qualiopi (NDA 11788515078)'],
    sameAs: [
      SCHEMA_LINKEDIN_PROFILE_URL,
      'https://www.linkedin.com/company/ofc-creation-entreprise',
      'https://www.facebook.com/ofc.creation',
      'https://annuaire-entreprises.data.gouv.fr/entreprise/ofc-creation-d-entreprise-905244281',
    ],
    vatID: 'FR905244281',
    taxID: '905244281',
    iso6523Code: '0009:90524428100010',
    // Conserve le signal social proof existant dans l'entité globale.
    award: `Certification Qualiopi · ${formatProfessionalsTrainedCount()} professionnels formés`,
  };
}
