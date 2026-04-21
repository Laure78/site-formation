import { Award, Clock3, GraduationCap, Star, Users } from 'lucide-react';
import { formatProfessionalsTrainedCount, SOCIAL_PROOF } from '@/lib/constants';

const STATS = [
  { icon: Users, value: formatProfessionalsTrainedCount(), label: 'PROS FORMÉS', ring: 'bg-[#EFF6FF]' },
  { icon: Star, value: SOCIAL_PROOF.AVERAGE_RATING, label: 'SATISFACTION', ring: 'bg-[#FEF3C7]' },
  { icon: Clock3, value: '10 ans', label: 'EXPÉRIENCE BTP', ring: 'bg-[#EFF6FF]' },
  { icon: Award, value: 'Qualiopi', label: 'CERTIFIÉE', ring: 'bg-[#D1FAE5]' },
  { icon: GraduationCap, value: 'LinkedIn Learning', label: 'INSTRUCTRICE', ring: 'bg-[#EFF6FF]' },
] as const;

export function StatsCards() {
  return (
    <section id="chiffres-cles" className="scroll-mt-24">
      <div className="mx-auto max-w-6xl">
        <div className="mb-8 flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
          <h2 className="font-display text-3xl font-bold tracking-tight text-[#0F172A] md:text-4xl">Chiffres clés</h2>
          <p className="max-w-md text-sm text-[#64748B]">Indicateurs consolidés de formation IA BTP.</p>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {STATS.map((item) => {
            const Icon = item.icon;
            return (
              <article
                key={item.label}
                className="rounded-[20px] border border-[#E2E8F0] bg-white p-7 shadow-[0_8px_30px_rgba(15,23,42,0.05)] transition duration-300 hover:-translate-y-1 hover:border-[#BFDBFE] hover:shadow-[0_14px_44px_rgba(15,23,42,0.08)]"
              >
                <div className={`flex h-16 w-16 items-center justify-center rounded-full ${item.ring}`}>
                  <Icon className="h-8 w-8 text-[#377CF3]" />
                </div>
                <p className="mt-5 text-4xl font-bold leading-none text-[#1E40AF]">{item.value}</p>
                <p className="mt-3 text-xs font-semibold uppercase tracking-[0.14em] text-[#64748B]">{item.label}</p>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
