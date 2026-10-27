import { JsonLd } from '@/components/JsonLd';
import { FormationProgrammePdfSection } from '@/components/formations/FormationCourseHero';
import { ApplicationMetierFormationHero } from '@/components/formations/ApplicationMetierFormationHero';
import {
  ApplicationMetierTarifsSection,
  ApplicationMetierTemplateExtras,
} from '@/components/formations/ApplicationMetierTemplateExtras';
import { CatalogueFormationPageTemplate } from '@/components/formations/catalogue/CatalogueFormationPageTemplate';
import { buildApplicationMetierCatalogueContent } from '@/lib/application-metier-catalogue-content';
import { getApplicationMetierParcoursStepByRef } from '@/lib/application-metier-btp-parcours-nav';
import { mergeCatalogueFormationFaq } from '@/lib/catalogue-formation-faq';
import { getFAQSchema } from '@/lib/seo';
import type { ApplicationMetierNiveauConfig } from '@/lib/parcours-applications-metier-btp-content';
import { buildCatalogueCourseApplicationMetierJsonLd } from '@/lib/schema-catalogue-course-jsonld';

type Props = {
  config: ApplicationMetierNiveauConfig;
};

function formationHint(config: ApplicationMetierNiveauConfig): string {
  return `Applications métier BTP — ${config.progressionLabel} | ${config.path}`;
}

/**
 * Fiche parcours applications métier (NIV-06 à NIV-08) — template catalogue commun + blocs UX dédiés.
 */
export function ApplicationMetierBtpFormationPage({ config }: Props) {
  const parcoursStep = getApplicationMetierParcoursStepByRef(config.ref);
  const courseSchema = buildCatalogueCourseApplicationMetierJsonLd(config.ref);
  const faqMerged = mergeCatalogueFormationFaq(config.ref, config.faq);
  const faqSchema = getFAQSchema(faqMerged);
  const hint = formationHint(config);
  const pageContent = buildApplicationMetierCatalogueContent(config);

  return (
    <main>
      <JsonLd id={`schema-course-${config.ref.toLowerCase()}`} schema={courseSchema} />
      {faqSchema ? <JsonLd id={`schema-faq-${config.slug}`} schema={faqSchema} /> : null}

      <CatalogueFormationPageTemplate
        content={pageContent}
        customHero={
          <ApplicationMetierFormationHero
            config={config}
            stepBadge={parcoursStep.stepBadge}
            formationHint={hint}
          />
        }
        h1Id={`formation-${config.slug}-h1`}
        faqItems={config.faq}
        faqSectionId={`faq-${config.slug}`}
        afterObjectives={<ApplicationMetierTemplateExtras config={config} formationHint={hint} />}
        tariffsSection={<ApplicationMetierTarifsSection config={config} formationHint={hint} />}
        afterDeliverables={
          <>
            <FormationProgrammePdfSection catalogueRef={config.ref} />
          </>
        }
      />
    </main>
  );
}
