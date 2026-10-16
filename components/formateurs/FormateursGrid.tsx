import { FormateurCard } from '@/components/formateurs/FormateurCard';
import type { FormateurProfile } from '@/lib/formateurs';

type Props = {
  formateurs: readonly FormateurProfile[];
  maxFormationsPerCard?: number;
  showFormations?: boolean;
};

/** Grille responsive — 1 / 2 / 3 colonnes. */
export function FormateursGrid({
  formateurs,
  maxFormationsPerCard,
  showFormations = true,
}: Props) {
  if (formateurs.length === 0) return null;

  return (
    <ul className="mt-10 grid list-none gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-7">
      {formateurs.map((f, index) => (
        <li
          key={f.id}
          className="min-w-0 motion-safe:animate-[ofc-hero-enter_0.45s_ease-out_both]"
          style={{ animationDelay: `${Math.min(index, 5) * 60}ms` }}
        >
          <FormateurCard
            formateur={f}
            maxFormations={maxFormationsPerCard}
            showFormations={showFormations}
          />
        </li>
      ))}
    </ul>
  );
}
