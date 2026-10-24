import { Award, MapPin, Wallet } from 'lucide-react';
import { formatNoteSatisfactionSur5 } from '@/lib/data/indicateurs-resultats';

const ITEMS = [
  { icon: Award, label: 'Qualiopi' },
  { icon: MapPin, label: 'Présentiel Île-de-France' },
  {
    icon: Wallet,
    label: 'Prise en charge OPCO/Constructys selon éligibilité',
  },
] as const;

/** Ligne de réassurance sous les CTA du hero — chiffres depuis les sources Qualiopi. */
export function AccueilHeroReassurance() {
  const note = formatNoteSatisfactionSur5();

  return (
    <ul
      className="mt-4 flex flex-col gap-2 text-xs leading-snug text-ofc-ink-muted sm:flex-row sm:flex-wrap sm:items-center sm:gap-x-1 sm:gap-y-2 sm:text-sm"
      aria-label="Garanties et modalités"
    >
      {ITEMS.map(({ icon: Icon, label }, index) => (
        <li key={label} className="flex min-w-0 items-start gap-1.5 sm:items-center">
          {index > 0 ? (
            <span className="hidden text-ofc-ink-subtle sm:inline" aria-hidden>
              ·
            </span>
          ) : null}
          <Icon
            className="mt-0.5 h-4 w-4 shrink-0 text-[#377CF3] sm:mt-0"
            strokeWidth={1.75}
            aria-hidden
          />
          <span>{label}</span>
        </li>
      ))}
      <li className="flex min-w-0 items-start gap-1.5 sm:items-center">
        <span className="hidden text-ofc-ink-subtle sm:inline" aria-hidden>
          ·
        </span>
        <span className="font-semibold text-ofc-ink">{note}</span>
        <span>de satisfaction</span>
      </li>
    </ul>
  );
}
