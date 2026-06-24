/**
 * JSON-LD LocalBusiness + Person — page /a-propos uniquement
 * (évite les doublons avec les scripts globaux du layout)
 */
import { PHOTOS } from '@/lib/photos';
import { formatProfessionalsTrainedCount, SOCIAL_PROOF } from '@/lib/constants';
import { getLaureOlivieSchemaPersonDescription } from '@/lib/laure-olivie-profile';
import {
  SCHEMA_CONTACT,
  SCHEMA_GEO,
  SCHEMA_OPENING_HOURS,
  SCHEMA_ORGANIZATION_OFC,
  SCHEMA_PUBLIC_SITE_URL,
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
    image: `${BASE}${PHOTOS.aProposHero2026.src}`,
    description: `Organisme de formation certifié Qualiopi spécialisé en intelligence artificielle pour les entreprises du bâtiment et des travaux publics. Formation IA appliquée au bâtiment — financement possible selon éligibilité. +${formatProfessionalsTrainedCount()} professionnels formés. Note ${SOCIAL_PROOF.AVERAGE_RATING}.`,
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
      'https://fr.linkedin.com/in/laure-olivie',
      'https://www.malt.fr/profile/laureoli',
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

/** Description courte Person / ProfilePage (≈150–200 car.) — alignée contenu page À propos. */
export const A_PROPOS_PROFILE_PERSON_DESCRIPTION = getLaureOlivieSchemaPersonDescription();

/**
 * @see https://schema.org/ProfilePage — page biographique /a-propos
 */
export function getAProposProfilePageJsonLd(): Record<string, unknown> {
  return {
    '@context': 'https://schema.org',
    '@type': 'ProfilePage',
    mainEntity: {
      '@type': 'Person',
      name: 'Laure Olivié',
      jobTitle: 'Formatrice IA pour les pro du BTP',
      description: A_PROPOS_PROFILE_PERSON_DESCRIPTION,
      url: `${BASE}/a-propos`,
    },
  };
}

/**
 * @see https://schema.org/Person — Laure Olivié (page /a-propos)
 * Injecté via `<Script type="application/ld+json" strategy="lazyOnload" />` pour différer le chargement.
 */
export const A_PROPOS_PERSON_SCRIPT_JSON_LD: Record<string, unknown> = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: 'Laure Olivié',
  jobTitle: 'Formatrice IA appliquée au bâtiment',
  description: A_PROPOS_PROFILE_PERSON_DESCRIPTION,
  url: `${BASE}/a-propos`,
  image: `${BASE}${PHOTOS.aProposHero2026.src}`,
  email: 'laureolivie@yahoo.fr',
  worksFor: {
    '@type': 'Organization',
    name: "OFC Création d'Entreprise",
    url: BASE,
    identifier: '905 244 281 00010',
  },
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'Guyancourt',
    postalCode: '78280',
    addressRegion: 'Île-de-France',
    addressCountry: 'FR',
  },
  sameAs: [
    'https://fr.linkedin.com/in/laure-olivie',
    'https://www.linkedin.com/learning/instructors/laure-olivie',
  ],
  alumniOf: {
    '@type': 'Organization',
    name: 'ALIA BTP',
    identifier: '85368731700018',
  },
  knowsAbout: [
    'Intelligence artificielle',
    'ChatGPT',
    'Claude AI',
    'Formation BTP',
    'Devis BTP',
    "Appels d'offres BTP",
    'Qualiopi',
  ],
  hasCredential: [
    {
      '@type': 'EducationalOccupationalCredential',
      name: 'Certification Qualiopi',
      credentialCategory: 'Certification',
      recognizedBy: {
        '@type': 'Organization',
        name: 'État français',
      },
    },
  ],
};
