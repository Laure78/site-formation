/**
 * JSON-LD FAQ + Course — fiches catalogue (aligné sur le rendu `TrainingPageTemplate`).
 */
import type { FormationCode } from '@/data/formations';
import type { FAQItem } from '@/lib/faq';
import { mergeCatalogueFormationFaq } from '@/lib/catalogue-formation-faq';
import { buildCatalogueCourseJsonLdByRef } from '@/lib/schema-catalogue-course-jsonld';
import { getFAQSchema } from '@/lib/seo';

/** FAQ visible sur la fiche = noyau catalogue + questions métier (sans doublon). */
export function getCatalogueFormationVisibleFaq(
  ref: FormationCode,
  metierFaq: readonly FAQItem[] = [],
): FAQItem[] {
  return mergeCatalogueFormationFaq(ref, metierFaq);
}

/** FAQPage JSON-LD — mêmes Q/R que l’accordéon visible (texte brut des réponses HTML). */
export function buildCatalogueFormationFaqPageJsonLd(
  ref: FormationCode,
  metierFaq: readonly FAQItem[] = [],
  options?: { includeCore?: boolean },
): Record<string, unknown> | null {
  const items =
    options?.includeCore === false ? [...metierFaq] : getCatalogueFormationVisibleFaq(ref, metierFaq);
  return getFAQSchema(items);
}

/** Course JSON-LD catalogue par référence NIV. */
export function buildCatalogueFormationCoursePageJsonLd(
  ref: FormationCode,
): Record<string, unknown> {
  return buildCatalogueCourseJsonLdByRef(ref);
}
