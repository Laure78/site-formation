/**
 * Facade Schema.org — Organization, Person, Course, AggregateRating.
 *
 * Sources uniques (ne pas dupliquer les faits ici) :
 * - Organization / Person layout → `lib/schema-organization-global.ts`, `GlobalSiteJsonLd`
 * - Course fiches → `lib/schema-course-formations.ts` + `lib/data/formations.ts`
 * - AggregateRating → `lib/schema-aggregate-rating.ts` + `lib/data/indicateurs-resultats.ts`
 *
 * Toute modification de tarif / durée → `lib/data/formations.ts` + `public/llms.txt`.
 */
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
