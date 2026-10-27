import { FAQAccordion } from '@/components/a-propos/FAQAccordion';
import { ScrollToHashOnLoad } from '@/components/navigation/ScrollToHashOnLoad';
import { DevenezConsultantCandidatureSection } from '@/components/career/DevenezConsultantCandidatureSection';
import { ConsultantExpertiseCards } from '@/components/career/ConsultantExpertiseCards';
import { ConsultantParcoursMetiersSection } from '@/components/career/ConsultantFormationsSection';
import { ConsultantRecruitmentAnnonceSection } from '@/components/career/ConsultantRecruitmentAnnonceSection';
import { ConsultantRecruitmentHero } from '@/components/career/ConsultantRecruitmentHero';
import { ConsultantSelectionTimeline } from '@/components/career/ConsultantSelectionTimeline';
import { ConsultantWhyOfcSection } from '@/components/career/ConsultantWhyOfcSection';
import { BreadcrumbJsonLd } from '@/components/seo/BreadcrumbJsonLd';
import { CONSULTANT_FAQ_ITEMS } from '@/lib/consultant-recruitment-content';
import { DEVENEZ_CONSULTANT_INNER } from '@/lib/devenez-consultant-layout';
import { LINKS } from '@/lib/internal-links';
import { ofcSectionClasses } from '@/lib/ofc-section-classes';
import { createPageMetadata, SITE_CONFIG } from '@/lib/seo';

export const revalidate = 3600;

const SOURCE_PAGE = `${SITE_CONFIG.url.replace(/\/$/, '')}${LINKS.devenezConsultant}`;

const BREADCRUMB_JSON_LD = [
  { name: 'Accueil', url: SITE_CONFIG.url },
  { name: 'Devenez consultant', url: SOURCE_PAGE },
] as const;

export const metadata = createPageMetadata({
  title: 'Devenez consultant-formateur IA BTP',
  description:
    'Expert du BTP et utilisateur de l’IA ? Présentez votre candidature pour animer les parcours métiers IA en présentiel en Île-de-France. Questionnaire en ligne.',
  path: LINKS.devenezConsultant,
  keywords: [
    'formateur indépendant IA BTP',
    'consultant-formateur IA BTP',
    'devenir formateur IA BTP',
    'formateur IA bâtiment',
    'formateur ChatGPT BTP',
    'collaboration formateur indépendant Île-de-France',
  ],
});

export default function DevenezConsultantPage() {
  return (
    <div>
      <ScrollToHashOnLoad />
      <BreadcrumbJsonLd items={[...BREADCRUMB_JSON_LD]} id="schema-breadcrumb-devenez-consultant" />

      <ConsultantRecruitmentHero />
      <DevenezConsultantCandidatureSection sourcePage={SOURCE_PAGE} />
      <ConsultantRecruitmentAnnonceSection />
      <ConsultantSelectionTimeline />

      <ConsultantExpertiseCards />
      <ConsultantWhyOfcSection />
      <ConsultantParcoursMetiersSection />

      <section className={ofcSectionClasses({ tone: 'muted', size: 'compact' })}>
        <div className={DEVENEZ_CONSULTANT_INNER}>
          <FAQAccordion
            title="Questions fréquentes — consultant-formateur IA BTP"
            subtitle="Réponses courtes pour préparer votre proposition."
            items={CONSULTANT_FAQ_ITEMS}
          />
        </div>
      </section>
    </div>
  );
}
