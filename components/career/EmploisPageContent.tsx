import { FAQAccordion } from '@/components/a-propos/FAQAccordion';
import { CandidatureSpontaneeSection } from '@/components/career/CandidatureSpontaneeSection';
import { ConsultantFormateurCandidatureSection } from '@/components/career/ConsultantFormateurCandidatureSection';
import { JobOffersSection } from '@/components/career/JobOffersSection';
import { NousRejoindreFormateurRecruitment } from '@/components/career/NousRejoindreFormateurRecruitment';
import { NOUS_REJOINDRE_RECRUTEMENT_FAQ } from '@/lib/consultant-recruitment-content';
import type { NousRejoindreRecruitmentCategoryId } from '@/lib/consultant-recruitment-content';
import { getPublishedJobOffers } from '@/lib/data/job-offers';
import { RECRUITMENT_PAGE_INNER } from '@/lib/devenez-consultant-layout';
import { LINKS } from '@/lib/internal-links';
import { ofcSectionClasses } from '@/lib/ofc-section-classes';
import { SITE_CONFIG } from '@/lib/seo';

const FORMATEUR_SOURCE_PAGE = `${SITE_CONFIG.url.replace(/\/$/, '')}${LINKS.nousRejoindre}`;

const VALID_ANIMER: readonly NousRejoindreRecruitmentCategoryId[] = [
  'parcours-metiers',
  'formations-ia-btp',
];

function parseInitialRecruitmentCategories(
  animer?: string,
): NousRejoindreRecruitmentCategoryId[] {
  if (!animer?.trim()) return [];
  return animer
    .split(',')
    .map((s) => s.trim())
    .filter((s): s is NousRejoindreRecruitmentCategoryId =>
      VALID_ANIMER.includes(s as NousRejoindreRecruitmentCategoryId),
    );
}

type EmploisPageContentProps = {
  animer?: string;
};

export function EmploisPageContent({ animer }: EmploisPageContentProps) {
  const offers = getPublishedJobOffers();
  const hasOffers = offers.length > 0;
  const initialCategories = parseInitialRecruitmentCategories(animer);

  return (
    <div className="emplois-page min-w-0">
      <NousRejoindreFormateurRecruitment />

      <ConsultantFormateurCandidatureSection
        sourcePage={FORMATEUR_SOURCE_PAGE}
        embedded
        initialRecruitmentCategories={initialCategories}
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
