'use client';

import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { FAQAnswer } from '@/components/landing/FAQAnswer';
import { OFC_CARD } from '@/lib/ofc-interaction-classes';

type FaqItem = { q: string; a: string };

type Props = {
  items: readonly FaqItem[];
};

/** FAQ accordéon — un seul panneau ouvert ; pas d’import de `lib/faq`. */
export function IaDevisFaqAccordion({ items }: Props) {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <div className="space-y-3">
      {items.map((item, i) => {
        const panelId = `ia-devis-faq-panel-${i}`;
        const buttonId = `ia-devis-faq-btn-${i}`;
        const isOpen = open === i;

        return (
          <div key={item.q} className={`${OFC_CARD} overflow-hidden rounded-xl`}>
            <h3 className="m-0">
              <button
                type="button"
                id={buttonId}
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => setOpen(isOpen ? null : i)}
                className="flex w-full min-h-12 items-center justify-between gap-4 px-5 py-4 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] focus-visible:ring-offset-2"
              >
                <span className="font-medium text-slate-900">{item.q}</span>
                <ChevronDown
                  className={`h-5 w-5 shrink-0 text-slate-500 transition-transform duration-200 ${
                    isOpen ? 'rotate-180' : ''
                  }`}
                  strokeWidth={1.5}
                  aria-hidden
                />
              </button>
            </h3>
            <div
              id={panelId}
              role="region"
              aria-labelledby={buttonId}
              hidden={!isOpen}
              className={isOpen ? 'border-t border-slate-100 px-5 pb-5 pt-4' : undefined}
            >
              {isOpen ? (
                <p className="text-base leading-relaxed text-slate-600">
                  <FAQAnswer content={item.a} />
                </p>
              ) : null}
            </div>
          </div>
        );
      })}
    </div>
  );
}
