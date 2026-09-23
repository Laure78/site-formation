import { CatalogueInfosPratiques } from '@/components/InfosPratiques';
import { DevWebIaProgrammesPdfSection } from '@/components/formations/DevWebIaProgrammesPdfSection';
import { FormationProgrammePdfSection } from '@/components/formations/FormationCourseHero';
import { FormationTarifsModalitesSection } from '@/components/formations/FormationTarifsModalitesSection';
import { TrainingTrainer } from '@/components/formations/training/TrainingTrainer';
import type { FormationCatalogueCode } from '@/lib/formation-catalogue-visibility';
import { getFormationByCode } from '@/data/formations';

/**
 * Suite Indicateur 1 Qualiopi — tarifs → formatrice → PDF → infos réglementaires.
 * Ordre aligné gabarit commun fiches formation.
 */
export function FormationCatalogueIndicateur1Suite({
  programmeRef,
  showTrainer = true,
}: {
  programmeRef: FormationCatalogueCode;
  /** Désactiver si la page affiche déjà TrainingTrainer. */
  showTrainer?: boolean;
}) {
  const formation = getFormationByCode(programmeRef);
  const hasProgrammePdf = Boolean(formation?.pdfProgramme?.trim());

  return (
    <>
      <FormationTarifsModalitesSection catalogueRef={programmeRef} />
      {showTrainer ? <TrainingTrainer /> : null}
      {programmeRef === 'NIV-10' ? (
        <DevWebIaProgrammesPdfSection />
      ) : hasProgrammePdf ? (
        <FormationProgrammePdfSection catalogueRef={programmeRef} />
      ) : null}
      <CatalogueInfosPratiques programmeRef={programmeRef} />
    </>
  );
}
