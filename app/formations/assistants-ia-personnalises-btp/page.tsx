import { JsonLd } from '@/components/JsonLd';
import {
  AssistantsIaBtpAteliersSection,
  AssistantsIaBtpCreationsSection,
  AssistantsIaBtpProgrammeTimelineSection,
} from '@/components/formations/assistants-ia/AssistantsIaBtpPageSections';
import { CatalogueFormationPageTemplate } from '@/components/formations/catalogue/CatalogueFormationPageTemplate';
import { createPageMetadata, getFAQSchema } from '@/lib/seo';
import { FAQ_ASSISTANTS_IA_NIV09 } from '@/lib/faq';
import { getFormationCatalogueVisuel } from '@/lib/formations-catalogue-display';
import { LINKS } from '@/lib/internal-links';
import { buildCatalogueCourseAssistantsIaNiv09JsonLd } from '@/lib/schema-catalogue-course-jsonld';
import { getFormationCatalogueSeo } from '@/lib/formation-catalogue-seo';
import { getCatalogueFormationPageContent } from '@/lib/catalogue-formation-page-content';

const CATALOGUE_SEO = getFormationCatalogueSeo('NIV-09');
const CATALOGUE_VISUEL = getFormationCatalogueVisuel('NIV-09');
const PAGE_CONTENT = getCatalogueFormationPageContent('NIV-09');

export const metadata = createPageMetadata({
  title: CATALOGUE_SEO.metaTitle,
  titleAbsolute: `${CATALOGUE_SEO.metaTitle} | Laure Olivié`,
  description: CATALOGUE_SEO.metaDescription,
  path: LINKS.formationAssistantsIaPersonnalisesBtp,
  keywords: [
    'formation assistants IA BTP',
    'créer un assistant IA BTP',
    'ChatGPT Plus BTP',
    'Claude Pro BTP',
    'GPT personnalisé bâtiment',
    'Projects Claude BTP',
    'prompting BTP',
    'formation IA pour le BTP',
  ],
  image: {
    url: CATALOGUE_VISUEL.src,
    width: CATALOGUE_VISUEL.width,
    height: CATALOGUE_VISUEL.height,
    alt: CATALOGUE_VISUEL.alt,
  },
});

const faqSchema = getFAQSchema(FAQ_ASSISTANTS_IA_NIV09);
const courseSchema = buildCatalogueCourseAssistantsIaNiv09JsonLd();

export default async function FormationAssistantsIaPersonnalisesBtpPage() {
  return (
    <div>
      <JsonLd id="schema-course-niv-09" schema={courseSchema} />
      {faqSchema ? <JsonLd id="schema-faq-niv-09" schema={faqSchema} /> : null}

      <CatalogueFormationPageTemplate
        content={PAGE_CONTENT}
        faqItems={FAQ_ASSISTANTS_IA_NIV09}
        faqSectionId="faq-niv-09"
        h1Id="formation-niv-09-h1"
        afterObjectives={<AssistantsIaBtpCreationsSection />}
        programmeSupplement={<AssistantsIaBtpProgrammeTimelineSection />}
        afterProgrammeSupplement={<AssistantsIaBtpAteliersSection />}
      />
    </div>
  );
}
