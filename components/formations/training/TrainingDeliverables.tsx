import { Check } from 'lucide-react';
import { TrainingSection } from '@/components/formations/training/TrainingSection';

type Props = {
  items: readonly string[];
  title?: string;
  description?: string;
};

/** Livrables / ce que le participant emporte — cartes légères. */
export function TrainingDeliverables({
  items,
  title = 'Ce que vous emportez',
  description,
}: Props) {
  if (items.length === 0) return null;
  return (
    <TrainingSection id="livrables" title={title} description={description} tone="muted">
      <ul className="grid gap-3 sm:grid-cols-2">
        {items.map((item) => (
          <li
            key={item}
            className="flex h-full gap-3 rounded-2xl border border-slate-200 bg-white px-4 py-4 md:px-5"
          >
            <Check className="mt-0.5 h-5 w-5 shrink-0 text-[#377CF3]" strokeWidth={2} aria-hidden />
            <span className="text-base font-medium leading-snug text-slate-800">{item}</span>
          </li>
        ))}
      </ul>
    </TrainingSection>
  );
}
