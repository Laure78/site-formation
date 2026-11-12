import { JsonLd } from '@/components/JsonLd';
import { TrainingNiv11MaquetteTemplate } from '@/components/formations/training/TrainingNiv11MaquetteTemplate';
import { FAQ_AMO_NIV11 } from '@/lib/catalogue-formation-faq-niv11';
import { buildCatalogueFormationCoursePageJsonLd, buildCatalogueFormationFaqPageJsonLd } from '@/lib/catalogue-formation-page-jsonld';
import { createPageMetadata, SITE_CONFIG } from '@/lib/seo';
import { getFormationCatalogueVisuel } from '@/lib/formations-catalogue-display';
import { LINKS } from '@/lib/internal-links';
import { getFormationCatalogueSeo } from '@/lib/formation-catalogue-seo';
import { getCatalogueFormationPageContent } from '@/lib/catalogue-formation-page-content';

const CATALOGUE_SEO = getFormationCatalogueSeo('NIV-11');
const CATALOGUE_VISUEL = getFormationCatalogueVisuel('NIV-11');
const PAGE_CONTENT = getCatalogueFormationPageContent('NIV-11');

export const metadata = createPageMetadata({
  title: CATALOGUE_SEO.metaTitle,
  titleAbsolute: `${CATALOGUE_SEO.metaTitle} | Laure Olivié`,
  description: CATALOGUE_SEO.metaDescription,
  descriptionFinal: true,
  path: LINKS.formationIaAssistanceMaitriseOuvrage,
  openGraphType: 'website',
  openGraphTitle: 'Formation IA assistance à maîtrise d\'ouvrage (AMO) — organisme certifié Qualiopi',
  openGraphDescription: CATALOGUE_SEO.metaDescription,
  alternatesLanguages: { 'fr-FR': `${SITE_CONFIG.url}${LINKS.formationIaAssistanceMaitriseOuvrage}` },
  image: {
    url: CATALOGUE_VISUEL.src,
    width: CATALOGUE_VISUEL.width,
    height: CATALOGUE_VISUEL.height,
    alt: CATALOGUE_VISUEL.alt,
  },
});

const courseSchema = buildCatalogueFormationCoursePageJsonLd('NIV-11');
const faqSchema = buildCatalogueFormationFaqPageJsonLd('NIV-11', FAQ_AMO_NIV11, {
  includeCore: false,
});

export default async function FormationIaAssistanceMaitriseOuvragePage() {
  return (
    <div>
      <JsonLd id="schema-course-niv-11" schema={courseSchema} />
      {faqSchema ? <JsonLd id="schema-faq-niv-11" schema={faqSchema} /> : null}

      <TrainingNiv11MaquetteTemplate
        content={PAGE_CONTENT}
        faqItems={FAQ_AMO_NIV11}
        faqSectionId="faq-niv-11"
        h1Id="formation-amo-h1"
      />
    </div>
  );
}
