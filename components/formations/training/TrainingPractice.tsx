import { TrainingSection } from '@/components/formations/training/TrainingSection';

type Props = {
  cases: readonly string[];
  title?: string;
  description?: string;
};

/** Cas pratiques — uniquement les exemples fournis par la fiche. */
export function TrainingPractice({
  cases,
  title = 'Une formation orientée pratique',
  description = 'Cas travaillés pendant la session — sur vos documents et process, avec validation métier.',
}: Props) {
  if (cases.length === 0) return null;
  return (
    <TrainingSection id="cas-pratiques" title={title} description={description} tone="white">
      <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {cases.map((c) => (
          <li
            key={c}
            className="rounded-xl border border-slate-200/90 bg-slate-50/70 px-4 py-4 text-sm font-medium leading-snug text-slate-800"
          >
            {c}
          </li>
        ))}
      </ul>
    </TrainingSection>
  );
}
