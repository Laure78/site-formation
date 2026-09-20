import { TrainingSection } from '@/components/formations/training/TrainingSection';

export type TrainingQuickFact = {
  label: string;
  value: string;
};

type Props = {
  facts: TrainingQuickFact[];
  title?: string;
};

/** Grille « Formation en résumé » — valeurs fournies par la fiche (jamais inventées). */
export function TrainingQuickFacts({
  facts,
  title = 'Formation en résumé',
}: Props) {
  if (facts.length === 0) return null;
  return (
    <TrainingSection id="formation-resume" title={title} tone="muted">
      <dl className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {facts.map((f) => (
          <div
            key={f.label}
            className="rounded-xl border border-slate-200/90 bg-white px-4 py-4"
          >
            <dt className="text-xs font-semibold uppercase tracking-[0.12em] text-slate-500">
              {f.label}
            </dt>
            <dd className="mt-1.5 text-sm font-medium leading-snug text-slate-900">{f.value}</dd>
          </div>
        ))}
      </dl>
    </TrainingSection>
  );
}
