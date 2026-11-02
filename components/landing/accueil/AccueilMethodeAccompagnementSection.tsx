import { ArrowRight } from 'lucide-react';
import { Section } from '@/components/ui/Section';
import { ACCUEIL_METHODE_ACCOMPAGNEMENT_ETAPES } from '@/lib/accueil-config';
import { OFC_TYPE_H2 } from '@/lib/ofc-interaction-classes';

/** Méthode en 4 étapes — timeline maquette. */
export function AccueilMethodeAccompagnementSection() {
  return (
    <Section tone="muted" aria-labelledby="accueil-methode-title">
      <div className="mx-auto max-w-2xl text-center">
        <h2 id="accueil-methode-title" className={`${OFC_TYPE_H2} text-[#101936]`}>
          Notre méthode, en 4 étapes
        </h2>
        <p className="mt-3 text-base leading-relaxed text-ofc-ink-muted">
          Un accompagnement simple et efficace, de vos besoins à la mise en pratique.
        </p>
      </div>

      <ol className="mt-10 grid list-none gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {ACCUEIL_METHODE_ACCOMPAGNEMENT_ETAPES.map((etape, index) => (
          <li key={etape.n} className="relative list-none">
            <article className="flex h-full flex-col rounded-2xl border border-ofc-border bg-white p-5 shadow-sm">
              <span
                className="flex h-10 w-10 items-center justify-center rounded-full bg-[#377CF3] font-display text-sm font-bold text-white"
                aria-hidden
              >
                {etape.n}
              </span>
              <h3 className="mt-4 font-display text-base font-bold text-[#101936]">{etape.titre}</h3>
              <p className="mt-2 flex-1 text-sm leading-relaxed text-ofc-ink-muted">{etape.detail}</p>
            </article>
            {index < ACCUEIL_METHODE_ACCOMPAGNEMENT_ETAPES.length - 1 ? (
              <ArrowRight
                className="absolute -right-3 top-1/2 hidden h-5 w-5 -translate-y-1/2 text-[#377CF3]/50 lg:block xl:-right-4"
                aria-hidden
              />
            ) : null}
          </li>
        ))}
      </ol>
    </Section>
  );
}
