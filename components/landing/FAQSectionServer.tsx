import { ChevronDown } from 'lucide-react';
import type { FAQItem } from '@/lib/faq';
import { FAQAnswer } from '@/components/landing/FAQAnswer';

import { OFC_SEC } from '@/lib/ofc-section-classes';

const LINK_CLASS =
  '[&_a]:font-medium [&_a]:text-[var(--accent)] [&_a]:underline [&_a]:underline-offset-2 [&_a]:decoration-slate-300 [&_a]:transition-colors hover:[&_a]:decoration-[var(--accent)]';

type FAQSectionServerProps = {
  items: readonly FAQItem[];
  title?: string;
  subtitle?: string;
  id?: string;
  /** Remplace les classes de section par défaut (ex. espacement plus compact). */
  className?: string;
};

/**
 * FAQ en HTML natif (SSR) — tout le texte des réponses est dans le DOM pour l’alignement FAQPage JSON-LD.
 */
export function FAQSectionServer({
  items,
  title = 'Questions fréquentes',
  subtitle,
  id = 'faq',
  className,
}: FAQSectionServerProps) {
  return (
    <section id={id} className={className ?? OFC_SEC.muted}>
      <div className="mx-auto max-w-3xl">
        <div className="inline-flex items-center gap-2 rounded-full bg-[var(--accent)] px-4 py-2 text-sm font-medium text-white">
          <span>FAQ</span>
        </div>
        <h2 className="mt-4 font-display text-3xl font-bold text-slate-900">{title}</h2>
        {subtitle && <p className="mt-3 text-base text-slate-600 md:text-lg">{subtitle}</p>}
        <div className="mt-8 space-y-3">
          {items.map((item, i) => (
            <details
              key={i}
              className="group rounded-xl border border-slate-200 bg-white p-5 shadow-sm open:shadow-md [&_summary::-webkit-details-marker]:hidden"
            >
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-left font-medium text-slate-900">
                <span>{item.q}</span>
                <ChevronDown
                  className="h-5 w-5 shrink-0 text-slate-500 transition-transform duration-200 group-open:rotate-180"
                  strokeWidth={1.5}
                  aria-hidden
                />
              </summary>
              <div className={`mt-4 border-t border-slate-100 pt-4 text-base leading-relaxed text-slate-600 ${LINK_CLASS}`}>
                <FAQAnswer content={item.a} />
              </div>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
