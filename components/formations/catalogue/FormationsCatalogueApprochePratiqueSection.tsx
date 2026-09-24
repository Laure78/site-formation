import { Check } from 'lucide-react';

const POINTS = [
  'Travail sur des situations métier BTP',
  'Mise en pratique pendant la formation',
  'Utilisation de documents professionnels',
  'Méthodes et prompts réutilisables',
  'Contrôle humain des productions de l\u2019IA',
] as const;

/** Bloc approche pratique — léger et factuel. */
export function FormationsCatalogueApprochePratiqueSection() {
  return (
    <section
      className="mt-16 rounded-2xl border border-slate-200 bg-gradient-to-br from-white to-slate-50 p-6 md:p-8"
      aria-labelledby="catalogue-approche-pratique"
    >
      <h2
        id="catalogue-approche-pratique"
        className="font-display text-xl font-bold text-ofc-ink md:text-2xl"
      >
        Des formations conçues pour être utilisées dès le retour en entreprise
      </h2>
      <ul className="mt-5 grid gap-3 sm:grid-cols-2">
        {POINTS.map((point) => (
          <li key={point} className="flex items-start gap-2.5 text-sm text-slate-700">
            <Check className="mt-0.5 h-4 w-4 shrink-0 text-ofc-accent" aria-hidden />
            {point}
          </li>
        ))}
      </ul>
    </section>
  );
}
