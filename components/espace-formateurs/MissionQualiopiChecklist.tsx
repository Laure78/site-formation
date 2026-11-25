import { CheckCircle2 } from 'lucide-react';
import Link from 'next/link';
import type { MissionSessionCheckItem } from '@/lib/extranet-formateurs/qualiopi-compliance';
import { LINKS } from '@/lib/internal-links';

export function MissionQualiopiChecklist({ items }: { items: MissionSessionCheckItem[] }) {
  const done = items.filter((i) => i.ok).length;

  return (
    <section className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm" aria-labelledby="mission-qualiopi-checklist">
      <h2 id="mission-qualiopi-checklist" className="font-display text-lg font-bold text-slate-900">
        Checklist Qualiopi — session
      </h2>
      <p className="mt-1 text-sm text-slate-600">
        Pièces et retours attendus pour la traçabilité et l&apos;indicateur 30 ({done}/{items.length}).
      </p>
      <ul className="mt-4 space-y-2">
        {items.map((item) => (
          <li
            key={item.id}
            className="flex flex-wrap items-start justify-between gap-2 rounded-lg border border-slate-100 px-3 py-2.5 text-sm"
          >
            <div className="flex min-w-0 gap-2">
              {item.ok ? (
                <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600" aria-hidden />
              ) : (
                <span className="mt-1 h-4 w-4 shrink-0 rounded-full border-2 border-slate-300" aria-hidden />
              )}
              <div>
                <p className="font-medium text-slate-900">{item.label}</p>
                {item.hint ? <p className="text-xs text-slate-500">{item.hint}</p> : null}
              </div>
            </div>
            <span className="text-[10px] font-semibold uppercase tracking-wide text-slate-400">
              {item.indicator}
            </span>
          </li>
        ))}
      </ul>
      <p className="mt-4 text-xs text-slate-500">
        Retour détaillé :{' '}
        <Link href={LINKS.espaceFormateursQualite} className="font-medium text-[#377CF3] hover:underline">
          rubrique Qualité
        </Link>
        .
      </p>
    </section>
  );
}