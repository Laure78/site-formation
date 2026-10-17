import { ClipboardCheck } from 'lucide-react';
import { TrainingSection } from '@/components/formations/training/TrainingSection';
import { TRAINING_ANCHOR } from '@/lib/training-fiche-nav';
import { getInfosPratiquesForCatalogue } from '@/lib/infos-pratiques-catalogue';

type Props = {
  programmeRef: string;
};

export function TrainingEvaluationSection({ programmeRef }: Props) {
  const infos = getInfosPratiquesForCatalogue(programmeRef);
  const lines = infos.modalitesEvaluation;
  if (!lines?.length) return null;

  return (
    <TrainingSection
      id={TRAINING_ANCHOR.evaluation}
      title="Suivi et évaluation"
      description="Assiduité, évaluation des acquis et satisfaction — procédures distinctes."
      tone="white"
      icon={ClipboardCheck}
    >
      <ul className="space-y-3">
        {lines.map((line) => (
          <li
            key={line}
            className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-3.5 text-base leading-relaxed text-slate-800"
          >
            {line}
          </li>
        ))}
      </ul>
    </TrainingSection>
  );
}
