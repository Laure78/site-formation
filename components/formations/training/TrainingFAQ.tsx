import { FAQSection } from '@/components/landing/FAQSection';
import type { FAQItem } from '@/lib/faq';

type Props = {
  items: readonly FAQItem[];
  title?: string;
  subtitle?: string;
  id?: string;
};

/** FAQ design commun — accordéons SSR, contenu indexable. */
export function TrainingFAQ({
  items,
  title = 'Questions fréquentes',
  subtitle,
  id = 'faq',
}: Props) {
  if (items.length === 0) return null;
  return (
    <FAQSection
      title={title}
      subtitle={subtitle}
      items={[...items]}
      id={id}
      className="scroll-mt-[calc(var(--site-header-height)+3.25rem)] border-b border-slate-200 bg-slate-50 px-4 py-12 md:py-16"
    />
  );
}
