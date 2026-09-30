'use client';

import {
  createContext,
  useCallback,
  useContext,
  useState,
  useTransition,
  type ReactNode,
} from 'react';
import type { CatalogueBesoinOption } from '@/lib/formations-catalogue-page-config';

type BesoinContextValue = {
  activeBesoinId: CatalogueBesoinOption['id'] | null;
  highlightedRefs: readonly string[];
  onSelectBesoin: (id: CatalogueBesoinOption['id'] | null, targetRefs: readonly string[]) => void;
};

const FormationsCatalogueBesoinContext = createContext<BesoinContextValue | null>(null);

export function FormationsCatalogueBesoinProvider({ children }: { children: ReactNode }) {
  const [, startTransition] = useTransition();
  const [activeBesoinId, setActiveBesoinId] = useState<CatalogueBesoinOption['id'] | null>(null);
  const [highlightedRefs, setHighlightedRefs] = useState<readonly string[]>([]);

  const onSelectBesoin = useCallback(
    (id: CatalogueBesoinOption['id'] | null, targetRefs: readonly string[]) => {
      startTransition(() => {
        setActiveBesoinId(id);
        setHighlightedRefs(targetRefs);
      });
    },
    [],
  );

  return (
    <FormationsCatalogueBesoinContext.Provider
      value={{ activeBesoinId, highlightedRefs, onSelectBesoin }}
    >
      {children}
    </FormationsCatalogueBesoinContext.Provider>
  );
}

export function useFormationsCatalogueBesoin(): BesoinContextValue {
  const ctx = useContext(FormationsCatalogueBesoinContext);
  if (!ctx) {
    throw new Error('useFormationsCatalogueBesoin doit être utilisé dans FormationsCatalogueBesoinProvider');
  }
  return ctx;
}
