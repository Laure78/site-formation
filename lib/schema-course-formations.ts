/**
 * Schémas JSON-LD Course + EducationalOrganization pour le catalogue et les fiches formation.
 */
import { formationsData } from '@/src/data/formations';
import { SITE_CONFIG } from '@/lib/seo';
import { tarifHtDepuisBadgeCatalogue } from '@/lib/tarifs-sessions';

export const EDUCATIONAL_ORGANIZATION_FRAGMENT_ID =
  `${SITE_CONFIG.url}/#educational-organization` as const;

export type NiveauCatalogue = 'DÉBUTANT' | 'AVANCÉ';

export type FormationCatalogEntry = {
  ref: string;
  level: NiveauCatalogue;
  path: `/formations/${string}`;
  name: string;
  description: string;
  teaches: string[];
  occupationalCategory: string;
};

/** Données alignées sur le catalogue (NIV-01, NIV-02). */
export const FORMATIONS_CATALOG_SCHEMA: FormationCatalogEntry[] = [
  {
    ref: 'NIV-01',
    level: 'DÉBUTANT',
    path: '/formations/ia-batiment-travaux-publics',
    name: "L'IA au service des pros du bâtiment et des travaux publics",
    description:
      "Formation niveau 1 — 4 h : IA pour bâtiment et travaux publics, devis, chantier, documents et administratif. Qualiopi, Constructys.",
    teaches: [
      'Usages de l’IA sur chantier et en bureau d’études',
      'Devis, comptes rendus et courriers avec ChatGPT / Claude',
      'Structuration de l’administratif et prompts métier BTP / TP',
      'Bonnes pratiques, RGPD et validation humaine',
    ],
    occupationalCategory: 'BTP, Bâtiment, Travaux Publics',
  },
  {
    ref: 'NIV-02',
    level: 'AVANCÉ',
    path: '/formations/ia-appels-offre-btp',
    name: "L'IA appliquée aux appels d'offres BTP",
    description:
      "Formation niveau 2 — 4 h : assistants IA DCE et mémoire technique avec Claude AI Pro, Cowork & Skills — Qualiopi, OPCO Constructys.",
    teaches: [
      'Paramétrage Claude AI Pro (Projects, instructions) et installation Cowork',
      'Analyse DCE via Cowork — 15 informations critiques, CCAP, CCTP, verdict Go / No Go',
      'Structure et rédaction assistée d’un mémoire technique (5 sections clés, relecture experte)',
      'Création de skills Cowork personnalisés DCE / MT alimentés par les données entreprise',
      'Évaluation et personnalisation des contenus générés — conformité technique BTP',
    ],
    occupationalCategory: 'BTP, Bâtiment, Travaux Publics',
  },
];

const DURATION_ISO = 'PT4H';
const COURSE_MODES = ['onsite', 'online'] as const;

function educationalLevelSchema(level: NiveauCatalogue): string {
  return level === 'DÉBUTANT' ? 'Beginner' : 'Advanced';
}

function buildCourseObject(entry: FormationCatalogEntry): Record<string, unknown> {
  const price = tarifHtDepuisBadgeCatalogue(entry.level);
  const url = `${SITE_CONFIG.url}${entry.path}`;
  return {
    '@type': 'Course',
    '@id': `${url}#course`,
    name: entry.name,
    description: entry.description,
    url,
    courseCode: entry.ref,
    duration: DURATION_ISO,
    courseMode: [...COURSE_MODES],
    inLanguage: 'fr',
    availableLanguage: 'fr',
    educationalLevel: educationalLevelSchema(entry.level),
    teaches: entry.teaches,
    occupationalCategory: entry.occupationalCategory,
    provider: { '@id': EDUCATIONAL_ORGANIZATION_FRAGMENT_ID },
    offers: {
      '@type': 'Offer',
      price,
      priceCurrency: 'EUR',
      availability: 'https://schema.org/InStock',
      url,
      category: 'Formation professionnelle',
    },
  };
}

