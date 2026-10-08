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
import { DevWebIaDonneesControleSection } from '@/components/formations/DevWebIaDonneesControleSection';
import { DevWebIaErpBeneficesSection } from '@/components/formations/DevWebIaErpBeneficesSection';
import { DevWebIaErpEvolutifSection } from '@/components/formations/DevWebIaErpEvolutifSection';
import { DevWebIaErpModulesSection } from '@/components/formations/DevWebIaErpModulesSection';
import { DevWebIaHeuresPaieSection } from '@/components/formations/DevWebIaHeuresPaieSection';
import { DevWebIaProjectContactSection } from '@/components/formations/DevWebIaProjectContactSection';
import { ProgrammeFormationBlocs } from '@/components/formations/catalogue/ProgrammeFormationBlocs';
import { createPageMetadata, getBreadcrumbSchema, getFAQSchema } from '@/lib/seo';
import { LINKS } from '@/lib/internal-links';
import { buildCatalogueCourseDeveloppementWebIaNiv10JsonLd } from '@/lib/schema-catalogue-course-jsonld';
import { getFormationCatalogueSeo } from '@/lib/formation-catalogue-seo';
import { getCatalogueFormationPageContent } from '@/lib/catalogue-formation-page-content';
import {
  DEV_WEB_IA_CTA_PRIMARY_LABEL,
  DEV_WEB_IA_CTA_SECONDARY_LABEL,
  DEV_WEB_IA_FAQ,
  DEV_WEB_IA_FORMATION_TITRE_COURT,
  DEV_WEB_IA_MODULES,
  DEV_WEB_IA_PDF_7H_HREF,
  PROGRAMME_PDF_7H,
  devWebIaInscriptionHref,
  devWebIaPrimaryCtaHref,
} from '@/lib/formation-developpement-web-ia-content';

const CATALOGUE_SEO = getFormationCatalogueSeo('NIV-10');

const PAGE_TITLE = 'Créer des applications métier BTP avec l’IA | Laure Olivié' as const;
const PAGE_DESCRIPTION = CATALOGUE_SEO.metaDescription;
const HERO_VISUEL = {
  src: '/images/formation-developpement-web-ia-sans-coder/01-hero-applications-metier-btp-ia.webp',
  width: 1024,
  height: 576,
  alt: 'Pros du BTP autour d’un ERP chantier créé avec l’IA, sans coder — formation Île-de-France',
} as const;

const PAGE_CONTENT = {
  ...getCatalogueFormationPageContent('NIV-10'),
  finalCta: {
    ...getCatalogueFormationPageContent('NIV-10').finalCta,
    devisHref: devWebIaPrimaryCtaHref(),
    primaryLabel: DEV_WEB_IA_CTA_PRIMARY_LABEL,
    secondaryHref: devWebIaInscriptionHref(),
    secondaryLabel: DEV_WEB_IA_CTA_SECONDARY_LABEL,
    note: 'Rendez-vous découverte · 30 min',
  },
};

export const metadata = createPageMetadata({
  title: PAGE_TITLE,
  titleAbsolute: PAGE_TITLE,
  description: PAGE_DESCRIPTION,
  descriptionFinal: true,
  path: LINKS.formationDeveloppementWebIaSansCoder,
  appendAuthorSuffix: false,
  openGraphTitle: PAGE_TITLE,
  openGraphDescription: PAGE_DESCRIPTION,
  keywords: [
    'créer des applications métier BTP avec l’IA',
    'formation IA sans coder BTP',
    'ERP BTP avec l’IA',
    'formation IA pour le BTP',
    'ChatGPT BTP',
  ],
  image: {
    url: HERO_VISUEL.src,
    width: HERO_VISUEL.width,
    height: HERO_VISUEL.height,
    alt: HERO_VISUEL.alt,
  },
});

const courseSchema = buildCatalogueCourseDeveloppementWebIaNiv10JsonLd();
const faqSchema = getFAQSchema(DEV_WEB_IA_FAQ);
const breadcrumbSchema = getBreadcrumbSchema([
  { name: 'Accueil', path: '/' },
  { name: 'Formations', path: LINKS.formations },
  {
    name: DEV_WEB_IA_FORMATION_TITRE_COURT,
    path: LINKS.formationDeveloppementWebIaSansCoder,
  },
]);

export default function FormationDeveloppementWebIaSansCoderPage() {
  return (
    <div>
      <JsonLd id="schema-course-niv-10" schema={courseSchema} />
      {faqSchema ? <JsonLd id="schema-faq-niv-10" schema={faqSchema} /> : null}
      <JsonLd id="schema-breadcrumb-niv-10" schema={breadcrumbSchema} />

      <CatalogueFormationPageTemplate
        content={PAGE_CONTENT}
        customHero={<CatalogueFormationDevWebHero />}
        h1Id="dev-web-ia-h1"
        faqItems={DEV_WEB_IA_FAQ}
        faqSectionId="faq"
        afterObjectives={
          <>
            <DevWebIaErpBeneficesSection />
            <DevWebIaErpModulesSection />
            <DevWebIaHeuresPaieSection />
            <CatalogueFormationDevWebAfterObjectives />
          </>
        }
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
                download={PROGRAMME_PDF_7H}
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
            <DevWebIaErpEvolutifSection />
            <DevWebIaProjectContactSection />
          </>
        }
        afterIaLimits={<DevWebIaDonneesControleSection />}
        afterDeliverables={<CatalogueFormationDevWebAfterDeliverables />}
        beforeTariffs={<CatalogueFormationDevWebQualiopiEngagementSection />}
        tariffsSection={<CatalogueFormationDevWebParcoursTarifsSection />}
      />
    </div>
  );
}
