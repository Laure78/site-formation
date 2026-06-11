import type { ReactNode } from 'react';

export type CitationVariant = 'client' | 'formatrice';

export type CitationProps = {
  /** Texte de la citation, sans guillemets. */
  quote: string;
  author?: string;
  role?: string;
  cite?: string;
  variant?: CitationVariant;
  className?: string;
  /** Complément sous la citation (texte déjà présent ailleurs sur la page). */
  children?: ReactNode;
};

const variantStyles: Record<CitationVariant, string> = {
  client:
    'rounded-2xl border-l-4 border-[#377CF3] bg-slate-50 p-6 md:p-8',
  formatrice:
    'rounded-2xl border border-[#377CF3]/20 bg-[#EFF6FF] p-6 text-[#1E40AF] md:p-7',
};

/**
 * Citation client ou formatrice — `<blockquote>` sémantique, texte uniquement.
 */
export function Citation({
  quote,
  author,
  role,
  cite,
  variant = 'client',
  className = '',
  children,
}: CitationProps) {
  return (
    <blockquote
      cite={cite}
      className={`${variantStyles[variant]} ${className}`.trim()}
      data-citation-block
    >
      <p
        className={
          variant === 'client'
            ? 'text-base leading-relaxed text-slate-800 italic md:text-lg'
            : 'text-base font-medium leading-relaxed md:text-lg'
        }
      >
        &laquo;&nbsp;{quote}&nbsp;&raquo;
      </p>
      {children ? <div className="mt-3 text-base text-slate-600">{children}</div> : null}
      {author || role ? (
        <footer className="mt-4 text-base font-medium text-slate-600">
          {author ? <cite className="not-italic text-slate-800">{author}</cite> : null}
          {author && role ? <span aria-hidden> — </span> : null}
          {role ? <span>{role}</span> : null}
        </footer>
      ) : null}
    </blockquote>
  );
}
