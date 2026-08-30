import Link from 'next/link';
import type { ReactNode } from 'react';
import {
  formatNoteSatisfactionAffichageComplet,
  formatNoteSatisfactionSur5,
  formatVolumeProsFormesBtp,
} from '@/lib/data/indicateurs-resultats';
import { IndicateursResultatsLink } from '@/components/formation/IndicateursResultatsLink';
import { LINKS } from '@/lib/internal-links';

export type ProofStatItem = {
  value: ReactNode;
  label?: string;
  href?: string;
};

type ProofStatsProps = {
  className?: string;
  /** Fond clair (défaut) ou sur bandeau accent. */
  variant?: 'default' | 'inverse';
  /** Colonne Qualiopi en plus (bandeau catalogue). */
  showQualiopi?: boolean;
  /** Remplace les stats par défaut (ex. barre hero landing métier). */
  items?: readonly ProofStatItem[];
  /** Une colonne sous 768px — défaut true quand `items` est fourni. */
  stackOnMobile?: boolean;
};

type StatItem = {
  id: string;
  value: ReactNode;
  label: string;
  href?: string;
};

const STATS_BASE: StatItem[] = [
  {
    id: 'satisfaction',
    value: formatNoteSatisfactionSur5(),
    label: 'Satisfaction (Qualiopi)',
  },
  { id: 'opco', value: 'OPCO', label: 'Financement possible' },
];

/** Barre preuve conducteur de travaux — sous le H1 landing canonique. */
export const CONDUCTEUR_TRAVAUX_HERO_PROOF_ITEMS: readonly ProofStatItem[] = [
  { value: formatVolumeProsFormesBtp(), label: 'professionnels du BTP formés' },
  {
    value: formatNoteSatisfactionAffichageComplet(),
    href: LINKS.indicateursResultats,
  },
  { value: 'Organisme certifié Qualiopi', href: LINKS.qualiopi },
];

/**
 * Bloc preuve sociale compact — satisfaction / OPCO (source `PREUVES`).
 */
export function ProofStats({
  className = '',
  variant = 'default',
  showQualiopi = false,
  items,
  stackOnMobile,
}: ProofStatsProps) {
  const stats: StatItem[] = items
    ? items.map((item, index) => ({
        id: `custom-${index}`,
        value: item.value,
        label: item.label ?? '',
        href: item.href,
      }))
    : showQualiopi
      ? [...STATS_BASE, { id: 'qualiopi', value: 'Qualiopi', label: 'Certifié' }]
      : [...STATS_BASE];

  const isInverse = variant === 'inverse';
  const useStackMobile = stackOnMobile ?? Boolean(items);
  const gridCols = useStackMobile
    ? 'grid-cols-1 md:grid-cols-3'
    : stats.length <= 3
      ? 'grid-cols-2 md:grid-cols-3'
      : 'grid-cols-2 md:grid-cols-4';

  const valueClassLarge = isInverse
    ? 'font-display text-[1.5rem] font-bold leading-none text-white sm:text-[26px] md:text-[28px]'
    : 'font-display text-[1.5rem] font-bold leading-none text-[#377CF3] sm:text-[26px] md:text-[28px]';

  const valueClassCompact = isInverse
    ? 'font-display text-base font-bold leading-snug text-white sm:text-lg md:text-xl'
    : 'font-display text-base font-bold leading-snug text-[#377CF3] sm:text-lg md:text-xl';

  const labelClass = isInverse
    ? 'mt-1 text-[11px] font-medium uppercase tracking-wide text-blue-100 sm:text-xs'
    : 'mt-1 text-[11px] font-medium uppercase tracking-wide text-[#64748B] sm:text-xs';

  return (
    <div className={className}>
      <div
        className={
          isInverse
            ? 'py-1'
            : 'border-b border-[#E2E8F0] bg-[#F8FAFC] py-3.5 sm:py-4 md:py-[1.125rem]'
        }
      >
        <div
          className={`mx-auto grid max-w-6xl gap-3 px-4 ${gridCols} md:gap-0 md:py-0.5`}
          aria-label="Indicateurs de confiance"
        >
          {stats.map((s, i) => {
            const cell = (
              <>
                <p className={s.label ? valueClassLarge : valueClassCompact}>{s.value}</p>
                {s.label ? <p className={labelClass}>{s.label}</p> : null}
              </>
            );

            return (
              <div
                key={s.id}
                className={`flex flex-col items-center justify-center py-1 text-center md:py-2 ${
                  i > 0
                    ? isInverse
                      ? 'md:border-l md:border-white/25'
                      : 'md:border-l md:border-[#E2E8F0]'
                    : ''
                }`}
              >
                {s.href ? (
                  <Link
                    href={s.href}
                    className={
                      isInverse
                        ? 'rounded-lg transition hover:bg-white/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white'
                        : 'rounded-lg transition hover:bg-[#377CF3]/5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#377CF3]'
                    }
                  >
                    {cell}
                  </Link>
                ) : (
                  cell
                )}
              </div>
            );
          })}
        </div>
      </div>
      {!items ? (
        <IndicateursResultatsLink
          variant={isInverse ? 'inverse' : 'default'}
          className={isInverse ? 'mt-3' : 'mt-2 px-4'}
        />
      ) : null}
    </div>
  );
}
