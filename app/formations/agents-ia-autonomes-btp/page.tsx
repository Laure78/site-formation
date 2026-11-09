import { JsonLd } from '@/components/JsonLd';
import { TrainingNiv13MaquetteTemplate } from '@/components/formations/training/TrainingNiv13MaquetteTemplate';
import { createPageMetadata, getFAQSchema } from '@/lib/seo';
import { mergeCatalogueFormationFaq } from '@/lib/catalogue-formation-faq';
import { FAQ_AGENTS_IA_NIV13 } from '@/lib/faq';
import { getFormationCatalogueVisuel } from '@/lib/formations-catalogue-display';
import { LINKS } from '@/lib/internal-links';
import { buildCatalogueCourseAgentsIaAutonomesNiv13JsonLd } from '@/lib/schema-catalogue-course-jsonld';
import { getFormationCatalogueSeo } from '@/lib/formation-catalogue-seo';
import { getCatalogueFormationPageContent } from '@/lib/catalogue-formation-page-content';

const CATALOGUE_SEO = getFormationCatalogueSeo('NIV-13');
const CATALOGUE_VISUEL = getFormationCatalogueVisuel('NIV-13');
const PAGE_CONTENT = getCatalogueFormationPageContent('NIV-13');

export const metadata = createPageMetadata({
  title: CATALOGUE_SEO.metaTitle,
  description: CATALOGUE_SEO.metaDescription,
  descriptionFinal: true,
  path: LINKS.formationAgentsIaAutonomesBtp,
  keywords: [
    'formation agents IA BTP',
    'agent IA autonome BTP',
    'Make AI Agents BTP',
    'automatisation BTP sans code',
    'formation IA conducteur de travaux',
    'formation IA dirigeant BTP',
    'workflow automatisé chantier',
  ],
  image: {
    url: CATALOGUE_VISUEL.src,
    width: CATALOGUE_VISUEL.width,
    height: CATALOGUE_VISUEL.height,
    alt: CATALOGUE_VISUEL.alt,
  },
});

const FAQ_NIV13 = mergeCatalogueFormationFaq('NIV-13', FAQ_AGENTS_IA_NIV13);
const faqSchema = getFAQSchema(FAQ_NIV13);
const courseSchema = buildCatalogueCourseAgentsIaAutonomesNiv13JsonLd();

export default function FormationAgentsIaAutonomesBtpPage() {
  return (
    <>
      <JsonLd id="schema-course-niv-13" schema={courseSchema} />
      {faqSchema ? <JsonLd id="schema-faq-niv-13" schema={faqSchema} /> : null}

      <TrainingNiv13MaquetteTemplate
        content={PAGE_CONTENT}
        faqItems={FAQ_AGENTS_IA_NIV13}
        faqSectionId="faq-niv-13"
        h1Id="formation-niv-13-h1"
      />
    </>
  );
}
