import { ChevronDown } from 'lucide-react';
import type { ReactNode } from 'react';

export type AccordionVariant = 'light' | 'inverse';

export type AccordionProps = {
  /** Id stable pour `aria-controls` et ancres. */
  id: string;
  children: ReactNode;
  /** Contenu toujours visible au-dessus du déclencheur (intro, 2–3 lignes, cartes témoin…). */
  preview?: ReactNode;
  summaryLabel?: string;
  summaryLabelExpanded?: string;
  className?: string;
  variant?: AccordionVariant;
  defaultOpen?: boolean;
};

const summaryStyles: Record<AccordionVariant, string> = {
  light:
    'text-[#377CF3] hover:text-[#2d66d6] focus-visible:outline-[#377CF3] [&_svg]:text-[#64748B] group-open:[&_svg]:text-[#377CF3]',
  inverse:
    'text-white hover:text-blue-100 focus-visible:outline-white [&_svg]:text-blue-200/90 group-open:[&_svg]:text-white',
};

/**
 * Accordéon accessible — `<details>` / `<summary>` natif, contenu toujours dans le DOM (SSR).
 * Animation douce via `grid-template-rows` (pas de `display: none` → `block`).
 */
export function Accordion({
  id,
  children,
  preview,
  summaryLabel = 'Lire la suite',
  summaryLabelExpanded = 'Réduire',
  className = '',
  variant = 'light',
  defaultOpen,
}: AccordionProps) {
  const panelId = `${id}-panel`;
  const summaryId = `${id}-summary`;

  return (
    <div className={className.trim() || undefined} data-ofc-accordion>
      {preview ? <div className="ofc-accordion-preview">{preview}</div> : null}
      <details
        id={id}
        className={`ofc-accordion group ${variant === 'inverse' ? 'ofc-accordion--inverse' : ''}`}
        open={defaultOpen || undefined}
      >
        <summary
          id={summaryId}
          className={`ofc-accordion-summary ${summaryStyles[variant]}`}
          aria-controls={panelId}
        >
          <span className="ofc-accordion-summary-label ofc-accordion-summary-label--collapsed">
            {summaryLabel}
          </span>
          <span className="ofc-accordion-summary-label ofc-accordion-summary-label--expanded">
            {summaryLabelExpanded}
          </span>
          <ChevronDown
            className="ofc-accordion-chevron h-5 w-5 shrink-0 transition-transform duration-300 group-open:rotate-180"
            strokeWidth={2}
            aria-hidden
          />
        </summary>
        <div
          id={panelId}
          className="ofc-accordion-panel"
          role="region"
          aria-labelledby={summaryId}
        >
          <div className="ofc-accordion-inner">
            <div className="ofc-accordion-content">{children}</div>
          </div>
        </div>
      </details>
    </div>
  );
}
