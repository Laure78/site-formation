import { createClient } from '@/lib/supabase/server';

export type UserRole = 'apprenant' | 'formateur' | 'admin';

export interface Profile {
  id: string;
  email: string | null;
  full_name: string | null;
  role: UserRole;
  created_at: string;
  updated_at: string;
}

export async function getProfile(userId: string) {
  const supabase = await createClient();
  const { data } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', userId)
    .single();
  return data as Profile | null;
}

export async function getRole(userId: string): Promise<UserRole> {
  const profile = await getProfile(userId);
  return profile?.role ?? 'apprenant';
}

export function isAdmin(role: UserRole): boolean {
  return role === 'admin' || role === 'formateur';
}
