import {
  Calculator,
  CalendarRange,
  ClipboardList,
  FileSearch,
  FileText,
  FolderOpen,
  type LucideIcon,
} from 'lucide-react';
import { Section } from '@/components/ui/Section';
import { ACCUEIL_METIERS_IA_CARTES } from '@/lib/accueil-config';
import { OFC_TYPE_H2 } from '@/lib/ofc-interaction-classes';

const ICONS: Record<(typeof ACCUEIL_METIERS_IA_CARTES)[number]['id'], LucideIcon> = {
  devis: Calculator,
  dce: FileSearch,
  memoire: FileText,
  cr: ClipboardList,
  planning: CalendarRange,
  doc: FolderOpen,
};

/** Six usages métiers — cartes compactes. */
export function AccueilMetiersIaSection() {
  return (
    <Section tone="muted" aria-labelledby="accueil-metiers-ia-title">
      <div className="mx-auto max-w-2xl text-center">
        <h2 id="accueil-metiers-ia-title" className={`${OFC_TYPE_H2} text-[#101936]`}>
          L&apos;IA au service de vos métiers
        </h2>
        <p className="mt-3 text-base leading-relaxed text-ofc-ink-muted">
          Des usages concrets pour gagner du temps, structurer vos documents et piloter vos projets.
        </p>
      </div>

      <ul className="mt-10 grid list-none gap-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6">
        {ACCUEIL_METIERS_IA_CARTES.map(({ id, titre }) => {
          const Icon = ICONS[id];
          return (
            <li key={id} className="list-none">
              <article className="flex h-full flex-col items-center rounded-xl border border-ofc-border bg-white px-3 py-5 text-center shadow-sm">
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#EAF3FF] text-[#377CF3]">
                  <Icon className="h-5 w-5" strokeWidth={1.75} aria-hidden />
                </span>
                <h3 className="mt-3 text-sm font-semibold leading-snug text-[#101936]">{titre}</h3>
              </article>
            </li>
          );
        })}
      </ul>
    </Section>
  );
}
