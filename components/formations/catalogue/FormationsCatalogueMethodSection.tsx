import { CATALOGUE_METHODE_ETAPES } from '@/lib/formations-catalogue-page-config';
import { OFC_SEC } from '@/lib/ofc-section-classes';

/** Méthode pédagogique — 4 étapes courtes. */
export function FormationsCatalogueMethodSection() {
  return (
    <section className={`${OFC_SEC.muted} mt-16`} aria-labelledby="catalogue-methode">
      <div className="mx-auto max-w-6xl px-4">
        <h2 id="catalogue-methode" className="font-display text-2xl font-bold text-ofc-ink md:text-3xl">
          Comment se déroule une formation ?
        </h2>
        <ol className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {CATALOGUE_METHODE_ETAPES.map((etape) => (
            <li
              key={etape.n}
              className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
            >
              <span className="font-display text-xl font-bold text-ofc-accent">{etape.n}</span>
              <h3 className="mt-2 font-display text-base font-bold text-ofc-ink">{etape.titre}</h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-600">{etape.texte}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
