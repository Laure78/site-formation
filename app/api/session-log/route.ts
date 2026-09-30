import { createClient } from '@/lib/supabase/server';
import { NextRequest } from 'next/server';
import { checkRateLimit, clientIpFromRequest } from '@/lib/rate-limit';

export async function POST(request: NextRequest) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return new Response('Unauthorized', { status: 401 });

  const ip = clientIpFromRequest(request);
  const rl = checkRateLimit(`session-log:${user.id}:${ip}`, 30, 60_000);
  if (!rl.ok) {
    return new Response(JSON.stringify({ error: 'Trop de requêtes' }), {
      status: 429,
      headers: { 'Retry-After': String(rl.retryAfterSec), 'Content-Type': 'application/json' },
    });
  }

  const body = await request.json().catch(() => ({}));
  const rawModules = Array.isArray(body.modulesConsulted) ? body.modulesConsulted : [];
  const modulesConsulted = rawModules
    .filter((m: unknown): m is string => typeof m === 'string')
    .map((m: string) => m.slice(0, 120))
    .slice(0, 50);

  const forwarded = request.headers.get('x-forwarded-for');
  const clientIp = forwarded?.split(',')[0]?.trim()?.slice(0, 64) ?? request.headers.get('x-real-ip') ?? null;
  const userAgent = request.headers.get('user-agent')?.slice(0, 500) ?? null;

  const { error } = await supabase.from('session_logs').insert({
    user_id: user.id,
    ip_address: clientIp,
    user_agent: userAgent,
    modules_consulted: modulesConsulted,
  });

  if (error) {
    console.error('[session-log]', error.message);
    return new Response(JSON.stringify({ error: 'Erreur serveur' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
  return Response.json({ ok: true });
}
