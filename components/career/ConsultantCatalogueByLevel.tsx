import Link from 'next/link';
import { formationHref, type FormationNiveau } from '@/data/formations';
import { getPublishedFormations } from '@/lib/formation-catalogue-visibility';
import { FORMATIONS_NIVEAUX_IA } from '@/lib/formations-niveaux-ia';

const LEVELS: FormationNiveau[] = [1, 2, 3];

export function ConsultantCatalogueByLevel() {
  const published = getPublishedFormations();

  return (
    <div className="mt-6 space-y-8">
      {LEVELS.map((niveau) => {
        const def = FORMATIONS_NIVEAUX_IA.find((n) => n.niveau === niveau);
        const items = published.filter((f) => f.niveau === niveau);
        if (items.length === 0) return null;

        return (
          <div key={niveau}>
            <h3 className="font-display text-lg font-bold text-slate-900">
              {def?.labelComplet ?? `Niveau ${niveau}`}
            </h3>
            <ul className="mt-3 divide-y divide-slate-200 rounded-xl border border-slate-200 bg-white">
              {items.map((f) => (
                <li key={f.slug} className="flex flex-col gap-1 px-4 py-3 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <p className="font-medium text-slate-900">{f.titre}</p>
                    <p className="text-sm text-slate-500">{f.niveauLabel}</p>
                  </div>
                  <Link
                    href={formationHref(f)}
                    className="text-sm font-semibold text-[#377CF3] underline-offset-2 hover:underline"
                  >
                    Voir le programme
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        );
      })}
    </div>
  );
}
