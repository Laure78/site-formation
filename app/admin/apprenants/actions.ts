'use server';

import { createClient } from '@/lib/supabase/server';
import { isAdmin } from '@/lib/auth';
import { randomUUID } from 'crypto';

export async function createInvitationAction(
  email: string,
  courseId: string
): Promise<{ url: string } | null> {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return null;
  const profile = await import('@/lib/auth').then((m) => m.getProfile(user.id));
  if (!profile || !isAdmin(profile.role)) return null;

  const token = randomUUID();
  const expiresAt = new Date();
  expiresAt.setDate(expiresAt.getDate() + 7);

  const { error } = await supabase.from('invitations').insert({
    email,
    course_id: courseId,
    token,
    expires_at: expiresAt.toISOString(),
    invited_by: user.id,
  });

  if (error) return null;

  const baseUrl =
    process.env.NEXT_PUBLIC_SITE_URL ||
    (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : null) ||
    'https://www.laureolivie.fr';
  const url = `${baseUrl}/invitation/${token}`;
  return { url };
}
