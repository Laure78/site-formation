'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useMemo, useState } from 'react';
import { BookOpen } from 'lucide-react';
import {
  formatEnrolledFr,
  formatRelativeFr,
  type ApprenantFormationCard,
} from '@/lib/espace-apprenant-formations-display';
import { LINKS } from '@/lib/internal-links';

type Tab = 'mes' | 'attente' | 'offres';

export function ApprenantFormationsBoard({
  firstName,
  formations,
}: {
  firstName: string;
  formations: ApprenantFormationCard[];
}) {
  const [tab, setTab] = useState<Tab>('mes');

  const tabs = useMemo(
    () =>
      [
        { id: 'mes' as const, label: 'Mes formations', count: formations.length },
        { id: 'attente' as const, label: 'En attente', count: 0 },
        { id: 'offres' as const, label: 'Toutes les offres', count: 0 },
      ] as const,
    [formations.length]
  );

  return (
    <div className="mx-auto max-w-4xl">
      <div className="text-center">
        <h1 className="font-display text-3xl font-bold tracking-tight text-slate-900 md:text-4xl">
          Bienvenue {firstName}
        </h1>
        <p className="mt-2 text-slate-500">
          Retrouvez et suivez l&apos;avancement de toutes vos formations ici
        </p>
      </div>

      <div
        className="mt-8 flex justify-center gap-1 border-b border-slate-200"
        role="tablist"
        aria-label="Filtrer les formations"
      >
        {tabs.map((t) => {
          const active = tab === t.id;
          return (
            <button
              key={t.id}
              type="button"
              role="tab"
              aria-selected={active}
              onClick={() => setTab(t.id)}
              className={`relative px-4 py-3 text-sm font-semibold transition-colors ${
                active ? 'text-[#377CF3]' : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              {t.label} ({t.count})
              {active && (
                <span className="absolute inset-x-2 -bottom-px h-0.5 rounded-full bg-[#377CF3]" />
              )}
            </button>
          );
        })}
      </div>

      <div className="mt-6 space-y-4">
        {tab !== 'mes' ? (
          <div className="rounded-2xl border border-dashed border-slate-200 bg-white px-6 py-14 text-center text-slate-500">
            {tab === 'attente'
              ? 'Aucune formation en attente.'
              : 'Les offres du catalogue seront bientôt listées ici.'}
            <div className="mt-4">
              <Link
                href={LINKS.formations}
                className="text-sm font-medium text-[#377CF3] hover:underline"
              >
                Voir le catalogue
              </Link>
            </div>
          </div>
        ) : formations.length === 0 ? (
          <div className="rounded-2xl border border-slate-200 bg-white px-6 py-14 text-center shadow-sm">
            <BookOpen size={40} strokeWidth={1.25} className="mx-auto text-slate-300" />
            <p className="mt-4 font-medium text-slate-800">Aucune formation pour l&apos;instant</p>
            <p className="mt-1 text-sm text-slate-500">
              Une fois invitée à une session, vos parcours apparaîtront ici.
            </p>
            <Link
              href={LINKS.formations}
              className="mt-6 inline-flex rounded-xl bg-[#377CF3] px-5 py-2.5 text-sm font-semibold text-white hover:bg-[#2A6BD9]"
            >
              Voir les formations
            </Link>
          </div>
        ) : (
          formations.map((f) => {
            const pct = Math.min(100, Math.max(0, f.progressPercent));
            const relative = formatRelativeFr(f.lastActivityAt);
            const continueLabel = pct >= 100 ? 'Revoir' : pct > 0 ? 'Continuer' : 'Commencer';
            const courseHref = `/espace-apprenant/cours/${f.slug}`;
            const ficheHref = `/cours/${f.slug}`;

            return (
              <article
                key={f.courseId}
                className="overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-[0_2px_8px_rgba(15,23,42,0.05)]"
              >
                <div className="flex flex-col gap-4 p-4 sm:flex-row sm:gap-5 sm:p-5">
                  <div className="relative mx-auto h-28 w-full max-w-[140px] shrink-0 overflow-hidden rounded-xl bg-slate-100 sm:mx-0 sm:h-[100px] sm:w-[140px]">
                    {f.imageUrl ? (
                      <Image
                        src={f.imageUrl}
                        alt=""
                        fill
                        className="object-cover"
                        sizes="140px"
                      />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center text-slate-300">
                        <BookOpen size={32} strokeWidth={1.25} />
                      </div>
                    )}
                  </div>

                  <div className="min-w-0 flex-1">
                    <p className="text-xs text-slate-500">
                      {relative ? (
                        <>
                          Dernière consultation {relative}
                          <span className="text-slate-300"> · </span>
                        </>
                      ) : null}
                      Inscrit le {formatEnrolledFr(f.enrolledAt)}
                    </p>
                    <h2 className="mt-1.5 font-display text-lg font-bold leading-snug text-slate-900 sm:text-xl">
                      {f.title}
                    </h2>

                    <div className="mt-4">
                      <p className="text-sm text-slate-600">
                        {f.completedLessons} / {f.lessonCount} leçon
                        {f.lessonCount === 1 ? '' : 's'} ({pct}%)
                      </p>
                      <div className="mt-2 h-2 w-full overflow-hidden rounded-full bg-slate-100">
                        <div
                          className="h-full rounded-full bg-[#377CF3] transition-all"
                          style={{ width: `${pct}%` }}
                        />
                      </div>
                    </div>

                    <div className="mt-5 flex flex-wrap items-center justify-end gap-3">
                      <Link
                        href={ficheHref}
                        className="text-sm font-medium text-slate-600 hover:text-[#377CF3] hover:underline"
                      >
                        Voir la fiche
                      </Link>
                      <Link
                        href={courseHref}
                        className="inline-flex rounded-lg bg-[#377CF3] px-5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-[#2A6BD9]"
                      >
                        {continueLabel}
                      </Link>
                      {pct >= 100 && (
                        <Link
                          href={`/espace-apprenant/attestation/${f.courseId}`}
                          className="text-sm font-medium text-emerald-700 hover:underline"
                        >
                          Attestation
                        </Link>
                      )}
                    </div>
                  </div>
                </div>
              </article>
            );
          })
        )}
      </div>
    </div>
  );
}
