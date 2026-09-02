import type { RessourceCatalogEntry } from '@/lib/ressources-catalog';
import { RessourceCard } from '@/components/ressources/RessourceCard';

type Props = {
  resources: readonly RessourceCatalogEntry[];
};

export function RessourcesFeaturedSection({ resources }: Props) {
  if (resources.length === 0) return null;

  return (
    <section
      id="pour-commencer"
      aria-labelledby="ressources-featured-heading"
      className="scroll-mt-28 border-t border-slate-200 bg-[#F8FAFC] py-12 md:py-16"
    >
      <div className="mx-auto max-w-7xl px-4">
        <header className="mb-8 max-w-3xl">
          <h2 id="ressources-featured-heading" className="font-display text-2xl font-bold text-slate-900 md:text-3xl">
            Pour commencer
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-slate-600 md:text-base">
            Trois ressources pour démarrer : appels d&apos;offres, conduite de travaux et RH /
            fonctions support.
          </p>
        </header>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {resources.map((resource) => (
            <RessourceCard key={resource.id} resource={resource} />
          ))}
        </div>
      </div>
    </section>
  );
}
