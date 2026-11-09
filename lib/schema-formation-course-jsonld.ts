/**
 * JSON-LD `Course` — champs communs pour toutes les fiches formation.
 * Présentiel uniquement (Onsite), zone Île-de-France, durée 4 h, intra-entreprise.
 */
import { SCHEMA_PUBLIC_SITE_URL } from '@/lib/schema-constants';
import {
  SITE,
  SITE_AREA_SERVED_LABEL,
  siteProviderIdentifierSchema,
  siteSchemaOrganizationId,
} from '@/lib/site-config';

export const FORMATION_COURSE_DURATION_ISO = 'PT4H';
/** Schema.org / Google — présentiel (jamais « online »). */
export const FORMATION_COURSE_MODE_ONSITE = 'Onsite';
export const FORMATION_COURSE_AREA_IDF = SITE_AREA_SERVED_LABEL;
/** Langue des formations — JSON-LD fiches catalogue (Schema.org). */
export const FORMATION_COURSE_IN_LANGUAGE = 'fr';
/** Qualiopi — libellé court pour Course.educationalCredentialAwarded. */
export const FORMATION_COURSE_CREDENTIAL_AWARDED = 'Certificat de réalisation';
/** Catégorie tarif inter-entreprises (JSON-LD `Offer.category`). */
export const FORMATION_COURSE_OFFER_CATEGORY = 'Inter-entreprises';

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

/** Place Île-de-France — CourseInstance.location. */
export function buildFormationCourseInstanceLocation(): Record<string, unknown> {
  return {
    '@type': 'Place',
    name: FORMATION_COURSE_AREA_IDF,
    address: {
      '@type': 'PostalAddress',
      addressRegion: FORMATION_COURSE_AREA_IDF,
      addressCountry: 'FR',
    },
  };
}

/** Offre inter — prix HT par participant (parcours ou fiche catalogue). */
export function buildFormationCourseInterOffer(
  courseUrl: string,
  priceHt: number,
  description = 'Tarif inter-entreprises HT par participant',
): Record<string, unknown> {
  return {
    '@type': 'Offer',
    price: priceHt,
    priceCurrency: 'EUR',
    category: FORMATION_COURSE_OFFER_CATEGORY,
    availability: 'https://schema.org/PreOrder',
    url: courseUrl,
    priceSpecification: {
      '@type': 'PriceSpecification',
      price: priceHt,
      priceCurrency: 'EUR',
      valueAddedTaxIncluded: false,
      description,
    },
  };
}

/** Instance CourseInstance — inter-entreprises, présentiel IDF uniquement. */
export function buildFormationCourseInstances(
  duration: string = FORMATION_COURSE_DURATION_ISO,
  instanceName = 'Session inter-entreprises — présentiel',
): Record<string, unknown>[] {
  return [
    {
      '@type': 'CourseInstance',
      name: instanceName,
      courseMode: FORMATION_COURSE_MODE_ONSITE,
      courseWorkload: duration,
      inLanguage: FORMATION_COURSE_IN_LANGUAGE,
      location: buildFormationCourseInstanceLocation(),
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
  const organizationId = input.organizationId ?? siteSchemaOrganizationId(base);
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
      name: SITE.raisonSociale,
      url: base,
      identifier: (() => {
        const id = siteProviderIdentifierSchema();
        return { '@type': 'PropertyValue', name: id.name, value: id.value };
      })(),
    },
    inLanguage: FORMATION_COURSE_IN_LANGUAGE,
    educationalCredentialAwarded: FORMATION_COURSE_CREDENTIAL_AWARDED,
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

export type AssertFormationFicheCourseOptions = {
  /** Durée ISO attendue (ex. PT7H). Par défaut : `course.timeRequired`. */
  timeRequired?: string;
};

/** Assertions partagées — scripts de validation et tests. */
export function assertFormationFicheCourseSchema(
  course: Record<string, unknown>,
  label: string,
  options: AssertFormationFicheCourseOptions = {},
): void {
  const expectedDuration =
    options.timeRequired ??
    (typeof course.timeRequired === 'string' ? course.timeRequired : FORMATION_COURSE_DURATION_ISO);
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
  if (course.inLanguage !== FORMATION_COURSE_IN_LANGUAGE) {
    throw new Error(`${label}: inLanguage doit être « ${FORMATION_COURSE_IN_LANGUAGE} »`);
  }
  if (course.timeRequired !== expectedDuration) {
    throw new Error(`${label}: timeRequired ${String(course.timeRequired)} — attendu ${expectedDuration}`);
  }
  if (course.educationalCredentialAwarded !== FORMATION_COURSE_CREDENTIAL_AWARDED) {
    throw new Error(
      `${label}: educationalCredentialAwarded doit être « ${FORMATION_COURSE_CREDENTIAL_AWARDED} »`
    );
  }

  const provider = course.provider;
  if (!provider || typeof provider !== 'object') {
    throw new Error(`${label}: provider manquant`);
  }
  const providerName =
    'name' in provider ? String((provider as { name: unknown }).name) : '';
  if (providerName !== SITE.raisonSociale) {
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
  if (instances.length < 1) {
    throw new Error(`${label}: hasCourseInstance doit contenir au moins 1 instance`);
  }
  for (const [i, inst] of instances.entries()) {
    if (inst.courseMode !== FORMATION_COURSE_MODE_ONSITE) {
      throw new Error(`${label}: instance ${i + 1} — courseMode Onsite requis`);
    }
    if (inst.courseWorkload !== expectedDuration) {
      throw new Error(
        `${label}: instance ${i + 1} — courseWorkload ${String(inst.courseWorkload)} — attendu ${expectedDuration}`,
      );
    }
    if (inst.inLanguage !== FORMATION_COURSE_IN_LANGUAGE) {
      throw new Error(`${label}: instance ${i + 1} — inLanguage « ${FORMATION_COURSE_IN_LANGUAGE} » requis`);
    }
    const instName = typeof inst.name === 'string' ? inst.name : '';
    if (!instName.toLowerCase().includes('présentiel')) {
      throw new Error(`${label}: instance ${i + 1} — libellé présentiel attendu`);
    }
    const loc = inst.location;
    const placeName =
      loc && typeof loc === 'object' && 'name' in loc ? String((loc as { name: unknown }).name) : '';
    if (!placeName.includes(FORMATION_COURSE_AREA_IDF)) {
      throw new Error(`${label}: instance ${i + 1} — location Place Île-de-France requise`);
    }
  }

  const offers = course.offers;
  if (offers && typeof offers === 'object' && !Array.isArray(offers)) {
    const offer = offers as Record<string, unknown>;
    if (offer['@type'] !== 'Offer') {
      throw new Error(`${label}: offers.@type Offer requis`);
    }
    if (offer.priceCurrency !== 'EUR') {
      throw new Error(`${label}: offers.priceCurrency EUR requis`);
    }
    if (offer.category !== FORMATION_COURSE_OFFER_CATEGORY) {
      throw new Error(
        `${label}: offers.category « ${FORMATION_COURSE_OFFER_CATEGORY} » requis (${String(offer.category)})`,
      );
    }
  }

  const serialized = JSON.stringify(course);
  for (const pattern of FORBIDDEN_MODE_PATTERNS) {
    if (pattern.test(serialized)) {
      throw new Error(`${label}: mode distanciel / hybride interdit détecté`);
    }
  }
}
