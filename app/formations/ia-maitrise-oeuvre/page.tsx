import { JsonLd } from '@/components/JsonLd';
import { CatalogueFormationPageTemplate } from '@/components/formations/catalogue/CatalogueFormationPageTemplate';
import { buildCatalogueFormationCoursePageJsonLd, buildCatalogueFormationFaqPageJsonLd } from '@/lib/catalogue-formation-page-jsonld';
import { createPageMetadata, SITE_CONFIG } from '@/lib/seo';
import { getFormationCatalogueVisuel } from '@/lib/formations-catalogue-display';
import { LINKS } from '@/lib/internal-links';
import { getFormationCatalogueSeo } from '@/lib/formation-catalogue-seo';
import { getCatalogueFormationPageContent } from '@/lib/catalogue-formation-page-content';

const CATALOGUE_SEO = getFormationCatalogueSeo('NIV-05');
const CATALOGUE_VISUEL = getFormationCatalogueVisuel('NIV-05');
const PAGE_CONTENT = getCatalogueFormationPageContent('NIV-05');

export const metadata = createPageMetadata({
  title: CATALOGUE_SEO.metaTitle,
  titleAbsolute: `${CATALOGUE_SEO.metaTitle} | Laure Olivié`,
  description: CATALOGUE_SEO.metaDescription,
  descriptionFinal: true,
  path: LINKS.formationIaMaitriseOeuvre,
  openGraphType: 'website',
  openGraphTitle: 'Formation IA maîtrise d\'œuvre MOEX — organisme certifié Qualiopi',
  openGraphDescription: CATALOGUE_SEO.metaDescription,
  alternatesLanguages: { 'fr-FR': `${SITE_CONFIG.url}${LINKS.formationIaMaitriseOeuvre}` },
  image: {
    url: CATALOGUE_VISUEL.src,
    width: CATALOGUE_VISUEL.width,
    height: CATALOGUE_VISUEL.height,
    alt: CATALOGUE_VISUEL.alt,
  },
});

const courseSchema = buildCatalogueFormationCoursePageJsonLd('NIV-05');
const faqSchema = buildCatalogueFormationFaqPageJsonLd('NIV-05');

export default async function FormationIaMaitriseOeuvrePage() {
  return (
    <div>
      <JsonLd id="schema-course-niv-05" schema={courseSchema} />
      {faqSchema ? <JsonLd id="schema-faq-niv-05" schema={faqSchema} /> : null}

      <CatalogueFormationPageTemplate
        content={PAGE_CONTENT}
        faqSectionId="faq-niv-05"
        h1Id="formation-moe-h1"
      />
    </div>
  );
}
