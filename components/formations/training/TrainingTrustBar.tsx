import { IndicateursResultatsLink } from '@/components/formation/IndicateursResultatsLink';
import {
  formatNoteSatisfactionAffichageComplet,
  formatPeriodeReferenceAffichage,
} from '@/lib/data/indicateurs-resultats';
import { cn } from '@/lib/cn';

export type TrainingTrustItem = {
  label: string;
};

type Props = {
  /** Indicateurs fournis — sinon indicateurs OFC standards (max 5). */
  items?: readonly TrainingTrustItem[];
  programmeVersionLabel?: string;
  className?: string;
  showIndicateursLink?: boolean;
};

function defaultItems(programmeVersionLabel?: string): TrainingTrustItem[] {
  const items: TrainingTrustItem[] = [
    { label: 'Organisme certifié Qualiopi' },
    { label: 'Formation spécialisée BTP' },
    {
      label: `Satisfaction : ${formatNoteSatisfactionAffichageComplet()} (${formatPeriodeReferenceAffichage()})`,
    },
  ];
  if (programmeVersionLabel) {
    items.push({ label: `Programme actualisé — ${programmeVersionLabel}` });
  }
  return items.slice(0, 5);
}

/** Barre de réassurance sous le hero — sobre, max 5 indicateurs. */
export function TrainingTrustBar({
  items,
  programmeVersionLabel,
  className,
  showIndicateursLink = true,
}: Props) {
  const resolved = (items ?? defaultItems(programmeVersionLabel)).slice(0, 5);
  if (resolved.length === 0) return null;

  return (
    <section
      className={cn('border-b border-slate-200 bg-[#F2F2F2] px-4 py-5 md:py-6', className)}
      aria-label="Preuves et indicateurs"
    >
      <div className="mx-auto max-w-[78rem]">
        <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
          {resolved.map((item) => (
            <li
              key={item.label}
              className="flex items-start gap-2.5 text-sm leading-snug text-slate-700 md:text-[0.9375rem]"
            >
              <span
                className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#377CF3]/12 text-[0.65rem] font-bold text-[#377CF3]"
                aria-hidden
              >
                ✓
              </span>
              <span>{item.label}</span>
            </li>
          ))}
        </ul>
        {showIndicateursLink ? <IndicateursResultatsLink className="mt-3 text-left" /> : null}
      </div>
    </section>
  );
}
