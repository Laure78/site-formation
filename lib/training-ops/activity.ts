import { createAdminClient } from '@/lib/supabase/admin';

export async function logSessionActivity(params: {
  sessionId: string;
  actorId: string | null;
  action: string;
  details?: Record<string, unknown>;
}): Promise<void> {
  const supabase = createAdminClient();
  await supabase.from('training_session_activity_log').insert({
    session_id: params.sessionId,
    actor_id: params.actorId,
    action: params.action,
    details: params.details ?? {},
  });
}

export async function listSessionActivity(sessionId: string, limit = 50) {
  const supabase = createAdminClient();
  const { data, error } = await supabase
    .from('training_session_activity_log')
    .select('id, action, details, created_at, actor_id')
    .eq('session_id', sessionId)
    .order('created_at', { ascending: false })
    .limit(limit);
  if (error) throw new Error(error.message);
  return data ?? [];
}
