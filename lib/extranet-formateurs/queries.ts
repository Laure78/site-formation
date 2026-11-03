import { createAdminClient } from '@/lib/supabase/admin';
import type {
  ExtranetCharterAcceptanceRow,
  ExtranetCharterVersionRow,
  ExtranetDocumentRow,
  ExtranetTrainerRow,
} from './types';

export async function fetchTrainerDocuments(trainerId: string): Promise<ExtranetDocumentRow[]> {
  const admin = createAdminClient();
  const { data } = await admin
    .from('extranet_trainer_documents')
    .select('*')
    .eq('trainer_id', trainerId)
    .order('uploaded_at', { ascending: false });
  return (data ?? []) as ExtranetDocumentRow[];
}

export async function fetchCurrentCharter(): Promise<ExtranetCharterVersionRow | null> {
  const admin = createAdminClient();
  const { data } = await admin
    .from('extranet_charter_versions')
    .select('*')
    .eq('is_current', true)
    .maybeSingle();
  return (data as ExtranetCharterVersionRow | null) ?? null;
}

export async function fetchCharterAcceptance(
  trainerId: string,
  charterVersionId: string
): Promise<ExtranetCharterAcceptanceRow | null> {
  const admin = createAdminClient();
  const { data } = await admin
    .from('extranet_charter_acceptances')
    .select('*')
    .eq('trainer_id', trainerId)
    .eq('charter_version_id', charterVersionId)
    .maybeSingle();
  return (data as ExtranetCharterAcceptanceRow | null) ?? null;
}

export async function fetchAllTrainersForAdmin(): Promise<ExtranetTrainerRow[]> {
  const admin = createAdminClient();
  const { data } = await admin
    .from('extranet_trainers')
    .select('*')
    .neq('status', 'archived')
    .order('created_at', { ascending: false });
  return (data ?? []) as ExtranetTrainerRow[];
}

export async function fetchTrainerById(id: string): Promise<ExtranetTrainerRow | null> {
  const admin = createAdminClient();
  const { data } = await admin.from('extranet_trainers').select('*').eq('id', id).maybeSingle();
  return (data as ExtranetTrainerRow | null) ?? null;
}
