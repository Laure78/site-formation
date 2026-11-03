import { createAdminClient } from '@/lib/supabase/admin';
import type {
  ExtranetMissionRow,
  ExtranetProgramRow,
  ExtranetProgramVersionRow,
  ExtranetTrainerResourceRow,
} from './phase2-types';

export type ProgramWithCurrentVersion = ExtranetProgramRow & {
  current_version: ExtranetProgramVersionRow | null;
};

export async function fetchProgramsForAdmin(): Promise<ProgramWithCurrentVersion[]> {
  const admin = createAdminClient();
  const { data: programs } = await admin
    .from('extranet_programs')
    .select('*')
    .eq('is_archived', false)
    .order('title');
  if (!programs?.length) return [];

  const ids = programs.map((p) => p.id);
  const { data: versions } = await admin
    .from('extranet_program_versions')
    .select('*')
    .in('program_id', ids)
    .eq('is_current', true);

  const byProgram = new Map<string, ExtranetProgramVersionRow>();
  for (const v of versions ?? []) {
    byProgram.set(v.program_id, v as ExtranetProgramVersionRow);
  }

  return (programs as ExtranetProgramRow[]).map((p) => ({
    ...p,
    current_version: byProgram.get(p.id) ?? null,
  }));
}

export async function fetchProgramById(id: string): Promise<ProgramWithCurrentVersion | null> {
  const admin = createAdminClient();
  const { data: program } = await admin.from('extranet_programs').select('*').eq('id', id).maybeSingle();
  if (!program) return null;
  const { data: version } = await admin
    .from('extranet_program_versions')
    .select('*')
    .eq('program_id', id)
    .eq('is_current', true)
    .maybeSingle();
  return {
    ...(program as ExtranetProgramRow),
    current_version: (version as ExtranetProgramVersionRow | null) ?? null,
  };
}

export async function fetchProgramsForTrainer(trainerId: string): Promise<ProgramWithCurrentVersion[]> {
  const admin = createAdminClient();
  const { data: grants } = await admin
    .from('extranet_trainer_program_grants')
    .select('program_id')
    .eq('trainer_id', trainerId);
  if (!grants?.length) return [];

  const programIds = grants.map((g) => g.program_id);
  const { data: programs } = await admin
    .from('extranet_programs')
    .select('*')
    .in('id', programIds)
    .eq('is_archived', false);

  const { data: versions } = await admin
    .from('extranet_program_versions')
    .select('*')
    .in('program_id', programIds)
    .eq('is_current', true);

  const byProgram = new Map<string, ExtranetProgramVersionRow>();
  for (const v of versions ?? []) {
    byProgram.set(v.program_id, v as ExtranetProgramVersionRow);
  }

  return ((programs ?? []) as ExtranetProgramRow[]).map((p) => ({
    ...p,
    current_version: byProgram.get(p.id) ?? null,
  }));
}

export async function fetchResourcesForAdmin(): Promise<ExtranetTrainerResourceRow[]> {
  const admin = createAdminClient();
  const { data } = await admin
    .from('extranet_trainer_resources')
    .select('*')
    .eq('is_archived', false)
    .order('title');
  return (data ?? []) as ExtranetTrainerResourceRow[];
}

export async function fetchResourcesForTrainer(trainerId: string): Promise<ExtranetTrainerResourceRow[]> {
  const admin = createAdminClient();
  const { data: grants } = await admin
    .from('extranet_trainer_resource_grants')
    .select('resource_id')
    .eq('trainer_id', trainerId);
  if (!grants?.length) return [];

  const resourceIds = grants.map((g) => g.resource_id);
  const { data } = await admin
    .from('extranet_trainer_resources')
    .select('*')
    .in('id', resourceIds)
    .eq('is_archived', false)
    .order('title');
  return (data ?? []) as ExtranetTrainerResourceRow[];
}

export async function fetchMissionsForTrainer(trainerId: string): Promise<ExtranetMissionRow[]> {
  const admin = createAdminClient();
  const { data } = await admin
    .from('extranet_missions')
    .select('*')
    .eq('trainer_id', trainerId)
    .neq('status', 'cancelled')
    .order('starts_on', { ascending: true });
  return (data ?? []) as ExtranetMissionRow[];
}

export async function fetchUpcomingMissionsForTrainer(
  trainerId: string,
  limit = 5
): Promise<ExtranetMissionRow[]> {
  const admin = createAdminClient();
  const today = new Date().toISOString().slice(0, 10);
  const { data } = await admin
    .from('extranet_missions')
    .select('*')
    .eq('trainer_id', trainerId)
    .gte('starts_on', today)
    .in('status', ['assigned', 'confirmed', 'in_progress'])
    .order('starts_on', { ascending: true })
    .limit(limit);
  return (data ?? []) as ExtranetMissionRow[];
}

export async function fetchMissionById(missionId: string): Promise<ExtranetMissionRow | null> {
  const admin = createAdminClient();
  const { data } = await admin.from('extranet_missions').select('*').eq('id', missionId).maybeSingle();
  return (data as ExtranetMissionRow | null) ?? null;
}

export async function fetchMissionsForAdmin(): Promise<ExtranetMissionRow[]> {
  const admin = createAdminClient();
  const { data } = await admin
    .from('extranet_missions')
    .select('*')
    .order('starts_on', { ascending: false })
    .limit(200);
  return (data ?? []) as ExtranetMissionRow[];
}

export async function fetchProgramVersionById(id: string): Promise<ExtranetProgramVersionRow | null> {
  const admin = createAdminClient();
  const { data } = await admin.from('extranet_program_versions').select('*').eq('id', id).maybeSingle();
  return (data as ExtranetProgramVersionRow | null) ?? null;
}
