import Link from 'next/link';
import { LINKS } from '@/lib/internal-links';
import { OFC_LINK } from '@/lib/ofc-interaction-classes';

type IndicateursResultatsLinkProps = {
  className?: string;
  /** Sur bandeau bleu ou fond sombre. */
  variant?: 'default' | 'inverse';
};

/**
 * Lien vers la page indicateur 2 Qualiopi — sous chaque bloc de stats public.
 */
export function IndicateursResultatsLink({
  className = '',
  variant = 'default',
}: IndicateursResultatsLinkProps) {
  const linkClass =
    variant === 'inverse'
      ? 'text-sm font-medium text-blue-100/90 underline-offset-2 transition hover:text-white hover:underline'
      : `${OFC_LINK} text-xs font-medium underline-offset-2 hover:underline`;

  return (
    <p className={className || 'mt-2 text-center'}>
      <Link href={LINKS.indicateursResultats} className={linkClass}>
        Détail des indicateurs de résultats
      </Link>
    </p>
  );
}
