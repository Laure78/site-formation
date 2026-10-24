import { FAQAnswer } from '@/components/landing/FAQAnswer';
import { getFaqCataloguePage } from '@/lib/faq';

const FAQ = getFaqCataloguePage();

export function FormationsCatalogueFaqSection() {
  return (
    <section
      id="faq-catalogue"
      className="mt-16 scroll-mt-[calc(var(--site-header-height,4.5rem)+0.5rem)] border-t border-[#E2E8F0] pt-14"
      aria-labelledby="faq-catalogue-title"
    >
      <h2 id="faq-catalogue-title" className="ofc-type-h2 text-ofc-ink">
        Questions fréquentes
      </h2>
      <dl className="mt-6 max-w-3xl space-y-4">
        {FAQ.map((item) => (
          <div key={item.q} className="border-b border-[#E2E8F0] pb-4">
            <dt className="font-medium text-ofc-ink">{item.q}</dt>
            <dd className="mt-1 text-sm text-ofc-ink-muted [&_a]:font-medium [&_a]:text-[#377CF3] [&_a]:underline">
              <FAQAnswer content={item.a} />
            </dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
