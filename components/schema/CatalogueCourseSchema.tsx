import { JsonLd } from '@/components/JsonLd';
import {
  buildCatalogueCourseIaAppelsOffreNiv02JsonLd,
  buildCatalogueCourseIaBtpNiv01JsonLd,
  buildCatalogueCourseJsonLd,
  type CatalogueCourseJsonLdConfig,
} from '@/lib/schema-catalogue-course-jsonld';

type CatalogueCourseSchemaProps = {
  config: CatalogueCourseJsonLdConfig;
  /** Surcharge optionnelle de la description (meta / chapô page). */
  description?: string;
};

/** Composant générique — JSON-LD `Course` catalogue (NIV-01 / NIV-02). */
export function CatalogueCourseSchema({ config, description }: CatalogueCourseSchemaProps) {
  const schema = buildCatalogueCourseJsonLd(config);
  if (description?.trim()) {
    schema.description = description.trim();
  }
  const scriptId = `schema-course-${config.courseCode.toLowerCase()}`;
  return <JsonLd id={scriptId} schema={schema} />;
}

/**
 * Formation NIV-01 — L'IA au service des professionnels du BTP.
 * À injecter dans le layout ou la page `/formations/ia-batiment-travaux-publics`.
 */
export function FormationIaBatimentTravauxPublicsCourseSchema({
  description,
}: {
  description?: string;
} = {}) {
  const schema = buildCatalogueCourseIaBtpNiv01JsonLd();
  if (description?.trim()) {
    schema.description = description.trim();
  }
  return <JsonLd id="schema-course-niv-01" schema={schema} />;
}

/**
 * Formation NIV-02 — L'IA appliquée aux appels d'offres BTP.
 * À injecter dans le layout ou la page `/formations/ia-appels-offre-btp`.
 */
export function FormationIaAppelsOffreBtpCourseSchema({
  description,
}: {
  description?: string;
} = {}) {
  const schema = buildCatalogueCourseIaAppelsOffreNiv02JsonLd();
  if (description?.trim()) {
    schema.description = description.trim();
  }
  return <JsonLd id="schema-course-niv-02" schema={schema} />;
}
