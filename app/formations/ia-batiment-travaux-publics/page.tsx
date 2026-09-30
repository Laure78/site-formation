import { JsonLd } from '@/components/JsonLd';
import { TrainingPageTemplate } from '@/components/formations/training';
import { createPageMetadata, getFAQSchema } from '@/lib/seo';
import { FAQ_BATIMENT } from '@/lib/faq';
import { LINKS } from '@/lib/internal-links';
import { buildCatalogueCourseIaBtpNiv01JsonLd } from '@/lib/schema-catalogue-course-jsonld';
import { getFormationCatalogueSeo } from '@/lib/formation-catalogue-seo';
import { getCatalogueFormationPageContent } from '@/lib/catalogue-formation-page-content';
import { getFormationCatalogueVisuel } from '@/lib/formations-catalogue-display';

const CATALOGUE_SEO = getFormationCatalogueSeo('NIV-01');
const CATALOGUE_VISUEL = getFormationCatalogueVisuel('NIV-01');
const PAGE_CONTENT = getCatalogueFormationPageContent('NIV-01');

export const metadata = createPageMetadata({
  title: CATALOGUE_SEO.metaTitle,
  description: CATALOGUE_SEO.metaDescription,
  descriptionFinal: true,
  path: LINKS.formationIaBtpNiveau1BatimentTp,
  keywords: [
    'formation IA BTP',
    'formation intelligence artificielle bâtiment',
    'formation ChatGPT BTP',
    'IA pour les professionnels du bâtiment',
    'devis BTP avec IA',
    'comptes rendus de chantier avec IA',
    'formation IA Île-de-France',
  ],
  image: {
    url: CATALOGUE_VISUEL.src,
    width: CATALOGUE_VISUEL.width,
    height: CATALOGUE_VISUEL.height,
    alt: CATALOGUE_VISUEL.alt,
  },
});

const faqSchema = getFAQSchema(FAQ_BATIMENT);
const courseSchema = buildCatalogueCourseIaBtpNiv01JsonLd();

/**
 * Page pilote — template de référence UX/UI des fiches formation catalogue.
 * Contenu : `getCatalogueFormationPageContent('NIV-01')` + `data/formations`.
 */
export default function FormationIAuServiceDuBatimentPage() {
  return (
    <>
      <JsonLd id="schema-course-niv-01" schema={courseSchema} />
      {faqSchema ? <JsonLd id="schema-faq" schema={faqSchema} /> : null}
      <TrainingPageTemplate
        content={PAGE_CONTENT}
        faqItems={FAQ_BATIMENT}
        faqSectionId="faq-niv-01"
        h1Id="formation-niv-01-h1"
      />
    </>
  );
}