/** Catalogue /formations : @graph = EducationalOrganization + ItemList (Course complètes). */
export function getFormationsCatalogJsonLd(): Record<string, unknown> {
  const list = FORMATIONS_CATALOG_SCHEMA;
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'EducationalOrganization',
        '@id': EDUCATIONAL_ORGANIZATION_FRAGMENT_ID,
        name: SITE_CONFIG.legalName,
        url: SITE_CONFIG.url,
        sameAs: 'https://www.linkedin.com/in/laure-olivie',
        hasCredential: {
          '@type': 'EducationalOccupationalCredential',
          name: 'Qualiopi',
          credentialCategory: 'certification',
        },
      },
      {
        '@type': 'ItemList',
        '@id': `${SITE_CONFIG.url}/formations#course-list`,
        name: 'Catalogue des formations IA pour le BTP',
        description:
          'Formations IA pour dirigeants et équipes du BTP (bâtiment et travaux publics). Devis, appels d’offres, ChatGPT. Finançable Constructys.',
        numberOfItems: list.length,
        itemListElement: list.map((entry, i) => ({
          '@type': 'ListItem',
          position: i + 1,
          item: buildCourseObject(entry),
        })),
      },
    ],
  };
}

/**
 * Schéma Course unique (données `src/data/formations.ts`) — page dynamique `/formations/[slug]`
 * et fiches qui réutilisent la même map.
 */
export function getCourseJsonLdFromFormationsData(
  slug: string
): Record<string, unknown> | null {
  const f = formationsData[slug as keyof typeof formationsData];
  if (!f) return null;
  const base = SITE_CONFIG.url.replace(/\/$/, '');
  const courseUrl = `${base}/formations/${slug}`;
  return {
    '@context': 'https://schema.org',
    '@type': 'Course',
    '@id': `${courseUrl}#course`,
    url: courseUrl,
    name: f.name,
    description: f.description,
    provider: {
      '@type': 'Organization',
      name: SITE_CONFIG.legalName,
      url: base,
    },
    instructor: {
      '@type': 'Person',
      name: SITE_CONFIG.name,
    },
    timeRequired: f.duration,
    educationalLevel: 'Professionnel',
    courseLanguage: 'fr',
    inLanguage: 'fr',
    availableLanguage: 'fr',
    hasCourseInstance: {
      '@type': 'CourseInstance',
      courseMode: [...COURSE_MODES],
      courseSchedule: {
        '@type': 'Schedule',
        duration: f.duration,
      },
    },
    offers: {
      '@type': 'Offer',
      price: f.price,
      priceCurrency: 'EUR',
      availability: 'https://schema.org/InStock',
    },
  };
}

