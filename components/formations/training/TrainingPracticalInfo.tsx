import { CatalogueInfosPratiques } from '@/components/InfosPratiques';

type Props = {
  programmeRef: string;
  publicCible?: string;
  className?: string;
};

/**
 * Informations réglementaires Qualiopi — délègue à CatalogueInfosPratiques
 * (aucune section réglementaire n’est retirée).
 */
export function TrainingPracticalInfo({ programmeRef, publicCible, className }: Props) {
  return (
    <CatalogueInfosPratiques
      programmeRef={programmeRef}
      compact
      publicCible={publicCible}
      className={className}
    />
  );
}
