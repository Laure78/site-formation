import { Plus } from 'lucide-react';
import type { FAQItem } from '@/lib/faq';
import { FAQAnswer } from '@/components/landing/FAQAnswer';

const LINK_CLASS =
  '[&_a]:font-medium [&_a]:text-[#377CF3] [&_a]:underline [&_a]:underline-offset-2 [&_a]:decoration-slate-300 [&_a]:transition-colors hover:[&_a]:decoration-[#377CF3]';

type Props = {
  items: readonly FAQItem[];
  title: string;
  subtitle?: string;
};

/**
 * FAQ catalogue formations — cartes individuelles, liens #377CF3 (SSR, texte inchangé).
 */
export function FormationsFaqSection({ items, title, subtitle }: Props) {
  return (
    <section className="mt-16" aria-labelledby="formations-page-faq-heading">
      <h2 id="formations-page-faq-heading" className="font-display text-2xl font-bold text-[#0F172A] md:text-3xl">
        {title}
      </h2>
      {subtitle ? <p className="mt-3 text-[#64748B]">{subtitle}</p> : null}
      <div className="mt-8 space-y-3">
        {items.map((item, i) => (
          <details
            key={i}
            className="group rounded-xl border border-[#E2E8F0] bg-white open:border-[#BFDBFE] open:bg-[#EFF6FF] [&_summary::-webkit-details-marker]:hidden"
          >
            <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-6 py-5 text-[17px] font-semibold text-[#0F172A] transition-colors hover:bg-[#F8FAFC] group-open:hover:bg-[#EFF6FF] [&::-webkit-details-marker]:hidden">
              <span>{item.q}</span>
              <Plus
                className="h-5 w-5 shrink-0 text-[#64748B] transition-transform duration-300 group-open:rotate-45"
                strokeWidth={2}
                aria-hidden
              />
            </summary>
            <div
              className={`border-t border-[#E2E8F0] px-6 pb-6 pt-4 text-base leading-[1.7] text-[#334155] ${LINK_CLASS}`}
            >
              <FAQAnswer content={item.a} />
            </div>
          </details>
        ))}
      </div>
    </section>
  );
}
