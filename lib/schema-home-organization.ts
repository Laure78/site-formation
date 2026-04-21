/**
 * Enrichissement JSON-LD accueil : LocalBusiness + EducationalOrganization + Organization
 * fusionnés sur @id #organization.
 *
 * Avis (Review) :
 * - Option A (défaut) : pas d’`aggregateRating` dans le JSON-LD (les chiffres marketing type
 *   « personnes formées » ne doivent pas être présentés comme un nombre d’avis documentés).
 * - Option B : témoignages individuels + publisher (fiche Google Business) — activer
 *   `HOME_USE_VERIFIED_REVIEWS_IN_JSON_LD`, remplir `HOME_VERIFIED_REVIEWS_FOR_SCHEMA`,
 *   puis `getHomeOrganizationLocalBusinessEnrichmentJsonLdResolved()`.
 */
import {
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
    /** Entité évaluée (cohérent avec l’organisation #organization) */
    itemReviewed: { '@id': ORG_ID },
    /** Source de publication de l’avis (fiche Google Business = traçabilité) */
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

/** Cœur du schéma (sans tableau review par défaut). */
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
  };
}

/**
 * Basculer à `true` uniquement quand `HOME_VERIFIED_REVIEWS_FOR_SCHEMA` contient 3 avis réels
 * (noms, entreprises, dates, citations vérifiables). Sinon rester à `false` (option A).
 */
export const HOME_USE_VERIFIED_REVIEWS_IN_JSON_LD = false;

/**
 * Option A — Recommandé par défaut : pas de `review[]` ni d’`aggregateRating` dans le JSON-LD.
 */
export function getHomeOrganizationLocalBusinessEnrichmentJsonLd(): Record<string, unknown> {
  return getHomeOrganizationLocalBusinessCore();
}

/** Schéma accueil : option A (sans avis structurés) ou option B (`review[]` vérifiables). */
export function getHomeOrganizationLocalBusinessEnrichmentJsonLdResolved(): Record<string, unknown> {
  return HOME_USE_VERIFIED_REVIEWS_IN_JSON_LD
    ? getHomeOrganizationLocalBusinessEnrichmentJsonLdWithVerifiedReviews()
    : getHomeOrganizationLocalBusinessEnrichmentJsonLd();
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
