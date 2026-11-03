import { CalendarClock, Handshake, HardHat, Laptop } from 'lucide-react';

const ITEMS = [
  { icon: HardHat, label: 'OPCO du BTP — Constructys' },
  { icon: CalendarClock, label: 'Dépôt 15 jours avant la date de formation' },
  { icon: Laptop, label: 'eGestion — Dépôt et suivi en ligne' },
  { icon: Handshake, label: 'Accord préalable obligatoire' },
] as const;

export function FinancementReassuranceBand() {
  return (
    <section
      aria-label="Points clés financement Constructys"
      className="border-y border-[#D7E5F7] bg-[#EAF3FF]/70 px-4 py-7 sm:px-6 lg:px-8"
    >
      <div className="mx-auto grid max-w-[80rem] gap-6 sm:grid-cols-2 lg:grid-cols-4 lg:gap-0">
        {ITEMS.map((item, index) => {
          const Icon = item.icon;
          return (
            <div
              key={item.label}
              className={`flex flex-col items-center gap-2.5 px-3 text-center lg:px-5 ${
                index > 0 ? 'lg:border-l lg:border-[#D7E5F7]' : ''
              }`}
            >
              <Icon className="h-6 w-6 text-[#377CF3]" strokeWidth={1.75} aria-hidden />
              <p className="text-sm font-medium leading-snug text-[#081943] md:text-[0.9375rem]">
                {item.label}
              </p>
            </div>
          );
        })}
      </div>
    </section>
  );
}
