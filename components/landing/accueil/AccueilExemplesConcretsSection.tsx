import { ArrowRight, Briefcase } from 'lucide-react';
import { Section } from '@/components/ui/Section';
import { ACCUEIL_EXEMPLES_UTILISATION } from '@/lib/accueil-config';
import { OFC_TYPE_H2 } from '@/lib/ofc-interaction-classes';

/** Trois cartes Avant / Avec l’IA. */
export function AccueilExemplesConcretsSection() {
  return (
    <Section
      id="accueil-cas"
      tone="white"
      className="scroll-mt-[calc(var(--site-header-height,4.5rem)+0.5rem)]"
      aria-labelledby="accueil-exemples-title"
    >
      <div className="mx-auto max-w-2xl text-center">
        <h2 id="accueil-exemples-title" className={`${OFC_TYPE_H2} text-[#101936]`}>
          Des exemples concrets d&apos;utilisation
        </h2>
        <p className="mt-3 text-base leading-relaxed text-ofc-ink-muted">
          Découvrez comment l&apos;IA peut accompagner les tâches quotidiennes des entreprises du
          BTP.
        </p>
      </div>

      <ul className="mt-10 grid list-none gap-6 lg:grid-cols-3">
        {ACCUEIL_EXEMPLES_UTILISATION.map((ex) => (
          <li key={ex.id} className="list-none">
            <article className="flex h-full flex-col rounded-2xl border border-ofc-border bg-white p-5 shadow-sm">
              <div className="flex items-center gap-2 text-[#377CF3]">
                <Briefcase className="h-4 w-4 shrink-0" strokeWidth={1.75} aria-hidden />
                <h3 className="font-display text-base font-bold text-[#101936]">{ex.titre}</h3>
              </div>

              <div className="mt-5 space-y-3">
                <div className="rounded-lg bg-[#F2F2F2] p-3">
                  <p className="text-xs font-bold uppercase tracking-wide text-ofc-ink-subtle">Avant</p>
                  <p className="mt-1.5 text-sm leading-relaxed text-ofc-ink-muted">{ex.avant}</p>
                </div>
                <div className="flex justify-center" aria-hidden>
                  <ArrowRight className="h-5 w-5 text-[#377CF3]" strokeWidth={2} />
                </div>
                <div className="rounded-lg border border-[#377CF3]/25 bg-[#377CF3]/5 p-3">
                  <p className="text-xs font-bold uppercase tracking-wide text-[#377CF3]">
                    Avec l&apos;IA
                  </p>
                  <p className="mt-1.5 text-sm leading-relaxed text-ofc-ink">{ex.avecIa}</p>
                </div>
              </div>
            </article>
          </li>
        ))}
      </ul>

      <p className="mx-auto mt-8 max-w-3xl text-center text-xs leading-relaxed text-ofc-ink-muted">
        Les productions de l&apos;IA doivent être relues et validées par un professionnel avant tout
        usage ou envoi — conformément à ce qui est enseigné en formation.
      </p>
    </Section>
  );
}
