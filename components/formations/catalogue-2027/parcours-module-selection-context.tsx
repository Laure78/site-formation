'use client';

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from 'react';
import { getModuleByCode, type ParcoursComputed } from '@/data/catalogue-2027';
import {
  buildParcoursDevisMessage,
  type ParcoursDemandeType,
} from '@/lib/catalogue-2027/parcours-module-selection-message';
import { PARCOURS_CONTACT_COPY } from '@/lib/catalogue-2027/parcours-contact-copy';
import { METIERS_CATALOGUE_2027 } from '@/data/catalogue-2027/metiers';
import { libellePrixModuleInter } from '@/lib/catalogue-2027/parcours-affichage';

type ParcoursModuleSelectionContextValue = {
  parcours: ParcoursComputed;
  demandeType: ParcoursDemandeType;
  setDemandeType: (type: ParcoursDemandeType) => void;
  selectedCodes: ReadonlySet<string>;
  isSelected: (code: string) => boolean;
  toggleModule: (code: string) => void;
  selectComplet: () => void;
  clearModules: () => void;
  selectedModules: ReturnType<typeof getModuleByCode>[];
  formationTheme: string;
  formationHint: string;
  devisMessage: string;
  contactCopy: (typeof PARCOURS_CONTACT_COPY)[keyof typeof PARCOURS_CONTACT_COPY];
  participantRoleDefault: string;
};

const ParcoursModuleSelectionContext = createContext<ParcoursModuleSelectionContextValue | null>(
  null,
);

export function ParcoursModuleSelectionProvider({
  parcours,
  children,
}: {
  parcours: ParcoursComputed;
  children: ReactNode;
}) {
  const [demandeType, setDemandeType] = useState<ParcoursDemandeType>('modules');
  const [selectedCodes, setSelectedCodes] = useState<ReadonlySet<string>>(() => new Set());

  const toggleModule = useCallback((code: string) => {
    setDemandeType('modules');
    setSelectedCodes((prev) => {
      const next = new Set(prev);
      if (next.has(code)) next.delete(code);
      else next.add(code);
      return next;
    });
  }, []);

  const selectComplet = useCallback(() => {
    setDemandeType('complet');
    const all = new Set(parcours.etapes.map((e) => e.moduleCode));
    setSelectedCodes(all);
  }, [parcours.etapes]);

  const clearModules = useCallback(() => {
    setDemandeType('modules');
    setSelectedCodes(new Set());
  }, []);

  const isSelected = useCallback(
    (code: string) => demandeType === 'complet' || selectedCodes.has(code),
    [demandeType, selectedCodes],
  );

  const selectedModules = useMemo(() => {
    const codes =
      demandeType === 'complet'
        ? parcours.etapes.map((e) => e.moduleCode)
        : [...selectedCodes];
    return codes
      .map((c) => getModuleByCode(c))
      .filter((m): m is NonNullable<typeof m> => m != null);
  }, [demandeType, parcours.etapes, selectedCodes]);

  const contactCopy = PARCOURS_CONTACT_COPY[parcours.id];
  const metierLabel =
    METIERS_CATALOGUE_2027.find((m) => m.id === parcours.metierId)?.label ??
    contactCopy.participantRoleDefault;

  const formationTheme = `Parcours ${parcours.titre}`.slice(0, 200);
  const formationHint = formationTheme;

  const devisMessage = useMemo(
    () =>
      buildParcoursDevisMessage({
        parcoursTitre: parcours.titre,
        demandeType,
        modules: selectedModules,
      }),
    [parcours.titre, demandeType, selectedModules],
  );

  const value: ParcoursModuleSelectionContextValue = {
    parcours,
    demandeType,
    setDemandeType,
    selectedCodes,
    isSelected,
    toggleModule,
    selectComplet,
    clearModules,
    selectedModules,
    formationTheme,
    formationHint,
    devisMessage,
    contactCopy,
    participantRoleDefault: metierLabel,
  };

  return (
    <ParcoursModuleSelectionContext.Provider value={value}>{children}</ParcoursModuleSelectionContext.Provider>
  );
}

export function useParcoursModuleSelection(): ParcoursModuleSelectionContextValue {
  const ctx = useContext(ParcoursModuleSelectionContext);
  if (!ctx) {
    throw new Error('useParcoursModuleSelection doit être utilisé dans ParcoursModuleSelectionProvider');
  }
  return ctx;
}

/** Liste affichage prix unitaires — jamais de total. */
export function useSelectedModulePriceLines(): { code: string; titre: string; prix: string }[] {
  const { selectedModules } = useParcoursModuleSelection();
  return selectedModules.map((m) => ({
    code: m.code,
    titre: m.titre,
    prix: libellePrixModuleInter(m),
  }));
}
