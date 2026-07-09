/**
 * JSON-LD Course + Offer pour les fiches catalogue (BTP-01, BTP-02, BTP-04, etc.) (Script next/script).
 */

import {
  FORMATIONS_CATALOG_SCHEMA,
  type FormationCatalogEntry,
} from '@/lib/schema-course-formations';
import {
  SCHEMA_CONTACT,
  SCHEMA_LINKEDIN_PROFILE_URL,
  SCHEMA_PERSON_LAURE,
  SCHEMA_PUBLIC_SITE_URL,
} from '@/lib/schema-constants';
import { buildFormationFicheCourseJsonLd } from '@/lib/schema-formation-course-jsonld';
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
  const price = tarifHtDepuisBadgeCatalogue(entry.level);
  const siren = SCHEMA_CONTACT.siretDigits.slice(0, 9);
  const description = pageDescription?.trim() || entry.description;

  return {
    ...buildFormationFicheCourseJsonLd({
      name: entry.name,
      description,
      path: entry.path,
      courseCode: entry.ref,
      educationalLevel: entry.level === 'DÉBUTANT' ? 'Débutant' : 'Avancé',
      teaches: entry.teaches,
      organizationId: `${base}/#organization`,
      instructorName: SCHEMA_PERSON_LAURE.name,
    }),
    provider: {
      '@type': 'Organization',
      '@id': `${base}/#organization`,
      name: "OFC Création d'Entreprise",
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
      url: `${base}${entry.path}`,
    },
  };
}
