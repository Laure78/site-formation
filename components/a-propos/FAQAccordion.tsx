import type { FAQItem } from '@/lib/faq';
import { HomeFaqDetailsList } from '@/components/landing/HomeFaqDetailsList';
import { OFC_TYPE_H2 } from '@/lib/ofc-interaction-classes';

type Props = {
  items: readonly FAQItem[];
  title: string;
  subtitle: string;
  /** Ancre de section (optionnel). */
  id?: string;
};

/** Titre + introduction au-dessus d’une liste FAQ en accordéon (SSR). */
export function FAQAccordion({ items, title, subtitle, id }: Props) {
  return (
    <div
      {...(id ? { id, className: 'scroll-mt-[calc(var(--site-header-height,4rem)+0.5rem)]' } : {})}
    >
      <header>
        <h2 {...(id ? { id: `${id}-title` } : {})} className={OFC_TYPE_H2}>
          {title}
        </h2>
        <p className="mt-3 max-w-none text-base leading-relaxed text-ofc-ink-muted">{subtitle}</p>
      </header>
      <div className="mt-8">
        <HomeFaqDetailsList items={items} />
      </div>
    </div>
  );
}
