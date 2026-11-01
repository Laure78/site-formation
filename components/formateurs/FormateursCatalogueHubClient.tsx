'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { FormateurDetailDialog } from '@/components/formateurs/FormateurDetailDialog';
import type { FormateurProfile } from '@/lib/formateurs';
import {
  FORMATEURS_FILTRES,
  filtreIdFromUrlParam,
  urlKeyFromFiltreId,
  type FormateursFiltreId,
} from '@/lib/formateurs/hub-filtres';
import { cn } from '@/lib/cn';

type Props = {
  formateurs: readonly FormateurProfile[];
  initialFiltreId: FormateursFiltreId;
};

/** Filtres domaine + panneau profil — le HTML des cartes est rendu côté serveur. */
export function FormateursCatalogueHubClient({ formateurs, initialFiltreId }: Props) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const domaineParam = searchParams.get('domaine');

  const [filtreId, setFiltreId] = useState<FormateursFiltreId>(initialFiltreId);
  const [selectedSlug, setSelectedSlug] = useState<string | null>(null);

  useEffect(() => {
    setFiltreId(filtreIdFromUrlParam(domaineParam));
  }, [domaineParam]);

  const selectedFormateur = useMemo(
    () => formateurs.find((f) => f.slug === selectedSlug) ?? null,
    [formateurs, selectedSlug],
  );

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
    <>
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

      <FormateurDetailDialog
        formateur={selectedFormateur}
        open={selectedFormateur !== null}
        onClose={closeProfil}
      />
    </>
  );
}
