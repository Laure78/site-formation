import type { FAQItem } from '@/lib/faq';
import { FAQAnswer } from '@/components/landing/FAQAnswer';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { OFC_TYPE_H2 } from '@/lib/ofc-interaction-classes';

type Props = {
  items: readonly FAQItem[];
  title: string;
  subtitle?: string;
};

/**
 * FAQ pages catalogue / financement / à propos — style accordéon premium SSR.
 */
export function FormationsFaqSection({ items, title, subtitle }: Props) {
  return (
    <section className="mt-16" aria-labelledby="formations-page-faq-heading">
      <Eyebrow>FAQ</Eyebrow>
      <h2 id="formations-page-faq-heading" className={`${OFC_TYPE_H2} mt-4`}>
        {title}
      </h2>
      {subtitle ? <p className="mt-3 max-w-2xl text-ofc-ink-muted">{subtitle}</p> : null}
      <div className="mt-8 divide-y divide-ofc-border border-y border-ofc-border">
        {items.map((item, i) => (
          <details key={i} className="ofc-faq-item group" open={i === 0}>
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
            <div className="pb-6 text-base leading-relaxed text-ofc-ink-muted md:text-lg [&_a]:font-medium [&_a]:text-ofc-accent [&_a]:underline [&_a]:underline-offset-2">
              <FAQAnswer content={item.a} />
            </div>
          </details>
        ))}
      </div>
    </section>
  );
}
