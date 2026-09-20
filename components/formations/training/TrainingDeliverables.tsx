import { Check } from 'lucide-react';
import { TrainingSection } from '@/components/formations/training/TrainingSection';

type Props = {
  items: readonly string[];
  title?: string;
  description?: string;
};

/** Livrables / ce que le participant emporte — pas de promesse absente des données. */
export function TrainingDeliverables({
  items,
  title = 'Vous repartez avec',
  description,
}: Props) {
  if (items.length === 0) return null;
  return (
    <TrainingSection id="livrables" title={title} description={description} tone="muted">
      <ul className="grid gap-3 sm:grid-cols-2">
        {items.map((item) => (
          <li key={item} className="flex gap-3 text-sm leading-relaxed text-slate-800 md:text-[0.95rem]">
            <Check className="mt-0.5 h-5 w-5 shrink-0 text-[#377CF3]" strokeWidth={2} aria-hidden />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </TrainingSection>
  );
}
