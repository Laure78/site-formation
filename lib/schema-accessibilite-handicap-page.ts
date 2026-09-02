/**
 * JSON-LD — page /accessibilite-handicap (WebPage + ContactPoint référente handicap).
 */
import {
  SCHEMA_GEO,
  SCHEMA_ORGANIZATION_OFC,
  SCHEMA_PUBLIC_SITE_URL,
} from '@/lib/schema-constants';
import { CONTACT } from '@/lib/constants';
import { LINKS } from '@/lib/internal-links';
import { QUALIOPI_REFERENT_HANDICAP } from '@/lib/qualiopi-info';

const BASE = SCHEMA_PUBLIC_SITE_URL.replace(/\/$/, '');
const PAGE_URL = `${BASE}${LINKS.accessibiliteHandicap}`;

export const ACCESSIBILITE_HANDICAP_PAGE_TITLE =
  'Accessibilité et handicap des formations | OFC';

export const ACCESSIBILITE_HANDICAP_PAGE_DESCRIPTION =
  'Besoin d’un aménagement pour suivre une formation IA BTP ? Découvrez le parcours proposé et contactez la référente handicap d’OFC.';

export function getAccessibiliteHandicapPageJsonLd(): Record<string, unknown> {
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebPage',
        '@id': `${PAGE_URL}#webpage`,
        url: PAGE_URL,
        name: ACCESSIBILITE_HANDICAP_PAGE_TITLE,
        description: ACCESSIBILITE_HANDICAP_PAGE_DESCRIPTION,
        inLanguage: 'fr-FR',
        isPartOf: { '@id': `${BASE}/#website` },
        about: { '@id': `${BASE}/#organization` },
      },
      {
        '@type': 'Person',
        '@id': `${PAGE_URL}#referent-handicap`,
        name: QUALIOPI_REFERENT_HANDICAP.nom,
        jobTitle: QUALIOPI_REFERENT_HANDICAP.role,
        worksFor: { '@id': `${BASE}/#organization` },
        email: QUALIOPI_REFERENT_HANDICAP.email,
        telephone: CONTACT.phone,
        url: PAGE_URL,
      },
      {
        '@type': 'ContactPoint',
        '@id': `${PAGE_URL}#contact-referent-handicap`,
        contactType: QUALIOPI_REFERENT_HANDICAP.role,
        name: QUALIOPI_REFERENT_HANDICAP.nom,
        email: QUALIOPI_REFERENT_HANDICAP.email,
        telephone: CONTACT.phone,
        areaServed: 'FR',
        availableLanguage: ['French'],
        url: PAGE_URL,
      },
      {
        '@type': 'EducationalOrganization',
        '@id': `${PAGE_URL}#org-handicap`,
        name: SCHEMA_ORGANIZATION_OFC.name,
        url: BASE,
        address: {
          '@type': 'PostalAddress',
          streetAddress: SCHEMA_GEO.streetAddress,
          addressLocality: SCHEMA_GEO.addressLocality,
          postalCode: SCHEMA_GEO.postalCode,
          addressRegion: SCHEMA_GEO.addressRegion,
          addressCountry: SCHEMA_GEO.addressCountry,
        },
      },
    ],
  };
}
