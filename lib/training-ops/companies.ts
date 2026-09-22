import { createAdminClient } from '@/lib/supabase/admin';
import type { TrainingCompany } from '@/lib/training-ops/types';

export async function listTrainingCompanies(): Promise<TrainingCompany[]> {
  const supabase = createAdminClient();
  const { data, error } = await supabase
    .from('training_companies')
    .select('*')
    .order('name', { ascending: true });
  if (error) throw new Error(error.message);
  return (data ?? []) as TrainingCompany[];
}

export async function createTrainingCompany(input: {
  name: string;
  siret?: string | null;
  city?: string | null;
  contactName?: string | null;
  contactEmail?: string | null;
  contactPhone?: string | null;
  actorId: string;
}): Promise<TrainingCompany> {
  const supabase = createAdminClient();
  const { data, error } = await supabase
    .from('training_companies')
    .insert({
      name: input.name.trim(),
      siret: input.siret ?? null,
      city: input.city ?? null,
      contact_name: input.contactName ?? null,
      contact_email: input.contactEmail ?? null,
      contact_phone: input.contactPhone ?? null,
      created_by: input.actorId,
    })
    .select('*')
    .single();
  if (error) throw new Error(error.message);
  return data as TrainingCompany;
}

export async function searchTrainingPeople(q: string, limit = 20) {
  const supabase = createAdminClient();
  const term = q.trim();
  if (!term) return [];
  const { data, error } = await supabase
    .from('training_people')
    .select('*')
    .or(
      `first_name.ilike.%${term}%,last_name.ilike.%${term}%,email.ilike.%${term}%`
    )
    .limit(limit);
  if (error) throw new Error(error.message);
  return data ?? [];
}
