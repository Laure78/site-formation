import { CatalogueInfosPratiques } from '@/components/InfosPratiques';
import { FormationProgrammePdfSection } from '@/components/formations/FormationCourseHero';

/**
 * Suite Indicateur 1 Qualiopi — immédiatement après `#programme` sur les fiches catalogue.
 * Ordre audit : contenu détaillé (HTML) → programme officiel PDF → informations réglementaires (11 sections).
 */
export function FormationCatalogueIndicateur1Suite({
  programmeRef,
}: {
  programmeRef: string;
}) {
  return (
    <>
      <FormationProgrammePdfSection catalogueRef={programmeRef} />
      <CatalogueInfosPratiques programmeRef={programmeRef} />
    </>
  );
}
