import { JsonLd } from '@/components/JsonLd';
import { FormationSeoFicheShell } from '@/components/formations/seo/FormationSeoFicheShell';
import { FormationMoeSeoBody, FORMATION_MOE_VOIR_AUSSI } from '@/components/formations/seo/FormationMoeSeoBody';
import { TrainingPracticalInfo } from '@/components/formations/training/TrainingPracticalInfo';
import { buildCatalogueFormationCoursePageJsonLd } from '@/lib/catalogue-formation-page-jsonld';
import { FAQ_MOE_NIV05 } from '@/lib/catalogue-formation-faq-niv05';
import { createPageMetadata, getFAQSchema, SITE_CONFIG } from '@/lib/seo';
import { getFormationCatalogueVisuel } from '@/lib/formations-catalogue-display';
import { LINKS } from '@/lib/internal-links';
import { getFormationCatalogueSeo } from '@/lib/formation-catalogue-seo';
import { getFormationByCode } from '@/data/formations';

const CATALOGUE_SEO = getFormationCatalogueSeo('NIV-05');
const CATALOGUE_VISUEL = getFormationCatalogueVisuel('NIV-05');
const META_TITLE_ABSOLUTE = "Formation IA Maître d'œuvre Île-de-France | Laure Olivié";

export const metadata = createPageMetadata({
  title: CATALOGUE_SEO.metaTitle,
  titleAbsolute: META_TITLE_ABSOLUTE,
  description: CATALOGUE_SEO.metaDescription,
  descriptionFinal: true,
  path: LINKS.formationIaMaitriseOeuvre,
  openGraphType: 'website',
  openGraphTitle: META_TITLE_ABSOLUTE,
  openGraphDescription: CATALOGUE_SEO.metaDescription,
  alternatesLanguages: { 'fr-FR': `${SITE_CONFIG.url}${LINKS.formationIaMaitriseOeuvre}` },
  image: {
    url: CATALOGUE_VISUEL.src,
    width: CATALOGUE_VISUEL.width,
    height: CATALOGUE_VISUEL.height,
    alt: CATALOGUE_VISUEL.alt,
  },
});

const courseSchema = buildCatalogueFormationCoursePageJsonLd('NIV-05');
const faqSchema = getFAQSchema(FAQ_MOE_NIV05);

export default function FormationIaMaitriseOeuvrePage() {
  const formation = getFormationByCode('NIV-05')!;

  return (
    <div>
      <JsonLd id="schema-course-niv-05" schema={courseSchema} />
      {faqSchema ? <JsonLd id="schema-faq-niv-05" schema={faqSchema} /> : null}

      <FormationSeoFicheShell
        h1={CATALOGUE_SEO.h1}
        enBref={CATALOGUE_SEO.enBref}
        faq={FAQ_MOE_NIV05}
        ctaSrcMid="fiche-moe"
        ctaSrcEnd="fiche-moe"
        voirAussi={[...FORMATION_MOE_VOIR_AUSSI]}
      >
        <FormationMoeSeoBody />
      </FormationSeoFicheShell>

      <div className="mx-auto max-w-3xl px-4 pb-16">
        <TrainingPracticalInfo programmeRef="NIV-05" publicCible={formation.public} />
      </div>
    </div>
  );
}
