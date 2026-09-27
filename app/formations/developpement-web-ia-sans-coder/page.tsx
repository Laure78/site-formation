import { Download } from 'lucide-react';
import { JsonLd } from '@/components/JsonLd';
import { OFC_CTA_SECONDARY } from '@/lib/ofc-interaction-classes';
import { CatalogueFormationPageTemplate } from '@/components/formations/catalogue/CatalogueFormationPageTemplate';
import { CatalogueFormationDevWebHero } from '@/components/formations/catalogue/CatalogueFormationDevWebHero';
import {
  CatalogueFormationDevWebAfterDeliverables,
  CatalogueFormationDevWebAfterObjectives,
  CatalogueFormationDevWebProgrammeDay2,
} from '@/components/formations/catalogue/CatalogueFormationDevWebSections';
import {
  CatalogueFormationDevWebParcoursTarifsSection,
  CatalogueFormationDevWebQualiopiEngagementSection,
} from '@/components/formations/catalogue/CatalogueFormationDevWebMarketingSections';
import { DevWebIaProjectContactSection } from '@/components/formations/DevWebIaProjectContactSection';
import { DevWebIaProjectExamplesSection } from '@/components/formations/DevWebIaProjectExamplesSection';
import { ProgrammeFormationBlocs } from '@/components/formations/catalogue/ProgrammeFormationBlocs';
import { createPageMetadata, getFAQSchema } from '@/lib/seo';
import { getFormationCatalogueVisuel } from '@/lib/formations-catalogue-display';
import { LINKS } from '@/lib/internal-links';
import { buildCatalogueCourseDeveloppementWebIaNiv10JsonLd } from '@/lib/schema-catalogue-course-jsonld';
import { getFormationCatalogueSeo } from '@/lib/formation-catalogue-seo';
import { getCatalogueFormationPageContent } from '@/lib/catalogue-formation-page-content';
import {
  DEV_WEB_IA_FAQ,
  DEV_WEB_IA_MODULES,
  DEV_WEB_IA_PDF_7H_HREF,
  devWebIaInscriptionHref,
  devWebIaProjectFormHref,
} from '@/lib/formation-developpement-web-ia-content';

const CATALOGUE_SEO = getFormationCatalogueSeo('NIV-10');
const CATALOGUE_VISUEL = getFormationCatalogueVisuel('NIV-10');

const PAGE_CONTENT = {
  ...getCatalogueFormationPageContent('NIV-10'),
  finalCta: {
    ...getCatalogueFormationPageContent('NIV-10').finalCta,
    devisHref: devWebIaProjectFormHref(),
    primaryLabel: 'Parlez-moi de votre projet',
    secondaryHref: devWebIaInscriptionHref(),
  },
};

export const metadata = createPageMetadata({
  title: CATALOGUE_SEO.metaTitle,
  titleAbsolute: `${CATALOGUE_SEO.metaTitle} | Laure Olivié`,
  description: CATALOGUE_SEO.metaDescription,
  descriptionFinal: true,
  path: LINKS.formationDeveloppementWebIaSansCoder,
  keywords: [
    'formation développement web IA',
    'formation créer une application avec IA',
    'formation créer un site avec IA',
    'développement web avec intelligence artificielle',
    'créer une application sans coder avec IA',
    'formation vibe coding',
    'formation Cursor IA',
    'formation Claude Code débutant',
    'formation IA sans coder',
  ],
  image: {
    url: CATALOGUE_VISUEL.src,
    width: CATALOGUE_VISUEL.width,
    height: CATALOGUE_VISUEL.height,
    alt: CATALOGUE_VISUEL.alt,
  },
});

const courseSchema = buildCatalogueCourseDeveloppementWebIaNiv10JsonLd();
const faqSchema = getFAQSchema(DEV_WEB_IA_FAQ);

export default function FormationDeveloppementWebIaSansCoderPage() {
  return (
    <div>
      <JsonLd id="schema-course-niv-10" schema={courseSchema} />
      {faqSchema ? <JsonLd id="schema-faq-niv-10" schema={faqSchema} /> : null}

      <CatalogueFormationPageTemplate
        content={PAGE_CONTENT}
        customHero={<CatalogueFormationDevWebHero />}
        h1Id="dev-web-ia-h1"
        faqItems={DEV_WEB_IA_FAQ}
        faqSectionId="faq"
        afterObjectives={<CatalogueFormationDevWebAfterObjectives />}
        programme={
          <>
            <ProgrammeFormationBlocs
              blocs={DEV_WEB_IA_MODULES.map((module) => ({
                heading: `Module ${module.number} — ${module.title}`,
                objective: module.objective,
                objectifs: module.activities,
                livrable: module.result,
              }))}
            />
            <p className="mt-6">
              <a
                href={DEV_WEB_IA_PDF_7H_HREF}
                download="programme-ofc-developpement-web-ia-7h.pdf"
                className={`${OFC_CTA_SECONDARY} inline-flex min-h-11 items-center gap-2 px-5 py-3`}
              >
                <Download className="h-4 w-4 shrink-0" aria-hidden />
                Télécharger le programme officiel 7 h (PDF)
              </a>
            </p>
          </>
        }
        programmeSupplement={<CatalogueFormationDevWebProgrammeDay2 />}
        afterProgrammeSupplement={
          <>
            <DevWebIaProjectExamplesSection />
            <DevWebIaProjectContactSection />
          </>
        }
        afterDeliverables={<CatalogueFormationDevWebAfterDeliverables />}
        beforeTariffs={<CatalogueFormationDevWebQualiopiEngagementSection />}
        tariffsSection={<CatalogueFormationDevWebParcoursTarifsSection />}
      />
    </div>
  );
}
