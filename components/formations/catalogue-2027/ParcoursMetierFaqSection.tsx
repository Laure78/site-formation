import { FAQAccordion } from '@/components/a-propos/FAQAccordion';
import type { ParcoursComputed } from '@/data/catalogue-2027';
import { getParcoursMetierFaqForPage } from '@/lib/catalogue-2027/parcours-metiers-faq-pages';
import {
  PARCOURS_DISPONIBILITE_LIBELLE,
  PARCOURS_MODALITE_GEO,
} from '@/lib/catalogue-2027/parcours-commercial-copy';

type Props = {
  parcours: ParcoursComputed;
};

export function ParcoursMetierFaqSection({ parcours }: Props) {
  const items = getParcoursMetierFaqForPage(parcours.id, parcours);
  const intro = `${PARCOURS_DISPONIBILITE_LIBELLE}. ${PARCOURS_MODALITE_GEO}. Questions spécifiques au parcours ${parcours.titre}.`;

  return (
    <section aria-labelledby="parcours-metier-faq-title">
      <FAQAccordion
        id="parcours-metier-faq"
        title="Questions fréquentes"
        subtitle={intro}
        items={[...items]}
        framedList
      />
    </section>
  );
}
