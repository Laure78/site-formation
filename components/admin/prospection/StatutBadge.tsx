import { statutBadgeClass, statutLabel } from '@/lib/prospection/constants';

export function StatutBadge({ statut }: { statut: string | null | undefined }) {
  return (
    <span
      className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-medium ${statutBadgeClass(statut)}`}
    >
      {statutLabel(statut)}
    </span>
  );
}
