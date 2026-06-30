'use client';

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react';
import { SiteSearchDialog } from '@/components/search/SiteSearchDialog';

type SiteSearchContextValue = {
  openSearch: () => void;
};

const SiteSearchContext = createContext<SiteSearchContextValue | null>(null);

export function useSiteSearch(): SiteSearchContextValue {
  const ctx = useContext(SiteSearchContext);
  if (!ctx) {
    return { openSearch: () => {} };
  }
  return ctx;
}

export function SiteSearchProvider({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);

  const openSearch = useCallback(() => setOpen(true), []);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k') {
        event.preventDefault();
        setOpen(true);
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, []);

  const value = useMemo(() => ({ openSearch }), [openSearch]);

  return (
    <SiteSearchContext.Provider value={value}>
      {children}
      <SiteSearchDialog open={open} onOpenChange={setOpen} scope="all" />
    </SiteSearchContext.Provider>
  );
}
