/**
 * JSON-LD Course + Offer pour les fiches catalogue (BTP-01, BTP-02, BTP-04, etc.) (Script next/script).
 */

import {
  FORMATIONS_CATALOG_SCHEMA,
  type FormationCatalogEntry,
} from '@/lib/schema-course-formations';
import {
  SCHEMA_CONTACT,
  SCHEMA_GEO,
  SCHEMA_LINKEDIN_PROFILE_URL,
  SCHEMA_ORGANIZATION_OFC,
  SCHEMA_PERSON_LAURE,
  SCHEMA_PUBLIC_SITE_URL,
} from '@/lib/schema-constants';
import { tarifHtDepuisBadgeCatalogue } from '@/lib/tarifs-sessions';

export function getFormationCatalogEntryByPath(
  path: FormationCatalogEntry['path']
): FormationCatalogEntry | undefined {
  return FORMATIONS_CATALOG_SCHEMA.find((e) => e.path === path);
}

/** Schéma aligné fiche (description = meta / chapô si fournie). */
export function buildCatalogFormationCoursePageSchema(
  entry: FormationCatalogEntry,
  pageDescription?: string
): Record<string, unknown> {
  const base = SCHEMA_PUBLIC_SITE_URL.replace(/\/$/, '');
  const courseUrl = `${base}${entry.path}`;
  const price = tarifHtDepuisBadgeCatalogue(entry.level);
  const siren = SCHEMA_CONTACT.siretDigits.slice(0, 9);

  return {
    '@context': 'https://schema.org',
    '@type': 'Course',
    name: entry.name,
    description: pageDescription?.trim() || entry.description,
    url: courseUrl,
    provider: {
      '@type': 'Organization',
      name: SCHEMA_ORGANIZATION_OFC.name,
      url: base,
      sameAs: [
        `https://annuaire-entreprises.data.gouv.fr/entreprise/${siren}`,
        SCHEMA_LINKEDIN_PROFILE_URL,
      ],
    },
    instructor: {
      '@type': 'Person',
      name: SCHEMA_PERSON_LAURE.name,
      jobTitle: SCHEMA_PERSON_LAURE.jobTitle,
      url: `${base}/a-propos`,
    },
    offers: {
      '@type': 'Offer',
      price: String(price),
      priceCurrency: 'EUR',
      category: entry.ref,
      availability: 'https://schema.org/InStock',
      validFrom: '2026-01-01',
    },
    hasCourseInstance: {
      '@type': 'CourseInstance',
      courseMode: ['OnSite', 'Online'],
      courseWorkload: 'PT4H',
      location: {
        '@type': 'Place',
        name: 'OFC — Guyancourt (78) ou intra-entreprise',
        address: {
          '@type': 'PostalAddress',
          addressLocality: SCHEMA_GEO.addressLocality,
          postalCode: SCHEMA_GEO.postalCode,
          addressCountry: SCHEMA_GEO.addressCountry,
        },
      },
    },
  };
}
