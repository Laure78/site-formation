import {
  Calculator,
  CalendarRange,
  ClipboardList,
  FileSearch,
  FileText,
  FolderOpen,
  type LucideIcon,
} from 'lucide-react';
import { ACCUEIL_METIERS_IA_CARTES } from '@/lib/accueil-config';
import {
  AccueilMaquetteHeading,
  AccueilMaquetteSection,
} from '@/components/landing/accueil/AccueilMaquetteSection';

const ICONS: Record<(typeof ACCUEIL_METIERS_IA_CARTES)[number]['id'], LucideIcon> = {
  devis: Calculator,
  dce: FileSearch,
  memoire: FileText,
  cr: ClipboardList,
  planning: CalendarRange,
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

      <ul className="accueil-maquette__grid grid list-none gap-2.5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
        {ACCUEIL_METIERS_IA_CARTES.map(({ id, titre }) => {
          const Icon = ICONS[id];
          return (
            <li key={id} className="list-none">
              <article className="flex h-full min-h-[4.25rem] items-center gap-2.5 rounded-xl border border-ofc-border bg-white px-3 py-2.5 shadow-sm">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#EAF3FF] text-[#377CF3]">
                  <Icon className="h-4 w-4" strokeWidth={1.75} aria-hidden />
                </span>
                <h3 className="text-left text-xs font-semibold leading-snug text-[#101936] sm:text-[0.8125rem]">
                  {titre}
                </h3>
              </article>
            </li>
          );
        })}
      </ul>
    </AccueilMaquetteSection>
  );
}
