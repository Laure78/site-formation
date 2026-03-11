import { createClient } from '@/lib/supabase/server';
import { NextRequest } from 'next/server';

export async function POST(request: NextRequest) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return new Response('Unauthorized', { status: 401 });

  const body = await request.json().catch(() => ({}));
  const modulesConsulted = Array.isArray(body.modulesConsulted) ? body.modulesConsulted : [];

  const forwarded = request.headers.get('x-forwarded-for');
  const ip = forwarded?.split(',')[0] ?? request.headers.get('x-real-ip') ?? null;
  const userAgent = request.headers.get('user-agent') ?? null;

  const { error } = await supabase.from('session_logs').insert({
    user_id: user.id,
    ip_address: ip,
    user_agent: userAgent,
    modules_consulted: modulesConsulted,
  });

  if (error) return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  return Response.json({ ok: true });
}
