import { FAQAccordion } from '@/components/a-propos/FAQAccordion';
import { getFaqCataloguePage } from '@/lib/faq';
import { OFC_READABLE_COLUMN } from '@/lib/ofc-section-classes';

const FAQ = getFaqCataloguePage();

const FAQ_INTRO =
  'Choix de session, présentiel en Île-de-France et financement OPCO : réponses courtes, alignées sur le catalogue ci-dessus.';

export function FormationsCatalogueFaqSection() {
  return (
    <section
      className="mt-16 scroll-mt-[calc(var(--site-header-height,4.5rem)+0.5rem)] border-t border-[#E2E8F0] pt-14"
      aria-labelledby="faq-catalogue-title"
    >
      <div className={OFC_READABLE_COLUMN}>
        <FAQAccordion
          id="faq-catalogue"
          title="Formations IA BTP — questions fréquentes"
          subtitle={FAQ_INTRO}
          items={FAQ}
        />
      </div>
    </section>
  );
}
