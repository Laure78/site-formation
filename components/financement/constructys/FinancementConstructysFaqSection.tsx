import type { FAQItem } from '@/lib/faq';
import { FAQAnswer } from '@/components/landing/FAQAnswer';
import { FC_SECTION, FC_SUBTITLE, FC_TITLE } from '@/lib/financement-constructys-ui';

type Props = {
  items: readonly FAQItem[];
  title: string;
  subtitle?: string;
};

/** FAQ financement — deux colonnes desktop, accordéon natif accessible. */
export function FinancementConstructysFaqSection({ items, title, subtitle }: Props) {
  const midpoint = Math.ceil(items.length / 2);
  const columns = [items.slice(0, midpoint), items.slice(midpoint)] as const;

  return (
    <section className={FC_SECTION} aria-labelledby="financement-faq-heading">
      <h2 id="financement-faq-heading" className={FC_TITLE}>
        {title}
      </h2>
      {subtitle ? <p className={FC_SUBTITLE}>{subtitle}</p> : null}
      <div className="mt-8 grid gap-6 md:grid-cols-2">
        {columns.map((col, colIndex) => (
          <div key={colIndex} className="divide-y divide-[#D7E5F7] border-y border-[#D7E5F7]">
            {col.map((item) => (
              <details key={item.q} className="group py-1">
                <summary className="flex cursor-pointer list-none items-start justify-between gap-4 py-4 text-left text-sm font-semibold text-[#081943] marker:content-none md:text-base [&::-webkit-details-marker]:hidden">
                  <span>{item.q}</span>
                  <span
                    className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-[#D7E5F7] text-sm font-semibold text-[#377CF3] transition group-open:bg-[#377CF3] group-open:text-white"
                    aria-hidden
                  >
                    <span className="group-open:hidden">+</span>
                    <span className="hidden group-open:inline">−</span>
                  </span>
                </summary>
                <div className="pb-5 text-sm leading-relaxed text-ofc-ink-muted md:text-base [&_a]:font-medium [&_a]:text-[#377CF3] [&_a]:underline [&_a]:underline-offset-2">
                  <FAQAnswer content={item.a} />
                </div>
              </details>
            ))}
          </div>
        ))}
      </div>
    </section>
  );
}
