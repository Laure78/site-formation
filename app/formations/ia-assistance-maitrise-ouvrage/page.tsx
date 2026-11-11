import { JsonLd } from '@/components/JsonLd';
import { FormationSeoFicheShell } from '@/components/formations/seo/FormationSeoFicheShell';
import { FormationAmoSeoBody } from '@/components/formations/seo/FormationAmoSeoBody';
import { TrainingPracticalInfo } from '@/components/formations/training/TrainingPracticalInfo';
import { buildCatalogueFormationCoursePageJsonLd } from '@/lib/catalogue-formation-page-jsonld';
import { FAQ_AMO_NIV11 } from '@/lib/catalogue-formation-faq-niv11';
import { createPageMetadata, getFAQSchema, SITE_CONFIG } from '@/lib/seo';
import { getFormationCatalogueVisuel } from '@/lib/formations-catalogue-display';
import { LINKS } from '@/lib/internal-links';
import { getFormationCatalogueSeo } from '@/lib/formation-catalogue-seo';
import { getFormationByCode } from '@/data/formations';

const CATALOGUE_SEO = getFormationCatalogueSeo('NIV-11');
const CATALOGUE_VISUEL = getFormationCatalogueVisuel('NIV-11');
const META_TITLE_ABSOLUTE = 'Formation IA Assistant Maîtrise d\'ouvrage (AMO) | IDF';

const VOIR_AUSSI = [
  { href: LINKS.blogIaAmoAssistantMaitriseOuvrage, label: 'IA et AMO : 8 usages concrets' },
  { href: LINKS.blogTutoDepouillementOffresIa, label: 'Tuto : dépouiller des offres avec l’IA' },
  { href: LINKS.formationIaMaitriseOeuvre, label: 'Formation IA pour maîtres d’œuvre' },
] as const;

export const metadata = createPageMetadata({
  title: CATALOGUE_SEO.metaTitle,
  titleAbsolute: META_TITLE_ABSOLUTE,
  description: CATALOGUE_SEO.metaDescription,
  descriptionFinal: true,
  path: LINKS.formationIaAssistanceMaitriseOuvrage,
  openGraphType: 'website',
  openGraphTitle: META_TITLE_ABSOLUTE,
  openGraphDescription: CATALOGUE_SEO.metaDescription,
  alternatesLanguages: { 'fr-FR': `${SITE_CONFIG.url}${LINKS.formationIaAssistanceMaitriseOuvrage}` },
  image: {
    url: CATALOGUE_VISUEL.src,
    width: CATALOGUE_VISUEL.width,
    height: CATALOGUE_VISUEL.height,
    alt: CATALOGUE_VISUEL.alt,
  },
});

const courseSchema = buildCatalogueFormationCoursePageJsonLd('NIV-11');
const faqSchema = getFAQSchema(FAQ_AMO_NIV11);

export default function FormationIaAssistanceMaitriseOuvragePage() {
  const formation = getFormationByCode('NIV-11')!;

  return (
    <div>
      <JsonLd id="schema-course-niv-11" schema={courseSchema} />
      {faqSchema ? <JsonLd id="schema-faq-niv-11" schema={faqSchema} /> : null}

      <FormationSeoFicheShell
        h1={CATALOGUE_SEO.h1}
        enBref={CATALOGUE_SEO.enBref}
        faq={FAQ_AMO_NIV11}
        ctaSrcMid="fiche-amo"
        ctaSrcEnd="fiche-amo"
        ctaEndIntro="Un échange pour cadrer vos missions AMO et le format adapté à votre équipe."
        voirAussi={[...VOIR_AUSSI]}
      >
        <FormationAmoSeoBody />
      </FormationSeoFicheShell>

      <div className="mx-auto max-w-3xl px-4 pb-16">
        <TrainingPracticalInfo programmeRef="NIV-11" publicCible={formation.public} />
      </div>
    </div>
  );
}
