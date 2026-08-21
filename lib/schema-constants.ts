/**
 * Données fixes Schema.org / NAP — source unique pour JSON-LD.
 * Ne pas dupliquer : importer ce module dans les builders et composants Schema.org.
 *
 * @see .cursorrules — règles Schema.org & SEO
 */

import { siteStats, formatPersonnesFormeesCount, PROS_FORMES_TEXTE, PROS_FORMES_TEXTE_COMPLET, CONTACT, SOCIAL_PROOF } from '@/lib/constants';
import { OFC_IDENTITE } from '@/lib/ofc-identite';
import { SITE_HEADER_LOGO_SRC } from '@/lib/photos';

/** URL canonique du site (alignée sur NEXT_PUBLIC_SITE_URL en prod). */
export const SCHEMA_PUBLIC_SITE_URL: string =
  (typeof process !== 'undefined' && process.env.NEXT_PUBLIC_SITE_URL) ||
  'https://www.laureolivie.fr';

/** Profil LinkedIn FR — sameAs Person / Organization. */
export const SCHEMA_LINKEDIN_PROFILE_URL = 'https://fr.linkedin.com/in/laure-olivie' as const;

/** Page instructeur LinkedIn Learning (URL canonique — pluriel « instructors »). */
export const SCHEMA_LINKEDIN_LEARNING_INSTRUCTOR_URL =
  'https://www.linkedin.com/learning/instructors/laure-olivie' as const;

/** Chaîne YouTube — Laure Olivié. */
export const SCHEMA_YOUTUBE_CHANNEL_URL =
  'https://www.youtube.com/channel/UCnIc2a25xT8msvV69O2MeVg' as const;

/** Fiche Google Business Profile — avis, horaires, SEO local. */
export const SCHEMA_GOOGLE_BUSINESS_PROFILE_URL =
  'https://share.google/gLnYapEtSEq25mSQF' as const;

/** sameAs Person — LinkedIn, LinkedIn Learning, YouTube.
 * Absents du Footer : URLs sourcées ici (constantes NAP / EEAT).
 */
export const SCHEMA_PERSON_SAME_AS = [
  SCHEMA_LINKEDIN_PROFILE_URL,
  SCHEMA_LINKEDIN_LEARNING_INSTRUCTOR_URL,
  SCHEMA_YOUTUBE_CHANNEL_URL,
] as const;

/** sameAs Organization OFC — LinkedIn + fiche Google Business (pas LinkedIn Learning). */
export const SCHEMA_ORGANIZATION_SAME_AS = [
  SCHEMA_LINKEDIN_PROFILE_URL,
  SCHEMA_GOOGLE_BUSINESS_PROFILE_URL,
] as const;

/** Affiliations professionnelles Person (fédérations / syndicats / partenaires BTP). */
export const SCHEMA_PERSON_AFFILIATIONS: ReadonlyArray<{
  name: string;
  /** Si absent : ne pas inventer d’URL (commentaire // À COMPLÉTER dans le builder). */
  url?: string;
}> = [
  {
    name: 'FFB Grand Paris',
    url: 'https://www.ffbatiment.fr/organisation-ffb/federations-regionales/grand-paris-idf',
  },
  {
    name: "CSFE — Chambre Syndicale Française de l'Étanchéité",
    url: 'https://www.csfe.fr/',
  },
  {
    name: 'UMB-FFB — Union des Métiers du Bois',
    url: 'https://www.ffbatiment.fr/organisation-ffb/unions-syndicats-metier/umb-ffb',
  },
  {
    name: 'CNAM Entreprise',
    url: 'https://www.cnam-idf.fr/',
  },
  {
    name: 'Lefebvre Dalloz',
    url: 'https://www.lefebvre-dalloz-formation.fr/',
  },
] as const;


