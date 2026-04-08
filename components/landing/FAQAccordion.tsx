'use client';

import { useState } from 'react';
import { Plus, Minus } from 'lucide-react';
import type { FAQItem } from '@/lib/faq';
import { FAQ_ITEMS } from '@/lib/faq';
import { FAQAnswer } from '@/components/landing/FAQAnswer';

type FAQAccordionProps = {
  items?: readonly FAQItem[];
};

export function FAQAccordion({ items = FAQ_ITEMS }: FAQAccordionProps) {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <div className="space-y-3">
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
  );
}
