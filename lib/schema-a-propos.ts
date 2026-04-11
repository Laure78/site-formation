/**
 * JSON-LD LocalBusiness + Person — page /a-propos uniquement
 * (évite les doublons avec les scripts globaux du layout)
 */
import {
  SCHEMA_CONTACT,
  SCHEMA_GEO,
  SCHEMA_OPENING_HOURS,
  SCHEMA_ORGANIZATION_OFC,
  SCHEMA_PUBLIC_SITE_URL,
  SCHEMA_PERSON_LAURE,
} from '@/lib/schema-constants';

const BASE = SCHEMA_PUBLIC_SITE_URL.replace(/\/$/, '');

/** @see https://schema.org/LocalBusiness — données alignées fiche « À propos » */
export function getAProposLocalBusinessJsonLd(): Record<string, unknown> {
  return {
    '@context': 'https://schema.org',
    '@type': ['LocalBusiness', 'EducationalOrganization'],
    '@id': `${BASE}/a-propos#ofc-local-business`,
    name: SCHEMA_ORGANIZATION_OFC.name,
    legalName: SCHEMA_ORGANIZATION_OFC.legalName,
    url: BASE,
    logo: `${BASE}/logo-lo.svg`,
    image: `${BASE}/images/laure-portrait-pro-2026.png`,
    description:
      'Organisme de formation certifié Qualiopi spécialisé en intelligence artificielle pour les entreprises du bâtiment et des travaux publics. Formation IA BTP finançable Constructys. +1 592 professionnels formés. Note 4,85/5.',
    email: SCHEMA_CONTACT.email,
    address: {
      '@type': 'PostalAddress',
      streetAddress: SCHEMA_GEO.streetAddress,
      addressLocality: SCHEMA_GEO.addressLocality,
      postalCode: SCHEMA_GEO.postalCode,
      addressCountry: SCHEMA_GEO.addressCountry,
      addressRegion: SCHEMA_GEO.addressRegion,
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: SCHEMA_GEO.latitude,
      longitude: SCHEMA_GEO.longitude,
    },
    areaServed: [
      'Île-de-France',
      'Paris',
      'Yvelines',
      'Hauts-de-Seine',
      'Seine-et-Marne',
      'Val-de-Marne',
      'Seine-Saint-Denis',
      "Val-d'Oise",
      'Essonne',
    ],
    priceRange: '€€',
    currenciesAccepted: 'EUR',
    openingHours: SCHEMA_OPENING_HOURS,
    sameAs: [
      'https://www.linkedin.com/in/laure-olivie',
      'https://annuaire-entreprises.data.gouv.fr/entreprise/905244281',
    ],
    hasCredential: {
      '@type': 'EducationalOccupationalCredential',
      name: 'Certification Qualiopi',
      credentialCategory: 'certification',
      recognizedBy: {
        '@type': 'Organization',
        name: 'Ministère du Travail',
      },
    },
    taxID: SCHEMA_CONTACT.siretFormatted,
    vatID: SCHEMA_CONTACT.vatId,
  };
}

/** @see https://schema.org/Person — Laure Olivié */
export function getAProposPersonJsonLd(): Record<string, unknown> {
  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    '@id': `${BASE}/a-propos#laure-olivie`,
    name: SCHEMA_PERSON_LAURE.name,
    jobTitle: SCHEMA_PERSON_LAURE.jobTitle,
    worksFor: {
      '@type': 'Organization',
      '@id': `${BASE}/a-propos#ofc-local-business`,
      name: SCHEMA_ORGANIZATION_OFC.name,
    },
    url: BASE,
    sameAs: [
      'https://www.linkedin.com/in/laure-olivie',
      'https://fr.linkedin.com/learning/instructors/laure-olivie',
    ],
    knowsAbout: [
      'Intelligence artificielle',
      'ChatGPT',
      'Formation BTP',
      'Bâtiment',
      'Travaux publics',
      'Qualiopi',
    ],
  };
}
