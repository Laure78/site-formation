import Link from 'next/link';
import type { ApprenantListRow } from '@/lib/admin/apprenants-dashboard';
import { RenvoyerInvitationButton } from '@/app/admin/apprenants/RenvoyerInvitationButton';

export function ApprenantsListTable({ rows }: { rows: ApprenantListRow[] }) {
  if (rows.length === 0) {
    return (
      <div className="rounded-xl border border-dashed border-slate-200 bg-white px-6 py-14 text-center text-slate-500">
        Aucun apprenant pour le moment — utilisez le bloc ci-dessus pour inviter ou importer.
      </div>
    );
  }

  return (
    <div className="overflow-x-auto rounded-xl border border-slate-200 bg-white shadow-sm">
      <table className="w-full min-w-[520px] text-left">
        <thead>
          <tr className="border-b border-slate-200 bg-slate-50/90">
            <th className="px-4 py-3 text-xs font-semibold uppercase tracking-wide text-slate-600">
              Apprenant
            </th>
            <th className="hidden px-4 py-3 text-xs font-semibold uppercase tracking-wide text-slate-600 md:table-cell">
              Formations
            </th>
            <th className="px-4 py-3 text-xs font-semibold uppercase tracking-wide text-slate-600">
              Statut
            </th>
            <th className="hidden px-4 py-3 text-xs font-semibold uppercase tracking-wide text-slate-600 sm:table-cell">
              Activité
            </th>
            <th className="px-4 py-3 text-right text-xs font-semibold uppercase tracking-wide text-slate-600">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100">
          {rows.map((row) => (
            <tr key={row.id} className="align-top hover:bg-slate-50/50">
              <td className="px-4 py-3">
                <Link
                  href={`/admin/apprenants/${row.id}`}
                  className="font-medium text-slate-900 hover:text-[var(--accent)]"
                >
                  {row.name}
                </Link>
                <p className="mt-0.5 truncate text-sm text-slate-600">{row.email}</p>
                <p className="mt-1 text-xs text-slate-400 md:hidden">
                  {row.enrollments.length === 0
                    ? 'Pas de formation'
                    : row.enrollments.map((e) => `${e.title} (${e.progress} %)`).join(' · ')}
                </p>
                <p className="mt-1 text-xs text-slate-400 sm:hidden">Dernière activité : {row.lastActivityLabel}</p>
              </td>
              <td className="hidden px-4 py-3 md:table-cell">
                {row.enrollments.length === 0 ? (
                  <span className="text-sm text-slate-400">—</span>
                ) : (
                  <ul className="space-y-1">
                    {row.enrollments.map((e) => (
                      <li key={`${row.id}-${e.title}`} className="text-sm text-slate-700">
                        <span className="text-slate-900">{e.title}</span>
                        <span className="text-slate-500"> · {e.progress} %</span>
                      </li>
                    ))}
                  </ul>
                )}
              </td>
              <td className="px-4 py-3">
                <span
                  className={`inline-flex rounded-full border px-2.5 py-0.5 text-xs font-medium ${row.access.color}`}
                >
                  {row.access.label}
                </span>
                <p className="mt-1 text-xs text-slate-400">Depuis {row.createdLabel}</p>
              </td>
              <td className="hidden px-4 py-3 text-sm text-slate-600 sm:table-cell">
                {row.lastActivityLabel}
              </td>
              <td className="px-4 py-3 text-right">
                <RowActions row={row} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function RowActions({ row }: { row: ApprenantListRow }) {
  return (
    <div className="flex flex-col items-end gap-2">
      <Link href={`/admin/apprenants/${row.id}`} className="text-sm font-medium text-[var(--accent)] hover:underline">
        Ouvrir
      </Link>
      {row.showResend && row.pendingInvitation ? (
        <RenvoyerInvitationButton invitation={row.pendingInvitation} />
      ) : null}
    </div>
  );
}