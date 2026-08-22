import type { ReactNode } from 'react';
import { COUNT_UP_PROS_PLUS_SUFFIX } from '@/lib/readability-presets';
import { CountUp } from '@/components/motion/CountUp';
import { IndicateursResultatsLink } from '@/components/formation/IndicateursResultatsLink';

type ProofStatsProps = {
  className?: string;
  /** Fond clair (défaut) ou sur bandeau accent. */
  variant?: 'default' | 'inverse';
  /** Colonne Qualiopi en plus (bandeau catalogue). */
  showQualiopi?: boolean;
};

type StatItem = {
  value: ReactNode;
  label: string;
};

const STATS_BASE: StatItem[] = [
  {
    value: <CountUp {...COUNT_UP_PROS_PLUS_SUFFIX} className="tabular-nums" />,
    label: 'Pros formés depuis 2021',
  },
  { value: 'OPCO', label: 'Financement possible' },
];

/**
 * Bloc preuve sociale compact — formés / note / OPCO (source `PREUVES`).
 */
export function ProofStats({
  className = '',
  variant = 'default',
  showQualiopi = false,
}: ProofStatsProps) {
  const stats: StatItem[] = showQualiopi
    ? [...STATS_BASE, { value: 'Qualiopi', label: 'Certifié' }]
    : [...STATS_BASE];

  const isInverse = variant === 'inverse';
  const cols = stats.length <= 3 ? 'md:grid-cols-3' : 'md:grid-cols-4';

  return (
    <div className={className}>
      <div
        className={
          isInverse
            ? 'py-1'
            : 'border-b border-[#E2E8F0] bg-[#F8FAFC] py-3.5 sm:py-4 md:py-[1.125rem]'
        }
      >
        <div className={`mx-auto grid max-w-6xl grid-cols-2 gap-3 px-4 ${cols} md:gap-0 md:py-0.5`}>
          {stats.map((s, i) => (
            <div
              key={s.label}
              className={`flex flex-col items-center justify-center py-1 text-center md:py-2 ${
                i > 0
                  ? isInverse
                    ? 'md:border-l md:border-white/25'
                    : 'md:border-l md:border-[#E2E8F0]'
                  : ''
              }`}
            >
              <p
                className={
                  isInverse
                    ? 'font-display text-[1.5rem] font-bold leading-none text-white sm:text-[26px] md:text-[28px]'
                    : 'font-display text-[1.5rem] font-bold leading-none text-[#377CF3] sm:text-[26px] md:text-[28px]'
                }
              >
                {s.value}
              </p>
              <p
                className={
                  isInverse
                    ? 'mt-1 text-[11px] font-medium uppercase tracking-wide text-blue-100 sm:text-xs'
                    : 'mt-1 text-[11px] font-medium uppercase tracking-wide text-[#64748B] sm:text-xs'
                }
              >
                {s.label}
              </p>
            </div>
          ))}
        </div>
      </div>
      <IndicateursResultatsLink
        variant={isInverse ? 'inverse' : 'default'}
        className={isInverse ? 'mt-3' : 'mt-2 px-4'}
      />
    </div>
  );
}
