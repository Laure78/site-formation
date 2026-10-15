'use client';

import Link from 'next/link';
import { Check, Copy, X } from 'lucide-react';
import { useCallback, useEffect, useId, useRef, useState } from 'react';
import {
  PROMO_OFFRE_FORMATIONS_2027,
  promoDismissStorageKey,
  promoDisplayFields,
  resolvePromoBannerVisibility,
  resolvePromoCtaHref,
  type PromoOffreFormations2027Conditions,
} from '@/lib/promo-offre-formations-2027';

type CopyState = 'idle' | 'copied' | 'failed';

function readDismissed(offerId: string): boolean {
  try {
    return sessionStorage.getItem(promoDismissStorageKey(offerId)) === '1';
  } catch {
    return false;
  }
}

function writeDismissed(offerId: string): void {
  try {
    sessionStorage.setItem(promoDismissStorageKey(offerId), '1');
  } catch {
    /* mode privé */
  }
}

const CONDITION_ROWS: { key: keyof PromoOffreFormations2027Conditions; label: string }[] = [
  { key: 'reduction', label: 'Réduction' },
  { key: 'tarifBase', label: 'Base tarifaire' },
  { key: 'programmesFormats', label: 'Programmes et formats éligibles' },
  { key: 'datesReservation', label: 'Dates de réservation' },
  { key: 'datesFormation', label: 'Période des formations' },
  { key: 'modalitesCode', label: 'Utilisation du code' },
  { key: 'exclusions', label: 'Exclusions' },
  { key: 'cumul', label: 'Cumul' },
];

/**
 * Bandeau promotionnel formations 2027 — au-dessus de la navigation du header.
 * Invisible en production tant que l’offre n’est pas complète, activée et dans sa fenêtre.
 */
