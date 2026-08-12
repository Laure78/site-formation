import { notFound } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';
import { NouveauModuleForm } from './NouveauModuleForm';

export default async function NouveauModulePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id: courseId } = await params;
  const supabase = await createClient();

  const { data: course } = await supabase
    .from('courses')
    .select('id, title')
    .eq('id', courseId)
    .maybeSingle();

  if (!course) notFound();

  const { count } = await supabase
    .from('modules')
    .select('id', { count: 'exact', head: true })
    .eq('course_id', courseId);

  return (
    <div className="p-4 md:p-8">
      <NouveauModuleForm
        courseId={courseId}
        courseTitle={course.title}
        nextOrderPreview={(count ?? 0) + 1}
      />
    </div>
  );
}
