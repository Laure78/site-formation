'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import type { ComponentPropsWithoutRef, ReactNode } from 'react';
import { SITE } from '@/lib/site';
import { trackCtaRdvClick } from '@/lib/cta-analytics';

export const CTA_BUTTON_BASE_CLASS =
  'inline-flex max-w-full min-w-0 items-center justify-center gap-2 rounded-lg bg-[#377CF3] px-6 py-3 text-base font-semibold text-white transition-colors hover:bg-[#2a63d4] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#377CF3]';

export type CtaButtonProps = Omit<ComponentPropsWithoutRef<'a'>, 'href' | 'children'> & {
  /** Identifiant d’emplacement pour GA4 (`cta_rdv_click`). */
  origin?: string;
  /** Surcharge href — défaut : `SITE.cta.href` (`/prendre-rendez-vous`). */
  href?: string;
  /** Surcharge libellé — défaut : `SITE.cta.label`. */
  label?: string;
  /** Libellé court (narrow). Défaut : `SITE.cta.labelCompact`. */
  compactLabel?: string;
  /**
   * `body` : libellé long dès `sm`.
   * `nav` : toujours le libellé compact (header mobile).
   */
  layout?: 'body' | 'nav';
  children?: ReactNode;
  /** Styles charte par défaut ; `unstyled` n’ajoute que le tracking. */
  variant?: 'primary' | 'unstyled';
};

/**
 * CTA unique prise de RDV — redirige vers `/prendre-rendez-vous` (Calendly réservé à cette page).
 */
export function CtaButton({
  origin = 'unspecified',
  href = SITE.cta.href,
  label,
  compactLabel,
  layout = 'body',
  children,
  className = '',
  variant = 'primary',
  onClick,
  ...rest
}: CtaButtonProps) {
  const pathname = usePathname();
  const fullLabel = label ?? SITE.cta.label;
  const shortLabel = compactLabel ?? SITE.cta.labelCompact;
  const content =
    children ??
    (layout === 'nav' ? (
      shortLabel
    ) : (
      <>
        <span className="sm:hidden">{shortLabel}</span>
        <span className="hidden sm:inline">{fullLabel}</span>
      </>
    ));
  const styleClass = variant === 'primary' ? CTA_BUTTON_BASE_CLASS : '';
  const mergedClassName = [styleClass, className].filter(Boolean).join(' ');
  const a11yLabel = children ? undefined : fullLabel;

  const handleClick: ComponentPropsWithoutRef<'a'>['onClick'] = (event) => {
    const pagePath =
      typeof window !== 'undefined' ? window.location.pathname : pathname || 'unknown';
    trackCtaRdvClick(origin, pagePath);
    onClick?.(event);
  };

  if (href.startsWith('http://') || href.startsWith('https://')) {
    return (
      <a
        href={href}
        className={mergedClassName || undefined}
        onClick={handleClick}
        {...rest}
        aria-label={rest['aria-label'] ?? a11yLabel}
      >
        {content}
      </a>
    );
  }

  return (
    <Link
      href={href}
      className={mergedClassName || undefined}
      onClick={handleClick}
      {...rest}
      aria-label={rest['aria-label'] ?? a11yLabel}
    >
      {content}
    </Link>
  );
}
