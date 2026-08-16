import { getTemoignagesRemplis, type Temoignage } from '@/data/temoignages';

type TemoignagesProps = {
  /** Override optionnel (tests / pages dédiées) — défaut : `data/temoignages.ts`. */
  items?: readonly Temoignage[];
  className?: string;
};

/**
 * Grille de témoignages (charte OFC).
 * Sans données remplies → ne rend rien (Option A prête ; Option B = pas d’annonce d’avis).
 */
export function Temoignages({ items, className = '' }: TemoignagesProps) {
  const list = getTemoignagesRemplis(items ?? undefined).slice(0, 3);

  if (list.length === 0) {
    return null;
  }

  return (
    <ul
      className={`grid gap-6 sm:grid-cols-2 lg:grid-cols-3 ${className}`.trim()}
      aria-label="Témoignages d’entreprises formées"
    >
      {list.map((t) => {
        const initiale = t.prenom.trim().charAt(0).toUpperCase() || '?';
        return (
          <li key={`${t.prenom}-${t.entreprise}-${t.date}`}>
            <figure className="flex h-full flex-col rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <div
                className="flex h-12 w-12 items-center justify-center rounded-full bg-[#377CF3] text-lg font-bold text-white"
                aria-hidden
              >
                {initiale}
              </div>
              <blockquote className="mt-4 flex-1 text-slate-700">
                <p className="leading-relaxed">«&nbsp;{t.verbatim}&nbsp;»</p>
              </blockquote>
              <figcaption className="mt-5 border-t border-slate-100 pt-4 text-sm">
                <p className="font-semibold text-slate-900">
                  {t.prenom}
                  {t.fonction ? ` — ${t.fonction}` : ''}
                </p>
                <p className="mt-0.5 text-slate-600">
                  {[t.entreprise, t.secteur].filter(Boolean).join(' · ')}
                </p>
                {(t.formation || t.date) && (
                  <p className="mt-2 text-xs text-slate-500">
                    {[t.formation, t.date].filter(Boolean).join(' · ')}
                  </p>
                )}
              </figcaption>
            </figure>
          </li>
        );
      })}
    </ul>
  );
}
