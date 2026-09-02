import {
  ACCUEIL_DOCUMENTS_EXEMPLES,
  ACCUEIL_METHODE_ETAPES,
} from '@/lib/accueil-config';
import { OFC_TYPE_H2, OFC_TYPE_BODY } from '@/lib/ofc-interaction-classes';
import { OFC_SEC } from '@/lib/ofc-section-classes';

/** Différenciation — formation sur vos vrais documents. */
export function AccueilDifferentiationSection() {
  return (
    <section className={OFC_SEC.muted} aria-labelledby="accueil-differentiation">
      <div className="mx-auto max-w-6xl">
        <h2 id="accueil-differentiation" className={`${OFC_TYPE_H2} text-center`}>
          Une formation basée sur vos vrais documents
        </h2>
        <p className={`${OFC_TYPE_BODY} mx-auto mt-4 text-center text-slate-600`}>
          Les participants peuvent travailler directement à partir des documents et processus de
          leur entreprise.
        </p>
        <ul
          className="mt-8 flex flex-wrap justify-center gap-2"
          aria-label="Exemples de documents BTP"
        >
          {ACCUEIL_DOCUMENTS_EXEMPLES.map((doc) => (
            <li
              key={doc}
              className="rounded-full border border-ofc-border-strong/80 bg-white px-3 py-1.5 text-sm font-medium text-slate-700"
            >
              {doc}
            </li>
          ))}
        </ul>
        <ol className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {ACCUEIL_METHODE_ETAPES.map((etape) => (
            <li
              key={etape.n}
              className="rounded-2xl border border-ofc-border-strong/70 bg-white p-5 shadow-ofc-sm"
            >
              <span className="font-display text-2xl font-bold text-ofc-accent">{etape.n}</span>
              <p className="mt-3 text-sm leading-relaxed text-slate-700 md:text-base">{etape.titre}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
