'use client';

import { useRouter } from 'next/navigation';
import { useTransition } from 'react';
import { Search } from 'lucide-react';

/**
 * Recherche dans Ressources (paramètre `q`).
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
        placeholder="Rechercher dans les ressources…"
        disabled={pending}
        className="w-full rounded-full border-0 bg-white py-2.5 pl-10 pr-4 text-sm text-slate-900 shadow-[0_1px_2px_rgba(15,23,42,0.04)] ring-1 ring-slate-200/80 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#377CF3]/30"
      />
    </form>
  );
}
