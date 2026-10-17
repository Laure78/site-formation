import { JsonLd } from '@/components/JsonLd';
import { CatalogueFormationPageTemplate } from '@/components/formations/catalogue/CatalogueFormationPageTemplate';
import { createPageMetadata, getFAQSchema } from '@/lib/seo';
import { getFormationCatalogueVisuel } from '@/lib/formations-catalogue-display';
import { LINKS } from '@/lib/internal-links';
import { buildCatalogueCourseDeveloppementWebIaNiv10JsonLd } from '@/lib/schema-catalogue-course-jsonld';
import { getFormationCatalogueSeo } from '@/lib/formation-catalogue-seo';
import { getCatalogueFormationPageContent } from '@/lib/catalogue-formation-page-content';
import { DEV_WEB_IA_FAQ } from '@/lib/formation-developpement-web-ia-content';

const CATALOGUE_SEO = getFormationCatalogueSeo('NIV-10');
const CATALOGUE_VISUEL = getFormationCatalogueVisuel('NIV-10');
const PAGE_CONTENT = getCatalogueFormationPageContent('NIV-10');

export const metadata = createPageMetadata({
  title: CATALOGUE_SEO.metaTitle,
  description: CATALOGUE_SEO.metaDescription,
  descriptionFinal: true,
  path: LINKS.formationDeveloppementWebIaSansCoder,
  keywords: [
    'formation IA BTP',
    'créer application BTP avec IA',
    'application métier BTP',
    'outil de gestion BTP',
    'formation no-code BTP',
    'formation IA pour le BTP',
    'ChatGPT BTP',
    'Claude BTP',
  ],
  image: {
    url: CATALOGUE_VISUEL.src,
    width: CATALOGUE_VISUEL.width,
    height: CATALOGUE_VISUEL.height,
    alt: CATALOGUE_VISUEL.alt,
  },
});

const faqSchema = getFAQSchema(DEV_WEB_IA_FAQ);
const courseSchema = buildCatalogueCourseDeveloppementWebIaNiv10JsonLd();

export default function FormationDeveloppementWebIaSansCoderPage() {
  return (
    <div>
      <JsonLd id="schema-course-niv-10" schema={courseSchema} />
      {faqSchema ? <JsonLd id="schema-faq-niv-10" schema={faqSchema} /> : null}

      <CatalogueFormationPageTemplate
        content={PAGE_CONTENT}
        faqItems={DEV_WEB_IA_FAQ}
        faqSectionId="faq-niv-10"
        h1Id="formation-niv-10-h1"
      />
    </div>
  );
}
