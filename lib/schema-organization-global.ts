import { PHOTOS } from '@/lib/photos';
import {
  SCHEMA_CONTACT,
  SCHEMA_GEO,
  SCHEMA_ORGANIZATION_OFC,
  SCHEMA_PERSON_LAURE,
  SCHEMA_PUBLIC_SITE_URL,
  buildIdfAreaServedSchemaEntities,
} from '@/lib/schema-constants';
import { QUALIOPI_LEGAL, buildQualiopiCredentialSchema } from '@/lib/qualiopi-info';
import {
  SCHEMA_SITE_ORG,
  siteOrganizationLogoAbsoluteUrl,
  siteOrganizationPostalAddress,
  siteOrganizationProofSnippet,
  siteOrganizationSameAsUrls,
} from '@/lib/schema-site-proof';

export type OrganizationOfcSchemaNodeOptions = {
  organizationId?: string;
  personId?: string;
  /**
   * @deprecated Ne plus utiliser : Google exige des `review[]` individuels vérifiables
   * avec `aggregateRating`. Les notes Qualiopi restent affichées en clair sur le site.
   */
  includeAggregateRating?: boolean;
};

/**
 * Nœud JSON-LD Organization — EducationalOrganization + LocalBusiness.
 * Champs NAP + PROOF via `lib/schema-site-proof.ts` (aligné `SITE` / `PROOF`).
 * Injecté une seule fois via layout (`GlobalSiteJsonLd` → `#organization`).
 */
export function buildOrganizationOfcSchemaNode(
  options: OrganizationOfcSchemaNodeOptions = {},
): Record<string, unknown> {
  const base = SCHEMA_SITE_ORG.url;
  const organizationId = options.organizationId ?? `${base}/#organization`;
  const personId = options.personId ?? `${base}/#laure-olivie`;
  void options.includeAggregateRating;

  return {
    '@type': ['Organization', 'EducationalOrganization', 'LocalBusiness'],
    '@id': organizationId,
    name: SCHEMA_SITE_ORG.legalName,
    legalName: SCHEMA_ORGANIZATION_OFC.legalNameSasu,
    alternateName: `${SCHEMA_SITE_ORG.personName} — Formation IA pour le BTP`,
    url: base,
    email: SCHEMA_SITE_ORG.email,
    telephone: SCHEMA_SITE_ORG.phone,
    taxID: SCHEMA_CONTACT.siretDigits,
    description: `${SCHEMA_ORGANIZATION_OFC.description} ${siteOrganizationProofSnippet()}`,
    logo: siteOrganizationLogoAbsoluteUrl(),
    image: `${base}${PHOTOS.portraitPro2026.src}`,
    sameAs: [...siteOrganizationSameAsUrls()],
    address: siteOrganizationPostalAddress(),
    geo: {
      '@type': 'GeoCoordinates',
      latitude: SCHEMA_GEO.latitude,
      longitude: SCHEMA_GEO.longitude,
    },
    areaServed: buildIdfAreaServedSchemaEntities(),
    identifier: [
      {
        '@type': 'PropertyValue',
        name: 'SIRET',
        value: SCHEMA_CONTACT.siretFormatted,
      },
      {
        '@type': 'PropertyValue',
        name: 'NDA',
        value: SCHEMA_CONTACT.nda,
      },
      {
        '@type': 'PropertyValue',
        name: 'Certification Qualiopi',
        value: QUALIOPI_LEGAL.certificatNumero,
      },
    ],
    hasCredential: buildQualiopiCredentialSchema(),
    founder: {
      '@type': 'Person',
      '@id': personId,
      name: SCHEMA_PERSON_LAURE.name,
    },
  };
}

/** @deprecated Préférer `buildGlobalSiteJsonLdGraph()` — conservé pour imports existants. */
export function buildGlobalOrganizationEducationalJsonLd(): Record<string, unknown> {
  return {
    '@context': 'https://schema.org',
    ...buildOrganizationOfcSchemaNode(),
  };
}
