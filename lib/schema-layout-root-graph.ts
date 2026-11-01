/**
 * JSON-LD `@graph` racine (layout) — EducationalOrganization + Person.
 * Source identité : `SITE` (`lib/site-config.ts`).
 */
import {
  IDF_DEPT_AREA_SERVED_LABELS,
  SCHEMA_CONTACT,
  SCHEMA_PUBLIC_SITE_URL,
  schemaLogoUrl,
} from '@/lib/schema-constants';
import { buildQualiopiCredentialSchema } from '@/lib/qualiopi-info';
import {
  SITE,
  SITE_LINKEDIN_LEARNING_INSTRUCTOR_URL,
  SITE_LINKEDIN_PROFILE_URL,
} from '@/lib/site-config';

const PERSON_JOB_TITLE = 'Formatrice IA spécialisée BTP' as const;

function layoutGraphBaseUrl(): string {
  return SCHEMA_PUBLIC_SITE_URL.replace(/\/$/, '');
}

export function buildLayoutEducationalOrganizationNode(
  organizationId: string,
  personId: string,
): Record<string, unknown> {
  const base = layoutGraphBaseUrl();
  return {
    '@type': 'EducationalOrganization',
    '@id': organizationId,
    name: SITE.marque,
    legalName: SITE.raisonSociale,
    url: base,
    email: SITE.contact.email,
    telephone: SITE.contact.telIntl,
    taxID: SCHEMA_CONTACT.siretDigits,
    logo: schemaLogoUrl(),
    address: {
      '@type': 'PostalAddress',
      streetAddress: SITE.adresse.rue,
      postalCode: SITE.adresse.cp,
      addressLocality: SITE.adresse.ville,
      addressCountry: 'FR',
    },
    areaServed: IDF_DEPT_AREA_SERVED_LABELS.map((name) => ({
      '@type': 'AdministrativeArea',
      name,
    })),
    hasCredential: buildQualiopiCredentialSchema(),
    sameAs: [...SITE.sameAs],
    founder: { '@id': personId },
  };
}

export function buildLayoutPersonNode(
  personId: string,
  organizationId: string,
): Record<string, unknown> {
  const base = layoutGraphBaseUrl();
  return {
    '@type': 'Person',
    '@id': personId,
    name: SITE.marque,
    jobTitle: PERSON_JOB_TITLE,
    url: `${base}/a-propos`,
    worksFor: { '@id': organizationId },
    sameAs: [SITE_LINKEDIN_PROFILE_URL, SITE_LINKEDIN_LEARNING_INSTRUCTOR_URL],
  };
}

/** `@graph` injecté dans `app/layout.tsx` via `<GlobalSiteJsonLd />`. */
export function buildLayoutRootJsonLdGraph(): Record<string, unknown> {
  const base = layoutGraphBaseUrl();
  const organizationId = `${base}/#organization`;
  const personId = `${base}/#laure-olivie`;

  return {
    '@context': 'https://schema.org',
    '@graph': [
      buildLayoutEducationalOrganizationNode(organizationId, personId),
      buildLayoutPersonNode(personId, organizationId),
    ],
  };
}
