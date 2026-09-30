import { TrainingProgramAccordion } from '@/components/formations/training/TrainingProgramAccordion';
import { getCatalogueFormationPageContent } from '@/lib/catalogue-formation-page-content';

/** Programme NIV-01 — délègue à TrainingProgramAccordion (source = contenu catalogue). */
export function ProgrammeAccordionBatiment() {
  const modules = getCatalogueFormationPageContent('NIV-01').programModules ?? [];
  return <TrainingProgramAccordion modules={modules} className="mt-5" />;
}
