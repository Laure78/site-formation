import { Clock, Layers, Rocket } from 'lucide-react';
import { CATALOGUE_MAQUETTE_FORMATS } from '@/lib/formations-catalogue-maquette';

const ICONS = {
  express: Clock,
  approfondi: Layers,
  avance: Rocket,
} as const;

export function FormationsCatalogueFormatsBar() {
  return (
    <section aria-label="Formats de formation" className="-mt-2 md:-mt-4">
      <div className="rounded-2xl bg-[#377CF3] px-4 py-6 sm:px-6 md:py-7">
        <ul className="grid list-none gap-6 md:grid-cols-3 md:gap-4">
          {CATALOGUE_MAQUETTE_FORMATS.map((format) => {
            const Icon = ICONS[format.id as keyof typeof ICONS];
            return (
              <li
                key={format.id}
                className="flex min-w-0 items-start gap-3 md:border-l md:border-white/25 md:pl-6 md:first:border-l-0 md:first:pl-0"
              >
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white/15 text-white">
                  <Icon className="h-5 w-5" strokeWidth={2} aria-hidden />
                </span>
                <div className="min-w-0">
                  <p className="font-display text-base font-bold text-white md:text-lg">
                    {format.titre}{' '}
                    <span className="font-semibold text-white/90">— {format.duree}</span>
                  </p>
                  <p className="mt-1 text-sm leading-relaxed text-white/85">{format.description}</p>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
