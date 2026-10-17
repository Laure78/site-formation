'use client';

import { useEffect, useMemo } from 'react';
import Link from 'next/link';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { FormationsIaDisponibleCard } from '@/components/formations/catalogue-2027/FormationsIaDisponibleCard';
import type { FormationsIaNiveauSection } from '@/lib/formations-ia-disponibles-niveaux';
import type { FormationCatalogueEntry } from '@/lib/formations-catalogue-display';
import type { FormationNiveau } from '@/data/formations';
import {
  buildFormationsIaHref,
  parseFormationsIaFilters,
} from '@/lib/catalogue-filter-url';
import { getFormationNiveauIaDefinition } from '@/lib/formations-niveaux-ia';

type Props = {
  sections: readonly FormationsIaNiveauSection[];
  byNiveau: Record<FormationNiveau, FormationCatalogueEntry[]>;
};

export function FormationsIaDisponiblesClient({ sections, byNiveau }: Props) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const filters = useMemo(
    () => parseFormationsIaFilters(searchParams),
    [searchParams],
  );
  const niveauActif = filters.niveau;

  const totalVisible = useMemo(() => {
    if (niveauActif) return byNiveau[niveauActif]?.length ?? 0;
    return sections.reduce((s, sec) => s + (byNiveau[sec.niveau]?.length ?? 0), 0);
  }, [byNiveau, niveauActif, sections]);

  useEffect(() => {
    if (pathname !== '/formations' || !niveauActif) return;
    const el = document.getElementById('formations-ia-disponibles');
    el?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }, [niveauActif, pathname]);

  const reset = () => {
    router.replace('/formations#formations-ia-disponibles', { scroll: false });
  };

  const sectionsToRender = niveauActif
    ? sections.filter((s) => s.niveau === niveauActif)
    : sections;

  return (
    <>
      <div className="mt-8 flex flex-wrap items-center gap-2 sm:gap-3">
        {sections.map((section) => {
          const active = niveauActif === section.niveau;
          const href = buildFormationsIaHref({ niveau: section.niveau });
          return (
            <Link
              key={section.niveau}
              href={href}
              aria-current={active ? 'true' : undefined}
              className={`inline-flex min-h-10 items-center rounded-lg border px-4 py-2 text-sm font-medium transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#377CF3] ${
                active
                  ? 'border-[#377CF3] bg-[#377CF3]/10 text-[#377CF3]'
                  : 'border-[#E2E8F0] bg-white text-ofc-ink hover:border-[#377CF3]/40 hover:bg-[#377CF3]/5'
              }`}
            >
              {section.anchorNavLabel}
              <span className="ml-1.5 tabular-nums text-ofc-ink-muted">
                ({byNiveau[section.niveau]?.length ?? 0})
              </span>
            </Link>
          );
        })}
        {niveauActif ? (
          <button
            type="button"
            onClick={reset}
            className="inline-flex min-h-10 items-center rounded-lg border border-dashed border-[#CBD5E1] bg-white px-4 py-2 text-sm font-medium text-ofc-ink-muted hover:border-[#377CF3]/40 hover:text-ofc-ink"
          >
            Réinitialiser
          </button>
        ) : null}
      </div>

      <p className="mt-4 text-sm text-ofc-ink-muted" aria-live="polite">
        {totalVisible} formation{totalVisible > 1 ? 's' : ''} affichée{totalVisible > 1 ? 's' : ''}
        {niveauActif
          ? ` — ${getFormationNiveauIaDefinition(niveauActif).labelComplet}`
          : ''}
      </p>

      <div className="mt-10 space-y-14">
        {sectionsToRender.map((section) => {
          const formations = byNiveau[section.niveau];
          if (!formations?.length) {
            if (niveauActif) {
              return (
                <p key={section.niveau} className="text-base text-ofc-ink-muted">
                  Aucune formation publiée pour ce niveau pour le moment.{' '}
                  <button type="button" onClick={reset} className="font-medium text-[#377CF3] underline">
                    Voir tout le catalogue
                  </button>
                  .
                </p>
              );
            }
            return null;
          }

          return (
            <section
              key={section.niveau}
              id={section.anchorId}
              className="scroll-mt-28"
              aria-labelledby={`${section.anchorId}-heading`}
            >
              <h3
                id={`${section.anchorId}-heading`}
                className="font-display text-xl font-bold text-ofc-ink md:text-2xl"
              >
                {section.heading}
              </h3>
              <p className="mt-2 max-w-3xl text-sm leading-relaxed text-ofc-ink-muted md:text-base">
                {section.description}
              </p>
              <p className="mt-2 text-sm font-medium text-ofc-ink">{section.publicLabel}</p>

              <ul className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                {formations.map((entry) => (
                  <FormationsIaDisponibleCard key={entry.ref} entry={entry} />
                ))}
              </ul>
            </section>
          );
        })}
      </div>
    </>
  );
}
