import { FAQAccordion } from '@/components/a-propos/FAQAccordion';
import { PARCOURS_METIERS_FAQ } from '@/lib/parcours-metiers-page-content';

const INTRO =
  'Parcours modulaires, présentiel en Île-de-France, tarifs au module et financement selon éligibilité.';

export function ParcoursMetierFaqSection() {
  return (
    <section aria-labelledby="parcours-metier-faq-title">
      <FAQAccordion
        id="parcours-metier-faq"
        title="Questions fréquentes"
        subtitle={INTRO}
        items={[...PARCOURS_METIERS_FAQ]}
        framedList
      />
    </section>
  );
}
