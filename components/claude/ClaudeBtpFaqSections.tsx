'use client';

import { ChevronDown, HelpCircle, Sparkles } from 'lucide-react';

type Item = { q: string; a: string };

function FaqAccordion({
  items,
  variant,
  headingId,
  heading,
  icon: Icon,
  subtitle,
  extraLabel,
}: {
  items: readonly Item[];
  variant: 'primary' | 'related';
  headingId: string;
  heading: string;
  icon: typeof HelpCircle;
  subtitle?: string;
  extraLabel?: string;
}) {
  const baseDetails =
    variant === 'primary'
      ? 'rounded-xl border border-[#E2E8F0] bg-white px-4 py-1 shadow-[0_4px_20px_rgba(15,23,42,0.05)]'
      : 'rounded-xl border border-transparent bg-[#F8FAFC] px-4 py-1';

  return (
    <section className="scroll-mt-24" aria-labelledby={headingId}>
      <div className="flex flex-wrap items-center gap-3">
        <Icon className="h-8 w-8 shrink-0 text-[#377CF3]" aria-hidden />
        <h2 id={headingId} className="font-display text-2xl font-bold tracking-tight text-[#0F172A] md:text-3xl">
          {heading}
        </h2>
      </div>
      {extraLabel ? (
        <p className="mt-2 text-xs font-semibold uppercase tracking-wide text-[#64748B]">{extraLabel}</p>
      ) : null}
      {subtitle ? <p className="mt-3 max-w-3xl text-sm text-[#64748B]">{subtitle}</p> : null}
      <div className="mt-8 space-y-2">
        {items.map((item) => (
          <details key={item.q} className={`group ${baseDetails}`}>
            <summary className="flex cursor-pointer list-none items-start justify-between gap-3 py-4 text-[17px] font-bold text-[#0F172A] [&::-webkit-details-marker]:hidden">
              <span>{item.q}</span>
              <ChevronDown
                className="mt-0.5 h-5 w-5 shrink-0 text-[#64748B] transition-transform group-open:rotate-180"
                aria-hidden
              />
            </summary>
            <div className="rounded-b-xl bg-[#F8FAFC] px-3 pb-4 pt-0">
              <p className="text-[15px] leading-relaxed text-[#334155] md:text-base">{item.a}</p>
            </div>
          </details>
        ))}
      </div>
    </section>
  );
}

export function ClaudeBtpFaqSections({
  faqItems,
  relatedQuestions,
}: {
  faqItems: readonly Item[];
  relatedQuestions: readonly Item[];
}) {
  return (
    <>
      <FaqAccordion
        variant="primary"
        headingId="faq-claude"
        heading="Questions fréquentes"
        icon={HelpCircle}
        items={faqItems}
      />
      <FaqAccordion
        variant="related"
        headingId="faq-connexes"
        heading="Questions connexes"
        icon={Sparkles}
        subtitle="Réponses courtes pour la longue traîne — complément de la FAQ principale."
        extraLabel="Long tail SEO"
        items={relatedQuestions}
      />
    </>
  );
}
