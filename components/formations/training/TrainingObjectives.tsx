import { TrainingSection } from '@/components/formations/training/TrainingSection';

type Props = {
  objectives: readonly string[];
  title?: string;
  description?: string;
  /** Limite d’affichage (défaut 5). */
  max?: number;
};

/** Objectifs orientés action — données inchangées, présentation unifiée. */
export function TrainingObjectives({
  objectives,
  title = 'À l’issue de la formation, vous saurez…',
  description,
  max = 5,
}: Props) {
  const items = objectives.slice(0, max);
  if (items.length === 0) return null;
  return (
    <TrainingSection id="objectifs" title={title} description={description} tone="white">
      <ol className="grid gap-3 sm:grid-cols-2">
        {items.map((obj, i) => (
          <li
            key={obj}
            className="flex gap-3 rounded-xl border border-slate-200/90 bg-slate-50/60 px-4 py-4"
          >
            <span
              className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#377CF3]/10 text-xs font-bold text-[#377CF3]"
              aria-hidden
            >
              {String(i + 1).padStart(2, '0')}
            </span>
            <span className="text-sm leading-relaxed text-slate-800 md:text-[0.95rem]">{obj}</span>
          </li>
        ))}
      </ol>
    </TrainingSection>
  );
}
