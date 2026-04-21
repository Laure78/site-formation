'use client';

import { ChevronDown, HelpCircle, type LucideIcon } from 'lucide-react';
import type { FAQItem } from '@/lib/faq';
import { FAQAnswer } from '@/components/landing/FAQAnswer';

type Props = {
  id?: string;
  headingId: string;
  title: string;
  subtitle?: string;
  items: readonly FAQItem[];
  variant?: 'primary' | 'related';
  /** Icône à gauche du titre (défaut : aide) */
  Icon?: LucideIcon;
};

/**
 * FAQ accordéon — même rendu que la FAQ `/claude-ai-btp` (chevron, fond réponse).
 */
export function PillarFaqAccordion({
  id,
  headingId,
  title,
  subtitle,
  items,
  variant = 'primary',
  Icon: IconProp,
}: Props) {
  const Icon = IconProp ?? HelpCircle;
  const baseDetails =
    variant === 'primary'
      ? 'rounded-xl border border-[#E2E8F0] bg-white px-4 py-1 shadow-[0_4px_20px_rgba(15,23,42,0.05)]'
      : 'rounded-xl border border-transparent bg-[#F8FAFC] px-4 py-1';

  return (
    <section id={id} className="scroll-mt-24" aria-labelledby={headingId}>
      <div className="flex flex-wrap items-center gap-3">
        <Icon className="h-8 w-8 shrink-0 text-[#377CF3]" aria-hidden />
        <h2 id={headingId} className="font-display text-2xl font-bold tracking-tight text-[#0F172A] md:text-3xl">
          {title}
        </h2>
      </div>
      {subtitle ? <p className="mt-3 max-w-3xl text-sm text-[#64748B]">{subtitle}</p> : null}
      <div className="mt-8 space-y-2">
        {items.map((item, index) => (
          <details key={`${item.q}-${index}`} className={`group ${baseDetails}`}>
            <summary className="flex cursor-pointer list-none items-start justify-between gap-3 py-4 text-[17px] font-bold text-[#0F172A] [&::-webkit-details-marker]:hidden">
              <span>{item.q}</span>
              <ChevronDown
                className="mt-0.5 h-5 w-5 shrink-0 text-[#64748B] transition-transform group-open:rotate-180"
                aria-hidden
              />
            </summary>
            <div className="rounded-b-xl bg-[#F8FAFC] px-3 pb-4 pt-0">
              <FAQAnswer content={item.a} className="text-[15px] leading-relaxed text-[#334155] md:text-base [&_a]:text-[#377CF3] hover:[&_a]:underline" />
            </div>
          </details>
        ))}
      </div>
    </section>
  );
}
