import type { LucideIcon } from 'lucide-react';
import { FORMATEUR_PROFILE_EXPERTISE_CARD } from '@/components/formateurs/profile/formateur-profile-section-styles';
import { OFC_TYPE_BODY, OFC_TYPE_H2 } from '@/lib/ofc-interaction-classes';
import { OFC_SECTION_INNER, ofcSectionClasses } from '@/lib/ofc-section-classes';

export type FormateurProfileExpertiseCard = {
  key: string;
  title: string;
  body: string;
};

type Props = {
  headingId: string;
  title: string;
  intro?: string;
  cards: readonly FormateurProfileExpertiseCard[];
  icons: Record<string, LucideIcon>;
  /** Grille expertise — défaut 3 colonnes (Marc). */
  cardsGridClassName?: string;
};

export function FormateurProfileExpertiseSection({
  headingId,
  title,
  intro,
  cards,
  icons,
  cardsGridClassName = 'md:grid-cols-3',
}: Props) {
  return (
    <section
      className={ofcSectionClasses({ tone: 'white', size: 'compact' })}
      aria-labelledby={headingId}
    >
      <div className={`${OFC_SECTION_INNER} max-w-6xl`}>
        <h2 id={headingId} className={OFC_TYPE_H2}>
          {title}
        </h2>
        {intro ? (
          <p className={`${OFC_TYPE_BODY} mt-4 max-w-3xl text-ofc-ink-muted`}>{intro}</p>
        ) : null}
        <ul className={`mt-8 grid gap-4 ${cardsGridClassName}`}>
          {cards.map((card) => {
            const Icon = icons[card.key];
            return (
              <li key={card.key} className={FORMATEUR_PROFILE_EXPERTISE_CARD}>
                {Icon ? (
                  <Icon className="h-7 w-7 text-[#377CF3]" strokeWidth={2} aria-hidden />
                ) : null}
                <h3 className="mt-3 font-display text-lg font-bold text-[#101936]">{card.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">{card.body}</p>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}