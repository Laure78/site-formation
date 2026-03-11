'use server';

import { createClient } from '@/lib/supabase/server';
import { isAdmin } from '@/lib/auth';

export type Availability = { jour: number; heure_debut: string; heure_fin: string };

export async function getAvailabilities(): Promise<Availability[]> {
  const supabase = await createClient();
  const { data } = await supabase
    .from('availabilities')
    .select('jour, heure_debut, heure_fin')
    .order('jour')
    .order('heure_debut');
  return (data ?? []) as Availability[];
}

export async function addAvailabilityAction(jour: number, heureDebut: string, heureFin: string): Promise<boolean> {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return false;
  const profile = await import('@/lib/auth').then((m) => m.getProfile(user.id));
  if (!profile || !isAdmin(profile.role)) return false;

  const { error } = await supabase.from('availabilities').insert({
    jour,
    heure_debut: heureDebut,
    heure_fin: heureFin,
  });
  return !error;
}

export async function deleteAvailabilityAction(id: string): Promise<boolean> {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return false;
  const profile = await import('@/lib/auth').then((m) => m.getProfile(user.id));
  if (!profile || !isAdmin(profile.role)) return false;

  const { error } = await supabase.from('availabilities').delete().eq('id', id);
  return !error;
}
