import { formatPersonnesFormeesCount } from '@/lib/constants';
import { IndicateursResultatsLink } from '@/components/formation/IndicateursResultatsLink';

const ITEMS = [
  `${formatPersonnesFormeesCount()} pros formés`,
  'Financement possible selon éligibilité',
  'Organisme certifié Qualiopi',
] as const;

export function FormationsSocialProofBar() {
  return (
    <div
      className="mt-8 rounded-2xl bg-[#F8F8F8] px-4 py-6 md:px-6 md:py-8"
      aria-label="Indicateurs de confiance"
    >
      <ul className="grid grid-cols-1 gap-y-5 text-center text-sm font-semibold leading-snug text-[#377CF3] sm:grid-cols-3 md:flex md:divide-x md:divide-[#377CF3]/25 md:py-1 md:text-base">
        {ITEMS.map((label) => (
          <li key={label} className="flex min-h-[2.5rem] items-center justify-center px-2 md:flex-1 md:px-4">
            {label}
          </li>
        ))}
      </ul>
      <IndicateursResultatsLink className="mt-4" />
    </div>
  );
}
