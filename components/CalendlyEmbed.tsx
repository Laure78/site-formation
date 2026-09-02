'use client';

import type { ReactNode } from 'react';
import { usePathname } from 'next/navigation';
import { CtaRdv } from '@/components/CtaRdv';
import {
  CALENDLY_INLINE_DEFAULT_HEIGHT_PX,
  CALENDLY_BUTTON_VARIANT_CLASS,
  type CalendlyEmbedVariant,
} from '@/lib/calendly-embed-config';
import {
  buildCalendlyInlineIframeUrl,
  buildCalendlyUrlWithUtm,
  deriveCalendlyCampaign,
  CALENDLY_EMBED_URL,
} from '@/lib/calendly';

/** `popup` conservé pour compatibilité — redirige vers `/prendre-rendez-vous`. */
export type CalendlyEmbedType = 'popup' | 'inline' | 'link';

type CtaPosition = 'hero' | 'middle' | 'footer' | 'inline' | 'floating' | 'unknown';

export type CalendlyEmbedProps = {
  /** @deprecated Ignoré hors mode `inline` — Calendly réservé à `/prendre-rendez-vous`. */
  url?: string;
  type?: CalendlyEmbedType;
  buttonText?: string;
  campaign?: string;
  ctaPosition?: CtaPosition;
  ctaId?: string;
  utmSource?: string;
  utmMedium?: string;
  className?: string;
  variant?: CalendlyEmbedVariant;
  heightPx?: number;
  sectionTitle?: string;
  sectionSubtitle?: string;
  children?: ReactNode;
  onClick?: React.MouseEventHandler<HTMLAnchorElement>;
  'data-calendly-tracked'?: string;
  id?: string;
  title?: string;
  disabled?: boolean;
  'aria-label'?: string;
};

function CalendlyInlineBody({
  url,
  heightPx = CALENDLY_INLINE_DEFAULT_HEIGHT_PX,
  className = '',
}: {
  url: string;
  heightPx?: number;
  className?: string;
}) {
  const iframeSrc = buildCalendlyInlineIframeUrl(url);

  return (
    <div
      data-calendly
      data-cta-position="inline"
      className={`w-full max-w-full ${className}`}
      style={{ minWidth: 320, width: '100%', maxWidth: '100%', margin: '0 auto' }}
    >
      <div
        className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm"
        style={{ height: heightPx }}
      >
        <iframe
          src={iframeSrc}
          title="Réserver un créneau Calendly — formation IA BTP"
          className="h-full w-full border-0"
        />
      </div>
      <p className="mt-3 text-center text-sm text-slate-600">
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="ofc-link font-semibold"
        >
          Ouvrir l&apos;agenda dans un nouvel onglet
        </a>
      </p>
    </div>
  );
}

/**
 * Widget Calendly — mode `inline` uniquement (réservé à `/prendre-rendez-vous`).
 * Les autres types délèguent à {@link CtaButton} vers `/prendre-rendez-vous`.
 */
export function CalendlyEmbed({
  url,
  type = 'link',
  buttonText,
  campaign,
  ctaPosition = 'unknown',
  ctaId,
  utmSource = 'site',
  utmMedium = 'cta',
  className = '',
  heightPx = CALENDLY_INLINE_DEFAULT_HEIGHT_PX,
  sectionTitle,
  sectionSubtitle,
  children,
  onClick,
  id,
  title,
  disabled,
  'aria-label': ariaLabel,
  variant = 'primary',
}: CalendlyEmbedProps) {
  const pathname = usePathname();
  const resolvedCtaId = ctaId ?? `calendly-${ctaPosition}`;
  const resolvedCampaign = deriveCalendlyCampaign(pathname, {
    campaign,
    ctaPosition,
    ctaId: campaign ? undefined : resolvedCtaId,
  });
  const resolvedUrl = buildCalendlyUrlWithUtm({
    baseUrl: url ?? CALENDLY_EMBED_URL,
    utmSource,
    utmMedium,
    utmCampaign: resolvedCampaign,
  });
  const origin = ctaId ?? campaign ?? ctaPosition ?? resolvedCtaId;
  const ctaVariant =
    variant === 'secondary' || variant === 'on-accent' || variant === 'slate'
      ? 'secondary'
      : variant === 'unstyled' || variant === 'nav'
        ? 'inline'
        : 'primary';
  const extraClass = CALENDLY_BUTTON_VARIANT_CLASS[variant as CalendlyEmbedVariant] ?? '';

  if (type === 'inline') {
    return (
      <div className={className}>
        {sectionTitle ? (
          <h2 className="font-display text-center text-2xl font-bold tracking-tight text-slate-900 md:text-3xl">
            {sectionTitle}
          </h2>
        ) : null}
        {sectionSubtitle ? (
          <p className="mx-auto mt-3 max-w-2xl text-center text-slate-600 md:text-lg">
            {sectionSubtitle}
          </p>
        ) : null}
        <div className={sectionTitle || sectionSubtitle ? 'mt-8' : undefined}>
          <CalendlyInlineBody url={resolvedUrl} heightPx={heightPx} />
        </div>
      </div>
    );
  }

  void children;
  void buttonText;

  return (
    <CtaRdv
      id={id}
      origin={origin}
      variant={ctaVariant}
      className={[extraClass, className].filter(Boolean).join(' ')}
      title={title}
      aria-label={ariaLabel}
      onClick={onClick}
      aria-disabled={disabled || undefined}
    />
  );
}
