import { notFound } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import { CourseViewer } from './CourseViewer';

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
      lessons(id, title, type, order_index, duration_minutes)
    `)
    .eq('course_id', course.id)
    .order('order_index');

  const { data: progress } = await supabase
    .from('lesson_progress')
    .select('lesson_id, completed')
    .eq('user_id', user.id);

  const completedIds = new Set((progress ?? []).filter((p) => p.completed).map((p) => p.lesson_id));

  return (
    <div className="min-h-screen bg-slate-50">
      <CourseViewer
        course={course}
        modules={modules ?? []}
        completedLessonIds={Array.from(completedIds)}
        enrollmentId={enrollment?.id}
        userId={user.id}
        progressPercent={enrollment?.progress_percent ?? 0}
      />
    </div>
  );
}
