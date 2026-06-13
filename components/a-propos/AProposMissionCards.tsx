'use client';

import { RevealGroup } from '@/components/motion/Reveal';
import { A_PROPOS_MISSION } from '@/lib/a-propos-eeat-content';
import { EeatRichText } from '@/components/a-propos/EeatRichText';

const CARDS = [
  { label: 'Mission', value: A_PROPOS_MISSION.mission },
  { label: 'Approche', value: A_PROPOS_MISSION.approach },
  { label: 'Philosophie', value: A_PROPOS_MISSION.philosophy },
] as const;

export function AProposMissionCards() {
  return (
    <>
      <RevealGroup className="mt-6 grid gap-4 md:grid-cols-3" staggerMs={55}>
        {CARDS.map((item) => (
          <div
            key={item.label}
            className="group rounded-xl border border-[#D4E3FC] bg-[#EFF6FF] p-5 transition-[transform,box-shadow,border-color] duration-300 hover:-translate-y-0.5 hover:border-[#377CF3]/35 hover:shadow-[0_12px_32px_rgba(55,124,243,0.12)] motion-reduce:transition-none motion-reduce:hover:translate-y-0"
          >
            <p className="text-xs font-bold uppercase tracking-[0.12em] text-[#377CF3]">{item.label}</p>
            <p className="mt-2 text-[15px] font-semibold leading-snug text-[#0F172A]">{item.value}</p>
          </div>
        ))}
      </RevealGroup>
      <div className="mt-6 space-y-5 text-[16px] leading-relaxed text-[#334155]">
        {A_PROPOS_MISSION.paragraphs.map((paragraph) => (
          <p key={paragraph.slice(0, 40)}>
            <EeatRichText text={paragraph} />
          </p>
        ))}
      </div>
    </>
  );
}
