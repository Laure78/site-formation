'use client';

import { useSyncExternalStore } from 'react';
import {
  COOKIE_CONSENT_CHANGED_EVENT,
  readCookieConsent,
  type CookieConsentValue,
} from '@/lib/cookie-consent';

function subscribe(onStoreChange: () => void) {
  window.addEventListener(COOKIE_CONSENT_CHANGED_EVENT, onStoreChange);
  return () => window.removeEventListener(COOKIE_CONSENT_CHANGED_EVENT, onStoreChange);
}

/**
 * Consentement cookies marketing / tiers — lecture synchrone côté client.
 * `null` = pas encore de choix (ou SSR).
 */
export function useCookieConsent(): CookieConsentValue | null {
  return useSyncExternalStore(subscribe, readCookieConsent, () => null);
}
