/**
 * JSON-LD `Course` — champs communs pour toutes les fiches formation.
 * Présentiel uniquement (Onsite), zone Île-de-France, durée 4 h, intra / inter.
 */
import {
  SCHEMA_ORGANIZATION_OFC,
  SCHEMA_PUBLIC_SITE_URL,
} from '@/lib/schema-constants';

export const FORMATION_COURSE_DURATION_ISO = 'PT4H';
export const FORMATION_COURSE_MODE_ONSITE = 'Onsite';
export const FORMATION_COURSE_AREA_IDF = 'Île-de-France';

const FORBIDDEN_MODE_PATTERNS = [
  /\bBlended\b/i,
  /\bonline\b/i,
  /\bdistance\b/i,
  /\bremote\b/i,
  /\bhybrid\b/i,
  /"courseMode"\s*:\s*"onsite"/,
  /"courseMode"\s*:\s*\[\s*"onsite"/,
];

export type FormationFicheCourseJsonLdInput = {
  name: string;
  description: string;
  path: string;
  url?: string;
  courseId?: string;
  organizationId?: string;
  instructorId?: string;
  instructorName?: string;
  educationalLevel?: string;
  teaches?: string[];
  courseCode?: string;
  timeRequired?: string;
  /** Mots-clés GEO — inclure bâtiment / construction lorsque pertinent. */
  keywords?: string;
};

/** Keywords Course par défaut — bâtiment + construction (GEO). */
export const FORMATION_COURSE_KEYWORDS_DEFAULT =
  'formation IA BTP, bâtiment, construction, travaux publics, ChatGPT, Claude AI';


export function buildFormationCourseIdfPlace(locationDetail?: string): Record<string, unknown> {
  const name = locationDetail
    ? `${FORMATION_COURSE_AREA_IDF} — ${locationDetail}`
    : FORMATION_COURSE_AREA_IDF;
  return {
    '@type': 'Place',
    name,
    address: {
      '@type': 'PostalAddress',
      addressRegion: FORMATION_COURSE_AREA_IDF,
      addressCountry: 'FR',
    },
  };
}

export function buildFormationCourseAreaServed(): Record<string, unknown> {
  return {
    '@type': 'AdministrativeArea',
    name: FORMATION_COURSE_AREA_IDF,
  };
}

/** Deux instances : intra-entreprise et inter-entreprises, présentiel IDF (courseMode Onsite, PT4H). */
export function buildFormationCourseInstances(
  duration: string = FORMATION_COURSE_DURATION_ISO
): Record<string, unknown>[] {
  return [
    {
      '@type': 'CourseInstance',
      name: 'Session intra-entreprise — présentiel',
      courseMode: FORMATION_COURSE_MODE_ONSITE,
      courseWorkload: duration,
      inLanguage: 'fr',
      location: {
        '@type': 'Place',
        name: 'Île-de-France (intra ou inter)',
        address: {
          '@type': 'PostalAddress',
          addressRegion: FORMATION_COURSE_AREA_IDF,
          addressCountry: 'FR',
        },
      },
    },
    {
      '@type': 'CourseInstance',
      name: 'Session inter-entreprises — présentiel',
      courseMode: FORMATION_COURSE_MODE_ONSITE,
      courseWorkload: duration,
      inLanguage: 'fr',
      location: {
        '@type': 'Place',
        name: 'Île-de-France (intra ou inter)',
        address: {
          '@type': 'PostalAddress',
          addressRegion: FORMATION_COURSE_AREA_IDF,
          addressCountry: 'FR',
        },
      },
    },
  ];
}

/** Nœud Course (sans @context) — pour @graph ou ItemList. */
export function buildFormationFicheCourseNode(
  input: FormationFicheCourseJsonLdInput
): Record<string, unknown> {
  const base = SCHEMA_PUBLIC_SITE_URL.replace(/\/$/, '');
  const normalizedPath = input.path.startsWith('/') ? input.path : `/${input.path}`;
  const courseUrl = input.url ?? `${base}${normalizedPath}`;
  const organizationId = input.organizationId ?? `${base}/#organization`;
  const duration = input.timeRequired ?? FORMATION_COURSE_DURATION_ISO;

  const node: Record<string, unknown> = {
    '@type': 'Course',
    '@id': input.courseId ?? `${courseUrl}#course`,
    name: input.name,
    description: input.description,
    url: courseUrl,
    courseMode: FORMATION_COURSE_MODE_ONSITE,
    locationCreated: buildFormationCourseIdfPlace(),
    areaServed: buildFormationCourseAreaServed(),
    provider: {
      '@type': 'Organization',
      '@id': organizationId,
      name: SCHEMA_ORGANIZATION_OFC.name,
      url: base,
    },
    inLanguage: 'fr',
    timeRequired: duration,
    keywords: input.keywords ?? FORMATION_COURSE_KEYWORDS_DEFAULT,
    hasCourseInstance: buildFormationCourseInstances(duration),
  };

  if (input.instructorId) {
    node.instructor = { '@id': input.instructorId };
  } else if (input.instructorName) {
    node.instructor = {
      '@type': 'Person',
      '@id': `${base}/#laure-olivie`,
      name: input.instructorName,
    };
  }

  if (input.educationalLevel) node.educationalLevel = input.educationalLevel;
  if (input.teaches?.length) node.teaches = input.teaches;
  if (input.courseCode) node.courseCode = input.courseCode;

  return node;
}

/** Objet JSON-LD Course complet (avec @context). */
export function buildFormationFicheCourseJsonLd(
  input: FormationFicheCourseJsonLdInput
): Record<string, unknown> {
  return {
    '@context': 'https://schema.org',
    ...buildFormationFicheCourseNode(input),
  };
}

function areaServedName(areaServed: unknown): string | null {
  if (!areaServed) return null;
  if (typeof areaServed === 'string') return areaServed;
  if (Array.isArray(areaServed)) {
    const idf = areaServed.find(
      (a) => a && typeof a === 'object' && 'name' in a && a.name === FORMATION_COURSE_AREA_IDF
    );
    return idf && typeof idf === 'object' && 'name' in idf ? String(idf.name) : null;
  }
  if (typeof areaServed === 'object' && areaServed !== null && 'name' in areaServed) {
    return String((areaServed as { name: unknown }).name);
  }
  return null;
}

function locationCreatedName(locationCreated: unknown): string | null {
  if (!locationCreated || typeof locationCreated !== 'object' || !('name' in locationCreated)) {
    return null;
  }
  return String((locationCreated as { name: unknown }).name);
}

function collectCourseInstances(hasCourseInstance: unknown): Record<string, unknown>[] {
  if (!hasCourseInstance) return [];
  if (Array.isArray(hasCourseInstance)) {
    return hasCourseInstance.filter(
      (i): i is Record<string, unknown> => typeof i === 'object' && i !== null
    );
  }
  if (typeof hasCourseInstance === 'object') {
    return [hasCourseInstance as Record<string, unknown>];
  }
  return [];
}

/** Assertions partagées — scripts de validation et tests. */
export function assertFormationFicheCourseSchema(
  course: Record<string, unknown>,
  label: string
): void {
  if (course['@type'] !== 'Course') {
    throw new Error(`${label}: @type Course attendu`);
  }
  if (!course.name || typeof course.name !== 'string') {
    throw new Error(`${label}: name manquant`);
  }
  if (!course.description || typeof course.description !== 'string') {
    throw new Error(`${label}: description manquante`);
  }
  if (course.courseMode !== FORMATION_COURSE_MODE_ONSITE) {
    throw new Error(`${label}: courseMode doit être « ${FORMATION_COURSE_MODE_ONSITE} »`);
  }

  const provider = course.provider;
  if (!provider || typeof provider !== 'object') {
    throw new Error(`${label}: provider manquant`);
  }
  const providerName =
    'name' in provider ? String((provider as { name: unknown }).name) : '';
  if (providerName !== SCHEMA_ORGANIZATION_OFC.name) {
    throw new Error(`${label}: provider.name incorrect (${providerName})`);
  }

  const locName = locationCreatedName(course.locationCreated);
  if (!locName?.includes(FORMATION_COURSE_AREA_IDF)) {
    throw new Error(`${label}: locationCreated doit mentionner ${FORMATION_COURSE_AREA_IDF}`);
  }

  if (areaServedName(course.areaServed) !== FORMATION_COURSE_AREA_IDF) {
    throw new Error(`${label}: areaServed doit être ${FORMATION_COURSE_AREA_IDF}`);
  }

  const instances = collectCourseInstances(course.hasCourseInstance);
  if (instances.length < 2) {
    throw new Error(`${label}: hasCourseInstance doit contenir au moins 2 instances (intra + inter)`);
  }
  for (const [i, inst] of instances.entries()) {
    if (inst.courseMode !== FORMATION_COURSE_MODE_ONSITE) {
      throw new Error(`${label}: instance ${i + 1} — courseMode Onsite requis`);
    }
    if (inst.courseWorkload !== FORMATION_COURSE_DURATION_ISO) {
      throw new Error(`${label}: instance ${i + 1} — courseWorkload ${FORMATION_COURSE_DURATION_ISO} requis`);
    }
    const instName = typeof inst.name === 'string' ? inst.name : '';
    if (!instName.toLowerCase().includes('présentiel')) {
      throw new Error(`${label}: instance ${i + 1} — libellé présentiel attendu`);
    }
  }

  const serialized = JSON.stringify(course);
  for (const pattern of FORBIDDEN_MODE_PATTERNS) {
    if (pattern.test(serialized)) {
      throw new Error(`${label}: mode distanciel / hybride interdit détecté`);
    }
  }
}
