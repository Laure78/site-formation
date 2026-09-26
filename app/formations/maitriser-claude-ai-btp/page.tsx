import { JsonLd } from '@/components/JsonLd';
import { CatalogueFormationPageTemplate } from '@/components/formations/catalogue/CatalogueFormationPageTemplate';
import { CatalogueFormationClaudeExtras } from '@/components/formations/catalogue/CatalogueFormationClaudeExtras';
import { ProgrammeFormationBlocs } from '@/components/formations/catalogue/ProgrammeFormationBlocs';
import { FormationCatalogueGeoSections } from '@/components/formations/FormationCatalogueGeoSections';
import { createPageMetadata, getFAQSchema } from '@/lib/seo';
import { FAQ_MAITRISER_CLAUDE_NIV04 } from '@/lib/faq';
import { getFormationCatalogueVisuel } from '@/lib/formations-catalogue-display';
import { LINKS } from '@/lib/internal-links';
import { buildCatalogueCourseMaitriserClaudeNiv04JsonLd } from '@/lib/schema-catalogue-course-jsonld';
import { getFormationCatalogueSeo } from '@/lib/formation-catalogue-seo';
import { getCatalogueFormationPageContent } from '@/lib/catalogue-formation-page-content';
import { NIV04_PROGRAMME_BLOCS } from '@/lib/catalogue-formation-programmes-niv04';

const CATALOGUE_SEO = getFormationCatalogueSeo('NIV-04');
const CATALOGUE_VISUEL = getFormationCatalogueVisuel('NIV-04');
const PAGE_CONTENT = getCatalogueFormationPageContent('NIV-04');

export const metadata = createPageMetadata({
  title: CATALOGUE_SEO.metaTitle,
  titleAbsolute: `${CATALOGUE_SEO.metaTitle} | Laure Olivié`,
  description: CATALOGUE_SEO.metaDescription,
  path: LINKS.formationMaitriserClaudeAiBtp,
  keywords: [
    'formation Claude AI BTP',
    'formation Claude BTP',
    'Claude AI BTP',
    'Claude bâtiment',
    'Claude appels d\'offres',
    'Claude DCE',
    'Claude Projects BTP',
    'Maîtriser Claude entreprise BTP',
    'Claude Code BTP',
    'Cowork Skills Claude',
    'connecteurs Claude Gmail Drive',
    'Projets Claude BTP',
    'industrialiser IA BTP',
    'formation IA avancée — organisme certifié Qualiopi',
  ],
  image: {
    url: CATALOGUE_VISUEL.src,
    width: CATALOGUE_VISUEL.width,
    height: CATALOGUE_VISUEL.height,
    alt: CATALOGUE_VISUEL.alt,
  },
});

const faqSchema = getFAQSchema(FAQ_MAITRISER_CLAUDE_NIV04);
const courseSchema = buildCatalogueCourseMaitriserClaudeNiv04JsonLd();

export default function FormationMaitriserClaudeAiBtpPage() {
  return (
    <div>
      <JsonLd id="schema-course-niv-04" schema={courseSchema} />
      {faqSchema ? <JsonLd id="schema-faq-niv-04" schema={faqSchema} /> : null}

      <CatalogueFormationPageTemplate
        content={PAGE_CONTENT}
        programme={<ProgrammeFormationBlocs blocs={NIV04_PROGRAMME_BLOCS} />}
        faqItems={FAQ_MAITRISER_CLAUDE_NIV04}
        faqSectionId="faq-niv-04"
        h1Id="formation-claude-h1"
        afterObjectives={
          <>
            <CatalogueFormationClaudeExtras />
            <FormationCatalogueGeoSections
              catalogueRef="NIV-04"
              ressourcesGratuites={[
                { href: LINKS.formationIaAppelsOffresBtp, label: 'Formation IA appels d’offres BTP' },
                { href: LINKS.formationChatgptBtp, label: 'Formation ChatGPT pour le BTP' },
              ]}
            />
          </>
        }
      />
    </div>
  );
}
