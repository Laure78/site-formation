import { FAQSection } from '@/components/landing/FAQSection';

type FaqItem = { q: string; a: string };

type Props = {
  items: readonly FaqItem[];
  title?: string;
  subtitle?: string;
};

/** FAQ design commun — contenu spécifique à la formation. */
export function TrainingFAQ({
  items,
  title = 'Questions fréquentes',
  subtitle,
}: Props) {
  if (items.length === 0) return null;
  return (
    <FAQSection
      title={title}
      subtitle={subtitle}
      items={[...items]}
    />
  );
}
