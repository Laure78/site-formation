import { PHOTOS } from '@/lib/photos';
import {
  SCHEMA_CONTACT,
  SCHEMA_GEO,
  SCHEMA_ORGANIZATION_OFC,
  SCHEMA_PUBLIC_SITE_URL,
  schemaLogoUrl,
} from '@/lib/schema-constants';
import { buildSchemaAggregateRating } from '@/lib/schema-aggregate-rating';
import { QUALIOPI_LEGAL } from '@/lib/qualiopi-info';

export type OrganizationOfcSchemaNodeOptions = {
  organizationId?: string;
  personId?: string;
  /** Inclure AggregateRating (questionnaires Qualiopi fin de session — voir QUALIOPI_STATS). */
  includeAggregateRating?: boolean;
};

/**
 * Nœud JSON-LD Organization — EducationalOrganization + LocalBusiness.
 * Doctrine : présentiel Île-de-France uniquement · email laureolivie@yahoo.fr · pas de GERESO.
 */
export function buildOrganizationOfcSchemaNode(
  options: OrganizationOfcSchemaNodeOptions = {},
): Record<string, unknown> {
  const base = SCHEMA_PUBLIC_SITE_URL.replace(/\/$/, '');
  const organizationId = options.organizationId ?? `${base}/#organization`;
  const personId = options.personId ?? `${base}/#laure-olivie`;
  const includeAggregateRating = options.includeAggregateRating ?? true;

  return {
    '@type': ['EducationalOrganization', 'LocalBusiness'],
    '@id': organizationId,
    name: SCHEMA_ORGANIZATION_OFC.name,
    alternateName: 'Laure Olivié — Formation IA pour le BTP',
    url: base,
    email: SCHEMA_CONTACT.email,
    telephone: '+33695661818',
    description:
      "Organisme de formation certifié Qualiopi, spécialisé dans l'IA appliquée au BTP (ChatGPT, Claude AI). Formations en présentiel, Île-de-France uniquement.",
    logo: schemaLogoUrl(),
    image: `${base}${PHOTOS.portraitPro2026.src}`,
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
    areaServed: {
      '@type': 'AdministrativeArea',
      name: 'Île-de-France',
    },
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
    hasCredential: {
      '@type': 'EducationalOccupationalCredential',
      credentialCategory: 'Qualiopi',
      name: 'Certification Qualiopi — actions de formation',
      recognizedBy: {
        '@type': 'Organization',
        name: 'Certifopac',
      },
    },
    founder: {
      '@type': 'Person',
      '@id': personId,
      name: 'Laure Olivié',
    },
    ...(includeAggregateRating
      ? {
          /**
           * Source : questionnaires de fin de session Qualiopi (pas avis Google).
           * Voir config/qualiopi.ts + /indicateurs-resultats — conformité rich results à valider.
           */
          aggregateRating: buildSchemaAggregateRating(),
        }
      : {}),
  };
}

/** @deprecated Préférer `buildGlobalSiteJsonLdGraph()` — conservé pour imports existants. */
export function buildGlobalOrganizationEducationalJsonLd(): Record<string, unknown> {
  return {
    '@context': 'https://schema.org',
    ...buildOrganizationOfcSchemaNode(),
  };
}
