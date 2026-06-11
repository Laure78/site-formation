import type { ReactNode } from 'react';

export type KeyPointVariant = 'default' | 'inverse';

export type KeyPointProps = {
  /** Texte libre (phrase déjà présente sur la page). */
  children?: ReactNode;
  /** Variante structurée : « {subject} en {after} au lieu de {before} ». */
  subject?: string;
  after?: string;
  before?: string;
  label?: string;
  variant?: KeyPointVariant;
  className?: string;
};

/**
 * Point fort / gain terrain — extrait visuellement une comparaison chiffrée
 * sans ajouter de contenu (texte uniquement).
 */
const shellStyles: Record<KeyPointVariant, string> = {
  default:
    'rounded-xl border border-[#377CF3]/20 bg-[#F2F2F2]/80 px-4 py-3 shadow-[inset_3px_0_0_0_#377CF3]',
  inverse:
    'rounded-xl border border-white/15 bg-white/[0.08] px-4 py-3 shadow-[inset_3px_0_0_0_rgba(255,255,255,0.45)]',
};

export function KeyPoint({
  children,
  subject,
  after,
  before,
  label,
  variant = 'default',
  className = '',
}: KeyPointProps) {
  const highlightClass =
    variant === 'inverse' ? 'font-semibold text-white' : 'font-semibold text-[#377CF3]';
  const mutedClass = variant === 'inverse' ? 'text-blue-200/80' : 'text-slate-500';
  const labelClass =
    variant === 'inverse'
      ? 'text-[0.65rem] font-semibold uppercase tracking-[0.14em] text-blue-200/90'
      : 'text-[0.65rem] font-semibold uppercase tracking-[0.14em] text-[#377CF3]';
  const bodyClass =
    variant === 'inverse'
      ? 'text-base leading-relaxed text-blue-100/95 md:text-lg'
      : 'text-base leading-relaxed text-slate-700 md:text-lg';

  const body =
    children ??
    (subject && after && before ? (
      <>
        {subject} en <strong className={highlightClass}>{after}</strong> au lieu de{' '}
        <span className={mutedClass}>{before}</span>
      </>
    ) : null);

  if (!body) return null;

  return (
    <aside
      className={`${shellStyles[variant]} ${className}`.trim()}
      data-key-point
    >
      {label ? <p className={labelClass}>{label}</p> : null}
      <p className={`${bodyClass} ${label ? 'mt-1.5' : ''}`}>{body}</p>
    </aside>
  );
}
