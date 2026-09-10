import { createClient } from '@/lib/supabase/server';
import { NextRequest } from 'next/server';
import { userHasLessonAccess } from '@/lib/lms-access';

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

  const { data: lesson } = await supabase.from('lessons').select('id').eq('id', lessonId).maybeSingle();
  if (!lesson) return Response.json({ error: 'Leçon non trouvée' }, { status: 404 });

  const hasAccess = await userHasLessonAccess(supabase, user.id, lessonId);
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
