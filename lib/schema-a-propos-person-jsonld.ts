/**
 * JSON-LD `Person` — page /a-propos (extrait dédié rich results / IA).
 * Coordonnées depuis `lib/schema-constants.ts` — ne pas dupliquer en dur.
 */

import { formatProfessionalsTrainedCount, SOCIAL_PROOF } from '@/lib/constants';
import {
  SCHEMA_CONTACT,
  SCHEMA_GEO,
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
    jobTitle: 'Formatrice IA et ChatGPT spécialisée BTP',
    description: `Formatrice IA pour les professionnels du BTP. Ex-conductrice de travaux, ex-dirigeante ALIA BTP (travaux publics Île-de-France). ${formatProfessionalsTrainedCount()} professionnels formés, ${SOCIAL_PROOF.AVERAGE_RATING}. Organisme Qualiopi. Clients : FFB Grand Paris, FFB IDF, CSFE, CAPEB, CNAM Entreprise, Lefebvre Dalloz. Instructrice LinkedIn Learning.`,
    url: PAGE_URL,
    image: `${BASE}/images/laure-portrait-header-2026.png`,
    telephone: SCHEMA_CONTACT.phone,
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
