import { FAQAccordion } from '@/components/a-propos/FAQAccordion';
import { DATES_LIEUX_FAQ } from '@/lib/dates-lieux/faq';

export function DatesLieuxFaqSection() {
  return (
    <section className="mx-auto max-w-[80rem] px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
      <FAQAccordion
        id="dates-lieux-faq"
        title="Inscription et modalités"
        subtitle="Présentiel en Île-de-France uniquement — pas de date fictive sur cette page."
        items={DATES_LIEUX_FAQ.map((f) => ({ q: f.q, a: f.a }))}
        framedList
      />
    </section>
  );
}
