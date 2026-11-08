import type { FormationNiveau } from '@/data/formations';
import { formationNiveauOfficielLabel } from '@/lib/formation-niveaux-officiels';

type Props = {
  niveau: FormationNiveau;
  className?: string;
};

/** Badge niveau officiel — « Niveau X · … ». */
export function FormationLevelBadge({ niveau, className = '' }: Props) {
  return (
    <span className={`text-sm font-semibold text-[#101936] ${className}`.trim()}>
      {formationNiveauOfficielLabel(niveau)}
    </span>
  );
}
