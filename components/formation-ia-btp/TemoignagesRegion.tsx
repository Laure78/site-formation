import { Citation } from '@/components/readability/Citation';
import { OFC_SEC } from '@/lib/ofc-section-classes';
import { TEMOIGNAGES_REGION_IDF } from '@/lib/departement-pages/shared';

/**
 * Bloc témoignages région Île-de-France — texte et attributions identiques
 * sur les 8 pages département. Pas de localisation ville/département inventée.
 */
export function TemoignagesRegion() {
  return (
    <section className={OFC_SEC.muted}>
      <div className="mx-auto max-w-4xl">
        <h2 className="font-display text-2xl font-bold text-slate-900 md:text-3xl">
          Témoignages de professionnels en Île-de-France
        </h2>
        <p className="mt-4 text-base text-slate-600 md:text-lg">
          Retours anonymisés de participants aux sessions OFC en Île-de-France.
        </p>
        <ul className="mt-8 space-y-6">
          {TEMOIGNAGES_REGION_IDF.map((t) => (
            <li key={t.attribution}>
              <Citation quote={t.text} role={t.attribution} variant="client" />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

/** @deprecated Alias — préférer `TemoignagesRegion`. */
export const DepartementTemoignages = TemoignagesRegion;
