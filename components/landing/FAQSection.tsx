'use client';

import { useState } from 'react';
import { Plus, Minus } from 'lucide-react';
import type { FAQItem } from '@/lib/faq';
import { FAQAnswer } from '@/components/landing/FAQAnswer';

type FAQSectionProps = {
  items: readonly FAQItem[];
  title?: string;
  subtitle?: string;
  id?: string;
};

/**
 * Section FAQ réutilisable pour booster le SEO sur les pages clés.
 * Affiche un accordéon + structure sémantique pour FAQPage schema.
 */
export function FAQSection({ items, title = 'Questions fréquentes', subtitle, id = 'faq' }: FAQSectionProps) {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id={id} className="border-b border-slate-200 bg-slate-50 px-4 py-16">
      <div className="mx-auto max-w-3xl">
        <div className="inline-flex items-center gap-2 rounded-full bg-[var(--accent)] px-4 py-2 text-sm font-medium text-white">
          <span>FAQ</span>
        </div>
        <h2 className="mt-4 font-display text-3xl font-bold text-slate-900">{title}</h2>
        {subtitle && <p className="mt-3 text-slate-600">{subtitle}</p>}
        <div className="mt-8 space-y-3">
          {items.map((item, i) => (
            <div
              key={i}
              className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition-shadow hover:shadow-md"
            >
              <button
                type="button"
                onClick={() => setOpen(open === i ? null : i)}
                className="flex w-full items-center justify-between gap-4 text-left"
              >
                <span className="font-medium text-slate-900">{item.q}</span>
                <span className="shrink-0 rounded-full p-1 text-slate-500">
                  {open === i ? <Minus size={20} strokeWidth={1.5} /> : <Plus size={20} strokeWidth={1.5} />}
                </span>
              </button>
              {open === i && (
                <p className="mt-4 border-t border-slate-100 pt-4 text-sm text-slate-600">
                  <FAQAnswer content={item.a} />
                </p>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
