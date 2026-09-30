import { Check } from 'lucide-react';
import { TrainingSection } from '@/components/formations/training/TrainingSection';

type Props = {
  outcomes: readonly string[];
  title?: string;
  description?: string;
  pedagogicalNote?: string;
  /** Limite d’affichage (défaut 6). */
  max?: number;
};

/** Checklist « Après la formation, vous saurez… » + encadré pédagogique. */
export function TrainingOutcomes({
  outcomes,
  title = 'Après la formation, vous saurez…',
  description,
  pedagogicalNote,
  max = 6,
}: Props) {
  const items = outcomes.slice(0, max);
  if (items.length === 0) return null;

  return (
    <TrainingSection id="objectifs" title={title} description={description} tone="muted">
      <ul className="space-y-3">
        {items.map((outcome) => (
          <li
            key={outcome}
            className="flex gap-3 rounded-xl border border-slate-200/90 bg-white px-4 py-3.5 md:px-5"
          >
            <span
              className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#377CF3]/10"
              aria-hidden
            >
              <Check className="h-3.5 w-3.5 text-[#377CF3]" strokeWidth={2.5} />
            </span>
            <span className="text-base leading-relaxed text-slate-800">{outcome}</span>
          </li>
        ))}
      </ul>

      {pedagogicalNote ? (
        <aside
          className="mt-8 rounded-2xl border border-[#377CF3]/25 bg-[rgba(55,124,243,0.06)] px-5 py-4 md:px-6 md:py-5"
          aria-label="Principe pédagogique"
        >
          <p className="font-display text-base font-semibold leading-snug text-slate-900 md:text-lg">
            {pedagogicalNote}
          </p>
        </aside>
      ) : null}
    </TrainingSection>
  );
}
