import type { ReactNode } from 'react';
import { CountUp } from '@/components/motion/CountUp';
import { formatCountUpDisplay } from '@/lib/format-number-fr';
import { isStatCountUpValue, type StatCountUpValue } from '@/components/readability/stat-callout-types';

export type StatCalloutVariant = 'default' | 'inverse' | 'inline';

export type StatCalloutProps = {
  /** Texte brut (ex. « OPCO ») ou config `<CountUp>` pour les chiffres animés. */
  value: string | StatCountUpValue;
  label: string;
  detail?: ReactNode;
  freshnessLabel?: string;
  variant?: StatCalloutVariant;
  className?: string;
};

const variantStyles: Record<StatCalloutVariant, { shell: string; value: string; meta: string; label: string }> = {
  default: {
    shell:
      'rounded-2xl border border-slate-200/90 bg-white p-4 text-center shadow-sm ring-1 ring-slate-100 transition hover:border-[#377CF3]/25 hover:shadow-md',
    value: 'text-2xl font-bold text-[#377CF3] md:text-3xl tabular-nums',
    meta: 'mt-1 block text-[0.65rem] text-slate-400',
    label: 'mt-1 text-sm text-slate-600 md:text-base',
  },
  inverse: {
    shell: 'text-center',
    value: 'text-3xl font-bold tabular-nums text-white md:text-4xl',
    meta: 'mt-1 block text-xs text-blue-200/80',
    label: 'mt-1 text-base text-blue-200',
  },
  inline: {
    shell:
      'inline-flex min-w-0 flex-col rounded-xl border border-[#377CF3]/20 bg-[#F2F2F2] px-4 py-3 text-left shadow-[inset_3px_0_0_0_#377CF3]',
    value: 'text-xl font-bold text-[#377CF3] tabular-nums md:text-2xl',
    meta: 'mt-0.5 text-xs text-slate-400',
    label: 'mt-0.5 text-xs font-medium uppercase tracking-wide text-slate-600 md:text-sm',
  },
};

/**
 * Chiffre clé mis en valeur — texte uniquement (SEO + lecteurs d’écran).
 * Charte OFC (#377CF3).
 */
export function StatCallout({
  value,
  label,
  detail,
  freshnessLabel,
  variant = 'default',
  className = '',
}: StatCalloutProps) {
  const styles = variantStyles[variant];
  const displayValue = isStatCountUpValue(value)
    ? formatCountUpDisplay(value.to, value)
    : value;
  const ariaLabel = freshnessLabel
    ? `${displayValue} ${label}, ${freshnessLabel}`
    : `${displayValue} ${label}`;

  return (
    <figure
      role="group"
      aria-label={ariaLabel}
      className={`${styles.shell} ${className}`.trim()}
      data-stat-callout
    >
      <p className={styles.value}>
        {isStatCountUpValue(value) ? (
          <CountUp {...value} aria-label={displayValue} className="tabular-nums" />
        ) : (
          value
        )}
      </p>
      {freshnessLabel ? <p className={styles.meta}>{freshnessLabel}</p> : null}
      <figcaption className={styles.label}>{label}</figcaption>
      {detail ? <p className="mt-1.5 text-base leading-snug text-slate-600">{detail}</p> : null}
    </figure>
  );
}
