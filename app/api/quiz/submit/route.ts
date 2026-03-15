import { createClient } from '@/lib/supabase/server';
import { NextRequest, NextResponse } from 'next/server';

/** POST /api/quiz/submit — Soumettre réponses et valider */
export async function POST(request: NextRequest) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: 'Non authentifié' }, { status: 401 });

  const body = await request.json().catch(() => ({}));
  const { lessonId, answers } = body as { lessonId: string; answers: Array<{ questionId: string; selectedIndex: number }> };
  if (!lessonId || !Array.isArray(answers)) {
    return NextResponse.json({ error: 'lessonId et answers requis' }, { status: 400 });
  }

  // Vérifier accès
  const { data: lesson } = await supabase.from('lessons').select('module_id').eq('id', lessonId).single();
  if (!lesson) return NextResponse.json({ error: 'Leçon introuvable' }, { status: 404 });

  const { data: module } = await supabase.from('modules').select('course_id').eq('id', lesson.module_id).single();
  if (!module) return NextResponse.json({ error: 'Module introuvable' }, { status: 404 });

  const { data: enrollment } = await supabase
    .from('enrollments')
    .select('id')
    .eq('user_id', user.id)
    .eq('course_id', module.course_id)
    .single();
  if (!enrollment) return NextResponse.json({ error: 'Accès refusé' }, { status: 403 });

  const { data: questions } = await supabase
    .from('quiz_questions')
    .select('id, correct_index')
    .eq('lesson_id', lessonId);

  const questionsMap = new Map((questions ?? []).map((q) => [q.id, q]));
  let correctCount = 0;
  const total = questionsMap.size;

  for (const a of answers) {
    const q = questionsMap.get(a.questionId);
    if (q && a.selectedIndex === q.correct_index) correctCount++;
  }

  const scorePercent = total > 0 ? Math.round((correctCount / total) * 100) : 0;
  const passed = scorePercent >= 70;

  // Enregistrer la tentative (quiz_attempts si la table existe)
  const { data: quizAttempts } = await supabase
    .from('quiz_attempts')
    .insert({
      user_id: user.id,
      lesson_id: lessonId,
      score_percent: scorePercent,
      total_questions: total,
      correct_count: correctCount,
    })
    .select('id')
    .single();

  // Si réussi : marquer la leçon comme terminée
  if (passed) {
    await supabase
      .from('lesson_progress')
      .upsert(
        {
          user_id: user.id,
          lesson_id: lessonId,
          completed: true,
          completed_at: new Date().toISOString(),
        },
        { onConflict: 'user_id,lesson_id' }
      );

    // Recalculer progress_percent enrollment
    const { data: mods } = await supabase.from('modules').select('id').eq('course_id', module.course_id);
    const modIds = (mods ?? []).map((m) => m.id);
    const { data: allLessons } = await supabase.from('lessons').select('id').in('module_id', modIds);
    const totalLessons = (allLessons ?? []).length;
    const { data: progress } = await supabase
      .from('lesson_progress')
      .select('lesson_id')
      .eq('user_id', user.id)
      .eq('completed', true)
      .in('lesson_id', (allLessons ?? []).map((l) => l.id));
    const completedCount = (progress ?? []).length;
    const percent = totalLessons > 0 ? Math.round((completedCount / totalLessons) * 100) : 0;
    await supabase
      .from('enrollments')
      .update({ progress_percent: percent })
      .eq('user_id', user.id)
      .eq('course_id', module.course_id);
  }

  return NextResponse.json({
    ok: true,
    scorePercent,
    correctCount,
    total,
    passed,
  });
}
