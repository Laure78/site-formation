'use client';

import dynamic from 'next/dynamic';
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from 'react';

const SiteSearchDialog = dynamic(
  () =>
    import('@/components/search/SiteSearchDialog').then((mod) => ({
      default: mod.SiteSearchDialog,
    })),
  { ssr: false },
);

type SiteSearchContextValue = {
  openSearch: (trigger?: HTMLElement | null) => void;
  closeSearch: () => void;
  isSearchOpen: boolean;
};

const SiteSearchContext = createContext<SiteSearchContextValue | null>(null);

export function useSiteSearch(): SiteSearchContextValue {
  const ctx = useContext(SiteSearchContext);
  if (!ctx) {
    return { openSearch: () => {}, closeSearch: () => {}, isSearchOpen: false };
  }
  return ctx;
}

export function SiteSearchProvider({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  const triggerRef = useRef<HTMLElement | null>(null);

  const openSearch = useCallback((trigger?: HTMLElement | null) => {
    triggerRef.current = trigger ?? null;
    setOpen(true);
  }, []);

  const handleOpenChange = useCallback((next: boolean) => {
    setOpen(next);
    if (!next) {
      window.setTimeout(() => {
        triggerRef.current?.focus();
        triggerRef.current = null;
      }, 0);
    }
  }, []);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k') {
        event.preventDefault();
        openSearch(null);
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [openSearch]);

  const closeSearch = useCallback(() => handleOpenChange(false), [handleOpenChange]);

  const value = useMemo(
    () => ({ openSearch, closeSearch, isSearchOpen: open }),
    [openSearch, closeSearch, open],
  );

  return (
    <SiteSearchContext.Provider value={value}>
      {children}
      {open ? (
        <SiteSearchDialog open={open} onOpenChange={handleOpenChange} scope="all" />
      ) : null}
    </SiteSearchContext.Provider>
  );
}
