import Link from 'next/link';
import { ArrowRight, BookOpen, FileText, GraduationCap } from 'lucide-react';
import { Section } from '@/components/ui/Section';
import { ACCUEIL_RESSOURCES_MAQUETTE } from '@/lib/accueil-config';
import { LINKS } from '@/lib/internal-links';
import { OFC_LINK, OFC_TYPE_H2 } from '@/lib/ofc-interaction-classes';

const ICONS = [BookOpen, FileText, GraduationCap] as const;

/** Trois ressources gratuites — cartes horizontales. */
export function AccueilRessourcesGratuitesSection() {
  return (
    <Section
      id="accueil-ressources"
      tone="white"
      className="scroll-mt-[calc(var(--site-header-height,4.5rem)+0.5rem)]"
      aria-labelledby="accueil-ressources-title"
    >
      <div className="mx-auto max-w-2xl text-center">
        <h2 id="accueil-ressources-title" className={`${OFC_TYPE_H2} text-[#101936]`}>
          Nos ressources gratuites
        </h2>
        <p className="mt-3 text-base leading-relaxed text-ofc-ink-muted">
          Des contenus pratiques pour comprendre et utiliser l&apos;IA dans les métiers du BTP.
        </p>
      </div>

      <ul className="mt-8 space-y-3">
        {ACCUEIL_RESSOURCES_MAQUETTE.map((r, index) => {
          const Icon = ICONS[index] ?? BookOpen;
          return (
            <li key={r.href} className="list-none">
              <Link
                href={r.href}
                className="group flex items-center gap-4 rounded-xl border border-ofc-border bg-white px-4 py-4 shadow-sm transition hover:border-[#377CF3]/35 md:px-5"
              >
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#EAF3FF] text-[#377CF3]">
                  <Icon className="h-5 w-5" strokeWidth={1.75} aria-hidden />
                </span>
                <span className="min-w-0 flex-1 text-left">
                  <span className="block font-display text-sm font-bold text-[#101936] md:text-base">
                    {r.titre}
                  </span>
                  <span className="mt-0.5 block text-sm text-ofc-ink-muted">{r.phrase}</span>
                </span>
                <ArrowRight
                  className="h-5 w-5 shrink-0 text-[#377CF3] transition group-hover:translate-x-0.5"
                  aria-hidden
                />
              </Link>
            </li>
          );
        })}
      </ul>

      <p className="mt-6 text-center">
        <Link href={LINKS.ressources} className={`${OFC_LINK} text-sm font-semibold`}>
          Voir toutes les ressources
        </Link>
      </p>
    </Section>
  );
}
