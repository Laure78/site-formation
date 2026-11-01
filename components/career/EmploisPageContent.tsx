import { FAQAccordion } from '@/components/a-propos/FAQAccordion';
import { CandidatureSpontaneeSection } from '@/components/career/CandidatureSpontaneeSection';
import { ConsultantFormateurCandidatureSection } from '@/components/career/ConsultantFormateurCandidatureSection';
import { JobOffersSection } from '@/components/career/JobOffersSection';
import { NousRejoindreFormateurRecruitment } from '@/components/career/NousRejoindreFormateurRecruitment';
import { RejoindreEquipeOfferSection } from '@/components/career/RejoindreEquipeOfferSection';
import { ScrollToHashOnLoad } from '@/components/navigation/ScrollToHashOnLoad';
import { NOUS_REJOINDRE_RECRUTEMENT_FAQ } from '@/lib/consultant-recruitment-content';
import { getPublishedJobOffers } from '@/lib/data/job-offers';
import { RECRUITMENT_PAGE_INNER } from '@/lib/devenez-consultant-layout';
import { LINKS } from '@/lib/internal-links';
import { ofcSectionClasses } from '@/lib/ofc-section-classes';
import { SITE_CONFIG } from '@/lib/seo';

const FORMATEUR_SOURCE_PAGE = `${SITE_CONFIG.url.replace(/\/$/, '')}${LINKS.nousRejoindre}`;

export function EmploisPageContent() {
  const offers = getPublishedJobOffers();
  const hasOffers = offers.length > 0;

  return (
    <div className="emplois-page min-w-0">
      <ScrollToHashOnLoad />
      <NousRejoindreFormateurRecruitment />

      <RejoindreEquipeOfferSection />

      <ConsultantFormateurCandidatureSection
        sourcePage={FORMATEUR_SOURCE_PAGE}
        embedded
      />

      <section
        className={`${ofcSectionClasses({ tone: 'white', size: 'compact', divide: true })} emplois-page__bottom`}
        aria-labelledby="recrutement-faq-title"
      >
        <div className={`${RECRUITMENT_PAGE_INNER} min-w-0 max-w-3xl`}>
          <FAQAccordion
            id="recrutement-faq"
            title="Questions fréquentes"
            subtitle="Missions indépendantes, sélection et candidatures formateur IA BTP."
            items={NOUS_REJOINDRE_RECRUTEMENT_FAQ}
            framedList
          />
        </div>

        <div className={`${RECRUITMENT_PAGE_INNER} mt-10 min-w-0 border-t border-slate-200/80 pt-8`}>
          <JobOffersSection compactEmpty={!hasOffers} />
        </div>
      </section>

      <CandidatureSpontaneeSection />
    </div>
  );
}
