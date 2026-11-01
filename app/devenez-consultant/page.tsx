import { FAQAccordion } from '@/components/a-propos/FAQAccordion';
import { ScrollToHashOnLoad } from '@/components/navigation/ScrollToHashOnLoad';
import { DevenezConsultantCandidatureSection } from '@/components/career/DevenezConsultantCandidatureSection';
import { ConsultantExpertiseCards } from '@/components/career/ConsultantExpertiseCards';
import { ConsultantParcoursMetiersSection } from '@/components/career/ConsultantFormationsSection';
import {
  ConsultantRecruitmentBtpRequirementSection,
  ConsultantRecruitmentCompetencesSection,
  ConsultantRecruitmentMissionSection,
  ConsultantRecruitmentModalitesSection,
  ConsultantRecruitmentProfilsSection,
} from '@/components/career/ConsultantRecruitment2027Editorial';
import { ConsultantRecruitmentHero } from '@/components/career/ConsultantRecruitmentHero';
import { JsonLd } from '@/components/JsonLd';
import { ConsultantSelectionTimeline } from '@/components/career/ConsultantSelectionTimeline';
import { ConsultantWhyOfcSection } from '@/components/career/ConsultantWhyOfcSection';
import { BreadcrumbJsonLd } from '@/components/seo/BreadcrumbJsonLd';
import { CONSULTANT_FAQ_ITEMS } from '@/lib/consultant-recruitment-content';
import { LINKS } from '@/lib/internal-links';
import { OFC_READABLE_COLUMN, ofcSectionClasses } from '@/lib/ofc-section-classes';
import { createPageMetadata, getFAQSchema, SITE_CONFIG } from '@/lib/seo';

export const revalidate = 3600;

const SOURCE_PAGE = `${SITE_CONFIG.url.replace(/\/$/, '')}${LINKS.devenezConsultant}`;

const BREADCRUMB_JSON_LD = [
  { name: 'Accueil', url: SITE_CONFIG.url },
  { name: 'Devenez consultant', url: SOURCE_PAGE },
] as const;

export const metadata = createPageMetadata({
  title: 'Devenez formateur IA BTP : recrutement 2027',
  description:
    'Formation IA pour le BTP : recrutement 2027 de formateurs indépendants (2 ans d’expérience métier, ChatGPT ou Claude). Missions en présentiel en Île-de-France. Candidature en ligne.',
  path: LINKS.devenezConsultant,
  keywords: [
    'formateur indépendant IA BTP',
    'consultant-formateur IA BTP',
    'devenir formateur IA BTP',
    'formateur IA bâtiment',
    'formateur ChatGPT BTP',
    'recrutement formateur IA BTP 2027',
    'collaboration formateur indépendant Île-de-France',
  ],
});

const FAQ_SCHEMA = getFAQSchema(CONSULTANT_FAQ_ITEMS);

export default function DevenezConsultantPage() {
  return (
    <div>
      <ScrollToHashOnLoad />
      <BreadcrumbJsonLd items={[...BREADCRUMB_JSON_LD]} id="schema-breadcrumb-devenez-consultant" />
      {FAQ_SCHEMA ? <JsonLd id="schema-faq-devenez-consultant" schema={FAQ_SCHEMA} /> : null}

      <ConsultantRecruitmentHero />
      <ConsultantRecruitmentBtpRequirementSection />
      <ConsultantRecruitmentProfilsSection />
      <ConsultantRecruitmentMissionSection />
      <ConsultantRecruitmentCompetencesSection />
      <ConsultantRecruitmentModalitesSection />
      <ConsultantSelectionTimeline />

      <ConsultantExpertiseCards />
      <ConsultantWhyOfcSection />
      <ConsultantParcoursMetiersSection />
      <DevenezConsultantCandidatureSection sourcePage={SOURCE_PAGE} />

      <section
        className={ofcSectionClasses({ tone: 'muted', size: 'compact' })}
        aria-labelledby="faq-title"
      >
        <div className={OFC_READABLE_COLUMN}>
          <FAQAccordion
            id="faq"
            title="Questions fréquentes — consultant-formateur IA BTP"
            subtitle="Réponses courtes pour préparer votre proposition."
            items={CONSULTANT_FAQ_ITEMS}
          />
        </div>
      </section>
    </div>
  );
}
