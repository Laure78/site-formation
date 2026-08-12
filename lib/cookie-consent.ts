/**
 * Consentement cookies marketing / tiers (Calendly, analytics).
 * Stockage local — clé stable pour le bandeau RGPD.
 */

export const COOKIE_CONSENT_STORAGE_KEY = 'ofc_cookie_consent' as const;

export type CookieConsentValue = 'accepted' | 'refused';

export const COOKIE_CONSENT_CHANGED_EVENT = 'ofc:cookie-consent-changed';

export function readCookieConsent(): CookieConsentValue | null {
  if (typeof window === 'undefined') return null;
  try {
    const v = window.localStorage.getItem(COOKIE_CONSENT_STORAGE_KEY);
    if (v === 'accepted' || v === 'refused') return v;
  } catch {
    /* private mode */
  }
  return null;
}

export function writeCookieConsent(value: CookieConsentValue): void {
  if (typeof window === 'undefined') return;
  try {
    window.localStorage.setItem(COOKIE_CONSENT_STORAGE_KEY, value);
  } catch {
    /* ignore */
  }
  window.dispatchEvent(
    new CustomEvent(COOKIE_CONSENT_CHANGED_EVENT, { detail: { value } }),
  );
}
