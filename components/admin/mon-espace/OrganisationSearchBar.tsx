'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useTransition } from 'react';
import { Search, Star } from 'lucide-react';
import { LINKS } from '@/lib/internal-links';
import type { WorkspaceNote, WorkspaceResource } from '@/lib/admin/mon-espace/types';
import {
  RESOURCE_CATEGORIES,
  RESOURCE_KINDS,
} from '@/lib/admin/mon-espace/types';

function kindLabel(kind: string) {
  return RESOURCE_KINDS.find((k) => k.id === kind)?.label ?? kind;
}

function categoryLabel(category: string) {
  return RESOURCE_CATEGORIES.find((c) => c.id === category)?.label ?? category;
}

/**
 * Recherche commune Notes + Ressources (paramètre `q` partagé).
 */
export function OrganisationSearchBar({
  basePath,
  query,
  preserve,
}: {
  basePath: string;
  query: string;
  /** Paramètres à conserver (ex. categorie, favoris) */
  preserve?: Record<string, string | undefined>;
}) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();

  return (
    <form
      className="relative"
      onSubmit={(e) => {
        e.preventDefault();
        const fd = new FormData(e.currentTarget);
        const q = String(fd.get('q') ?? '').trim();
        const next = new URLSearchParams();
        if (preserve) {
          for (const [key, value] of Object.entries(preserve)) {
            if (value) next.set(key, value);
          }
        }
        if (q) next.set('q', q);
        else next.delete('q');
        const qs = next.toString();
        startTransition(() => {
          router.push(qs ? `${basePath}?${qs}` : basePath);
        });
      }}
    >
      <Search
        size={16}
        className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
        aria-hidden
      />
      <input
        type="search"
        name="q"
        defaultValue={query}
        placeholder="Rechercher dans notes et ressources…"
        disabled={pending}
        className="w-full rounded-full border-0 bg-white py-2.5 pl-10 pr-4 text-sm text-slate-900 shadow-[0_1px_2px_rgba(15,23,42,0.04)] ring-1 ring-slate-200/80 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#377CF3]/30"
      />
    </form>
  );
}

export function CrossSearchResults({
  query,
  notes,
  resources,
  current: currentModule,
}: {
  query: string;
  notes: WorkspaceNote[];
  resources: WorkspaceResource[];
  current: 'notes' | 'ressources';
}) {
  if (!query) return null;

  const otherNotes = currentModule === 'notes' ? [] : notes;
  const otherResources = currentModule === 'ressources' ? [] : resources;
  const hasOther = otherNotes.length > 0 || otherResources.length > 0;

  return (
    <div className="rounded-2xl border border-sky-100 bg-sky-50/50 p-4">
      <p className="text-sm text-slate-700">
        Recherche « <span className="font-semibold">{query}</span> » — {notes.length}{' '}
        note{notes.length === 1 ? '' : 's'}, {resources.length} ressource
        {resources.length === 1 ? '' : 's'}.
      </p>

      {hasOther ? (
        <div className="mt-3 space-y-2">
          <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
            Aussi trouvé dans{' '}
            {currentModule === 'notes' ? 'Ressources' : 'Notes'}
          </p>
          <ul className="space-y-1.5">
            {otherNotes.slice(0, 5).map((n) => (
              <li key={n.id}>
                <Link
                  href={`${LINKS.adminMonEspaceNotes}?q=${encodeURIComponent(query)}`}
                  className="flex items-center gap-2 rounded-lg border border-white bg-white px-3 py-2 text-sm text-slate-800 hover:border-[#377CF3]/40"
                >
                  {n.pinned ? (
                    <Star size={12} className="fill-amber-400 text-amber-400" aria-hidden />
                  ) : null}
                  <span className="truncate font-medium">{n.title}</span>
                  <span className="ml-auto text-[10px] uppercase text-slate-400">Note</span>
                </Link>
              </li>
            ))}
            {otherResources.slice(0, 5).map((r) => (
              <li key={r.id}>
                <Link
                  href={`${LINKS.adminMonEspaceRessources}?q=${encodeURIComponent(query)}`}
                  className="flex items-center gap-2 rounded-lg border border-white bg-white px-3 py-2 text-sm text-slate-800 hover:border-[#377CF3]/40"
                >
                  {r.is_favorite ? (
                    <Star size={12} className="fill-amber-400 text-amber-400" aria-hidden />
                  ) : null}
                  <span className="min-w-0 truncate font-medium">{r.title}</span>
                  <span className="shrink-0 text-[10px] uppercase text-slate-400">
                    {categoryLabel(r.category)} · {kindLabel(r.kind)}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      ) : null}
    </div>
  );
}
