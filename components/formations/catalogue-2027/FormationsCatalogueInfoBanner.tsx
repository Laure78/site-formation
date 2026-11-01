import { Clock, Coins, MapPin, Users } from 'lucide-react';
import { getCatalogueDureeBannerLabel } from '@/lib/formations-catalogue-duree-banner';

const ITEMS = [
  { Icon: Clock, getLabel: () => getCatalogueDureeBannerLabel(), sub: 'Durées selon les formations' },
  { Icon: MapPin, label: 'Présentiel', sub: 'Île-de-France' },
  { Icon: Users, label: 'PME du BTP', sub: 'Formations adaptées aux métiers' },
  { Icon: Coins, label: 'Financement', sub: 'Selon éligibilité' },
] as const;

export function FormationsCatalogueInfoBanner() {
  return (
    <div
      className="rounded-2xl bg-[#EAF3FF] px-4 py-5 sm:px-6 md:py-6"
      role="region"
      aria-label="Informations pratiques catalogue"
    >
      <ul className="grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-0">
        {ITEMS.map(({ Icon, sub, ...rest }, index) => {
          const label = 'getLabel' in rest ? rest.getLabel() : rest.label;
          return (
            <li
              key={label}
              className={`flex min-w-0 items-start gap-3 md:px-5 ${
                index > 0 ? 'md:border-l md:border-[#BFDBFE]' : ''
              }`}
            >
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white text-[#377CF3] shadow-sm">
                <Icon className="h-5 w-5" strokeWidth={2} aria-hidden />
              </span>
              <div className="min-w-0 pt-0.5">
                <p className="font-display text-sm font-bold text-[#101936] md:text-base">{label}</p>
                <p className="mt-0.5 text-xs leading-snug text-slate-600">{sub}</p>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
