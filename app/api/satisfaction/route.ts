import { createClient } from '@/lib/supabase/server';
import { NextRequest } from 'next/server';

export async function POST(request: NextRequest) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return new Response('Unauthorized', { status: 401 });

  const body = await request.json();
  const { courseId, noteGlobale, noteContenu, noteUtilite, commentaire } = body;
  if (!courseId || noteGlobale == null) {
    return new Response('Missing courseId or noteGlobale', { status: 400 });
  }

  const { error } = await supabase.from('satisfaction_surveys').upsert(
    {
      user_id: user.id,
      course_id: courseId,
      note_globale: Math.min(5, Math.max(1, Number(noteGlobale))),
      note_contenu: noteContenu != null ? Math.min(5, Math.max(1, Number(noteContenu))) : null,
      note_utilite: noteUtilite != null ? Math.min(5, Math.max(1, Number(noteUtilite))) : null,
      commentaire: typeof commentaire === 'string' ? commentaire.slice(0, 2000) : null,
    },
    { onConflict: 'user_id,course_id' }
  );

  if (error) return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  return Response.json({ ok: true });
}
