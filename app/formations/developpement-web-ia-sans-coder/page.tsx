import { JsonLd } from '@/components/JsonLd';
import { CatalogueFormationPageTemplate } from '@/components/formations/catalogue/CatalogueFormationPageTemplate';
import { CatalogueFormationDevWebHero } from '@/components/formations/catalogue/CatalogueFormationDevWebHero';
import { CatalogueFormationDevWebAfterDeliverables, CatalogueFormationDevWebAfterObjectives } from '@/components/formations/catalogue/CatalogueFormationDevWebSections';
import {
  CatalogueFormationDevWebParcoursTarifsSection,
  CatalogueFormationDevWebQualiopiEngagementSection,
} from '@/components/formations/catalogue/CatalogueFormationDevWebMarketingSections';
import { CatalogueFormationDevWebProgramme } from '@/components/formations/catalogue/CatalogueFormationDevWebProgramme';
import { DevWebIaCasUsageSection } from '@/components/formations/DevWebIaCasUsageSection';
import { DevWebIaDonneesControleSection } from '@/components/formations/DevWebIaDonneesControleSection';
import { DevWebIaErpBeneficesSection } from '@/components/formations/DevWebIaErpBeneficesSection';
import { DevWebIaErpModulesSection } from '@/components/formations/DevWebIaErpModulesSection';
import { DevWebIaFilRougeSection } from '@/components/formations/DevWebIaFilRougeSection';
import { DevWebIaFormatComparatifSection } from '@/components/formations/DevWebIaFormatComparatifSection';
import { DevWebIaProjectContactSection } from '@/components/formations/DevWebIaProjectContactSection';
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
    'formation ERP BTP avec IA',
    'créer un ERP BTP',
    'logiciel de gestion BTP sur mesure',
    'outil de gestion BTP',
    'créer son logiciel BTP avec IA',
    'application métier BTP',
    'ERP BTP sur mesure',
    'formation IA BTP',
    'développer un outil de gestion BTP sans coder',
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
            <CatalogueFormationDevWebAfterObjectives />
            <DevWebIaErpModulesSection />
          </>
        }
        programme={<CatalogueFormationDevWebProgramme />}
        afterProgrammeSupplement={
          <>
            <DevWebIaCasUsageSection />
            <DevWebIaFilRougeSection />
            <DevWebIaFormatComparatifSection />
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
