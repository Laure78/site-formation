import { formatContentUpdatedLabel } from '@/lib/content-updated-at';

type Props = {
  /** Date figée YYYY-MM-DD (champ de données, pas `new Date()`). */
  date: string;
  className?: string;
};

/**
 * Mention discrète de fraîcheur éditoriale — « Mis à jour le … ».
 */
export function ContentUpdatedLine({ date, className = 'mt-2 text-xs text-slate-500' }: Props) {
  return (
    <p className={className}>
      <time dateTime={date}>{formatContentUpdatedLabel(date)}</time>
    </p>
  );
}
