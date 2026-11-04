import Link from 'next/link';
import {
  accueilParcoursMetierIcon,
  ACCUEIL_MAQUETTE_ICON_STROKE,
} from '@/components/landing/accueil/accueil-maquette-icons';
import { AccueilMaquetteArrowButton } from '@/components/landing/accueil/AccueilMaquetteArrowButton';
import { AccueilMaquettePill } from '@/components/landing/accueil/AccueilMaquettePill';
import {
  AccueilMaquetteHeading,
  AccueilMaquetteSection,
} from '@/components/landing/accueil/AccueilMaquetteSection';
import { RevealGroupShell } from '@/components/motion/RevealShell';
import { ACCUEIL_MOTION_REVEAL } from '@/components/landing/accueil/accueil-maquette-icons';
import {
  accueilParcoursMetiersCarteHref,
  getAccueilParcoursMetiersMaquette,
} from '@/lib/accueil-offre-catalogue';

/** Grille des six parcours métiers — ouverture 2027 (maquette). */
export function AccueilParcoursMetiersMaquetteSection() {
  const parcours = getAccueilParcoursMetiersMaquette();

  return (
    <AccueilMaquetteSection
      id="accueil-parcours-metiers"
      className="scroll-mt-[calc(var(--site-header-height,4.5rem)+0.5rem)]"
      aria-labelledby="accueil-parcours-metiers-title"
    >
      <div className="flex flex-col items-center gap-2">
        <AccueilMaquetteHeading
          id="accueil-parcours-metiers-title"
          title="Les parcours métiers BTP avec l’IA"
        />
        <AccueilMaquettePill variant="violet" className="text-[10px]">
          Ouverture prévue en 2027
        </AccueilMaquettePill>
      </div>

      <RevealGroupShell
        as="ul"
        itemAs="li"
        className="accueil-maquette__grid grid list-none gap-2.5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6"
        staggerMs={ACCUEIL_MOTION_REVEAL.staggerMs}
        distance={ACCUEIL_MOTION_REVEAL.distance}
      >
        {parcours.map((p) => {
          const Icon = accueilParcoursMetierIcon(p.id);
          const href = accueilParcoursMetiersCarteHref(p.id, p.href);
          return (
            <Link
              key={p.id}
              href={href}
              className="accueil-maquette-metier-card group flex h-full min-h-[4.5rem] flex-col justify-between gap-2 rounded-xl border border-[#DAE3F0] bg-white px-3 py-3 shadow-sm motion-reduce:transition-none"
            >
              <div className="flex items-start gap-2">
                <span className="accueil-maquette-metier-card__icon flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#EAF3FF] text-[#0755E8]">
                  <Icon className="h-5 w-5" strokeWidth={ACCUEIL_MAQUETTE_ICON_STROKE} aria-hidden />
                </span>
                <h3 className="min-w-0 flex-1 text-left text-xs font-semibold leading-snug text-[#081A3D] sm:text-[0.8125rem]">
                  {p.titre}
                </h3>
              </div>
              <div className="flex justify-end">
                <AccueilMaquetteArrowButton className="!h-8 !w-8" />
              </div>
            </Link>
          );
        })}
      </RevealGroupShell>
    </AccueilMaquetteSection>
  );
}
