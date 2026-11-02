import { ArrowRight, Briefcase } from 'lucide-react';
import { ACCUEIL_EXEMPLES_UTILISATION } from '@/lib/accueil-config';
import {
  AccueilMaquetteHeading,
  AccueilMaquetteSection,
} from '@/components/landing/accueil/AccueilMaquetteSection';

/** Trois cartes Avant / Avec l’IA — disposition maquette. */
export function AccueilExemplesConcretsSection() {
  return (
    <AccueilMaquetteSection
      id="accueil-cas"
      className="scroll-mt-[calc(var(--site-header-height,4.5rem)+0.5rem)]"
      aria-labelledby="accueil-exemples-title"
    >
      <AccueilMaquetteHeading
        id="accueil-exemples-title"
        title="Des exemples concrets d'utilisation"
        description="Découvrez comment l'IA peut accompagner les tâches quotidiennes des entreprises du BTP."
      />

      <ul className="accueil-maquette__grid grid list-none gap-4 lg:grid-cols-3">
        {ACCUEIL_EXEMPLES_UTILISATION.map((ex) => (
          <li key={ex.id} className="list-none">
            <article className="flex h-full flex-col rounded-xl border border-ofc-border bg-white p-4 shadow-sm">
              <div className="flex items-center gap-2 text-[#377CF3]">
                <Briefcase className="h-4 w-4 shrink-0" strokeWidth={1.75} aria-hidden />
                <h3 className="font-display text-sm font-bold text-[#101936]">{ex.titre}</h3>
              </div>

              <div className="mt-3 grid flex-1 gap-2 md:grid-cols-[1fr_auto_1fr] md:items-center">
                <div className="rounded-lg bg-[#F2F2F2] p-2.5">
                  <p className="text-[10px] font-bold uppercase tracking-wide text-ofc-ink-subtle">
                    Avant
                  </p>
                  <p className="mt-1 text-xs leading-relaxed text-ofc-ink-muted">{ex.avant}</p>
                </div>
                <div className="flex justify-center md:px-0.5" aria-hidden>
                  <ArrowRight className="h-4 w-4 rotate-90 text-[#377CF3] md:rotate-0" strokeWidth={2} />
                </div>
                <div className="rounded-lg border border-[#377CF3]/25 bg-[#377CF3]/5 p-2.5">
                  <p className="text-[10px] font-bold uppercase tracking-wide text-[#377CF3]">
                    Avec l&apos;IA
                  </p>
                  <p className="mt-1 text-xs leading-relaxed text-ofc-ink">{ex.avecIa}</p>
                </div>
              </div>
            </article>
          </li>
        ))}
      </ul>

      <p className="mx-auto mt-4 max-w-3xl text-center text-[11px] leading-relaxed text-ofc-ink-muted">
        Les productions de l&apos;IA doivent être relues et validées par un professionnel avant tout
        usage ou envoi.
      </p>
    </AccueilMaquetteSection>
  );
}
