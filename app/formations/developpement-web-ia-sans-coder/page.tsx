import { JsonLd } from '@/components/JsonLd';
import { CatalogueFormationPageTemplate } from '@/components/formations/catalogue/CatalogueFormationPageTemplate';
import { CatalogueFormationDevWebHero } from '@/components/formations/catalogue/CatalogueFormationDevWebHero';
import {
  CatalogueFormationDevWebAfterDeliverables,
  CatalogueFormationDevWebAfterObjectives,
} from '@/components/formations/catalogue/CatalogueFormationDevWebSections';
import {
  CatalogueFormationDevWebParcoursTarifsSection,
  CatalogueFormationDevWebQualiopiEngagementSection,
} from '@/components/formations/catalogue/CatalogueFormationDevWebMarketingSections';
import { TrainingDevWebProgrammeAccordion } from '@/components/formations/training/TrainingDevWebProgrammeAccordion';
import {
  DevWebIaAccessibleSection,
  DevWebIaAutonomieSection,
  DevWebIaAvantApresSection,
  DevWebIaEconomiqueSection,
  DevWebIaPourquoiOutilSection,
  DevWebIaResultatsSection,
} from '@/components/formations/DevWebIaConversionSections';
import { DevWebIaDonneesControleSection } from '@/components/formations/DevWebIaDonneesControleSection';
import { DevWebIaErpModulesSection } from '@/components/formations/DevWebIaErpModulesSection';
import { DevWebIaFormatComparatifSection } from '@/components/formations/DevWebIaFormatComparatifSection';
import { DevWebIaProjectContactSection } from '@/components/formations/DevWebIaProjectContactSection';
import { createPageMetadata, getBreadcrumbSchema, getFAQSchema } from '@/lib/seo';
import { LINKS } from '@/lib/internal-links';
import { buildCatalogueCourseDeveloppementWebIaNiv10JsonLd } from '@/lib/schema-catalogue-course-jsonld';
import { getFormationCatalogueSeo } from '@/lib/formation-catalogue-seo';
import { getCatalogueFormationPageContent } from '@/lib/catalogue-formation-page-content';
import {
  DEV_WEB_IA_CTA_FINAL_LABEL,
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
  alt: 'Pros du BTP autour d’un outil métier chantier créé avec l’IA, sans coder — formation Île-de-France',
} as const;

const PAGE_CONTENT = {
  ...getCatalogueFormationPageContent('NIV-10'),
  programmeHeading: 'Le parcours en étapes',
  objectivesTitle: 'Ce que vous apprenez',
  finalCta: {
    ...getCatalogueFormationPageContent('NIV-10').finalCta,
    title: 'Quel outil votre entreprise construirait-elle si vous n’aviez plus besoin de savoir coder ?',
    description:
      'Relevé d’heures, planning, suivi chantier, CRM ou tableau de bord : commencez par le besoin qui vous fait perdre le plus de temps.',
    devisHref: devWebIaPrimaryCtaHref(),
    primaryLabel: DEV_WEB_IA_CTA_FINAL_LABEL,
    secondaryHref: devWebIaInscriptionHref(),
    secondaryLabel: 'Demander une place',
    note: 'Présentiel Île-de-France · 7 h ou 14 h · 4 à 8 participants',
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
    'formation IA BTP',
    'créer application BTP avec IA',
    'ERP BTP sur mesure',
    'logiciel BTP sur mesure',
    'créer logiciel avec IA sans coder',
    'application métier BTP',
    'outil de gestion BTP',
    'formation no-code BTP',
    'créer ERP BTP avec IA',
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
            <DevWebIaPourquoiOutilSection />
            <DevWebIaAutonomieSection />
            <DevWebIaEconomiqueSection />
            <DevWebIaErpModulesSection />
            <DevWebIaAvantApresSection />
            <DevWebIaAccessibleSection />
            <DevWebIaResultatsSection />
            <CatalogueFormationDevWebAfterObjectives />
          </>
        }
        programme={<TrainingDevWebProgrammeAccordion />}
        afterProgrammeSupplement={
          <>
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
