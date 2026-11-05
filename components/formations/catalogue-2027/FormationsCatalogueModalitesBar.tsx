import { Handshake, Layers, MapPin } from 'lucide-react';
import { CATALOGUE_MAQUETTE_MODALITES } from '@/lib/formations-catalogue-maquette';

const ICONS = [MapPin, Layers, Handshake] as const;

export function FormationsCatalogueModalitesBar() {
  return (
    <section
      aria-label="Modalités de formation"
      className="rounded-2xl bg-[#101936] px-4 py-6 sm:px-6 md:py-7"
    >
      <ul className="grid list-none gap-5 md:grid-cols-3 md:gap-4">
        {CATALOGUE_MAQUETTE_MODALITES.map((item, index) => {
          const Icon = ICONS[index] ?? MapPin;
          return (
            <li
              key={item.id}
              className="flex min-w-0 items-center gap-3 md:justify-center md:border-l md:border-white/15 md:pl-6 md:first:border-l-0 md:first:pl-0"
            >
              <Icon className="h-5 w-5 shrink-0 text-[#377CF3]" strokeWidth={2} aria-hidden />
              <p className="text-sm font-semibold text-white md:text-base">{item.label}</p>
            </li>
          );
        })}
      </ul>
      <p className="mt-4 text-center text-xs text-white/70 md:text-sm">
        Sessions inter-entreprises et intra-entreprises — adaptation sur vos documents autorisés.
      </p>
    </section>
  );
}
