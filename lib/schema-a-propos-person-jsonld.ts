/**
 * JSON-LD `Person` — page /a-propos (extrait dédié rich results / IA).
 * Coordonnées depuis `lib/schema-constants.ts` — ne pas dupliquer en dur.
 */

import { getLaureOlivieSchemaPersonDescription } from '@/lib/laure-olivie-profile';
import {
  SCHEMA_CONTACT,
  SCHEMA_GEO,
  SCHEMA_HEADER_PERSON_IMAGE_PATH,
  SCHEMA_ORGANIZATION_OFC,
  SCHEMA_PUBLIC_SITE_URL,
} from '@/lib/schema-constants';

const BASE = SCHEMA_PUBLIC_SITE_URL.replace(/\/$/, '');
const PAGE_URL = `${BASE}/a-propos`;

export function getAProposPersonJsonLd(): Record<string, unknown> {
  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'Laure Olivié',
    jobTitle: 'Formatrice IA générative — spécialiste secteur BTP',
    description: getLaureOlivieSchemaPersonDescription(),
    url: PAGE_URL,
    image: `${BASE}${SCHEMA_HEADER_PERSON_IMAGE_PATH}`,
    email: SCHEMA_CONTACT.email,
    worksFor: {
      '@type': 'Organization',
      name: SCHEMA_ORGANIZATION_OFC.name,
      url: BASE,
      address: {
        '@type': 'PostalAddress',
        addressLocality: SCHEMA_GEO.addressLocality,
        postalCode: SCHEMA_GEO.postalCode,
        addressRegion: SCHEMA_GEO.addressRegion,
        addressCountry: SCHEMA_GEO.addressCountry,
      },
    },
    knowsAbout: [
      'Intelligence artificielle',
      'ChatGPT',
      'Claude AI',
      'Formation BTP',
      'Devis BTP',
      "Appels d'offres BTP",
      'DCE',
      'Mémoire technique BTP',
      'Conducteur de travaux',
      'Qualiopi',
    ],
    sameAs: ['https://www.linkedin.com/in/laure-olivie', 'https://www.bework.fr'],
  };
}