/** Contact & identifiants légaux (JSON-LD, mentions) — email/téléphone depuis CONTACT. */
export const SCHEMA_CONTACT = {
  email: CONTACT.email,
  /**
   * Numéro public UI (E.164). Source : `CONTACT.phone`.
   * Le JSON-LD Organization utilise aussi `telephoneJsonLd`.
   */
  phone: CONTACT.phone,
  phoneDisplay: CONTACT.phoneDisplay,
  /** E.164 — champ `telephone` Schema.org Organization (layout / rich results). */
  telephoneJsonLd: CONTACT.phone,
  siretFormatted: OFC_IDENTITE.siret,
  /** Sans espaces — annuaires, URLs, taxID Schema.org */
  siretDigits: `${OFC_IDENTITE.siren}00010`,
  nda: OFC_IDENTITE.nda,
  vatId: `FR${OFC_IDENTITE.siren}`,
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

/** Fiche officielle OFC — Annuaire des Entreprises (réf. Qualiopi / vérification). */
export const ANNUAIRE_ENTREPRISES_OFC_URL =
  'https://annuaire-entreprises.data.gouv.fr/entreprise/ofc-creation-d-entreprise-ofc-creation-d-entreprise-905244281' as const;

/** Statistiques publiques (cohérence biographies / schémas). */
export const SCHEMA_STATS = {
  /** Valeur numérique JSON-LD (QuantitativeValue, numberOfEmployees). */
  personnesFormees: siteStats.personnesFormees,
  /** Formulation texte publique arrondie. */
  personnesFormeesTexte: PROS_FORMES_TEXTE,
  personnesFormeesTexteComplet: PROS_FORMES_TEXTE_COMPLET,
} as const;

/** Person — Laure Olivié (fragments réutilisables JSON-LD). */
export const SCHEMA_PERSON_LAURE = {
  '@type': 'Person' as const,
  name: 'Laure Olivié',
  jobTitle: 'Formatrice IA spécialisée BTP',
  description:
    "10 ans d'expérience terrain comme conductrice de travaux, forme les professionnels du BTP à l'IA appliquée à leurs documents réels, en présentiel en Île-de-France.",
} as const;

/** Thématiques Person — schéma global layout (entité Laure Olivié). */
export const SCHEMA_PERSON_KNOWS_ABOUT = [
  'intelligence artificielle',
  'ChatGPT',
  'BTP',
  "appels d'offres",
  'devis',
  'CCTP',
  'DCE',
  'mémoire technique',
] as const;

/**
 * Organization — OFC Création d'Entreprise (champs stables hors @id / url dynamiques).
 */
export const SCHEMA_ORGANIZATION_OFC = {
  '@type': 'Organization' as const,
  name: OFC_IDENTITE.raisonSociale,
  legalName: OFC_IDENTITE.raisonSociale,
  /** Dénomination juridique complète (JSON-LD layout #ofc). */
  legalNameSasu: `${OFC_IDENTITE.raisonSociale} ${OFC_IDENTITE.formeJuridique}`,
  description:
    "Organisme de formation : intelligence artificielle et ChatGPT pour le BTP, PME bâtiment et professionnels du secteur. Automatisation administrative, IA devis bâtiment, IA gestion chantier. Certifié Qualiopi.",
  descriptionShortGraph:
    `Organisme de formation certifié Qualiopi spécialisé en formation IA et ChatGPT pour les entreprises du BTP. ${PROS_FORMES_TEXTE}. Finançable par Constructys selon éligibilité.`,
  foundingYear: '2021',
} as const;

/** Logo SVG — chemin relatif site. */
export const SCHEMA_LOGO_PATH = '/logo-lo.svg' as const;

/** Image portrait par défaut — schémas globaux. */
export const SCHEMA_DEFAULT_PERSON_IMAGE_PATH = '/images/laure-olivie-formatrice-ia-btp-qualiopi.webp' as const;

/** Portrait header — schéma Person global (layout). */
export const SCHEMA_HEADER_PERSON_IMAGE_PATH = SITE_HEADER_LOGO_SRC;

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

/** URL absolue portrait header — schéma Person global. */
export function schemaHeaderPersonImageUrl(): string {
  const base = SCHEMA_PUBLIC_SITE_URL.replace(/\/$/, '');
  return `${base}${SCHEMA_HEADER_PERSON_IMAGE_PATH}`;
}

/** Nœuds `affiliation` Schema.org pour Person. */
export function buildPersonAffiliationSchemaNodes(): Array<Record<string, unknown>> {
  return SCHEMA_PERSON_AFFILIATIONS.map((org) => {
    const node: Record<string, unknown> = {
      '@type': 'Organization',
      name: org.name,
    };
    if (org.url) {
      node.url = org.url;
    }
    return node;
  });
}

/** 8 départements Île-de-France — labels Schema.org / Course.areaServed. */
export const IDF_DEPT_AREA_SERVED_LABELS = [
  'Paris (75)',
  'Seine-et-Marne (77)',
  'Yvelines (78)',
  'Essonne (91)',
  'Hauts-de-Seine (92)',
  'Seine-Saint-Denis (93)',
  'Val-de-Marne (94)',
  "Val-d'Oise (95)",
] as const;

/** Noms pour Course.areaServed (type Place). */
export const IDF_COURSE_AREA_SERVED_NAMES = [
  'Île-de-France',
  ...IDF_DEPT_AREA_SERVED_LABELS,
] as const;

/** areaServed Organization / LocalBusiness — Île-de-France + 8 départements (pas de France entière). */
export function buildIdfAreaServedSchemaEntities(): Array<Record<string, string>> {
  return [
    { '@type': 'AdministrativeArea', name: 'Île-de-France' },
    ...IDF_DEPT_AREA_SERVED_LABELS.map((name) => ({
      '@type': 'AdministrativeArea',
      name,
    })),
  ];
}
