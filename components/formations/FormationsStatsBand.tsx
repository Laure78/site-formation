import { SOCIAL_PROOF, formatProfessionalsTrainedCount } from '@/lib/constants';

/**
 * Bande stats compacte sous le hero — chiffres dynamiques + libellés fixes.
 */
export function FormationsStatsBand() {
  const stats: { value: string; label: string }[] = [
    { value: formatProfessionalsTrainedCount(), label: 'Pros formés' },
    { value: SOCIAL_PROOF.AVERAGE_RATING, label: 'Satisfaction' },
    { value: 'OPCO', label: 'Financement possible' },
    { value: 'Qualiopi', label: 'Certifié' },
  ];

  return (
    <div className="border-b border-[#E2E8F0] bg-[#F8FAFC] py-3.5 sm:py-4 md:py-[1.125rem]">
      <div className="mx-auto grid max-w-6xl grid-cols-2 gap-3 px-4 md:grid-cols-4 md:gap-0 md:py-0.5">
        {stats.map((s, i) => (
          <div
            key={s.label}
            className={`flex flex-col items-center justify-center py-1 text-center md:py-2 ${
              i > 0 ? 'md:border-l md:border-[#E2E8F0]' : ''
            }`}
          >
            <p className="font-display text-[1.5rem] font-bold leading-none text-[#377CF3] sm:text-[26px] md:text-[28px]">
              {s.value}
            </p>
            <p className="mt-1 text-[11px] font-medium uppercase tracking-wide text-[#64748B] sm:text-xs">{s.label}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
