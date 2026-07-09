import { formatProfessionalsTrainedCount } from '@/lib/constants';
import { PHOTOS } from '@/lib/photos';
import {
  ANNUAIRE_ENTREPRISES_OFC_URL,
  SCHEMA_CONTACT,
  SCHEMA_GEO,
  SCHEMA_LINKEDIN_PROFILE_URL,
  SCHEMA_ORGANIZATION_OFC,
  SCHEMA_PUBLIC_SITE_URL,
  buildQualiopiCredentialSchema,
} from '@/lib/schema-constants';

export type OrganizationOfcSchemaNodeOptions = {
  organizationId?: string;
  personId?: string;
};

/**
 * Nœud JSON-LD `Organization` — OFC Création d'Entreprise.
 * Sous-type `EducationalOrganization` pour le signal formation professionnelle.
 */
export function buildOrganizationOfcSchemaNode(
  options: OrganizationOfcSchemaNodeOptions = {},
): Record<string, unknown> {
  const base = SCHEMA_PUBLIC_SITE_URL.replace(/\/$/, '');
  const organizationId = options.organizationId ?? `${base}/#organization`;
  const personId = options.personId ?? `${base}/#person`;

  return {
    '@type': ['Organization', 'EducationalOrganization'],
    '@id': organizationId,
    name: SCHEMA_ORGANIZATION_OFC.name,
    legalName: SCHEMA_ORGANIZATION_OFC.legalName,
    alternateName: 'OFC',
    url: base,
    logo: `${base}/logo-lo.svg`,
    image: `${base}${PHOTOS.portraitPro2026.src}`,
    description: SCHEMA_ORGANIZATION_OFC.description,
    email: SCHEMA_CONTACT.email,
    taxID: SCHEMA_CONTACT.siretDigits,
    vatID: SCHEMA_CONTACT.vatId,
    identifier: {
      '@type': 'PropertyValue',
      propertyID: 'SIRET',
      value: SCHEMA_CONTACT.siretDigits,
    },
    address: {
      '@type': 'PostalAddress',
      streetAddress: SCHEMA_GEO.streetAddress,
      addressLocality: SCHEMA_GEO.addressLocality,
      addressRegion: SCHEMA_GEO.addressRegion,
      postalCode: SCHEMA_GEO.postalCode,
      addressCountry: SCHEMA_GEO.addressCountry,
    },
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'customer support',
      email: SCHEMA_CONTACT.email,
      areaServed: 'FR',
      availableLanguage: 'French',
    },
    areaServed: {
      '@type': 'AdministrativeArea',
      name: 'Île-de-France',
    },
    founder: {
      '@type': 'Person',
      '@id': personId,
      name: 'Laure Olivié',
      jobTitle: 'Formatrice IA pour le BTP',
      url: `${base}/a-propos`,
      sameAs: [SCHEMA_LINKEDIN_PROFILE_URL],
    },
    hasCredential: buildQualiopiCredentialSchema(),
    sameAs: [
      SCHEMA_LINKEDIN_PROFILE_URL,
      'https://www.linkedin.com/company/ofc-creation-entreprise',
      ANNUAIRE_ENTREPRISES_OFC_URL,
    ],
    award: `Certification Qualiopi · ${formatProfessionalsTrainedCount()} professionnels formés`,
  };
}

/** @deprecated Préférer `buildGlobalSiteJsonLdGraph()` — conservé pour imports existants. */
export function buildGlobalOrganizationEducationalJsonLd(): Record<string, unknown> {
  return {
    '@context': 'https://schema.org',
    ...buildOrganizationOfcSchemaNode(),
  };
}
