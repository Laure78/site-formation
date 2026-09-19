'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState, useTransition, type DragEvent } from 'react';
import { Plus, Search, Star } from 'lucide-react';
import { LINKS } from '@/lib/internal-links';
import {
  getColorMeta,
  LIST_CATEGORY_COLORS,
  LIST_CATEGORY_ICONS,
  type CategoryWithLists,
  type ListWithProgress,
} from '@/lib/admin/mon-espace/listes';
import {
  createCategoryAction,
  createListAction,
  deleteCategoryAction,
  reorderCategoriesAction,
  updateCategoryAction,
} from '@/app/admin/mon-espace/listes/actions';

function ProgressMini({ done, total }: { done: number; total: number }) {
  const pct = total === 0 ? 0 : Math.round((done / total) * 100);
  return (
    <div className="mt-1.5">
      <div className="flex items-center justify-between gap-2 text-[11px] text-slate-500">
        <span>
          {done} / {total} terminés
        </span>
        <span>{pct} %</span>
      </div>
      <div className="mt-1 h-1 overflow-hidden rounded-full bg-white/80">
        <div
          className="h-full rounded-full bg-[#377CF3]/70 transition-all"
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
}

function CategoryCard({
  category,
  onDragStart,
  onDragOver,
  onDrop,
}: {
  category: CategoryWithLists;
  onDragStart: () => void;
  onDragOver: (e: DragEvent) => void;
  onDrop: () => void;
}) {
  const [pending, startTransition] = useTransition();
  const [editing, setEditing] = useState(false);
  const [addingList, setAddingList] = useState(false);
  const color = getColorMeta(category.color);

  return (
    <section
      draggable={!editing}
      onDragStart={onDragStart}
      onDragOver={onDragOver}
      onDrop={(e) => {
        e.preventDefault();
        onDrop();
      }}
      className={`flex flex-col rounded-2xl border p-4 shadow-[0_1px_2px_rgba(15,23,42,0.04)] ${color.cardClass}`}
    >
      <header className="flex items-start justify-between gap-2">
        {editing ? (
          <form
            className="w-full space-y-2"
            action={(fd) => {
              startTransition(async () => {
                await updateCategoryAction(fd);
                setEditing(false);
              });
            }}
          >
            <input type="hidden" name="id" value={category.id} />
            <input
              name="title"
              defaultValue={category.title}
              required
              className="w-full rounded-lg border border-slate-200 px-2 py-1.5 text-sm font-semibold"
            />
            <div className="flex flex-wrap gap-1">
              {LIST_CATEGORY_ICONS.map((icon) => (
                <label key={icon} className="cursor-pointer">
                  <input
                    type="radio"
                    name="icon"
                    value={icon}
                    defaultChecked={category.icon === icon}
                    className="peer sr-only"
                  />
                  <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg border border-transparent text-base peer-checked:border-[#377CF3] peer-checked:bg-white">
                    {icon}
                  </span>
                </label>
              ))}
            </div>
            <select
              name="color"
              defaultValue={category.color}
              className="w-full rounded-lg border border-slate-200 bg-white px-2 py-1.5 text-xs"
            >
              {LIST_CATEGORY_COLORS.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.label}
                </option>
              ))}
            </select>
            <div className="flex flex-wrap gap-2">
              <button
                type="submit"
                disabled={pending}
                className="rounded-lg bg-[#377CF3] px-2.5 py-1 text-xs font-semibold text-white"
              >
                Enregistrer
              </button>
              <button
                type="button"
                onClick={() => setEditing(false)}
                className="rounded-lg border border-slate-200 bg-white px-2.5 py-1 text-xs"
              >
                Annuler
              </button>
              <button
                type="button"
                className="ml-auto text-xs text-rose-600"
                onClick={() => {
                  if (
                    !confirm(
                      `Supprimer « ${category.title} » et toutes ses listes ?`
                    )
                  )
                    return;
                  const fd = new FormData();
                  fd.set('id', category.id);
                  startTransition(async () => {
                    await deleteCategoryAction(fd);
                  });
                }}
              >
                Supprimer
              </button>
            </div>
          </form>
        ) : (
          <>
            <button
              type="button"
              onClick={() => setEditing(true)}
              className="flex min-w-0 items-center gap-2 text-left"
              title="Modifier la catégorie"
            >
              <span className="text-xl" aria-hidden>
                {category.icon}
              </span>
              <h2
                className={`font-display text-base font-semibold ${color.accentClass}`}
              >
                {category.title}
              </h2>
            </button>
            <span
              className="cursor-grab text-xs text-slate-400"
              title="Glisser pour réordonner"
            >
              ⋮⋮
            </span>
          </>
        )}
      </header>

      {!editing ? (
        <ul className="mt-3 space-y-2">
          {category.lists.map((list) => (
            <li key={list.id}>
              <Link
                href={`${LINKS.adminMonEspaceListes}/${list.id}`}
                className="block rounded-xl border border-white/90 bg-white/95 px-3 py-2.5 shadow-[0_1px_2px_rgba(15,23,42,0.04)] transition hover:shadow-md"
              >
                <div className="flex items-center gap-1.5">
                  {list.is_favorite ? (
                    <Star
                      size={12}
                      className="fill-amber-400 text-amber-400"
                      aria-hidden
                    />
                  ) : null}
                  <span className="truncate text-sm font-semibold text-slate-900">
                    {list.title}
                  </span>
                </div>
                <ProgressMini
                  done={list.completedCount}
                  total={list.itemCount}
                />
              </Link>
            </li>
          ))}
        </ul>
      ) : null}

      {!editing ? (
        addingList ? (
          <form
            className="mt-3"
            action={(fd) => {
              startTransition(async () => {
                await createListAction(fd);
                setAddingList(false);
              });
            }}
          >
            <input type="hidden" name="category_id" value={category.id} />
            <input
              name="title"
              required
              autoFocus
              placeholder="Nom de la liste"
              className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm"
              onKeyDown={(e) => {
                if (e.key === 'Escape') setAddingList(false);
              }}
            />
            <div className="mt-2 flex gap-2">
              <button
                type="submit"
                disabled={pending}
                className="rounded-lg bg-[#377CF3] px-3 py-1.5 text-xs font-semibold text-white"
              >
                Créer
              </button>
              <button
                type="button"
                onClick={() => setAddingList(false)}
                className="text-xs text-slate-500"
              >
                Annuler
              </button>
            </div>
          </form>
        ) : (
          <button
            type="button"
            onClick={() => setAddingList(true)}
            className="mt-3 inline-flex items-center gap-1 text-sm font-medium text-[#377CF3] hover:underline"
          >
            <Plus size={14} aria-hidden />
            Nouvelle liste
          </button>
        )
      ) : null}
    </section>
  );
}

