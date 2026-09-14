import { FAQAnswer } from '@/components/landing/FAQAnswer';
import type { FAQItem } from '@/lib/faq';

type HomeFaqDetailsListProps = {
  items: readonly FAQItem[];
};

/**
 * FAQ accueil — HTML sémantique SSR (réponses dans le DOM pour l’indexation).
 * Style accordéon premium, contenu léger sans JS.
 */
export function HomeFaqDetailsList({ items }: HomeFaqDetailsListProps) {
  return (
    <div className="divide-y divide-ofc-border border-y border-ofc-border">
      {items.map((item, index) => (
        <details key={item.q} className="ofc-faq-item group" open={index === 0}>
          <summary>
            <span className="flex items-start justify-between gap-4">
              <span>{item.q}</span>
              <span
                className="mt-1 flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-ofc-border text-sm font-semibold text-ofc-accent transition group-open:bg-ofc-accent group-open:text-white"
                aria-hidden
              >
                <span className="group-open:hidden">+</span>
                <span className="hidden group-open:inline">−</span>
              </span>
            </span>
          </summary>
          <div className="pb-6 text-base leading-relaxed text-ofc-ink-muted md:text-lg">
            <FAQAnswer content={item.a} />
          </div>
        </details>
      ))}
    </div>
  );
}
