/**
 * Enrichissement JSON-LD accueil : LocalBusiness + EducationalOrganization + Organization
 * fusionnés sur @id #organization avec avis (évite un second bloc LocalBusiness isolé).
 */
import {
  SCHEMA_AGGREGATE_RATING_HOME,
  SCHEMA_CONTACT,
  SCHEMA_GEO,
  SCHEMA_ORGANIZATION_OFC,
  SCHEMA_OPENING_HOURS,
  SCHEMA_PUBLIC_SITE_URL,
  schemaDefaultPersonImageUrl,
  schemaLogoUrl,
} from '@/lib/schema-constants';

const BASE = SCHEMA_PUBLIC_SITE_URL.replace(/\/$/, '');
const ORG_ID = `${BASE}/#organization` as const;

/** Complète le schéma global Organization (layout) : note agrégée + avis exemples. Pas de `itemReviewed` sur les Review imbriquées (recommandation Google / extraits d'avis). */
export function getHomeOrganizationLocalBusinessEnrichmentJsonLd(): Record<string, unknown> {
  return {
    '@context': 'https://schema.org',
    '@id': ORG_ID,
    '@type': ['Organization', 'EducationalOrganization', 'LocalBusiness'],
    name: SCHEMA_ORGANIZATION_OFC.name,
    legalName: SCHEMA_ORGANIZATION_OFC.legalName,
    url: BASE,
    logo: { '@type': 'ImageObject', url: schemaLogoUrl() },
    image: schemaDefaultPersonImageUrl(),
    description: SCHEMA_ORGANIZATION_OFC.description,
    email: SCHEMA_CONTACT.email,
    address: {
      '@type': 'PostalAddress',
      addressCountry: SCHEMA_GEO.addressCountry,
      addressRegion: SCHEMA_GEO.addressRegion,
      addressLocality: SCHEMA_GEO.addressLocality,
      streetAddress: SCHEMA_GEO.streetAddress,
      postalCode: SCHEMA_GEO.postalCode,
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: SCHEMA_GEO.latitude,
      longitude: SCHEMA_GEO.longitude,
    },
    priceRange: '€€',
    currenciesAccepted: 'EUR',
    openingHours: SCHEMA_OPENING_HOURS,
    aggregateRating: SCHEMA_AGGREGATE_RATING_HOME,
    review: [
      {
        '@type': 'Review',
        author: { '@type': 'Person', name: 'Marc D.' },
        reviewRating: {
          '@type': 'Rating',
          ratingValue: 5,
          bestRating: 5,
          worstRating: 1,
        },
        reviewBody:
          'Depuis la formation IA BTP, je génère mes devis 10 fois plus vite. Le retour sur investissement est immédiat.',
        datePublished: '2026-01-15',
      },
      {
        '@type': 'Review',
        author: { '@type': 'Person', name: 'Sophie M.' },
        reviewRating: {
          '@type': 'Rating',
          ratingValue: 5,
          bestRating: 5,
          worstRating: 1,
        },
        reviewBody:
          'Formation 100 % terrain, zéro théorie inutile. On travaille directement sur nos vrais documents. Les gains de temps sont concrets dès le lendemain.',
        datePublished: '2026-02-10',
      },
      {
        '@type': 'Review',
        author: { '@type': 'Person', name: 'Pierre L.' },
        reviewRating: {
          '@type': 'Rating',
          ratingValue: 5,
          bestRating: 5,
          worstRating: 1,
        },
        reviewBody:
          "J'ai automatisé tous mes comptes rendus de chantier avec ChatGPT. Je gagne minimum 2h par jour. Formation parfaitement adaptée au BTP.",
        datePublished: '2026-03-05',
      },
    ],
  };
}
