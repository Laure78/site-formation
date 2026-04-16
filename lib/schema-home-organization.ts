/**
 * Enrichissement JSON-LD accueil : LocalBusiness + EducationalOrganization + Organization
 * fusionnés sur @id #organization.
 *
 * Avis (Review) :
 * - Option A (défaut) : uniquement aggregateRating (note agrégée + nombre d’avis) — pas de tableau
 *   `review` pour limiter le risque d’avis non vérifiables (guidelines Google sur les extraits).
 * - Option B : témoignages individuels + publisher (fiche Google Business) — voir
 *   `getHomeOrganizationLocalBusinessEnrichmentJsonLdWithVerifiedReviews` et
 *   `lib/schema-home-verified-reviews-data.ts`.
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
import { SITE_CONFIG } from '@/lib/seo';
import {
  HOME_VERIFIED_REVIEWS_FOR_SCHEMA,
  type HomeVerifiedReviewForSchema,
} from '@/lib/schema-home-verified-reviews-data';

const BASE = SCHEMA_PUBLIC_SITE_URL.replace(/\/$/, '');
const ORG_ID = `${BASE}/#organization` as const;

/** Source commune pour les avis : fiche Google Business Profile (organisme). */
function reviewPublisherOrganization(): Record<string, unknown> {
  return {
    '@type': 'Organization',
    name: SCHEMA_ORGANIZATION_OFC.name,
    url: SITE_CONFIG.googleBusinessProfileUrl,
  };
}

function mapVerifiedReviewToSchema(entry: HomeVerifiedReviewForSchema): Record<string, unknown> {
  return {
    '@type': 'Review',
    publisher: reviewPublisherOrganization(),
    author: {
      '@type': 'Person',
      name: entry.authorName,
      affiliation: {
        '@type': 'Organization',
        name: entry.companyName,
      },
    },
    reviewRating: {
      '@type': 'Rating',
      ratingValue: entry.ratingValue,
      bestRating: 5,
      worstRating: 1,
    },
    reviewBody: entry.reviewBody,
    datePublished: entry.datePublished,
  };
}

/** Cœur du schéma (sans tableau review) — aggregateRating 4,85 / reviewCount aligné SOCIAL_PROOF (1592). */
function getHomeOrganizationLocalBusinessCore(): Record<string, unknown> {
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
  };
}

/**
 * Option A — Recommandé par défaut : pas de `review[]`, seulement aggregateRating
 * (ratingValue 4,85, reviewCount issu de SCHEMA_AGGREGATE_RATING_HOME / ~1592).
 */
export function getHomeOrganizationLocalBusinessEnrichmentJsonLd(): Record<string, unknown> {
  return getHomeOrganizationLocalBusinessCore();
}

/**
 * Option B — À utiliser uniquement quand `HOME_VERIFIED_REVIEWS_FOR_SCHEMA` contient des avis
 * réels et vérifiables (noms, entreprises, dates, citations exactes).
 * Chaque Review inclut `publisher` vers la fiche Google Business de l’organisme.
 */
export function getHomeOrganizationLocalBusinessEnrichmentJsonLdWithVerifiedReviews(): Record<string, unknown> {
  return {
    ...getHomeOrganizationLocalBusinessCore(),
    review: HOME_VERIFIED_REVIEWS_FOR_SCHEMA.map(mapVerifiedReviewToSchema),
  };
}
