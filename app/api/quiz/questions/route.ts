import { createClient } from '@/lib/supabase/server';
import { NextRequest } from 'next/server';

/**
 * GET /api/quiz/questions?lessonId=xxx
 * Retourne les questions du quiz (sans l'index correct pour sécurité)
 */
export async function GET(request: NextRequest) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return Response.json({ error: 'Non authentifié' }, { status: 401 });

  const lessonId = request.nextUrl.searchParams.get('lessonId');
  if (!lessonId) return Response.json({ error: 'lessonId requis' }, { status: 400 });

  // Vérifier accès au cours (inscrit ou admin)
  const { data: lesson } = await supabase.from('lessons').select('module_id').eq('id', lessonId).single();
  if (!lesson) return Response.json({ error: 'Leçon non trouvée' }, { status: 404 });

  const { data: mod } = await supabase.from('modules').select('course_id').eq('id', lesson.module_id).single();
  if (!mod) return Response.json({ error: 'Module non trouvé' }, { status: 404 });

  const { data: enrollment } = await supabase.from('enrollments').select('id').eq('user_id', user.id).eq('course_id', mod.course_id).single();
  const { data: profile } = await supabase.from('profiles').select('role').eq('id', user.id).single();
  const hasAccess = enrollment || (profile?.role === 'admin' || profile?.role === 'formateur');
  if (!hasAccess) return Response.json({ error: 'Accès refusé' }, { status: 403 });

  const { data: questions } = await supabase
    .from('quiz_questions')
    .select('id, question, options, order_index')
    .eq('lesson_id', lessonId)
    .order('order_index');

  if (!questions?.length) return Response.json({ questions: [], message: 'Aucune question configurée' });

  return Response.json({
    questions: questions.map((q) => ({
      id: q.id,
      question: q.question,
      options: (q.options as string[]) ?? [],
    })),
  });
}
