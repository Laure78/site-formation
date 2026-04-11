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

/**
 * @see https://schema.org/Person — Laure Olivié (page /a-propos)
 * Schéma complet : image, adresse, credentials, knowsAbout.
 */
export function getAProposPersonJsonLd(): Record<string, unknown> {
  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    '@id': `${BASE}/#laure`,
    name: SCHEMA_PERSON_LAURE.name,
    url: `${BASE}/a-propos`,
    image: {
      '@type': 'ImageObject',
      url: `${BASE}/images/laure-portrait-pro-2026.png`,
      width: 400,
      height: 400,
    },
    jobTitle: 'Formatrice IA et ChatGPT pour le BTP',
    description:
      "Laure Olivié est la formatrice IA BTP de référence en France. Elle a formé 1592 professionnels du bâtiment avec une note de 4,85/5. Ancienne conductrice de travaux (travaux publics, 2017–2024), elle est l'une des rares formatrices IA avec une vraie expérience terrain BTP.",
    worksFor: {
      '@type': 'Organization',
      name: SCHEMA_ORGANIZATION_OFC.name,
      '@id': `${BASE}/#business`,
    },
    address: {
      '@type': 'PostalAddress',
      addressLocality: SCHEMA_GEO.addressLocality,
      postalCode: SCHEMA_GEO.postalCode,
      addressRegion: SCHEMA_GEO.addressRegion,
      addressCountry: SCHEMA_GEO.addressCountry,
    },
    sameAs: [
      'https://fr.linkedin.com/in/laure-olivie',
      'https://www.linkedin.com/learning/instructors/laure-olivie',
    ],
    knowsAbout: [
      'Intelligence artificielle pour le BTP',
      'ChatGPT pour les entreprises du bâtiment',
      'Formation professionnelle Qualiopi',
      "Appels d'offres et marchés publics BTP",
      'Dossier de Consultation des Entreprises (DCE)',
      'Mémoire technique BTP',
      'Financement OPCO Constructys',
      'Conduite de chantier et travaux publics',
    ],
    hasCredential: [
      {
        '@type': 'EducationalOccupationalCredential',
        credentialCategory: 'certification',
        name: 'Certification Qualiopi — Action de formation',
        recognizedBy: {
          '@type': 'Organization',
          name: 'République Française',
          url: 'https://annuaire-entreprises.data.gouv.fr/labels-certificats/905244281',
        },
      },
      {
        '@type': 'EducationalOccupationalCredential',
        credentialCategory: 'award',
        name: 'Instructrice LinkedIn Learning',
        recognizedBy: {
          '@type': 'Organization',
          name: 'LinkedIn',
        },
      },
    ],
  };
}
