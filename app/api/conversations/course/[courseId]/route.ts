import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

/**
 * GET /api/conversations/course/[courseId]
 * Récupère ou crée la conversation de groupe pour un cours
 */
export async function GET(
  _request: Request,
  { params }: { params: Promise<{ courseId: string }> }
) {
  const { courseId } = await params;
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: 'Non authentifié' }, { status: 401 });

  const { data: profile } = await supabase.from('profiles').select('role').eq('id', user.id).single();
  const role = (profile as { role?: string } | null)?.role;

  // Vérifier que l'user est inscrit ou formateur/admin
  const { data: enrollment } = await supabase
    .from('enrollments')
    .select('id')
    .eq('user_id', user.id)
    .eq('course_id', courseId)
    .single();

  const { data: course } = await supabase
    .from('courses')
    .select('id, creator_id')
    .eq('id', courseId)
    .single();

  const isCreator = course?.creator_id === user.id;
  const isEnrolled = !!enrollment;
  const isStaff = role === 'admin' || role === 'formateur';

  if (!isEnrolled && !isCreator && !isStaff) {
    return NextResponse.json({ error: 'Accès refusé : non inscrit à ce cours' }, { status: 403 });
  }

  // Chercher la conversation existante
  let { data: conv, error } = await supabase
    .from('conversations')
    .select(`
      id,
      type,
      course_id,
      title,
      created_by,
      created_at,
      updated_at,
      course:courses(id, title, slug)
    `)
    .eq('type', 'course')
    .eq('course_id', courseId)
    .single();

  if (error && error.code !== 'PGRST116') {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  if (!conv) {
    const { data: courseInfo } = await supabase
      .from('courses')
      .select('title')
      .eq('id', courseId)
      .single();

    const { data: newConv, error: createErr } = await supabase
      .from('conversations')
      .insert({
        type: 'course',
        course_id: courseId,
        title: `Discussion — ${courseInfo?.title ?? 'Cours'}`,
        created_by: user.id,
      })
      .select(`
        id,
        type,
        course_id,
        title,
        created_by,
        created_at,
        updated_at,
        course:courses(id, title, slug)
      `)
      .single();

    if (createErr) return NextResponse.json({ error: createErr.message }, { status: 500 });
    conv = newConv;
  }

  if (!conv) {
    return NextResponse.json({ error: 'Conversation non trouvée' }, { status: 404 });
  }

  return NextResponse.json(conv);
}
