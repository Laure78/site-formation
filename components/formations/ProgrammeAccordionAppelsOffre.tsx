import { TrainingProgramAccordion } from '@/components/formations/training/TrainingProgramAccordion';
import { getCatalogueFormationPageContent } from '@/lib/catalogue-formation-page-content';

/** @deprecated Préférer `programModules` sur la fiche NIV-02 — conservé pour imports legacy. */
export function ProgrammeAccordionAppelsOffre() {
  const { programModules } = getCatalogueFormationPageContent('NIV-02');
  if (!programModules?.length) return null;
  return <TrainingProgramAccordion modules={programModules} />;
}
