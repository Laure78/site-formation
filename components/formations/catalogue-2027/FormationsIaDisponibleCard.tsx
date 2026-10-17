import Link from 'next/link';
import { DEV_WEB_IA_DUREE_COURTE } from '@/lib/formation-developpement-web-ia-content';
import type { FormationCatalogueEntry } from '@/lib/formations-catalogue-display';
import { catalogueNiveauLabel } from '@/lib/formations-catalogue-display';
import { OFC_CTA_PRIMARY } from '@/lib/ofc-interaction-classes';

type Props = {
  entry: FormationCatalogueEntry;
};

function dureeAffichage(entry: FormationCatalogueEntry): string | null {
  if (entry.ref === 'NIV-10') return DEV_WEB_IA_DUREE_COURTE;
  const duree = entry.duree?.trim();
  return duree || null;
}

export function FormationsIaDisponibleCard({ entry }: Props) {
  const badge = catalogueNiveauLabel(entry.ref);
  const duree = dureeAffichage(entry);

  return (
    <li className="flex h-full flex-col border border-[#E2E8F0] bg-white p-5">
      <span
        className={`inline-flex w-fit rounded-full px-3 py-1 text-[11px] font-bold uppercase tracking-wide ${
          entry.ref === 'NIV-01'
            ? 'bg-emerald-50 text-emerald-800 ring-1 ring-emerald-200'
            : entry.ref === 'NIV-10'
              ? 'bg-indigo-50 text-indigo-800 ring-1 ring-indigo-200'
              : 'bg-blue-50 text-blue-800 ring-1 ring-blue-200'
        }`}
      >
        {badge}
      </span>
      <h4 className="mt-3 text-base font-semibold text-ofc-ink">{entry.title}</h4>
      <p className="mt-2 flex-1 text-sm leading-relaxed text-ofc-ink-muted">{entry.promesse}</p>
      {duree ? <p className="mt-3 text-sm text-ofc-ink-muted">{duree}</p> : null}
      <div className="mt-4">
        <Link
          href={entry.href}
          className={`${OFC_CTA_PRIMARY} inline-flex min-h-10 w-full items-center justify-center px-4 py-2 text-sm sm:w-auto`}
        >
          Voir le programme
        </Link>
      </div>
    </li>
  );
}
