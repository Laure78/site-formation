import { HomeFaqDetailsList } from '@/components/landing/HomeFaqDetailsList';
import { Section } from '@/components/ui/Section';
import { FAQ_ITEMS_HOME } from '@/lib/faq';
import { OFC_TYPE_H2 } from '@/lib/ofc-interaction-classes';

/** FAQ accueil — deux colonnes desktop. */
export function AccueilFaqSection() {
  const mid = Math.ceil(FAQ_ITEMS_HOME.length / 2);
  const colA = FAQ_ITEMS_HOME.slice(0, mid);
  const colB = FAQ_ITEMS_HOME.slice(mid);

  return (
    <Section
      id="accueil-faq"
      tone="white"
      className="scroll-mt-[calc(var(--site-header-height,4.5rem)+0.5rem)]"
      aria-labelledby="accueil-faq-heading"
    >
      <div className="mx-auto max-w-2xl text-center">
        <h2 id="accueil-faq-heading" className={`${OFC_TYPE_H2} text-[#101936]`}>
          FAQ — Vos questions fréquentes
        </h2>
      </div>

      <div className="mt-10 grid gap-8 lg:grid-cols-2 lg:gap-10">
        <HomeFaqDetailsList items={colA} />
        <HomeFaqDetailsList items={colB} />
      </div>
    </Section>
  );
}
