import { formatNoteSatisfactionSur5 } from '@/lib/data/indicateurs-resultats';

const ITEMS = [
  'Qualiopi',
  'Présentiel Île-de-France',
  `${formatNoteSatisfactionSur5()} de satisfaction`,
  'Prise en charge OPCO/Constructys selon éligibilité',
] as const;

/** Ligne de réassurance sous la recherche catalogue. */
export function FormationsCatalogueReassuranceLine() {
  return (
    <p
      className="flex flex-wrap items-center gap-x-2 gap-y-1 text-sm text-ofc-ink-muted"
      aria-label="Garanties et modalités"
    >
      {ITEMS.map((label, index) => (
        <span key={label} className="inline-flex items-center gap-2">
          {index > 0 ? (
            <span className="text-ofc-ink-subtle" aria-hidden>
              ·
            </span>
          ) : null}
          <span>{label}</span>
        </span>
      ))}
    </p>
  );
}
