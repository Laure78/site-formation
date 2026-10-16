import { TrainingCard } from '@/components/ui/TrainingCard';
import type { AccueilNiveauFormationGroup } from '@/lib/accueil-offre-catalogue';

type Props = {
  groupes: readonly AccueilNiveauFormationGroup[];
};

/**
 * Formations par niveau — 100 % serveur (ancres HTML, pas de JS).
 * Chaque formation n’apparaît qu’une fois (règle netlinking).
 */
export function AccueilFormationsNiveauFilter({ groupes }: Props) {
  return (
    <div className="mt-6">
      <nav
        className="flex flex-wrap gap-2"
        aria-label="Aller à un niveau de formation"
      >
        {groupes.map((g) => (
          <a
            key={g.id}
            href={`#${g.id}`}
            className="inline-flex min-h-11 items-center gap-1.5 rounded-ofc-pill border border-ofc-border-strong bg-white px-4 py-2 text-sm font-medium text-ofc-ink transition-colors duration-200 hover:border-ofc-accent hover:bg-ofc-accent-soft hover:text-ofc-accent focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ofc-accent"
          >
            <span>{g.title}</span>
            <span className="tabular-nums text-ofc-ink-muted">
              ({g.formations.length})
            </span>
          </a>
        ))}
      </nav>

      <div className="mt-8 space-y-12">
        {groupes.map((groupe) => (
          <section
            key={groupe.id}
            id={groupe.id}
            className="scroll-mt-28"
            aria-labelledby={`${groupe.id}-title`}
          >
            <h4
              id={`${groupe.id}-title`}
              className="font-display text-lg font-bold tracking-tight text-ofc-ink md:text-xl"
            >
              {groupe.title}
            </h4>
            <div className="mt-5 grid items-stretch gap-5 sm:grid-cols-2 xl:grid-cols-3">
              {groupe.formations.map((f) => (
                <div key={f.code} id={f.anchorId} className="scroll-mt-28">
                  <TrainingCard
                    href={f.href}
                    titre={f.titre}
                    benefice={f.benefice}
                    niveau={f.niveauBadge}
                    duree={f.duree}
                    ctaLabel="Voir le programme"
                    titleAs="h4"
                    className="h-full"
                  />
                </div>
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}
