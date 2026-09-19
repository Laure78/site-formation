'use client';

import { useState, useTransition } from 'react';
import { ExternalLink, Pencil, Star, Trash2 } from 'lucide-react';
import {
  createResourceAction,
  deleteResourceAction,
  toggleResourceFavoriteAction,
  updateResourceAction,
} from '@/app/admin/mon-espace/actions';
import {
  RESOURCE_CATEGORIES,
  RESOURCE_KINDS,
  type WorkspaceResource,
} from '@/lib/admin/mon-espace/types';

function ResourceFormFields({
  resource,
}: {
  resource?: WorkspaceResource | null;
}) {
  return (
    <>
      <label className="block text-xs font-semibold uppercase tracking-wide text-slate-400 sm:col-span-2">
        Titre
        <input
          name="title"
          required
          defaultValue={resource?.title ?? ''}
          placeholder="Ex. Modèle convention Constructys"
          className="mt-1 w-full rounded-xl border border-slate-200 px-3 py-2.5 text-sm focus:border-[#377CF3] focus:outline-none focus:ring-1 focus:ring-[#377CF3]"
        />
      </label>
      <label className="block text-xs font-semibold uppercase tracking-wide text-slate-400 sm:col-span-2">
        Description
        <textarea
          name="description"
          rows={2}
          defaultValue={resource?.description ?? ''}
          placeholder="Contexte utile…"
          className="mt-1 w-full resize-y rounded-xl border border-slate-200 px-3 py-2.5 text-sm focus:border-[#377CF3] focus:outline-none focus:ring-1 focus:ring-[#377CF3]"
        />
      </label>
      <label className="block text-xs font-semibold uppercase tracking-wide text-slate-400">
        Type
        <select
          name="kind"
          defaultValue={resource?.kind ?? 'url'}
          className="mt-1 w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm"
        >
          {RESOURCE_KINDS.map((k) => (
            <option key={k.id} value={k.id}>
              {k.label}
            </option>
          ))}
        </select>
      </label>
      <label className="block text-xs font-semibold uppercase tracking-wide text-slate-400">
        Catégorie
        <select
          name="category"
          defaultValue={resource?.category ?? 'autre'}
          className="mt-1 w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm"
        >
          {RESOURCE_CATEGORIES.map((c) => (
            <option key={c.id} value={c.id}>
              {c.label}
            </option>
          ))}
        </select>
      </label>
      <label className="block text-xs font-semibold uppercase tracking-wide text-slate-400 sm:col-span-2">
        Lien
        <input
          name="link"
          type="text"
          defaultValue={resource?.link ?? ''}
          placeholder="https://… ou /admin/…"
          className="mt-1 w-full rounded-xl border border-slate-200 px-3 py-2.5 text-sm focus:border-[#377CF3] focus:outline-none focus:ring-1 focus:ring-[#377CF3]"
        />
      </label>
      <label className="flex items-center gap-2 text-sm text-slate-700 sm:col-span-2">
        <input
          type="checkbox"
          name="is_favorite"
          value="true"
          defaultChecked={resource?.is_favorite ?? false}
          className="rounded border-slate-300 text-[#377CF3]"
        />
        Favori
      </label>
    </>
  );
}

export function ResourceCreateForm() {
  const [pending, startTransition] = useTransition();
  const [open, setOpen] = useState(false);

  if (!open) {
    return (
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="rounded-xl bg-[#377CF3] px-4 py-2.5 text-sm font-semibold text-white hover:bg-[#2d66d6]"
      >
        Nouvelle ressource
      </button>
    );
  }

  return (
    <form
      className="grid gap-3 rounded-2xl border border-dashed border-slate-300 bg-white p-4 shadow-sm sm:grid-cols-2"
      action={(formData) => {
        startTransition(async () => {
          try {
            await createResourceAction(formData);
            setOpen(false);
          } catch (err) {
            alert(err instanceof Error ? err.message : 'Erreur');
          }
        });
      }}
    >
      <ResourceFormFields />
      <div className="flex gap-2 sm:col-span-2">
        <button
          type="button"
          onClick={() => setOpen(false)}
          className="rounded-xl border border-slate-200 px-4 py-2 text-sm font-medium text-slate-700"
        >
          Annuler
        </button>
        <button
          type="submit"
          disabled={pending}
          className="rounded-xl bg-[#377CF3] px-4 py-2 text-sm font-semibold text-white disabled:opacity-60"
        >
          {pending ? 'Création…' : 'Créer'}
        </button>
      </div>
    </form>
  );
}

