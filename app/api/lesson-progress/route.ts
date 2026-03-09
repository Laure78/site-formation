import { createClient } from '@/lib/supabase/server';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: 'Non authentifié' }, { status: 401 });

  const { lessonId, completed } = await request.json();
  if (!lessonId) return NextResponse.json({ error: 'lessonId requis' }, { status: 400 });

  const { error: upsertError } = await supabase
    .from('lesson_progress')
    .upsert(
      { user_id: user.id, lesson_id: lessonId, completed: !!completed, completed_at: completed ? new Date().toISOString() : null },
      { onConflict: 'user_id,lesson_id' }
    );

  if (upsertError) return NextResponse.json({ error: upsertError.message }, { status: 500 });

  // Recalculer progress_percent pour les enrollments
  const { data: lesson } = await supabase.from('lessons').select('module_id').eq('id', lessonId).single();
  if (!lesson) return NextResponse.json({ ok: true });

  const { data: module } = await supabase.from('modules').select('course_id').eq('id', lesson.module_id).single();
  if (!module) return NextResponse.json({ ok: true });

  const { data: mods } = await supabase.from('modules').select('id').eq('course_id', module.course_id);
  const modIds = (mods ?? []).map((m) => m.id);
  const { data: lessons } = await supabase.from('lessons').select('id').in('module_id', modIds);
  const totalLessons = (lessons ?? []).length;
  if (totalLessons === 0) return NextResponse.json({ ok: true });

  const { data: progress } = await supabase
    .from('lesson_progress')
    .select('lesson_id')
    .eq('user_id', user.id)
    .eq('completed', true)
    .in('lesson_id', (lessons ?? []).map((l) => l.id));

  const completedCount = (progress ?? []).length;
  const percent = Math.round((completedCount / totalLessons) * 100);

  await supabase
    .from('enrollments')
    .update({ progress_percent: percent })
    .eq('user_id', user.id)
    .eq('course_id', module.course_id);

  return NextResponse.json({ ok: true, progress_percent: percent });
}