export function MesListesBoard({
  categories: initialCategories,
  favorites,
  query,
}: {
  categories: CategoryWithLists[];
  favorites: ListWithProgress[];
  query: string;
}) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();
  const serverOrder = initialCategories.map((c) => c.id);
  const [overrideOrder, setOverrideOrder] = useState<string[] | null>(null);
  const [dragIndex, setDragIndex] = useState<number | null>(null);
  const [showNewCat, setShowNewCat] = useState(false);

  const order =
    overrideOrder &&
    overrideOrder.length === serverOrder.length &&
    overrideOrder.every((id) => serverOrder.includes(id))
      ? overrideOrder
      : serverOrder;

  const byId = new Map(initialCategories.map((c) => [c.id, c]));
  const orderedCats = order
    .map((id) => byId.get(id))
    .filter((c): c is CategoryWithLists => Boolean(c));

  function handleDrop(toIndex: number) {
    if (dragIndex === null || dragIndex === toIndex) return;
    const ids = [...order];
    const [moved] = ids.splice(dragIndex, 1);
    if (!moved) return;
    ids.splice(toIndex, 0, moved);
    setOverrideOrder(ids);
    setDragIndex(null);
    startTransition(async () => {
      await reorderCategoriesAction(ids);
      setOverrideOrder(null);
    });
  }

  return (
    <div className="space-y-6">
      <form
        className="relative max-w-md"
        onSubmit={(e) => {
          e.preventDefault();
          const fd = new FormData(e.currentTarget);
          const q = String(fd.get('q') ?? '').trim();
          router.push(
            q
              ? `${LINKS.adminMonEspaceListes}?q=${encodeURIComponent(q)}`
              : LINKS.adminMonEspaceListes
          );
        }}
      >
        <Search
          size={16}
          className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
          aria-hidden
        />
        <input
          type="search"
          name="q"
          defaultValue={query}
          placeholder="Rechercher catégories, listes, éléments…"
          className="w-full rounded-xl border border-slate-200 bg-white py-2.5 pl-10 pr-3 text-sm shadow-sm focus:border-[#377CF3] focus:outline-none focus:ring-1 focus:ring-[#377CF3]"
        />
      </form>

      {favorites.length > 0 ? (
        <section>
          <h2 className="mb-3 flex items-center gap-1.5 text-sm font-semibold uppercase tracking-wide text-slate-400">
            <Star
              size={14}
              className="fill-amber-400 text-amber-400"
              aria-hidden
            />
            Favoris
          </h2>
          <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
            {favorites.map((list) => (
              <Link
                key={list.id}
                href={`${LINKS.adminMonEspaceListes}/${list.id}`}
                className="rounded-xl border border-amber-100 bg-amber-50/50 px-4 py-3 shadow-sm hover:border-amber-200"
              >
                <p className="font-semibold text-slate-900">{list.title}</p>
                <ProgressMini
                  done={list.completedCount}
                  total={list.itemCount}
                />
              </Link>
            ))}
          </div>
        </section>
      ) : null}

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {orderedCats.map((category, index) => (
          <CategoryCard
            key={category.id}
            category={category}
            onDragStart={() => setDragIndex(index)}
            onDragOver={(e) => e.preventDefault()}
            onDrop={() => handleDrop(index)}
          />
        ))}

        <div className="rounded-2xl border border-dashed border-slate-300 bg-white/60 p-4">
          {showNewCat ? (
            <form
              className="space-y-2"
              action={(fd) => {
                startTransition(async () => {
                  await createCategoryAction(fd);
                  setShowNewCat(false);
                });
              }}
            >
              <input
                name="title"
                required
                autoFocus
                placeholder="Nom de la catégorie"
                className="w-full rounded-xl border border-slate-200 px-3 py-2 text-sm"
              />
              <div className="flex flex-wrap gap-1">
                {LIST_CATEGORY_ICONS.slice(0, 8).map((icon) => (
                  <label key={icon} className="cursor-pointer">
                    <input
                      type="radio"
                      name="icon"
                      value={icon}
                      defaultChecked={icon === '📋'}
                      className="peer sr-only"
                    />
                    <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg border border-transparent peer-checked:border-[#377CF3] peer-checked:bg-sky-50">
                      {icon}
                    </span>
                  </label>
                ))}
              </div>
              <select
                name="color"
                defaultValue="blue"
                className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm"
              >
                {LIST_CATEGORY_COLORS.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.label}
                  </option>
                ))}
              </select>
              <div className="flex gap-2">
                <button
                  type="submit"
                  disabled={pending}
                  className="rounded-xl bg-[#377CF3] px-3 py-2 text-sm font-semibold text-white"
                >
                  Créer
                </button>
                <button
                  type="button"
                  onClick={() => setShowNewCat(false)}
                  className="text-sm text-slate-500"
                >
                  Annuler
                </button>
              </div>
            </form>
          ) : (
            <button
              type="button"
              onClick={() => setShowNewCat(true)}
              className="inline-flex items-center gap-1.5 text-sm font-medium text-[#377CF3]"
            >
              <Plus size={16} aria-hidden />
              Nouvelle catégorie
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
