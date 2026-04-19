import { ClipboardList, FileSearch, Radar, Users } from 'lucide-react';
import { SOCIAL_PROOF, formatProfessionalsTrainedCount } from '@/lib/constants';

const STATS = [
  {
    label: 'Gain CR chantier',
    value: '−85 %',
    Icon: ClipboardList,
  },
  {
    label: 'Gain analyse DCE',
    value: '−85 %',
    Icon: FileSearch,
  },
  {
    label: 'Gain veille AO',
    value: '−100 %',
    Icon: Radar,
  },
  {
    label: 'Pros formés',
    value: null as string | null,
    Icon: Users,
  },
] as const;

export function ClaudeBtpStatsSection() {
  return (
    <aside
      id="en-chiffres"
      aria-labelledby="en-chiffres-title"
      className="scroll-mt-24 rounded-[16px] border border-[#E2E8F0] bg-white p-6 shadow-[0_8px_30px_rgba(15,23,42,0.06)] md:p-8"
    >
      <h2 id="en-chiffres-title" className="font-display text-lg font-bold text-[#0F172A] md:text-xl">
        Claude AI dans le BTP — en chiffres (OFC 2026)
      </h2>
      <div className="mt-8 grid grid-cols-2 gap-4 lg:grid-cols-4">
        {STATS.map((row) => {
          const Icon = row.Icon;
          const display =
            row.value === null ? formatProfessionalsTrainedCount() : row.value;
          return (
            <div
              key={row.label}
              className="group rounded-[16px] border border-[#F1F5F9] bg-[#F8FAFC] p-4 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-[0_12px_36px_rgba(30,64,175,0.12)] md:p-5"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#377CF3]/15 text-[#377CF3]">
                <Icon className="h-6 w-6" strokeWidth={1.75} aria-hidden />
              </div>
              <p className="mt-4 font-display text-4xl font-bold leading-none text-[#1E40AF] md:text-[52px]">
                {row.label === 'Pros formés' ? (
                  <span className="text-[#0F172A]">{display}</span>
                ) : (
                  display
                )}
              </p>
              <p className="mt-2 text-[15px] font-medium uppercase tracking-wide text-[#64748B]">{row.label}</p>
            </div>
          );
        })}
      </div>
      <p className="mt-6 text-[13px] italic leading-relaxed text-[#94A3B8]">
        Source : mesures OFC sur 8 tâches, sessions FFB Grand Paris, FFB Île-de-France, CSFE — note moyenne{' '}
        {SOCIAL_PROOF.AVERAGE_RATING}.
      </p>
    </aside>
  );
}
