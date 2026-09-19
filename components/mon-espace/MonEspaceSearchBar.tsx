'use client';

import { Search } from 'lucide-react';

/** Zone de recherche — UI V1 (désactivée, logique à venir). */
export function MonEspaceSearchBar({ className }: { className?: string }) {
  return (
    <form
      role="search"
      className={className}
      onSubmit={(e) => e.preventDefault()}
      aria-label="Recherche Mon espace"
    >
      <label className="relative block">
        <span className="sr-only">Rechercher dans Mon espace</span>
        <Search
          size={18}
          strokeWidth={1.75}
          className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
          aria-hidden
        />
        <input
          type="search"
          name="q"
          placeholder="Rechercher une page, une note, une tâche…"
          disabled
          className="w-full rounded-xl border border-slate-200 bg-white py-3 pl-11 pr-4 text-sm text-slate-800 shadow-sm placeholder:text-slate-400 focus:border-[#377CF3] focus:outline-none focus:ring-1 focus:ring-[#377CF3] disabled:cursor-not-allowed disabled:opacity-90"
          title="La recherche sera disponible prochainement"
        />
      </label>
      <p className="mt-2 text-xs text-slate-400">
        La recherche arrivera dans une prochaine version.
      </p>
    </form>
  );
}
