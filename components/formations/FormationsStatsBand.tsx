import { SOCIAL_PROOF, formatProfessionalsTrainedCount } from '@/lib/constants';

/**
 * Bande stats compacte sous le hero — chiffres dynamiques + libellés fixes.
 */
export function FormationsStatsBand() {
  const stats: { value: string; label: string }[] = [
    { value: formatProfessionalsTrainedCount(), label: 'Pros formés' },
    { value: SOCIAL_PROOF.AVERAGE_RATING, label: 'Satisfaction' },
    { value: '100%', label: 'Finançable' },
    { value: 'Qualiopi', label: 'Certifié' },
  ];

  return (
    <div className="border-b border-[#E2E8F0] bg-[#F8FAFC] py-8">
      <div className="mx-auto grid max-w-6xl grid-cols-2 gap-6 px-4 md:grid-cols-4 md:gap-0">
        {stats.map((s, i) => (
          <div
            key={s.label}
            className={`flex flex-col items-center justify-center text-center md:min-h-[5rem] ${
              i > 0 ? 'md:border-l md:border-[#E2E8F0]' : ''
            }`}
          >
            <p className="font-display text-[32px] font-bold leading-none text-[#377CF3] md:text-[36px]">{s.value}</p>
            <p className="mt-2 text-[14px] font-medium uppercase tracking-wide text-[#64748B]">{s.label}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
