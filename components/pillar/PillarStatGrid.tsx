import type { LucideIcon } from 'lucide-react';
import type { ReactNode } from 'react';
import { Reveal, RevealGroup } from '@/components/motion/Reveal';
import { CountUp } from '@/components/motion/CountUp';
import { isStatCountUpValue, type StatCountUpValue } from '@/components/readability/stat-callout-types';
import { OFC_CARD } from '@/lib/ofc-interaction-classes';

export type PillarStatItem = {
  label: string;
  value: ReactNode | StatCountUpValue;
  Icon: LucideIcon;
};

type Props = {
  id?: string;
  /** Id du `h2` (accessibilité) — défaut dérivé de `id` */
  titleId?: string;
  title: string;
  description?: string;
  items: readonly PillarStatItem[];
  /** Nombre de colonnes sur grand écran */
  columns?: 2 | 4 | 5;
  footnote?: ReactNode;
  className?: string;
};

/**
 * Grille de chiffres clés — même enveloppe que `ClaudeBtpStatsSection`.
 */
export function PillarStatGrid({
  id,
  titleId,
  title,
  description,
  items,
  columns = 4,
  footnote,
  className = '',
}: Props) {
  const headingId = titleId ?? (id ? `${id}-title` : 'pillar-stat-title');
  const gridCols =
    columns === 2
      ? 'grid-cols-2 gap-4'
      : columns === 5
        ? 'grid-cols-2 gap-4 lg:grid-cols-5'
        : 'grid-cols-2 gap-4 lg:grid-cols-4';

  return (
    <aside
      id={id}
      aria-labelledby={headingId}
      className={`scroll-mt-24 rounded-[16px] border border-[#E2E8F0] bg-white p-6 shadow-[0_8px_30px_rgba(15,23,42,0.06)] md:p-8 ${className}`}
    >
      <Reveal>
        <h2 id={headingId} className="font-display text-lg font-bold text-[#0F172A] md:text-xl">
          {title}
        </h2>
        {description ? <p className="mt-2 max-w-2xl text-sm text-[#64748B]">{description}</p> : null}
      </Reveal>
      <RevealGroup className={`mt-8 grid ${gridCols}`} staggerMs={55}>
        {items.map((row) => {
          const Icon = row.Icon;
          const statValue = isStatCountUpValue(row.value) ? (
            <CountUp {...row.value} className="tabular-nums" />
          ) : (
            row.value
          );
          return (
            <div
              key={row.label}
              className={`${OFC_CARD} group rounded-[16px] bg-[#F8FAFC] p-4 transition-[transform,box-shadow,border-color] duration-300 hover:-translate-y-1 hover:border-[#BFDBFE] hover:shadow-[0_14px_36px_rgba(55,124,243,0.12)] motion-reduce:transition-none motion-reduce:hover:translate-y-0 md:p-5`}
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#377CF3]/15 text-[#377CF3] transition-transform duration-300 group-hover:scale-110 motion-reduce:transition-none motion-reduce:group-hover:scale-100">
                <Icon className="h-6 w-6" strokeWidth={1.75} aria-hidden />
              </div>
              <p className="mt-4 font-display text-4xl font-bold leading-none text-[#1E40AF] md:text-[52px]">
                {statValue}
              </p>
              <p className="mt-2 text-[15px] font-medium uppercase tracking-wide text-[#64748B]">{row.label}</p>
            </div>
          );
        })}
      </RevealGroup>
      {footnote ? (
        <Reveal>
          <p className="mt-6 text-[13px] italic leading-relaxed text-[#94A3B8]">{footnote}</p>
        </Reveal>
      ) : null}
    </aside>
  );
}
