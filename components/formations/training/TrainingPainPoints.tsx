import { TrainingSection } from '@/components/formations/training/TrainingSection';
import { FileText, Mail, ClipboardList, FolderOpen } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

export type TrainingPainPoint = {
  title: string;
  texte: string;
  icon?: LucideIcon;
};

const DEFAULT_ICONS: LucideIcon[] = [FileText, ClipboardList, FolderOpen, Mail];

type Props = {
  title?: string;
  items: readonly TrainingPainPoint[];
  id?: string;
};

/** Cartes « faite pour vous si… » — même hauteur, icônes discrètes. */
export function TrainingPainPoints({
  title = 'Cette formation est faite pour vous si…',
  items,
  id = 'pour-qui',
}: Props) {
  if (items.length === 0) return null;

  return (
    <TrainingSection id={id} title={title} tone="white">
      <ul className="grid gap-4 sm:grid-cols-2">
        {items.map((item, index) => {
          const Icon = item.icon ?? DEFAULT_ICONS[index % DEFAULT_ICONS.length];
          return (
            <li key={item.title} className="h-full">
              <article className="flex h-full flex-col rounded-2xl border border-slate-200 bg-slate-50/80 p-5 md:p-6">
                <div className="flex items-center gap-3">
                  <span
                    className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white ring-1 ring-slate-200"
                    aria-hidden
                  >
                    <Icon className="h-5 w-5 text-[#377CF3]" strokeWidth={1.75} />
                  </span>
                  <h3 className="font-display text-lg font-semibold text-slate-900">{item.title}</h3>
                </div>
                <p className="mt-3 flex-1 text-base leading-relaxed text-slate-700">{item.texte}</p>
              </article>
            </li>
          );
        })}
      </ul>
    </TrainingSection>
  );
}
