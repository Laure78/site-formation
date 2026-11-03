import Image from 'next/image';
import Link from 'next/link';
import { getAccueilMaquetteFormations } from '@/lib/accueil-config';
import {
  ACCUEIL_MAQUETTE_ICON_STROKE,
  accueilMaquetteFormationIcon,
} from '@/components/landing/accueil/accueil-maquette-icons';
import { AccueilMaquetteArrowButton } from '@/components/landing/accueil/AccueilMaquetteArrowButton';
import { AccueilMaquettePill } from '@/components/landing/accueil/AccueilMaquettePill';
import {
  AccueilMaquetteHeading,
  AccueilMaquetteSection,
} from '@/components/landing/accueil/AccueilMaquetteSection';
import { RevealGroupShell } from '@/components/motion/RevealShell';
import { ACCUEIL_MOTION_REVEAL } from '@/components/landing/accueil/accueil-maquette-icons';

/** Quatre cartes formations — visuels bandeau bas + flèche (maquette). */
export function AccueilFormationsCatalogueSection() {
  const formations = getAccueilMaquetteFormations();

  return (
    <AccueilMaquetteSection
      id="accueil-offre-choix"
      className="scroll-mt-[calc(var(--site-header-height,4.5rem)+0.5rem)]"
      aria-labelledby="accueil-formations-maquette-title"
    >
      <AccueilMaquetteHeading
        id="accueil-formations-maquette-title"
        title="Choisissez votre formation IA BTP"
        description="Des formations pratiques, orientées métiers, adaptées à vos besoins et au niveau de votre équipe."
      />

      <RevealGroupShell
        as="ul"
        itemAs="li"
        className="accueil-maquette__grid grid list-none gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:gap-3.5"
        staggerMs={ACCUEIL_MOTION_REVEAL.staggerMs}
        distance={ACCUEIL_MOTION_REVEAL.distance}
      >
        {formations.map((f) => {
          const FormationIcon = accueilMaquetteFormationIcon(f.code);
          return (
            <Link
              key={f.code}
              href={f.href}
              className="accueil-maquette-card--interactive group flex h-full flex-col overflow-hidden rounded-xl border border-ofc-border bg-white shadow-sm motion-reduce:transition-none"
            >
              <div className="flex flex-1 flex-col p-4 pb-3">
                <div className="flex items-center gap-2">
                  <span className="accueil-maquette-card__icon flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#EAF3FF] text-[#377CF3] motion-safe:transition-[transform,background-color] motion-safe:duration-200 motion-reduce:transition-none">
                    <FormationIcon className="h-[1.375rem] w-[1.375rem]" strokeWidth={ACCUEIL_MAQUETTE_ICON_STROKE} aria-hidden />
                  </span>
                  <AccueilMaquettePill variant="accent">{f.badge}</AccueilMaquettePill>
                </div>
                <h3 className="mt-2.5 font-display text-[0.9375rem] font-bold leading-snug text-[#101936]">
                  {f.titre}
                </h3>
                <p className="mt-1.5 line-clamp-3 flex-1 text-xs leading-relaxed text-ofc-ink-muted">
                  {f.description}
                </p>
              </div>
              <div className="accueil-maquette-card__media relative w-full shrink-0 overflow-hidden">
                <Image
                  src={f.imageSrc}
                  alt={f.imageAlt}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  className="object-cover object-center motion-reduce:transition-none"
                />
                <span className="absolute bottom-2 right-2">
                  <AccueilMaquetteArrowButton className="!h-9 !w-9" />
                </span>
              </div>
            </Link>
        );
        })}
      </RevealGroupShell>
    </AccueilMaquetteSection>
  );
}
