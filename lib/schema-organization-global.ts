import { formatProfessionalsTrainedCount } from '@/lib/constants';
import {
  SCHEMA_CONTACT,
  SCHEMA_GEO,
  SCHEMA_LINKEDIN_PROFILE_URL,
  SCHEMA_PUBLIC_SITE_URL,
} from '@/lib/schema-constants';

/**
 * JSON-LD `EducationalOrganization` — injecté une fois dans le layout racine (toutes les pages).
 * Aligné sur les NAP / preuves (`schema-constants`, `constants`).
 */
export function buildGlobalOrganizationEducationalJsonLd(): Record<string, unknown> {
  const base = SCHEMA_PUBLIC_SITE_URL.replace(/\/$/, '');

  return {
    '@context': 'https://schema.org',
    '@type': 'EducationalOrganization',
    /** Même identifiant que le nœud Organization du graph accueil — consolidation entité. */
    '@id': `${base}/#organization`,
    name: "OFC Création d'Entreprise",
    alternateName: 'Laure Olivié - Formation IA BTP',
    url: base,
    logo: `${base}/logo-lo.svg`,
    description: `Organisme de formation IA et ChatGPT spécialisé BTP. Certifié Qualiopi, finançable Constructys. ${formatProfessionalsTrainedCount()} professionnels formés.`,
    founder: {
      '@type': 'Person',
      name: 'Laure Olivié',
      jobTitle: 'Formatrice IA BTP',
      sameAs: [SCHEMA_LINKEDIN_PROFILE_URL],
    },
    address: {
      '@type': 'PostalAddress',
      addressLocality: SCHEMA_GEO.addressLocality,
      postalCode: SCHEMA_GEO.postalCode,
      addressRegion: SCHEMA_GEO.addressRegion,
      addressCountry: SCHEMA_GEO.addressCountry,
    },
    telephone: SCHEMA_CONTACT.phone,
    email: SCHEMA_CONTACT.email,
    identifier: [
      { '@type': 'PropertyValue', propertyID: 'SIRET', value: SCHEMA_CONTACT.siretDigits },
      { '@type': 'PropertyValue', propertyID: 'NDA', value: SCHEMA_CONTACT.nda },
    ],
    hasCredential: {
      '@type': 'EducationalOccupationalCredential',
      name: 'Qualiopi',
      credentialCategory: 'Certification',
      validFor: 'P2Y',
      expires: '2028-01-31',
    },
    areaServed: [
      { '@type': 'State', name: 'Île-de-France' },
      { '@type': 'AdministrativeArea', name: 'Paris' },
      { '@type': 'AdministrativeArea', name: 'Yvelines' },
      { '@type': 'AdministrativeArea', name: 'Hauts-de-Seine' },
      { '@type': 'AdministrativeArea', name: 'Seine-Saint-Denis' },
      { '@type': 'AdministrativeArea', name: 'Val-de-Marne' },
      { '@type': 'AdministrativeArea', name: "Val-d'Oise" },
      { '@type': 'AdministrativeArea', name: 'Essonne' },
      { '@type': 'AdministrativeArea', name: 'Seine-et-Marne' },
    ],
  };
}
