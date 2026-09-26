import { notFound } from 'next/navigation';
import { JsonLd } from '@/components/JsonLd';
import { CatalogueFormationPageTemplate } from '@/components/formations/catalogue/CatalogueFormationPageTemplate';
import { ProgrammeFormationBlocs } from '@/components/formations/catalogue/ProgrammeFormationBlocs';
import { FormationCatalogueGeoSections } from '@/components/formations/FormationCatalogueGeoSections';
import { createPageMetadata, getFAQSchema } from '@/lib/seo';
import { FAQ_CONDUITE_TRAVAUX_NIV03 } from '@/lib/faq';
import { getFormationCatalogueVisuel } from '@/lib/formations-catalogue-display';
import { LINKS } from '@/lib/internal-links';
import { buildCatalogueCourseConduiteTravauxNiv03JsonLd } from '@/lib/schema-catalogue-course-jsonld';
import { getFormationCatalogueSeo } from '@/lib/formation-catalogue-seo';
import { getCatalogueFormationPageContent } from '@/lib/catalogue-formation-page-content';
import { isFormationCataloguePublished } from '@/lib/formation-catalogue-visibility';
import {
  NIV03_PEDAGOGICAL_METHODS,
  NIV03_PROGRAMME_BLOCS,
} from '@/lib/catalogue-formation-programmes-niv03';

const CATALOGUE_SEO = getFormationCatalogueSeo('NIV-03');
const CATALOGUE_VISUEL = getFormationCatalogueVisuel('NIV-03');
const PAGE_CONTENT = getCatalogueFormationPageContent('NIV-03');

export const metadata = createPageMetadata({
  title: CATALOGUE_SEO.metaTitle,
  description: CATALOGUE_SEO.metaDescription,
  descriptionFinal: true,
  path: LINKS.formationConduiteTravauxSuiviChantier,
  keywords: [
    'formation IA conducteur de travaux',
    'IA conduite de travaux BTP',
    'skills Claude chantier',
    'analyse CCTP IA',
    'DPGF IA BTP',
    'PPSPS IA',
    'compte rendu chantier IA',
    'DOE IA BTP',
    'formation IA suivi chantier',
    'Claude AI conducteur travaux',
  ],
  image: {
    url: CATALOGUE_VISUEL.src,
    width: CATALOGUE_VISUEL.width,
    height: CATALOGUE_VISUEL.height,
    alt: CATALOGUE_VISUEL.alt,
  },
});

const faqSchema = getFAQSchema(FAQ_CONDUITE_TRAVAUX_NIV03);
const courseSchema = buildCatalogueCourseConduiteTravauxNiv03JsonLd();

export const dynamic = 'force-dynamic';

export default function FormationIaConduiteTravauxSuiviChantierPage() {
  if (!isFormationCataloguePublished('NIV-03')) notFound();

  return (
    <div>
      <JsonLd id="schema-course-niv-03" schema={courseSchema} />
      {faqSchema ? <JsonLd id="schema-faq-niv-03" schema={faqSchema} /> : null}

      <CatalogueFormationPageTemplate
        content={PAGE_CONTENT}
        programme={
          <ProgrammeFormationBlocs
            blocs={NIV03_PROGRAMME_BLOCS}
            pedagogicalMethods={NIV03_PEDAGOGICAL_METHODS}
          />
        }
        faqItems={FAQ_CONDUITE_TRAVAUX_NIV03}
        faqSectionId="faq-niv-03"
        h1Id="formation-niv-03-h1"
        afterObjectives={
          <FormationCatalogueGeoSections
            catalogueRef="NIV-03"
            ressourcesGratuites={[
              { href: LINKS.promptsIaConducteurTravaux, label: '20 prompts IA conducteur de travaux' },
            ]}
          />
        }
      />
    </div>
  );
}
