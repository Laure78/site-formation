import Link from 'next/link';
import { createClient } from '@/lib/supabase/server';
import { Plus, Edit2 } from 'lucide-react';

export default async function AdminFormationsPage() {
  const supabase = await createClient();
  const { data: courses } = await supabase
    .from('courses')
    .select('id, slug, title, price, published, created_at')
    .order('created_at', { ascending: false });

  return (
    <div className="p-8">
      <div className="flex items-center justify-between">
        <h1 className="font-display text-2xl font-bold text-slate-900">Formations</h1>
        <Link
          href="/admin/formations/nouveau"
          className="flex items-center gap-2 rounded-xl bg-[var(--accent)] px-4 py-2.5 font-medium text-white hover:bg-blue-700"
        >
          <Plus size={20} strokeWidth={1.5} />
          Nouvelle formation
        </Link>
      </div>

      <div className="mt-8 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        <table className="w-full">
          <thead>
            <tr className="border-b border-slate-200 bg-slate-50">
              <th className="px-6 py-4 text-left text-sm font-semibold text-slate-900">Formation</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-slate-900">Prix</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-slate-900">Statut</th>
              <th className="px-6 py-4 text-right text-sm font-semibold text-slate-900">Actions</th>
            </tr>
          </thead>
          <tbody>
            {(courses ?? []).length === 0 ? (
              <tr>
                <td colSpan={4} className="px-6 py-12 text-center text-slate-500">
                  Aucune formation. <Link href="/admin/formations/nouveau" className="text-[var(--accent)] hover:underline">Créer la première</Link>
                </td>
              </tr>
            ) : (
              (courses ?? []).map((c) => (
                <tr key={c.id} className="border-b border-slate-100 last:border-0">
                  <td className="px-6 py-4">
                    <p className="font-medium text-slate-900">{c.title}</p>
                    <p className="text-sm text-slate-500">/{c.slug}</p>
                  </td>
                  <td className="px-6 py-4 text-slate-600">{c.price} €</td>
                  <td className="px-6 py-4">
                    <span className={`rounded-full px-2.5 py-1 text-xs font-medium ${c.published ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-100 text-slate-600'}`}>
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
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
