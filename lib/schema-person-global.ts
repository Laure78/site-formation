import {
  SCHEMA_CONTACT,
  SCHEMA_LINKEDIN_PROFILE_URL,
  SCHEMA_PERSON_LAURE,
  SCHEMA_PUBLIC_SITE_URL,
  schemaDefaultPersonImageUrl,
} from '@/lib/schema-constants';

/**
 * JSON-LD `Person` global — Laure Olivié (fondatrice OFC).
 *
 * Injecté une fois dans le layout racine pour cimenter l'entité Person
 * sur toutes les pages. `@id` partagé avec FormationMetierJsonLd
 * (`{base}/#person`) pour que Google fusionne en une seule entité.
 *
 * Données sourcées exclusivement depuis `lib/schema-constants.ts`
 * (règle projet : pas de hardcode NAP / identité dans les schémas).
 */
export function buildGlobalPersonLaureJsonLd(): Record<string, unknown> {
  const base = SCHEMA_PUBLIC_SITE_URL.replace(/\/$/, '');

  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    '@id': `${base}/#person`,
    name: SCHEMA_PERSON_LAURE.name,
    jobTitle: 'Formatrice IA & ChatGPT spécialisée BTP',
    description:
      "Fondatrice d'OFC Création d'Entreprise (Qualiopi). Forme dirigeants, conducteurs de travaux et fonctions support BTP à ChatGPT, Claude AI et l'IA générative appliquée aux devis, mémoires techniques, CCTP et comptes rendus de chantier.",
    url: `${base}/a-propos`,
    image: schemaDefaultPersonImageUrl(),
    email: SCHEMA_CONTACT.email,
    worksFor: {
      '@type': 'Organization',
      '@id': `${base}/#organization`,
      name: "OFC Création d'Entreprise",
      url: base,
    },
    knowsAbout: [
      'Intelligence artificielle',
      'ChatGPT',
      'Claude AI',
      'Formation professionnelle BTP',
      'Bâtiment et travaux publics',
      "Réponse aux appels d'offres",
      'Mémoire technique BTP',
      'Devis BTP automatisé',
      'Analyse CCTP / DCE',
      'Comptes rendus de chantier IA',
    ],
    knowsLanguage: ['fr', 'en'],
    sameAs: [SCHEMA_LINKEDIN_PROFILE_URL],
  };
}
