import { SITE_CONFIG, getCourseSchema, getLocalBusinessSchema, getOrganizationSchema } from '@/lib/seo';
import { getPillarPageContentUpdatedAt } from '@/lib/content-updated-at';
import {
  IDF_COURSE_AREA_SERVED_NAMES,
  IDF_DEPT_AREA_SERVED_LABELS,
  buildIdfAreaServedSchemaEntities,
} from '@/lib/schema-constants';
import { formationHref, getFormationByCode } from '@/data/formations';

export { IDF_COURSE_AREA_SERVED_NAMES, IDF_DEPT_AREA_SERVED_LABELS };

/**
 * Course JSON-LD aligné sur la fiche catalogue NIV-01 (landings géo / métier / département).
 * Ne jamais passer un `name` / `path` local : l’action certifiée reste NIV-01.
 */
export function buildFormationIaCourseJsonLd(opts?: {
  areaServed?: string[];
}) {
  const catalogue = getFormationByCode('NIV-01')!;
  return getCourseSchema({
    name: catalogue.titre,
    description: catalogue.accroche,
    path: formationHref(catalogue),
    providerName: SITE_CONFIG.legalName,
    instructorName: SITE_CONFIG.name,
    courseCode: catalogue.code,
    teaches: catalogue.objectifs?.length
      ? catalogue.objectifs
      : [
          'ChatGPT',
          'Claude AI',
          'Formation IA pour les pros du BTP',
          'Rédaction de devis et mémoires techniques',
          'Automatisation administrative chantier',
        ],
    areaServed: opts?.areaServed ?? ['Île-de-France', 'France'],
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

/** WebPage pilier IDF — dateModified alignée sur `PILLAR_PAGE_CONTENT_UPDATED_AT`. */
export function getFormationIleDeFrancePageWebPageJsonLd(): Record<string, unknown> {
  const pageUrl = `${SITE_CONFIG.url}${FORMATION_IDF_PATH}`;
  return {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    '@id': `${pageUrl}#webpage`,
    url: pageUrl,
    name: 'Formation IA pour le bâtiment et la construction en Île-de-France',
    inLanguage: 'fr-FR',
    isPartOf: { '@id': `${SITE_CONFIG.url.replace(/\/$/, '')}/#website` },
    datePublished: '2024-06-01',
    dateModified: getPillarPageContentUpdatedAt('/formation-ia-btp-ile-de-france'),
    primaryImageOfPage: `${SITE_CONFIG.url}/images/formation-ia-btp-laure-olivie-ile-de-france.webp`,
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
