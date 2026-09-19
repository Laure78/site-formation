'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useRef, useState, useTransition, type DragEvent } from 'react';
import {
  Archive,
  ArrowLeft,
  Copy,
  GripVertical,
  Pencil,
  Star,
  Trash2,
} from 'lucide-react';
import { LINKS } from '@/lib/internal-links';
import type {
  WorkspaceList,
  WorkspaceListCategory,
  WorkspaceListItem,
} from '@/lib/admin/mon-espace/listes';
import {
  addListItemAction,
  archiveListAction,
  deleteListAction,
  deleteListItemAction,
  duplicateListAction,
  moveListAction,
  reorderListItemsAction,
  toggleListFavoriteAction,
  toggleListItemAction,
  updateListAction,
  updateListItemAction,
} from '@/app/admin/mon-espace/listes/actions';

function QuickAdd({ listId }: { listId: string }) {
  const [pending, startTransition] = useTransition();
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <form
      className="mt-3"
      action={(fd) => {
        const title = String(fd.get('title') ?? '').trim();
        if (!title) return;
        startTransition(async () => {
          await addListItemAction(fd);
          if (inputRef.current) {
            inputRef.current.value = '';
            inputRef.current.focus();
          }
        });
      }}
    >
      <input type="hidden" name="list_id" value={listId} />
      <div className="flex items-center gap-2 rounded-xl border border-dashed border-slate-300 bg-white px-3 py-2 focus-within:border-[#377CF3]">
        <span className="text-sm font-medium text-[#377CF3]">+</span>
        <input
          ref={inputRef}
          name="title"
          placeholder="Ajouter un élément"
          disabled={pending}
          className="min-w-0 flex-1 border-0 bg-transparent text-sm text-slate-900 outline-none placeholder:text-slate-400"
          autoComplete="off"
        />
      </div>
    </form>
  );
}

function ItemRow({
  item,
  listId,
  onDragStart,
  onDragOver,
  onDrop,
}: {
  item: WorkspaceListItem;
  listId: string;
  onDragStart: () => void;
  onDragOver: (e: DragEvent) => void;
  onDrop: () => void;
}) {
  const [pending, startTransition] = useTransition();
  const [editing, setEditing] = useState(false);
  const [showNote, setShowNote] = useState(Boolean(item.note));

  if (editing) {
    return (
      <li className="rounded-xl border border-[#377CF3]/30 bg-white p-3 shadow-sm">
        <form
          className="space-y-2"
          action={(fd) => {
            startTransition(async () => {
              await updateListItemAction(fd);
              setEditing(false);
            });
          }}
        >
          <input type="hidden" name="id" value={item.id} />
          <input type="hidden" name="list_id" value={listId} />
          <input
            name="title"
            required
            defaultValue={item.title}
            autoFocus
            className="w-full rounded-lg border border-slate-200 px-2 py-1.5 text-sm"
          />
          <textarea
            name="note"
            rows={2}
            defaultValue={item.note ?? ''}
            placeholder="Note optionnelle…"
            className="w-full rounded-lg border border-slate-200 px-2 py-1.5 text-sm"
          />
          <div className="flex gap-2">
            <button
              type="submit"
              disabled={pending}
              className="rounded-lg bg-[#377CF3] px-2.5 py-1 text-xs font-semibold text-white"
            >
              OK
            </button>
            <button
              type="button"
              onClick={() => setEditing(false)}
              className="text-xs text-slate-500"
            >
              Annuler
            </button>
          </div>
        </form>
      </li>
    );
  }

  return (
    <li
      draggable
      onDragStart={onDragStart}
      onDragOver={onDragOver}
      onDrop={(e) => {
        e.preventDefault();
        onDrop();
      }}
      className={`group flex items-start gap-2 rounded-xl border bg-white px-2 py-2.5 shadow-sm ${
        item.completed
          ? 'border-slate-100 opacity-60'
          : 'border-slate-200/80'
      }`}
    >
      <button
        type="button"
        className="mt-0.5 cursor-grab touch-none text-slate-300 hover:text-slate-500"
        aria-label="Réordonner"
        tabIndex={-1}
      >
        <GripVertical size={16} />
      </button>
      <input
        type="checkbox"
        checked={item.completed}
        disabled={pending}
        onChange={() => {
          const fd = new FormData();
          fd.set('id', item.id);
          fd.set('list_id', listId);
          fd.set('completed', String(item.completed));
          startTransition(async () => {
            await toggleListItemAction(fd);
          });
        }}
        className="mt-1 h-4 w-4 rounded border-slate-300 text-[#377CF3] focus:ring-[#377CF3]"
      />
      <div className="min-w-0 flex-1">
        <button
          type="button"
          onClick={() => setEditing(true)}
          className={`w-full text-left text-sm ${
            item.completed
              ? 'text-slate-400 line-through'
              : 'font-medium text-slate-900'
          }`}
        >
          {item.title}
        </button>
        {showNote || item.note ? (
          <p className="mt-0.5 text-xs text-slate-500">
            {item.note || (
              <button
                type="button"
                className="text-[#377CF3]"
                onClick={() => setEditing(true)}
              >
                + Note
              </button>
            )}
          </p>
        ) : (
          <button
            type="button"
            onClick={() => {
              setShowNote(true);
              setEditing(true);
            }}
            className="mt-0.5 text-[11px] text-slate-300 opacity-0 transition group-hover:opacity-100 hover:text-[#377CF3]"
          >
            + Note
          </button>
        )}
      </div>
      <button
        type="button"
        className="rounded p-1 text-slate-300 opacity-0 hover:text-rose-600 group-hover:opacity-100"
        aria-label="Supprimer"
        onClick={() => {
          const fd = new FormData();
          fd.set('id', item.id);
          fd.set('list_id', listId);
          startTransition(async () => {
            await deleteListItemAction(fd);
          });
        }}
      >
        <Trash2 size={14} />
      </button>
    </li>
  );
}