function ResourceCard({ resource }: { resource: WorkspaceResource }) {
  const [editing, setEditing] = useState(false);
  const [pending, startTransition] = useTransition();
  const kind =
    RESOURCE_KINDS.find((k) => k.id === resource.kind)?.label ?? resource.kind;
  const category =
    RESOURCE_CATEGORIES.find((c) => c.id === resource.category)?.label ??
    resource.category;

  if (editing) {
    return (
      <form
        className="grid gap-3 rounded-2xl border border-[#377CF3]/30 bg-white p-4 shadow-sm sm:grid-cols-2"
        action={(formData) => {
          startTransition(async () => {
            try {
              await updateResourceAction(formData);
              setEditing(false);
            } catch (err) {
              alert(err instanceof Error ? err.message : 'Erreur');
            }
          });
        }}
      >
        <input type="hidden" name="id" value={resource.id} />
        <ResourceFormFields resource={resource} />
        <div className="flex gap-2 sm:col-span-2">
          <button
            type="button"
            onClick={() => setEditing(false)}
            className="rounded-xl border border-slate-200 px-3 py-2 text-sm"
          >
            Annuler
          </button>
          <button
            type="submit"
            disabled={pending}
            className="rounded-xl bg-[#377CF3] px-3 py-2 text-sm font-semibold text-white disabled:opacity-60"
          >
            Enregistrer
          </button>
        </div>
      </form>
    );
  }

  const href = resource.link?.trim() || null;
  const isExternal = href ? /^https?:\/\//i.test(href) : false;

  return (
    <article className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-2">
            <span className="rounded-full bg-slate-100 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-slate-600">
              {kind}
            </span>
            <span className="rounded-full bg-sky-50 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-sky-700">
              {category}
            </span>
            {resource.is_favorite ? (
              <Star size={12} className="fill-amber-400 text-amber-400" aria-hidden />
            ) : null}
          </div>
          <h2 className="mt-2 font-display text-base font-semibold text-slate-900">
            {resource.title}
          </h2>
          {resource.description ? (
            <p className="mt-1 text-sm text-slate-600">{resource.description}</p>
          ) : null}
          {href ? (
            isExternal ? (
              <a
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-2 inline-flex items-center gap-1 text-sm font-medium text-[#377CF3] hover:underline"
              >
                Ouvrir le lien
                <ExternalLink size={12} aria-hidden />
              </a>
            ) : (
              <a
                href={href}
                className="mt-2 inline-flex items-center gap-1 text-sm font-medium text-[#377CF3] hover:underline"
              >
                Ouvrir
                <ExternalLink size={12} aria-hidden />
              </a>
            )
          ) : null}
        </div>
        <div className="flex shrink-0 gap-1">
          <button
            type="button"
            className={`rounded-lg border p-2 ${
              resource.is_favorite
                ? 'border-amber-200 bg-amber-50 text-amber-600'
                : 'border-slate-200 text-slate-400 hover:text-amber-500'
            }`}
            onClick={() => {
              const fd = new FormData();
              fd.set('id', resource.id);
              fd.set('is_favorite', String(resource.is_favorite));
              startTransition(async () => {
                await toggleResourceFavoriteAction(fd);
              });
            }}
            aria-label="Favori"
          >
            <Star
              size={16}
              className={resource.is_favorite ? 'fill-current' : undefined}
            />
          </button>
          <button
            type="button"
            className="rounded-lg border border-slate-200 p-2 text-slate-400 hover:text-slate-700"
            onClick={() => setEditing(true)}
            aria-label="Modifier"
          >
            <Pencil size={16} />
          </button>
          <button
            type="button"
            className="rounded-lg border border-slate-200 p-2 text-slate-400 hover:text-rose-600"
            aria-label="Supprimer"
            onClick={() => {
              if (!confirm('Supprimer cette ressource ?')) return;
              const fd = new FormData();
              fd.set('id', resource.id);
              startTransition(async () => {
                await deleteResourceAction(fd);
              });
            }}
          >
            <Trash2 size={16} />
          </button>
        </div>
      </div>
    </article>
  );
}

export function ResourcesList({ resources }: { resources: WorkspaceResource[] }) {
  if (resources.length === 0) {
    return (
      <p className="rounded-2xl border border-dashed border-slate-200 bg-slate-50/70 px-4 py-8 text-center text-sm text-slate-500">
        Aucune ressource. Ajoutez un lien, un prompt, un modèle ou une procédure.
      </p>
    );
  }

  return (
    <div className="space-y-3">
      {resources.map((r) => (
        <ResourceCard key={r.id} resource={r} />
      ))}
    </div>
  );
}
