import { ACCUEIL_CAS_USAGE_RESULTATS } from '@/lib/accueil-config';
import { OFC_TYPE_H2 } from '@/lib/ofc-interaction-classes';
import { OFC_SEC } from '@/lib/ofc-section-classes';

/** Résultats concrets — 6 cas d'usage orientés bénéfice. */
export function AccueilResultatsConcretsSection() {
  return (
    <section className={OFC_SEC.white} aria-labelledby="accueil-resultats-concrets">
      <div className="mx-auto max-w-6xl">
        <h2 id="accueil-resultats-concrets" className={`${OFC_TYPE_H2} text-center`}>
          Ce que vos équipes peuvent faire avec l&apos;IA
        </h2>
        <ul className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {ACCUEIL_CAS_USAGE_RESULTATS.map((item) => (
            <li
              key={item.titre}
              className="rounded-2xl border border-ofc-border-strong/70 bg-[#F8FAFC] p-5"
            >
              <h3 className="font-display text-base font-bold text-ofc-ink md:text-lg">
                {item.titre}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-600">{item.phrase}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
