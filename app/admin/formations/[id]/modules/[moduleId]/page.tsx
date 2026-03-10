import { notFound } from 'next/navigation';
import Link from 'next/link';
import { createClient } from '@/lib/supabase/server';
import { ArrowLeft, Plus } from 'lucide-react';
import { ModuleEditForm } from './ModuleEditForm';
import { LessonListItem } from './LessonListItem';

export default async function AdminModuleEditPage({
  params,
}: {
  params: Promise<{ id: string; moduleId: string }>;
}) {
  const { id: courseId, moduleId } = await params;
  const supabase = await createClient();

  const { data: module } = await supabase
    .from('modules')
    .select('id, title, order_index')
    .eq('id', moduleId)
    .single();

  if (!module) notFound();

  const { data: lessons } = await supabase
    .from('lessons')
    .select('id, title, type, order_index')
    .eq('module_id', moduleId)
    .order('order_index');

  return (
    <div className="p-4 md:p-8">
      <Link
        href={`/admin/formations/${courseId}`}
        className="flex items-center gap-2 text-sm text-[var(--accent)] hover:underline"
      >
        <ArrowLeft size={16} strokeWidth={1.5} />
        Retour à la formation
      </Link>

      <h1 className="mt-6 font-display text-2xl font-bold">Module : {module.title}</h1>

      <ModuleEditForm
        moduleId={moduleId}
        courseId={courseId}
        initialTitle={module.title}
      />

      <div className="mt-8">
        <h2 className="font-display text-lg font-semibold text-slate-900">Leçons</h2>
        <ul className="mt-4 space-y-2">
          {(lessons ?? []).map((l) => (
            <LessonListItem
              key={l.id}
              lesson={l}
              courseId={courseId}
              moduleId={moduleId}
            />
          ))}
        </ul>
        <Link
          href={`/admin/formations/${courseId}/modules/${moduleId}/lecons/nouvelle`}
          className="mt-4 inline-flex items-center gap-1 text-sm text-[var(--accent)] hover:underline"
        >
          <Plus size={16} strokeWidth={1.5} />
          Ajouter une leçon
        </Link>
      </div>
    </div>
  );
}
