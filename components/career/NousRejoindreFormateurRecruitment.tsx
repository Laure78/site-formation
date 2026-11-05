import { ConsultantSelectionTimeline } from '@/components/career/ConsultantSelectionTimeline';
import {
  NousRejoindreCompetencesSection,
  NousRejoindreHeroSection,
  NousRejoindreInfoStrip,
  NousRejoindreMissionSection,
  NousRejoindreMissionsCardsSection,
  NousRejoindreProfilsSection,
} from '@/components/career/NousRejoindreLandingSections';

/** Hub formateurs indépendants — landing /nous-rejoindre (sans formulaire). */
export function NousRejoindreFormateurRecruitment() {
  return (
    <>
      <NousRejoindreHeroSection />
      <NousRejoindreInfoStrip />
      <NousRejoindreMissionsCardsSection />
      <NousRejoindreProfilsSection />
      <NousRejoindreMissionSection />
      <NousRejoindreCompetencesSection />
      <ConsultantSelectionTimeline />
    </>
  );
}
