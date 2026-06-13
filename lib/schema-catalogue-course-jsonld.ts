/**
 * JSON-LD `Course` — catalogue officiel (NIV-01, NIV-02).
 * Données fixes : `lib/schema-constants.ts`, `lib/internal-links.ts`, `lib/tarifs-sessions.ts`.
 */
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
const INSTRUCTOR_PORTRAIT_PATH = '/images/laure-portrait-header-2026.png';

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

export type FormationCatalogueRichCourseConfig = {
  path: typeof LINKS.formationIaBtpNiveau1BatimentTp | typeof LINKS.formationAO;
  name: string;
  description: string;
  price: number;
  educationalLevel: 'Débutant' | 'Avancé';
  teaches: readonly string[];
};

export const CATALOGUE_COURSE_IA_BTP_NIV01: CatalogueCourseJsonLdConfig = {
  path: LINKS.formationIaBtpNiveau1BatimentTp,
  name: "L'IA au service des pros du bâtiment et des travaux publics",
  description:
    'Formation IA appliquée au BTP : devis, comptes rendus de chantier, courriers, documents administratifs. Exercices terrain sur vos vrais documents BTP. Qualiopi, finançable Constructys.',
  price: TARIF_SESSION_DEBUTANT_HT,
  keywords: ['Devis BTP', 'administratif', 'comptes rendus', 'PPSPS'],
  courseCode: 'NIV-01',
  educationalLevel: 'Beginner',
};

export const CATALOGUE_COURSE_IA_AO_NIV02: CatalogueCourseJsonLdConfig = {
  path: LINKS.formationAO,
  name: "L'IA appliquée aux appels d'offres BTP",
  description:
    "Formation IA appliquée aux appels d'offres BTP : analyse DCE et CCTP, rédaction mémoire technique avec Claude AI Pro, Cowork & Skills. Exercices sur vos dossiers réels. Qualiopi, finançable Constructys.",
  price: TARIF_SESSION_AVANCE_HT,
  keywords: ['DCE', 'mémoire technique', 'Claude AI Pro', 'Cowork', 'Skills'],
  courseCode: 'NIV-02',
  educationalLevel: 'Advanced',
};

export const FORMATION_RICH_COURSE_NIV01: FormationCatalogueRichCourseConfig = {
  path: LINKS.formationIaBtpNiveau1BatimentTp,
  name: CATALOGUE_COURSE_IA_BTP_NIV01.name,
  description: CATALOGUE_COURSE_IA_BTP_NIV01.description,
  price: TARIF_SESSION_DEBUTANT_HT,
  educationalLevel: 'Débutant',
  teaches: [
    'IA générative BTP',
    'ChatGPT pour devis',
    'Automatisation administrative BTP',
    'Prompts BTP',
  ],
};

export const FORMATION_RICH_COURSE_NIV02: FormationCatalogueRichCourseConfig = {
  path: LINKS.formationAO,
  name: CATALOGUE_COURSE_IA_AO_NIV02.name,
  description: CATALOGUE_COURSE_IA_AO_NIV02.description,
  price: TARIF_SESSION_AVANCE_HT,
  educationalLevel: 'Avancé',
  teaches: [
    'Analyse DCE et CCTP avec Claude AI',
    'Rédaction mémoire technique BTP',
    "Claude Cowork & Skills pour appels d'offres",
    'Assistants IA réutilisables marchés publics',
  ],
};

/** JSON-LD `Course` enrichi — fiches catalogue NIV-01 / NIV-02 (Rich Results). */
export function buildFormationCatalogueRichCourseJsonLd(
  config: FormationCatalogueRichCourseConfig
): Record<string, unknown> {
  const base = SCHEMA_PUBLIC_SITE_URL.replace(/\/$/, '');
  const courseUrl = `${base}${config.path}`;

  return {
    '@context': 'https://schema.org',
    '@type': 'Course',
    name: config.name,
    description: config.description,
    url: courseUrl,
    provider: {
      '@type': 'Organization',
      name: SCHEMA_ORGANIZATION_OFC.name,
      url: base,
      hasCredential: {
        '@type': 'EducationalOccupationalCredential',
        name: 'Certification Qualiopi',
        credentialCategory: 'certification',
      },
    },
    instructor: {
      '@type': 'Person',
      name: SCHEMA_PERSON_LAURE.name,
      url: `${base}/a-propos`,
      image: `${base}${INSTRUCTOR_PORTRAIT_PATH}`,
    },
    timeRequired: DURATION_ISO,
    courseMode: 'onsite',
    inLanguage: 'fr',
    educationalLevel: config.educationalLevel,
    teaches: [...config.teaches],
    offers: {
      '@type': 'Offer',
      price: String(config.price),
      priceCurrency: 'EUR',
      priceSpecification: {
        '@type': 'PriceSpecification',
        description: 'Prix HT par session (max 12 participants)',
      },
      availability: 'https://schema.org/InStock',
    },
    hasCourseInstance: {
      '@type': 'CourseInstance',
      courseMode: 'onsite',
      courseWorkload: DURATION_ISO,
      location: {
        '@type': 'Place',
        name: 'Île-de-France (intra dans vos locaux ou inter en salle)',
        address: {
          '@type': 'PostalAddress',
          addressRegion: 'Île-de-France',
          addressCountry: 'FR',
        },
      },
    },
  };
}

/** Construit le JSON-LD `Course` complet pour une fiche catalogue (legacy — composant générique). */
export function buildCatalogueCourseJsonLd(
  config: CatalogueCourseJsonLdConfig
): Record<string, unknown> {
  const richConfig: FormationCatalogueRichCourseConfig = {
    path: config.path,
    name: config.name,
    description: config.description,
    price: config.price,
    educationalLevel: config.educationalLevel === 'Beginner' ? 'Débutant' : 'Avancé',
    teaches:
      config.courseCode === 'NIV-01'
        ? FORMATION_RICH_COURSE_NIV01.teaches
        : FORMATION_RICH_COURSE_NIV02.teaches,
  };
  return buildFormationCatalogueRichCourseJsonLd(richConfig);
}

export function buildCatalogueCourseIaBtpNiv01JsonLd(): Record<string, unknown> {
  return buildFormationCatalogueRichCourseJsonLd(FORMATION_RICH_COURSE_NIV01);
}

export function buildCatalogueCourseIaAppelsOffreNiv02JsonLd(): Record<string, unknown> {
  return buildFormationCatalogueRichCourseJsonLd(FORMATION_RICH_COURSE_NIV02);
}
