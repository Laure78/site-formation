import Script from 'next/script';
import type { FormationCatalogEntry } from '@/lib/schema-course-formations';
import { buildCatalogFormationCoursePageSchema } from '@/lib/catalog-formation-course-page-jsonld';

type Props = {
  entry: FormationCatalogEntry;
  /** Meta description ou chapô (sinon description du catalogue `entry`). */
  pageDescription?: string;
};

/** Un seul bloc Course + Offer par fiche catalogue — évite le doublon avec d’anciens JsonLd Course. */
export function CatalogFormationCourseScript({ entry, pageDescription }: Props) {
  const schema = buildCatalogFormationCoursePageSchema(entry, pageDescription);
  const id = `course-schema-${entry.ref.toLowerCase().replace(/\s+/g, '')}`;

  return (
    <Script
      id={id}
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
