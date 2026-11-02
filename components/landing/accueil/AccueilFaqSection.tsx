import { HomeFaqDetailsList } from '@/components/landing/HomeFaqDetailsList';
import { FAQ_ITEMS_HOME } from '@/lib/faq';
import { OFC_TYPE_H2 } from '@/lib/ofc-interaction-classes';
import { AccueilMaquetteSection } from '@/components/landing/accueil/AccueilMaquetteSection';

/** FAQ accueil — deux colonnes, espacement réduit. */
export function AccueilFaqSection() {
  const mid = Math.ceil(FAQ_ITEMS_HOME.length / 2);
  const colA = FAQ_ITEMS_HOME.slice(0, mid);
  const colB = FAQ_ITEMS_HOME.slice(mid);

  return (
    <AccueilMaquetteSection
      id="accueil-faq"
      className="scroll-mt-[calc(var(--site-header-height,4.5rem)+0.5rem)]"
      aria-labelledby="accueil-faq-heading"
    >
      <div className="mx-auto max-w-2xl text-center">
        <h2 id="accueil-faq-heading" className={`${OFC_TYPE_H2} text-xl font-extrabold text-[#101936] md:text-2xl`}>
          FAQ — Vos questions fréquentes
        </h2>
      </div>

      <div className="accueil-maquette__grid grid gap-6 lg:grid-cols-2 lg:gap-8">
        <HomeFaqDetailsList items={colA} />
        <HomeFaqDetailsList items={colB} />
      </div>
    </AccueilMaquetteSection>
  );
}
