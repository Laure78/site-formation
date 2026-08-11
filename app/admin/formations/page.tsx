import Link from 'next/link';
import { createClient } from '@/lib/supabase/server';
import { Plus, Edit2 } from 'lucide-react';
import { FORMATIONS_CATALOGUE } from '@/lib/formations-catalogue-display';
import { SyncCatalogueLmsButton } from './SyncCatalogueLmsButton';

export default async function AdminFormationsPage() {
  const supabase = await createClient();
  const { data: courses } = await supabase
    .from('courses')
    .select('id, slug, title, description, objectifs, prerequis, programme, price, published, created_at')
    .order('created_at', { ascending: false });

  const lmsSlugs = new Set((courses ?? []).map((c) => c.slug));
  const missingCatalogue = FORMATIONS_CATALOGUE.filter((e) => !lmsSlugs.has(e.slug));

  return (
    <div className="p-4 md:p-8">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="font-display text-2xl font-bold text-slate-900">Formations</h1>
          <p className="mt-1 text-sm text-slate-600">
            Les {FORMATIONS_CATALOGUE.length} parcours du site{' '}
            <Link href="/formations" className="text-[var(--accent)] hover:underline">
              /formations
            </Link>{' '}
            doivent exister ici pour l&apos;espace apprenant.
          </p>
        </div>
        <div className="flex flex-col gap-2 sm:flex-row sm:items-start">
          <SyncCatalogueLmsButton />
          <Link
            href="/admin/formations/nouveau"
            className="flex items-center justify-center gap-2 rounded-xl bg-[var(--accent)] px-4 py-2.5 font-medium text-white hover:bg-blue-700"
          >
            <Plus size={20} strokeWidth={1.5} />
            Nouvelle formation
          </Link>
        </div>
      </div>

      {missingCatalogue.length > 0 && (
        <div className="mt-6 rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-900">
          <strong>{missingCatalogue.length} formation(s)</strong> du catalogue absente(s) de la
          plateforme : {missingCatalogue.map((e) => e.ref).join(', ')}. Cliquez sur{' '}
          <em>Sync catalogue /formations → LMS</em>.
        </div>
      )}

      <div className="mt-6 overflow-x-auto rounded-2xl border border-slate-200 bg-white shadow-sm md:mt-8">
        <table className="w-full min-w-[640px]">
          <thead>
            <tr className="border-b border-slate-200 bg-slate-50">
              <th className="px-6 py-4 text-left text-sm font-semibold text-slate-900">Formation</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-slate-900">Objectifs / Programme</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-slate-900">Prix</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-slate-900">Statut</th>
              <th className="px-6 py-4 text-right text-sm font-semibold text-slate-900">Actions</th>
            </tr>
          </thead>
          <tbody>
            {(courses ?? []).length === 0 ? (
              <tr>
                <td colSpan={5} className="px-6 py-12 text-center text-slate-500">
                  Aucune formation. Utilisez le bouton « Sync catalogue /formations → LMS ».
                </td>
              </tr>
            ) : (
              (courses ?? []).map((c) => {
                const cat = FORMATIONS_CATALOGUE.find((e) => e.slug === c.slug);
                return (
                  <tr key={c.id} className="border-b border-slate-100 last:border-0">
                    <td className="px-6 py-4">
                      <p className="font-medium text-slate-900">{c.title}</p>
                      <p className="text-sm text-slate-500">
                        /{c.slug}
                        {cat ? (
                          <span className="ml-2 rounded bg-[var(--accent-soft)] px-1.5 py-0.5 text-xs font-medium text-[var(--accent)]">
                            {cat.ref}
                          </span>
                        ) : null}
                      </p>
                    </td>
                    <td className="max-w-xs px-6 py-4 text-sm text-slate-600">
                      <p className="line-clamp-1">
                        <strong>Objectifs :</strong> {(c as { objectifs?: string }).objectifs || '—'}
                      </p>
                      <p className="mt-1 line-clamp-1">
                        <strong>Prérequis :</strong> {(c as { prerequis?: string }).prerequis || '—'}
                      </p>
                      <p className="mt-1 line-clamp-1">
                        <strong>Programme :</strong> {(c as { programme?: string }).programme || '—'}
                      </p>
                    </td>
                    <td className="px-6 py-4 text-slate-600">{c.price} €</td>
                    <td className="px-6 py-4">
                      <span
                        className={`rounded-full px-2.5 py-1 text-xs font-medium ${
                          c.published
                            ? 'bg-emerald-100 text-emerald-700'
                            : 'bg-slate-100 text-slate-600'
                        }`}
                      >
                        {c.published ? 'Publiée' : 'Brouillon'}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <Link
                        href={`/admin/formations/${c.id}`}
                        className="inline-flex items-center gap-2 rounded-lg px-3 py-1.5 text-sm text-slate-600 hover:bg-slate-100"
                      >
                        <Edit2 size={16} strokeWidth={1.5} />
                        Modifier
                      </Link>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
