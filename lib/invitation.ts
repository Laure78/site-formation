import type { SupabaseClient } from '@supabase/supabase-js';

export type InvitationByToken = {
  id: string;
  email: string;
  course_id: string;
  expires_at: string;
  accepted_at: string | null;
};

/** Résout une invitation par token (contourne RLS de façon sécurisée via RPC Supabase). */
export async function getInvitationByToken(
  supabase: SupabaseClient,
  token: string
): Promise<InvitationByToken | null> {
  const { data, error } = await supabase.rpc('get_invitation_by_token', {
    p_token: token,
  });
  if (error) {
    console.error('[getInvitationByToken]', error.message);
    return null;
  }
  const row = Array.isArray(data) ? data[0] : null;
  return (row as InvitationByToken | undefined) ?? null;
}
