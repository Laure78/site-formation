import Link from 'next/link';
import { ArrowRight, CalendarDays, Timer } from 'lucide-react';
import {
  ACCUEIL_FORMATS_FORMATION_IA,
  getAccueilMaquetteFormations,
} from '@/lib/accueil-config';
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
import { LINKS } from '@/lib/internal-links';

const FORMAT_ICONS = {
  timer: Timer,
  calendar: CalendarDays,
} as const;

/** Formations IA — bandeaux 4 h / 7 h + quatre cartes catalogue (maquette). */
export function AccueilFormationsIaMaquetteSection() {
  const formations = getAccueilMaquetteFormations();

  return (
    <AccueilMaquetteSection
      id="accueil-formations-ia"
      tone="muted"
      className="scroll-mt-[calc(var(--site-header-height,4.5rem)+0.5rem)]"
      aria-labelledby="accueil-formations-ia-title"
    >
      <AccueilMaquetteHeading
        id="accueil-formations-ia-title"
        title="Les formations IA BTP"
        description="Des formats adaptés à vos besoins et au temps disponible de vos équipes."
      />

      <RevealGroupShell
        className="accueil-maquette__grid grid gap-3 sm:grid-cols-2"
        staggerMs={ACCUEIL_MOTION_REVEAL.staggerMs}
        distance={ACCUEIL_MOTION_REVEAL.distance}
      >
        {ACCUEIL_FORMATS_FORMATION_IA.map((band) => {
          const Icon = FORMAT_ICONS[band.icon as keyof typeof FORMAT_ICONS];
          return (
            <div
              key={band.id}
              className="flex gap-3 rounded-xl border border-[#DAE3F0] bg-white p-4 shadow-sm"
            >
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-[#EAF3FF] text-[#0755E8]">
                <Icon className="h-5 w-5" strokeWidth={ACCUEIL_MAQUETTE_ICON_STROKE} aria-hidden />
              </span>
              <div className="min-w-0">
                <p className="font-display text-sm font-bold text-[#081A3D] md:text-base">{band.titre}</p>
                <p className="mt-1 text-xs leading-relaxed text-ofc-ink-muted md:text-sm">
                  {band.description}
                </p>
              </div>
            </div>
          );
        })}
      </RevealGroupShell>

      <p className="mt-3 text-center text-xs text-ofc-ink-muted">
        Ateliers avancés de 14 h également disponibles.
      </p>

      <div className="mt-4 flex flex-col items-end gap-2 text-right">
        <Link
          href={LINKS.formations}
          className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#0755E8] hover:underline"
        >
          Voir les 7 formations du catalogue
          <ArrowRight className="h-4 w-4" strokeWidth={ACCUEIL_MAQUETTE_ICON_STROKE} aria-hidden />
        </Link>
        <p className="max-w-md text-xs leading-relaxed text-ofc-ink-muted">
          Entreprise de menuiserie extérieure ou d&apos;agencement ?{' '}
          <Link href={LINKS.formationIaMenuisierBtp} className="font-semibold text-[#0755E8] hover:underline">
            Formation IA pour les entreprises de menuiserie
          </Link>
          .
        </p>
      </div>

      <RevealGroupShell
        as="ul"
        itemAs="li"
        className="accueil-maquette__grid !mt-3 grid list-none gap-3 sm:grid-cols-2 lg:grid-cols-4"
        staggerMs={ACCUEIL_MOTION_REVEAL.staggerMs}
        distance={ACCUEIL_MOTION_REVEAL.distance}
      >
        {formations.map((f) => {
          const FormationIcon = accueilMaquetteFormationIcon(f.code);
          return (
            <Link
              key={f.code}
              href={f.href}
              className="accueil-maquette-card--interactive group flex h-full flex-col rounded-xl border border-[#DAE3F0] bg-white p-4 shadow-sm motion-reduce:transition-none"
            >
              <div className="flex items-start justify-between gap-2">
                <span className="accueil-maquette-card__icon flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#EAF3FF] text-[#0755E8]">
                  <FormationIcon
                    className="h-[1.375rem] w-[1.375rem]"
                    strokeWidth={ACCUEIL_MAQUETTE_ICON_STROKE}
                    aria-hidden
                  />
                </span>
                <AccueilMaquetteArrowButton className="!h-9 !w-9 opacity-90" />
              </div>
              <h3 className="mt-2.5 font-display text-[0.9375rem] font-bold leading-snug text-[#081A3D]">
                {f.titre}
              </h3>
              <p className="mt-1.5 line-clamp-3 flex-1 text-xs leading-relaxed text-ofc-ink-muted">
                {f.description}
              </p>
              <AccueilMaquettePill variant="accent" className="mt-3">
                {f.badge}
              </AccueilMaquettePill>
            </Link>
          );
        })}
      </RevealGroupShell>
    </AccueilMaquetteSection>
  );
}
