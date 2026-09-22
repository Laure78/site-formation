import { createAdminClient } from '@/lib/supabase/admin';
import { getFormationByCode, FORMATIONS } from '@/data/formations';
import type { TrainingProgram } from '@/lib/training-ops/types';

/** Synchronise / crée un programme opérationnel depuis un code catalogue NIV-xx. */
export async function ensureProgramFromCatalogueCode(
  catalogueCode: string
): Promise<TrainingProgram> {
  const supabase = createAdminClient();
  const formation = getFormationByCode(catalogueCode);
  if (!formation) {
    throw new Error(`Code catalogue inconnu : ${catalogueCode}`);
  }

  const { data: existing } = await supabase
    .from('training_programs')
    .select('*')
    .eq('catalogue_code', catalogueCode)
    .maybeSingle();

  if (existing) {
    return existing as TrainingProgram;
  }

  const hours = Number.parseFloat(String(formation.duree).replace(/[^\d.,]/g, '').replace(',', '.'));
  const { data, error } = await supabase
    .from('training_programs')
    .insert({
      catalogue_code: catalogueCode,
      title: formation.titre,
      slug: formation.slug,
      default_duration_hours: Number.isFinite(hours) ? hours : null,
      default_modality: 'presentiel',
      reference_prefix: 'IA-BTP',
      description: formation.promesse,
      is_active: true,
    })
    .select('*')
    .single();

  if (error || !data) {
    throw new Error(error?.message ?? 'Impossible de créer le programme');
  }
  return data as TrainingProgram;
}

/** Seed idempotent de tous les programmes catalogue actifs. */
export async function syncAllCataloguePrograms(): Promise<number> {
  let n = 0;
  for (const f of FORMATIONS) {
    await ensureProgramFromCatalogueCode(f.code);
    n += 1;
  }
  return n;
}

export async function listTrainingPrograms(): Promise<TrainingProgram[]> {
  const supabase = createAdminClient();
  const { data, error } = await supabase
    .from('training_programs')
    .select('*')
    .eq('is_active', true)
    .order('catalogue_code', { ascending: true });
  if (error) throw new Error(error.message);
  return (data ?? []) as TrainingProgram[];
}
