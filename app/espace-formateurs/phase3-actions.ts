'use server';

import { revalidatePath } from 'next/cache';
import { createAdminClient } from '@/lib/supabase/admin';
import { requireExtranetTrainerAccess } from '@/lib/extranet-formateurs/access';
import { LINKS } from '@/lib/internal-links';

export async function submitMissionFeedbackAction(
  missionId: string,
  formData: FormData
): Promise<{ ok: boolean; error?: string }> {
  const access = await requireExtranetTrainerAccess();
  if (!access.ok) return { ok: false, error: 'Non autorisé.' };

  const admin = createAdminClient();
  const { data: mission } = await admin
    .from('extranet_missions')
    .select('trainer_id, status')
    .eq('id', missionId)
    .maybeSingle();

  if (!mission || mission.trainer_id !== access.trainer.id) {
    return { ok: false, error: 'Mission introuvable.' };
  }

  const payload = {
    mission_id: missionId,
    trainer_id: access.trainer.id,
    difficulties: String(formData.get('difficulties') ?? '').trim() || null,
    adaptations: String(formData.get('adaptations') ?? '').trim() || null,
    improvement_proposals: String(formData.get('improvement_proposals') ?? '').trim() || null,
    incident_report: String(formData.get('incident_report') ?? '').trim() || null,
    submitted_at: new Date().toISOString(),
  };

  const { error } = await admin.from('extranet_mission_feedbacks').upsert(payload, {
    onConflict: 'mission_id',
  });

  if (error) {
    console.error('[submitMissionFeedback]', error.message);
    return { ok: false, error: 'Envoi impossible.' };
  }

  revalidatePath(LINKS.espaceFormateursQualite);
  revalidatePath(`${LINKS.espaceFormateursInterventions}/${missionId}`);
  return { ok: true };
}
