'use client';

import { useTransition } from 'react';
import {
  createOrganisationEventAction,
  deleteOrganisationEventAction,
  updateOrganisationEventAction,
} from '@/app/admin/mon-espace/agenda/actions';
import {
  toInputDateValue,
  toInputTimeValue,
} from '@/lib/mon-espace/agenda-dates';
import {
  AGENDA_CATEGORIES,
  type WorkspaceEvent,
} from '@/lib/mon-espace/agenda-types';

type Props = {
  open: boolean;
  onClose: () => void;
  defaultDateKey?: string;
  event?: WorkspaceEvent | null;
};

export function OrganisationEventFormDialog({
  open,
  onClose,
  defaultDateKey,
  event,
}: Props) {
  const [pending, startTransition] = useTransition();
  const isEdit = Boolean(event);

  if (!open) return null;

  const todayKey = toInputDateValue(new Date());
  const dateDefault =
    event ? toInputDateValue(new Date(event.start_at)) : defaultDateKey ?? todayKey;
  const startDefault = event ? toInputTimeValue(event.start_at) : '09:00';
  const endDefault = event ? toInputTimeValue(event.end_at) : '10:00';

  return (
    <div
      className="fixed inset-0 z-50 flex items-end justify-center bg-black/40 p-0 sm:items-center sm:p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="org-agenda-event-form-title"
      onClick={onClose}
    >
      <div
        className="max-h-[92vh] w-full max-w-lg overflow-y-auto rounded-t-2xl border border-slate-200 bg-white p-5 shadow-xl sm:rounded-2xl sm:p-6"
        onClick={(e) => e.stopPropagation()}
      >
        <h2
          id="org-agenda-event-form-title"
          className="font-display text-lg font-semibold text-slate-900"
        >
          {isEdit ? 'Modifier l’événement' : 'Nouvel événement'}
        </h2>
        <p className="mt-1 text-sm text-slate-500">
          Titre, date, horaires, catégorie — description optionnelle.
        </p>

        <form
          className="mt-5 space-y-4"
          action={(formData) => {
            formData.set('tz_offset', String(new Date().getTimezoneOffset()));
            startTransition(async () => {
              try {
                if (isEdit) await updateOrganisationEventAction(formData);
                else await createOrganisationEventAction(formData);
                onClose();
              } catch (err) {
                alert(err instanceof Error ? err.message : 'Erreur');
              }
            });
          }}
        >
          {event ? <input type="hidden" name="id" value={event.id} /> : null}

          <label className="block text-xs font-semibold uppercase tracking-wide text-slate-400">
            Titre
            <input
              name="title"
              required
              defaultValue={event?.title ?? ''}
              placeholder="Ex. Relance dossier Constructys"
              className="mt-1 w-full rounded-xl border border-slate-200 px-3 py-2.5 text-sm text-slate-900 focus:border-[#377CF3] focus:outline-none focus:ring-1 focus:ring-[#377CF3]"
            />
          </label>

          <div className="grid gap-3 sm:grid-cols-3">
            <label className="block text-xs font-semibold uppercase tracking-wide text-slate-400">
              Date
              <input
                type="date"
                name="date"
                required
                defaultValue={dateDefault}
                className="mt-1 w-full rounded-xl border border-slate-200 px-3 py-2.5 text-sm focus:border-[#377CF3] focus:outline-none focus:ring-1 focus:ring-[#377CF3]"
              />
            </label>
            <label className="block text-xs font-semibold uppercase tracking-wide text-slate-400">
              Début
              <input
                type="time"
                name="start_time"
                required
                defaultValue={startDefault}
                className="mt-1 w-full rounded-xl border border-slate-200 px-3 py-2.5 text-sm focus:border-[#377CF3] focus:outline-none focus:ring-1 focus:ring-[#377CF3]"
              />
            </label>
            <label className="block text-xs font-semibold uppercase tracking-wide text-slate-400">
              Fin
              <input
                type="time"
                name="end_time"
                required
                defaultValue={endDefault}
                className="mt-1 w-full rounded-xl border border-slate-200 px-3 py-2.5 text-sm focus:border-[#377CF3] focus:outline-none focus:ring-1 focus:ring-[#377CF3]"
              />
            </label>
          </div>

          <label className="block text-xs font-semibold uppercase tracking-wide text-slate-400">
            Catégorie
            <select
              name="category"
              defaultValue={event?.category ?? 'autre'}
              className="mt-1 w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm focus:border-[#377CF3] focus:outline-none focus:ring-1 focus:ring-[#377CF3]"
            >
              {AGENDA_CATEGORIES.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.label}
                </option>
              ))}
            </select>
          </label>

          <label className="block text-xs font-semibold uppercase tracking-wide text-slate-400">
            Description <span className="font-normal normal-case">(optionnel)</span>
            <textarea
              name="description"
              rows={3}
              defaultValue={event?.description ?? ''}
              placeholder="Détails utiles…"
              className="mt-1 w-full resize-y rounded-xl border border-slate-200 px-3 py-2.5 text-sm focus:border-[#377CF3] focus:outline-none focus:ring-1 focus:ring-[#377CF3]"
            />
          </label>

          <div className="flex flex-wrap items-center justify-between gap-2 border-t border-slate-100 pt-4">
            {isEdit && event ? (
              <button
                type="button"
                disabled={pending}
                className="rounded-xl px-3 py-2 text-sm font-medium text-rose-600 hover:bg-rose-50 disabled:opacity-50"
                onClick={() => {
                  if (!confirm('Supprimer cet événement ?')) return;
                  const fd = new FormData();
                  fd.set('id', event.id);
                  startTransition(async () => {
                    await deleteOrganisationEventAction(fd);
                    onClose();
                  });
                }}
              >
                Supprimer
              </button>
            ) : (
              <span />
            )}
            <div className="flex gap-2">
              <button
                type="button"
                onClick={onClose}
                className="rounded-xl border border-slate-200 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50"
              >
                Annuler
              </button>
              <button
                type="submit"
                disabled={pending}
                className="rounded-xl bg-[#377CF3] px-4 py-2 text-sm font-semibold text-white hover:bg-[#2d66d6] disabled:opacity-60"
              >
                {pending ? 'Enregistrement…' : isEdit ? 'Enregistrer' : 'Créer'}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
