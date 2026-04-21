import { Plus } from 'lucide-react';
import type { FAQItem } from '@/lib/faq';
import { FAQAnswer } from '@/components/landing/FAQAnswer';

type Props = {
  items: readonly FAQItem[];
  title: string;
  subtitle: string;
};

export function FAQAccordion({ items, title, subtitle }: Props) {
  return (
    <section id="faq" className="scroll-mt-24">
      <div className="mx-auto max-w-4xl rounded-2xl border border-[#E2E8F0] bg-white px-6 py-10 shadow-[0_8px_30px_rgba(15,23,42,0.05)] md:px-8">
        <h2 className="font-display text-3xl font-bold tracking-tight text-[#0F172A] md:text-4xl">{title}</h2>
        <p className="mt-3 text-base text-[#64748B]">{subtitle}</p>
        <div className="mt-8 space-y-3">
          {items.map((item, index) => (
            <details
              key={`${item.q}-${index}`}
              className="group rounded-xl border border-[#E2E8F0] bg-white shadow-[0_6px_20px_rgba(15,23,42,0.03)] transition open:border-[#BFDBFE] open:bg-[#EFF6FF]"
            >
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-6 py-5 text-[17px] font-semibold text-[#0F172A] hover:bg-[#F8FAFC]">
                <span>{item.q}</span>
                <Plus className="h-5 w-5 shrink-0 transition duration-300 group-open:rotate-45" />
              </summary>
              <div className="border-t border-[#E2E8F0] px-6 py-6 text-base leading-7 text-[#334155]">
                <FAQAnswer content={item.a} className="[&_a]:text-[#377CF3] hover:[&_a]:underline" />
              </div>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
