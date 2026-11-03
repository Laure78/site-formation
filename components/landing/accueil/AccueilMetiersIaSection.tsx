import {
  Calculator,
  CalendarDays,
  ClipboardList,
  FileSearch,
  FileText,
  FolderOpen,
  type LucideIcon,
} from 'lucide-react';
import { ACCUEIL_METIERS_IA_CARTES } from '@/lib/accueil-config';
import { ACCUEIL_MAQUETTE_ICON_STROKE } from '@/components/landing/accueil/accueil-maquette-icons';
import {
  AccueilMaquetteHeading,
  AccueilMaquetteSection,
} from '@/components/landing/accueil/AccueilMaquetteSection';
import { RevealGroupShell } from '@/components/motion/RevealShell';
import { ACCUEIL_MOTION_REVEAL } from '@/components/landing/accueil/accueil-maquette-icons';

const ICONS: Record<(typeof ACCUEIL_METIERS_IA_CARTES)[number]['id'], LucideIcon> = {
  devis: Calculator,
  dce: FileSearch,
  memoire: FileText,
  cr: ClipboardList,
  planning: CalendarDays,
  doc: FolderOpen,
};

/** Six usages métiers — cartes horizontales compactes. */
export function AccueilMetiersIaSection() {
  return (
    <AccueilMaquetteSection tone="muted" aria-labelledby="accueil-metiers-ia-title">
      <AccueilMaquetteHeading
        id="accueil-metiers-ia-title"
        title="L'IA au service de vos métiers"
        description="Des usages concrets pour gagner du temps, structurer vos documents et piloter vos projets."
      />

      <RevealGroupShell
        as="ul"
        itemAs="li"
        className="accueil-maquette__grid grid list-none gap-2.5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6"
        staggerMs={ACCUEIL_MOTION_REVEAL.staggerMs}
        distance={ACCUEIL_MOTION_REVEAL.distance}
      >
        {ACCUEIL_METIERS_IA_CARTES.map(({ id, titre }) => {
          const Icon = ICONS[id];
          return (
              <article
                key={id}
                className="accueil-maquette-metier-card flex h-full min-h-[4.25rem] items-center gap-2.5 rounded-xl border border-ofc-border bg-white px-3 py-2.5 shadow-sm motion-reduce:transition-none"
              >
                <span className="accueil-maquette-metier-card__icon flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#EAF3FF] text-[#377CF3] motion-safe:transition-[background-color,color] motion-safe:duration-200 motion-reduce:transition-none">
                  <Icon className="h-6 w-6" strokeWidth={ACCUEIL_MAQUETTE_ICON_STROKE} aria-hidden />
                </span>
                <h3 className="text-left text-xs font-semibold leading-snug text-[#101936] sm:text-[0.8125rem]">
                  {titre}
                </h3>
              </article>
          );
        })}
      </RevealGroupShell>
    </AccueilMaquetteSection>
  );
}
