import { ChevronDown, CircleHelp } from 'lucide-react';
import { FAQAnswer } from '@/components/landing/FAQAnswer';
import type { FAQItem } from '@/lib/faq';

type AccueilFaqMaquetteListProps = {
  items: readonly FAQItem[];
};

/** FAQ accueil maquette — pastilles avec ? et chevron. */
export function AccueilFaqMaquetteList({ items }: AccueilFaqMaquetteListProps) {
  return (
    <div className="flex flex-col gap-2.5">
      {items.map((item) => (
        <details
          key={item.q}
          className="accueil-maquette-faq__item group rounded-full border border-ofc-border bg-white shadow-sm open:rounded-2xl"
        >
          <summary className="flex cursor-pointer list-none items-center gap-2.5 px-4 py-3 text-left [&::-webkit-details-marker]:hidden">
            <CircleHelp
              className="h-4 w-4 shrink-0 text-[#377CF3]"
              strokeWidth={1.75}
              aria-hidden
            />
            <span className="min-w-0 flex-1 text-[0.8125rem] font-semibold leading-snug text-[#101936] sm:text-sm">
              {item.q}
            </span>
            <ChevronDown
              className="h-4 w-4 shrink-0 text-ofc-ink-subtle transition-transform duration-200 group-open:rotate-180"
              strokeWidth={2}
              aria-hidden
            />
          </summary>
          <div className="border-t border-ofc-border/80 px-4 pb-4 pt-3 text-sm leading-relaxed text-ofc-ink-muted">
            <FAQAnswer content={item.a} />
          </div>
        </details>
      ))}
    </div>
  );
}
