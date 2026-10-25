import { Sparkles, MapPin, Award } from 'lucide-react';

const PILLARS = [
  {
    icon: Sparkles,
    title: 'Outils IA',
    items: ['Formation IA métier', 'ChatGPT', 'Claude AI'],
  },
  {
    icon: Award,
    title: 'Organisme',
    items: ['Certifié Qualiopi', 'OPCO selon éligibilité', 'Ateliers pratiques'],
  },
  {
    icon: MapPin,
    title: 'Modalités',
    items: ['Présentiel', 'Île-de-France (75–95)', 'Intra-entreprise'],
  },
] as const;

/** Repères hero — grille lisible (sans rotateur). */
export function AnimHeroRotatorBadges() {
  return (
    <ul
      className="mt-4 grid list-none gap-2.5 sm:grid-cols-3 sm:gap-3"
      aria-label="Points clés de l’offre"
    >
      {PILLARS.map(({ icon: Icon, title, items }) => (
        <li key={title} className="min-w-0">
          <div className="flex h-full gap-3 rounded-xl border border-ofc-border/90 bg-white/90 px-3.5 py-3 shadow-sm sm:px-4 sm:py-3.5">
            <span
              className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#377CF3]/10"
              aria-hidden
            >
              <Icon className="h-4 w-4 text-[#377CF3]" strokeWidth={2} />
            </span>
            <div className="min-w-0 flex-1 text-left">
              <p className="text-[0.6875rem] font-bold uppercase tracking-wide text-ofc-ink-subtle sm:text-xs">
                {title}
              </p>
              <ul className="mt-1.5 space-y-1">
                {items.map((label) => (
                  <li
                    key={label}
                    className="text-[0.8125rem] font-semibold leading-snug text-ofc-ink sm:text-sm"
                  >
                    {label}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
}
