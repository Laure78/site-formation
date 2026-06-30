'use client';

import { useEffect, useId, useRef, useState } from 'react';
import Link from 'next/link';
import { Loader2, Search } from 'lucide-react';
import type { SiteSearchKind, SiteSearchScope } from '@/lib/site-search-labels';
import { siteSearchKindLabel } from '@/lib/site-search-labels';

type SearchResult = {
  id: string;
  title: string;
  description: string;
  href: string;
  kind: SiteSearchKind;
};

type SiteSearchBarProps = {
  scope?: SiteSearchScope;
  placeholder?: string;
  className?: string;
};

export function SiteSearchBar({
  scope = 'ressources',
  placeholder = 'Rechercher un tuto, guide ou thème…',
  className = '',
}: SiteSearchBarProps) {
  const inputId = useId();
  const listId = `${inputId}-results`;
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const wrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const q = query.trim();
    if (q.length < 2) {
      setResults([]);
      setLoading(false);
      return;
    }

    const controller = new AbortController();
    const timer = window.setTimeout(async () => {
      setLoading(true);
      try {
        const params = new URLSearchParams({ q, scope, limit: '8' });
        const res = await fetch(`/api/search?${params}`, { signal: controller.signal });
        if (!res.ok) throw new Error('search failed');
        const data = (await res.json()) as { results: SearchResult[] };
        setResults(data.results);
        setOpen(true);
      } catch (err) {
        if ((err as Error).name !== 'AbortError') setResults([]);
      } finally {
        setLoading(false);
      }
    }, 220);

    return () => {
      controller.abort();
      window.clearTimeout(timer);
    };
  }, [query, scope]);

  useEffect(() => {
    const onPointerDown = (event: MouseEvent) => {
      if (!wrapRef.current?.contains(event.target as Node)) setOpen(false);
    };
    document.addEventListener('mousedown', onPointerDown);
    return () => document.removeEventListener('mousedown', onPointerDown);
  }, []);

  const showPanel = open && query.trim().length >= 2;

  return (
    <div ref={wrapRef} className={`relative ${className}`}>
      <div className="flex items-center gap-3 rounded-xl border border-slate-200 bg-white px-4 py-3 shadow-sm focus-within:border-[#377CF3] focus-within:ring-2 focus-within:ring-[#377CF3]/20">
        <Search className="h-5 w-5 shrink-0 text-[#377CF3]" aria-hidden />
        <label htmlFor={inputId} className="sr-only">
          Rechercher dans les ressources
        </label>
        <input
          id={inputId}
          type="search"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setOpen(true);
          }}
          onFocus={() => {
            if (query.trim().length >= 2) setOpen(true);
          }}
          placeholder={placeholder}
          autoComplete="off"
          role="combobox"
          aria-expanded={showPanel}
          aria-controls={showPanel ? listId : undefined}
          className="min-w-0 flex-1 bg-transparent text-base text-slate-900 outline-none placeholder:text-slate-400"
        />
        {loading ? <Loader2 className="h-4 w-4 shrink-0 animate-spin text-slate-400" aria-hidden /> : null}
      </div>

      {showPanel ? (
        <div
          id={listId}
          role="listbox"
          className="absolute left-0 right-0 top-[calc(100%+0.5rem)] z-30 overflow-hidden rounded-xl border border-slate-200 bg-white shadow-xl"
        >
          {results.length === 0 && !loading ? (
            <p className="px-4 py-5 text-center text-sm text-slate-500">
              Aucun résultat — essayez « DCE », « chantier », « MOE »…
            </p>
          ) : (
            <ul className="max-h-72 overflow-y-auto p-2">
              {results.map((item) => (
                <li key={item.id} role="option">
                  <Link
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className="block rounded-lg px-3 py-2.5 hover:bg-[#EFF6FF]"
                  >
                    <span className="block text-sm font-semibold text-slate-900">{item.title}</span>
                    <span className="mt-0.5 block text-xs text-slate-500 line-clamp-1">
                      {siteSearchKindLabel(item.kind)} · {item.description}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>
      ) : null}
    </div>
  );
}
