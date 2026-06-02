/**
 * JSON-LD `Course` — catalogue officiel (NIV-01, NIV-02).
 * Données fixes : `lib/schema-constants.ts`, `lib/constants.ts`, `lib/internal-links.ts`.
 */
import { SOCIAL_PROOF } from '@/lib/constants';
import { LINKS } from '@/lib/internal-links';
import {
  SCHEMA_ORGANIZATION_OFC,
  SCHEMA_PERSON_LAURE,
  SCHEMA_PUBLIC_SITE_URL,
} from '@/lib/schema-constants';
import {
  TARIF_SESSION_AVANCE_HT,
  TARIF_SESSION_DEBUTANT_HT,
} from '@/lib/tarifs-sessions';

const DURATION_ISO = 'PT4H';
const AGGREGATE_RATING_VALUE = 4.85;

export type CatalogueCourseJsonLdConfig = {
  /** Chemin interne (sans domaine) — source `lib/internal-links.ts` */
  path: typeof LINKS.formationIaBtpNiveau1BatimentTp | typeof LINKS.formationAO;
  name: string;
  description: string;
  price: number;
  keywords: readonly string[];
  courseCode: 'NIV-01' | 'NIV-02';
  educationalLevel: 'Beginner' | 'Advanced';
};

export const CATALOGUE_COURSE_IA_BTP_NIV01: CatalogueCourseJsonLdConfig = {
  path: LINKS.formationIaBtpNiveau1BatimentTp,
  name: "L'IA au service des professionnels du BTP",
  description:
    "Formation niveau 1 — 4 h : IA pour bâtiment et travaux publics, devis, chantier, documents et administratif. Qualiopi, Constructys.",
  price: TARIF_SESSION_DEBUTANT_HT,
  keywords: ['Devis BTP', 'administratif', 'comptes rendus', 'PPSPS'],
  courseCode: 'NIV-01',
  educationalLevel: 'Beginner',
};

export const CATALOGUE_COURSE_IA_AO_NIV02: CatalogueCourseJsonLdConfig = {
  path: LINKS.formationAO,
  name: "L'IA appliquée aux appels d'offres BTP",
  description:
    "Formation niveau 2 — 4 h : assistants IA DCE et mémoire technique avec Claude AI Pro, Cowork & Skills — Qualiopi, OPCO Constructys.",
  price: TARIF_SESSION_AVANCE_HT,
  keywords: ['DCE', 'mémoire technique', 'Claude AI Pro', 'Cowork', 'Skills'],
  courseCode: 'NIV-02',
  educationalLevel: 'Advanced',
};

/** Construit le JSON-LD `Course` complet pour une fiche catalogue. */
export function buildCatalogueCourseJsonLd(
  config: CatalogueCourseJsonLdConfig
): Record<string, unknown> {
  const base = SCHEMA_PUBLIC_SITE_URL.replace(/\/$/, '');
  const courseUrl = `${base}${config.path}`;

  return {
    '@context': 'https://schema.org',
    '@type': 'Course',
    '@id': `${courseUrl}#course`,
    name: config.name,
    description: config.description,
    url: courseUrl,
    courseCode: config.courseCode,
    keywords: [...config.keywords],
    educationalLevel: config.educationalLevel,
    inLanguage: 'fr-FR',
    timeRequired: DURATION_ISO,
    provider: {
      '@type': 'Organization',
      '@id': `${base}/#organization`,
      name: SCHEMA_ORGANIZATION_OFC.name,
      url: base,
    },
    instructor: {
      '@type': 'Person',
      '@id': `${base}/#person`,
      name: SCHEMA_PERSON_LAURE.name,
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: AGGREGATE_RATING_VALUE,
      ratingCount: SOCIAL_PROOF.PROFESSIONALS_TRAINED,
      bestRating: 5,
      worstRating: 1,
    },
    offers: {
      '@type': 'Offer',
      price: config.price,
      priceCurrency: 'EUR',
      availability: 'https://schema.org/InStock',
      url: courseUrl,
      category: 'Formation professionnelle',
    },
    hasCourseInstance: {
      '@type': 'CourseInstance',
      courseMode: ['Onsite'],
      courseWorkload: DURATION_ISO,
      inLanguage: 'fr-FR',
      instructor: { '@id': `${base}/#person` },
      location: {
        '@type': 'Place',
        name: 'Île-de-France — inter ou intra, en présentiel',
        address: {
          '@type': 'PostalAddress',
          addressRegion: 'Île-de-France',
          addressCountry: 'FR',
        },
      },
    },
  };
}

export function buildCatalogueCourseIaBtpNiv01JsonLd(): Record<string, unknown> {
  return buildCatalogueCourseJsonLd(CATALOGUE_COURSE_IA_BTP_NIV01);
}

export function buildCatalogueCourseIaAppelsOffreNiv02JsonLd(): Record<string, unknown> {
  return buildCatalogueCourseJsonLd(CATALOGUE_COURSE_IA_AO_NIV02);
}
