'use client';

import { useState, useTransition } from 'react';
import Link from 'next/link';
import {
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  Circle,
  Clock,
  ExternalLink,
} from 'lucide-react';
import {
  updateChecklistEntryAction,
  setChecklistItemEnabledAction,
} from '@/app/admin/mon-espace/suivi-administratif/actions';
import {
  PILOTAGE_STATUS_META,
  type ChecklistItemStatus,
  type SessionSuiviRow,
} from '@/lib/admin/mon-espace/suivi-administratif';

function formatDateFr(dateKey: string | null): string {
  if (!dateKey) return 'Date non renseignée';
  const [y, m, d] = dateKey.split('-').map(Number);
  return new Date(y!, (m ?? 1) - 1, d ?? 1).toLocaleDateString('fr-FR', {
    weekday: 'short',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
}

function StatusSelect({
  entryId,
  value,
  disabled,
}: {
  entryId: string;
  value: ChecklistItemStatus;
  disabled?: boolean;
}) {
  const [pending, startTransition] = useTransition();

  return (
    <select
      value={value}
      disabled={disabled || pending}
      onChange={(e) => {
        const fd = new FormData();
        fd.set('entry_id', entryId);
        fd.set('status', e.target.value);
        startTransition(async () => {
          await updateChecklistEntryAction(fd);
        });
      }}
      className="rounded-lg border border-slate-200 bg-white px-2 py-1.5 text-xs font-medium text-slate-700 disabled:opacity-60"
    >
      <option value="todo">À préparer</option>
      <option value="waiting">En attente</option>
      <option value="done">Terminé</option>
    </select>
  );
}

function SessionCard({ session }: { session: SessionSuiviRow }) {
  const [open, setOpen] = useState(
    session.pilotageStatus === 'en_retard' || session.pilotageStatus === 'a_preparer'
  );
  const [pending, startTransition] = useTransition();
  const meta = PILOTAGE_STATUS_META[session.pilotageStatus];

  return (
    <article className="overflow-hidden rounded-2xl border border-slate-200/90 bg-white shadow-sm">
      <div className="flex flex-col gap-3 border-b border-slate-100 p-4 sm:flex-row sm:items-start sm:justify-between sm:p-5">
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-2">
            <span
              className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-semibold ${meta.badge}`}
            >
              {meta.label}
            </span>
            {session.sessionCancelled ? (
              <span className="rounded-full bg-slate-100 px-2.5 py-0.5 text-xs font-medium text-slate-600">
                Session annulée
              </span>
            ) : null}
          </div>
          <h2 className="mt-2 font-display text-lg font-semibold text-slate-900">
            {session.title}
          </h2>
          <p className="mt-1 text-sm text-slate-500">
            {formatDateFr(session.sessionEndsOn)}
            {' · '}
            {session.participantCount} participant
            {session.participantCount === 1 ? '' : 's'}
            {session.satisfactionCount > 0
              ? ` · ${session.satisfactionCount} satisfaction`
              : ''}
          </p>
          <p className="mt-1 text-xs text-slate-400">
            Checklist : {session.doneCount}/{session.enabledCount} terminé
            {session.waitingCount > 0 ? ` · ${session.waitingCount} en attente` : ''}
          </p>
        </div>

        <div className="flex shrink-0 flex-wrap items-center gap-2">
          <Link
            href={`/admin/formations/${session.courseId}`}
            className="inline-flex items-center gap-1 rounded-xl border border-slate-200 px-3 py-2 text-xs font-medium text-slate-700 hover:bg-slate-50"
          >
            Fiche formation
            <ExternalLink size={12} aria-hidden />
          </Link>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            className="inline-flex items-center gap-1 rounded-xl bg-[#377CF3] px-3 py-2 text-xs font-semibold text-white hover:bg-[#2d66d6]"
            aria-expanded={open}
          >
            Checklist
            {open ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
          </button>
        </div>
      </div>

      {open ? (
        <ul className="divide-y divide-slate-100">
          {session.items.map((item) => {
            const { definition, entry, effectiveStatus, autoDerived, autoHint } = item;
            return (
              <li
                key={entry.id}
                className={`flex flex-col gap-3 px-4 py-3 sm:flex-row sm:items-center sm:justify-between sm:px-5 ${
                  entry.enabled ? 'bg-white' : 'bg-slate-50/80 opacity-70'
                }`}
              >
                <div className="min-w-0 flex-1">
                  <div className="flex items-start gap-2">
                    {effectiveStatus === 'done' ? (
                      <CheckCircle2
                        size={16}
                        className="mt-0.5 shrink-0 text-emerald-500"
                        aria-hidden
                      />
                    ) : effectiveStatus === 'waiting' ? (
                      <Clock
                        size={16}
                        className="mt-0.5 shrink-0 text-amber-500"
                        aria-hidden
                      />
                    ) : (
                      <Circle
                        size={16}
                        className="mt-0.5 shrink-0 text-slate-300"
                        aria-hidden
                      />
                    )}
                    <div>
                      <p className="text-sm font-semibold text-slate-900">
                        {definition.label}
                        {!entry.enabled ? (
                          <span className="ml-2 text-xs font-normal text-slate-400">
                            (non applicable)
                          </span>
                        ) : null}
                      </p>
                      {definition.description ? (
                        <p className="text-xs text-slate-500">{definition.description}</p>
                      ) : null}
                      {autoHint ? (
                        <p className="mt-0.5 text-[11px] text-[#377CF3]">{autoHint}</p>
                      ) : null}
                    </div>
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-2 sm:justify-end">
                  <label className="flex items-center gap-1.5 text-xs text-slate-600">
                    <input
                      type="checkbox"
                      checked={entry.enabled}
                      disabled={pending}
                      onChange={(e) => {
                        const fd = new FormData();
                        fd.set('entry_id', entry.id);
                        fd.set('enabled', e.target.checked ? 'true' : 'false');
                        startTransition(async () => {
                          await setChecklistItemEnabledAction(fd);
                        });
                      }}
                      className="rounded border-slate-300 text-[#377CF3]"
                    />
                    Applicable
                  </label>
                  <StatusSelect
                    entryId={entry.id}
                    value={autoDerived ? 'done' : entry.status}
                    disabled={!entry.enabled || autoDerived}
                  />
                </div>
              </li>
            );
          })}
        </ul>
      ) : null}
    </article>
  );
}

export function SuiviSessionList({ sessions }: { sessions: SessionSuiviRow[] }) {
  if (sessions.length === 0) {
    return (
      <p className="rounded-2xl border border-dashed border-slate-200 bg-slate-50/70 px-4 py-10 text-center text-sm text-slate-500">
        Aucune session ne correspond aux filtres. Ajoutez une date de fin de session sur une
        fiche formation, ou activez « Inclure sans date de session ».
      </p>
    );
  }

  return (
    <div className="space-y-4">
      {sessions.map((session) => (
        <SessionCard key={session.courseId} session={session} />
      ))}
    </div>
  );
}