export function PromoOffreFormations2027Banner() {
  const config = PROMO_OFFRE_FORMATIONS_2027;
  const isDevelopment = process.env.NODE_ENV === 'development';
  const titleId = useId();
  const dialogTitleId = useId();
  const liveRegionId = useId();
  const codeRef = useRef<HTMLElement>(null);
  const conditionsCloseRef = useRef<HTMLButtonElement>(null);
  const conditionsOpenRef = useRef<HTMLButtonElement>(null);

  const [ready, setReady] = useState(false);
  const [dismissed, setDismissed] = useState(false);
  const [copyState, setCopyState] = useState<CopyState>('idle');
  const [conditionsOpen, setConditionsOpen] = useState(false);

  useEffect(() => {
    setDismissed(readDismissed(config.offerId));
    setReady(true);
  }, [config.offerId]);

  const visibility = resolvePromoBannerVisibility({
    config,
    isDevelopment,
    dismissed,
  });

  const dismiss = useCallback(() => {
    writeDismissed(config.offerId);
    setDismissed(true);
    setConditionsOpen(false);
  }, [config.offerId]);

  const copyCode = useCallback(async () => {
    const code = config.promoCode.trim();
    if (!code) {
      setCopyState('failed');
      codeRef.current?.focus();
      return;
    }
    try {
      await navigator.clipboard.writeText(code);
      setCopyState('copied');
      window.setTimeout(() => setCopyState('idle'), 2500);
    } catch {
      setCopyState('failed');
      const el = codeRef.current;
      if (el && typeof window.getSelection === 'function') {
        const range = document.createRange();
        range.selectNodeContents(el);
        const sel = window.getSelection();
        sel?.removeAllRanges();
        sel?.addRange(range);
      }
    }
  }, [config.promoCode]);

  useEffect(() => {
    if (!conditionsOpen) return;
    conditionsCloseRef.current?.focus();

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        setConditionsOpen(false);
        conditionsOpenRef.current?.focus();
      }
    };
    document.addEventListener('keydown', onKeyDown);
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKeyDown);
      document.body.style.overflow = prev;
    };
  }, [conditionsOpen]);

  /* Pas de rendu SSR / avant hydratation : évite placeholders et respecte la fermeture session. */
  if (!ready || visibility.mode === 'hidden') return null;

  const preview = visibility.mode === 'dev-preview';
  const display = promoDisplayFields(config, preview);
  const ctaHref = resolvePromoCtaHref(config);
  const hasRealCode = Boolean(config.promoCode.trim());

  return (
    <>
      <div
        className="promo-offre-2027 border-b border-white/15 bg-[#377CF3] text-white"
        data-promo-offer={config.offerId}
        data-promo-mode={visibility.mode}
        role="region"
        aria-labelledby={titleId}
      >
        <div className="mx-auto flex max-w-[80rem] flex-col gap-2 px-4 py-2.5 sm:px-6 lg:flex-row lg:items-center lg:gap-3 lg:px-8 lg:py-2">
          <div className="flex min-w-0 flex-1 flex-col gap-1.5 lg:flex-row lg:items-center lg:gap-3">
            <p
              id={titleId}
              className="shrink-0 text-xs font-bold uppercase tracking-[0.08em] text-white"
            >
              Préparez vos formations 2027
              {preview ? (
                <>
                  {' '}
                  <span className="rounded border border-amber-200/80 bg-amber-400/20 px-1.5 py-0.5 text-[0.65rem] font-semibold normal-case tracking-normal text-amber-50">
                    Prévisualisation
                  </span>
                </>
              ) : null}
            </p>

            <span className="hidden h-4 w-px shrink-0 bg-white/35 lg:block" aria-hidden />

            <p className="min-w-0 text-sm leading-snug text-white/95 lg:flex-1">{display.message}</p>
          </div>

          <div className="flex min-w-0 flex-wrap items-center gap-2 lg:shrink-0">
            <div className="flex min-w-0 items-center gap-1.5">
              <code
                ref={codeRef}
                tabIndex={hasRealCode || copyState === 'failed' ? 0 : -1}
                className="inline-flex max-w-full select-all items-center rounded border border-white/70 bg-white/10 px-2.5 py-1 font-mono text-xs font-semibold tracking-wide text-white sm:text-sm"
                aria-label={`Code promotionnel ${display.promoCode}`}
              >
                {display.promoCode}
              </code>
              <button
                type="button"
                onClick={copyCode}
                disabled={!hasRealCode}
                className="inline-flex min-h-9 min-w-9 items-center justify-center gap-1.5 rounded border border-white/70 px-2 text-xs font-semibold text-white transition-colors hover:bg-white/15 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white disabled:cursor-not-allowed disabled:opacity-50"
                aria-label={
                  copyState === 'copied' ? 'Code copié' : 'Copier le code promotionnel'
                }
              >
                {copyState === 'copied' ? (
                  <Check className="h-3.5 w-3.5" aria-hidden strokeWidth={2} />
                ) : (
                  <Copy className="h-3.5 w-3.5" aria-hidden strokeWidth={2} />
                )}
                <span className="hidden sm:inline">
                  {copyState === 'copied' ? 'Code copié' : 'Copier le code'}
                </span>
              </button>
            </div>

            <Link
              href={ctaHref}
              className="inline-flex min-h-9 items-center justify-center rounded border border-white bg-transparent px-3 text-sm font-semibold text-white transition-colors hover:bg-white hover:text-[#377CF3] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
            >
              Choisir ma formation
            </Link>

            <button
              ref={conditionsOpenRef}
              type="button"
              onClick={() => setConditionsOpen(true)}
              className="min-h-9 text-sm font-medium text-white underline underline-offset-2 transition-opacity hover:opacity-90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
            >
              Voir les conditions
            </button>

            <button
              type="button"
              onClick={dismiss}
              className="ml-auto inline-flex min-h-9 min-w-9 items-center justify-center rounded text-white/90 transition-colors hover:bg-white/15 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white lg:ml-0"
              aria-label="Fermer le bandeau promotionnel"
            >
              <X className="h-4 w-4" aria-hidden strokeWidth={2} />
            </button>
          </div>
        </div>

        <p id={liveRegionId} className="sr-only" aria-live="polite" aria-atomic="true">
          {copyState === 'copied'
            ? 'Code promotionnel copié dans le presse-papiers.'
            : copyState === 'failed'
              ? 'Impossible de copier automatiquement. Le code reste sélectionnable.'
              : ''}
        </p>
      </div>

      {conditionsOpen ? (
        <div
          className="fixed inset-0 z-[80] flex items-end justify-center bg-slate-900/50 p-4 sm:items-center"
          role="presentation"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) {
              setConditionsOpen(false);
              conditionsOpenRef.current?.focus();
            }
          }}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby={dialogTitleId}
            className="max-h-[min(85vh,36rem)] w-full max-w-lg overflow-y-auto rounded-2xl border border-slate-200 bg-white p-5 shadow-2xl sm:p-6"
          >
            <div className="flex items-start justify-between gap-3">
              <h2 id={dialogTitleId} className="font-display text-lg font-bold text-slate-900">
                Conditions de l’offre
              </h2>
              <button
                ref={conditionsCloseRef}
                type="button"
                onClick={() => {
                  setConditionsOpen(false);
                  conditionsOpenRef.current?.focus();
                }}
                className="inline-flex min-h-9 min-w-9 items-center justify-center rounded-lg text-slate-500 hover:bg-slate-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#377CF3]"
                aria-label="Fermer les conditions"
              >
                <X className="h-5 w-5" aria-hidden />
              </button>
            </div>

            {preview ? (
              <p className="mt-2 rounded-lg border border-amber-200 bg-amber-50 px-3 py-2 text-xs text-amber-900">
                Prévisualisation développement — les conditions commerciales ne sont pas encore
                renseignées. Aucune réduction n’est appliquée automatiquement.
              </p>
            ) : (
              <p className="mt-2 text-sm text-slate-600">
                Le code doit être communiqué lors de la réservation. Aucune réduction n’est
                appliquée automatiquement sur le site.
              </p>
            )}

            <dl className="mt-4 space-y-3">
              {CONDITION_ROWS.map(({ key, label }) => (
                <div key={key}>
                  <dt className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                    {label}
                  </dt>
                  <dd className="mt-0.5 text-sm leading-relaxed text-slate-800">
                    {display.conditions[key]}
                  </dd>
                </div>
              ))}
            </dl>

            {config.eligibleProgrammes.length > 0 ? (
              <div className="mt-5 border-t border-slate-100 pt-4">
                <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Programmes éligibles
                </p>
                <ul className="mt-2 space-y-1.5">
                  {config.eligibleProgrammes.map((programme) => (
                    <li key={programme.href}>
                      <Link
                        href={programme.href}
                        className="text-sm font-semibold text-[#377CF3] underline-offset-2 hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#377CF3]"
                        onClick={() => setConditionsOpen(false)}
                      >
                        {programme.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ) : preview ? (
              <p className="mt-4 text-sm text-slate-500">
                [À renseigner : programmes éligibles]
              </p>
            ) : null}
          </div>
        </div>
      ) : null}
    </>
  );
}
