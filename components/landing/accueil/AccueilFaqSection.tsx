import { HomeFaqDetailsList } from '@/components/landing/HomeFaqDetailsList';
import { FAQ_ITEMS_HOME } from '@/lib/faq';
import { OFC_TYPE_H2, OFC_TYPE_BODY } from '@/lib/ofc-interaction-classes';
import { OFC_SEC } from '@/lib/ofc-section-classes';

/** FAQ accueil — 5 questions visibles, schema aligné. */
export function AccueilFaqSection() {
  return (
    <section className={OFC_SEC.muted} aria-labelledby="accueil-faq">
      <div className="mx-auto max-w-3xl">
        <h2 id="accueil-faq" className={`${OFC_TYPE_H2} text-center`}>
          Questions fréquentes
        </h2>
        <p className={`${OFC_TYPE_BODY} mx-auto mt-3 text-center text-slate-600`}>
          Réponses courtes sur le public visé, les prérequis, vos documents et le financement.
        </p>
        <div className="mt-8">
          <HomeFaqDetailsList items={FAQ_ITEMS_HOME} />
        </div>
      </div>
    </section>
  );
}
