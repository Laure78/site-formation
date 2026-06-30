'use client';

import Link from 'next/link';
import { useCallback, useEffect, useId, useRef, useState } from 'react';
import { FileText, GraduationCap, Loader2, Newspaper, Search, X } from 'lucide-react';
import type { SiteSearchKind, SiteSearchScope } from '@/lib/site-search-labels';
import { siteSearchKindLabel } from '@/lib/site-search-labels';

type SearchResult = {
  id: string;
  title: string;
  description: string;
  href: string;
  kind: SiteSearchKind;
};

const KIND_ICON: Record<SiteSearchKind, typeof Search> = {
  tuto: FileText,
  guide: FileText,
  formation: GraduationCap,
  article: Newspaper,
  page: Search,
};

type SiteSearchDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  scope?: SiteSearchScope;
  initialQuery?: string;
};

export function SiteSearchDialog({
  open,
  onOpenChange,
  scope = 'all',
  initialQuery = '',
}: SiteSearchDialogProps) {
  const titleId = useId();
  const inputRef = useRef<HTMLInputElement>(null);
  const [query, setQuery] = useState(initialQuery);
  const [results, setResults] = useState<SearchResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);

  const close = useCallback(() => onOpenChange(false), [onOpenChange]);

  useEffect(() => {
    if (!open) return;
    setQuery(initialQuery);
    setResults([]);
    setActiveIndex(-1);
    const t = window.setTimeout(() => inputRef.current?.focus(), 50);
    return () => window.clearTimeout(t);
  }, [open, initialQuery]);

  useEffect(() => {
    if (!open) return;
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
        const params = new URLSearchParams({ q, scope, limit: '12' });
        const res = await fetch(`/api/search?${params}`, { signal: controller.signal });
        if (!res.ok) throw new Error('search failed');
        const data = (await res.json()) as { results: SearchResult[] };
        setResults(data.results);
        setActiveIndex(data.results.length > 0 ? 0 : -1);
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
  }, [open, query, scope]);

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        close();
        return;
      }
      if (results.length === 0) return;
      if (event.key === 'ArrowDown') {
        event.preventDefault();
        setActiveIndex((i) => (i + 1) % results.length);
      }
      if (event.key === 'ArrowUp') {
        event.preventDefault();
        setActiveIndex((i) => (i <= 0 ? results.length - 1 : i - 1));
      }
      if (event.key === 'Enter' && activeIndex >= 0) {
        const target = results[activeIndex];
        if (target) {
          window.location.href = target.href;
        }
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [open, results, activeIndex, close]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[200] flex items-start justify-center bg-slate-900/50 p-4 pt-[12vh] backdrop-blur-[2px]"
      role="presentation"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) close();
      }}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        className="w-full max-w-xl overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-2xl"
      >
        <div className="flex items-center gap-3 border-b border-slate-100 px-4 py-3">
          <Search className="h-5 w-5 shrink-0 text-[#377CF3]" aria-hidden />
          <label htmlFor={`${titleId}-input`} className="sr-only">
            Rechercher sur laureolivie.fr
          </label>
          <input
            ref={inputRef}
            id={`${titleId}-input`}
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={
              scope === 'ressources'
                ? 'Tuto, guide, thème…'
                : 'Formation, tuto, article, guide…'
            }
            autoComplete="off"
            className="min-w-0 flex-1 bg-transparent text-base text-slate-900 outline-none placeholder:text-slate-400"
          />
          {loading ? (
            <Loader2 className="h-4 w-4 shrink-0 animate-spin text-slate-400" aria-hidden />
          ) : null}
          <button
            type="button"
            onClick={close}
            className="rounded-lg p-1.5 text-slate-500 hover:bg-slate-100"
            aria-label="Fermer la recherche"
          >
            <X className="h-5 w-5" aria-hidden />
          </button>
        </div>

        <div className="max-h-[min(50vh,24rem)] overflow-y-auto p-2">
          {query.trim().length < 2 ? (
            <p className="px-3 py-6 text-center text-sm text-slate-500">
              Saisissez au moins 2 caractères — tutos PDF, formations, articles blog, guides MOE…
            </p>
          ) : results.length === 0 && !loading ? (
            <p className="px-3 py-6 text-center text-sm text-slate-500">
              Aucun résultat pour « {query.trim()} ».
            </p>
          ) : (
            <ul className="space-y-1">
              {results.map((item, index) => {
                const Icon = KIND_ICON[item.kind];
                const active = index === activeIndex;
                return (
                  <li key={item.id}>
                    <Link
                      href={item.href}
                      onClick={close}
                      className={`flex gap-3 rounded-xl px-3 py-2.5 transition-colors ${
                        active ? 'bg-[#EFF6FF] text-[#377CF3]' : 'text-slate-800 hover:bg-slate-50'
                      }`}
                    >
                      <Icon
                        className={`mt-0.5 h-4 w-4 shrink-0 ${active ? 'text-[#377CF3]' : 'text-slate-400'}`}
                        aria-hidden
                      />
                      <span className="min-w-0">
                        <span className="block text-sm font-semibold leading-snug">{item.title}</span>
                        <span className="mt-0.5 block text-xs text-slate-500 line-clamp-2">
                          {siteSearchKindLabel(item.kind)} · {item.description}
                        </span>
                      </span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          )}
        </div>

        <p className="border-t border-slate-100 px-4 py-2 text-center text-[0.65rem] text-slate-400">
          <kbd className="rounded border border-slate-200 bg-slate-50 px-1">↑↓</kbd> naviguer ·{' '}
          <kbd className="rounded border border-slate-200 bg-slate-50 px-1">Entrée</kbd> ouvrir ·{' '}
          <kbd className="rounded border border-slate-200 bg-slate-50 px-1">Échap</kbd> fermer
        </p>
      </div>
    </div>
  );
}
