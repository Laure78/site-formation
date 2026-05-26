/**
 * JSON-LD @graph Organization — Person détaillé sur /a-propos uniquement
 * (lib/schema-a-propos.ts) pour éviter les doublons Person / LocalBusiness.
 */
import {
  SCHEMA_CONTACT,
  SCHEMA_GEO,
  SCHEMA_LINKEDIN_PROFILE_URL,
  SCHEMA_ORGANIZATION_OFC,
  SCHEMA_PERSON_LAURE,
  SCHEMA_PUBLIC_SITE_URL,
} from '@/lib/schema-constants';
import { SITE_CONFIG, siteHasPublicPhone } from '@/lib/seo';

export function getSchemaPersonOrganization() {
  const base = SCHEMA_PUBLIC_SITE_URL.replace(/\/$/, '');

  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Organization',
        '@id': `${base}/#ofc`,
        name: SCHEMA_ORGANIZATION_OFC.name,
        legalName: SCHEMA_ORGANIZATION_OFC.legalNameSasu,
        url: base,
        logo: `${base}/logo-lo.svg`,
        description: SCHEMA_ORGANIZATION_OFC.descriptionShortGraph,
        foundingDate: SCHEMA_ORGANIZATION_OFC.foundingYear,
        founder: {
          '@type': 'Person',
          name: SCHEMA_PERSON_LAURE.name,
          url: `${base}/a-propos`,
        },
        address: {
          '@type': 'PostalAddress',
          streetAddress: SCHEMA_GEO.streetAddress,
          addressLocality: SCHEMA_GEO.addressLocality,
          addressRegion: SCHEMA_GEO.addressRegion,
          postalCode: SCHEMA_GEO.postalCode,
          addressCountry: SCHEMA_GEO.addressCountry,
        },
        contactPoint: {
          '@type': 'ContactPoint',
          ...(siteHasPublicPhone() ? { telephone: SITE_CONFIG.phone } : {}),
          email: SCHEMA_CONTACT.email,
          contactType: 'customer service',
          availableLanguage: 'French',
        },
        identifier: [
          {
            '@type': 'PropertyValue',
            name: 'SIRET',
            value: SCHEMA_CONTACT.siretFormatted,
          },
          {
            '@type': 'PropertyValue',
            name: 'NDA',
            value: SCHEMA_CONTACT.nda,
          },
        ],
        hasCredential: {
          '@type': 'EducationalOccupationalCredential',
          name: 'Qualiopi',
          credentialCategory: 'Certification qualité organisme de formation',
        },
        areaServed: [
          'Île-de-France',
          'Paris',
          'Yvelines',
          'Essonne',
          'Hauts-de-Seine',
          'Seine-Saint-Denis',
          'Val-de-Marne',
          "Val-d'Oise",
          'Seine-et-Marne',
          'France',
        ],
        knowsAbout: [
          'Formation IA appliquée au bâtiment',
          'Formation ChatGPT bâtiment',
          'Formation intelligence artificielle construction',
        ],
        sameAs: [SCHEMA_LINKEDIN_PROFILE_URL],
      },
    ],
  };
}
