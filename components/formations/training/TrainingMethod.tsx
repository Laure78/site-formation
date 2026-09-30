import { TrainingSection } from '@/components/formations/training/TrainingSection';

type Props = {
  title?: string;
  paragraphs?: readonly string[];
  steps: readonly string[];
  note?: string;
  id?: string;
};

/** Déroulement en 3 étapes — timeline sobre, sans image banque. */
export function TrainingMethod({
  title = 'Comment se déroule la formation ?',
  paragraphs,
  steps,
  note,
  id = 'modalites',
}: Props) {
  if (steps.length === 0) return null;

  return (
    <TrainingSection
      id={id}
      title={title}
      description={
        paragraphs && paragraphs.length > 0 ? (
          <div className="space-y-2">
            {paragraphs.map((p) => (
              <p key={p}>{p}</p>
            ))}
          </div>
        ) : undefined
      }
      tone="white"
    >
      <ol className="grid gap-4 md:grid-cols-3">
        {steps.map((step, index) => (
          <li
            key={step}
            className="relative flex h-full flex-col rounded-2xl border border-slate-200 bg-slate-50/70 p-5 md:p-6"
          >
            <span
              className="font-display text-3xl font-bold tracking-tight text-[#377CF3]"
              aria-hidden
            >
              {String(index + 1).padStart(2, '0')}
            </span>
            <p className="mt-3 text-base font-medium leading-relaxed text-slate-800">{step}</p>
          </li>
        ))}
      </ol>
      {note ? <p className="mt-6 text-sm leading-relaxed text-slate-600">{note}</p> : null}
    </TrainingSection>
  );
}
