'use client';

import { Award, GraduationCap, ShieldCheck, Star } from 'lucide-react';
import { Reveal, RevealGroup } from '@/components/motion/Reveal';
import { formatNoteSatisfactionSur5 } from '@/lib/data/indicateurs-resultats';
import { getStatsFreshnessLabel } from '@/lib/readability-presets';
import { IndicateursResultatsLink } from '@/components/formation/IndicateursResultatsLink';

const STATS = [
  {
    Icon: Star,
    value: formatNoteSatisfactionSur5(),
    label: 'Satisfaction (Qualiopi)',
  },
  {
    Icon: Award,
    value: '10 ans',
    label: 'Terrain BTP',
  },
  {
    Icon: GraduationCap,
    value: 'LinkedIn',
    label: 'Learning Instructor',
  },
  {
    Icon: ShieldCheck,
    value: 'Qualiopi',
    label: 'Certifiée jusqu’en jan. 2028',
  },
] as const;

/**
 * Bandeau chiffres clés — apparition au scroll (page /a-propos).
 */
export function AProposStatsShowcase() {
  const statsFreshness = getStatsFreshnessLabel();

  return (
    <section
      aria-labelledby="a-propos-stats-title"
      className="a-propos-stats-band relative overflow-hidden border-y border-[#BFDBFE] bg-gradient-to-r from-[#EFF6FF] via-white to-[#EFF6FF]"
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.35] [background-image:radial-gradient(circle_at_20%_50%,rgba(55,124,243,0.12),transparent_45%),radial-gradient(circle_at_80%_50%,rgba(55,124,243,0.1),transparent_40%)]"
        aria-hidden
      />
      <div className="relative mx-auto max-w-6xl px-4 py-8 md:py-10">
        <Reveal>
          <p
            id="a-propos-stats-title"
            className="text-center text-[11px] font-semibold uppercase tracking-[0.2em] text-[#377CF3] md:text-xs"
          >
            Chiffres clés · {statsFreshness}
          </p>
        </Reveal>
        <RevealGroup className="mt-6 grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-6" staggerMs={70}>
          {STATS.map(({ Icon, value, label }) => (
            <div
              key={label}
              className="group relative overflow-hidden rounded-2xl border border-[#D4E3FC] bg-white/90 p-5 text-center shadow-[0_8px_28px_rgba(55,124,243,0.08)] transition-[transform,box-shadow,border-color] duration-300 hover:-translate-y-1 hover:border-[#377CF3]/40 hover:shadow-[0_16px_40px_rgba(55,124,243,0.14)] motion-reduce:transition-none motion-reduce:hover:translate-y-0"
            >
              <div
                className="mx-auto flex h-11 w-11 items-center justify-center rounded-full bg-[#377CF3]/10 text-[#377CF3] transition-transform duration-300 group-hover:scale-110 motion-reduce:transition-none motion-reduce:group-hover:scale-100"
                aria-hidden
              >
                <Icon className="h-5 w-5" strokeWidth={1.75} />
              </div>
              <p className="mt-3 font-display text-3xl font-bold leading-none text-[#1E40AF] md:text-4xl">{value}</p>
              <p className="mt-2 text-xs font-medium uppercase tracking-wide text-[#64748B] md:text-[13px]">{label}</p>
            </div>
          ))}
        </RevealGroup>
        <IndicateursResultatsLink className="mt-5" />
      </div>
    </section>
  );
}
