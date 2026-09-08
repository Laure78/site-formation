import { CatalogueInfosPratiques } from '@/components/InfosPratiques';
import { FormationProgrammePdfSection } from '@/components/formations/FormationCourseHero';
import { FormationTarifsModalitesSection } from '@/components/formations/FormationTarifsModalitesSection';
import type { FormationCatalogueCode } from '@/lib/formation-catalogue-visibility';
import { getFormationByCode } from '@/data/formations';

/**
 * Suite Indicateur 1 Qualiopi — immédiatement après `#programme` sur les fiches catalogue.
 * Ordre audit : tarifs → programme officiel PDF → informations réglementaires (11 sections).
 */
export function FormationCatalogueIndicateur1Suite({
  programmeRef,
}: {
  programmeRef: FormationCatalogueCode;
}) {
  const formation = getFormationByCode(programmeRef);
  const hasProgrammePdf = Boolean(formation?.pdfProgramme?.trim());

  return (
    <>
      <FormationTarifsModalitesSection catalogueRef={programmeRef} />
      {hasProgrammePdf ? <FormationProgrammePdfSection catalogueRef={programmeRef} /> : null}
      <CatalogueInfosPratiques programmeRef={programmeRef} />
    </>
  );
}
