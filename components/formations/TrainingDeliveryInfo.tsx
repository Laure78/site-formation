import { BUSINESS_DELIVERY } from '@/lib/business-delivery';

type Props = {
  className?: string;
  /** Affiche la phrase longue sous la ligne compacte. */
  showBody?: boolean;
  /** Variante visuelle. */
  variant?: 'banner' | 'inline' | 'checklist';
};

/**
 * Modalités commerciales compactes — une seule occurrence par page recommandée.
 * Présentiel · IDF · Groupe · Intra/inter.
 */
export function TrainingDeliveryInfo({
  className = '',
  showBody = false,
  variant = 'banner',
}: Props) {
  if (variant === 'checklist') {
    return (
      <div className={className} role="group" aria-label="Modalités des formations">
        <p className="font-semibold text-slate-900">Vous recherchez une formation IA pour votre entreprise ?</p>
        <ul className="mt-2 space-y-1 text-sm text-slate-700">
          <li>✓ Présentiel</li>
          <li>✓ Île-de-France</li>
          <li>✓ Formation en groupe</li>
          <li>✓ Intra ou inter-entreprises</li>
        </ul>
      </div>
    );
  }

  if (variant === 'inline') {
    return (
      <p className={`text-sm font-medium text-slate-600 ${className}`}>
        {BUSINESS_DELIVERY.compactDots}
      </p>
    );
  }

  return (
    <aside
      className={`rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-700 ${className}`}
      aria-label="Modalités des formations"
    >
      <p className="font-semibold text-slate-900">{BUSINESS_DELIVERY.compact}</p>
      {showBody ? <p className="mt-1.5 leading-relaxed text-slate-600">{BUSINESS_DELIVERY.body}</p> : null}
    </aside>
  );
}
