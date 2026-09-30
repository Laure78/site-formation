import { JsonLd } from '@/components/JsonLd';
import { TrainingPageTemplate } from '@/components/formations/training';
import { FormationCatalogueGeoSections } from '@/components/formations/FormationCatalogueGeoSections';
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
  descriptionFinal: true,
  path: LINKS.formationAssistantsIaPersonnalisesBtp,
  keywords: [
    'formation assistants IA BTP',
    'ChatGPT Plus BTP',
    'Claude Pro BTP',
    'formation IA pour le BTP',
    'assistants IA métier',
  ],
  image: {
    url: CATALOGUE_VISUEL.src,
    width: CATALOGUE_VISUEL.width,
    height: CATALOGUE_VISUEL.height,
    alt: CATALOGUE_VISUEL.alt,
  },
});

const courseSchema = buildCatalogueCourseAssistantsIaNiv09JsonLd();
const faqSchema = getFAQSchema(FAQ_ASSISTANTS_IA_NIV09);

/**
 * Fiche catalogue NIV-09 — template de référence TrainingPageTemplate.
 */
export default function FormationAssistantsIaPersonnalisesBtpPage() {
  return (
    <>
      <JsonLd id="schema-course-niv-09" schema={courseSchema} />
      {faqSchema ? <JsonLd id="schema-faq-niv-09" schema={faqSchema} /> : null}
      <TrainingPageTemplate
        content={PAGE_CONTENT}
        faqItems={FAQ_ASSISTANTS_IA_NIV09}
        faqSectionId="faq-niv-09"
        h1Id="formation-assistants-ia-h1"
        afterObjectives={
          <FormationCatalogueGeoSections
            catalogueRef="NIV-09"
            ressourcesGratuites={[
              { href: LINKS.formationIaBtpNiveau1BatimentTp, label: 'Formation IA BTP niveau 1' },
              {
                href: LINKS.formationMaitriserClaudeAiBtp,
                label: 'Maîtriser Claude AI pour le BTP',
              },
            ]}
          />
        }
      />
    </>
  );
}
