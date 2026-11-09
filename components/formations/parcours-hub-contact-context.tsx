'use client';

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from 'react';
import { PARCOURS_CONTACT_SECTION_ID } from '@/lib/catalogue-2027/parcours-contact-copy';
import { scrollToAnchor } from '@/lib/catalogue-2027/scroll-to-anchor';
import type { ParcoursFormIntent } from '@/lib/catalogue-2027/parcours-form-intent';
import { PARCOURS_FORM_INTENT_OBJET } from '@/lib/catalogue-2027/parcours-form-intent';

type HubContactContextValue = {
  formIntent: ParcoursFormIntent;
  contactObjet: (typeof PARCOURS_FORM_INTENT_OBJET)[ParcoursFormIntent];
  openContactForm: (intent: ParcoursFormIntent) => void;
};

const HubContactContext = createContext<HubContactContextValue | null>(null);

export function ParcoursHubContactProvider({ children }: { children: ReactNode }) {
  const [formIntent, setFormIntent] = useState<ParcoursFormIntent>('devis');

  const openContactForm = useCallback((intent: ParcoursFormIntent) => {
    setFormIntent(intent);
    scrollToAnchor(PARCOURS_CONTACT_SECTION_ID);
  }, []);

  const value = useMemo(
    () => ({
      formIntent,
      contactObjet: PARCOURS_FORM_INTENT_OBJET[formIntent],
      openContactForm,
    }),
    [formIntent, openContactForm],
  );

  return <HubContactContext.Provider value={value}>{children}</HubContactContext.Provider>;
}

export function useParcoursHubContact(): HubContactContextValue {
  const ctx = useContext(HubContactContext);
  if (!ctx) {
    throw new Error('useParcoursHubContact requiert ParcoursHubContactProvider');
  }
  return ctx;
}
