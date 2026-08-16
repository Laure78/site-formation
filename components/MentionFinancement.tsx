import Link from 'next/link';
import { LINKS } from '@/lib/internal-links';
import {
  FINANCEMENT_FORMULATION_PRUDENTE,
  FINANCEMENT_FORMULATION_COURTE_LIEN,
} from '@/lib/financement-copy';
import { OFC_LINK } from '@/lib/ofc-interaction-classes';

export type MentionFinancementVariant = 'long' | 'court';

type Props = {
  variant: MentionFinancementVariant;
  className?: string;
  /**
   * `court` uniquement. Défaut `true`.
   * Passer `false` si la page a déjà un lien vers la page financement
   * (règle : une seule URL interne par page).
   */
  withLink?: boolean;
};

/**
 * Mention financement OPCO / Constructys — source unique pour éviter la redivergence.
 * - `long` : formulation prudente complète (L’essentiel, section FINANCEMENT).
 * - `court` : « Financement possible selon éligibilité » (+ lien page financement).
 */
export function MentionFinancement({ variant, className = '', withLink = true }: Props) {
  if (variant === 'long') {
    return <span className={className || undefined}>{FINANCEMENT_FORMULATION_PRUDENTE}</span>;
  }

  if (withLink) {
    return (
      <Link
        href={LINKS.financement}
        className={`${OFC_LINK} font-medium ${className}`.trim()}
        title="Financement Constructys — formation IA pour le BTP"
      >
        {FINANCEMENT_FORMULATION_COURTE_LIEN}
      </Link>
    );
  }

  return <span className={className || undefined}>{FINANCEMENT_FORMULATION_COURTE_LIEN}</span>;
}
