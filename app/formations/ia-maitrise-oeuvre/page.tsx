import { JsonLd } from '@/components/JsonLd';
import { CatalogueFormationPageTemplate } from '@/components/formations/catalogue/CatalogueFormationPageTemplate';
import { buildCatalogueFormationCoursePageJsonLd, buildCatalogueFormationFaqPageJsonLd } from '@/lib/catalogue-formation-page-jsonld';
import { createPageMetadata, SITE_CONFIG } from '@/lib/seo';
import { getFormationCatalogueVisuel } from '@/lib/formations-catalogue-display';
import { LINKS } from '@/lib/internal-links';
import { getFormationCatalogueSeo } from '@/lib/formation-catalogue-seo';
import { getCatalogueFormationPageContent } from '@/lib/catalogue-formation-page-content';
import type { FAQItem } from '@/lib/faq';
import { TARIF_SESSION_INTRA_NIV11_HT } from '@/lib/tarifs-catalogue-participant';

const CATALOGUE_SEO = getFormationCatalogueSeo('NIV-05');
const CATALOGUE_VISUEL = getFormationCatalogueVisuel('NIV-05');
const PAGE_CONTENT = getCatalogueFormationPageContent('NIV-05');

export const metadata = createPageMetadata({
  title: CATALOGUE_SEO.metaTitle,
  titleAbsolute: `${CATALOGUE_SEO.metaTitle} | Laure Olivié`,
  description: CATALOGUE_SEO.metaDescription,
  descriptionFinal: true,
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

/** Questions propres au format intra 4 h (CCTP, DPGF, CR, plannings) — même tarif forfaitaire que NIV-11. */
const FAQ_FORMAT_INTRA_4H: readonly FAQItem[] = [
  {
    q: 'Existe-t-il un format plus court pour mon cabinet ?',
    a: `Oui : un format intra de 4 h sur vos propres dossiers (CCTP, descriptif, DPGF et analyse des offres, CR de chantier, planning court, emails récurrents), à ${TARIF_SESSION_INTRA_NIV11_HT.toLocaleString('fr-FR')} € HT la session jusqu’à 10 participants, dans vos locaux en Île-de-France. <a href="${LINKS.pdfProgrammeIaMaitriseOeuvreIntra4h}">Télécharger le programme intra 4 h</a>.`,
  },
  {
    q: 'Quelle différence entre le format 7 h et le format intra 4 h ?',
    a: 'Le format 7 h couvre l’exécution (analyse DCE, CR, ordres de service, réserves et réception), en inter ou en intra. Le format intra 4 h couvre la conception et le suivi (CCTP, DPGF, CR, planning, emails), uniquement en intra sur les documents du cabinet.',
  },
];

const courseSchema = buildCatalogueFormationCoursePageJsonLd('NIV-05');
const faqSchema = buildCatalogueFormationFaqPageJsonLd('NIV-05', FAQ_FORMAT_INTRA_4H);

export default async function FormationIaMaitriseOeuvrePage() {
  return (
    <div>
      <JsonLd id="schema-course-niv-05" schema={courseSchema} />
      {faqSchema ? <JsonLd id="schema-faq-niv-05" schema={faqSchema} /> : null}

      <CatalogueFormationPageTemplate
        content={PAGE_CONTENT}
        faqItems={FAQ_FORMAT_INTRA_4H}
        faqSectionId="faq-niv-05"
        h1Id="formation-moe-h1"
      />
    </div>
  );
}
