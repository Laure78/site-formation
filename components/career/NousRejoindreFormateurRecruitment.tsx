import { ConsultantSelectionTimeline } from '@/components/career/ConsultantSelectionTimeline';
import { ConsultantWhyOfcSection } from '@/components/career/ConsultantWhyOfcSection';
import {
  NousRejoindreCompetencesSection,
  NousRejoindreConversionBand,
  NousRejoindreHeroSection,
  NousRejoindreInfoStrip,
  NousRejoindreMissionSection,
  NousRejoindreProfilsSection,
} from '@/components/career/NousRejoindreLandingSections';

/** Hub formateurs indépendants — landing /nous-rejoindre (sans formulaire). */
export function NousRejoindreFormateurRecruitment() {
  return (
    <>
      <NousRejoindreHeroSection />
      <NousRejoindreInfoStrip />
      <NousRejoindreProfilsSection />
      <NousRejoindreMissionSection />
      <NousRejoindreCompetencesSection />
      <ConsultantWhyOfcSection />
      <ConsultantSelectionTimeline />
      <NousRejoindreConversionBand />
    </>
  );
}
