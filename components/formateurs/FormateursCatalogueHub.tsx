'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { FormateurCompactCard } from '@/components/formateurs/FormateurCompactCard';
import { FormateurDetailDialog } from '@/components/formateurs/FormateurDetailDialog';
import { FormateursLaureHero } from '@/components/formateurs/FormateursLaureHero';
import type { FormateurProfile } from '@/lib/formateurs';
import {
  FORMATEUR_LAURE_ID,
  FORMATEURS_FILTRES,
  filtreIdFromUrlParam,
  urlKeyFromFiltreId,
  type FormateursFiltreId,
} from '@/lib/formateurs/hub-filtres';
import { formateurMatchesHubFiltre } from '@/lib/formateurs/hub-display';
import { cn } from '@/lib/cn';
import { OFC_TYPE_H3 } from '@/lib/ofc-interaction-classes';

type Props = {
  formateurs: readonly FormateurProfile[];
};

export function FormateursCatalogueHub({ formateurs }: Props) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const domaineParam = searchParams.get('domaine');

  const laure = useMemo(
    () => formateurs.find((f) => f.id === FORMATEUR_LAURE_ID),
    [formateurs],
  );
  const equipe = useMemo(
    () => formateurs.filter((f) => f.id !== FORMATEUR_LAURE_ID),
    [formateurs],
  );

  const [filtreId, setFiltreId] = useState<FormateursFiltreId>(() =>
    filtreIdFromUrlParam(domaineParam),
  );
  const [selectedSlug, setSelectedSlug] = useState<string | null>(null);

  useEffect(() => {
    setFiltreId(filtreIdFromUrlParam(domaineParam));
  }, [domaineParam]);

  const filtered = useMemo(
    () => equipe.filter((f) => formateurMatchesHubFiltre(f, filtreId)),
    [equipe, filtreId],
  );

  const selectedFormateur = useMemo(
    () => formateurs.find((f) => f.slug === selectedSlug) ?? null,
    [formateurs, selectedSlug],
  );

  const openProfil = useCallback((slug: string) => {
    setSelectedSlug(slug);
    if (typeof window !== 'undefined') {
      window.history.replaceState(null, '', `#${slug}`);
    }
  }, []);

  const closeProfil = useCallback(() => {
    setSelectedSlug(null);
    if (typeof window === 'undefined') return;
    const params = new URLSearchParams(searchParams.toString());
    const qs = params.toString();
    window.history.replaceState(null, '', qs ? `${pathname}?${qs}` : pathname);
  }, [pathname, searchParams]);

  useEffect(() => {
    const syncHash = () => {
      const hash = window.location.hash.replace(/^#/, '');
      if (!hash) {
        setSelectedSlug(null);
        return;
      }
      const match = formateurs.find((f) => f.slug === hash);
      if (match) setSelectedSlug(hash);
    };
    syncHash();
    window.addEventListener('hashchange', syncHash);
    return () => window.removeEventListener('hashchange', syncHash);
  }, [formateurs]);

  const setFiltre = (id: FormateursFiltreId) => {
    setFiltreId(id);
    const urlKey = urlKeyFromFiltreId(id);
    const qs = urlKey ? `?domaine=${urlKey}` : '';
    router.replace(`${pathname}${qs}`, { scroll: false });
  };

  return (
    <div id="formateurs-profiles" className="scroll-mt-[var(--site-header-height)]">
      {laure ? (
        <FormateursLaureHero laure={laure} onOpenProfil={() => openProfil(laure.slug)} />
      ) : null}

      <div className="formateurs-hub-profiles__head mt-10">
        <h2 className={`${OFC_TYPE_H3} text-ofc-ink`}>Intervenants métiers</h2>
        <p className="mt-2 max-w-2xl text-base leading-relaxed text-ofc-ink-muted">
          Filtrez par domaine pour repérer qui anime quoi — ouvrez un profil pour le programme
          détaillé.
        </p>
        <div
          className="mt-4 flex flex-wrap gap-2"
          role="group"
          aria-label="Filtrer par domaine d’intervention"
        >
          {FORMATEURS_FILTRES.map((opt) => {
            const active = filtreId === opt.id;
            return (
              <button
                key={opt.id}
                type="button"
                aria-pressed={active}
                onClick={() => setFiltre(opt.id)}
                className={cn(
                  'inline-flex min-h-11 max-w-full items-center rounded-full border px-4 py-2 text-sm font-semibold transition motion-reduce:transition-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ofc-accent',
                  active
                    ? 'border-[#377CF3] bg-[#377CF3] text-white'
                    : 'border-ofc-border-strong bg-white text-ofc-ink hover:border-[#377CF3]/35',
                )}
              >
                {opt.label}
              </button>
            );
          })}
        </div>
      </div>

      <p className="mt-4 text-sm text-ofc-ink-muted" aria-live="polite">
        {filtered.length} formateur{filtered.length > 1 ? 's' : ''}{' '}
        {filtered.length > 1 ? 'affichés' : 'affiché'}
      </p>

      <ul className="mt-6 grid list-none grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 md:gap-5">
        {filtered.map((f, index) => (
          <li
            key={f.id}
            id={f.slug}
            className="scroll-mt-[var(--site-header-height)] min-w-0"
          >
            <FormateurCompactCard
              formateur={f}
              portraitPriority={index < 2}
              onOpenProfil={() => openProfil(f.slug)}
            />
          </li>
        ))}
      </ul>

      {filtered.length === 0 ? (
        <p className="mt-8 text-base text-ofc-ink-muted">
          Aucun formateur pour ce domaine. Choisissez un autre filtre ou{' '}
          <button
            type="button"
            className="font-semibold text-ofc-accent underline-offset-2 hover:underline"
            onClick={() => setFiltre('all')}
          >
            afficher tous
          </button>
          .
        </p>
      ) : null}

      <FormateurDetailDialog
        formateur={selectedFormateur}
        open={selectedFormateur !== null}
        onClose={closeProfil}
      />
    </div>
  );
}
