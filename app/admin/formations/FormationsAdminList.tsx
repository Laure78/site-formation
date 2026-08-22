'use client';

import { useMemo, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  Plus,
  GripHorizontal,
  Eye,
  Copy,
  ExternalLink,
  MoreVertical,
  Tag,
  BookOpen,
  Users,
  ShoppingCart,
  ArrowUpDown,
  RefreshCw,
} from 'lucide-react';
import { SyncCatalogueLmsButton } from './SyncCatalogueLmsButton';

export type AdminFormationCard = {
  id: string;
  slug: string;
  title: string;
  imageUrl: string | null;
  priceLabel: string;
  published: boolean;
  createdAt: string;
  updatedAt: string;
  lessonCount: number;
  learnerCount: number;
  catalogueRef: string | null;
};

function formatFrDate(iso: string): string {
  try {
    return new Date(iso).toLocaleDateString('fr-FR', {
      day: '2-digit',
      month: '2-digit',
      year: '2-digit',
    });
  } catch {
    return '—';
  }
}

type SortKey = 'ordre' | 'title' | 'updated' | 'created';

export function FormationsAdminList({
  formations,
  catalogueTotal,
  missingCount,
  missingLabels,
}: {
  formations: AdminFormationCard[];
  catalogueTotal: number;
  missingCount: number;
  missingLabels: string;
}) {
  const [query, setQuery] = useState('');
  const [status, setStatus] = useState<'tous' | 'publiee' | 'cachee'>('tous');
  const [sortBy, setSortBy] = useState<SortKey>('ordre');
  const [sortAsc, setSortAsc] = useState(true);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    let list = formations.filter((f) => {
      if (status === 'publiee' && !f.published) return false;
      if (status === 'cachee' && f.published) return false;
      if (!q) return true;
      return (
        f.title.toLowerCase().includes(q) ||
        f.slug.toLowerCase().includes(q) ||
        (f.catalogueRef?.toLowerCase().includes(q) ?? false)
      );
    });

    list = [...list].sort((a, b) => {
      let cmp = 0;
      if (sortBy === 'title') cmp = a.title.localeCompare(b.title, 'fr');
      else if (sortBy === 'updated') cmp = a.updatedAt.localeCompare(b.updatedAt);
      else if (sortBy === 'created') cmp = a.createdAt.localeCompare(b.createdAt);
      else cmp = 0; // ordre d'affichage = ordre reçu
      return sortAsc ? cmp : -cmp;
    });

    return list;
  }, [formations, query, status, sortBy, sortAsc]);

  return (
    <div className="p-4 md:p-8">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
        <div className="min-w-0">
          <h1 className="font-display text-2xl font-bold tracking-tight text-slate-900 md:text-3xl">
            Vos formations{' '}
            <span className="font-semibold text-slate-500">
              ({formations.length} / ∞)
            </span>
          </h1>
          <p className="mt-2 max-w-2xl text-sm leading-relaxed text-slate-500">
            L&apos;ordre d&apos;affichage par défaut de vos formations sera le même dans votre{' '}
            <Link href="/formations" className="font-medium text-[#0F766E] hover:underline">
              page catalogue
            </Link>
            .
            <br />
            Les {catalogueTotal} parcours du site doivent exister ici pour l&apos;espace apprenant —{' '}
            <Link href="/espace-apprenant" className="font-medium text-[#0F766E] hover:underline">
              espace apprenant
            </Link>
            .
          </p>
        </div>
        <div className="flex shrink-0 flex-col gap-2 sm:flex-row sm:items-start">
          <SyncCatalogueLmsButton />
          <Link
            href="/admin/formations/nouveau"
            className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#0F766E] px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-[#0D9488]"
          >
            <Plus size={18} strokeWidth={2} />
            Ajouter une formation
          </Link>
        </div>
      </div>

      {missingCount > 0 && (
        <div className="mt-5 rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-900">
          <strong>{missingCount} formation(s)</strong> du catalogue absente(s) : {missingLabels}.
          Utilisez <em>Sync catalogue /formations → LMS</em>.
        </div>
      )}

      {/* Filtres */}
      <div className="mt-6 flex flex-col gap-3 lg:flex-row lg:flex-wrap lg:items-end">
        <label className="flex min-w-[200px] flex-1 flex-col gap-1.5 text-sm text-slate-600">
          <span className="font-medium">Filtrer par</span>
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Filtrer par nom ou code…"
            className="rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-slate-900 placeholder:text-slate-400 focus:border-[#0F766E] focus:outline-none focus:ring-2 focus:ring-[#0F766E]/20"
          />
        </label>
        <label className="flex min-w-[160px] flex-1 flex-col gap-1.5 text-sm text-slate-600 lg:max-w-[200px]">
          <span className="font-medium">Étiquette(s)</span>
          <input
            type="search"
            placeholder="Filtrer par étiquette"
            disabled
            className="cursor-not-allowed rounded-lg border border-slate-200 bg-slate-50 px-3 py-2.5 text-slate-400"
            title="Bientôt disponible"
          />
        </label>
        <label className="flex w-full flex-col gap-1.5 text-sm text-slate-600 sm:w-40">
          <span className="font-medium">Statut</span>
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value as typeof status)}
            className="rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-slate-900 focus:border-[#0F766E] focus:outline-none focus:ring-2 focus:ring-[#0F766E]/20"
          >
            <option value="tous">Tous</option>
            <option value="publiee">Publiée</option>
            <option value="cachee">Cachée</option>
          </select>
        </label>
        <div className="flex w-full items-end gap-2 sm:w-auto">
          <label className="flex min-w-[160px] flex-1 flex-col gap-1.5 text-sm text-slate-600">
            <span className="font-medium">Trier par</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as SortKey)}
              className="rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-slate-900 focus:border-[#0F766E] focus:outline-none focus:ring-2 focus:ring-[#0F766E]/20"
            >
              <option value="ordre">Ordre d&apos;affichage</option>
              <option value="title">Nom</option>
              <option value="updated">Date de modification</option>
              <option value="created">Date de création</option>
            </select>
          </label>
          <button
            type="button"
            onClick={() => setSortAsc((v) => !v)}
            className="mb-0 flex h-[42px] w-[42px] items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-600 hover:bg-slate-50"
            aria-label={sortAsc ? 'Tri croissant' : 'Tri décroissant'}
            title={sortAsc ? 'Croissant' : 'Décroissant'}
          >
            <ArrowUpDown size={18} strokeWidth={1.5} className={sortAsc ? '' : 'rotate-180'} />
          </button>
        </div>
      </div>

      {/* Liste cartes */}
      <div className="mt-6 space-y-4">
        {filtered.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-slate-200 bg-white px-6 py-16 text-center text-slate-500">
            {formations.length === 0 ? (
              <>
                Aucune formation. Utilisez le bouton de synchronisation catalogue.
                <div className="mt-4 flex justify-center">
                  <RefreshCw size={20} className="text-slate-400" />
                </div>
              </>
            ) : (
              'Aucune formation ne correspond à vos filtres.'
            )}
          </div>
        ) : (
          filtered.map((f) => (
            <article
              key={f.id}
              className="overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-[0_1px_3px_rgba(15,23,42,0.06)]"
            >
              <div className="flex flex-col gap-4 p-4 sm:flex-row sm:items-start sm:gap-5 sm:p-5">
                <div className="flex items-start gap-3 sm:gap-4">
                  <button
                    type="button"
                    className="mt-6 hidden shrink-0 cursor-grab text-slate-300 hover:text-slate-500 sm:block"
                    aria-label="Réordonner (bientôt)"
                    title="Réordonner — bientôt disponible"
                    disabled
                  >
                    <GripHorizontal size={20} strokeWidth={1.75} />
                  </button>
                  <div className="relative h-[72px] w-[72px] shrink-0 overflow-hidden rounded-xl bg-slate-100 sm:h-20 sm:w-20">
                    {f.imageUrl ? (
                      <Image
                        src={f.imageUrl}
                        alt=""
                        fill
                        className="object-cover"
                        sizes="80px"
                      
                        quality={70}
                        loading="lazy"/>
                    ) : (
                      <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-slate-100 to-slate-200 text-xs font-semibold text-slate-400">
                        LO
                      </div>
                    )}
                  </div>
                </div>

                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2 gap-y-1.5">
                    <span
                      className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium ${
                        f.published
                          ? 'bg-emerald-50 text-emerald-800'
                          : 'bg-slate-100 text-slate-700'
                      }`}
                    >
                      <span
                        className={`h-1.5 w-1.5 rounded-full ${
                          f.published ? 'bg-emerald-500' : 'bg-slate-500'
                        }`}
                        aria-hidden
                      />
                      {f.published ? 'Publiée' : 'Cachée'}
                    </span>
                    <p className="text-xs text-slate-500">
                      Créée le <strong className="font-semibold text-slate-700">{formatFrDate(f.createdAt)}</strong>
                      {' · '}
                      Modifiée le{' '}
                      <strong className="font-semibold text-slate-700">{formatFrDate(f.updatedAt)}</strong>
                    </p>
                    {f.catalogueRef ? (
                      <span className="rounded bg-slate-100 px-1.5 py-0.5 text-[11px] font-medium text-slate-600">
                        {f.catalogueRef}
                      </span>
                    ) : null}
                  </div>
                  <h2 className="mt-2 text-lg font-bold leading-snug text-slate-900 sm:text-xl">
                    {f.title}
                  </h2>
                </div>

                <div className="flex shrink-0 flex-wrap items-center gap-2 sm:justify-end">
                  <Link
                    href={`/admin/formations/${f.id}`}
                    className="inline-flex items-center justify-center rounded-lg border border-[#0F766E]/50 bg-white px-4 py-2 text-sm font-semibold text-slate-900 transition-colors hover:border-[#0F766E] hover:bg-[#F0FDFA]"
                  >
                    modifier
                  </Link>
                  <div className="flex items-center gap-0.5 text-slate-400">
                    <Link
                      href={`/cours/${f.slug}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="rounded-lg p-2 hover:bg-slate-100 hover:text-slate-700"
                      title="Voir la page cours"
                      aria-label="Voir"
                    >
                      <Eye size={18} strokeWidth={1.5} />
                    </Link>
                    <span
                      className="rounded-lg p-2 opacity-40"
                      title="Dupliquer — bientôt"
                      aria-hidden
                    >
                      <Copy size={18} strokeWidth={1.5} />
                    </span>
                    <Link
                      href={`/espace-apprenant/cours/${f.slug}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="rounded-lg p-2 hover:bg-slate-100 hover:text-slate-700"
                      title="Ouvrir côté apprenant"
                      aria-label="Ouvrir"
                    >
                      <ExternalLink size={18} strokeWidth={1.5} />
                    </Link>
                    <Link
                      href={`/admin/formations/${f.id}`}
                      className="rounded-lg p-2 hover:bg-slate-100 hover:text-slate-700"
                      title="Plus d’actions"
                      aria-label="Plus"
                    >
                      <MoreVertical size={18} strokeWidth={1.5} />
                    </Link>
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap gap-x-6 gap-y-2 border-t border-slate-100 px-4 py-3 text-sm text-slate-500 sm:px-5 sm:pl-[7.5rem]">
                <span className="inline-flex items-center gap-1.5">
                  <Tag size={15} strokeWidth={1.5} className="text-slate-400" />
                  {f.priceLabel}
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <BookOpen size={15} strokeWidth={1.5} className="text-slate-400" />
                  {f.lessonCount} leçon{f.lessonCount === 1 ? '' : 's'}
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <Users size={15} strokeWidth={1.5} className="text-slate-400" />
                  {f.learnerCount} apprenant{f.learnerCount === 1 ? '' : 's'}
                </span>
                <span className="inline-flex items-center gap-1.5 text-slate-400">
                  <ShoppingCart size={15} strokeWidth={1.5} />
                  0 panier abandonné
                </span>
              </div>
            </article>
          ))
        )}
      </div>
    </div>
  );
}
