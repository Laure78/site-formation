import { PROOF, formatProofFormes } from '@/lib/proof';

type ProofStatsProps = {
  className?: string;
  /** Fond clair (défaut) ou sur bandeau accent. */
  variant?: 'default' | 'inverse';
  /** Colonne Qualiopi en plus (bandeau catalogue). */
  showQualiopi?: boolean;
};

const STATS_BASE = [
  { value: formatProofFormes(), label: 'Pros formés' },
  { value: PROOF.note, label: 'Satisfaction' },
  { value: 'OPCO', label: 'Financement possible' },
] as const;

/**
 * Bloc preuve sociale compact — formés / note / OPCO (source `lib/proof.ts`).
 */
export function ProofStats({
  className = '',
  variant = 'default',
  showQualiopi = false,
}: ProofStatsProps) {
  const stats = showQualiopi
    ? [...STATS_BASE, { value: 'Qualiopi', label: 'Certifié' }]
    : [...STATS_BASE];

  const isInverse = variant === 'inverse';
  const cols = stats.length <= 3 ? 'md:grid-cols-3' : 'md:grid-cols-4';

  return (
    <div
      className={
        isInverse
          ? `py-1 ${className}`
          : `border-b border-[#E2E8F0] bg-[#F8FAFC] py-3.5 sm:py-4 md:py-[1.125rem] ${className}`
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
  );
}
