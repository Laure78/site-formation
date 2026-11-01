import { ConsultantSelectionTimeline } from '@/components/career/ConsultantSelectionTimeline';
import { ConsultantWhyOfcSection } from '@/components/career/ConsultantWhyOfcSection';
import { RejoindreEquipeOfferSection } from '@/components/career/RejoindreEquipeOfferSection';
import {
  NousRejoindreCandidatureSection,
  NousRejoindreCompetencesSection,
  NousRejoindreHeroSection,
  NousRejoindreInfoStrip,
  NousRejoindreMissionSection,
  NousRejoindreProfilsSection,
} from '@/components/career/NousRejoindreLandingSections';
import { getPublishedJobOffers } from '@/lib/data/job-offers';

/** Hub formateurs indépendants — landing /nous-rejoindre (sans formulaire). */
export function NousRejoindreFormateurRecruitment() {
  const hasJobOffers = getPublishedJobOffers().length > 0;

  return (
    <>
      <NousRejoindreHeroSection />
      <NousRejoindreInfoStrip />
      <NousRejoindreProfilsSection />
      <NousRejoindreMissionSection />
      <NousRejoindreCompetencesSection />
      <ConsultantWhyOfcSection />
      <ConsultantSelectionTimeline />
      <RejoindreEquipeOfferSection />
      <NousRejoindreCandidatureSection hasJobOffers={hasJobOffers} />
    </>
  );
}
