import { BadgeCheck, Percent, Users } from 'lucide-react';
import { OFC_SECTION_INNER } from '@/lib/ofc-section-classes';

const ICON_STROKE = 2;

const ITEMS = [
  { icon: BadgeCheck, label: 'Organisme certifié Qualiopi' },
  { icon: Percent, label: '70 % pratique' },
  { icon: Users, label: '6 à 12 participants' },
] as const;

/** Bandeau de confiance — trois repères horizontaux. */
export function Niv01MaquetteTrustBar() {
  return (
    <section
      className="border-b border-[#DAE3F0] bg-white px-4 py-4 md:py-5"
      aria-label="Réassurance formation"
    >
      <div className={`${OFC_SECTION_INNER} formation-niv01-maquette__inner`}>
        <ul className="flex flex-col divide-y divide-[#DAE3F0] sm:flex-row sm:divide-x sm:divide-y-0">
          {ITEMS.map(({ icon: Icon, label }) => (
            <li
              key={label}
              className="flex flex-1 items-center justify-center gap-2.5 px-4 py-3 text-sm font-semibold text-[#101936] first:pt-0 last:pb-0 sm:py-0"
            >
              <Icon className="h-5 w-5 shrink-0 text-[#377CF3]" strokeWidth={ICON_STROKE} aria-hidden />
              {label}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
