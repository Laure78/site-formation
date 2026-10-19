'use client';

import { useCallback, useEffect, useRef, useState, type ReactNode } from 'react';
import Script from 'next/script';
import { useCookieConsent } from '@/hooks/useCookieConsent';
import {
  ELFSIGHT_PLATFORM_SCRIPT_SRC,
  getElfsightGoogleReviewsAppClassName,
  isElfsightGoogleReviewsConfigured,
} from '@/lib/elfsight-google-reviews';

const WIDGET_MOUNT_TIMEOUT_MS = 12_000;

type ElfsightGoogleReviewsWidgetProps = {
  /** Carrousel (API Google) — sans consentement ou si Elfsight indisponible. */
  fallback: ReactNode;
};

function widgetHasContent(root: HTMLElement | null): boolean {
  if (!root) return false;
  return (
    root.querySelector('iframe, a[href*="google"], [class*="es-"]') !== null ||
    root.childElementCount > 0
  );
}

/**
 * Elfsight Google Reviews — script tiers après consentement cookies,
 * chargement à l’entrée viewport. Repli local si refus, absence de config ou échec.
 */
export function ElfsightGoogleReviewsWidget({ fallback }: ElfsightGoogleReviewsWidgetProps) {
  const consent = useCookieConsent();
  const configured = isElfsightGoogleReviewsConfigured();
  const appClassName = getElfsightGoogleReviewsAppClassName();
  const mountRef = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  const [widgetMounted, setWidgetMounted] = useState(false);
  const [loadFailed, setLoadFailed] = useState(false);

  const pendingElfsight =
    configured && consent === 'accepted' && inView && !loadFailed && !widgetMounted;

  const showFallback =
    !configured ||
    consent === 'refused' ||
    consent === null ||
    loadFailed ||
    (consent === 'accepted' && !inView);

  useEffect(() => {
    const node = mountRef.current;
    if (!node) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) setInView(true);
      },
      { rootMargin: '120px 0px', threshold: 0.05 },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  const checkMounted = useCallback(() => {
    if (widgetHasContent(mountRef.current)) setWidgetMounted(true);
  }, []);

  useEffect(() => {
    if (!pendingElfsight && !widgetMounted) return;
    const root = mountRef.current;
    if (!root) return;

    const mo = new MutationObserver(() => checkMounted());
    mo.observe(root, { childList: true, subtree: true });

    return () => mo.disconnect();
  }, [pendingElfsight, widgetMounted, checkMounted]);

  useEffect(() => {
    if (!pendingElfsight) return;

    const timeout = window.setTimeout(() => {
      checkMounted();
      if (!widgetHasContent(mountRef.current)) setLoadFailed(true);
    }, WIDGET_MOUNT_TIMEOUT_MS);

    return () => window.clearTimeout(timeout);
  }, [pendingElfsight, checkMounted]);

  return (
    <div className="avis-clients-elfsight-root">
      {pendingElfsight ? (
        <Script
          id="elfsight-platform-js"
          src={ELFSIGHT_PLATFORM_SCRIPT_SRC}
          strategy="lazyOnload"
          {...{ 'data-use-service-core': true }}
          onError={() => setLoadFailed(true)}
        />
      ) : null}

      {configured && consent === 'accepted' && !loadFailed ? (
        <div
          className={
            pendingElfsight
              ? 'relative flex min-h-[320px] items-center justify-center rounded-2xl border border-slate-200/80 bg-slate-50/50 md:min-h-[380px]'
              : undefined
          }
        >
          {pendingElfsight ? (
            <div className="h-8 w-8 animate-pulse rounded-full bg-slate-200" aria-hidden="true" />
          ) : null}
          <div
            ref={mountRef}
            className={`avis-clients-elfsight-mount w-full ${appClassName} ${pendingElfsight ? 'absolute inset-0 opacity-0' : ''}`}
            data-elfsight-app-lazy
            aria-busy={pendingElfsight}
            aria-live="polite"
          />
        </div>
      ) : (
        <div ref={mountRef} className="h-px w-full" aria-hidden="true" />
      )}

      {showFallback ? fallback : null}

      {loadFailed ? (
        <p className="mt-4 text-center text-sm text-slate-600" role="status">
          Le widget Elfsight n&apos;a pas pu se charger — avis affichés via Google. Renseignez
          l&apos;identifiant officiel dans{' '}
          <code className="rounded bg-slate-100 px-1.5 py-0.5 text-xs">
            NEXT_PUBLIC_ELFSIGHT_GOOGLE_REVIEWS_APP_ID
          </code>
          .
        </p>
      ) : null}
    </div>
  );
}
