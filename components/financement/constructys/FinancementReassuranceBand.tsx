import { CalendarClock, Handshake, HardHat, Laptop } from 'lucide-react';

const ITEMS = [
  {
    icon: HardHat,
    label: 'OPCO du BTP — Constructys',
  },
  {
    icon: CalendarClock,
    label: 'Dépôt 15 jours avant la formation',
  },
  {
    icon: Laptop,
    label: 'eGestion — Dépôt et suivi en ligne',
  },
  {
    icon: Handshake,
    label: 'Accord préalable — avant de considérer le financement acquis',
  },
] as const;

export function FinancementReassuranceBand() {
  return (
    <section
      aria-label="Points clés financement Constructys"
      className="border-y border-[#D7E5F7] bg-[#EAF3FF] px-4 py-6 sm:px-6 lg:px-8"
    >
      <div className="mx-auto grid max-w-[80rem] gap-6 sm:grid-cols-2 lg:grid-cols-4 lg:gap-4">
        {ITEMS.map((item, index) => {
          const Icon = item.icon;
          return (
            <div
              key={item.label}
              className={`flex items-start gap-3 text-sm font-medium leading-snug text-[#081943] md:text-[0.9375rem] ${
                index > 0 ? 'lg:border-l lg:border-[#D7E5F7] lg:pl-4' : ''
              }`}
            >
              <Icon className="mt-0.5 h-5 w-5 shrink-0 text-[#377CF3]" strokeWidth={1.75} aria-hidden />
              <span>{item.label}</span>
            </div>
          );
        })}
      </div>
    </section>
  );
}
