/**
 * JSON-LD — page /contact (ContactPage + contactPoint).
 */
import {
  SCHEMA_CONTACT,
  SCHEMA_GEO,
  SCHEMA_ORGANIZATION_OFC,
  SCHEMA_PUBLIC_SITE_URL,
  buildIdfAreaServedSchemaEntities,
} from '@/lib/schema-constants';
import { CONTACT_PRIMARY_EMAIL, CONTACT_PHONE, CONTACT_PAGE_META_DESCRIPTION, CONTACT_PAGE_META_TITLE } from '@/lib/contact-page-config';
import { LINKS } from '@/lib/internal-links';

const BASE = SCHEMA_PUBLIC_SITE_URL.replace(/\/$/, '');
const PAGE_URL = `${BASE}${LINKS.contact}`;

export function getContactPageJsonLd(): Record<string, unknown> {
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'ContactPage',
        '@id': `${PAGE_URL}#webpage`,
        url: PAGE_URL,
        name: CONTACT_PAGE_META_TITLE,
        description: CONTACT_PAGE_META_DESCRIPTION,
        inLanguage: 'fr-FR',
        isPartOf: { '@id': `${BASE}/#website` },
        about: { '@id': `${BASE}/#organization` },
      },
      {
        '@type': 'Organization',
        '@id': `${PAGE_URL}#contact-org`,
        name: SCHEMA_ORGANIZATION_OFC.name,
        url: BASE,
        email: CONTACT_PRIMARY_EMAIL,
        telephone: CONTACT_PHONE,
        address: {
          '@type': 'PostalAddress',
          streetAddress: SCHEMA_GEO.streetAddress,
          addressLocality: SCHEMA_GEO.addressLocality,
          postalCode: SCHEMA_GEO.postalCode,
          addressRegion: SCHEMA_GEO.addressRegion,
          addressCountry: SCHEMA_GEO.addressCountry,
        },
        areaServed: buildIdfAreaServedSchemaEntities(),
        contactPoint: [
          {
            '@type': 'ContactPoint',
            contactType: 'customer service',
            email: CONTACT_PRIMARY_EMAIL,
            telephone: CONTACT_PHONE,
            areaServed: 'FR',
            availableLanguage: ['French'],
          },
          {
            '@type': 'ContactPoint',
            contactType: 'sales',
            email: CONTACT_PRIMARY_EMAIL,
            url: `${BASE}${LINKS.prendreRdv}`,
            areaServed: 'FR',
            availableLanguage: ['French'],
          },
        ],
        taxID: SCHEMA_CONTACT.siretDigits,
      },
    ],
  };
}
