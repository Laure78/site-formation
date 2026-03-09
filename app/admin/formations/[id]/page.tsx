import { notFound } from 'next/navigation';
import Link from 'next/link';
import { createClient } from '@/lib/supabase/server';
import { ArrowLeft, Plus, GripVertical } from 'lucide-react';

export default async function AdminFormationEditPage({
  params,
}: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const supabase = await createClient();
  const { data: course } = await supabase.from('courses').select('*').eq('id', id).single();
  if (!course) notFound();

  const { data: modules } = await supabase
    .from('modules')
    .select(`
      id, title, order_index,
      lessons(id, title, type, order_index)
    `)
    .eq('course_id', id)
    .order('order_index');

  return (
    <div className="p-8">
      <Link href="/admin/formations" className="flex items-center gap-2 text-sm text-[var(--accent)] hover:underline">
        <ArrowLeft size={16} strokeWidth={1.5} />
        Retour aux formations
      </Link>
      <div className="mt-6 flex items-start justify-between">
        <div>
          <h1 className="font-display text-2xl font-bold text-slate-900">{course.title}</h1>
          <p className="mt-1 text-slate-500">/{course.slug}</p>
          <span className={`mt-2 inline-block rounded-full px-2.5 py-1 text-xs font-medium ${course.published ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-100 text-slate-600'}`}>
            {course.published ? 'Publiée' : 'Brouillon'}
          </span>
        </div>
        <Link
          href={`/admin/formations/${id}/modules/nouveau`}
          className="flex items-center gap-2 rounded-xl bg-[var(--accent)] px-4 py-2.5 font-medium text-white hover:bg-blue-700"
        >
          <Plus size={20} strokeWidth={1.5} />
          Ajouter un module
        </Link>
      </div>

      <div className="mt-10">
        <h2 className="font-display text-lg font-semibold text-slate-900">Modules et leçons</h2>
        <div className="mt-4 space-y-4">
          {(modules ?? []).length === 0 ? (
            <div className="rounded-2xl border-2 border-dashed border-slate-200 p-12 text-center">
              <p className="text-slate-500">Aucun module. Ajoute le premier pour commencer.</p>
              <Link href={`/admin/formations/${id}/modules/nouveau`} className="mt-4 inline-flex items-center gap-2 text-[var(--accent)] hover:underline">
                <Plus size={18} strokeWidth={1.5} />
                Ajouter un module
              </Link>
            </div>
          ) : (
            (modules ?? []).map((m) => (
              <div key={m.id} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                <div className="flex items-center gap-3">
                  <GripVertical size={20} strokeWidth={1.5} className="cursor-move text-slate-400" />
                  <h3 className="font-semibold text-slate-900">{m.title}</h3>
                  <Link
                    href={`/admin/formations/${id}/modules/${m.id}`}
                    className="ml-auto text-sm text-[var(--accent)] hover:underline"
                  >
                    Modifier
                  </Link>
                </div>
                <ul className="mt-4 space-y-2 pl-8">
                  {((m.lessons as { id: string; title: string; type: string }[]) ?? []).map((l) => (
                    <li key={l.id} className="flex items-center gap-2 text-sm text-slate-600">
                      <span className="rounded bg-slate-100 px-1.5 py-0.5 text-xs">{l.type}</span>
                      {l.title}
                    </li>
                  ))}
                </ul>
                <Link
                  href={`/admin/formations/${id}/modules/${m.id}/lecons/nouvelle`}
                  className="mt-4 inline-flex items-center gap-1 text-sm text-[var(--accent)] hover:underline"
                >
                  <Plus size={16} strokeWidth={1.5} />
                  Ajouter une leçon
                </Link>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
