import { FAQAccordion } from '@/components/a-propos/FAQAccordion';
import { getFaqCataloguePage } from '@/lib/faq';

const FAQ = getFaqCataloguePage();

const FAQ_INTRO =
  'Choix de session, présentiel en Île-de-France et financement OPCO : réponses courtes, alignées sur le catalogue ci-dessus.';

export function FormationsCatalogueFaqSection() {
  return (
    <section aria-labelledby="faq-catalogue-title">
      <FAQAccordion
        id="faq-catalogue"
        title="Questions fréquentes"
        subtitle={FAQ_INTRO}
        items={FAQ}
        framedList
      />
    </section>
  );
}
