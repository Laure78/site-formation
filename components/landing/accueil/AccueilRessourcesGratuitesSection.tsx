import Link from 'next/link';
import { ArrowRight, BookOpen, FileText, GraduationCap } from 'lucide-react';
import { ACCUEIL_RESSOURCES_MAQUETTE } from '@/lib/accueil-config';
import { LINKS } from '@/lib/internal-links';
import { OFC_LINK } from '@/lib/ofc-interaction-classes';
import {
  AccueilMaquetteHeading,
  AccueilMaquetteSection,
} from '@/components/landing/accueil/AccueilMaquetteSection';
import { AccueilMaquetteArrowButton } from '@/components/landing/accueil/AccueilMaquetteArrowButton';

const ICONS = [BookOpen, FileText, GraduationCap] as const;

/** Trois ressources gratuites — cartes horizontales compactes. */
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
        description="Des contenus pratiques pour comprendre et utiliser l'IA dans les métiers du BTP."
      />

      <ul className="accueil-maquette__grid space-y-2.5">
        {ACCUEIL_RESSOURCES_MAQUETTE.map((r, index) => {
          const Icon = ICONS[index] ?? BookOpen;
          return (
            <li key={r.href} className="list-none">
              <Link
                href={r.href}
                className="group flex items-center gap-3 rounded-xl border border-ofc-border bg-white px-3 py-3 shadow-sm transition hover:border-[#377CF3]/35 md:px-4"
              >
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#EAF3FF] text-[#377CF3]">
                  <Icon className="h-4 w-4" strokeWidth={1.75} aria-hidden />
                </span>
                <span className="min-w-0 flex-1 text-left">
                  <span className="block font-display text-sm font-bold text-[#101936]">{r.titre}</span>
                  <span className="mt-0.5 block text-xs text-ofc-ink-muted">{r.phrase}</span>
                </span>
                <AccueilMaquetteArrowButton className="!h-9 !w-9" />
              </Link>
            </li>
          );
        })}
      </ul>

      <p className="mt-4 text-center">
        <Link href={LINKS.ressources} className={`${OFC_LINK} text-sm font-semibold`}>
          Voir toutes les ressources
        </Link>
      </p>
    </AccueilMaquetteSection>
  );
}
