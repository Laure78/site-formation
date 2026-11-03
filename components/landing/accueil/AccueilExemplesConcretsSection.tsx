import { ArrowRight } from 'lucide-react';
import { ACCUEIL_EXEMPLES_UTILISATION } from '@/lib/accueil-config';
import {
  ACCUEIL_EXEMPLE_ICONS,
  ACCUEIL_MAQUETTE_ICON_STROKE,
} from '@/components/landing/accueil/accueil-maquette-icons';
import { AccueilMaquettePill } from '@/components/landing/accueil/AccueilMaquettePill';
import {
  AccueilMaquetteHeading,
  AccueilMaquetteSection,
} from '@/components/landing/accueil/AccueilMaquetteSection';
import { RevealGroupShell } from '@/components/motion/RevealShell';
import { ACCUEIL_MOTION_REVEAL } from '@/components/landing/accueil/accueil-maquette-icons';

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

      <RevealGroupShell
        as="ul"
        itemAs="li"
        className="accueil-maquette__grid grid list-none gap-4 lg:grid-cols-3"
        staggerMs={ACCUEIL_MOTION_REVEAL.staggerMs}
        distance={ACCUEIL_MOTION_REVEAL.distance}
      >
        {ACCUEIL_EXEMPLES_UTILISATION.map((ex) => {
          const ExempleIcon = ACCUEIL_EXEMPLE_ICONS[ex.id];
          return (
            <article
              key={ex.id}
              className="accueil-maquette-card--interactive flex h-full flex-col rounded-xl border border-ofc-border bg-white p-4 shadow-sm motion-reduce:transition-none"
            >
              <div className="flex items-center gap-2.5 text-[#377CF3]">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#EAF3FF]">
                  <ExempleIcon className="h-5 w-5 shrink-0" strokeWidth={ACCUEIL_MAQUETTE_ICON_STROKE} aria-hidden />
                </span>
                <h3 className="font-display text-sm font-bold text-[#101936]">{ex.titre}</h3>
              </div>

              <div className="mt-3 grid flex-1 gap-2.5 md:grid-cols-[1fr_auto_1fr] md:items-stretch">
                <div className="rounded-lg border border-ofc-border/80 bg-[#FAFAFA] p-2.5">
                  <AccueilMaquettePill variant="neutral">Avant</AccueilMaquettePill>
                  <p className="mt-2 text-xs leading-relaxed text-ofc-ink-muted">{ex.avant}</p>
                </div>
                <div className="flex items-center justify-center md:px-0.5" aria-hidden>
                  <ArrowRight
                    className="h-5 w-5 rotate-90 text-[#377CF3] motion-safe:transition-transform motion-safe:duration-200 md:rotate-0"
                    strokeWidth={ACCUEIL_MAQUETTE_ICON_STROKE}
                  />
                </div>
                <div className="rounded-lg border border-[#377CF3]/20 bg-[#377CF3]/[0.06] p-2.5">
                  <AccueilMaquettePill variant="accent">Avec l&apos;IA</AccueilMaquettePill>
                  <p className="mt-2 text-xs leading-relaxed text-ofc-ink">{ex.avecIa}</p>
                </div>
              </div>
            </article>
        );
        })}
      </RevealGroupShell>

      <p className="mx-auto mt-4 max-w-3xl text-center text-[11px] leading-relaxed text-ofc-ink-muted">
        Les productions de l&apos;IA doivent être relues et validées par un professionnel avant tout
        usage ou envoi.
      </p>
    </AccueilMaquetteSection>
  );
}
