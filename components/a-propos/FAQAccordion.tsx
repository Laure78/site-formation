import type { FAQItem } from '@/lib/faq';
import { HomeFaqDetailsList } from '@/components/landing/HomeFaqDetailsList';
import { OFC_TYPE_H2 } from '@/lib/ofc-interaction-classes';

type Props = {
  items: readonly FAQItem[];
  title: string;
  subtitle: string;
  /** Ancre de section (optionnel). */
  id?: string;
  /** Encadre la liste dans une carte blanche bordée (pages recrutement, etc.). */
  framedList?: boolean;
};

/** Titre + introduction au-dessus d’une liste FAQ en accordéon (SSR). */
export function FAQAccordion({ items, title, subtitle, id, framedList = false }: Props) {
  const list = <HomeFaqDetailsList items={items} />;

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
        {framedList ? (
          <div className="overflow-hidden rounded-2xl border border-slate-200/90 bg-white px-4 shadow-sm sm:px-6 [&_.border-y]:border-slate-200/80">
            {list}
          </div>
        ) : (
          list
        )}
      </div>
    </div>
  );
}
