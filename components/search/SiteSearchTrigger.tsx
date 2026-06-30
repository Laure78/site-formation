'use client';

import { Search } from 'lucide-react';
import { useSiteSearch } from '@/components/search/SiteSearchProvider';

type SiteSearchTriggerProps = {
  className?: string;
  showLabel?: boolean;
};

export function SiteSearchTrigger({ className = '', showLabel = false }: SiteSearchTriggerProps) {
  const { openSearch } = useSiteSearch();

  return (
    <button
      type="button"
      onClick={openSearch}
      className={`inline-flex items-center gap-2 rounded-full text-sm font-medium text-slate-700 transition-colors hover:bg-white hover:text-slate-900 hover:shadow-sm ${className}`}
      aria-label="Rechercher sur le site"
    >
      <Search size={18} strokeWidth={1.75} className="shrink-0 text-slate-500" aria-hidden />
      {showLabel ? <span>Rechercher</span> : null}
    </button>
  );
}
