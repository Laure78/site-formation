import type { ReactNode } from 'react';

type EnBrefProps = {
  /** Contenu factuel (2–3 phrases). */
  children: ReactNode;
  className?: string;
  id?: string;
};

/**
 * Encadré « En bref » — résumé factuel sous le H1 (ressources / tutos).
 * Fond charte `#F2F2F2`, coins 8px.
 */
export function EnBref({ children, className = '', id = 'en-bref' }: EnBrefProps) {
  return (
    <aside
      id={id}
      className={`mt-5 rounded-[8px] border border-slate-200/90 bg-[#F2F2F2] px-4 py-3.5 md:px-5 md:py-4 ${className}`}
      aria-labelledby={`${id}-title`}
    >
      <p
        id={`${id}-title`}
        className="text-xs font-semibold uppercase tracking-[0.14em] text-[#377CF3]"
      >
        En bref
      </p>
      <div className="mt-2 space-y-2 text-sm leading-relaxed text-slate-700 md:text-[0.95rem]">
        {children}
      </div>
    </aside>
  );
}
