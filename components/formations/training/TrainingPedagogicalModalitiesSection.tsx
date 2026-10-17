import { Briefcase } from 'lucide-react';
import { TrainingSection } from '@/components/formations/training/TrainingSection';
import { TRAINING_ANCHOR } from '@/lib/training-fiche-nav';
import { getInfosPratiquesForCatalogue } from '@/lib/infos-pratiques-catalogue';

type Props = {
  programmeRef: string;
};

export function TrainingPedagogicalModalitiesSection({ programmeRef }: Props) {
  const infos = getInfosPratiquesForCatalogue(programmeRef);
  const methodes = infos.methodes ?? [];
  const modalite = infos.modalitePedagogique;

  if (methodes.length === 0 && !modalite) return null;

  return (
    <TrainingSection
      id={TRAINING_ANCHOR.modalitesPedagogiques}
      title="Modalités pédagogiques"
      tone="muted"
      icon={Briefcase}
    >
      {modalite ? (
        <p className="max-w-3xl text-base leading-relaxed text-slate-700">{modalite}</p>
      ) : null}
      {methodes.length > 0 ? (
        <ul className={`space-y-2 ${modalite ? 'mt-6' : ''}`}>
          {methodes.map((m) => (
            <li key={m} className="flex gap-2 text-base text-slate-800">
              <span className="text-[#377CF3]" aria-hidden>
                ·
              </span>
              {m}
            </li>
          ))}
        </ul>
      ) : null}
    </TrainingSection>
  );
}
