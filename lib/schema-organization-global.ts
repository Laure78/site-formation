import { PHOTOS } from '@/lib/photos';
import {
  SCHEMA_CONTACT,
  SCHEMA_GEO,
  SCHEMA_ORGANIZATION_OFC,
  SCHEMA_ORGANIZATION_SAME_AS,
  SCHEMA_PERSON_LAURE,
  SCHEMA_PUBLIC_SITE_URL,
  buildIdfAreaServedSchemaEntities,
  schemaLogoUrl,
} from '@/lib/schema-constants';
import { QUALIOPI_LEGAL, buildQualiopiCredentialSchema } from '@/lib/qualiopi-info';

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
 * Doctrine : présentiel Île-de-France uniquement · email contact@laureolivie.fr · pas de GERESO.
 * areaServed : Île-de-France (+ 8 départements) · identifier SIRET.
 * Injecté une seule fois via layout (`GlobalSiteJsonLd` → `#organization`).
 */
export function buildOrganizationOfcSchemaNode(
  options: OrganizationOfcSchemaNodeOptions = {},
): Record<string, unknown> {
  const base = SCHEMA_PUBLIC_SITE_URL.replace(/\/$/, '');
  const organizationId = options.organizationId ?? `${base}/#organization`;
  const personId = options.personId ?? `${base}/#laure-olivie`;
  // `includeAggregateRating` est volontairement ignoré : pas d’aggregateRating
  // sans tableau `review` d’avis individuels vérifiables (rich results Google).
  void options.includeAggregateRating;

  return {
    '@type': ['Organization', 'EducationalOrganization', 'LocalBusiness'],
    '@id': organizationId,
    name: SCHEMA_ORGANIZATION_OFC.name,
    legalName: SCHEMA_ORGANIZATION_OFC.legalNameSasu,
    alternateName: 'Laure Olivié — Formation IA pour le BTP',
    url: base,
    email: SCHEMA_CONTACT.email,
    telephone: SCHEMA_CONTACT.telephoneJsonLd,
    taxID: SCHEMA_CONTACT.siretDigits,
    description:
      "Organisme de formation certifié Qualiopi, spécialisé dans l'IA appliquée au BTP (ChatGPT, Claude AI). Formations en présentiel, Île-de-France uniquement.",
    logo: schemaLogoUrl(),
    image: `${base}${PHOTOS.portraitPro2026.src}`,
    sameAs: [...SCHEMA_ORGANIZATION_SAME_AS],
    address: {
      '@type': 'PostalAddress',
      streetAddress: SCHEMA_GEO.streetAddress,
      postalCode: SCHEMA_GEO.postalCode,
      addressLocality: SCHEMA_GEO.addressLocality,
      addressRegion: SCHEMA_GEO.addressRegion,
      addressCountry: SCHEMA_GEO.addressCountry,
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: SCHEMA_GEO.latitude,
      longitude: SCHEMA_GEO.longitude,
    },
    /** Île-de-France + 8 départements — premier nœud = zone demandée. */
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