export function ListeDetailView({
  list,
  category,
  items: initialItems,
  categories,
}: {
  list: WorkspaceList;
  category: WorkspaceListCategory;
  items: WorkspaceListItem[];
  categories: WorkspaceListCategory[];
}) {
  const router = useRouter();
  const [, startTransition] = useTransition();
  const [hideDone, setHideDone] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [renaming, setRenaming] = useState(false);
  const serverOrder = initialItems.map((i) => i.id);
  const [overrideOrder, setOverrideOrder] = useState<string[] | null>(null);
  const [dragIndex, setDragIndex] = useState<number | null>(null);

  const order =
    overrideOrder &&
    overrideOrder.every((id) => serverOrder.includes(id)) &&
    serverOrder.every((id) => overrideOrder.includes(id))
      ? overrideOrder
      : serverOrder;

  const byId = new Map(initialItems.map((i) => [i.id, i]));
  const ordered = order
    .map((id) => byId.get(id))
    .filter((i): i is WorkspaceListItem => Boolean(i));

  const visible = hideDone ? ordered.filter((i) => !i.completed) : ordered;
  const done = initialItems.filter((i) => i.completed).length;
  const total = initialItems.length;
  const pct = total === 0 ? 0 : Math.round((done / total) * 100);

  function handleDrop(toIndex: number) {
    if (dragIndex === null) return;
    const full = ordered.map((i) => i.id);
    const visibleIds = visible.map((i) => i.id);
    const fromId = visibleIds[dragIndex];
    const toId = visibleIds[toIndex];
    if (!fromId || !toId || fromId === toId) {
      setDragIndex(null);
      return;
    }
    const fromFull = full.indexOf(fromId);
    const toFull = full.indexOf(toId);
    if (fromFull < 0 || toFull < 0) return;
    const next = [...full];
    const [moved] = next.splice(fromFull, 1);
    if (!moved) return;
    next.splice(toFull, 0, moved);
    setOverrideOrder(next);
    setDragIndex(null);
    startTransition(async () => {
      await reorderListItemsAction(list.id, next);
      setOverrideOrder(null);
    });
  }

  return (
    <div className="mx-auto max-w-xl space-y-5">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <Link
            href={LINKS.adminMonEspaceListes}
            className="inline-flex items-center gap-1 text-sm text-slate-500 hover:text-[#377CF3]"
          >
            <ArrowLeft size={14} aria-hidden />
            Mes listes
          </Link>
          <p className="mt-2 text-sm text-slate-400">
            {category.icon} {category.title}
          </p>
          {renaming ? (
            <form
              className="mt-1 flex gap-2"
              action={(fd) => {
                startTransition(async () => {
                  await updateListAction(fd);
                  setRenaming(false);
                });
              }}
            >
              <input type="hidden" name="id" value={list.id} />
              <input
                name="title"
                defaultValue={list.title}
                required
                autoFocus
                className="rounded-xl border border-slate-200 px-3 py-1.5 font-display text-xl font-bold"
              />
              <button
                type="submit"
                className="rounded-xl bg-[#377CF3] px-3 py-1.5 text-sm text-white"
              >
                OK
              </button>
            </form>
          ) : (
            <h1 className="mt-1 font-display text-2xl font-bold text-slate-900 md:text-3xl">
              {list.title}
            </h1>
          )}
        </div>
        <div className="relative flex gap-1">
          <button
            type="button"
            className={`rounded-xl border p-2 ${
              list.is_favorite
                ? 'border-amber-200 bg-amber-50 text-amber-600'
                : 'border-slate-200 text-slate-400'
            }`}
            onClick={() => {
              const fd = new FormData();
              fd.set('id', list.id);
              fd.set('is_favorite', String(list.is_favorite));
              startTransition(async () => {
                await toggleListFavoriteAction(fd);
              });
            }}
            aria-label="Favori"
          >
            <Star
              size={18}
              className={list.is_favorite ? 'fill-current' : undefined}
            />
          </button>
          <button
            type="button"
            className="rounded-xl border border-slate-200 p-2 text-slate-500"
            onClick={() => setMenuOpen((v) => !v)}
            aria-expanded={menuOpen}
          >
            <Pencil size={18} />
          </button>
          {menuOpen ? (
            <div className="absolute right-0 top-12 z-20 w-52 rounded-xl border border-slate-200 bg-white p-1 shadow-lg">
              <button
                type="button"
                className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left text-sm hover:bg-slate-50"
                onClick={() => {
                  setRenaming(true);
                  setMenuOpen(false);
                }}
              >
                Modifier le nom
              </button>
              <form
                action={(fd) => {
                  startTransition(async () => {
                    await moveListAction(fd);
                    setMenuOpen(false);
                  });
                }}
                className="px-2 py-1"
              >
                <input type="hidden" name="id" value={list.id} />
                <label className="block text-[10px] font-semibold uppercase text-slate-400">
                  Déplacer
                  <select
                    name="category_id"
                    defaultValue={list.category_id}
                    className="mt-1 w-full rounded-lg border border-slate-200 px-2 py-1.5 text-sm"
                    onChange={(e) => e.currentTarget.form?.requestSubmit()}
                  >
                    {categories.map((c) => (
                      <option key={c.id} value={c.id}>
                        {c.icon} {c.title}
                      </option>
                    ))}
                  </select>
                </label>
              </form>
              <button
                type="button"
                className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left text-sm hover:bg-slate-50"
                onClick={() => {
                  const fd = new FormData();
                  fd.set('id', list.id);
                  startTransition(async () => {
                    await duplicateListAction(fd);
                    setMenuOpen(false);
                  });
                }}
              >
                <Copy size={14} /> Dupliquer
              </button>
              <button
                type="button"
                className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left text-sm hover:bg-slate-50"
                onClick={() => {
                  const fd = new FormData();
                  fd.set('id', list.id);
                  fd.set('archived', String(list.archived));
                  startTransition(async () => {
                    await archiveListAction(fd);
                    setMenuOpen(false);
                    router.push(LINKS.adminMonEspaceListes);
                  });
                }}
              >
                <Archive size={14} />{' '}
                {list.archived ? 'Désarchiver' : 'Archiver'}
              </button>
              <button
                type="button"
                className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left text-sm text-rose-600 hover:bg-rose-50"
                onClick={() => {
                  if (!confirm('Supprimer cette liste ?')) return;
                  const fd = new FormData();
                  fd.set('id', list.id);
                  startTransition(async () => {
                    await deleteListAction(fd);
                    router.push(LINKS.adminMonEspaceListes);
                  });
                }}
              >
                <Trash2 size={14} /> Supprimer
              </button>
            </div>
          ) : null}
        </div>
      </div>

      <div>
        <div className="flex items-center justify-between text-sm text-slate-600">
          <span>
            {done} / {total} terminés
          </span>
          <span>{pct} %</span>
        </div>
        <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-slate-100">
          <div
            className="h-full rounded-full bg-[#377CF3] transition-all"
            style={{ width: `${pct}%` }}
          />
        </div>
      </div>

      <label className="flex items-center gap-2 text-sm text-slate-600">
        <input
          type="checkbox"
          checked={hideDone}
          onChange={(e) => setHideDone(e.target.checked)}
          className="rounded border-slate-300 text-[#377CF3]"
        />
        Masquer les éléments terminés
      </label>

      <ul className="space-y-2">
        {visible.map((item, index) => (
          <ItemRow
            key={item.id}
            item={item}
            listId={list.id}
            onDragStart={() => setDragIndex(index)}
            onDragOver={(e) => e.preventDefault()}
            onDrop={() => handleDrop(index)}
          />
        ))}
      </ul>

      {visible.length === 0 ? (
        <p className="text-center text-sm text-slate-400">
          {hideDone && total > 0
            ? 'Tous les éléments sont terminés.'
            : 'Liste vide — ajoutez un premier élément.'}
        </p>
      ) : null}

      <QuickAdd listId={list.id} />
    </div>
  );
}
