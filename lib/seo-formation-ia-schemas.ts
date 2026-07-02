import { SITE_CONFIG, getCourseSchema, getLocalBusinessSchema, getOrganizationSchema } from '@/lib/seo';
import {
  IDF_COURSE_AREA_SERVED_NAMES,
  IDF_DEPT_AREA_SERVED_LABELS,
  buildIdfAreaServedSchemaEntities,
} from '@/lib/schema-constants';

export { IDF_COURSE_AREA_SERVED_NAMES, IDF_DEPT_AREA_SERVED_LABELS };
export function buildFormationIaCourseJsonLd(opts: {
  name: string;
  description: string;
  path: string;
  areaServed?: string[];
}) {
  return getCourseSchema({
    name: opts.name,
    description: opts.description,
    path: opts.path,
    providerName: SITE_CONFIG.legalName,
    instructorName: SITE_CONFIG.name,
    teaches: [
      'ChatGPT',
      'Claude AI',
      'Formation IA pour les pros du BTP',
      'Rédaction de devis et mémoires techniques',
      'Automatisation administrative chantier',
    ],
    areaServed: opts.areaServed ?? ['Île-de-France', 'France'],
    educationalLevel: 'Professionnel',
    timeRequired: 'PT4H',
  });
}

/** LocalBusiness renforcé : zone Île-de-France */
export function buildFormationIaLocalBusinessJsonLd() {
  const base = getLocalBusinessSchema() as Record<string, unknown>;
  return {
    ...base,
    name: `${SITE_CONFIG.legalName} — ${SITE_CONFIG.name}`,
    areaServed: buildIdfAreaServedSchemaEntities(),
  };
}

const FORMATION_IDF_PATH = '/formation-ia-btp-ile-de-france';

/**
 * Page pilier Île-de-France — LocalBusiness dédié avec URL canonique et tous les départements en areaServed.
 */
export function getFormationIleDeFrancePageLocalBusinessJsonLd(): Record<string, unknown> {
  const base = buildFormationIaLocalBusinessJsonLd();
  return {
    ...base,
    '@id': `${SITE_CONFIG.url}${FORMATION_IDF_PATH}#localbusiness-idf`,
    url: `${SITE_CONFIG.url}${FORMATION_IDF_PATH}`,
    name: `${SITE_CONFIG.legalName} — Formation IA appliquée au bâtiment Île-de-France`,
    description:
      'Formation IA pour le BTP en Île-de-France : ChatGPT et Claude AI pour entreprises du bâtiment et des travaux publics. Sessions 4 h en présentiel, Qualiopi, financement OPCO Constructys. Paris, Yvelines, 8 départements.',
  };
}

/** Organisation certifiée Qualiopi (schéma déjà porté par getOrganizationSchema) */
export function buildEducationalOrgSnippetJsonLd() {
  return getOrganizationSchema();
}

/**
 * Service — complète le Course sur les pages « formation IA pour les pros du BTP » par département (zone d’intervention).
 */
export function buildFormationIaServiceJsonLd(opts: {
  name: string;
  description: string;
  path: string;
  areaServed: string[];
}): Record<string, unknown> {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: opts.name,
    description: opts.description,
    serviceType: 'Formation professionnelle',
    category: 'Formation IA appliquée au bâtiment',
    provider: {
      '@type': 'Organization',
      '@id': `${SITE_CONFIG.url}/#organization`,
      name: SITE_CONFIG.legalName,
    },
    areaServed: opts.areaServed.map((name) => ({ '@type': 'AdministrativeArea', name })),
    url: `${SITE_CONFIG.url}${opts.path}`,
  };
}

/**
 * LocalBusiness par page département — zone d’intervention principale = département (SEO local).
 */
export function buildFormationIaDeptPageLocalBusinessJsonLd(opts: {
  path: string;
  departementNom: string;
  deptCode: string;
  description: string;
}): Record<string, unknown> {
  const base = getLocalBusinessSchema() as Record<string, unknown>;
  const deptLabel = `${opts.departementNom} (${opts.deptCode})`;
  return {
    ...base,
    '@id': `${SITE_CONFIG.url}${opts.path}#localbusiness-dept-${opts.deptCode}`,
    url: `${SITE_CONFIG.url}${opts.path}`,
    name: `${SITE_CONFIG.legalName} — Formation IA pour le BTP ${deptLabel}`,
    description: opts.description,
    areaServed: [
      { '@type': 'AdministrativeArea', name: deptLabel },
      { '@type': 'State', name: 'Île-de-France' },
      { '@type': 'Country', name: 'France' },
    ],
  };
}
