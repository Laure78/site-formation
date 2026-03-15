import { notFound } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';
import { CourseViewer } from './CourseViewer';
import { SessionLogger } from '@/components/SessionLogger';

export default async function CoursPage({
  params,
}: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect('/auth/connexion');

  const { data: course } = await supabase
    .from('courses')
    .select('id, slug, title, description')
    .eq('slug', slug)
    .single();

  if (!course) notFound();

  const { data: enrollment } = await supabase
    .from('enrollments')
    .select('id, progress_percent')
    .eq('user_id', user.id)
    .eq('course_id', course.id)
    .single();

  // Vérifier si admin/formateur (accès sans achat)
  const { data: profile } = await supabase.from('profiles').select('role').eq('id', user.id).single();
  const hasAccess = enrollment || (profile?.role === 'admin' || profile?.role === 'formateur');

  if (!hasAccess) {
    redirect(`/formations?course=${course.id}`);
  }

  const { data: modules } = await supabase
    .from('modules')
    .select(`
      id, title, order_index,
      lessons(id, title, type, order_index, duration_minutes, content_url, content_text)
    `)
    .eq('course_id', course.id)
    .order('order_index');

  const lessonIds = (modules ?? []).flatMap((m) => ((m.lessons ?? []) as { id: string }[]).map((l) => l.id));
  const { data: resources } =
    lessonIds.length > 0
      ? await supabase
          .from('lesson_resources')
          .select('id, lesson_id, title, file_url, file_type, order_index')
          .in('lesson_id', lessonIds)
          .order('order_index')
      : { data: [] };

  const resourcesByLesson: Record<string, { id: string; title: string; file_url: string; file_type: string | null }[]> = {};
  for (const r of resources ?? []) {
    if (!resourcesByLesson[r.lesson_id]) resourcesByLesson[r.lesson_id] = [];
    resourcesByLesson[r.lesson_id].push({
      id: r.id,
      title: r.title,
      file_url: r.file_url,
      file_type: r.file_type,
    });
  }

  const { data: progress } = await supabase
    .from('lesson_progress')
    .select('lesson_id, completed')
    .eq('user_id', user.id);

  const completedIds = new Set((progress ?? []).filter((p) => p.completed).map((p) => p.lesson_id));

  const moduleIds = (modules ?? []).map((m) => m.id);

  return (
    <div className="min-h-screen bg-slate-50">
      <SessionLogger modulesConsulted={moduleIds} />
      <CourseViewer
        course={course}
        modules={modules ?? []}
        completedLessonIds={Array.from(completedIds)}
        enrollmentId={enrollment?.id}
        userId={user.id}
        progressPercent={enrollment?.progress_percent ?? 0}
        lessonResources={resourcesByLesson}
      />
    </div>
  );
}
