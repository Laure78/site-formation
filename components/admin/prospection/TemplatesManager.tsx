'use client';

import { useState, useTransition } from 'react';
import { useRouter } from 'next/navigation';
import {
  deleteTemplateAction,
  duplicateTemplateAction,
  saveTemplateAction,
} from '@/app/admin/prospection/actions';
import { EMAIL_TYPES, TYPE_STRUCTURES } from '@/lib/prospection/constants';
import type { ProspectingTemplateRow } from '@/lib/prospection/types';

export function TemplatesManager({ templates }: { templates: ProspectingTemplateRow[] }) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();
  const [editing, setEditing] = useState<ProspectingTemplateRow | null>(null);
  const [creating, setCreating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const field =
    'mt-1 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:border-[#377CF3] focus:outline-none';

  const save = (form: HTMLFormElement, id?: string) => {
    const fd = new FormData(form);
    setError(null);
    startTransition(async () => {
      const res = await saveTemplateAction({
        id,
        name: String(fd.get('name') ?? ''),
        target_type: String(fd.get('target_type') ?? '') || null,
        email_type: String(fd.get('email_type') ?? 'premier_contact'),
        subject_template: String(fd.get('subject_template') ?? ''),
        body_template: String(fd.get('body_template') ?? ''),
      });
      if (!res.ok) {
        setError(res.error);
        return;
      }
      setEditing(null);
      setCreating(false);
      router.refresh();
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h2 className="font-display text-lg font-semibold text-slate-900">
          Modèles d’emails ({templates.length})
        </h2>
        <button
          type="button"
          onClick={() => {
            setCreating(true);
            setEditing(null);
          }}
          className="rounded-xl bg-[#377CF3] px-4 py-2.5 text-sm font-semibold text-white"
        >
          + Nouveau modèle
        </button>
      </div>

      {error ? <p className="text-sm text-rose-700">{error}</p> : null}

      {(creating || editing) && (
        <form
          className="space-y-3 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
          onSubmit={(e) => {
            e.preventDefault();
            save(e.currentTarget, editing?.id);
          }}
        >
          <h3 className="font-semibold text-slate-900">
            {editing ? 'Modifier le modèle' : 'Nouveau modèle'}
          </h3>
          <label className="block text-sm">
            Nom
            <input
              name="name"
              required
              defaultValue={editing?.name ?? ''}
              className={field}
            />
          </label>
          <div className="grid gap-3 sm:grid-cols-2">
            <label className="block text-sm">
              Cible
              <select
                name="target_type"
                defaultValue={editing?.target_type ?? ''}
                className={field}
              >
                <option value="">Toutes</option>
                {TYPE_STRUCTURES.map((t) => (
                  <option key={t.value} value={t.value}>
                    {t.label}
                  </option>
                ))}
              </select>
            </label>
            <label className="block text-sm">
              Type d’email
              <select
                name="email_type"
                defaultValue={editing?.email_type ?? 'premier_contact'}
                className={field}
              >
                {EMAIL_TYPES.map((t) => (
                  <option key={t.value} value={t.value}>
                    {t.label}
                  </option>
                ))}
              </select>
            </label>
          </div>
          <label className="block text-sm">
            Objet (variables {'{{prenom}}'}, {'{{entreprise}}'}…)
            <input
              name="subject_template"
              required
              defaultValue={editing?.subject_template ?? ''}
              className={field}
            />
          </label>
          <label className="block text-sm">
            Corps
            <textarea
              name="body_template"
              required
              rows={8}
              defaultValue={editing?.body_template ?? ''}
              className={field}
            />
          </label>
          <div className="flex gap-2">
            <button
              type="submit"
              disabled={pending}
              className="rounded-lg bg-[#377CF3] px-4 py-2 text-sm font-semibold text-white"
            >
              Enregistrer
            </button>
            <button
              type="button"
              onClick={() => {
                setCreating(false);
                setEditing(null);
              }}
              className="rounded-lg border border-slate-200 px-4 py-2 text-sm"
            >
              Annuler
            </button>
          </div>
        </form>
      )}

      <ul className="space-y-3">
        {templates.map((t) => (
          <li
            key={t.id}
            className="rounded-2xl border border-slate-200/80 bg-white p-4 shadow-sm"
          >
            <div className="flex flex-wrap items-start justify-between gap-2">
              <div>
                <p className="font-semibold text-slate-900">{t.name}</p>
                <p className="text-xs text-slate-500">
                  {t.target_type || 'toutes cibles'} · {t.email_type}
                </p>
                <p className="mt-2 text-sm text-slate-600">{t.subject_template}</p>
              </div>
              <div className="flex flex-wrap gap-2">
                <button
                  type="button"
                  className="rounded-lg border border-slate-200 px-3 py-1.5 text-xs font-medium"
                  onClick={() => {
                    setEditing(t);
                    setCreating(false);
                  }}
                >
                  Modifier
                </button>
                <button
                  type="button"
                  disabled={pending}
                  className="rounded-lg border border-slate-200 px-3 py-1.5 text-xs font-medium"
                  onClick={() =>
                    startTransition(async () => {
                      await duplicateTemplateAction(t.id);
                      router.refresh();
                    })
                  }
                >
                  Dupliquer
                </button>
                <button
                  type="button"
                  disabled={pending}
                  className="rounded-lg border border-rose-200 px-3 py-1.5 text-xs font-medium text-rose-700"
                  onClick={() => {
                    if (!confirm('Supprimer ce modèle ?')) return;
                    startTransition(async () => {
                      await deleteTemplateAction(t.id);
                      router.refresh();
                    });
                  }}
                >
                  Supprimer
                </button>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
