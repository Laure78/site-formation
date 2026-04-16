/**
 * Données fixes Schema.org / NAP — source unique pour JSON-LD.
 * Ne pas dupliquer : importer ce module dans les builders et composants Schema.org.
 *
 * @see .cursorrules — règles Schema.org & SEO
 */

import { SOCIAL_PROOF, formatProfessionalsTrainedCount } from '@/lib/constants';

/** URL canonique du site (alignée sur NEXT_PUBLIC_SITE_URL en prod). */
export const SCHEMA_PUBLIC_SITE_URL: string =
  (typeof process !== 'undefined' && process.env.NEXT_PUBLIC_SITE_URL) ||
  'https://www.laureolivie.fr';

/** Profil LinkedIn FR — sameAs Person / Organization. */
export const SCHEMA_LINKEDIN_PROFILE_URL = 'https://fr.linkedin.com/in/laure-olivie' as const;

/** Contact & identifiants légaux (JSON-LD, mentions). */
export const SCHEMA_CONTACT = {
  email: 'laureolivie@yahoo.fr',
  /** Numéro public — laisser vide pour masquer les liens tel: et le champ telephone dans les schémas. */
  phone: '',
  phoneDisplay: '',
  siretFormatted: '905 244 281 00010',
  /** Sans espaces — annuaires, URLs */
  siretDigits: '90524428100010',
  nda: '11788515078',
  vatId: 'FR905244281',
} as const;

/** Coordonnées postales & GPS (siège — Guyancourt). */
export const SCHEMA_GEO = {
  addressCountry: 'FR',
  addressRegion: 'Île-de-France',
  addressLocality: 'Guyancourt',
  departement: 'Yvelines',
  streetAddress: '6 Rue Henri Dunant',
  postalCode: '78280',
  latitude: 48.7713,
  longitude: 2.0739,
} as const;

/** Horaires d'ouverture — format Schema.org openingHours. */
export const SCHEMA_OPENING_HOURS = 'Mo-Fr 09:00-18:00' as const;

/** Statistiques publiques (cohérence biographies / schémas). */
export const SCHEMA_STATS = {
  personnesFormees: String(SOCIAL_PROOF.PROFESSIONALS_TRAINED),
} as const;

/**
 * AggregateRating — page d'accueil / entité OFC (JSON-LD).
 * Ne pas modifier les chiffres hors validation métier.
 */
export const SCHEMA_AGGREGATE_RATING_HOME = {
  '@type': 'AggregateRating' as const,
  ratingValue: '4.85',
  bestRating: '5',
  worstRating: '1',
  ratingCount: String(SOCIAL_PROOF.PROFESSIONALS_TRAINED),
  reviewCount: String(SOCIAL_PROOF.PROFESSIONALS_TRAINED),
};

/** Person — Laure Olivié (fragments réutilisables JSON-LD). */
export const SCHEMA_PERSON_LAURE = {
  '@type': 'Person' as const,
  name: 'Laure Olivié',
  jobTitle: 'Formatrice IA BTP',
} as const;

/**
 * Organization — OFC Création d'Entreprise (champs stables hors @id / url dynamiques).
 */
export const SCHEMA_ORGANIZATION_OFC = {
  '@type': 'Organization' as const,
  name: "OFC Création d'Entreprise",
  legalName: "OFC Création d'Entreprise",
  /** Dénomination juridique complète (JSON-LD layout #ofc). */
  legalNameSasu: "OFC Création d'Entreprise SASU",
  description:
    "Organisme de formation : intelligence artificielle et ChatGPT pour le BTP, PME bâtiment et artisans. Automatisation administrative, IA devis bâtiment, IA gestion chantier. Certifié Qualiopi.",
  descriptionShortGraph:
    `Organisme de formation certifié Qualiopi spécialisé en formation IA et ChatGPT pour les entreprises du BTP. ${formatProfessionalsTrainedCount()} professionnels formés. Finançable Constructys.`,
  foundingYear: '2021',
} as const;

/** Logo SVG — chemin relatif site. */
export const SCHEMA_LOGO_PATH = '/logo-lo.svg' as const;

/** Image portrait par défaut — schémas globaux. */
export const SCHEMA_DEFAULT_PERSON_IMAGE_PATH = '/images/laure-olivie-formatrice.png' as const;

/** URL absolue logo. */
export function schemaLogoUrl(): string {
  const base = SCHEMA_PUBLIC_SITE_URL.replace(/\/$/, '');
  return `${base}${SCHEMA_LOGO_PATH}`;
}

/** URL absolue image personne par défaut. */
export function schemaDefaultPersonImageUrl(): string {
  const base = SCHEMA_PUBLIC_SITE_URL.replace(/\/$/, '');
  return `${base}${SCHEMA_DEFAULT_PERSON_IMAGE_PATH}`;
}