/** Fiche formation : schéma Course depuis la map `formationsData` (URL = /formations/{slug}). */
export function getFormationCoursePageJsonLd(
  path: FormationCatalogEntry['path']
): Record<string, unknown> | null {
  const slug = path.replace(/^\/formations\//, '').replace(/\/$/, '');
  return getCourseJsonLdFromFormationsData(slug);
}

/** Fiches catalogue prioritaires — Course JSON-LD enrichi (références @id organisation / formatrice, offre, avis). */
export const DEDICATED_FORMATION_COURSE_PATHS = [
  '/formations/ia-batiment-travaux-publics',
  '/formations/ia-btp-paris',
  '/formations/ia-appels-offre-btp',
  '/formations/formation-ia-cctp-analyse-dce-btp',
] as const;

export type DedicatedFormationCoursePath = (typeof DEDICATED_FORMATION_COURSE_PATHS)[number];

const PARIS_FORMATION_DEDICATED = {
  name: 'Formation IA pour le BTP à Paris',
  description:
    'Formation de 4 h pour professionnels du BTP en Île-de-France : devis, chiffrages, ChatGPT. Paris (75) et huit départements. Qualiopi · Constructys.',
  educationalLevel: 'Débutant' as const,
  /** Aligné BTP-01 (débutant). */
  priceHt: tarifHtDepuisBadgeCatalogue('DÉBUTANT'),
  teaches: [
    'Devis et chiffrage assistés par l’IA pour le BTP',
    'Emails professionnels et suivi client en Île-de-France',
    'Automatisation de l’administratif chantier avec ChatGPT',
  ],
};

function niveauCatalogueToFr(level: NiveauCatalogue): 'Débutant' | 'Avancé' {
  return level === 'DÉBUTANT' ? 'Débutant' : 'Avancé';
}

function buildDedicatedFormationCourseObject(opts: {
  courseUrl: string;
  name: string;
  description: string;
  educationalLevel: string;
  priceString: string;
  teaches: [string, string, string];
  organizationId: string;
  laurePersonId: string;
}): Record<string, unknown> {
  const {
    courseUrl,
    name,
    description,
    educationalLevel,
    priceString,
    teaches,
    organizationId,
    laurePersonId,
  } = opts;
  return {
    '@context': 'https://schema.org',
    '@type': 'Course',
    '@id': `${courseUrl}#course`,
    url: courseUrl,
    name,
    description,
    provider: { '@id': organizationId },
    instructor: { '@id': laurePersonId },
    educationalLevel,
    inLanguage: 'fr-FR',
    timeRequired: DURATION_ISO,
    courseMode: [...COURSE_MODES],
    hasCourseInstance: {
      '@type': 'CourseInstance',
      courseMode: [...COURSE_MODES],
      location: { '@type': 'Place', name: 'Île-de-France' },
      courseWorkload: DURATION_ISO,
    },
    offers: {
      '@type': 'Offer',
      price: priceString,
      priceCurrency: 'EUR',
      availability: 'https://schema.org/InStock',
      category: 'Formation professionnelle continue — financement possible selon éligibilité',
    },
    teaches: [...teaches],
  };
}

/**
 * Course dédiée pour les fiches formation listées (provider / instructor en @id).
 */
export function getDedicatedFormationCoursePageJsonLd(
  path: DedicatedFormationCoursePath
): Record<string, unknown> {
  const base = SITE_CONFIG.url.replace(/\/$/, '');
  const organizationId = `${base}/#organization`;
  const laurePersonId = `${base}/#laure`;

  if (path === '/formations/ia-btp-paris') {
    return buildDedicatedFormationCourseObject({
      courseUrl: `${base}${path}`,
      name: PARIS_FORMATION_DEDICATED.name,
      description: PARIS_FORMATION_DEDICATED.description,
      educationalLevel: PARIS_FORMATION_DEDICATED.educationalLevel,
      priceString: String(PARIS_FORMATION_DEDICATED.priceHt),
      teaches: [
        PARIS_FORMATION_DEDICATED.teaches[0],
        PARIS_FORMATION_DEDICATED.teaches[1],
        PARIS_FORMATION_DEDICATED.teaches[2],
      ],
      organizationId,
      laurePersonId,
    });
  }

  if (path === '/formations/formation-ia-cctp-analyse-dce-btp') {
    const price = tarifHtDepuisBadgeCatalogue('AVANCÉ');
    return buildDedicatedFormationCourseObject({
      courseUrl: `${base}${path}`,
      name: 'Formation IA analyse CCTP & DCE pour entreprises BTP',
      description:
        'Session 4 h : analyser CCTP, DPGF et DCE avec l’IA, détecter les risques et préparer un mémoire technique aligné. Qualiopi, financement possible selon éligibilité (Constructys ou OPCO).',
      educationalLevel: 'Avancé',
      priceString: String(price),
      teaches: [
        'Structurer la lecture d’un CCTP et d’un DCE avec l’IA sans perdre le contrôle',
        'Croiser exigences techniques, DPGF et critères du CCAP pour cadrer le chiffrage',
        'Créer prompts, projets et assistants réutilisables pour les réponses aux marchés',
      ],
      organizationId,
      laurePersonId,
    });
  }

  const entry = FORMATIONS_CATALOG_SCHEMA.find((e) => e.path === path);
  if (!entry) {
    throw new Error(`getDedicatedFormationCoursePageJsonLd: chemin inconnu ${path}`);
  }

  const price = tarifHtDepuisBadgeCatalogue(entry.level);
  const teaches3 = entry.teaches.slice(0, 3);
  if (teaches3.length < 3) {
    throw new Error(`getDedicatedFormationCoursePageJsonLd: pas assez de compétences "teaches" pour ${path}`);
  }

  return buildDedicatedFormationCourseObject({
    courseUrl: `${base}${entry.path}`,
    name: entry.name,
    description: entry.description,
    educationalLevel: niveauCatalogueToFr(entry.level),
    priceString: String(price),
    teaches: [teaches3[0]!, teaches3[1]!, teaches3[2]!],
    organizationId,
    laurePersonId,
  });
}
