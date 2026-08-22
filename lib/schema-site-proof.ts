/**
 * Pont JSON-LD ↔ constantes NAP + PROOF — sans importer `lib/site.ts` (évite cycle avec `lib/seo.ts`).
 */
import { CONTACT } from '@/lib/constants';
import { PROOF } from '@/lib/proof';
import {
  SCHEMA_CONTACT,
  SCHEMA_GEO,
  SCHEMA_ORGANIZATION_SAME_AS,
  SCHEMA_PUBLIC_SITE_URL,
  schemaLogoUrl,
} from '@/lib/schema-constants';
import { OFC_IDENTITE } from '@/lib/ofc-identite';

const BASE = SCHEMA_PUBLIC_SITE_URL.replace(/\/$/, '');

/** URL absolue logo OFC (SVG — rich results Organization). */
export function siteOrganizationLogoAbsoluteUrl(): string {
  return schemaLogoUrl();
}

/** sameAs Organization — LinkedIn Laure, LinkedIn Learning, fiche Google. */
export function siteOrganizationSameAsUrls(): readonly string[] {
  return SCHEMA_ORGANIZATION_SAME_AS;
}

/** PostalAddress Guyancourt 78280. */
export function siteOrganizationPostalAddress(): Record<string, unknown> {
  return {
    '@type': 'PostalAddress',
    streetAddress: SCHEMA_GEO.streetAddress,
    postalCode: SCHEMA_GEO.postalCode,
    addressLocality: SCHEMA_GEO.addressLocality,
    addressRegion: SCHEMA_GEO.addressRegion,
    addressCountry: SCHEMA_GEO.addressCountry,
  };
}

/** Identité Organization — alignée `lib/site.ts` sans import circulaire. */
export const SCHEMA_SITE_ORG = {
  url: BASE,
  legalName: OFC_IDENTITE.raisonSociale,
  personName: 'Laure Olivié',
  email: CONTACT.email,
  phone: CONTACT.phone,
  siret: SCHEMA_CONTACT.siretFormatted,
} as const;

/** Ligne preuve sociale Qualiopi (indicateur 2). */
export function siteOrganizationProofSnippet(): string {
  const formes = PROOF.formes.toLocaleString('fr-FR');
  const repondants = PROOF.repondants.toLocaleString('fr-FR');
  return `${formes} professionnels formés · satisfaction ${PROOF.note}/5 (${repondants} répondants, ${PROOF.periode}).`;
}

/** Description Person par défaut — 10 ans terrain + PROOF. */
export function sitePersonProofDescription(baseDescription: string): string {
  const formes = PROOF.formes.toLocaleString('fr-FR');
  return `${baseDescription} ${formes} professionnels formés · ${PROOF.note}/5.`;
}
