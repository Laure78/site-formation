import { JsonLd } from '@/components/JsonLd';
import { TrainingNiv14MaquetteTemplate } from '@/components/formations/training/TrainingNiv14MaquetteTemplate';
import { createPageMetadata, getFAQSchema } from '@/lib/seo';
import { mergeCatalogueFormationFaq } from '@/lib/catalogue-formation-faq';
import { AUTOMATISER_TACHES_IA_FAQ } from '@/lib/faq';
import { getFormationCatalogueVisuel } from '@/lib/formations-catalogue-display';
import { LINKS } from '@/lib/internal-links';
import { buildCatalogueCourseAutomatiserTachesIaNiv14JsonLd } from '@/lib/schema-catalogue-course-jsonld';
import { getFormationCatalogueSeo } from '@/lib/formation-catalogue-seo';
import { getCatalogueFormationPageContent } from '@/lib/catalogue-formation-page-content';

const CATALOGUE_SEO = getFormationCatalogueSeo('NIV-14');
const CATALOGUE_VISUEL = getFormationCatalogueVisuel('NIV-14');
const PAGE_CONTENT = getCatalogueFormationPageContent('NIV-14');

export const metadata = createPageMetadata({
  title: CATALOGUE_SEO.metaTitle,
  description: CATALOGUE_SEO.metaDescription,
  descriptionFinal: true,
  path: LINKS.formationAutomatiserTachesIaBtp,
  keywords: [
    'formation automatisation BTP',
    'formation Make BTP',
    'automatiser tâches IA BTP',
    'workflow BTP',
    'formation IA conducteur de travaux',
    'formation IA dirigeant BTP',
    'relances devis automatisées',
  ],
  image: {
    url: CATALOGUE_VISUEL.src,
    width: CATALOGUE_VISUEL.width,
    height: CATALOGUE_VISUEL.height,
    alt: CATALOGUE_VISUEL.alt,
  },
});

const FAQ_NIV14 = mergeCatalogueFormationFaq('NIV-14', AUTOMATISER_TACHES_IA_FAQ);
const faqSchema = getFAQSchema(FAQ_NIV14);
const courseSchema = buildCatalogueCourseAutomatiserTachesIaNiv14JsonLd();

export default function FormationAutomatiserTachesIaBtpPage() {
  return (
    <>
      <JsonLd id="schema-course-niv-14" schema={courseSchema} />
      {faqSchema ? <JsonLd id="schema-faq-niv-14" schema={faqSchema} /> : null}

      <TrainingNiv14MaquetteTemplate
        content={PAGE_CONTENT}
        faqItems={AUTOMATISER_TACHES_IA_FAQ}
        faqSectionId="faq-niv-14"
        h1Id="formation-niv-14-h1"
      />
    </>
  );
}