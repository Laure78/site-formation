'use client';

import Link from 'next/link';
import { useCallback, useEffect, useId, useRef, useState } from 'react';
import {
  CalendarDays,
  FileText,
  GraduationCap,
  Loader2,
  Newspaper,
  Route,
  Search,
  UserRound,
  X,
} from 'lucide-react';
import type { SiteSearchKind, SiteSearchScope } from '@/lib/site-search-labels';
import { siteSearchKindLabel } from '@/lib/site-search-labels';
import { LINKS } from '@/lib/internal-links';

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
  parcours: Route,
  evenement: CalendarDays,
  formateur: UserRound,
};

const SEARCH_PLACEHOLDER = 'Formation, parcours métier, ressource, événement…';
const SEARCH_LIMIT = 6;

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
  const dialogRef = useRef<HTMLDivElement>(null);
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
        const params = new URLSearchParams({ q, scope, limit: String(SEARCH_LIMIT) });
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

  useEffect(() => {
    if (!open || !dialogRef.current) return;
    const node = dialogRef.current;
    const focusableSelector =
      'a[href], button:not([disabled]), input:not([disabled]), [tabindex]:not([tabindex="-1"])';

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key !== 'Tab') return;
      const focusable = Array.from(node.querySelectorAll<HTMLElement>(focusableSelector)).filter(
        (el) => !el.hasAttribute('disabled') && el.offsetParent !== null,
      );
      if (focusable.length === 0) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };
    node.addEventListener('keydown', onKeyDown);
    return () => node.removeEventListener('keydown', onKeyDown);
  }, [open]);

  if (!open) return null;

  const trimmed = query.trim();

  return (
    <div
      className="fixed inset-0 z-[200] flex items-start justify-center bg-slate-900/50 p-4 pt-[10vh] backdrop-blur-[2px] lg:pt-[12vh]"
      role="presentation"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) close();
      }}
    >
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        className="w-full max-w-xl overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-2xl"
      >
        <div className="border-b border-slate-100 px-4 pt-4 pb-2">
          <div className="flex items-start justify-between gap-2">
            <h2 id={titleId} className="font-display text-base font-bold text-slate-900">
              Rechercher sur le site
            </h2>
            <button
              type="button"
              onClick={close}
              className="rounded-lg p-1.5 text-slate-500 hover:bg-slate-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#377CF3]"
              aria-label="Fermer la recherche"
            >
              <X className="h-5 w-5" aria-hidden />
            </button>
          </div>
        </div>

        <div className="flex items-center gap-3 border-b border-slate-100 px-4 py-3">
          <Search className="h-5 w-5 shrink-0 text-[#377CF3]" aria-hidden />
          <label htmlFor={`${titleId}-input`} className="sr-only">
            Rechercher sur le site
          </label>
          <input
            ref={inputRef}
            id={`${titleId}-input`}
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={SEARCH_PLACEHOLDER}
            autoComplete="off"
            className="min-w-0 flex-1 bg-transparent text-base text-slate-900 outline-none placeholder:text-slate-400"
          />
          {loading ? (
            <Loader2 className="h-4 w-4 shrink-0 animate-spin text-slate-400" aria-hidden />
          ) : null}
        </div>

        <div className="max-h-[min(50vh,24rem)] overflow-y-auto p-2">
          {trimmed.length < 2 ? (
            <p className="px-3 py-6 text-center text-sm leading-relaxed text-slate-500">
              Formations Qualiopi, parcours métiers, ressources PDF et événements en ligne — saisissez
              au moins 2 caractères.
            </p>
          ) : results.length === 0 && !loading ? (
            <div className="px-3 py-6 text-center">
              <p className="text-sm text-slate-600">
                Aucun résultat. Essayez un autre mot-clé ou{' '}
                <Link
                  href={LINKS.contact}
                  onClick={close}
                  className="font-semibold text-[#377CF3] hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#377CF3]"
                >
                  contactez-nous
                </Link>
                .
              </p>
            </div>
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
