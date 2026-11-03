import Link from 'next/link';
import { BookOpen, CirclePlay, FileText, type LucideIcon } from 'lucide-react';
import { ACCUEIL_RESSOURCES_MAQUETTE } from '@/lib/accueil-config';
import { LINKS } from '@/lib/internal-links';
import { OFC_LINK } from '@/lib/ofc-interaction-classes';
import {
  AccueilMaquetteHeading,
  AccueilMaquetteSection,
} from '@/components/landing/accueil/AccueilMaquetteSection';
import { ACCUEIL_MAQUETTE_ICON_STROKE } from '@/components/landing/accueil/accueil-maquette-icons';
import { AccueilMaquetteArrowButton } from '@/components/landing/accueil/AccueilMaquetteArrowButton';
import { RevealGroupShell } from '@/components/motion/RevealShell';
import { ACCUEIL_MOTION_REVEAL } from '@/components/landing/accueil/accueil-maquette-icons';

const ICONS: Record<(typeof ACCUEIL_RESSOURCES_MAQUETTE)[number]['icon'], LucideIcon> = {
  book: BookOpen,
  play: CirclePlay,
  file: FileText,
};

/** Trois ressources gratuites — cartes verticales en grille (maquette). */
export function AccueilRessourcesGratuitesSection() {
  return (
    <AccueilMaquetteSection
      id="accueil-ressources"
      className="scroll-mt-[calc(var(--site-header-height,4.5rem)+0.5rem)]"
      aria-labelledby="accueil-ressources-title"
    >
      <AccueilMaquetteHeading
        id="accueil-ressources-title"
        title="Nos ressources gratuites"
        description="Des contenus pratiques pour mieux comprendre et utiliser l'IA dans le BTP."
      />

      <RevealGroupShell
        as="ul"
        itemAs="li"
        className="accueil-maquette__grid grid list-none gap-3 sm:grid-cols-2 lg:grid-cols-3 lg:gap-3.5"
        staggerMs={ACCUEIL_MOTION_REVEAL.staggerMs}
        distance={ACCUEIL_MOTION_REVEAL.distance}
      >
        {ACCUEIL_RESSOURCES_MAQUETTE.map((r) => {
          const Icon = ICONS[r.icon];
          return (
              <Link
                key={r.href}
                href={r.href}
                className="accueil-maquette-card--interactive group flex h-full min-h-[10.5rem] flex-col rounded-xl border border-ofc-border bg-white p-4 shadow-sm motion-reduce:transition-none"
              >
                <span className="accueil-maquette-card__icon flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#EAF3FF] text-[#377CF3] motion-safe:transition-[transform,background-color] motion-safe:duration-200 motion-reduce:transition-none">
                  <Icon className="h-5 w-5" strokeWidth={ACCUEIL_MAQUETTE_ICON_STROKE} aria-hidden />
                </span>
                <span className="mt-3 block font-display text-xs font-bold text-[#101936] sm:text-[0.8125rem]">
                  {r.label}
                </span>
                <span className="mt-0.5 block font-display text-sm font-bold leading-snug text-[#101936]">
                  {r.titre}
                </span>
                <span className="mt-1.5 flex-1 text-xs leading-relaxed text-ofc-ink-muted">{r.phrase}</span>
                <span className="mt-3 flex justify-end">
                  <AccueilMaquetteArrowButton className="!h-9 !w-9" />
                </span>
              </Link>
          );
        })}
      </RevealGroupShell>

      <p className="mt-4 text-center">
        <Link href={LINKS.ressources} className={`${OFC_LINK} text-sm font-semibold`}>
          Voir toutes les ressources
        </Link>
      </p>
    </AccueilMaquetteSection>
  );
}
