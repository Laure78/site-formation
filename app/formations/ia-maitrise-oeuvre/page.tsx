import { JsonLd } from '@/components/JsonLd';
import { CatalogueFormationPageTemplate } from '@/components/formations/catalogue/CatalogueFormationPageTemplate';
import { ProgrammeFormationBlocs } from '@/components/formations/catalogue/ProgrammeFormationBlocs';
import { FormationCatalogueGeoSections } from '@/components/formations/FormationCatalogueGeoSections';
import { createPageMetadata, SITE_CONFIG } from '@/lib/seo';
import { getFormationCatalogueVisuel } from '@/lib/formations-catalogue-display';
import { LINKS } from '@/lib/internal-links';
import { buildCatalogueCourseMaitriseOeuvreNiv05JsonLd } from '@/lib/schema-catalogue-course-jsonld';
import { getFormationCatalogueSeo } from '@/lib/formation-catalogue-seo';
import { getCatalogueFormationPageContent } from '@/lib/catalogue-formation-page-content';
import { NIV05_PROGRAMME_BLOCS } from '@/lib/catalogue-formation-programmes-niv05';

const CATALOGUE_SEO = getFormationCatalogueSeo('NIV-05');
const CATALOGUE_VISUEL = getFormationCatalogueVisuel('NIV-05');
const PAGE_CONTENT = getCatalogueFormationPageContent('NIV-05');

export const metadata = createPageMetadata({
  title: CATALOGUE_SEO.metaTitle,
  titleAbsolute: `${CATALOGUE_SEO.metaTitle} | Laure Olivié`,
  description: CATALOGUE_SEO.metaDescription,
  path: LINKS.formationIaMaitriseOeuvre,
  openGraphType: 'website',
  openGraphTitle: 'Formation IA maîtrise d\'œuvre MOEX — organisme certifié Qualiopi',
  openGraphDescription: CATALOGUE_SEO.metaDescription,
  alternatesLanguages: { 'fr-FR': `${SITE_CONFIG.url}${LINKS.formationIaMaitriseOeuvre}` },
  image: {
    url: CATALOGUE_VISUEL.src,
    width: CATALOGUE_VISUEL.width,
    height: CATALOGUE_VISUEL.height,
    alt: CATALOGUE_VISUEL.alt,
  },
});

const courseSchema = buildCatalogueCourseMaitriseOeuvreNiv05JsonLd();

export default function FormationIaMaitriseOeuvrePage() {
  return (
    <div>
      <JsonLd id="schema-course-niv-05" schema={courseSchema} />

      <CatalogueFormationPageTemplate
        content={PAGE_CONTENT}
        programme={<ProgrammeFormationBlocs blocs={NIV05_PROGRAMME_BLOCS} />}
        faqSectionId="faq-niv-05"
        h1Id="formation-moe-h1"
        afterObjectives={
          <FormationCatalogueGeoSections
            catalogueRef="NIV-05"
            ressourcesGratuites={[
              { href: LINKS.formationIaConducteurTravauxLanding, label: 'Guide IA conducteur de travaux' },
              { href: LINKS.guideRepondreAoBtpOfc2026, label: 'Guide répondre aux AO BTP — 5 étapes' },
            ]}
          />
        }
      />
    </div>
  );
}
