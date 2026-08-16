import { notFound } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';
import { NouvelleLeconForm } from './NouvelleLeconForm';

export default async function NouvelleLeconPage({
  params,
}: {
  params: Promise<{ id: string; moduleId: string }>;
}) {
  const { id: courseId, moduleId } = await params;
  const supabase = await createClient();

  const [{ data: course }, { data: module }] = await Promise.all([
    supabase.from('courses').select('id, title').eq('id', courseId).maybeSingle(),
    supabase.from('modules').select('id, title, course_id').eq('id', moduleId).maybeSingle(),
  ]);

  if (!course || !module || module.course_id !== courseId) notFound();

  return (
    <div className="p-4 md:p-8">
      <NouvelleLeconForm
        courseId={courseId}
        moduleId={moduleId}
        courseTitle={course.title}
        moduleTitle={module.title}
      />
    </div>
  );
}
