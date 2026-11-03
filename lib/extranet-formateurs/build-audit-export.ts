import { createAdminClient } from '@/lib/supabase/admin';
import { zipSync, strToU8 } from 'fflate';

const BUCKET = 'extranet-formateurs';

export async function buildTrainerAuditJson(trainerId: string) {
  const admin = createAdminClient();

  const { data: trainer } = await admin.from('extranet_trainers').select('*').eq('id', trainerId).single();
  const { data: documents } = await admin
    .from('extranet_trainer_documents')
    .select('*')
    .eq('trainer_id', trainerId);
  const { data: evaluations } = await admin
    .from('extranet_competency_evaluations')
    .select('*')
    .eq('trainer_id', trainerId);
  const { data: controls } = await admin
    .from('extranet_subcontractor_controls')
    .select('*')
    .eq('trainer_id', trainerId);
  const { data: missions } = await admin.from('extranet_missions').select('*').eq('trainer_id', trainerId);
  const { data: feedbacks } = await admin
    .from('extranet_mission_feedbacks')
    .select('*')
    .eq('trainer_id', trainerId);
  const { data: actions } = await admin
    .from('extranet_quality_actions')
    .select('*')
    .eq('trainer_id', trainerId);
  const { data: charterAccept } = await admin
    .from('extranet_charter_acceptances')
    .select('*')
    .eq('trainer_id', trainerId);

  return {
    exported_at: new Date().toISOString(),
    qualiopi_note:
      'Export documentaire — validation humaine requise ; aucune conformité automatique.',
    trainer,
    documents: documents ?? [],
    competency_evaluations: evaluations ?? [],
    subcontractor_controls: controls ?? [],
    missions: missions ?? [],
    mission_feedbacks: feedbacks ?? [],
    quality_actions: actions ?? [],
    charter_acceptances: charterAccept ?? [],
  };
}

export async function buildTrainerAuditZip(trainerId: string): Promise<Uint8Array> {
  const dossier = await buildTrainerAuditJson(trainerId);
  const admin = createAdminClient();
  const files: Record<string, Uint8Array> = {
    'dossier-audit.json': strToU8(JSON.stringify(dossier, null, 2)),
    'readme.txt': strToU8(
      'Dossier audit extranet formateur — Laure Olivié / OFC.\nLes pièces binaires sont dans documents/ lorsque le téléchargement a réussi.\n'
    ),
  };

  for (const doc of dossier.documents as { storage_path?: string; original_filename?: string; doc_type?: string }[]) {
    if (!doc.storage_path || doc.storage_path.includes('..')) continue;
    try {
      const { data, error } = await admin.storage.from(BUCKET).download(doc.storage_path);
      if (error || !data) continue;
      const buf = new Uint8Array(await data.arrayBuffer());
      const safeName = (doc.original_filename ?? doc.storage_path.split('/').pop() ?? 'file').replace(
        /[^\w.\- ]/g,
        '_'
      );
      files[`documents/${doc.doc_type ?? 'doc'}_${safeName}`] = buf;
    } catch {
      // skip missing file
    }
  }

  return zipSync(files);
}
