/**
 * Facade Schema.org — point d’entrée unique pour le layout et les fiches.
 *
 * Organisation / Person : nœuds complets **une seule fois** dans `app/layout.tsx` (`GlobalSiteJsonLd`).
 * Les `Course` référencent `#organization` par `@id` (`buildSchemaOrganizationReference` / provider minimal).
 *
 * Sources de vérité : `lib/site-config.ts`, `lib/schema-constants.ts`, `lib/schema-layout-root-graph.ts`.
 */
export {
  buildSchemaOrganizationReference,
  buildSiteAProposPersonSchemaNode,
  buildSiteLayoutEducationalOrganizationNode,
  siteSchemaOrganizationId,
  siteSchemaPersonId,
  SITE_PERSON_JOB_TITLE,
} from '@/lib/site-config';

export {
  buildLayoutEducationalOrganizationJsonLdNode,
  buildLayoutRootJsonLdGraph,
} from '@/lib/schema-layout-root-graph';

export { buildGlobalSiteJsonLdGraph } from '@/lib/schema-global-site-graph';

export { buildPersonLaureSchemaNode } from '@/lib/schema-person-global';
export { buildOrganizationOfcSchemaNode } from '@/lib/schema-organization-global';
export { buildSchemaAggregateRating } from '@/lib/schema-aggregate-rating';
export {
  getFormationCoursePageJsonLd,
  getCourseJsonLdFromFormationsData,
  getFormationsCatalogJsonLd,
} from '@/lib/schema-course-formations';
export {
  FORMATIONS_CATALOGUE,
  getFormationCatalogueByCode,
  getFormationCatalogueBySlug,
  type FormationCatalogueEntry,
} from '@/lib/data/formations';
export {
  indicateursResultats,
  formatNoteSatisfactionSur5,
} from '@/lib/data/indicateurs-resultats';