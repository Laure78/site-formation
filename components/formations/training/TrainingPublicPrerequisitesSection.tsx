import { Users } from 'lucide-react';
import { TrainingSection } from '@/components/formations/training/TrainingSection';
import { TRAINING_ANCHOR } from '@/lib/training-fiche-nav';
import type { CataloguePrerequisiteBlock } from '@/lib/catalogue-formation-page-content';

type Props = {
  publicLabel: string;
  blocks?: readonly CataloguePrerequisiteBlock[];
  /** Prérequis réglementaires (texte Qualiopi) si pas de blocs éditoriaux. */
  prerequisitesText?: string;
};

/** Public concerné et prérequis — deux encadrés (fiche programme). */
export function TrainingPublicPrerequisitesSection({
  publicLabel,
  blocks = [],
  prerequisitesText,
}: Props) {
  const hasPrerequis = blocks.length > 0 || Boolean(prerequisitesText?.trim());
  if (!publicLabel && !hasPrerequis) return null;

  return (
    <TrainingSection
      id={TRAINING_ANCHOR.publicPrerequis}
      title="Public et prérequis"
      tone="muted"
      icon={Users}
    >
      <div className="grid gap-4 md:grid-cols-2">
        <div className="rounded-2xl border border-slate-200 bg-white p-5 md:p-6">
          <h3 className="font-display text-base font-semibold text-slate-900">Public concerné</h3>
          <p className="mt-3 text-base leading-relaxed text-slate-700">{publicLabel}</p>
        </div>
        {hasPrerequis ? (
          <div className="rounded-2xl border border-slate-200 bg-white p-5 md:p-6">
            {blocks.length > 0 ? (
              blocks.map((block, index) => (
                <div key={block.title} className={index > 0 ? 'mt-6 border-t border-slate-100 pt-6' : undefined}>
                  <h3 className="font-display text-base font-semibold text-slate-900">{block.title}</h3>
                  <ul className="mt-3 list-disc space-y-1.5 pl-5 text-base text-slate-700">
                    {block.items.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </div>
              ))
            ) : (
              <>
                <h3 className="font-display text-base font-semibold text-slate-900">Prérequis</h3>
                <p className="mt-3 text-base leading-relaxed text-slate-700">{prerequisitesText}</p>
              </>
            )}
          </div>
        ) : null}
      </div>
    </TrainingSection>
  );
}
