import { FAQAnswer } from '@/components/landing/FAQAnswer';
import { OFC_CARD } from '@/lib/ofc-interaction-classes';
import type { FAQItem } from '@/lib/faq';

type HomeFaqDetailsListProps = {
  items: readonly FAQItem[];
};

/**
 * FAQ accueil — HTML sémantique SSR (toutes les réponses dans le DOM pour l’indexation).
 * Remplace l’accordéon client : pas de JS requis, contenu léger.
 */
export function HomeFaqDetailsList({ items }: HomeFaqDetailsListProps) {
  return (
    <div className="space-y-3">
      {items.map((item, index) => (
        <details
          key={item.q}
          className={`${OFC_CARD} group rounded-xl p-5 open:shadow-sm`}
          open={index === 0}
        >
          <summary className="cursor-pointer list-none font-medium text-slate-900 [&::-webkit-details-marker]:hidden">
            <span className="flex items-center justify-between gap-4">
              <span>{item.q}</span>
              <span
                className="shrink-0 text-xs font-semibold uppercase tracking-wide text-[var(--accent)]"
                aria-hidden
              >
                {index === 0 ? '−' : '+'}
              </span>
            </span>
          </summary>
          <div className="mt-4 border-t border-slate-100 pt-4 text-base leading-relaxed text-slate-600">
            <FAQAnswer content={item.a} />
          </div>
        </details>
      ))}
    </div>
  );
}
