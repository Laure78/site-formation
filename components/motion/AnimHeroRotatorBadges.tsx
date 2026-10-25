import { Sparkles, MapPin, Award } from 'lucide-react';

const BADGES = [
  {
    icon: Sparkles,
    items: 'Formation IA|ChatGPT|Claude AI',
  },
  {
    icon: Award,
    items: 'Qualiopi|Finançable OPCO|4 h pratiques',
  },
  {
    icon: MapPin,
    items: 'Paris|Île-de-France|Intra-entreprise',
  },
] as const;

/** Pilules hero — texte rotatif (`data-anim="text-rotator"`). */
export function AnimHeroRotatorBadges() {
  return (
    <ul
      className="mt-3 flex flex-wrap gap-2"
      aria-label="Points clés de l’offre"
    >
      {BADGES.map(({ icon: Icon, items }) => (
        <li key={items}>
          <span
            className="anim-badge-pill"
            data-anim="text-rotator"
            data-rotator-items={items}
          >
            <Icon className="h-3.5 w-3.5 shrink-0 text-[#377CF3]" strokeWidth={2} aria-hidden />
            <span className="anim-rotator-viewport min-w-[8.5rem] sm:min-w-[9.5rem]">
              <span data-rotator-track className="anim-rotator-track">
                {items.split('|')[0]}
              </span>
            </span>
          </span>
        </li>
      ))}
    </ul>
  );
}
