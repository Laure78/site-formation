import { JsonLd } from '@/components/JsonLd';
import { TrainingNiv02MaquetteTemplate } from '@/components/formations/training/TrainingNiv02MaquetteTemplate';
import { createPageMetadata, getFAQSchema } from '@/lib/seo';
import { mergeCatalogueFormationFaq } from '@/lib/catalogue-formation-faq';
import { FAQ_APPELS_OFFRE } from '@/lib/faq';
import { getFormationCatalogueVisuel } from '@/lib/formations-catalogue-display';
import { LINKS } from '@/lib/internal-links';
import { buildCatalogueCourseIaAppelsOffreNiv02JsonLd } from '@/lib/schema-catalogue-course-jsonld';
import { getFormationCatalogueSeo } from '@/lib/formation-catalogue-seo';
import { getCatalogueFormationPageContent } from '@/lib/catalogue-formation-page-content';

const CATALOGUE_SEO = getFormationCatalogueSeo('NIV-02');
const CATALOGUE_VISUEL = getFormationCatalogueVisuel('NIV-02');
const PAGE_CONTENT = getCatalogueFormationPageContent('NIV-02');

export const metadata = createPageMetadata({
  title: CATALOGUE_SEO.metaTitle,
  description: CATALOGUE_SEO.metaDescription,
  descriptionFinal: true,
  path: LINKS.formationAO,
  keywords: [
    'formation IA appels d\'offres BTP',
    'analyser un DCE avec l\'IA',
    'mémoire technique avec IA',
    'formation appels d\'offres bâtiment',
    'IA chiffrage BTP',
    'analyse CCTP DPGF',
    'formation Claude BTP',
  ],
  image: {
    url: CATALOGUE_VISUEL.src,
    width: CATALOGUE_VISUEL.width,
    height: CATALOGUE_VISUEL.height,
    alt: CATALOGUE_VISUEL.alt,
  },
});

const FAQ_NIV02 = mergeCatalogueFormationFaq('NIV-02', FAQ_APPELS_OFFRE);
const faqSchema = getFAQSchema(FAQ_NIV02);
const courseSchema = buildCatalogueCourseIaAppelsOffreNiv02JsonLd();

/**
 * Fiche NIV-02 — refonte UI maquette (contenu catalogue + Qualiopi inchangés).
 */
export default async function FormationIAAppelsOffreBTPPage() {
  return (
    <>
      <JsonLd id="schema-course-niv-02" schema={courseSchema} />
      {faqSchema ? <JsonLd id="schema-faq" schema={faqSchema} /> : null}

      <TrainingNiv02MaquetteTemplate
        content={PAGE_CONTENT}
        faqItems={FAQ_APPELS_OFFRE}
        faqSectionId="faq-niv-02"
        h1Id="formation-niv-02-h1"
      />
    </>
  );
}
